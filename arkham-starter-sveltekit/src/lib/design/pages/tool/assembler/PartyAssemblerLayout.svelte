<script lang='ts' context='module'>
  enum PartyAssemblerSorting {
    Overlaps,
    CombinationOrder,
  }

  enum PartyAssemblerIconFormat {
    ArkhamDb,
    Emoji,
    None,
  }

  enum PartyAssemblerFilter {
    NoSameClass,
  }

  interface SpecialComment {
    userId: number
    username: string
  }
</script>

<script lang='ts'>
  import { LimitedTab } from '@5argon/arkham-ui'

  import { browser } from '$app/environment'
  import {
    DeckSource,
    extractDeck,
    fetchDeckFromId,
    type FetchDeckResult,
    forwardDeckToOldCore,
    forwardDeckToRcore,
  } from '$lib/ahdb/public-api/high-level'
  import type { FullDatabase } from '$lib/core/full-database'
  import type { PopupDatabase } from '$lib/core/popup-database'
  import { openGatherInNewTab } from '$lib/deck/open-gather-in-new-tab'
  import { Grouping, Sorting } from '$lib/deck-table/grouping'
  import Button from '$lib/design/components/basic/Button.svelte'
  import Checkbox from '$lib/design/components/basic/Checkbox.svelte'
  import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
  import TextBox from '$lib/design/components/basic/TextBox.svelte'
  import PartyDeckEntry from '$lib/design/components/card/PartyDeckEntry.svelte'
  import GrouperSorter from '$lib/design/components/deck-table/GrouperSorter.svelte'
  import FramedTextSpan from '$lib/design/components/inline/FramedTextSpan.svelte'
  import NotificationNumber from '$lib/design/components/inline/NotificationNumber.svelte'
  import ViewModeBanner from '$lib/design/components/layout/ViewModeBanner.svelte'
  import { allIcons } from '$lib/design/icons/all-icons'
  import FaIcon from '$lib/design/icons/FaIcon.svelte'
  import {
    TeamAssemblerProto,
    TeamAssemblerProto_InputDeck,
  } from '$lib/proto/generated/team_assembler'
  import { exhaustiveCheckOverlaps, type Party } from '$lib/tool/overlap/overlap-helpers'
  import { getClassIconAhdb } from '$lib/tool/script/export/ahdb-syntax'
  import { getClassIconEmoji } from '$lib/tool/script/export/emoji'
  import { base64ToBinary, binaryToUrlString } from '$lib/tool/script/export/options'

  import PartyTable from './PartyTable.svelte'
  import PartyTeamMemberItem from './PartyTeamMemberItem.svelte'

  export let protoString: string | null = null
  export let pdb: PopupDatabase
  export let fdb: FullDatabase

  let forwardRcore: boolean = true
  let decksText: string = ''
  let decksTextSplit: string[] = []
  let fetchingDecks = false
  let fetchingPdb = false
  let advanced = false
  let exportProto: string = ''
  let parties: Party[] = []
  let sorting: PartyAssemblerSorting = PartyAssemblerSorting.Overlaps
  let filterRespectCurrentTeam: boolean = true
  let filterNoSameClass: boolean = true
  let filterLimitResults: boolean = true
  let filterZeroOverlapOnly: boolean = false
  let filterNoSameUser: boolean = false
  let copyIconFormat: PartyAssemblerIconFormat = PartyAssemblerIconFormat.Emoji
  let viewMode: boolean = false

  let groupings: Grouping[] = [Grouping.Set]
  let sortings: Sorting[] = [Sorting.Number]

  function onGroupingsChanged(g: Grouping[]) {
    groupings = g
  }

  function onSortingsChanged(s: Sorting[]) {
    sortings = s
  }

  let twoPlayerParties: Party[] = []
  let threePlayerParties: Party[] = []
  let fourPlayerParties: Party[] = []

  function customFilters(p: Party, fdb: FullDatabase): boolean {
    const invs = p.decks.map((x) => fdb.getCard(x.investigatorCode))

    const sameInv: { [n: string]: boolean } = {}
    for (let i = 0; i < invs.length; i++) {
      const x = invs[i]
      if (!(x.original.name in sameInv)) {
        sameInv[x.original.name] = true
      } else {
        return false
      }
    }

    if (filterRespectCurrentTeam) {
      for (let i = 0; i < currentTeam.length; i++) {
        const x = currentTeam[i]
        const found = p.decks.find((y) => y.id === x) !== undefined
        if (!found) {
          return false
        }
      }
    }

    if (filterNoSameClass) {
      const exist: { [n: number]: boolean } = {}
      for (let i = 0; i < invs.length; i++) {
        const x = invs[i]
        if (!(x.class1 in exist)) {
          exist[x.class1] = true
        } else {
          return false
        }
      }
    }
    if (filterZeroOverlapOnly && p.overlapCount > 0) {
      return false
    }
    if (filterNoSameUser) {
      const users = p.decks.map((x) => x.userId)
      const exist: { [n: number]: boolean } = {}
      for (let i = 0; i < users.length; i++) {
        const x = users[i]
        if (x !== null) {
          if (!(x in exist)) {
            exist[x] = true
          } else {
            return false
          }
        }
      }
    }
    return true
  }

  function customSorter(a: Party, b: Party, fdb: FullDatabase): number {
    if (sorting === PartyAssemblerSorting.Overlaps) {
      return a.overlapCount - b.overlapCount
    }
    return 0
  }

  $: deckCount = decksAndComments.filter((x) => typeof x !== 'string').length
  $: notReady = fetchingDecks || fetchingPdb

  let decksAndComments: (FetchDeckResult | string)[] = []
  let decks: FetchDeckResult[] = []
  let currentTeam: string[] = []

  startingProtoProcessing()

  async function startingProtoProcessing() {
    if (protoString !== null) {
      try {
        const tap = TeamAssemblerProto.fromBinary(base64ToBinary(protoString))
        const mapped = tap.inputDecks1.map((x) => {
          if (x.comment !== '') {
            return '// ' + x.comment
          }
          return x.published ? 'p:' + x.id : x.id
        })
        advanced = tap.advanced
        decksTextSplit = mapped
        decksText = mapped.join('\n')
        viewMode = true
        await process(fdb)
        // Need fetching decks first before applying the team.
        currentTeam = [...tap.currentTeam.filter((x) => findFromDecks(decks, x) !== null)]
        manualFilterSorter(fdb)
      } catch {
      }
    }
  }

  function textAreaChangeHandler(e: Event & { currentTarget: EventTarget & HTMLTextAreaElement }) {
    decksText = e.currentTarget.value
    decksTextSplit = e.currentTarget.value.split('\n').filter((x) => x.trim().length > 0)
  }

  async function process(fdb: FullDatabase) {
    clearTeam(fdb)
    const deckPromiseOrComment = decksTextSplit.map<Promise<string | FetchDeckResult | null>>(
      (x, i) => {
        if (x.startsWith('//')) {
          return Promise.resolve(x.substring(2).trim())
        } else {
          const ext = extractDeck(x)
          return fetchDeckFromId(ext.deck, ext.source)
        }
      },
    )
    // const extracts = decksTextSplit.map((x) => extractDeckFromUrl(x))
    // const getPromises = extracts.map((x) => getDeckCardIds(x.deck, x.published))
    fetchingDecks = true
    const awaited = await Promise.all(deckPromiseOrComment)
    fetchingDecks = false
    decksAndComments = []
    for (let item of awaited) {
      if (item !== null && typeof item !== 'string') {
        decksAndComments.push(forwardRcore ? forwardDeckToRcore(item) : forwardDeckToOldCore(item))
      }
      if (typeof item === 'string') {
        decksAndComments.push(item)
      }
    }

    function isDeck(x: string | FetchDeckResult): x is FetchDeckResult {
      return typeof x !== 'string'
    }

    decks = decksAndComments.filter(isDeck)
    const unfiltered = exhaustiveCheckOverlaps(decks, fdb)
    parties = unfiltered
    manualFilterSorter(fdb)
  }

  $: {
    const pap: TeamAssemblerProto = {
      inputDecks1: decksAndComments.map<TeamAssemblerProto_InputDeck>((x) => {
        if (typeof x !== 'string') {
          return { id: x.id, published: x.source === DeckSource.ArkhamDbPublished, comment: '' }
        } else {
          return { id: '', published: false, comment: x }
        }
      }),
      inputDecks2: [],
      inputDecks3: [],
      inputDecks4: [],
      currentTeam: currentTeam.slice(0, 4),
      pickedAssembly: [],
      userPatches: [],
      advanced: advanced,
    }
    exportProto = binaryToUrlString(TeamAssemblerProto.toBinary(pap))
  }

  function manualFilterSorter(fdb: FullDatabase) {
    const filtered = parties.filter((x) => customFilters(x, fdb))
    const sorted = filtered.sort((a, b) => customSorter(a, b, fdb))
    const lim = 99
    twoPlayerParties = sorted
      .filter((x) => x.decks.length === 2)
      .slice(0, filterLimitResults ? lim : undefined)
    threePlayerParties = sorted
      .filter((x) => x.decks.length === 3)
      .slice(0, filterLimitResults ? lim : undefined)
    fourPlayerParties = sorted
      .filter((x) => x.decks.length === 4)
      .slice(0, filterLimitResults ? lim : undefined)
  }

  function onChangeHandler(e: Event & { currentTarget: HTMLSelectElement }, fdb: FullDatabase) {
    const value = e.currentTarget.value
    sorting = parseInt(value)
    manualFilterSorter(fdb)
  }

  function onCopyIconFormatHandler(e: Event & { currentTarget: HTMLSelectElement }) {
    const value = e.currentTarget.value
    copyIconFormat = parseInt(value)
  }

  function addToTeam(deckId: string, fdb: FullDatabase) {
    if (currentTeam.length < 4 && currentTeam.find((x) => x === deckId) === undefined) {
      currentTeam.push(deckId)
      currentTeam = [...currentTeam]
      manualFilterSorter(fdb)
    }
  }

  function clearTeam(fdb: FullDatabase) {
    currentTeam = []
    manualFilterSorter(fdb)
  }

  function inTheTeam(curTeam: string[], d: string): boolean {
    return curTeam.find((x) => x === d) !== undefined
  }

  function findFromDecks(deks: FetchDeckResult[], d: string): FetchDeckResult | null {
    const found = deks.find((x) => x.id === d)
    return found ?? null
  }

  var currentTeamDeck1: FetchDeckResult | null = null
  var currentTeamDeck2: FetchDeckResult | null = null
  var currentTeamDeck3: FetchDeckResult | null = null
  var currentTeamDeck4: FetchDeckResult | null = null
  $: {
    currentTeamDeck1 = null
    currentTeamDeck2 = null
    currentTeamDeck3 = null
    currentTeamDeck4 = null
    if (currentTeam.length > 0) {
      currentTeamDeck1 = findFromDecks(decks, currentTeam[0])
    }
    if (currentTeam.length > 1) {
      currentTeamDeck2 = findFromDecks(decks, currentTeam[1])
    }
    if (currentTeam.length > 2) {
      currentTeamDeck3 = findFromDecks(decks, currentTeam[2])
    }
    if (currentTeam.length > 3) {
      currentTeamDeck4 = findFromDecks(decks, currentTeam[3])
    }
  }
  var currentTeamAll: FetchDeckResult[] = []
  $: {
    currentTeamAll = []
    if (currentTeamDeck1 !== null) {
      currentTeamAll.push(currentTeamDeck1)
    }
    if (currentTeamDeck2 !== null) {
      currentTeamAll.push(currentTeamDeck2)
    }
    if (currentTeamDeck3 !== null) {
      currentTeamAll.push(currentTeamDeck3)
    }
    if (currentTeamDeck4 !== null) {
      currentTeamAll.push(currentTeamDeck4)
    }
  }

  var specialComments: SpecialComment[] = []
  $: {
    specialComments = []
    decksAndComments.forEach((x) => {
      if (typeof x === 'string') {
        const parsed = tryParseSpecialComment(x)
        if (parsed !== undefined) {
          specialComments.push(parsed)
        }
      }
    })
  }

  function tryParseSpecialComment(s: string): SpecialComment | undefined {
    // TODO?
    return undefined
    const matched = s.match('User:(.*) (([d]*))')
  }

  function exportMarkdown(dac: (string | FetchDeckResult)[], fdb: FullDatabase) {
    const lines = dac.map((x) => {
      if (typeof x === 'string') {
        return '\n' + x
      } else {
        const inv = fdb.getCard(x.investigatorCode)
        const cl = inv.class1
        const nm = inv.original.name
        let classIcon
        switch (copyIconFormat) {
          case PartyAssemblerIconFormat.Emoji: {
            classIcon = getClassIconEmoji(cl)
            break
          }
          case PartyAssemblerIconFormat.ArkhamDb: {
            classIcon = getClassIconAhdb(cl)
            break
          }
          default: {
            classIcon = ''
            break
          }
        }
        const linked = `- ${classIcon} ${nm}: [${x.deck}](${x.link})`
        return linked
      }
    })
    if (browser) {
      navigator.clipboard.writeText(lines.join('\n'))
    }
  }

  const pleaseWaitText = 'Analyzing decks...'
