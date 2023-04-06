<script>
	import Button from '../components/button.svelte';
	import Panel from '../components/panel.svelte';
	import SafeViewPadding from '../components/safeViewPadding.svelte';
	import SearchField from '../components/searchField.svelte';
	import SpellbookSlot from '../components/spellbookSlot.svelte';
	import { lookupBookId, modalCall, spellbookQuery } from '../stores';
	import { localUserLibrary } from '../stores-persist';
	let results = [];
	let sort;
	$: console.log($localUserLibrary)
	$: if ($spellbookQuery) {
		results = [];
		for (const property in $localUserLibrary) {
			if (
				$localUserLibrary[property].name
					.toString()
					.toLowerCase()
					.includes($spellbookQuery.toLowerCase()) ||
				$localUserLibrary[property].tags.toString().includes($spellbookQuery.toLowerCase()) ||
				$localUserLibrary[property].class.includes($spellbookQuery.toLowerCase())
			) {
				results.push($localUserLibrary[property].id);
			}
		}
	}
</script>

<SafeViewPadding>
	<div class="sort_by_wrapper" style="margin-top: 2.5rem; text-align: right">
		<select bind:value={sort} name="sort" id="sort" class="minimal">
			<option value="alphabetical">Alphabetical</option>
			<option value="created">Date created</option>
			<option value="modified" selected>Date modified</option>
		</select>
		<button class="updown"><i class="ri-arrow-down-line"/></button>
	</div>
	<div style="padding-bottom: calc(var(--safe-area-inset-bottom) + 5rem);">
		{#each Object.entries($localUserLibrary) as [key], i}
			<!-- <h1>{$localUserLibrary[key].name}</h1> -->
			{#if !$spellbookQuery || results.includes(key)}
				<SpellbookSlot
					on:click={() => {
						$modalCall = 'spellbook';
						$lookupBookId = key;
					}}
					id={key}
				/>
			{:else if $spellbookQuery && i === 0 && results.length < 1}
				<p style="margin: 1rem; text-align: center">
					No results.<br /><button class="href" on:click={() => ($spellbookQuery = '')}
						>Reset filter</button
					>
				</p>
			{/if}
		{:else}
			<p style="margin: 1rem; text-align: center">You have no saved spellbooks yet.</p>
		{/each}
	</div>
	<!-- <div style="margin-top: 4rem">
		{#each Object.entries($localUserLibrary) as book}
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
	</div> -->
</SafeViewPadding>

<style lang="scss">
	div {
		width: 100%;
		position: relative;
		padding: 0.8rem .8rem 0;
	}
	.sort_by_wrapper {
		width: 100%;
		button.updown {
			i {
				color: var(--inputbg);
				vertical-align: sub;
			}
		}
	}
</style>
