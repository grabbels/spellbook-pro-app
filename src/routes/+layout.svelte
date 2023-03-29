<script>
	//variables and functions
	import {
		addSpellsMenuOpen,
		bookToEdit,
		horizontalSwipe,
		lookupSpell,
		modalCall,
		noScroll,
		notification,
		online,
		platform,
		confirm,
		quickQuery,
		quickSearchPanelOpen,
		screenWidth,
		scrollY,
		spellList,
		view,
		syncStatus,
		tabPanelOpen,
		visualViewport,
		zoomOutModifier
	} from '../stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import SmokeScreen from '../components/smokeScreen.svelte';
	import DevTools from '../components/devTools.svelte';
	import AddSpellsMenu from '../components/addSpellsMenu.svelte';
	import {
		activeBookIndex,
		localLastSyncTime,
		localUserLibrary,
		spells,
		unsyncedChanges,
		user
	} from '../stores-persist';
	// import { dummyLibrary } from '../dummyLibrary';
	import { page } from '$app/stores';
	import Notification from '../components/notification.svelte';
	import { Capacitor } from '@capacitor/core';
	$platform = Capacitor.getPlatform();
	//css
	import '@fontsource/kanit/300.css';
	import '@fontsource/kanit/400.css';
	import '@fontsource/kanit/500.css';
	import '@fontsource/roboto-mono';
	import 'remixicon/fonts/remixicon.css';
	// http://localhost:5173/?confirm-verification=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJfcGJfdXNlcnNfYXV0aF8iLCJlbWFpbCI6ImRldkBzZW1oYWsuZGV2IiwiZXhwIjoxNjgwMzYwODc4LCJpZCI6IjZoOXRkamtvM2V3M2ZkdCIsInR5cGUiOiJhdXRoUmVjb3JkIn0.Aq-mztHb4YT3MjsLPa-YrYwU8_eUsIWtMbx1S-JKfgA
	//pocketbase
	import PocketBase from 'pocketbase';
	const pb = new PocketBase('https://db.spellbook.pro');
	//check for href data

	// console.log($localUserLibrary.map(v => ({...v, isActive: true})))
	$: console.log($localUserLibrary)
	async function refreshAuth() {
		console.log('refreshAuth');
		try {
			const authData = await pb.collection('users').authRefresh();
			if (authData.record) {
				$user = authData.record;
				syncLibrary(authData.record);
			} else {
				$user = null;
				goto('/onboarding');
			}
		} catch (error) {
			console.log(error);
			$user = null;
		}
	}

	console.log($activeBookIndex);
	// pushSpells()
	async function pushSpells() {
		console.log($spells);
		for (let i = 0; i < $spells.length; i++) {
			const data = {
				casting_time: $spells[i].casting_time,
				classes: $spells[i].classes,
				components: $spells[i].components,
				description: $spells[i].description,
				duration: $spells[i].duration,
				level: $spells[i].level,
				name: $spells[i].name,
				range: $spells[i].range,
				ritual: $spells[i].ritual,
				school: $spells[i].school,
				tags: $spells[i].tags,
				type: $spells[i].type,
				save: $spells[i].save,
				attack: $spells[i].attack,
				higher_levels: $spells[i].higher_levels
			};

			try {
				const record = await pb.collection('spells').create(data);
				console.log(record);
			} catch (error) {
				console.log(error);
			}
		}
	}
	// pullSpells()
	async function pullSpells() {
		const records = await pb.collection('spells').getFullList({});
		console.log(records);
	}
	// removeSpells()
	async function removeSpells() {
		// you can also fetch all records at once via getFullList
		const records = await pb.collection('spells').getFullList({
			sort: '-created'
		});
		for (let i = 0; i < records.length; i++) {
			await pb.collection('spells').delete(records[i].id);
		}
	}

	async function syncLibrary(record) {
		// $syncStatus = 'working';
		// let remoteLastSyncTime;
		// if (record) {
		// 	//this means the sync was triggered by the auth refresh which means the app was just started
		// 	if ($unsyncedChanges === true) {
		// 		//the local library has been modified locally and wasn't synced before closing the app last time, possibly due to being offline
		// 		//the library needs to be pushed to the database
		// 		pushToCloud();
		// 	}
		// 	remoteLastSyncTime = record.last_sync_time;
		// 	if (remoteLastSyncTime > $localLastSyncTime) {
		// 		//the remote sync time is newer than the local last sync time which means the user's library was modified from another device and needs to be pulled to this device
		// 		$localUserLibrary = record.list;
		// 		$localLastSyncTime = remoteLastSyncTime;
		// 		//done
		// 		$syncStatus = 'done';
		// 	}
		// } else {
		// 	try {
		// 		const record = await pb.collection('users').getOne($user.id, {});
		// 		if (record) {
		// 			if ($unsyncedChanges === true) {
		// 				//the local library has been modified locally and wasn't synced before closing the app last time, possibly due to being offline
		// 				//the library needs to be pushed to the database
		// 				if (remoteLastSyncTime > $localLastSyncTime) {
		// 					//remote library is newer but local library has unsaved changes
		// 					//CONFLICT
		// 				} else {
		// 					pushToCloud();
		// 				}
		// 			} else {
		// 				remoteLastSyncTime = record.last_sync_time;
		// 				if (remoteLastSyncTime > $localLastSyncTime) {
		// 					//remote sync time is newer than local sync time which means library has been modified on another device
		// 					//remote library needs to be pulled
		// 					$localUserLibrary = record.list;
		// 					$localLastSyncTime = remoteLastSyncTime;
		// 					//done
		// 					$syncStatus = 'done';
		// 				}
		// 			}
		// 		}
		// 	} catch (error) {
		// 		console.log(error);
		// 	}
		// }
	}

	async function pushToCloud() {
		// let currentTime = Date.now();
		// try {
		// 	const data = {
		// 		library: $localUserLibrary,
		// 		last_sync_time: currentTime
		// 	};
		// 	const record = await pb.collection('users').update($user.id, data);
		// 	if (record) {
		// 		let currentTime = Date.now();
		// 		$localLastSyncTime = currentTime;
		// 		//done
		// 		$unsyncedChanges === false;
		// 		$syncStatus = 'done';
		// 	}
		// } catch (error) {
		// 	console.log(error);
		// 	//done
		// 	$syncStatus = 'error';
		// }
	}

	// import { User } from 'svelte-pocketbase';

	// console.log(user.email);
	//mobile-only components
	import MobileActiveTabbar from '../components/mobile/mobile-activeTab-bar.svelte';
	import MobileHeader from '../components/mobile/mobile-header.svelte';
	import MobileTabbar from '../components/mobile/mobile-tab-bar.svelte';
	import MobileTabpanel from '../components/mobile/mobile-tabpanel.svelte';
	//components
	import Modal from '../components/modal.svelte';
	import QuickSearchPanel from '../components/quickSearchPanel.svelte';
	import { Body } from 'svelte-body';
	import Confirm from '../components/confirm.svelte';

	// $localUserLibrary = dummyLibrary;

	//onMount
	onMount(() => {
		$visualViewport = window.visualViewport;
		window.visualViewport.addEventListener('resize', () => {
			$visualViewport = window.visualViewport;
		});

		//check if online and user and route accordingly
		if ($page.url.searchParams) {
			let params = $page.url.searchParams;
			if (params.get('confirm-verification')) {
				console.log('register verification');
			}
		}
		if ($user) {
			console.log($user);
			if ($online) {
				// goto('/')
				syncLibrary();
			} else {
				$notification =
					'Your device is offline. You can still use the app but your library will not sync until you come back online#info';
			}
		} else {
			if ($online) {
				refreshAuth();
			}
		}
	});

	$: if ($quickSearchPanelOpen === false) {
		$quickQuery = '';
	}
	$: if (!$modalCall) {
		$lookupSpell = '';
	}

	$: if ($bookToEdit) {
		$modalCall = 'edit';
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
	// console.log($view.route.id);
	// $modalCall = 'login'
</script>

<DevTools />
<slot />
{#if $modalCall}
	{#key $modalCall}
		<Modal />
		{#if $modalCall === 'spellbook'}
			<SmokeScreen solid />
		{:else}
			<SmokeScreen />
		{/if}
	{/key}
{/if}
{#if $notification}
	<Notification />
{/if}
{#if $confirm}
	<Confirm />
{/if}

<svelte:window
	bind:online={$online}
	on:keydown={(e) => handleKeydown(e)}
	bind:innerWidth={$screenWidth}
/>

<!-- <Body class={$modalCall || $quickSearchPanelOpen || $noScroll ? 'noscroll' : ''} /> -->
<Body
	class="{$page.route.id.replace('/', '')} {$addSpellsMenuOpen || $quickSearchPanelOpen
		? 'touch-action: none; overflow: hidden'
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
		font-family: 'Kanit';
	}

	body {
		font-family: 'Kanit';
		background-color: var(--bodybg);
		color: var(--onbackground);
		line-height: 1.15;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		height: 100vh;
		overflow: hidden;
		touch-action: none;
		position: relative;
		// width: 100vw;
		// touch-action: none;
		// transition: 1s;
		// height: 100vh;
		user-select: none;
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
	strong {
		font-weight: 500;
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
		&.small {
			font-size: .9rem;
		}
	}
	button {
		all: unset;
		cursor: pointer;
		&.href {
			text-decoration: underline;
			display: inline;
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
	input:not([type='checkbox']) {
		height: 54px;
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
		height: 52px;
		box-sizing: border-box;
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
	input:not([type='checkbox']),
	textarea,
	select,
	.input {
		font-family: 'Roboto Mono';
		&::placeholder {
			font-family: 'Roboto Mono';
		}
		margin-bottom: 0.5rem;
		width: 100%;
		height: 52px;
	}
	input,
	select {
		height: 52px;
	}
	label {
		margin-bottom: 0.2rem;
		display: inline-block;
		color: var(--inputbg);
	}
	input {
		&:disabled {
			// color: var(--translucent);
			background-color: var(--moretranslucent);
		}
	}
</style>
