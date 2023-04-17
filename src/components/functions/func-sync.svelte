<script>
	import { fly } from 'svelte/transition';
	import { manualSync, online, syncStatus } from '../../stores';
	import {
		localLastSyncTime,
		localUserLibrary,
		user,
		lastSyncTry,
		localUserNotes,
		localUserFavoriteBooks,
		localUserPreparedSpells,
		spells
	} from '../../stores-persist';
	import PocketBase from 'pocketbase';
	import deepDiff from 'deep-diff';
	import { onMount } from 'svelte';
	const pb = new PocketBase('https://db.spellbook.pro');
	console.log($localUserNotes);
	let syncDoneTimeout;

	$: if ($syncStatus === 'done' || $syncStatus === 'error') {
		syncDoneTimeout = setTimeout(() => {
			$syncStatus = false;
		}, 2000);
	}

	$: if ($manualSync) {
		sync();
		$manualSync = null;
	}
	$: $localUserLibrary, triggerPush();
	$: $localUserNotes, triggerPush();
	$: $localUserFavoriteBooks, triggerPush();
	$: $localUserPreparedSpells, triggerPush();

	let syncTimeout;
	function triggerPush() {
		if ($online) {
			// console.log('I want to sync but I will wait for possible further changes!');
			clearTimeout(syncTimeout);
			syncTimeout = setTimeout(() => {
				sync();
			}, 6000);
		} else {
			console.log('offline');
		}
	}

	async function sync() {
		clearTimeout(syncDoneTimeout);
		$syncStatus = 'working';
		try {
			const record = await pb.collection('users').getOne($user.id);
			if (record) {
				let remoteState = record;
				if (
					$localLastSyncTime == 0 &&
					!Object.keys($localUserLibrary).length &&
					!Object.keys($localUserNotes).length &&
					$localUserFavoriteBooks.length
				) {
					//this device has not synced before and the local library is empty
					//check for remote library and pull if present

					if (Object.keys(remoteState.library).length || Object.keys(remoteState.notes).length) {
						$localUserLibrary = remoteState.library;
						$localUserNotes = remoteState.notes ? remoteState.notes : {};
						$localLastSyncTime = remoteState.last_sync_time;
						$localUserFavoriteBooks = remoteState.favorite_books ? remoteState.favorite_books : [];
						$localUserPreparedSpells = remoteState.prepared_spells
							? remoteState.prepared_spells
							: {};
						$lastSyncTry = Date.now();
						setTimeout(() => {
							$syncStatus = 'done';
						}, 1000);
					} else {
						$lastSyncTry = Date.now();
						setTimeout(() => {
							$syncStatus = 'done';
						}, 1000);
					}
				} else if (remoteState.last_sync_time > $localLastSyncTime) {
					//remote state has been pushed from another device, which means it is newer than local, pull
					// console.log('sync, pull remote to local.');
					$localUserLibrary = remoteState.library;
					$localUserNotes = remoteState.notes ? remoteState.notes : {};
					$localLastSyncTime = remoteState.last_sync_time;
					$localUserFavoriteBooks = remoteState.favorite_books ? remoteState.favorite_books : [];
					$localUserPreparedSpells = remoteState.prepared_spells ? remoteState.prepared_spells : {};
					$lastSyncTry = Date.now();
					setTimeout(() => {
						$syncStatus = 'done';
					}, 1000);
				} else if (
					deepDiff(remoteState.library, $localUserLibrary) == undefined &&
					deepDiff(remoteState.notes, $localUserNotes) == undefined &&
					deepDiff(remoteState.favorite_books, $localUserFavoriteBooks) == undefined &&
					deepDiff(remoteState.prepared_spells, $localUserPreparedSpells) == undefined
				) {
					//remote state is same as local state, do nothing.
					// console.log('sync, no action neccessary.');
					$localLastSyncTime = remoteState.last_sync_time;
					$lastSyncTry = Date.now();
					setTimeout(() => {
						$syncStatus = 'done';
					}, 1000);
				} else {
					// console.log('sync, push local to remote.');

					let syncTime = Date.now();
					const data = {
						library: $localUserLibrary,
						notes: $localUserNotes,
						favorite_books: $localUserFavoriteBooks,
						prepared_spells: $localUserPreparedSpells,
						last_sync_time: syncTime
					};
					try {
						const record = await pb.collection('users').update($user.id, data);
						if (record) {
							$localLastSyncTime = syncTime;
							$lastSyncTry = Date.now();
							setTimeout(() => {
								$syncStatus = 'done';
							}, 1000);
						}
					} catch (error) {
						console.log(error);
						setTimeout(() => {
							$syncStatus = 'error';
						}, 1000);
					}
					for (const key in $localUserLibrary) {
						//update global books list
						let bookSpells = $localUserLibrary[key].list;
						let spellTypes = {};
						for (let i = 0; i < bookSpells.length; i++) {
							let school = $spells.find((o) => o.id == bookSpells[i]).school;
							if (school in spellTypes) {
								spellTypes[school] = spellTypes[school] + 1;
							} else {
								spellTypes[school] = 1
							}
						}
						const data = {
							user_id: $user.id,
							book_id: key,
							book: $localUserLibrary[key],
							public: $localUserLibrary[key].published,
							book_name: $localUserLibrary[key].name.toString().replaceAll(',', ' '),
							character_class: $localUserLibrary[key].class,
							character_level: $localUserLibrary[key].level,
							tags: $localUserLibrary[key].tags,
							icon: $localUserLibrary[key].icon,
							color: $localUserLibrary[key].color,
							spelltypes: spellTypes
						};
						try {
							const record = await pb
								.collection('spellbooks')
								.getFirstListItem('book_id="' + key + '"');
							if (record) {
								let bookId = record.id;
								const result = await pb.collection('spellbooks').update(bookId, data);
							}
						} catch (error) {
							const record = await pb.collection('spellbooks').create(data);
							// console.log(error.data);
						}
					}
					//remove books from global books list if removed from localuserlibrary
					const allUserSpellbooksInCollection = await pb.collection('spellbooks').getFullList({
						filter: `user_id="${$user.id}"`
					});
					if (allUserSpellbooksInCollection) {
						let userLibraryStringified = JSON.stringify($localUserLibrary);
						for (let i = 0; i < allUserSpellbooksInCollection.length; i++) {
							if (!userLibraryStringified.includes(allUserSpellbooksInCollection[i].book_id)) {
								await pb.collection('spellbooks').delete(allUserSpellbooksInCollection[i].id);
							}
						}
					}
				}
			}
		} catch (error) {
			console.log(error);
			setTimeout(() => {
				$syncStatus = 'error';
			}, 1000);
		}
	}

	onMount(() => {
		const interval = setInterval(sync, 60000);
		return () => clearInterval(interval);
	});
</script>
