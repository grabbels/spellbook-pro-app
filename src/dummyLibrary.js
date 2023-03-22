export let dummyLibrary = [
	{
		class: 'Sorcerer',
		character: 'Drew',
		color: 'var(--lightblue)',
		creator: null,
		description: 'tralalala',
		id: 'qifyezl9wou7dmh-1678826706664',
		level: '12',
		list: [
			{
				casting_time: '1 action',
				classes: ['druid', 'sorcerer', 'warlock', 'wizard'],
				components: {
					material: false,
					raw: 'V, S',
					somatic: true,
					verbal: true
				},
				description:
					'You cause numbing frost to form on one creature that you can see within range. The target must make a Constitution saving throw. On a failed save, the target takes 1d6 cold damage, and it has disadvantage on the next weapon attack roll it makes before the end of its next turn.</p><p>The spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).',
				display: true,
				duration: 'Instant',
				level: '0',
				name: 'Frostbite',
				range: '60 feet',
				ritual: false,
				save: 'con',
				school: 'evocation',
				tags: ['druid', 'sorcerer', 'warlock', 'wizard', 'cantrip'],
				type: 'Evocation cantrip'
			},
			{
				casting_time: '1 action',
				classes: ['bard', 'sorcerer', 'wizard'],
				components: {
					material: true,
					materials_needed: ['a short piece of copper wire'],
					raw: 'V, S, M (a short piece of copper wire)',
					somatic: true,
					verbal: true
				},
				description:
					"You point your finger toward a creature within range and whisper a message. The target (and only the target) hears the message and can reply in a whisper that only you can hear.</p><p>You can cast this spell through solid objects if you are familiar with the target and know it is beyond the barrier. Magical silence, 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood blocks the spell. The spell doesn't have to follow a straight line and can travel freely around corners or through openings.",
				display: true,
				duration: '1 round',
				level: '0',
				name: 'Message',
				range: '120 feet',
				ritual: false,
				school: 'transmutation',
				tags: ['bard', 'sorcerer', 'wizard', 'cantrip'],
				type: 'Transmutation cantrip'
			},
			{
				casting_time: '1 action',
				classes: ['bard', 'cleric', 'sorcerer', 'wizard'],
				components: {
					material: true,
					materials_needed: ['a firefly or phosphorescent moss'],
					raw: 'V, M (a firefly or phosphorescent moss)',
					somatic: false,
					verbal: true
				},
				description:
					'You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet. The light can be colored as you like. Completely covering the object with something opaque blocks the light. The spell ends if you cast it again or dismiss it as an action.</p><p>If you target an object held or worn by a hostile creature, that creature must succeed on a Dexterity saving throw to avoid the spell.',
				display: true,
				duration: '1 hour',
				level: '0',
				name: 'Light',
				range: 'Touch',
				ritual: false,
				save: 'dex',
				school: 'evocation',
				tags: ['bard', 'cleric', 'sorcerer', 'wizard', 'cantrip'],
				type: 'Evocation cantrip'
			},
			{
				casting_time: '1 action',
				classes: ['sorcerer', 'wizard'],
				components: {
					material: false,
					raw: 'V, S',
					somatic: true,
					verbal: true
				},
				description:
					'A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes 1d8 cold damage, and its speed is reduced by 10 feet until the start of your next turn.</p><p>The spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).',
				display: true,
				duration: 'Instant',
				level: '0',
				name: 'Ray of Frost',
				range: '60 feet',
				ritual: false,
				school: 'evocation',
				tags: ['sorcerer', 'wizard', 'cantrip'],
				type: 'Evocation cantrip'
			},
			{
				casting_time: '1 action',
				classes: ['druid', 'sorcerer', 'wizard'],
				components: {
					material: false,
					raw: 'S',
					somatic: true,
					verbal: false
				},
				description:
					'* You instantaneously move or otherwise change the flow of the water as you direct, up to 5 feet in any direction. This movement doesn’t have enough force to cause damage.</p><p>* You cause the water to form into simple shapes and animate at your direction. This change lasts for 1 hour.</p><p>* You change the water’s color or opacity. The water must be changed in the same way throughout. This change lasts for 1 hour.</p><p>* You freeze the water, provided that there are no creatures in it. The water unfreezes in 1 hour.</p><p>If you cast this spell multiple times, you can have no more than two of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.',
				display: true,
				duration: 'Instant or 1 hour (see below)',
				level: '0',
				name: 'Shape Water',
				range: '30 feet',
				ritual: false,
				school: 'transmutation',
				tags: ['druid', 'sorcerer', 'wizard', 'cantrip'],
				type: 'Transmutation cantrip'
			},
			{
				casting_time: '1 action',
				classes: ['bard', 'druid', 'sorcerer', 'warlock', 'wizard'],
				components: {
					material: false,
					raw: 'S',
					somatic: true,
					verbal: false
				},
				description:
					'You create a burst of thunderous sound, which can be heard 100 feet away. Each creature other than you within 5 feet of you must make a Constitution saving throw. On a failed save, the creature takes 1d6 thunder damage.</p><p>The spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).',
				display: true,
				duration: 'Instant',
				level: '0',
				name: 'Thunderclap',
				range: 'Self (5-foot radius)',
				ritual: false,
				save: 'con',
				school: 'evocation',
				tags: ['bard', 'druid', 'sorcerer', 'warlock', 'wizard', 'cantrip'],
				type: 'Evocation cantrip'
			},
			{
				casting_time: '1 action',
				classes: ['warlock'],
				components: {
					material: false,
					raw: 'V, S',
					somatic: true,
					verbal: true
				},
				description:
					'A beam of crackling energy streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 force damage.\nThe spell creates more than one beam when you reach higher levels: two beams at 5th level, three beams at 11th level, and four beams at 17th level. You can direct the beams at the same target or at different ones. Make a separate attack roll for each beam.',
				display: true,
				duration: 'Instant',
				level: '0',
				name: 'Eldritch Blast',
				range: '120 feet',
				ritual: false,
				school: 'evocation',
				tags: ['warlock', 'cantrip'],
				type: 'Evocation cantrip'
			},
			{
				casting_time: '1 minute',
				classes: ['sorcerer', 'wizard'],
				components: {
					material: false,
					raw: 'V',
					somatic: false,
					verbal: true
				},
				description:
					'You create a lash of lightning energy that strikes at one creature of your choice that you can see within 15 feet of you. The target must succeed on a Strength saving throw or be pulled up to 10 feet in a straight line toward you and then take 1d8 lightning damage if it is within 5 feet of you.',
				display: true,
				duration: 'Instant',
				higher_levels:
					"This spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
				level: '0',
				name: 'Lightning Lure',
				range: 'Self (15-foot radius)',
				ritual: false,
				save: 'str',
				school: 'evocation',
				tags: ['sorcerer', 'wizard', 'cantrip'],
				type: 'Evocation cantrip'
			},
			{
				casting_time: '1 action',
				classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
				components: {
					material: false,
					raw: 'V, S',
					somatic: true,
					verbal: true
				},
				description:
					'You extend your hand and trace a sigil of warding in the air. Until the end of your next turn, you have resistance against bludgeoning, piercing, and slashing damage dealt by weapon attacks.',
				display: true,
				duration: '1 round',
				level: '0',
				name: 'Blade Ward',
				range: 'Self',
				ritual: false,
				school: 'abjuration',
				tags: ['bard', 'sorcerer', 'warlock', 'wizard', 'cantrip'],
				type: 'Abjuration cantrip'
			},
			{
				casting_time: '1 action',
				classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
				components: {
					material: false,
					raw: 'V, S',
					somatic: true,
					verbal: true
				},
				description:
					'This spell is a minor magical trick that novice spellcasters use for practice. You create one of the following magical effects within range:</p><p>* You create an instantaneous, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musical notes, or an odd odor.</p><p>* You instantaneously light or snuff out a candle, a torch, or a small campfire.</p><p>* You instantaneously clean or soil an object no larger than 1 cubic foot.</p><p>* You chill, warm, or flavor up to 1 cubic foot of nonliving material for 1 hour.</p><p>* You make a color, a small mark, or a symbol appear on an object or a surface for 1 hour.</p><p>* You create a nonmagical trinket or an illusory image that can fit in your hand and that lasts until the end of your next turn.</p><p>If you cast this spell multiple times, you can have up to three of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.',
				display: true,
				duration: 'Up to 1 hour',
				level: '0',
				name: 'Prestidigitation',
				range: '10 feet',
				ritual: false,
				school: 'transmutation',
				tags: ['bard', 'sorcerer', 'warlock', 'wizard', 'cantrip'],
				type: 'Transmutation cantrip'
			},
			{
				casting_time: '1 action',
				classes: ['druid', 'ranger', 'sorcerer', 'wizard'],
				components: {
					material: false,
					raw: 'V, S',
					somatic: true,
					verbal: true
				},
				description:
					'You create a 20-foot-radius sphere of fog centered on a point within range. The sphere spreads around corners, and its area is heavily obscured. It lasts for the duration or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it.',
				display: true,
				duration: 'Concentration, up to 1 hour',
				higher_levels:
					'When you cast this spell using a spell slot of 2nd level or higher, the radius of the fog increases by 20 feet for each slot level above 1st.',
				level: '1',
				name: 'Fog Cloud',
				range: '120 feet',
				ritual: false,
				school: 'conjuration',
				tags: ['druid', 'ranger', 'sorcerer', 'wizard', 'level1'],
				type: '1st-level conjuration'
			},
			{
				casting_time: '1 action',
				classes: ['sorcerer', 'wizard'],
				components: {
					material: true,
					materials_needed: ['a piece of cured leather'],
					raw: 'V, S, M (a piece of cured leather)',
					somatic: true,
					verbal: true
				},
				description:
					'You touch a willing creature who isn’t wearing armor, and a protective magical force surrounds it until the spell ends. The target’s base AC becomes 13 + its Dexterity modifier. The spell ends if the target dons armor or if you dismiss the spell as an action.',
				display: true,
				duration: '8 hours',
				level: '1',
				name: 'Mage Armor',
				range: 'Touch',
				ritual: false,
				school: 'abjuration',
				tags: ['sorcerer', 'wizard', 'level1'],
				type: '1st-level abjuration'
			},
			{
				casting_time: '1 action',
				classes: ['bard', 'druid', 'sorcerer', 'wizard'],
				components: {
					material: false,
					raw: 'V, S',
					somatic: true,
					verbal: true
				},
				description:
					'A wave of thunderous force sweeps out from you. Each creature in a 15-foot cube originating from you must make a Constitution saving throw. On a failed save, a creature takes 2d8 thunder damage and is pushed 10 feet away from you. On a successful save, the creature takes half as much damage and isn’t pushed. In addition, unsecured objects that are completely within the area of effect are automatically pushed 10 feet away from you by the spell’s effect, and the spell emits a thunderous boom audible out to 300 feet.',
				display: true,
				duration: 'Instant',
				higher_levels:
					'When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st.',
				level: '1',
				name: 'Thunderwave',
				range: 'Self (15-foot cube)',
				ritual: false,
				save: 'con',
				school: 'evocation',
				tags: ['bard', 'druid', 'sorcerer', 'wizard', 'level1'],
				type: '1st-level evocation'
			},
			{
				casting_time: '1 action',
				classes: ['sorcerer', 'wizard'],
				components: {
					material: true,
					materials_needed: ['alchemist’s supplies'],
					raw: 'V, S, M, (alchemist’s supplies)',
					somatic: true,
					verbal: true
				},
				description:
					'You create a healing elixir in a simple vial that appears in your hand. The elixir retains its potency for the duration or until it’s consumed, at which point the vial vanishes. As an action, a creature can drink the elixir or administer it to another creature. The drinker regains 2d4 + 2 hit points.',
				display: true,
				duration: '24 hours',
				level: '1',
				name: 'Healing Elixir',
				range: 'Self',
				ritual: false,
				school: 'conjuration',
				tags: ['wizard', 'warlock', 'level1'],
				type: '1st-level conjuration'
			},
			{
				casting_time: '1 action',
				classes: ['bard'],
				components: {
					material: false,
					raw: 'V',
					somatic: false,
					verbal: true
				},
				description:
					"You whisper a discordant melody that only one creature of your choice within range can hear, wracking it with terrible pain. The target must make a Wisdom saving throw. On a failed save, it takes 3d6 psychic damage and must immediately use its reaction, if available, to move as far as its speed allows away from you. The creature doesn't move into obviously dangerous ground, such as a fire or a pit. On a successful save, the target takes half as much damage and doesn't have to move away. A deafened creature automatically succeeds on the save.",
				display: true,
				duration: 'Instant',
				higher_levels:
					'When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.',
				level: '1',
				name: 'Dissonant Whispers',
				range: '60 feet',
				ritual: false,
				save: 'wis',
				school: 'enchantment',
				tags: ['bard', 'level1'],
				type: '1st-level enchantment'
			},
			{
				casting_time: '1 action',
				classes: ['bard', 'druid'],
				components: {
					material: false,
					raw: 'V',
					somatic: false,
					verbal: true
				},
				description:
					"Each object in a 20-foot cube within range is outlined in blue, green, or violet light (your choice). Any creature in the area when the spell is cast is also outlined in light if it fails a Dexterity saving throw. For the duration, objects and affected creatures shed dim light in a 10-foot radius.</p><p>Any attack roll against an affected creature or object has advantage if the attacker can see it, and the affected creature or object can't benefit from being invisible.",
				display: true,
				duration: 'Concentration, up to 1 minute',
				level: '1',
				name: 'Faerie Fire',
				range: '60 feet',
				ritual: false,
				save: 'dex',
				school: 'evocation',
				tags: ['bard', 'druid', 'level1'],
				type: '1st-level evocation'
			},
			{
				casting_time: '1 action',
				classes: ['bard', 'paladin'],
				components: {
					material: false,
					raw: 'V, S',
					somatic: true,
					verbal: true
				},
				description:
					'A willing creature you touch is imbued with bravery. Until the spell ends, the creature is immune to being frightened and gains temporary hit points equal to your spellcasting ability modifier at the start of each of its turns. When the spell ends, the target loses any remaining temporary hit points from this spell.',
				display: true,
				duration: 'Concentration, up to 1 minute',
				higher_levels:
					'When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st.',
				level: '1',
				name: 'Heroism',
				range: 'Touch',
				ritual: false,
				school: 'enchantment',
				tags: ['bard', 'paladin', 'level1'],
				type: '1st-level enchantment'
			},
			{
				casting_time: '1 reaction*',
				classes: ['bard', 'sorcerer', 'wizard'],
				components: {
					material: false,
					raw: 'V',
					somatic: false,
					verbal: true
				},
				description:
					'You magically distract the triggering creature and turn its momentary uncertainty into encouragement for another creature. The triggering creature must reroll the d20 and use the lower roll.</p><p>You can then choose a different creature you can see within range (you can choose yourself). The chosen creature has advantage on the next attack roll, ability check, or saving throw it makes within 1 minute. A creature can be empowered by only one use of this spell at a time.</p><p>*which you take when a creature you can see within 60 feet of yourself succeeds on an attack roll, an ability check, or a saving throw',
				display: true,
				duration: 'Instant',
				level: '1',
				name: 'Silvery Barbs',
				range: '60 feet',
				ritual: false,
				school: 'enchantment',
				tags: ['bard', 'sorcerer', 'wizard', 'level1'],
				type: '1st-level enchantment'
			},
			{
				casting_time: '1 action',
				classes: ['sorcerer', 'wizard'],
				components: {
					material: false,
					raw: 'V',
					somatic: false,
					verbal: true
				},
				description:
					'Your body becomes blurred, shifting and wavering to all who can see you. For the duration, any creature has disadvantage on attack rolls against you. An attacker is immune to this effect if it doesn’t rely on sight, as with blindsight, or can see through illusions, as with truesight.',
				display: true,
				duration: 'Concentration, up to 1 minute',
				level: '2',
				name: 'Blur',
				range: 'Self',
				ritual: false,
				school: 'illusion',
				tags: ['sorcerer', 'wizard', 'level2'],
				type: '2nd-Level illusion'
			},
			{
				casting_time: '1 bonus action',
				classes: ['sorcerer', 'warlock', 'wizard'],
				components: {
					material: false,
					raw: 'V',
					somatic: false,
					verbal: true
				},
				description:
					'Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space that you can see.',
				display: true,
				duration: 'Instant',
				level: '2',
				name: 'Misty Step',
				range: 'Self',
				ritual: false,
				school: 'conjuration',
				tags: ['sorcerer', 'warlock', 'wizard', 'level2'],
				type: '2nd-level conjuration'
			},
			{
				casting_time: '1 action',
				classes: ['sorcerer', 'warlock', 'wizard'],
				components: {
					material: true,
					materials_needed: ['a bit of gauze and a wisp of smoke'],
					raw: 'V, S, M (a bit of gauze and a wisp of smoke)',
					somatic: true,
					verbal: true
				},
				description:
					"You transform a willing creature you touch, along with everything it’s wearing and carrying, into a misty cloud for the duration. The spell ends if the creature drops to 0 hit points. An incorporeal creature isn’t affected.</p><p>While in this form, the target’s only method of movement is a flying speed of 10 feet. The target can enter and occupy the space of another creature. The target has resistance to nonmagical damage, and it has advantage on Strength, Dexterity, and Constitution saving throws. The target can pass through small holes, narrow openings, and even mere cracks, though it treats liquids as though they were solid surfaces. The target can't fall and remains hovering in the air even when stunned or otherwise incapacitated.</p><p>While in the form of a misty cloud, the target can’t talk or manipulate objects, and any objects it w as carrying or holding can’t be dropped, used, or otherwise interacted with. The target can’t attack or cast spells.",
				display: true,
				duration: 'Concentration, up to 1 hour',
				level: '3',
				name: 'Gaseous Form',
				range: 'Touch',
				ritual: false,
				save: 'con',
				school: 'transmutation',
				tags: ['sorcerer', 'warlock', 'wizard', 'level3'],
				type: '3rd-level transmutation'
			},
			{
				casting_time: '1 action',
				classes: ['druid', 'sorcerer', 'wizard'],
				components: {
					material: true,
					materials_needed: ['a drop of water'],
					raw: 'V, S, M (a drop of water)',
					somatic: true,
					verbal: true
				},
				description:
					'You conjure up a wall of water on the ground at a point you can see within range. You can make the wall up to 30 feet long, 10 feet high, and 1 foot thick, or you can make a ringed wall up to 20 feet in diameter  20 feet high, and 1 foot thick. The wall vanishes when the spell ends. The wall’s space is difficult terrain.</p><p>Any ranged weapon attack that enters the wall’s space has disadvantage on the attack roll, and fire damage is halved if the fire effect passes through the wall to reach its target. Spells that deal cold damage that pass through the wall cause the area of the wall they pass through to freeze solid (at least a 5-foot square section is frozen). Each 5-foot-square frozen section has AC 5 and 15 hit points. Reducing a frozen section to 0 hit points destroys it. When a section is destroyed, the wall’s water doesn’t fill it.',
				display: true,
				duration: 'Concentration, up to 10 minutes',
				level: '3',
				name: 'Wall of Water',
				range: '60 feet',
				ritual: false,
				school: 'evocation',
				tags: ['druid', 'sorcerer', 'wizard', 'level3'],
				type: '3rd-level evocation'
			},
			{
				casting_time: '1 action',
				classes: ['sorcerer', 'wizard'],
				components: {
					material: false,
					raw: 'V, S',
					somatic: true,
					verbal: true
				},
				description:
					'A 20-foot-radius sphere of whirling air springs into existence centered on a point you choose within range. The sphere remains for the spell’s duration. Each creature in the sphere when it appears or that ends its turn there must succeed on a Strength saving throw or take 2d6 bludgeoning damage. The sphere’s space is difficult terrain.</p><p>Until the spell ends, you can use a bonus action on each of your turns to cause a bolt of lightning to leap from the center of the sphere toward one creature you choose within 60 feet of the center. Make a ranged spell attack. You have advantage on the attack roll if the target is in the sphere. On a hit, the target takes 4d6 lightning damage.</p><p>Creatures within 30 feet of the sphere have disadvantage on Wisdom (Perception) checks made to listen.',
				display: true,
				duration: 'Concentration, up to 1 minute',
				higher_levels:
					'When you cast this spell using a spell slot of 5th level or higher, the damage increases for each of its effects by 1d6 for each slot level above 4th.',
				level: '4',
				name: 'Storm Sphere',
				range: '150 feet',
				ritual: false,
				save: 'str',
				school: 'evocation',
				tags: ['sorcerer', 'wizard', 'level4'],
				type: '4th-level evocation'
			},
			{
				casting_time: '1 action',
				classes: ['druid', 'sorcerer', 'wizard'],
				components: {
					material: true,
					materials_needed: ['a droplet of water'],
					raw: 'V, S, M (a droplet of water)',
					somatic: true,
					verbal: true
				},
				description:
					'You conjure up a sphere of water with a 10-foot radius on a point you can see within range. The sphere can hover in the air, but no more than 10 feet off the ground. The sphere remains for the spell’s duration.</p><p>Any creature in the sphere’s space must make a Strength saving throw. On a successful save, a creature is ejected from that space to the nearest unoccupied space outside it. A Huge or larger creature succeeds on the saving throw automatically. On a failed save, a creature is restrained by the sphere and is engulfed by the water. At the end of each of its turns, a restrained target can repeat the saving throw.</p><p>The sphere can restrain a maximum of four Medium or smaller creatures or one Large creature. If the sphere restrains a creature in excess of these numbers, a random creature that was already restrained by the sphere falls out of it and lands prone in a space within 5 feet of it.</p><p>As an action, you can move the sphere up to 30 feet in a straight line. If it moves over a pit, cliff, or other drop, it safely descends until it is hovering 10 feet over ground. Any creature restrained by the sphere moves with it. You can ram the sphere into creatures, forcing them to make the saving throw, but no more than once per turn.</p><p>When the spell ends, the sphere falls to the ground and extinguishes all normal flames within 30 feet of it. Any creature restrained by the sphere is knocked prone in the space where it falls.',
				display: true,
				duration: 'Concentration, up to 1 minute',
				level: '4',
				name: 'Watery Sphere',
				range: '90 feet',
				ritual: false,
				save: 'str',
				school: 'conjuration',
				tags: ['druid', 'sorcerer', 'wizard', 'level4'],
				type: '4th-level conjuration'
			},
			{
				casting_time: '1 action',
				classes: ['sorcerer', 'wizard'],
				components: {
					material: true,
					materials_needed: ['a small crystal or a glass cone'],
					raw: 'V, S, M (a small crystal or a glass cone)',
					somatic: true,
					verbal: true
				},
				description:
					'A blast of cold air erupts from your hands. Each creature in a 60-foot cone must make a Constitution saving throw. A creature takes 8d8 cold damage on a failed save, or half as much damage on a successful one.</p><p>A creature killed by this spell becomes a frozen statue until it thaws.',
				display: true,
				duration: 'Instant',
				higher_levels:
					'When you cast this spell using a spell slot of 6th level or higher, the damage increases by 1d8 for each slot level above 5th.',
				level: '5',
				name: 'Cone of Cold',
				range: 'Self (60-foot cone)',
				ritual: false,
				save: 'con',
				school: 'evocation',
				tags: ['sorcerer', 'wizard', 'level5'],
				type: '5th-level evocation'
			},
			{
				casting_time: '1 action',
				classes: ['sorcerer', 'wizard'],
				components: {
					material: true,
					materials_needed: [
						'a bit of fur; a piece of amber, glass or a crystal rod; and three silver pins'
					],
					raw: 'V, S, M (a bit of fur; a piece of amber, glass or a crystal rod; and three silver pins)',
					somatic: true,
					verbal: true
				},
				description:
					'You create a bolt of lightning that arcs toward a target of your choice that you can see within range. Three bolts then leap from that target to as many as three other targets, each of which must be within 30 feet of the first target. A target can be a creature or an object and can be targeted by only one of the bolts.</p><p>A target must make a Dexterity saving throw. The target takes 10d8 lightning damage on a failed save, or half as much damage on a successful one.',
				display: true,
				duration: 'Instant',
				higher_levels:
					'When you cast this spell using a spell slot of 7th level or higher, one additional bolt leaps from the first target to another target for each slot level above 6th.',
				level: '6',
				name: 'Chain Lightning',
				range: '150 feet',
				ritual: false,
				save: 'dex',
				school: 'evocation',
				tags: ['sorcerer', 'wizard', 'level6'],
				type: '6th-level evocation'
			},
			{
				casting_time: '1 action',
				classes: ['sorcerer', 'wizard'],
				components: {
					material: true,
					materials_needed: ['a lodestone and a pinch of dust'],
					raw: 'V, S, M (a lodestone and a pinch of dust)',
					somatic: true,
					verbal: true
				},
				description:
					'A thin green ray springs from your pointing finger to a target that you can see within range. The target can be a creature, an object, or a creation of magical force, such as the wall created by [wall of force].</p><p>A creature targeted by this spell must make a Dexterity saving throw. On a failed save, the target takes 10d6 + 40 force damage. If this damage reduces the target to 0 hit points, it is disintegrated.</p><p>A disintegrated creature and everything it is wearing and carrying, except magic items, are reduced to a pile of fine gray dust. The creature can be restored to life only by means of a [true resurrection] or a [wish] spell.</p><p>This spell automatically disintegrates a Large or smaller nonmagical object or a creation of magical force. If the target is a Huge or larger object or creation of force, this spell disintegrates a 10-foot-cube portion of it. A magic item is unaffected by this spell.',
				display: true,
				duration: 'Instant',
				higher_levels:
					'When you cast this spell using a spell slot of 7th level or higher, the damage increases by 3d6 for each slot level above 6th.',
				level: '6',
				name: 'Disintegrate',
				range: '60 feet',
				ritual: false,
				save: 'dex',
				school: 'transmutation',
				tags: ['sorcerer', 'wizard', 'level6'],
				type: '6th-level transmutation'
			},
			{
				casting_time: '1 action',
				classes: ['sorcerer', 'wizard'],
				components: {
					material: true,
					materials_needed: ['a glass or crystal bead that shatters when the spell ends'],
					raw: 'V, S, M (a glass or crystal bead that shatters when the spell ends)',
					somatic: true,
					verbal: true
				},
				description:
					'An immobile, faintly shimmering barrier springs into existence in a 10-foot radius around you and remains for the duration.</p><p>Any spell of 5th level or lower cast from outside the barrier can’t affect creatures or objects within it, even if the spell is cast using a higher level spell slot. Such a spell can target creatures and objects within the barrier, but the spell has no effect on them. Similarly, the area within the barrier is excluded from the areas affected by such spells.',
				display: true,
				duration: 'Concentration, up to 1 minute',
				higher_levels:
					'When you cast this spell using a spell slot of 7th level or higher, the barrier blocks spells of one level higher for each slot level above 6th.',
				level: '6',
				name: 'Globe of Invulnerability',
				range: 'Self',
				ritual: false,
				school: 'abjuration',
				tags: ['sorcerer', 'wizard', 'level6'],
				type: '6th-level abjuration'
			}
		],
		name: 'Drew - Curse of the Sea Sorcer/Bard',
		published: false,
		user_id: 'qifyezl9wou7dmh'
	},
	{
		class: 'Wizard',
		character: 'Aranimir',
		color: 'var(--red)',
		creator: null,
		description: '',
		id: 'qifyezl9wou7dmh-1678827280442',
		level: '11',
		list: [],
		name: 'Aranimir - Spellthief/bladesinger',
		published: false,
		user_id: 'qifyezl9wou7dmh'
	}
];