<script>
	import { afterUpdate, onMount } from 'svelte';
	import Button from '../components/button.svelte';
	import SafeViewPadding from '../components/safeViewPadding.svelte';
	import SpellCard from '../components/spellCard.svelte';
	import {
		addSpellsMenuOpen,
		filters,
		levelInView,
		sortedSpellsList,
		spellList,
		view
	} from '../stores';
	import { activeOpenBookId, localUserLibrary, openBooksIdsArray, spells } from '../stores-persist';
	// $sortedSpellsList = [[], [], [], [], [], [], [], [], [], []];
	$: $activeOpenBookId &&
	$openBooksIdsArray.includes($activeOpenBookId) &&
	$localUserLibrary[$activeOpenBookId]
		? createSpellList()
		: '';
	function createSpellList() {
		if (
			$activeOpenBookId &&
			$openBooksIdsArray.includes($activeOpenBookId) &&
			$localUserLibrary[$activeOpenBookId]
		) {
			$spellList = [];
			let list = $localUserLibrary[$activeOpenBookId].list;
			for (let i = 0; i < list.length; i++) {
				$spellList = [...$spellList, $spells.find((o) => o.id == list[i])];
				i === list.length - 1 ? sortAndFilterSpells() : '';
			}
		}
	}

	$: $filters, createSpellList();

	let noShownSpells = false;
	function sortAndFilterSpells() {
		$sortedSpellsList = [[], [], [], [], [], [], [], [], [], []];
		let numberOfFilters = Object.keys($filters).length;
		noShownSpells = true;
		if ($spellList) {
			for (let i = 0; i < $spellList.length; i++) {
				let filterPass = 0;
				if (Object.keys($filters).length) {
					for (const key in $filters) {
						if ($spellList[i][key].toLowerCase().includes($filters[key])) {
							filterPass++;
							if (filterPass === numberOfFilters) {
								$sortedSpellsList[$spellList[i].level].push($spellList[i]);
								noShownSpells = false;
							}
						}
					}
				} else {
					$sortedSpellsList[$spellList[i].level].push($spellList[i]);
				}
			}
		}
	}

</script>

<SafeViewPadding>
	<div class="list_wrapper">
		{#if $openBooksIdsArray && $openBooksIdsArray.length > 0 && $activeOpenBookId}
			{#if $spellList && $spellList.length > 0}
				<div style="margin-top: 3.5rem">
					<!-- <Button
						text="Add spells"
						icon="ri-add-line"
						type="outline accent"
						on:click={() => ($addSpellsMenuOpen = true)}
					/>
					<Button
						text="Edit book"
						icon="ri-edit-2-line"
						type="outline"
						on:click={() => ($addSpellsMenuOpen = true)}
					/>
					<Button
						text="Share"
						icon="ri-share-line"
						type="outline blue"
						on:click={() => ($addSpellsMenuOpen = true)}
					/> -->
				</div>
				{#key $filters}
					{#if Object.keys($filters).length > 0 && noShownSpells}
						<p style="margin: 2rem">
							All spells were filtered away. <button
								class="href"
								on:click={() => {$filters = {}}}>Reset filters</button
							>.
						</p>
					{:else}
						{#each $sortedSpellsList as list, i}
							{#if list.length > 0}
								{@const currentLevel = $sortedSpellsList.indexOf(list)}
								<h4 id={currentLevel}>
									{currentLevel === 0 ? 'Cantrips' : 'Level ' + currentLevel}
								</h4>
								<div class="list" data-level={currentLevel}>
									{#each list as spell, i}
										<SpellCard id={currentLevel + `${i}`} type="list" data={spell} />
									{/each}
								</div>
							{/if}
						{/each}
					{/if}
				{/key}
			{:else}
				<p style="margin: 2rem">
					A whole lot of nothing. <button class="href" on:click={() => ($addSpellsMenuOpen = true)}
						>Add some spells</button
					> to this spellbook!
				</p>
			{/if}
		{:else}
			<p style="margin: 4rem 2rem 2rem">
				<button class="href" on:click={() => ($view = 'library')}>Open a spellbook</button> to get started!
			</p>
		{/if}
	</div>
</SafeViewPadding>

<style lang="scss">
	.list_wrapper {
		padding-bottom: calc(var(--safe-area-inset-bottom) + 120px);
		text-align: center;
		h4 {
			padding: 0.4rem 0.75rem;
			margin: 1rem 0.2rem 0.5rem;
			text-align: center;
			background-color: var(--lightblue);
			width: 90px;
			display: inline-block;
			border-radius: 50vh;
			color: var(--lesstranslucent);
			opacity: 1;
			position: sticky;
			top: calc(var(--safe-area-inset-top) + 3.7rem);
			z-index: 1;
			font-size: 0.9rem;
		}
		.list {
			display: grid;
		}
		&:nth-child(2) {
			h4 {
				margin-top: 0;
			}
		}
		&:first-child {
			margin-top: 2.5rem;
		}
	}
</style>
