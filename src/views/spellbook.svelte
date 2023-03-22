<script>
	import Button from '../components/button.svelte';
	import SafeViewPadding from '../components/safeViewPadding.svelte';
	import SpellCard from '../components/spellCard.svelte';
	import { addSpellsMenuOpen } from '../stores';
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
				<!-- <h4 id={currentLevel}>{currentLevel === 0 ? 'Cantrips' : 'Level ' + currentLevel}</h4> -->
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
		h4 {
			padding: .5rem;
			margin: 1rem 0.2rem .5rem;
			text-align: center;
			background-color: var(--translucent);
			width: calc(100% - .4rem);
			border-radius: 6px;
		}
		.list {
			display: grid;
		}
		&:nth-child(2) {
			h4 {
				margin-top: 0;
			}
		}
	}
</style>
