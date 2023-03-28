<script>
	import { addSpellsMenuOpen, confirm, lookupBook, modalCall, noScroll } from '../stores';
	import { goto } from '$app/navigation';
	import { allowedTags } from '../tags';
	import { activeBookIndex, localUserLibrary, openBooksIdsArray } from '../stores-persist';
	
	import { get } from 'svelte/store';
	// $confirm = ['Are you sure you want to delete this spellbook?', {text: 'Cancel', type: 'outline', action: 'cancel'}, {text: 'Delete', icon: 'ri-delete-bin-line', type: 'fill red', action: 'delete-spellbook'}]
	// let tags = [...new Set(allowedTags)];
	// console.log(tags)
	// let words = 'Awakened Shrub Baboon Badger Bat Cat Commoner Crab Deer Devil Lemure Eagle Fire Beetle Giant Frog Goat Hawk Homunculus Horse Sea Hyena Jackal Lizard Octopus Owl Quipper Rat Raven Scorpion Shrieker Spider Vulture Weasel Bandit Blood Camel Cultist Flying Snake Guard Kobold Mastiff Merfolk Mule Noble Poisonous Pony Diseased Stirge Tribal Warrior Acolyte Axe Beak Swarm Blink Dog Boar Centipede Constrictor Demon Dretch Elf Drow Elk Sword Goblin Grimlock Draft Riding Mephit Steam Panther Pseudodragon Skeleton Sprite Violet Fungus Wolf Zombie Ape Bear Black Cockatrice Crocodile Darkmantle Gnoll Gnome Deep Svirfneblin Gray Ooze Hobgoblin War Insect Lizardfolk Magmin Dust Ice Magma Orc Rust Monster Sahuagin Satyr Scout Shadow Shark Reef Warhorse Thug Wasp Worg Animated Armor Brown Bugbear Death Quasit Imp Dragon Brass Wyrmling Copper Dryad Duergar Ghoul Harpy Hippogriff Lion Specter Spy Tiger Toad Dire Ankheg Tree Azer Captain Polar Berserker Centaur Cult Fanatic Bronze Green Silver White Druid Ettercap Gargoyle Gelatinous Cube Ghast Gibbering Mouther Grick Griffon Hag Merrow Mimic Ochre Jelly Ogre Pegasus Plesiosaurus Priest Rhinoceros Rug of Smothering Hunter Minotaur SaberToothed Wererat Willo Wisp Basilisk Bearded Doppelganger Blue Gold Hell Hound Killer Whale Knight Manticore Mummy Nightmare Owlbear Phase Veteran Werewolf Wight Winter Pudding Chuul Couatl Red Elephant Ettin Ghost Lamia Succubus Incubus Wereboar Weretiger Bulette Barbed Elemental Air Earth Water Hill Gladiator Golem Flesh Gorgon Night HalfRed Otyugh Roper Salamander Shambling Mound Triceratops Troll Unicorn Vampire Spawn Werebear Wraith Xorn Chimera Vrock Young Drider Invisible Stalker Mage Mammoth Medusa Wyvern Stone Oni Shield Guardian Assassin Cloaker Hezrou Frost Hydra Naga Spirit Tyrannosaurus Rex Glabrezu Cloud Clay Treant Aboleth Angel Deva Behir Chain Horned Genie Djinni Efreeti Remorhaz Roc Sphinx Gynosphinx Archmage Bone Erinyes Nalfeshnee Adult Storm Rakshasa Lord Purple Worm Planetar Marilith Iron Turtle Androsphinx Balor Pit Fiend Ancient Solar Lich Kraken Tarrasque'
	// console.log(words.toLowerCase().replace(/\s+/g, ' ').split(' '))
</script>

<div>

</div>

<style>
	div {
		position: fixed;
		opacity: .25;
		z-index: 999;
		top: var(--safe-area-inset-top);
		left: 0;
	}
	button {
		background: white;
		color: black;
	}
</style>
