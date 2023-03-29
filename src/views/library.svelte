<script>
	import Button from '../components/button.svelte';
	import Panel from '../components/panel.svelte';
	import SafeViewPadding from '../components/safeViewPadding.svelte';
	import SearchField from '../components/searchField.svelte';
	import SpellbookSlot from '../components/spellbookSlot.svelte';
	import { lookupBook, modalCall } from '../stores';
	import { localUserLibrary } from '../stores-persist';
	let query;
	let searchActive;
</script>

<SafeViewPadding header>
	<div style="margin-top: 4rem">
		{#each $localUserLibrary as book}
			<SpellbookSlot
				on:click={() => {
					$modalCall = 'spellbook';
					$lookupBook = book;
				}}
				data={book}
			/>
		{:else}
			<p style="margin: 1rem; text-align: center">You have no saved spellbooks yet.</p>
		{/each}
	</div>
</SafeViewPadding>

<style lang="scss">
	div {
		width: 100%;
		position: relative;
		padding: .8rem;
	}
</style>
