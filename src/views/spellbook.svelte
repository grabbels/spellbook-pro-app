<script>
	import Button from '../components/button.svelte';
	import SafeViewPadding from '../components/safeViewPadding.svelte';
	import SpellCard from '../components/spellCard.svelte';
	import { addSpellsMenuOpen, headerHeight } from '../stores';
	import { localUserLibrary } from '../stores-persist';
	let spellList = $localUserLibrary[0].list;
	// let spellList;

	$: $localUserLibrary, (spellList = $localUserLibrary[0].list);

	let sortedSpellsList;

	$: spellList, sortSpells();

	function sortSpells() {
		console.log('sorting');
		sortedSpellsList = [[], [], [], [], [], [], [], [], [], []];
		for (let i = 0; i < spellList.length; i++) {
			sortedSpellsList[spellList[i].level].push(spellList[i]);
		}
	}
</script>

<SafeViewPadding header>
	<div class="list_wrapper">
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
			font-size: .9rem;
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
