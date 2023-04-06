<script>
	import SafeViewPadding from '../../components/safeViewPadding.svelte';
	import Panel from '../../components/panel.svelte';
	import Button from '../../components/button.svelte';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import { visualViewport } from '../../stores';
	import Shift from '$lib/shift-bg.png';
	import CenterContainer from '../../components/centerContainer.svelte';
	import { onMount } from 'svelte';
	import OnboardingSlides from '../../components/onboarding/onboardingSlides.svelte';
	function handleNext() {}
	let slides = [0, 1, 2, 3, 4, 5, 6];
	let slide = 0;
	let direction;
	
</script>

<SafeViewPadding noheader>
	<div
		class="onboarding_form"
		out:fly={{ duration: 300, y: 20 }}
		in:fly={{ duration: 300, y: 20, delay: 300 }}
	>
		<div class="inner">
			<OnboardingSlides {slide} {direction} />
			<div class="indicators">
				{#each slides as indicator, i}
					<div class:active={slide === i} class="indicator" />
				{/each}
			</div>
			<div class="buttons {slide < 1 ? 'single' : slide === slides.length - 1 ? 'single-last' : ''}">
				{#if slide > 0}
					<Button
						on:click={() => {
							direction = 'back';
							slide--;
						}}
						text="back"
						icon="ri-arrow-left-s-line"
						type="outline"
					/>
				{/if}
					<Button
						on:click={() => {
							direction = 'forward';
							slide++;
						}}
						text="continue"
						icon="ri-arrow-right-s-line"
						type="fill accent"
						
					/>
			</div>
		</div>
	</div>
	{#if slide === 0 || slide === 6}
		<div class="shift-bg" transition:fade>
			<div class="rotate">
				<div class="shift" style="background-image: url({Shift})" />
				<div class="shift" style="background-image: url({Shift})" />
				<div class="shift" style="background-image: url({Shift})" />
				<div class="shift" style="background-image: url({Shift})" />
				<div class="shift" style="background-image: url({Shift})" />
				<div class="shift" style="background-image: url({Shift})" />
			</div>
		</div>
	{/if}
</SafeViewPadding>

<style lang="scss">
	.onboarding_form {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2rem;
		position: relative;
		.inner {
			width: 100%;
			height: 100%;
			display: grid;
			grid-template-rows: 90% 30px 50px;
			justify-items: center;
			align-items: center;
			.indicators {
				display: flex;
				gap: 0.7rem;
				// margin-bottom: 1rem;
				.indicator {
					height: 8px;
					width: 8px;
					border-radius: 6px;
					background-color: var(--moretranslucent);
					transition: 0.2s;
					&.active {
						background-color: var(--lesstranslucent);
						transform: scale(1.2);
					}
				}
			}
		}
	}
	.buttons {
		display: grid;
		width: 70%;
		max-width: 205px;
		grid-template-columns: 42% 1fr;
		transition: .3s;
		gap: 0.2rem;
		overflow: hidden;
		
		&.single {
			grid-template-columns: 0 1fr;
			max-width: 130px;
		}
		&.single-last {
			grid-template-columns: 1fr 0;
			max-width: 130px;
		}
	}
	:global(.buttons button.fill) {
		grid-column-start: 2;
	}
	:global(.buttons button.outline) {
		grid-column-start: 0;
	}
	:global(.buttons.single-last button:first-child) {
		border-radius: var(--large-radius);
	}
	.shift-bg {
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		background-color: var(--bodybg);
		opacity: 0.2;
		// filter: contrast(0.8);
		filter: blur(2px);
		.rotate {
			transform: rotate(20deg);
			position: absolute;
			top: 0;
			// left: -50px;
			width: 100%;
			height: 100%;
			// filter: blur(1px);
			.shift {
				// display: inline-block;
				width: 378px;
				height: 1994px;
				height: 200%;
				background-size: contain;
				background-repeat: repeat-y;
				// transform: rotate(20deg);
				position: absolute;
				left: 0;
				top: -50%;
				background-position: 0 0%;
				animation-name: shift;
				animation-timing-function: linear;
				animation-iteration-count: infinite;
				animation-duration: 45s;
				@keyframes shift {
					to {
						background-position: 0 997px;
					}
				}
				&:nth-child(1) {
					transform: translate(-250%, -10%);
				}
				&:nth-child(2) {
					transform: translate(-150%, -5%);
				}
				&:nth-child(3) {
					transform: translate(-50%, 0%);
				}
				&:nth-child(4) {
					transform: translate(50%, 5%);
				}
				&:nth-child(5) {
					transform: translate(150%, 10%);
				}
				&:nth-child(6) {
					transform: translate(250%, 15%);
				}
			}
		}
	}
</style>
