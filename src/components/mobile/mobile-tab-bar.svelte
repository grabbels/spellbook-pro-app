<script>
	import { fly } from 'svelte/transition';
	import { page, tabBarHeight } from '../../stores';
	import Tab from './mobile-tab.svelte';
</script>

<div class="ui-mobile_tabbar" bind:clientHeight={$tabBarHeight}>
	<Tab on:touchstart={() => ($page = 'spellbook')} name="Spellbook" icon="ri-book-open-line" />
	<Tab on:touchstart={() => ($page = 'library')} name="Library" icon="ri-book-mark-line" />
	<Tab on:touchstart={() => ($page = 'browse')} name="Browse" icon="ri-layout-masonry-line" />
	<Tab on:touchstart={() => ($page = 'account')} name="Account" icon="ri-account-box-line" />

</div>

<style lang="scss">
	.ui-mobile_tabbar {
		width: 100%;
		position: fixed;
		// background-color: var(--panelbg);
		bottom: 0;
		left: 0;
		padding: 0.3rem 0.7rem max(calc(var(--safe-area-inset-bottom) + 0.3rem), 0.5rem);
		// padding-bottom: max(var(--safe-area-inset-bottom), .5rem);
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		z-index: 10;
		pointer-events: auto;
		// .indicator_container {
		// 	position: absolute;
		// 	left: 0;
		// 	top: 0;
		// 	// bottom: -.25rem;
		// 	// margin: 0.3rem 0.7rem max(calc(var(--safe-area-inset-bottom) + 0.3rem), 0.5rem);
		// 	pointer-events: none;
		// 	height: 100%;
		// 	.indicator {
		// 		width: 25%;
		// 		height: 100%;
		// 		.inner {
		// 			background-color: var(--moretranslucent);
		// 			height: 2rem;
		// 			width: 100%;
		// 		}
		// 	}
		// }
		&:after {
			content: '';
			position: absolute;
			left: -1rem;
			right: -1rem;
			top: 0;
			bottom: -1rem;
			// background-color: var(--panelbg);
			z-index: -1;
		}
	}
</style>
