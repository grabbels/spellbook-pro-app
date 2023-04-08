<script>
	import { fade, fly } from 'svelte/transition';
	import {
		addSpellsMenuOpen,
		headerHeight,
		modalCall,
		view,
		quickQuery,
		quickSearchPanelOpen,
		scrollY,
		notification,
		spellbookQuery,
		zoomOutModifier,
		filterPanelOpen,
		spellList,
		filters,

		browseQuery

	} from '../../stores';
	import { activeOpenBookId, localUserLibrary } from '../../stores-persist';
	import Button from '../button.svelte';
	import SearchField from '../searchField.svelte';
</script>

<div
	class="ui-mobile_header"
	class:scrolled={$scrollY > 0}
	class:quicksearch={$quickSearchPanelOpen}
	class:columns={$view === 'spellbook' || $view === 'library'}
	bind:clientHeight={$headerHeight}
	style={$zoomOutModifier ? 'transform: scale(' + (1 + $zoomOutModifier * 0.02) + ')' : ''}
>
	<div class="header_content">
		<h1>
			{$view.replace(/^(\w)(.+)/, (match, p1, p2) => p1.toUpperCase() + p2.toLowerCase())}
		</h1>
		<div
			class="wrapper {$view === 'spellbook' &&
			$localUserLibrary &&
			$activeOpenBookId !== '' &&
			$activeOpenBookId !== null
				? 'three'
				: ''}"
		>
			{#if $view === 'spellbook'}
				{#if $localUserLibrary && $activeOpenBookId !== '' && $activeOpenBookId !== null}
					<Button
						text=""
						icon="ri-add-line"
						type="fill accent liquid"
						liquid
						left
						on:click={() => ($addSpellsMenuOpen = true)}
					/>
				{:else}
					<Button
						text="Library"
						icon="ri-book-mark-line"
						type="fill blue"
						left
						on:click={() => {
							$view = 'library';
						}}
					/>
				{/if}
			{:else if $view === 'library'}
				{#if Object.entries($localUserLibrary).length < 12}
					<Button
						text="New book"
						icon="ri-add-line"
						type="fill accent liquid"
						liquid
						left
						on:click={() => {
							if (Object.keys($localUserLibrary).length < 13) {
								$modalCall = 'new';
							} else {
								$notification = 'You have reached the maximum of 12 spellbooks.#alert';
							}
						}}
					/>
				{:else}
					<Button
						text="New book"
						icon="ri-add-line"
						type="outline"
						left
						on:click={() => {
							$notification = "You've reached the maximum of 12 saved books!#alert"
						}}
					/>
				{/if}
			{/if}
			<div class="input_wrapper">
				{#if $view === 'spellbook'}
					<SearchField
						noclose
						placeholder="Quick spell lookup..."
						on:focus={() => ($quickSearchPanelOpen = true)}
						on:focusout={() => ($quickSearchPanelOpen = false)}
						bind:value={$quickQuery}
						middle={!$quickSearchPanelOpen}
					/>
				{:else if $view === 'library'}
					<SearchField placeholder="Search spellbooks..." bind:value={$spellbookQuery} right />
				{:else if $view === 'browse'}
					<SearchField placeholder="Search spellbooks by creator, class..." bind:value={$browseQuery} />
				{/if}
				{#if $quickSearchPanelOpen}
					<button
						class="close"
						on:click={() => ($quickSearchPanelOpen = false)}
						transition:fade={{ duration: 150 }}
					>
						<i class="ri-close-line" />
					</button>
				{/if}
			</div>
			{#if $view === 'spellbook' && $localUserLibrary && $activeOpenBookId !== '' && $activeOpenBookId !== null}
				<Button
					text=""
					icon="ri-filter-line"
					type="{Object.keys($filters).length > 0 ? 'darkblue' : 'subtle'} fill"
					iconfill={Object.keys($filters).length > 0}
					right
					on:click={() => {
						$filterPanelOpen = true;
					}}
				/>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	div.ui-mobile_header {
		height: calc(max(var(--safe-area-inset-top), 2rem) + 2rem);
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		z-index: 20;
		pointer-events: auto;
		.header_content {
			padding: max(var(--safe-area-inset-top), 1rem) 1rem 0;
			transition: 0.2s;

			h1 {
				text-align: center;
				font-size: 1.3rem;
				margin: 0 0 0.7rem;
				height: var(--huge-radius);
				transition: 0.3s;
				overflow: hidden;
				will-change: height, margin;
			}
			.input_wrapper {
				position: relative;
				transform-origin: center top;
				transition: 0.3s;
				button.close {
					position: absolute;
					right: 0.7rem;
					top: 50%;
					transform: translateY(-50%);
					background-color: var(--translucent);
					border-radius: 50vw;
					width: 20px;
					height: 20px;
					display: flex;
					justify-content: center;
					align-items: center;
					i {
						font-size: 1rem;
						opacity: 0.5;
					}
				}
			}
		}
		&.scrolled {
			.header_content {
				h1 {
					height: 0;
					margin: 0;
				}
			}
		}
		&:after {
			z-index: -1;
			content: '';
			position: absolute;
			left: -1rem;
			top: -1rem;
			bottom: 0rem;
			right: -1rem;
			background-color: var(--bodybg);
			mask-image: linear-gradient(180deg, black 25%, transparent 100%);
			pointer-events: none;
		}

		&.columns {
			.header_content {
				.wrapper {
					will-change: grid-template-columns, height;
					display: grid;
					height: 54px;
					grid-template-columns: 125px 1fr 0;
					gap: 0.2rem;
					background-color: var(--cardbg);
					border-radius: var(--large-radius);
					overflow: hidden;
					transition: 0.2s;
					&.three {
						grid-template-columns: 58px 1fr 58px;
					}
				}
			}
			&.scrolled {
				.header_content {
					.wrapper {
						// height: 48px;
					}
				}
			}
		}
		&.quicksearch {
			.header_content {
				h1 {
					height: 0;
				}
				padding: max(var(--safe-area-inset-top), 1rem) 1rem 0;
				.wrapper {
					grid-template-columns: 0 1fr 0 !important;
					gap: 0;
					border-radius: var(--medium-radius);
					transform: scale(1.025);
				}
				.input_wrapper {
					// transform: scale(1.025);
				}
			}
		}
	}
</style>
