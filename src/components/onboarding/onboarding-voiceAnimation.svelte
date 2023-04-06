<script>
	import { fade, fly, scale } from 'svelte/transition';
	import { platform } from '../../stores';
	import OnboardingPhone from './onboarding-phone.svelte';
</script>

<div>
	<OnboardingPhone>
		<div class="chat one" in:scale={{ duration: 300, delay: 800, start: 0.8 }}>
			Hey {$platform === 'ios' ? 'Siri' : $platform === 'android' ? 'Google' : 'Siri'}, how much
			damage does the spell Fireball do at third level? <i class="ri-message-fill" />
		</div>

		<div class="inner">
			<i in:fade={{ delay: 1500, duration: 300 }} class="ri-chat-smile-3-line" />
		</div>

		<div class="chat two" in:scale={{ duration: 300, delay: 2000, start: 0.8 }}>
			A whole lot.
			<div><i class="ri-message-fill" /></div>
		</div>
		<div class="dice">
			<div />
			<div />
			<div />
		</div>
	</OnboardingPhone>
</div>

<style lang="scss">
	div {
		width: 100%;
		.inner {
			position: absolute;
			top: 22px;
			left: 16px;
			right: 16px;
			bottom: 0px;
			width: calc(100% - 32px);
			overflow: hidden;
			z-index: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			i {
				font-size: 5rem;
				color: var(--lesstranslucent);
			}
		}
		.chat {
			position: absolute;
			background-color: var(--accent);
			color: var(--onforeground);
			z-index: 2;
			padding: 0.8rem 0.6rem 1.2rem;
			border-radius: var(--large-radius);
			font-weight: 500;
			left: -3rem;
			top: 2rem;
			min-height: 70px;
			i {
				position: absolute;
				bottom: -27px;
				left: 0;
				color: var(--accent);
				font-size: 6rem;
				z-index: -1;
			}
			&.two {
				background-color: var(--lightblue);
				top: auto;
				left: auto;
				right: -3rem;
				bottom: 3rem;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 150px;
				div {
					transform: scaleY(-1);
					z-index: -1;
					position: absolute;
					i {
						color: var(--lightblue);
						bottom: auto;
						top: -53px;
					}
				}
			}
		}
		.dice {
			position: absolute;
			z-index: 3;
			div {
				width: 40px;
				height: 40px;
				border-radius: 10px;
				position: absolute;
				opacity: 0;
				&:nth-child(1) {
					background-color: var(--yellow);

					right: -3rem;
					top: 2rem;
					transform: scale(1) rotate(-70deg) translate(-12rem, -4rem);
					animation: dice1 0.5s ease-out forwards 2.5s;
					@keyframes dice1 {
						to {
							transform: rotate(80deg) scale(1) translate(0, 0);
							opacity: 1;
						}
					}
				}
				&:nth-child(2) {
					background-color: var(--red);
					// opacity: 1;
					right: 0rem;
					top: 1rem;
					transform: translate(-3rem, 10rem) rotate(-180deg);
					animation: dice2 0.4s ease-out forwards 2.7s;
					@keyframes dice2 {
						to {
							transform: translate(2rem, -4rem) rotate(40deg);
							opacity: 1;
						}
					}
				}
				&:nth-child(3) {
                    background-color: var(--darkblue);
					right: -6rem;
					top: 4.5rem;
					transform: scale(1) translate(-10rem, 20rem) rotate(-70deg) ;
					animation: dice3 0.6s ease-out forwards 2.4s;
					@keyframes dice3 {
						to {
							transform: scale(1) translate(0, 0) rotate(240deg);
							opacity: 1;
						}
					}
				}
			}
		}
	}
</style>
