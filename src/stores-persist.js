import { persisted } from 'svelte-local-storage-store';


export const spells = persisted('spells', []);
export const lastLocalSpellsPull = persisted('lastLocalSpellsPull', 0);
export const user = persisted('user', '');
export const localLastSyncTime = persisted('localLastSyncTime', '');
export const lastSyncTry = persisted('localLastSyncTime', '');
export const localUserLibrary = persisted('localUserLibrary', {});
export const unsyncedChanges = persisted('unsyncedChanges', false);
export const activeOpenBookId = persisted('activeOpenBookId', null);
export const openBooksIdsArray = persisted('openBooksIdsArray', []);
export const localUserPreferences = persisted('localUserPreferences', { spellDescription: false });
export const localPendingChanges = persisted('localPendingChanges', {});
export const lastSyncedLibrary = persisted('lastSyncedLibrary', {});
export const localPreviousLibrary = persisted('localPreviousLibrary', {});