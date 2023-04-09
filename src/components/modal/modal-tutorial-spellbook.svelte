<script>
	import { spells } from '../../stores-persist';
	import Pill from '../pill.svelte';
	import Schoolicon from '../schoolicon.svelte';
	import SpellCard from '../spellCard.svelte';
	let tutorialSpell = {
		casting_time: '1 action',
		components: {
			material: true,
			materials_needed: ['a small rock'],
			raw: 'V, S, M (a small rock)',
			somatic: true,
			verbal: true
		},
		description:
			'<p>You cast a spell that fills the world around you with pure awesomeness. All creatures within 30 feet of you need to succeed on a wisdom saving throw or succumb to your awesomenes for up to one minute.</p>',
		duration: 'Concentration, up to 1 minute',
		id: '123abc',
		level: 1,
		name: 'Bestow personality',
		range: 'Self',
		ritual: false,
		save: 'wis',
		school: 'enchantment',
		type: '1st-level enchantment'
	};
</script>

<div class="tutorial_inner">
	<div class="text" style="padding-top: 3rem">
		<h4>Tutorial</h4>
		<h1>Spellbooks</h1>
		<p>
			Spells take many forms in Dungeon and Dragons, but in Spellbook Pro they usually appear like
			this:
		</p>
	</div>
	<div class="spell_container">
		<SpellCard type="list shadow" data={tutorialSpell} />
	</div>
	<div class="text">
		<p>Let's break it down:</p>
		<ul>
			<li>
				<p>
                    <span style="display: inline-block">
                        <h2 style="font-size: 1.3rem; margin: 0; margin-bottom: -.4rem"><Schoolicon school={tutorialSpell.school} /> {tutorialSpell.name}</h2>
                    </span>
                     is the name of the spell.
                </p>
			</li>
			<li>
				<p>
                    <span style="display: inline-block; font-weight: 400">
                        <Pill type="discreet green" text={tutorialSpell.casting_time} icon="ri-flashlight-line" />
                    </span>
                     tells you the casting time of the spell. This could be for example an action, a bonus action or a reaction.
                </p>
			</li>
			<li>
				<p>
                    <span style="display: inline-block; font-weight: 400">
                        <Pill type="discreet blue" text={tutorialSpell.range} icon="ri-arrow-right-up-line" />
                    </span>
                     tells you the range of a spell. This could be for example self, touch, an area or a specified range expressed in feet.
                </p>
			</li>
			<li>
				<p>
                    <span style="display: inline-block; font-weight: 400">
                        <Pill type="discreet yellow" text={tutorialSpell.duration} icon="ri-time-line" />
                    </span>
                     tells you the duration of a spell (if cast succesfully). It also tells you wether the spell needs concentration.
                </p>
			</li>
			<li>
				<p>
                    <span style="display: inline-block; font-weight: 400">
                        <Pill type="discreet small" text={tutorialSpell.type} icon="ri-book-2-line" />
                    </span>
                     tells you the level and school of magic of the spell.
                </p>
			</li>
			<li>
				<p>
                    <span style="display: inline-block; font-weight: 400">
                        <Pill type="discreet small" text={tutorialSpell.save} icon="ri-lifebuoy-line" />
                    </span>
                     shows if the target(s) need to perform a saving throw for the spell to take (full) effect, and if so, which type.
                </p>
			</li>
		</ul>
	</div>
</div>

<style lang="scss">
	.tutorial_inner {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		.spell_container {
			pointer-events: none;
		}
		.text {
			width: 100%;
			margin-top: 1rem;
			h1 {
				margin-bottom: 1rem;
			}
			h4 {
				margin-left: 0;
			}
			padding: 0 1rem;
		}
	}
</style>
