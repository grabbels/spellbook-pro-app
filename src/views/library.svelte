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

<SafeViewPadding>
	<div class="buttons" class:search_active={searchActive}>
		<Button text="New book" icon="ri-add-line" type="fill blue" on:click={()=>{
			$modalCall = 'new'
		}} />
		<SearchField
			placeholder="Search library..."
			bind:value={query}
			on:focus={() => searchActive = true}
			on:focusout={() => searchActive = false}
			right
		/>
	</div>
	<div>
		{#each $localUserLibrary as book}
			<SpellbookSlot
				on:click={() => {
					$modalCall = 'spellbook';
					$lookupBook = book;
				}}
				data={book}
			/>
		{:else}
			<p>You have no saved spellbooks.</p>
		{/each}
	</div>
</SafeViewPadding>

<style lang="scss">
	div.buttons {
		padding: 0 1rem;
		margin-bottom: 0.5rem;
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: 0.3rem;
		transition: .2s;
		&.search_active {
			grid-template-columns: 0 1fr;
			gap: 0;
		}
	}
</style>
