<script>
	import { fade } from 'svelte/transition';
	import {
		addSpellsMenuOpen,
		lookupSpell,
		modalCall,
		notification,
		quickQuery,
		quickSearchPanelOpen
	} from '../stores';
	import { activeBookIndex, localUserLibrary, openBooksIdsArray } from '../stores-persist';
	import CenterContainer from './centerContainer.svelte';
	import Schoolicon from './schoolicon.svelte';
	export let data;
	export let type = '';

</script>

{#if data === 'noresult'}
	<li>
		<p>No results</p>
	</li>
{:else}
	<li
		class:lookup={type === 'lookup'}
		class:add={type === 'add'}
		transition:fade={{ duration: 200 }}
	>
		<button
			on:click={() => {
				if (type === 'lookup') {
					$modalCall = 'spell';
					$lookupSpell = data;
					$quickQuery = '';
					$quickSearchPanelOpen = false;
				} else if (type === 'add') {
					let index = $localUserLibrary.map((object) => object.id).indexOf($openBooksIdsArray[$activeBookIndex]);
					$localUserLibrary[index].list = [...$localUserLibrary[index].list, data];
					$localUserLibrary = $localUserLibrary
					$notification = 'Spell added.#positive';
					// $addSpellsMenuOpen = false;
				}
			}}
		>
			<CenterContainer>
				<Schoolicon school={data.school} />
			</CenterContainer>
			<div>
				<h2>{data.name}</h2>
				<p>{data.type}</p>
			</div>
			{#if type === 'lookup'}
				<CenterContainer>
					<i class="ri-search-line" />
				</CenterContainer>
			{:else if type === 'add'}
				<CenterContainer>
					<i class="ri-add-line" />
				</CenterContainer>
			{/if}
		</button>
	</li>
{/if}

<style lang="scss">
	li {
		border-bottom: 1px solid var(--moretranslucent);
		pointer-events: auto;
		button {
			padding: 0.8rem 0;
			width: 100%;
			pointer-events: auto;
			display: grid;
			grid-template-columns: 40px 1fr;
			gap: 0.5rem;
			h2 {
				font-size: 1.3rem;
				margin-bottom: 0.3rem;
			}
			p {
				font-weight: 300;
				margin: 0;
			}
			i {
				font-size: 1.5rem;
				opacity: 0.15;
			}
		}
		&:last-child {
			border-bottom: none;
		}
		&.lookup,
		&.add {
			button {
				grid-template-columns: 40px 1fr 30px;
			}
		}
	}
</style>
