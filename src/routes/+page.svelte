<script>
	import AddSpellsMenu from '../components/addSpellsMenu.svelte';
	import MobileHeader from '../components/mobile/mobile-header.svelte';
	import MobileTabbar from '../components/mobile/mobile-tab-bar.svelte';
	import MobileActiveTabbar from '../components/mobile/mobile-activeTab-bar.svelte';
	import Modal from '../components/modal.svelte';
	import QuickSearchPanel from '../components/quickSearchPanel.svelte';
	import SmokeScreen from '../components/smokeScreen.svelte';
	import Account from '../views/account.svelte';
	import Browse from '../views/browse.svelte';
	import Library from '../views/library.svelte';
	import Spellbook from '../views/spellbook.svelte';
	import { goto } from '$app/navigation';

	import {
		addSpellsMenuOpen,
		horizontalSwipe,
		modalCall,
		page,
		quickSearchPanelOpen,
		scrollY,
		visualViewport
	} from '../stores';
	import MobileTabpanel from '../components/mobile/mobile-tabpanel.svelte';
	import { crossfade, fade, fly, scale, slide } from 'svelte/transition';
	import { user } from '../stores-persist';
	import { onMount } from 'svelte';

	let touchStart, touchEnd, touchPos, touchMove, direction, screenWidth, mainContent;

	function handleTouchStart(e) {
		if ($page === 'spellbook') {
			touchMove = true;
			touchStart = e.touches[0].clientX;
			// console.log(touchStart / screenWidth);
		}
	}
	function handleTouchMove(e) {
		if (touchStart / screenWidth < 0.12 && $page === 'spellbook') {
			if (e.touches[0].clientX > touchStart) {
				$horizontalSwipe = Math.max(
					0,
					Math.min((e.touches[0].clientX - touchStart) / screenWidth, 1)
				);
				// console.log($horizontalSwipe)
			}
		}
	}
	function handleTouchEnd(e) {
		if ($page === 'spellbook') {
			if ($horizontalSwipe > 0.4) {
				$addSpellsMenuOpen = true;
				touchStart = 0;
				$horizontalSwipe = 0;
			} else {
				touchStart = 0;
				$horizontalSwipe = 0;
			}
		}
	}
	onMount(() => {
		if (!$user) {
			goto('/onboarding');
		}
	});
</script>

<div
	out:fly={{ duration: 300, y: 20 }}
	in:fly={{ duration: 300, y: 20, delay: 300 }}
	class="main_content"
	class:right={$addSpellsMenuOpen}
	on:scroll={(e) => ($scrollY = e.target.scrollTop)}
	bind:this={mainContent}
	class:back={$quickSearchPanelOpen || $modalCall}
	style="{$horizontalSwipe
		? 'transition: 0s; overflow-y: hidden; transform: translateX(' + $horizontalSwipe * 100 + '%)'
		: ''};"
>
	{#key $page}
		<div
			in:fade={{ duration: 200 }}
			bind:clientWidth={screenWidth}
			class="page"
			on:touchmove={(e) => handleTouchMove(e)}
			on:touchstart={(e) => handleTouchStart(e)}
			on:touchend={(e) => handleTouchEnd(e)}
		>
			{#if $page === 'spellbook'}
				<Spellbook />
			{/if}
			{#if $page === 'library'}
				<Library />
			{/if}
			{#if $page === 'browse'}
				<Browse />
			{/if}
			{#if $page === 'account'}
				<Account />
			{/if}
		</div>
	{/key}
</div>

<div
	class:right={$addSpellsMenuOpen}
	class:back={$modalCall}
	class="fixed_ui"
	style="{$horizontalSwipe
		? 'transition: 0s; transform: translateX(' + $horizontalSwipe * 100 + '%)'
		: ''}; touch-action: none;"
	out:fly={{ duration: 300, y: 20 }}
	in:fly={{ duration: 300, y: 20, delay: 300 }}
>
	<AddSpellsMenu />
	<QuickSearchPanel />
	<MobileHeader />
	<MobileTabbar />
	<MobileActiveTabbar />
	<MobileTabpanel />
</div>

<style lang="scss">
	.fixed_ui {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		transform-origin: center;
		transition: transform 0.35s;
		pointer-events: none;
		transition-timing-function: cubic-bezier(0.3, 0, 0.3, 1);
		z-index: 2;
		// overflow-y: hidden;
		touch-action: none;
		&.back {
			transform: scale(0.98);
		}
		&.right {
			transform: translateX(100%);
		}
	}
	.main_content {
		padding: 0 0.3rem;
		height: 100vh;
		transform-origin: center;
		transition: 0.35s;
		overflow-x: hidden;
		overflow-y: auto;
		position: relative;
		// height: 100%;
		width: 100vw;
		transition-timing-function: cubic-bezier(0.3, 0, 0.3, 1);
		pointer-events: auto;
		&.back {
			transform: scale(0.98);
			height: 100vh;
			position: fixed;
			top: 0;
		}
		&.right {
			transform: translateX(100%);
			pointer-events: none;
		}
	}
</style>
