<script>
	import SafeViewPadding from '../components/safeViewPadding.svelte';
	import SpellCard from '../components/spellCard.svelte';
	import { addSpellsMenuOpen, levelInView, sortedSpellsList, spellList, view } from '../stores';
	import { activeOpenBookId, localUserLibrary, openBooksIdsArray, spells } from '../stores-persist';
	// $sortedSpellsList = [[], [], [], [], [], [], [], [], [], []];
	$: $spellList = $openBooksIdsArray.includes($activeOpenBookId) && $localUserLibrary[$activeOpenBookId] ? $localUserLibrary[$activeOpenBookId].list : [];
	
	$: $spellList, sortSpells();

	function sortSpells() {
		$sortedSpellsList = [[], [], [], [], [], [], [], [], [], []];
		if ($spellList) {
			for (let i = 0; i < $spellList.length; i++) {
				$sortedSpellsList[$spells.find((o) => o.id == $spellList[i]).level].push($spellList[i]);
			}
		}
	}


</script>

<SafeViewPadding>
	<div class="list_wrapper">
		{#if $openBooksIdsArray && $openBooksIdsArray.length > 0 && $activeOpenBookId}
			{#if $spellList && $spellList.length > 0}
				{#each $sortedSpellsList as list, i}
					{#if list.length > 0}
						{@const currentLevel = $sortedSpellsList.indexOf(list)}
						<h4 id={currentLevel}>
							{currentLevel === 0 ? 'Cantrips' : 'Level ' + currentLevel}
						</h4>
						<div class="list" data-level={currentLevel}>
							{#each list as spellId, i}
								{@const spell = $spells.find((o) => o.id == spellId)}
								<SpellCard id={currentLevel + `${i}`} type="list" data={spell} />
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
			margin-top: 2.5rem;
		}
	}
</style>
