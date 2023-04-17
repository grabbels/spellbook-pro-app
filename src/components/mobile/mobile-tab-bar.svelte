<script>
	import { fly } from 'svelte/transition';
	import { tabBarHeight, view } from '../../stores';
	import Tab from './mobile-tab.svelte';
</script>

<div class="ui-mobile_tabbar" bind:clientHeight={$tabBarHeight}>
	<Tab
		on:touchstart={() => ($view = 'spellbook')}
		on:click={() => ($view = 'spellbook')}
		name="Spellbook"
		icon="ri-book-open-line"
	/>
	<Tab
		on:touchstart={() => ($view = 'library')}
		on:click={() => ($view = 'library')}
		name="Library"
		icon="ri-book-mark-line"
	/>
	<Tab
		on:touchstart={() => ($view = 'browse')}
		on:click={() => ($view = 'browse')}
		name="Browse"
		icon="ri-layout-masonry-line"
	/>
	<Tab
		on:touchstart={() => ($view = 'settings')}
		on:click={() => ($view = 'settings')}
		name="Settings"
		icon="ri-settings-line"
	/>
</div>

<style lang="scss">
	.ui-mobile_tabbar {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 0.3rem 0.7rem max(calc(var(--safe-area-inset-bottom)), 1rem);
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		z-index: 10;
		pointer-events: auto;
		&:after {
			content: '';
			position: absolute;
			left: -1rem;
			right: -1rem;
			top: 0;
			bottom: -1rem;
			// background-color: var(--panelbg);
			z-index: -1;
			background-color: var(--bodybg);
			mask-image: linear-gradient(0deg, rgba(0,0,0,1) 0%, transparent 100%);
			pointer-events: none;
		}
		@media only screen and (min-width: 992px) {
			bottom: auto;
			top: 2.5rem;
			left: auto;
			right: 0;
			z-index: 20;
			width: 400px;
			max-width: 30vw;
			&:after {
				display: none;
			}
		}
	}
</style>
