<script>
	import { addSpellsMenuOpen, confirm, modalCall, noScroll } from '../stores';
	import { goto } from '$app/navigation';
	import { allowedTags } from '../tags';
	import { localUserLibrary, openBooksIdsArray, spells, user } from '../stores-persist';
	import PocketBase from 'pocketbase';
	const pb = new PocketBase('https://db.spellbook.pro');
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';

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
	onMount(() => {
		// sync();
	});

	

	// console.log(Object.keys($localUserLibrary).length)
</script>

<div>

</div>

<style>
	div {
		position: fixed;
		opacity: 0.25;
		z-index: 999;
		top: var(--safe-area-inset-top);
		left: 0;
	}
	button {
		background: white;
		color: black;
	}
</style>
