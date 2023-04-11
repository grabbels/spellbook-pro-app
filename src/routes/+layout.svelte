<script>
	//variables and functions
	import spellsDatabase from '../spells.json';
	import {
		activeOpenBookId,
		lastLocalSpellsPull,
		localLastSyncTime,
		localPendingChanges,
		localPreviousLibrary,
		localUserFavoriteBooks,
		localUserLibrary,
		localUserPreparedSpells,
		openBooksIdsArray,
		spells,
		unsyncedChanges,
		user
	} from '../stores-persist';
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
		zoomOutModifier,
		passwordResetToken,
		lookupBookId,
		filterPanelOpen,
		emailConfirmToken
	} from '../stores';

	//ERROR/FAULT DETECTION IN LOCAL STORAGE
	if (!Object.keys($localUserLibrary).length && $openBooksIdsArray.length) {
		$openBooksIdsArray = [];
	}
	for (let i = 0; i < $openBooksIdsArray.length; i++) {
		if (!JSON.stringify($localUserLibrary).includes($openBooksIdsArray[i])) {
			$openBooksIdsArray.splice(i, 1);
			$openBooksIdsArray = $openBooksIdsArray;
		}
	}
	if ($localUserFavoriteBooks.length >= 0) {
		$localUserFavoriteBooks = [];
	}
	if (!$localUserPreparedSpells) {
		$localUserPreparedSpells = {};
	}

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import SmokeScreen from '../components/smokeScreen.svelte';
	import DevTools from '../components/devTools.svelte';
	import AddSpellsMenu from '../components/addSpellsMenu.svelte';

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

	if ($spells.length < 1 && $online && $user) {
		pullSpells();
	}
	async function pullSpells() {
		const records = await pb.collection('spells').getFullList({});
		console.log(records);
		$spells = records;
		$lastLocalSpellsPull = Date.now();
	}
	// removeSpells()
	// async function removeSpells() {
	// 	// you can also fetch all records at once via getFullList
	// 	const records = await pb.collection('spells').getFullList({
	// 		sort: '-created'
	// 	});
	// 	for (let i = 0; i < records.length; i++) {
	// 		await pb.collection('spells').delete(records[i].id);
	// 	}
	// }

	let library = {
		qifyezl9wou7dmh_1680335337728: {
			id: 'qifyezl9wou7dmh_1680335337728',
			name: ['test', 'of', 'the', 'sea', 'sorcerer', '/', 'bard'],
			tags: ['awesome', 'epic', 'sorcerer'],
			class: 'sorcerer',
			icon: 'windy',
			color: 'var(--lightblue)',
			level: 12,
			published: false,
			user: 'Grabbels',
			user_id: 'qifyezl9wou7dmh',
			list: [
				'3obr2uhwd3cdrpz',
				'j1zd0rj72f5wm63',
				'vd1yra5uezj2g7i',
				'soyep2e6qgtni87',
				'oliik4e35udgzbd',
				'q9mm43ya4ejnrdv',
				'p4awpt2d2h1irf7',
				'debmc63a7sr25fv'
			]
		},
		qifyezl9wou7dmh_1680337230653: {
			id: 'qifyezl9wou7dmh_1680337230653',
			name: ['sneaky', 'spellthief', '/', 'bladesinger'],
			tags: [],
			class: 'wizard',
			icon: 'criminal',
			color: 'var(--red)',
			level: 11,
			published: false,
			user: 'Grabbels',
			user_id: 'qifyezl9wou7dmh',
			list: [
				'9luehf4s8y8uxwl',
				'u4atyg7l3cxl1t8',
				'61dfxrltx2l0ury',
				'hmaljfx0macp387',
				'li68kf5h7s42wr3',
				's8t81664a14tbpx'
			]
		}
	};

	// trackLibraryChanges();
	// $: $localUserLibrary, trackLibraryChanges();

	// function trackLibraryChanges() {
	// console.log(diff($localPreviousLibrary, $localUserLibrary));
	// let modLib = applyDiff($localPreviousLibrary, $localUserLibrary)
	// console.log(modLib);

	// $localPendingChanges = detailedDiff($localPendingChanges, $localUserLibrary)
	// }

	// console.log(DeepDiff.diff(library, $localUserLibrary));

	// async function syncLibrary(record) {
	// 	let toBePushedLibrary;
	// 	try {
	// 		const record = await pb.collection('users').getOne($user.id);
	// 		toBePushedLibrary = record.library;
	// 		if (record.library == $localUserLibrary) {
	// 			//cloud library is identical to local library, no sync neccessary
	// 		} else if (record) {
	// 			afterPull(record, toBePushedLibrary);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}

	// 	function afterPull(record, toBePushedLibrary) {
	// 		if (Object.keys(localPendingChanges).length) {
	// 			for (const id in localPendingChanges) {
	// 				// console.log(localPendingChanges[id])
	// 				console.log(id);
	// 				if (!record.library[id]) {
	// 					//new local record not in cloud, needs to push in its entirety
	// 					toBePushedLibrary[id] = localPendingChanges[id];
	// 				} else {
	// 					for (const key in localPendingChanges[id]) {
	// 						if (key === 'delete') {
	// 							delete toBePushedLibrary[id];
	// 						} else if (key === 'list') {
	// 							for (const key in localPendingChanges[id].list) {
	// 								if (key === 'add') {
	// 									let toBeAddedSpells = localPendingChanges[id].list.add;
	// 									for (let i = 0; i < toBeAddedSpells; i++) {
	// 										toBePushedLibrary[id].list = [
	// 											...toBePushedLibrary[id].list,
	// 											toBeAddedSpells[i]
	// 										];
	// 									}
	// 								} else if (key === 'remove') {
	// 									let toBeRemovedSpells = localPendingChanges[id].list.remove;
	// 									for (let i = 0; i < toBeRemovedSpells; i++) {
	// 										toBePushedLibrary[id].list = toBePushedLibrary[id].list.filter(
	// 											(o) => o != toBeRemovedSpells[i]
	// 										);
	// 									}
	// 								}
	// 							}
	// 						} else if (
	// 							key === 'name' ||
	// 							key === 'tags' ||
	// 							key === 'class' ||
	// 							key === 'icon' ||
	// 							key === 'color' ||
	// 							key === 'level' ||
	// 							key === 'published'
	// 						) {
	// 							console.log(id);
	// 							//partial changes that will directly overwrite to the cloud
	// 							toBePushedLibrary[id][key] = $localUserLibrary[id][key];
	// 						}
	// 					}
	// 				}
	// 			}

	// 			let lastPushedChanges = localPendingChanges;
	// 			pushToCloud(lastPushedChanges, toBePushedLibrary);
	// 		}
	// 	}

	// 	//

	// 	async function pushToCloud(lastPushedChanges, toBePushedLibrary) {
	// 		const data = {
	// 			library: toBePushedLibrary,
	// 			last_sync_time: Date.now(),
	// 			last_pushed_changes: lastPushedChanges
	// 		};
	// 		try {
	// 			const record = await pb.collection('users').update($user.id, data);
	// 			console.log(record);
	// 		} catch (error) {
	// 			console.log(error.data);
	// 		}
	// 	}
	// }

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
	import FuncAddSpell from '../components/functions/func-addSpell.svelte';

	// $localUserLibrary = dummyLibrary;
	async function confirmAccount(token) {
		await pb.collection('users').confirmVerification(token);
		$notification = 'Account succesfully verified, you can now log in.#positive';
		goto('/login');
	}
	//onMount
	onMount(() => {
		window.screen.orientation.lock('portrait');
		$visualViewport = window.visualViewport;
		window.visualViewport.addEventListener('resize', () => {
			$visualViewport = window.visualViewport;
		});

		//check if online and user and route accordingly
		if ($page.url.searchParams) {
			let params = $page.url.searchParams;
			if (params.get('confirm-password-reset')) {
				console.log('password reset');
				$passwordResetToken = params.get('confirm-password-reset');
				goto('/password-reset');
			} else if (params.get('confirm-verification')) {
				console.log('register verification');
				confirmAccount();
			} else if (params.get('confirm-email-change')) {
				console.log('register verification');
				$emailConfirmToken = params.get('confirm-email-change');
				$modalCall = 'confirm-email-change';
			}
		}
		if ($user) {
			if ($online) {
				// goto('/')
				// syncLibrary();
				if ($spells.length < 1 || $lastLocalSpellsPull + 604800000 < Date.now()) {
					pullSpells();
				}
			} else {
				$spells = spellsDatabase;
				$notification =
					'Your device is offline. You can still use the app but your library will not sync until you come back online#info';
			}
		} else {
			if ($online) {
				refreshAuth();
			}
		}
	});

	$modalCall = 'welcome';

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

	$: $openBooksIdsArray, checkActiveOpenBook();
	function checkActiveOpenBook() {
		if (!$openBooksIdsArray.includes($activeOpenBookId)) {
			//open books array does not include the active open book id, that has to change
			if ($openBooksIdsArray.length > 0) {
				$activeOpenBookId = $openBooksIdsArray[0];
			} else {
				$activeOpenBookId = '';
			}
		}
	}

	function handleKeydown(e) {
		// console.log(e);
		if (e.key == 'Escape') {
			$modalCall = '';
			$quickQuery = '';
			$quickSearchPanelOpen = false;
			$addSpellsMenuOpen = false;
			$tabPanelOpen = false;
			document.activeElement.blur();
		}
	}

	$: $modalCall, checkEmptyModalCall();

	function checkEmptyModalCall() {
		if ($modalCall == '') {
			$bookToEdit = '';
			$lookupBookId = '';
		}
	}
