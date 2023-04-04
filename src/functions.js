// import { } from './stores';
import {
	activeOpenBookId,
	localLastSyncTime,
	localUserLibrary,
	openBooksIdsArray
} from './stores-persist';
import { goto } from '$app/navigation';
import { get } from 'svelte/store';
import { modalCall, view } from './stores';

export function openSpellbook(openId) {
	if (get(openBooksIdsArray).includes(openId)) {
		activeOpenBookId.set(openId);
		view.set('spellbook');
		modalCall.set('');
	} else {
		openBooksIdsArray.update((value) => [...value, openId]);
		activeOpenBookId.set(openId);
		view.set('spellbook');
		modalCall.set('');
	}
}

export function deleteSpellbook(removeId) {
	// console.log(removeId)
	// if (get(activeOpenBookId == removeId)) {
	// 	//if to be removed is the active open book
	// 	if (get(openBooksIdsArray).length > 1) {
	// 		//if it's not the only open book
	// 		if (get(openBooksIdsArray).indexOf()) {
				
	// 		}
	// 	}
	// }
	// console.log(get(localUserLibrary))
	// localUserLibrary.update((value) => value[removeId]);

	// openBooksIdsArray.update((value) => value.filter((o) => o.id != removeId));

	// localUserLibrary.update((value) => value.filter((o) => o.id != removeId));
}

export function closeSpellbookById(closeId) {
	openBooksIdsArray.update((value) => value.filter((o) => o.id != closeId));
}

export function resetUserData() {
	activeOpenBookId.set(null);
	openBooksIdsArray.set([]);
	localUserLibrary.set([]);
	localLastSyncTime.set(0);
	user.set('');
}
