<script>
	import { onMount } from 'svelte';
	import { spells } from '../../stores-persist';
	import Pill from '../pill.svelte';
	import Schoolicon from '../schoolicon.svelte';
	import SpellCard from '../spellCard.svelte';
	import { visualViewport } from '../../stores';
	import Button from '../button.svelte';
	export let scrollY;
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

	function handleTouchStart(e) {
		console.log('touchStart');
	}
	function handleTouchMove(e) {
		console.log('touchMovet');
	}
	function handleTouchEnd(e) {
		console.log('touchEnd');
	}
	let activeLi;
	let liList = [];
	let beforeHeight;

	// $: if (scrollY) {
	// console.log(document.elementFromPoint($visualViewport.width / 2, $visualViewport.height / 2).closest('li'));
	// activeLi = document.elementFromPoint($visualViewport.width / 2, beforeHeight).closest('li');
	// console.log((beforeHeight + scrollY) / $visualViewport.height - (beforeHeight / $visualViewport.height))
	// }

	function handleScroll() {
		activeLi = document
			.elementFromPoint($visualViewport.width / 2, beforeHeight + 150)
			.closest('li');
	}

	onMount(() => {});
</script>

<div class="tutorial_inner">
	<div class="before" bind:clientHeight={beforeHeight}>
		<div class="text">
			<h4>Tutorial</h4>
			<h1>Spellbooks</h1>
			<p>
				Spells take many forms in Dungeon and Dragons, but in Spellbook Pro they usually appear like
				this:
			</p>
		</div>
		<div class="spell_container" class:tapit={activeLi === liList[6]}>
			<SpellCard type="list shadow" data={tutorialSpell} />
		</div>
	</div>
	<div class="text after">
		<!-- <ul
			on:touchstart={(e) => handleTouchStart(e)}
			on:touchend={(e) => handleTouchEnd(e)}
			on:touchmove={(e) => handleTouchMove(e)}
		> -->
		<ul on:scroll={() => handleScroll()}>
			<li bind:this={liList[0]} class:active={activeLi === liList[0] || activeLi == null}>
				<p style="text-align:center; margin-bottom: .5rem">Let's break it down:</p>
				<p>
					<span style="display: inline-block">
						<h2 style="font-size: 1.3rem; margin: 0; margin-bottom: -.4rem">
							<Schoolicon school={tutorialSpell.school} />
							{tutorialSpell.name}
						</h2>
					</span>
					is the name of the spell.
				</p>
			</li>
			<li bind:this={liList[1]} class:active={activeLi === liList[1]}>
				<p>
					<span style="display: inline-block; font-weight: 400">
						<Pill
							type="discreet green"
							text={tutorialSpell.casting_time}
							icon="ri-flashlight-line"
						/>
					</span>
					tells you the casting time of the spell. This could be for example an action, a bonus action
					or a reaction.
				</p>
			</li>
			<li bind:this={liList[2]} class:active={activeLi === liList[2]}>
				<p>
					<span style="display: inline-block; font-weight: 400">
						<Pill type="discreet blue" text={tutorialSpell.range} icon="ri-arrow-right-up-line" />
					</span>
					tells you the range of a spell. This could be for example self, touch, an area or a specified
					range expressed in feet.
				</p>
			</li>
			<li bind:this={liList[3]} class:active={activeLi === liList[3]}>
				<p>
					<span style="display: inline-block; font-weight: 400">
						<Pill type="discreet yellow" text={tutorialSpell.duration} icon="ri-time-line" />
					</span>
					tells you the duration of a spell (if cast succesfully). It also tells you wether the spell
					needs concentration.
				</p>
			</li>
			<li bind:this={liList[4]} class:active={activeLi === liList[4]}>
				<p>
					<span style="display: inline-block; font-weight: 400">
						<Pill type="discreet small" text={tutorialSpell.type} icon="ri-book-2-line" />
					</span>
					tells you the level and school of magic of the spell.
				</p>
			</li>
			<li bind:this={liList[5]} class:active={activeLi === liList[5]}>
				<p>
					<span style="display: inline-block; font-weight: 400">
						<Pill type="discreet small" text={tutorialSpell.save} icon="ri-lifebuoy-line" />
					</span>
					shows if the target(s) need to perform a saving throw for the spell to take (full) effect,
					and if so, which type.
				</p>
			</li>
			<li bind:this={liList[6]} class:active={activeLi === liList[6]}>
				<p>
					You can tap a spell to learn more about it, such as its description, try it!
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
		// min-height: 100%;
		// max-height: 100%;
		height: 100%;
		.spell_container {
			pointer-events: none;
			// padding: 1rem .5rem;
			margin: 2.5rem 0 1.5rem -1rem;
			position: relative;
			width: calc(100% + 2rem);
			&:after {
				content: '';
				position: absolute;
				left: -1.5rem;
				right: -1.5rem;
				top: -1.5rem;
				bottom: -1.5rem;
				// border-radius: var(--large-radius);
				background-color: var(--bodybg);
				z-index: -1;
				filter: brightness(0.8);
			}
			&:before {
				opacity: 0;
				content: '';
				top: 0;
				left: .4rem;
				right: .4rem;
				bottom: 0;
				position: absolute;
				// width: calc(100% - 2rem);
				height: 100%;
				outline: 2px solid var(--lightblue);
				z-index: 1;
				border-radius: var(--huge-radius);
				transition: .2s;
				pointer-events: none;
				@keyframes pulse {
					0% {transform: scale(1);}
					50% {transform: scale(1.05);}
					10% {transform: scale(1);}
				}
			}
			&.tapit {
				pointer-events: auto;
				&:before {
					opacity: 1;
					animation: pulse .8s infinite ease-in-out;
				}
			}
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

			&.after {
				height: 100%;
				overflow: hidden;
				// mask-image: linear-gradient(0deg, transparent 0%, transparent 40%, black 60%, black 100%);

				ul {
					padding-bottom: 100%;
					height: 100%;
					overflow-y: auto;
					scroll-snap-type: y mandatory;
					scroll-behavior: smooth;
					-webkit-overflow-scrolling: touch;
					&::-webkit-scrollbar {
						-webkit-appearance: none;
						width: 0;
						height: 0;
					}
					li {
						opacity: 0.1;
						transition: 0.3s;
						padding-bottom: 2rem;
						scroll-snap-align: start;
						p {
							margin: 0;
						}
						&.active {
							opacity: 1;
						}
					}
				}
			}
			// ul {
			// 	padding-bottom: 100%;
			// }
		}
		// ul {
		// background: -webkit-linear-gradient(transparent 0%, transparent 39%, #fff 40%, #fff 60%, transparent 61%, transparent 100%);
		// background-clip: text;
		// -webkit-text-fill-color: transparent;
		// }
	}
</style>
