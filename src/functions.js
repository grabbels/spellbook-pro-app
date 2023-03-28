import { lookupBook, modalCall, view } from './stores';
import { activeBookIndex, localUserLibrary, openBooksIdsArray } from './stores-persist';
import { goto } from '$app/navigation';
import { get } from 'svelte/store';

export function openSpellbook(openId) {
	let index = get(openBooksIdsArray).indexOf(openId);
	console.log(index);
	if (index >= 0) {
		//book is already an open spellbook, so set it to active and move to spellsheet page
		activeBookIndex.set(index);
		modalCall.set('');
		view.set('spellbook');
	} else {
		//book isnt open yet so we open it, set it to active and redicrect to spellsheet
		openBooksIdsArray.update((value) => [...value, openId]);
		activeBookIndex.set(get(openBooksIdsArray).length - 1);
		modalCall.set('');
		view.set('spellbook');
	}
}

export function deleteSpellbook(removeId) {
	//remove book from openBooksIdsArray
	closeSpellbookById(removeId);
	//remove book from localUserLibrary
	let removeIndex = get(localUserLibrary)
		.map((object) => object.id)
		.indexOf(removeId);
	localUserLibrary.update((value) => value.splice(removeIndex, 1));
}

export function closeSpellbookById(closeId) {
	let bookIndexInOpenBooks = get(openBooksIdsArray).indexOf(closeId);
	if (get(openBooksIdsArray) >= 0) {
		//book is an open book
		if (bookIndexInOpenBooks === get(activeBookIndex)) {
			//book is the current active open book so active open book index needs to change
			if (get(openBooksIdsArray).length === 1) {
				//there's only one book in the openbooks array, so the last open book is closing, no more open books
				activeBookIndex.set(null);
				close();
			} else if (get(activeBookIndex) === 0) {
				//current active open book is the first in array so index can only move up
				activeBookIndex.update((value) => value++);
				close();
			} else {
				//current active open book is the last on openbooks array and index can only move down
				activeBookIndex.update((value) => value--);
				close();
			}
		} else {
			close();
		}
	}
	function close() {
		openBooksIdsArray.update((value) => value.filter((x) => x !== closeId));
	}
}
