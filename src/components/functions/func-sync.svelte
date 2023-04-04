<script>
	import { fly } from 'svelte/transition';
	import { manualSync, online, syncStatus } from '../../stores';
	import {
		localLastSyncTime,
		localUserLibrary,
		user,
		lastSyncTry
	} from '../../stores-persist';
	import PocketBase from 'pocketbase';
	import { diff } from 'deep-diff';
	import { onMount } from 'svelte';
	const pb = new PocketBase('https://db.spellbook.pro');

	let syncDoneTimeout;

	$: if ($syncStatus === 'done' || $syncStatus === 'error') {
		syncDoneTimeout = setTimeout(() => {
			$syncStatus = false;
		}, 2000);
	}
	
	$: if ($manualSync) {
		sync();
		$manualSync = null
	}
	$: $localUserLibrary, triggerPush();

	let syncTimeout;
	function triggerPush() {
		console.log('I want to sync but I will wait for possible further changes!');
		clearTimeout(syncTimeout);
		syncTimeout = setTimeout(() => {
			sync();
		}, 6000);
	}

	async function sync() {
		clearTimeout(syncDoneTimeout);
		$syncStatus = 'working';
		try {
			const record = await pb.collection('users').getOne($user.id);
			if (record) {
				let remoteState = record;
				if (
					!$localLastSyncTime ||
					($localLastSyncTime == 0 && !Object.keys($localUserLibrary).length)
				) {
					//this device has not synced before and the local library is empty
					//check for remote library and pull if present
					if (Object.keys(remoteState.library).length) {
						$localUserLibrary = remoteState.library;
						$localLastSyncTime = remoteState.last_sync_time;
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
					console.log('sync, pull remote to local.');
					$localUserLibrary = remoteState.library;
					$localLastSyncTime = remoteState.last_sync_time;
					$lastSyncTry = Date.now();
					setTimeout(() => {
						$syncStatus = 'done';
					}, 1000);
				} else if (diff(remoteState.library, $localUserLibrary) == undefined) {
					//remote state is same as local state, do nothing.
					console.log('sync, no action neccessary.');
					$localLastSyncTime = remoteState.last_sync_time;
					$lastSyncTry = Date.now();
					setTimeout(() => {
						$syncStatus = 'done';
					}, 1000);
				} else {
					console.log('sync, push local to remote.');
					let syncTime = Date.now();
					const data = {
						library: $localUserLibrary,
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