</script>

<!-- GLOBAL FUNCTIONS -->
<FuncAddSpell />
<!---->

<DevTools />
<slot />
{#if $modalCall}
	{#key $modalCall}
		<Modal />
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
		--huge-radius: 24px;
		--large-radius: 16px;
		--medium-radius: 12px;
		--small-radius: 6px;
	}

	.scroll-bar-indicator {
		display: none;
	}

	* {
		box-sizing: border-box;
		font-family: 'Kanit';
	}

	.card.filtered {
		display: none;
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
		font-size: 1.05rem;
		margin-bottom: 0.8rem;
		line-height: 1.4;
		&.small {
			font-size: 0.9rem;
		}
	}
	button {
		all: unset;
		cursor: pointer;
		&.href {
			text-decoration: underline;
			display: inline;
			cursor: pointer;
			&.accent {
				color: var(--accent);
			}
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
		border-radius: var(--medium-radius);
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
		&.minimal {
			all: unset;
			background-color: transparent;
			width: auto;
			min-width: 0;
			font-family: 'Kanit';
			padding: 0.2rem 0;
			text-transform: lowercase;
			color: var(--inputbg);
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
		color: var(--lesstranslucent);
	}
	input {
		&:disabled {
			// color: var(--translucent);
			background-color: var(--moretranslucent);
		}
	}
</style>