</script>

{#if viewMode}
  <ViewModeBanner
    onExitViewMode={() => {
			viewMode = false
		}}
  />
{/if}

{#if !viewMode}
  <Checkbox
    label='Forward to Revised Core Set'
    checked={forwardRcore}
    onCheckChanged={() => {
			forwardRcore = !forwardRcore
			process(fdb)
		}}
  />

  <ListDivider label='Input Decks' />

  <textarea
    placeholder="One deck per line. Can be either arkhamdb.com deck URL or deck's ID. If it is deck ID, prefix p: for published deck."
    class='decks'
    on:change={textAreaChangeHandler}>{decksText}</textarea
  >

  <Button
    big
    center
    disabled={fetchingDecks}
    label={fetchingDecks ? pleaseWaitText : 'Analyze ' + deckCount + ' Decks'}
    onClick={() => {
			process(fdb)
		}}
  />
{/if}

{#if viewMode && fetchingDecks}
  <p>{pleaseWaitText}</p>
{/if}

{#if !notReady && decksAndComments.length > 0}
  <div class='left-right'>
    <div class='left-right-item'>
      <ListDivider label='Included Decks' />
      {#each decksAndComments as d}
        <div class='result-item'>
          {#if typeof d !== 'string'}
						<span>
							<span class:add-to-team-button-hide={inTheTeam(currentTeam, d.id)}>
								<Button
                  label='Add to team'
                  onClick={() => {
										if (typeof d !== 'string') {
											addToTeam(d.id, fdb)
										}
									}}><FaIcon path={allIcons.arrowRightBordered} /></Button
                >
							</span>
							<PartyDeckEntry
                deckLink={d.link}
                deckName={d.deck}
                investigatorCode={d.investigatorCode}
                investigatorClass={fdb.getCard(d.investigatorCode).class1}
              />
						</span>
          {:else}
            <div class='comment'>{d}</div>
          {/if}
        </div>
      {/each}

      {#if !viewMode}
				<span>
					<Button
            label='Copy Markdown to Clipboard (EXPERIMENTAL)'
            onClick={() => {
							exportMarkdown(decksAndComments, fdb)
						}}
          />
					<FramedTextSpan text='Class Icon Format' />
					<select name='fmt' value={copyIconFormat} on:change={(e) => onCopyIconFormatHandler(e)}>
						<option value={PartyAssemblerIconFormat.Emoji}>Emoji</option>
						<option value={PartyAssemblerIconFormat.ArkhamDb}>ArkhamDB</option>
						<option value={PartyAssemblerIconFormat.None}>None</option>
					</select>
				</span>
      {/if}
    </div>
    <div class='left-right-item'>
      <ListDivider label='Current Team' />
      <PartyTeamMemberItem deck={currentTeamDeck1} player={0} fullDatabase={fdb} />
      <PartyTeamMemberItem deck={currentTeamDeck2} player={1} fullDatabase={fdb} />
      <PartyTeamMemberItem deck={currentTeamDeck3} player={2} fullDatabase={fdb} />
      <PartyTeamMemberItem deck={currentTeamDeck4} player={3} fullDatabase={fdb} />
      <span>
				<Button
          label='Clear'
          disabled={currentTeamAll.length === 0}
          onClick={() => clearTeam(fdb)}
        />
				<Button
          label='Gather Cards'
          disabled={currentTeamAll.length === 0}
          onClick={() => {
						openGatherInNewTab(currentTeamAll)
					}}
        />
			</span>
      <p>
        As more investigators are locked into the team, the analysis result below will be filtered
        more and more to help you find the remaining members. Press the arrow button in the Included
        Decks section to add to the team.
      </p>
    </div>
  </div>
  <ListDivider label='Analysis Result' />

  {#if !viewMode}
    <div class='sharing-url'>
      <TextBox
        label='Sharing URL'
        currentText={`https://arkham-starter.com/tool/assembler?i=${exportProto}`}
      />
    </div>

    <span class='flex-item'>
			<FramedTextSpan text='Team Composition Filters' />
			<Checkbox
        label='Respect Current Team'
        checked={filterRespectCurrentTeam}
        onCheckChanged={(c) => {
					filterRespectCurrentTeam = c
					manualFilterSorter(fdb)
				}}
      />
			<Checkbox
        label='No Same Class'
        checked={filterNoSameClass}
        onCheckChanged={(c) => {
					filterNoSameClass = c
					manualFilterSorter(fdb)
				}}
      />
			<Checkbox
        label='Limit 99 Results'
        checked={filterLimitResults}
        onCheckChanged={(c) => {
					filterLimitResults = c
					manualFilterSorter(fdb)
				}}
      />
			<Checkbox
        label='Zero Overlap Only'
        checked={filterZeroOverlapOnly}
        onCheckChanged={(c) => {
					filterZeroOverlapOnly = c
					manualFilterSorter(fdb)
				}}
      />
			<Checkbox
        label='No Same User'
        checked={filterNoSameUser}
        onCheckChanged={(c) => {
					filterNoSameUser = c
					manualFilterSorter(fdb)
				}}
      />
		</span>
    <span class='flex-item'>
			<FramedTextSpan text='Team Composition Sorting' />
			<select name='pets' value={sorting} on:change={(e) => onChangeHandler(e, fdb)}>
				<option value={PartyAssemblerSorting.Overlaps}>Less Overlaps First</option>
				<option value={PartyAssemblerSorting.CombinationOrder}>Combination Order</option>
			</select>
		</span>
    <GrouperSorter
      text={'Overlaps Display'}
      {groupings}
      {sortings}
      {onGroupingsChanged}
      {onSortingsChanged}
    />
  {/if}
  <LimitedTab>
    <div slot='tab1'>
      Two Players
      <NotificationNumber count={twoPlayerParties.length} />
    </div>
    <div slot='content1'>
      <PartyTable
        parties={twoPlayerParties}
        fullDatabase={fdb}
        popupDatabase={pdb}
        {groupings}
        {sortings}
        onCopyMarkdown={(d) => {
					exportMarkdown(d, fdb)
				}}
      />
    </div>
    <div slot='tab2'>
      Three Players
      <NotificationNumber count={threePlayerParties.length} />
    </div>
    <div slot='content2'>
      <PartyTable
        parties={threePlayerParties}
        fullDatabase={fdb}
        popupDatabase={pdb}
        {groupings}
        {sortings}
        onCopyMarkdown={(d) => {
					exportMarkdown(d, fdb)
				}}
      />
    </div>
    <div slot='tab3'>
      Four Players
      <NotificationNumber count={fourPlayerParties.length} />
    </div>
    <div slot='content3'>
      <PartyTable
        parties={fourPlayerParties}
        fullDatabase={fdb}
        popupDatabase={pdb}
        {groupings}
        {sortings}
        onCopyMarkdown={(d) => {
					exportMarkdown(d, fdb)
				}}
      />
    </div>
  </LimitedTab>
{/if}

<style>
    .flex-item {
        margin: 4px 0px;
    }

    .left-right {
        display: flex;
    }

    .left-right-item {
        flex: 1;
        padding: 0px 24px;
    }

    .add-to-team-button-hide {
        visibility: hidden;
    }

    .decks {
        height: 100px;
    }

    .sharing-url {
        margin: 8px 0px;
    }

    .result-item {
        padding: 1px 0px;
    }

    .comment {
        padding: 4px 0px;
    }
</style>
