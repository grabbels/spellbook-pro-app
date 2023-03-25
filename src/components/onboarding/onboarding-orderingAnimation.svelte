<script>
	import OnboardingPhone from './onboarding-phone.svelte';
</script>

<div>
	<OnboardingPhone>
		<div class="inner">
			<div class="text"><span style="background-color: var(--yellow)">offense</span></div>
			<div />
			<div />
			<div class="text"><span style="background-color: var(--lightgreen)">defense</span></div>
			<div />
			<div />
			<div class="text"><span style="background-color: var(--lightblue)">utility</span></div>
			<div />
			<div />
		</div>
	</OnboardingPhone>
</div>

<style lang="scss">
	div {
		width: 100%;
		text-align: center;
		// padding: 2rem 0;
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
				// gap: .2rem;
				&.text {
					width: auto;
					background-color: transparent;
					span {
						background-color: var(--lightblue);
						padding: 0.1rem 0.4rem 0.2rem;
						border-radius: 50vh;
						color: var(--onforeground);
					}
				}
				&:nth-child(3) {
					animation-name: moveThird;
					animation-duration: 1.7s;
					animation-timing-function: ease-in-out;
					animation-delay: 0.5s;
					animation-fill-mode: forwards;
					@keyframes moveThird {
						to {
							transform: translateY(calc(300% + 0.6rem));
						}
					}
				}
				&:nth-child(6) {
					animation-name: moveSixth;
					animation-duration: 2s;
					animation-timing-function: ease-in-out;
					animation-delay: 0.9s;
					animation-fill-mode: forwards;
					@keyframes moveSixth {
						to {
							transform: translateY(calc(-300% - 0.6rem));
						}
					}
				}
				&:nth-child(9) {
					animation-name: moveNinth;
					animation-duration: 1.7s;
					animation-timing-function: ease-in-out;
					animation-delay: 1.5s;
					animation-fill-mode: forwards;
					@keyframes moveNinth {
						to {
							transform: translateY(calc(-700% - 1.4rem));
						}
					}
				}
				&:nth-child(2) {
					animation-name: moveSecond;
					animation-duration: 2s;
					animation-timing-function: ease-in-out;
					animation-delay: 1.9s;
					animation-fill-mode: forwards;
					@keyframes moveSecond {
						to {
							transform: translateY(calc(700% + 1.45rem));
						}
					}
				}
			}
		}
	}
</style>
