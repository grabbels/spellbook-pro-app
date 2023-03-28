<script>
	import { onMount } from 'svelte';
	import Button from '../components/button.svelte';
	import SafeViewPadding from '../components/safeViewPadding.svelte';
	import SpellCard from '../components/spellCard.svelte';
	import { addSpellsMenuOpen, headerHeight, view } from '../stores';
	import { activeBookIndex, localUserLibrary, openBooksIdsArray } from '../stores-persist';

	let spellList;
	let sortedSpellsList = [[], [], [], [], [], [], [], [], [], []];

	$: if ($localUserLibrary && $activeBookIndex >= 0 && $openBooksIdsArray && $openBooksIdsArray.length) {
		spellList = $localUserLibrary[$localUserLibrary.map((object) => object.id).indexOf($openBooksIdsArray[$activeBookIndex])].list;
	}

	$: spellList, sortSpells();

	function sortSpells() {
		console.log('sorting');
		sortedSpellsList = [[], [], [], [], [], [], [], [], [], []];
		console.log(spellList)
		if (spellList) {
			for (let i = 0; i < spellList.length; i++) {
				sortedSpellsList[spellList[i].level].push(spellList[i]);
			}
		}
	}
</script>

<SafeViewPadding header>
	<div class="list_wrapper">
		{#if $openBooksIdsArray && $openBooksIdsArray.length > 0 && $activeBookIndex <= 0}
			{#if spellList && spellList.length > 0}
				{#each sortedSpellsList as list}
					{#if list.length > 0}
						{@const currentLevel = sortedSpellsList.indexOf(list)}
						<h4 id={currentLevel}>
							{currentLevel === 0 ? 'Cantrips' : 'Level ' + currentLevel}
						</h4>
						<div class="list">
							{#each list as spell}
								<SpellCard type="list" data={spell} />
							{/each}
						</div>
					{/if}
				{/each}
			{:else}
				<p style="margin: 2rem">
					A whole lot of nothing. <button class="href" on:click={() => ($addSpellsMenuOpen = true)}
						>Add some spells</button
					> to this spellbook!
				</p>
			{/if}
		{:else}
			<p style="margin: 2rem">
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
			// background-color: rgba(255,255,255,.05);
			// backdrop-filter: blur(20px);
			// bottom: 0;
			// width: calc(100% - .4rem);
			width: 90px;
			display: inline-block;
			border-radius: 50vh;
			color: var(--lesstranslucent);
			opacity: 1;
			position: sticky;
			// width: 100px;
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
			margin-top: 0.7rem;
		}
	}
</style>
