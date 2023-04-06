<script>
	import { fade } from 'svelte/transition';
	import OnboardingPhone from './onboarding-phone.svelte';
	let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<div>
	<OnboardingPhone>
		<div class="inner">
			<div class="mock_input">
				<span>F</span>
				<span>i</span>
				<span>r</span>
				<span>e</span>
			</div>
			{#each cards as card, i}
				<div in:fade={{duration: 200, delay: (100 * i + 1500)}} />
			{/each}
		</div>
		<div class="panel">
			<div>
				<h2><i class="ri-fire-line" /> Fireball</h2>
				<p>Such fire, such wow. Many burn, very death.</p>
			</div>
		</div>
		<div class="shadow" />
	</OnboardingPhone>
</div>

<style lang="scss">
	div {
		width: 100%;
		text-align: center;
		// padding: 2rem 0;
		.panel {
			width: 90%;
			left: 5%;
			top: 50%;
			transform: translateY(-50%);
			transform-origin: center;
			aspect-ratio: 4 / 3;
			background-color: var(--panelbg);
			position: absolute;
			z-index: 2;
			border-radius: var(--medium-radius);
			transform: scale(0.9);
			opacity: 0;
			animation-name: appear;
			animation-fill-mode: forwards;
			animation-duration: 0.3s;
			animation-delay: 3.4s;
			font-weight: 500;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 1rem;
			h2 {
				font-size: 1.2rem;
				text-align: left;
				i {
					color: var(--red);
					vertical-align: -2px;
				}
			}
			p {
				color: var(--lesstranslucent);
				margin-top: -0.5rem;
				width: 100%;
				text-align: left;
				font-size: 0.9rem;
				line-height: 1.2;
			}
			@keyframes appear {
				to {
					opacity: 1;
					transform: scale(1) translateY(-50%);
				}
			}
		}
		.shadow {
			height: 100%;
			width: 100%;
			left: 0;
			top: 0;
			position: absolute;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.2);
			backdrop-filter: contrast(0.5) brightness(1.1) saturate(1.8);
			border-radius: 26px;
			animation-name: shadowAppear;
			animation-fill-mode: forwards;
			animation-duration: 0.4s;
			animation-delay: 3.3s;
			opacity: 0;
			@keyframes shadowAppear {
				to {
					opacity: 1;
				}
			}
		}
		.inner {
			position: absolute;
			top: 22px;
			left: 16px;
			right: 16px;
			bottom: 0px;
			width: calc(100% - 32px);
			overflow: hidden;
			z-index: 1;
			display: grid;
			gap: 0.2rem;
			grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
			div {
				background-color: var(--lightbg);
				border-radius: 6px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 0.75rem;
				&:nth-child(4) {
					animation-name: tap;
					animation-duration: .3s;
					animation-delay: 1s;
				}
				@keyframes fadeInResults {
					to {
						opacity: 1;
					}
				}
				@keyframes tap {
					50% {
						transform: scale(0.9);
						opacity: 1;
					}
					100% {
						transform: scale(1);
						opacity: 1;
					}
				}
				@keyframes tapLong {
					80% {
						transform: scale(1);
						opacity: 1;
					}
					90% {
						transform: scale(0.9);
						opacity: 1;
					}
					100% {
						transform: scale(1);
						opacity: 1;
					}
				}
				// &:not(:nth-child(3)) {
				// 	animation-name: tick;
				// 	animation-delay: 2s;
				// 	animation-duration: 0.3s;
				// }

				// gap: .2rem;
				&.mock_input {
					background-color: var(--translucent);
					display: flex;
					gap: 0.2rem;
					padding: 0.5rem 0.8rem 0.5rem 0.8rem;
					justify-content: flex-start;
					animation-name: tap;
					animation-delay: 0.7s;
					animation-duration: 0.3s;
					@keyframes tick {
						50% {
							transform: scale(0.9);
						}
						100% {
							transform: scale(1);
						}
					}
					span {
						// width: 2.5%;
						height: 100%;
						// background-color: var(--translucent);
						opacity: 0;
						animation-name: fadeIn;
						animation-fill-mode: forwards;
						animation-duration: 0.2s;
						@keyframes fadeIn {
							to {
								opacity: 1;
							}
						}
						@for $i from 1 through 7 {
							&:nth-child(#{$i}n) {
								animation-delay: #{$i * 0.15 + 1}s;
							}
						}
					}
				}
			}
		}
	}
</style>
