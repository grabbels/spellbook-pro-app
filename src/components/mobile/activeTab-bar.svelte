<script>
	import { fly } from 'svelte/transition';
	import { page, tabBarHeight, tabPanelOpen } from '../../stores';
</script>

{#if $page.toLowerCase() === 'spellbook'}
	<button
		class="ui-active_tab_bar"
		style="bottom: calc({$tabBarHeight}px + .5rem); background-color: var(--pink)"
		transition:fly={{ y: 50, duration: 250 }}
		on:click={() => ($tabPanelOpen = true)}
		class:hidden={$tabPanelOpen}
	>
		<div class="inner">
			<p>Active tab book title</p>
			<div class="icon">
				<i class="ri-book-open-line" />
			</div>
		</div>
		<div class="book_color_line" style="background-color: var(--pink)" />
	</button>
{/if}

<style lang="scss">
	.ui-active_tab_bar {
		width: calc(100% - 1rem);
		border-radius: 12px;
		position: fixed;
		left: 0.5rem;
		overflow: hidden;
		pointer-events: auto;
		transition: .3s;
		opacity: 1;
		&:after {
			content: '';
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			position: absolute;
			background-color: rgba(0, 0, 0, 0.6);
			z-index: -1;
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
			grid-template-columns: 1fr auto;
			// padding: 0.8rem;
			p {
				margin: auto;
				font-weight: 400;
				color: white;
			}
			.icon {
				height: 47px;
				aspect-ratio: 1 / 1;
				background-color: var(--moretranslucent);
				display: flex;
				justify-content: center;
				align-items: center;
				i {
					font-size: 1.2rem;
					color: white;
				}
			}
		}
	}
</style>
