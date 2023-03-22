<script>
	import { fly } from 'svelte/transition';
	import { quickQuery, quickSearchPanelOpen, visualViewport } from '../stores';
	import { spells } from '../stores-persist';
	import SafeViewPadding from './safeViewPadding.svelte';
	import SearchResult from './searchResult.svelte';
	let results = [];
	$: if ($quickQuery) {
		results = [];
		$quickSearchPanelOpen = true;
		let query = $quickQuery.toLowerCase();
		for (let i = 0; i < $spells.length; i++) {
			if ($spells[i].name.toLowerCase().includes(query)) {
				results.push($spells[i]);
			}
		}
	} else {
        results = [];
    }
</script>

{#if $quickSearchPanelOpen}
	<div transition:fly={{ y: 100, duration: 300 }} class="ui-quicksearch_panel">
		<div class="inner" style="height: {$visualViewport.height}px">
			<SafeViewPadding side="top">
				<ul class="results">
					{#each results as spell}
                        <SearchResult type="lookup" data={spell} />
					{:else}
						{#if $quickQuery}
							<SearchResult data="noresult" />
						{/if}
					{/each}
				</ul>
			</SafeViewPadding>
		</div>
	</div>
{/if}

<style lang="scss">
	.ui-quicksearch_panel {
		position: fixed;
		top: 0;
		left: -1rem;
		right: -1rem;
		bottom: 0;
		background-color: var(--cardbg);
		z-index: 15;
		pointer-events: auto;
		.inner {
			transition: 0.2s;
			padding: 1rem 2rem 0 2rem;
			// background-color: yellow;
			width: 100%;
            overflow: hidden;
            position: relative;
			ul {
				padding-top: 50px;
                padding-bottom: 1rem;
                overflow: hidden;
                overflow-y: auto;
                height: 100%;
			}
		}
	}
</style>
