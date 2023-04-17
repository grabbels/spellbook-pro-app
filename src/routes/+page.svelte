<script>
	import AddSpellsMenu from '../components/addSpellsMenu.svelte';
	import MobileHeader from '../components/mobile/mobile-header.svelte';
	import MobileTabbar from '../components/mobile/mobile-tab-bar.svelte';
	import MobileActiveTabbar from '../components/mobile/mobile-activeTab-bar.svelte';
	import Modal from '../components/modal.svelte';
	import QuickSearchPanel from '../components/quickSearchPanel.svelte';
	import Settings from '../views/settings.svelte';
	import Browse from '../views/browse.svelte';
	import Library from '../views/library.svelte';
	import Spellbook from '../views/spellbook.svelte';
	import { goto } from '$app/navigation';
	import {
		addSpellsMenuOpen,
		horizontalSwipe,
		modalCall,
		view,
		quickSearchPanelOpen,
		scrollY,
		visualViewport,
		confirm,
		levelInView,
		sortedSpellsList,
		zoomOutModifier,
		spellbookQuery,
		filterPanelOpen,
		tabPanelOpen,
		filters
	} from '../stores';
	import MobileTabpanel from '../components/mobile/mobile-tabpanel.svelte';
	import { crossfade, fade, fly, scale, slide } from 'svelte/transition';
	import { localUserLibrary, user } from '../stores-persist';
	import { onMount } from 'svelte';
	// import Sync from '../components/functions/func-sync.svelte';
	import Confirm from '../components/confirm.svelte';
	import BookmarksScrollbar from '../components/bookmarks-scrollbar.svelte';
	import MobileFilterPanel from '../components/mobile/mobile-filterPanel.svelte';
	import SmokeScreen from '../components/smokeScreen.svelte';
	import FuncSync from '../components/functions/func-sync.svelte';
	import SyncStatus from '../components/syncStatus.svelte';
	let touchStart, touchEnd, touchPos, touchMove, direction, screenWidth, mainContent;

	$: if ($view) {
		$scrollY = 0;
	}

	function handleTouchStart(e) {
		if ($view === 'spellbook') {
			touchMove = true;
			touchStart = e.touches[0].clientX;
			// console.log(touchStart / screenWidth);
		}
	}
	function handleTouchMove(e) {
		if (touchStart / screenWidth < 0.12 && $view === 'spellbook') {
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
		if ($view === 'spellbook') {
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

	function handleScroll() {
		let elementInView = document
			.elementFromPoint(10, $visualViewport.height / 2)
			.closest('div.list');
		if (elementInView) {
			$levelInView = elementInView.dataset.level;
		}
	}

	onMount(() => {
		if (!$user) {
			goto('/onboarding');
		}
	});
</script>

<FuncSync />
{#key $view}
	<div
		class="main_content {$view}"
		class:right={$addSpellsMenuOpen}
		on:scroll={(e) => {
			$scrollY = e.target.scrollTop;
			$view === 'spellbook' ? handleScroll() : '';
		}}
		bind:this={mainContent}
		class:back={$quickSearchPanelOpen || $modalCall || $filterPanelOpen}
		style="{$horizontalSwipe
			? 'transition: 0s; overflow-y: hidden; transform: translateX(' + $horizontalSwipe * 100 + '%)'
			: ''} {$zoomOutModifier ? 'transform: scale(' + (1 - $zoomOutModifier * 0.02) + ')' : ''};"
	>
		{#key $view}
			<div
				bind:clientWidth={screenWidth}
				class="page {$view}"
				on:touchmove={(e) => handleTouchMove(e)}
				on:touchstart={(e) => handleTouchStart(e)}
				on:touchend={(e) => handleTouchEnd(e)}
				style={$spellbookQuery ? 'height: ' + $visualViewport.height + 'px' : ''}
			>
				{#if $view === 'spellbook'}
					<Spellbook />
				{:else if $view === 'library'}
					{#key $localUserLibrary}
						<Library />
					{/key}
				{:else if $view === 'browse'}
					<Browse />
				{:else if $view === 'settings'}
					<Settings />
				{/if}
			</div>
		{/key}
	</div>
{/key}
<div
	class:right={$addSpellsMenuOpen}
	class:back={$modalCall}
	class:filters={Object.keys($filters).length > 0}
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
	<MobileFilterPanel />
	{#if $view === 'spellbook'}
		{#key $sortedSpellsList}
			<BookmarksScrollbar />
		{/key}
	{/if}
	{#if $modalCall || $tabPanelOpen || $filterPanelOpen}
		{#if $modalCall === 'spellbook'}
			<SmokeScreen solid />
		{:else}
			<SmokeScreen />
		{/if}
	{/if}

	<!-- <SyncStatus /> -->
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
		&:after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 1000;
			border: 4px solid var(--darkblue);
			border-radius: 50px;
			pointer-events: none;
			opacity: 0;
			transition: 0.2s;
		}
		&.filters {
			// &:after {
			// 	opacity: 1;
			// }
		}
	}
	.main_content {
		padding: 0 0.3rem;
		height: 100vh;
		transform-origin: center;
		transition: 0.35s;
		overflow-x: hidden;
		overflow-y: auto;
		scroll-behavior: smooth;
		position: relative;
		// height: 100%;
		width: 100vw;
		transition-timing-function: cubic-bezier(0.3, 0, 0.3, 1);
		pointer-events: auto;

		&.spellbook {
			&::-webkit-scrollbar {
				display: none;
				scrollbar-width: none; /* Firefox */
			}
		}
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
