import { persisted } from 'svelte-local-storage-store';
import spellsDatabase from './spells';

export const spells = persisted('spells', spellsDatabase);
export const user = persisted('user', '');
export const localLastSyncTime = persisted('localLastSyncTime', '');
export const localUserLibrary = persisted('localUserLibrary', []);
export const unsyncedChanges = persisted('unsyncedChanges', false);
export const activeBookIndex = persisted('activeBookIndex', null);
export const openBooksIdsArray = persisted('openBooksIdsArray', []);
export const localUserPreferences = persisted('localUserPreferences', { spellDescription: false });
