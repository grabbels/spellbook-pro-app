import { writable } from 'svelte/store';

export const modalCall = writable('');
export const view = writable('spellbook');
export const tabBarHeight = writable(0);
export const visualViewport = writable(0);
export const quickQuery = writable('');
export const quickSearchPanelOpen = writable(false);
export const lookupSpell = writable(null)
export const scrollY = writable(0)
export const noScroll = writable(false)
export const tabPanelOpen = writable(false);
export const zoomOutModifier = writable(0);
export const addSpellsMenuOpen = writable(false);
export const horizontalSwipe = writable(0);
export const screenWidth = writable(0);
export const spellList = writable([]);
export const browseFilter = writable({});
export const lookupBookId = writable(null);
export const filterPanelOpen = writable(false);
export const notification = writable('');
export const headerHeight = writable(0);
export const bookToEdit = writable('');
export const platform = writable('');
export const spellbookQuery = writable('');
export const online = writable(null);
export const manualSync = writable(null);
export const lookupSpellList = writable([]);
export const syncStatus = writable('');
export const optionsCall = writable('');
export const confirm = writable('');
export const lookupUserId = writable('');
export const filters = writable({});
export const syncing = writable('');
export const browseQuery = writable('');
export const addSpell = writable(null);
export const passwordResetToken = writable('');
export const levelInView = writable(null);
export const emailConfirmToken = writable('');
export const sortedSpellsList = writable([[], [], [], [], [], [], [], [], [], []]);

