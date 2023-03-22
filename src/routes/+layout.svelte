<script>
	//css
	import '@fontsource/kanit/300.css';
	import '@fontsource/kanit/400.css';
	import '@fontsource/kanit/500.css';
	import 'remixicon/fonts/remixicon.css';

	//mobile-only components
	import MobileActiveTabbar from '../components/mobile/activeTab-bar.svelte';
	import MobileHeader from '../components/mobile/mobile-header.svelte';
	import MobileTabbar from '../components/mobile/tab-bar.svelte';
	import MobileTabpanel from '../components/mobile/mobile-tabpanel.svelte';
	//components
	import Modal from '../components/modal.svelte';
	import QuickSearchPanel from '../components/quickSearchPanel.svelte';
	import { Body } from 'svelte-body';
	//variables and functions
	import {
		addSpellsMenuOpen,
		horizontalSwipe,
		lookupSpell,
		modalCall,
		noScroll,
		notification,
		quickQuery,
		quickSearchPanelOpen,
		screenWidth,
		scrollY,
		tabPanelOpen,
		user,
		visualViewport,
		zoomOutModifier
	} from '../stores';
	import { onMount } from 'svelte';
	import SmokeScreen from '../components/smokeScreen.svelte';
	import DevTools from '../components/devTools.svelte';
	import AddSpellsMenu from '../components/addSpellsMenu.svelte';
	import { localUserLibrary } from '../stores-persist';
	import { dummyLibrary } from '../dummyLibrary';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Notification from '../components/notification.svelte';

	$localUserLibrary = dummyLibrary;

	//onMount
	onMount(() => {
		if (!$user) {
			// goto('/login');
		}
		$visualViewport = window.visualViewport;
		window.visualViewport.addEventListener('resize', () => {
			$visualViewport = window.visualViewport;
		});
	});

	$: if ($quickSearchPanelOpen === false) {
		$quickQuery = '';
	}
	$: if (!$modalCall) {
		$lookupSpell = '';
	}
	let interfaceBack;
	let mainContent;
	// $: if ($quickSearchPanelOpen || $modalCall) {
	// 	// interfaceBack = true
	// } else {
	// }
	function handleKeydown(e) {
		// console.log(e);
		if (e.key == 'Escape') {
			$modalCall = '';
			$quickQuery = '';
			$quickSearchPanelOpen = false;
			$addSpellsMenuOpen = false;
			document.activeElement.blur();
		}
	}
	// $: console.log($zoomOutModifier * 0.03)
	console.log($page.route.id);
	// $modalCall = 'login'
</script>

<!-- <DevTools /> -->
<slot />

{#if $notification}
	<Notification />
{/if}

<svelte:window on:keydown={(e) => handleKeydown(e)} bind:innerWidth={$screenWidth} />

<!-- <Body class={$modalCall || $quickSearchPanelOpen || $noScroll ? 'noscroll' : ''} /> -->
<Body
	style="height: {$visualViewport.height}px"
	class="{$page.route.id.replace('/', '')} {$addSpellsMenuOpen || $quickSearchPanelOpen
		? 'touch-action: none'
		: ''}"
/>

<style lang="scss" global>
	@import '../styles/reset.scss';
	@import '../styles/themes.scss';
	@font-face {
		font-family: 'Forum';
		src: url('$lib/fonts/Forum.eot');
		src: url('$lib/fonts/Forum.eot?#iefix') format('embedded-opentype'),
			url('$lib/fonts/Forum.woff2') format('woff2'), url('$lib/fonts/Forum.woff') format('woff'),
			url('$lib/fonts/Forum.ttf') format('truetype');
		font-weight: normal;
		font-style: normal;
		font-display: swap;
	}

	:root {
		--safe-area-inset-top: env(safe-area-inset-top);
		--safe-area-inset-bottom: env(safe-area-inset-bottom);
	}

	* {
		box-sizing: border-box;
	}

	body {
		font-family: 'Kanit';
		background-color: var(--bodybg);
		color: var(--onbackground);
		line-height: 1.15;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		// height: 100vh;
		overflow: hidden;
		transition: 1s;
		height: 100vh;
		* {
			box-sizing: border-box;
		}
		&.login {
			background-color: var(--panelbg);
		}
	}
	.noscroll {
		overflow: hidden;
		height: 100vh;
	}
	h1,
	h2,
	h3 {
		font-weight: 500;
	}
	h1 {
		font-size: 1.8rem;
	}
	h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}
	h3 {
		text-transform: uppercase;
		margin: 0.5rem 0;
		opacity: 0.4;
		font-size: 1.3rem;
		font-weight: 500;
	}
	h4 {
		text-transform: uppercase;
		margin: 0.5rem;
		opacity: 0.3;
		font-weight: 1rem;
		font-weight: 500;
	}
	p {
		font-weight: 300;
		font-size: 1rem;
		margin-bottom: 0.8rem;
		line-height: 1.4;
	}
	button {
		all: unset;
		cursor: pointer;
		&.href {
			text-decoration: underline;
		}
	}
	input,
	select,
	.input {
		// all: unset;
		color: var(--onbackground);
		cursor: pointer;
		min-height: 48px;
		box-sizing: border-box;
		padding: 0.6rem 0.8rem;
		background-color: var(--inputbg);
		border-radius: 12px;
		border: 2px solid transparent;
		font-size: 1rem;
		transition: 0.2s;
		&:focus {
			outline: none;
			border-color: var(--accent);
		}
	}
	input {
		&.search {
			padding-left: 2rem;
			&:before {
				background: transparent
					url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
					no-repeat center;
			}
		}
	}
	select {
		&:after {
			position: absolute;
			content: '>';
			right: 0;
			top: 0;
			font-size: 1.5rem;
			z-index: 1;
		}
	}
	::placeholder {
		opacity: 0.5;
		font-family: 'Kanit';
		font-size: 1rem;
		color: var(--onbackground);
	}
	form {
		input,
		textarea,
		select,
		.input {
			margin-bottom: 0.5rem;
			width: 100%;
		}
		input,
		select {
			height: 48px;
		}
		label {
			margin-bottom: 0.2rem;
			display: inline-block;
			color: var(--inputbg);
		}
	}
</style>
