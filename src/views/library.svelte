<script>
	import { slide } from 'svelte/transition';
	import Button from '../components/button.svelte';
	import Panel from '../components/panel.svelte';
	import SafeViewPadding from '../components/safeViewPadding.svelte';
	import SearchField from '../components/searchField.svelte';
	import SpellbookSlot from '../components/spellbookSlot.svelte';
	import { lookupBookId, modalCall, spellbookQuery } from '../stores';
	import { localUserLibrary } from '../stores-persist';
	let results = [];
	let sort;
	let updown = false;
	console.log(Object.entries($localUserLibrary).sort((a, b) => a.date_edited > b.date_edited));
	let spellbooks = Object.entries($localUserLibrary).sort((a, b) =>
		a[1].date_edited < b[1].date_edited ? 1 : -1
	);
	$: if (sort === 'alphabetical') {
		if (updown === false) {
			spellbooks = spellbooks.sort((a, b) => a[1].name[0].localeCompare(b[1].name[0]));
		} else {
			spellbooks = spellbooks.sort((a, b) => a[1].name[0].localeCompare(b[1].name[0]));
		}
	} else if (sort === 'created') {
		if (updown === false) {
			spellbooks = spellbooks.sort((a, b) => a[1].date_created < b[1].date_created);
		} else {
			spellbooks = spellbooks.sort((a, b) => a[1].date_created > b[1].date_created);
		}
	} else if (sort === 'modified') {
		if (updown === false) {
			spellbooks = spellbooks.sort((a, b) => a[1].date_edited < b[1].date_edited);
		} else {
			spellbooks = spellbooks.sort((a, b) => a[1].date_edited > b[1].date_edited);
		}
	}

	// function sortSpellbooks() {
	// 	Object.entries($localUserLibrary).sort((a, b) => (a[1].date_edited < b[1].date_edited) ? 1 : -1)
	// }

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
	<div class="spacer" style="margin-top: 2.5rem;" />
	{#if !$spellbookQuery}
		<div class="sort_by_wrapper">
			<select bind:value={sort} name="sort" id="sort" class="minimal">
				<option value="alphabetical">Alphabetical</option>
				<option value="created">Date created</option>
				<option value="modified" selected>Date modified</option>
			</select>
			<button class="updown" />
			<div class="updown">
				<input bind:checked={updown} id="updown" type="checkbox" />
				<label for="updown"><i class="ri-arrow-down-line" /></label>
			</div>
		</div>
	{/if}
	<div class="books_list" style="padding-bottom: calc(var(--safe-area-inset-bottom) + 5rem);">
		{#each spellbooks as spellbook, i}
			<!-- <h1>{$localUserLibrary[key].name}</h1> -->
			{#if !$spellbookQuery || results.includes(spellbook[0])}
				<SpellbookSlot
					on:click={() => {
						$modalCall = 'spellbook';
						$lookupBookId = spellbook[0];
					}}
					id={spellbook[0]}
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
		{#if Object.entries($localUserLibrary).length < 13}
			<SpellbookSlot id="new" on:click={() => ($modalCall = 'new')} />
		{/if}
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
	div.books_list {
		width: 100%;
		position: relative;
		padding: 0.8rem 0.8rem 0;
	}
	.sort_by_wrapper {
		width: 100%;
		padding: 0.8rem 0.8rem 0;
		display: flex;
		justify-content: flex-end;
		.updown {
			display: inline-block;
			input {
				display: none;

				&:checked + label {
					transform: scaleY(-1);
				}
			}
			label {
				all: unset;
				display: inline-block;
				transition: 0.1s;
				padding: 0.2rem;
				i {
					color: var(--inputbg);
					vertical-align: sub;
				}
			}
		}
	}
</style>
