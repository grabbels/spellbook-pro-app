import { persisted } from 'svelte-local-storage-store';
import { spellsDatabase } from './spells';

export const spells = persisted('spells', spellsDatabase);
export const user = persisted('user', '');
export const localUserLibrary = persisted('localUserLibrary', []);
export const localUserPreferences = persisted('localUserPreferences', { spellDescription: false });
