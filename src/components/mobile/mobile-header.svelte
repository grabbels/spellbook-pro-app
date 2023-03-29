<script>
	import { fade, fly } from 'svelte/transition';
	import {
		addSpellsMenuOpen,
		headerHeight,
		modalCall,
		view,
		quickQuery,
		quickSearchPanelOpen,
		scrollY
	} from '../../stores';
	import { activeBookIndex, localUserLibrary } from '../../stores-persist';
	import Button from '../button.svelte';
	import SearchField from '../searchField.svelte';
</script>

<div
	class="ui-mobile_header"
	class:scrolled={$scrollY > 0}
	class:quicksearch={$quickSearchPanelOpen}
	class:columns={$view === 'spellbook' || $view === 'library'}
	bind:clientHeight={$headerHeight}
>
	<div class="header_content">
		<h1>
			{$view.replace(/^(\w)(.+)/, (match, p1, p2) => p1.toUpperCase() + p2.toLowerCase())}
		</h1>
		<div class="wrapper">
			{#if $view === 'spellbook'}
				{#if $localUserLibrary && $activeBookIndex !== '' && $activeBookIndex !== null}
					<Button
						text="Add spells"
						icon="ri-add-line"
						type="fill accent"
						left
						on:click={() => ($addSpellsMenuOpen = true)}
					/>
				{:else}
					<Button
						text="Library"
						icon="ri-book-mark-line"
						type="fill blue"
						left
						on:click={() => ($view = 'library')}
					/>
				{/if}
			{:else if $view === 'library'}
				<Button
					text="New book"
					icon="ri-add-line"
					type="fill accent"
					left
					on:click={() => ($modalCall = 'new')}
				/>
			{/if}
			<div class="input_wrapper">
				<!-- <input
						type="text"
						class="search"
						bind:value={$quickQuery}
						placeholder="Quick spell lookup..."
						on:focus={() => ($quickSearchPanelOpen = true)}
						on:focusout={() => ($quickSearchPanelOpen = false)}
					/> -->
				{#if $view === 'spellbook'}
					<SearchField
						placeholder="Quick spell lookup..."
						on:focus={() => ($quickSearchPanelOpen = true)}
						on:focusout={() => ($quickSearchPanelOpen = false)}
						bind:value={$quickQuery}
						right
					/>
				{:else if $view === 'spellbook'}
					<SearchField placeholder="Search spellbooks..." right />
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
				margin: 0 0 .7rem;
				height: 24px;
				transition: .3s;
				overflow: hidden;
			}
			.input_wrapper {
				position: relative;
				transform-origin: center top;
				transition: 0.3s;

				// input {
				// 	width: 100%;
				// 	border: 2px solid transparent;
				// 	transition: 0.2s;
				// 	height: 100%;
				// 	&::placeholder {
				// 		opacity: 0.5;
				// 	}
				// 	&:focus {
				// 		border-color: var(--accent);
				// 	}
				// }
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
					display: grid;
					height: 54px;
					grid-template-columns: 125px 1fr;
					// grid-template-rows: 50px;
					gap: 0.3rem;
					background-color: var(--cardbg);
					border-radius: 18px;
					overflow: hidden;
					transition: 0.2s;
				}
			}
			&.scrolled {
				.header_content {
					.wrapper {
						height: 48px;
					}
				}
			}
		}
		&.quicksearch {
			.header_content {
				padding: max(var(--safe-area-inset-top), 1rem) 1rem 0;
				.wrapper {
					grid-template-columns: 0 1fr;
					gap: 0;
				}
				.input_wrapper {
					transform: scale(1.025);
				}
			}
		}
	}
</style>
