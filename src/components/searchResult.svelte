<script>
	import { compute_rest_props } from 'svelte/internal';
	import { fade } from 'svelte/transition';
	import {
	addSpell,
		addSpellsMenuOpen,
		lookupSpell,
		modalCall,
		notification,
		quickQuery,
		quickSearchPanelOpen
	} from '../stores';
	import { activeOpenBookId, localUserLibrary, openBooksIdsArray } from '../stores-persist';
	import CenterContainer from './centerContainer.svelte';
	import Schoolicon from './schoolicon.svelte';
	export let data;
	export let type = '';
	let touch = false;
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
		class:active={touch}
			on:touchstart={() => (touch = true)}
			on:touchend={() => {
				setTimeout(() => {
					touch = false;
				}, 50);
			}}
			on:click={(e) => {
				e.target.classList.add('active');
				setTimeout(() => {
					e.target.classList.remove('active');
				}, 1000);
				if (type === 'lookup') {
					$modalCall = 'spell';
					$lookupSpell = data;
					$quickQuery = '';
					$quickSearchPanelOpen = false;
				} else if (type === 'add') {
					$addSpell = data.id
					console.log($addSpell)
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
			position: relative;
			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				background-color: var(--moretranslucent);
				// transition: 0.05s;
				opacity: 0;
			}
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
			&:active, &.active {
				&:after {
					opacity: 1;
				}
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
