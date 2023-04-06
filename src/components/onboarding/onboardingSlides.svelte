<script>
	import { fly, scale } from 'svelte/transition';
	import CenterContainer from '../centerContainer.svelte';
	export let slide;
	export let direction;
	import Icon from '$lib/icon-small.png';
	import Login from '../login.svelte';
	import OnboardingOrderingAnimation from './onboarding-orderingAnimation.svelte';
	import OnboardingLookupAnimation from './onboarding-lookupAnimation.svelte';
	import OnboardingVoiceAnimation from './onboarding-voiceAnimation.svelte';
	import { platform } from '../../stores';
	import OnboardingLibraryAnimation from './onboarding-libraryAnimation.svelte';
	import OnboardingSharenimation from './onboarding-sharenimation.svelte';
	let inX, outX;
	$: if (direction === 'forward') {
		inX = 100;
		outX = -100;
	} else {
		inX = -100;
		outX = 100;
	}
</script>

<div class="slides_container">
	{#key slide}
		<div
			class="slides"
			in:fly={{ x: inX, duration: 300, delay: 300 }}
			out:fly={{ x: outX, duration: 300 }}
		>
			<div
				class="slides_inner"
				in:scale={{ start: 0.8, duration: 300, delay: 300 }}
				out:scale={{ start: 0.8, duration: 300 }}
			>
				{#if slide === 0}
					<div class="slide">
						<CenterContainer>
							<img src={Icon} alt="" />
							<h1>Spellbook<span>Pro</span></h1>
							<div style="padding: 0 2rem 1rem; text-align: center">
								<p style="font-size: 1.2rem">
									Welcome to making your D&D battles with spellcasters a whole lot easier.
								</p>
							</div>
						</CenterContainer>
					</div>
				{:else if slide === 1}
					<div class="slide">
						<CenterContainer>
							<h2>Order spells your way</h2>
							<OnboardingOrderingAnimation />
							<p>
								Sort your spells by level or by categories you define. Your spellbooks work the way
								you like it.
							</p>
						</CenterContainer>
					</div>
				{:else if slide === 2}
					<div class="slide">
						<CenterContainer>
							<h2>Quickly look up any spell</h2>
							<OnboardingLookupAnimation />
							<p>
								Wherever you are in the app, you always have all spells from D&D at your fingertips
								so you can keep focussing on not total-party-killing your team.
							</p>
						</CenterContainer>
					</div>
				{:else if slide === 3}
					<div class="slide">
						<CenterContainer>
							<h2>Or ask {$platform === 'ios' ? 'Siri' : $platform === 'android' ? 'Hey Google' : 'Siri'}</h2>
							<OnboardingVoiceAnimation />
							<p>
								Spells shouldn't hold you back in combat. Use your voice assistant to catch up on
								spells in the heat of the moment without even picking up your device.
							</p>
						</CenterContainer>
					</div>
				{:else if slide === 4}
					<div class="slide">
						<CenterContainer>
							<h2>Create and manage your library</h2>
							<OnboardingLibraryAnimation/>
							<p>
								Manage multiple spellbooks for your characters or NPC's and quickly switch between
								them.
							</p>
						</CenterContainer>
					</div>
				{:else if slide === 5}
					<div class="slide">
						<CenterContainer>
							<h2>Share your masterpieces</h2>
							<OnboardingSharenimation />
							<p>Share your spellbooks with the community, inside and outside the app.</p>
						</CenterContainer>
					</div>
				{:else if slide === 6}
					<div class="slide">
						<CenterContainer>
							<h3>Start your adventure!</h3>
							<Login />
						</CenterContainer>
					</div>
				{/if}
			</div>
		</div>
	{/key}
</div>

<style lang="scss">
	.slides_container {
		height: 100%;
		.slides {
			height: 100%;
			.slides_inner {
				height: 100%;
				.slide {
					// display: flex;
					// flex-direction: column;
					// justify-content: center;
					// align-items: center;
					text-align: center;
					height: 100%;
					img {
						border-radius: var(--huge-radius);
						width: 150px;
					}
					h1 {
						text-align: center;
						margin: 0.5rem 0 1.5rem;
						font-size: 2.5rem;
						span {
							vertical-align: super;
							font-size: 1.4rem;
							font-weight: 300;
							margin-left: 0.2rem;
						}
					}
				}
			}
		}
	}
</style>
