<script>
	import { addSpellsMenuOpen, confirm, modalCall, noScroll } from '../stores';
	import { goto } from '$app/navigation';
	import { allowedTags } from '../tags';
	import { localUserLibrary, openBooksIdsArray, spells, user } from '../stores-persist';
	import PocketBase from 'pocketbase';
	const pb = new PocketBase('https://db.spellbook.pro');
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
	// $confirm = ['Are you sure you want to delete this spellbook?', {text: 'Cancel', type: 'outline', action: 'cancel'}, {text: 'Delete', icon: 'ri-delete-bin-line', type: 'fill red', action: 'delete-spellbook'}]
	// let tags = [...new Set(allowedTags)];
	// console.log(tags)
	// let words = 'Awakened Shrub Baboon Badger Bat Cat Commoner Crab Deer Devil Lemure Eagle Fire Beetle Giant Frog Goat Hawk Homunculus Horse Sea Hyena Jackal Lizard Octopus Owl Quipper Rat Raven Scorpion Shrieker Spider Vulture Weasel Bandit Blood Camel Cultist Flying Snake Guard Kobold Mastiff Merfolk Mule Noble Poisonous Pony Diseased Stirge Tribal Warrior Acolyte Axe Beak Swarm Blink Dog Boar Centipede Constrictor Demon Dretch Elf Drow Elk Sword Goblin Grimlock Draft Riding Mephit Steam Panther Pseudodragon Skeleton Sprite Violet Fungus Wolf Zombie Ape Bear Black Cockatrice Crocodile Darkmantle Gnoll Gnome Deep Svirfneblin Gray Ooze Hobgoblin War Insect Lizardfolk Magmin Dust Ice Magma Orc Rust Monster Sahuagin Satyr Scout Shadow Shark Reef Warhorse Thug Wasp Worg Animated Armor Brown Bugbear Death Quasit Imp Dragon Brass Wyrmling Copper Dryad Duergar Ghoul Harpy Hippogriff Lion Specter Spy Tiger Toad Dire Ankheg Tree Azer Captain Polar Berserker Centaur Cult Fanatic Bronze Green Silver White Druid Ettercap Gargoyle Gelatinous Cube Ghast Gibbering Mouther Grick Griffon Hag Merrow Mimic Ochre Jelly Ogre Pegasus Plesiosaurus Priest Rhinoceros Rug of Smothering Hunter Minotaur SaberToothed Wererat Willo Wisp Basilisk Bearded Doppelganger Blue Gold Hell Hound Killer Whale Knight Manticore Mummy Nightmare Owlbear Phase Veteran Werewolf Wight Winter Pudding Chuul Couatl Red Elephant Ettin Ghost Lamia Succubus Incubus Wereboar Weretiger Bulette Barbed Elemental Air Earth Water Hill Gladiator Golem Flesh Gorgon Night HalfRed Otyugh Roper Salamander Shambling Mound Triceratops Troll Unicorn Vampire Spawn Werebear Wraith Xorn Chimera Vrock Young Drider Invisible Stalker Mage Mammoth Medusa Wyvern Stone Oni Shield Guardian Assassin Cloaker Hezrou Frost Hydra Naga Spirit Tyrannosaurus Rex Glabrezu Cloud Clay Treant Aboleth Angel Deva Behir Chain Horned Genie Djinni Efreeti Remorhaz Roc Sphinx Gynosphinx Archmage Bone Erinyes Nalfeshnee Adult Storm Rakshasa Lord Purple Worm Planetar Marilith Iron Turtle Androsphinx Balor Pit Fiend Ancient Solar Lich Kraken Tarrasque'
	// console.log(words.toLowerCase().replace(/\s+/g, ' ').split(' '))
	// pushSpells()
	let mockLibrary = {
		qifyezl9wou7dmh_1680335337728: {
			id: 'qifyezl9wou7dmh_1680335337728',
			name: ['curse', 'of', 'the', 'sea', 'sorcerer', '/', 'bard'],
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
		},
		qifyezl9wou7dmh_1680384818682: {
			id: 'qifyezl9wou7dmh_1680384818682',
			name: ['a', 'fighter', 'without', 'spells'],
			tags: ['Confused'],
			class: 'fighter',
			icon: 'vip-crown-2',
			color: 'var(--purple)',
			level: 11,
			published: false,
			user: 'Grabbels',
			user_id: 'qifyezl9wou7dmh',
			list: []
		}
	};

	function pushObject() {
		$localUserLibrary['123_test'] = {
			name: ['Crazy', 'Sorcerer'],
			tags: ['sorcerer', 'evil'],
			class: 'sorcerer',
			color: 'var(--yellow)',
			level: 14,
			published: false,
			user: 'Grabbels',
			user_id: 'qifyezl9wou7dmh',
			list: []
		};
		console.log($localUserLibrary);
	}

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
	<button on:click={() => ($localUserLibrary = mockLibrary)}>Add library</button>
	<button on:click={() => pushObject()}>Push</button>
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
