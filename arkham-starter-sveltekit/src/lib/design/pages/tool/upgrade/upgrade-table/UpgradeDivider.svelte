<script lang="ts">
	import TextBox, { EditingLevel } from '$lib/design/components/basic/TextBox.svelte'
	import CardBlockButton from '$lib/design/components/card/CardBlockButton.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'

	import EditableNumberCell from './EditableNumberCell.svelte'
	export let singleMode: boolean = false
	export let text: string
	export let xpCarryover: number
	export let calculatedXpCarryover: number
	export let unlocked: boolean
	export let viewMode: boolean
	export let onTextChanged: (n: string) => void = () => {
		// do nothing
	}
	export let onXpCarryoverChanged: (n: number) => void = () => {
		// do nothing
	}
	// export let onDelete: () => void = () => {
	// 	// do nothing
	// }

	$: showXp = unlocked ? xpCarryover : calculatedXpCarryover
</script>

<div class="flex-box">
	<div class="flex-item flex-text">
		<TextBox disabled={viewMode} currentText={text} onChange={onTextChanged} />
	</div>
	<!-- <div class="flex-item">
		<CardBlockButton label="Delete" iconPath={allIcons.delete} onClick={onDelete} />
	</div> -->
	{#if singleMode === false}
		<div class="flex-item">
			<EditableNumberCell
				currentNumber={showXp}
				suffixText={'XP'}
				editingLevel={unlocked
					? EditingLevel.Editable
					: viewMode
					? EditingLevel.JustText
					: EditingLevel.GreyedOut}
				onEndEdit={onXpCarryoverChanged}
			/>
		</div>
	{/if}
</div>

<style>
	.flex-box {
		display: flex;
		align-items: center;
		padding: 4px 0px;
	}

	.flex-text {
		flex: 1;
	}
</style>
