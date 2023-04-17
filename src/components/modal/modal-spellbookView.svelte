<script>
	import { afterUpdate, onMount } from 'svelte';
	import Button from '../../components/button.svelte';
	import SafeViewPadding from '../../components/safeViewPadding.svelte';
	import SpellCard from '../../components/spellCard.svelte';
	import { lookupSpellList } from '../../stores';
	import { spells } from '../../stores-persist';
	// sortedSpellsList = [[], [], [], [], [], [], [], [], [], []];
	let sortedSpellsList = [];
	let spellList = [];
	let noShownSpells = false;
	if ($lookupSpellList && $lookupSpellList.length) {
		createSpellList();
	} else {
		spellList = [];
		sortedSpellsList = [];
	}

	function createSpellList() {
		spellList = [];
		let list = $lookupSpellList;
		for (let i = 0; i < list.length; i++) {
			let spell = $spells.find((o) => o.id == list[i]) ? $spells.find((o) => o.id == list[i]) : '';
			if (spell) {
				spellList = [...spellList, spell];
				i === list.length - 1 ? sortAndFilterSpells() : '';
			}
		}
	}

	function sortAndFilterSpells() {
		sortedSpellsList = [[], [], [], [], [], [], [], [], [], []];
		noShownSpells = true;
		if (spellList) {
			for (let i = 0; i < spellList.length; i++) {
				sortedSpellsList[spellList[i].level].push(spellList[i]);
			}
		}
	}
</script>

<div class="spellsheet_wrapper">
	{#each sortedSpellsList as list, i}
		{#if list.length > 0}
			{@const currentLevel = sortedSpellsList.indexOf(list)}
			<h4 id={currentLevel}>
				{currentLevel === 0 ? 'Cantrips' : 'Level ' + currentLevel}
			</h4>
			<div class="list" data-level={currentLevel}>
				{#each list as spell, i}
					<SpellCard id={currentLevel + `${i}`} type="list noprepare" data={spell} />
				{/each}
			</div>
		{/if}
	{:else}
		<div style="opacity: .7; text-align:center">
			<h1><i class="ri-loader-line" /></h1>
			<p>This book has no spells.</p>
		</div>
	{/each}
</div>
<style lang="scss">
.spellsheet_wrapper {
	width: calc(100% + 2rem);
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-left: -1rem;
	.list {
		width: 100%;
		display: grid;
	}
}
</style>