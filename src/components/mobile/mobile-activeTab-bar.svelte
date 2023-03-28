<script>
	import { fly } from 'svelte/transition';
	import { view, tabBarHeight, tabPanelOpen } from '../../stores';
	import { activeBookIndex, localUserLibrary } from '../../stores-persist';
</script>

{#if $view.toLowerCase() === 'spellbook'}
	<button
		class="ui-active_tab_bar"
		style="bottom: calc({$tabBarHeight}px + .5rem); --bookcolor: {$localUserLibrary &&
		$activeBookIndex !== '' &&
		$activeBookIndex != null &&
		$activeBookIndex != -1
			? $localUserLibrary[$activeBookIndex].color
			: 'var(--purple)'}"
		transition:fly={{ y: 50, duration: 250 }}
		on:click={() => ($tabPanelOpen = true)}
		class:hidden={$tabPanelOpen}
	>
		<div class="inner">
			<div class="icon" style="">
				<i class="ri-book-open-line" />
			</div>
			<div class="name_wrap">
				<p>
					{#if $localUserLibrary && $activeBookIndex !== '' && $activeBookIndex != null && $activeBookIndex != -1}
						{$localUserLibrary[$activeBookIndex].name.toString().replaceAll(',', ' ')}
					{:else}
						<span style="opacity: .5">No open spellbook</span>
					{/if}
				</p>
			</div>
		</div>
		<!-- <div class="book_color_line" style="background-color: var(--pink)" /> -->
	</button>
{/if}

<style lang="scss">
	.ui-active_tab_bar {
		width: calc(100% - 1.4rem);
		border-radius: 12px;
		position: fixed;
		left: 0.7rem;
		overflow: hidden;
		pointer-events: auto;
		transition: 0.3s;
		opacity: 1;
		height: 48px;
		box-sizing: border-box;
		&:before {
			content: '';
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			position: absolute;
			background-color: var(--panelbg);
			z-index: -1;
		}
		&:after {
			content: '';
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			position: absolute;
			background-color: var(--bookcolor);
			z-index: -1;
			opacity: .3;
		}
		&.hidden {
			transform: translateY(6rem);
			opacity: 0;
		}
		.book_color_line {
			content: '';
			left: 0;
			right: 0;
			bottom: 0;
			position: absolute;
			z-index: 1;
			height: 2px;
		}
		.inner {
			z-index: 1;
			display: grid;
			grid-template-columns: auto 1fr;
			// padding: 0.8rem;
			.name_wrap {
				margin: auto;
				font-weight: 400;
				color: white;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 0 .7rem;
				overflow: hidden;
				width: 100%;
				mask-image: linear-gradient(90deg, black calc(100% - 2rem), transparent calc(100% - 1rem));
				p {
					font-weight: 400;
					// opacity: .7;
					color: white;
					margin: 0;
					white-space: nowrap;
					text-transform: capitalize;
					min-width: 100%;
					text-align: center;
				}
			}
			.icon {
				height: calc(48px - 0.4rem);
				width: calc(48px - 0.4rem);
				margin-left: 0.2rem;
				aspect-ratio: 1 / 1;
				background-color: var(--moretranslucent);
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 12px;
				// margin: 1rem;
				i {
					font-size: 1.2rem;
					color: white;
				}
			}
		}
	}
</style>
