import { isRandomBasicWeakness } from '$lib/ahdb/card'
import type { CardAndAmount, GetDeckCardIdReturns } from '$lib/ahdb/public-api/high-level'
import { cardClassToBackgroundClass } from '$lib/core/card-class'
import type { FullDatabase } from '$lib/core/full-database'
import type { DecklistEntry } from '$lib/deck-table/decklist-entry'

export interface Party {
	decks: GetDeckCardIdReturns[]
	overlaps: DecklistEntry[]
	overlapCount: number
}

export function exhaustiveCheckOverlaps(decks: GetDeckCardIdReturns[], fdb: FullDatabase): Party[] {
	const indexes = decks.reduce<number[]>((prev, _, curIndex) => {
		return [...prev, curIndex]
	}, [])
	const toCheck: number[][] = [
		...k_combinations(indexes, 2),
		...k_combinations(indexes, 3),
		...k_combinations(indexes, 4),
	]
	return toCheck.map((x) => check(x, decks, fdb))
}

function check(c: number[], allDecks: GetDeckCardIdReturns[], fdb: FullDatabase): Party {
	const decks = c.map<GetDeckCardIdReturns>((v) => {
		return allDecks[v]
	})
	const dump = decks.flatMap<DecklistEntry>((x, i) => {
		const investigator = fdb.getCard(x.investigatorCode)
		let investigatorName: string = i.toString()
		let colorHex = 'player-0-bg'
		if (investigator !== null) {
			investigatorName = investigator.original.name.split(' ')[0]
			colorHex = cardClassToBackgroundClass(investigator.class1)
		}
		function doi(cc: CardAndAmount[], suffix: string): DecklistEntry[] {
			return cc.map<DecklistEntry>((y) => {
				return {
					cardId: y.cardId,
					amount: y.amount,
					id: x.published ? 'p:' : '' + x.id + suffix,
					label: { text: investigatorName + suffix, color: colorHex },
				}
			})
		}
		const all = [...doi(x.cards1, ''), ...doi(x.cards2, '-S'), ...doi(x.cards3, '-I')]
		return all
	})
	const checkResults = checkOverlaps(dump, (c) => fdb.getCard(c)?.original.quantity ?? 0)
	return {
		decks: decks,
		overlaps: checkResults.overlapReports,
		overlapCount: checkResults.uniqueOverlapCount,
	}
}

function k_combinations(set: number[], k: number): number[][] {
	let i: number
	let j: number
	let combs: number[][]
	let head: number[]
	let tailcombs: number[][]

	if (k > set.length || k <= 0) {
		return []
	}

	if (k == set.length) {
		return [set]
	}

	if (k == 1) {
		combs = []
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]])
		}
		return combs
	}

	combs = []
	for (i = 0; i < set.length - k + 1; i++) {
		head = set.slice(i, i + 1)
		tailcombs = k_combinations(set.slice(i + 1), k - 1)
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]))
		}
	}
	return combs
}

export interface CheckOverlapsResult {
	uniqueOverlapCount: number
	overlapReports: DecklistEntry[]
}

export function checkOverlaps(
	ents: DecklistEntry[],
	getQuantity: (c: string) => number,
): CheckOverlapsResult {
	const cardCount: { [k: string]: number } = {}
	function addCount(c: { [k: string]: number }, cn: string, n: number) {
		if (!(cn in c)) {
			c[cn] = 0
		}
		c[cn] += n
	}
	ents.forEach((x) => {
		addCount(cardCount, x.cardId, x.amount)
	})
	const overQuantityCards = Object.entries(cardCount)
		.map(([k, v]) => {
			return { card: k, amount: v, quantity: getQuantity(k) }
		})
		.filter((i) => {
			if (isRandomBasicWeakness(i.card)) {
				return false
			}
			return i.amount > i.quantity
		})
	const ov = ents.filter((x) => {
		const found = overQuantityCards.findIndex((y) => {
			return x.cardId === y.card
		})
		return found !== -1
	})
	const ovm = ov.map<DecklistEntry>((x) => {
		const found = overQuantityCards.find((y) => {
			return y.card === x.cardId
		})
		if (!found) {
			return x
		}
		const nd: DecklistEntry = {
			...x,
			id: 'over' + x.label + x.id,
			label: x.label
				? {
						color: x.label.color,
						text: x.label.text + ' (' + (found.amount ?? 0) + '/' + getQuantity(x.cardId) + ')',
				  }
				: undefined,
		}
		return nd
	})

	const uniqueCards = new Set<string>()
	for (let i = 0; i < ovm.length; i++) {
		uniqueCards.add(ovm[i].cardId)
	}
	const overlappingCount = Array.from(uniqueCards).length
	return {
		overlapReports: ovm,
		uniqueOverlapCount: overlappingCount,
	}
}