<script>
	import { fly } from 'svelte/transition';
	import OnboardingPhone from './onboarding-phone.svelte';
	let books = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	import { linear } from 'svelte/easing';
</script>

<div>
	<OnboardingPhone>
		<div class="inner">
			<div class="books">
				{#each books as book, i}
					<div
						in:fly={{ duration: 400, y: -200, delay: i * 100 + 500, easing: linear }}
						class="book"
					>
						<i class="ri-bookmark-fill" />
					</div>
				{/each}
			</div>
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
			bottom: 8px;
			width: calc(100% - 32px);
			overflow: hidden;
			z-index: 1;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			.books {
				display: flex;
				flex-direction: column-reverse;
				width: 100%;
				align-items: center;
				transform-origin: bottom center;
				animation: squish 0.4s cubic-bezier(0,.6,.28,1.51) forwards 1.9s;
				@keyframes squish {
					to {
						transform: scaleY(0.7);
					}
				}
				.book {
					height: 30px;
					width: 70%;
					background-color: beige;
					border-radius: 4px;
					border: 6px solid var(--bodybg);
					border-right: 0;
					position: relative;
					&:after {
						height: 100%;
						position: absolute;
						content: '';
						top: 0;
						right: 0;
						width: 2px;
						background-color: var(--inputbg);
					}
					i {
						font-size: 1.7rem;
						color: var(--lightblue);
						position: absolute;
						top: 0px;
						left: 0;
					}
					&:nth-child(2) {
						height: 35px;
						width: 68%;
						i {
							top: 7px;
							left: 8px;
							color: var(--accent);
						}
					}
					&:nth-child(3) {
						height: 20px;
						width: 73%;
						transform: translateX(-14px);
						i {
							top: -2px;
							left: 5px;
							color: var(--red);
						}
					}
					&:nth-child(4) {
						height: 34px;
						width: 81%;
						transform: scaleX(-1);
						i {
							top: 4px;
							left: 5px;
							color: var(--darkgreen);
						}
					}
					&:nth-child(5) {
						height: 28px;
						width: 60%;
						i {
							top: -1px;
							left: 0;
							font-size: 1.3rem;
							color: var(--purple);
						}
					}
					&:nth-child(6) {
						height: 20px;
						width: 50%;
						transform: scaleX(-1);
						i {
							top: -1px;
							left: 0;
							font-size: 1.2rem;
							color: var(--red);
						}
					}
					&:nth-child(7) {
						height: 35px;
						width: 60%;
						transform: translateX(-14px);
						i {
							top: 4px;
							left: 2px;
							// font-size: 1.2rem;
							color: var(--yellow);
						}
					}
					&:nth-child(8) {
						height: 27px;
						width: 70%;
						transform: scaleX(-1);
						i {
							top: 4px;
							left: 2px;
							// font-size: 1.2rem;
							color: var(--pink);
						}
					}
					&:nth-child(9) {
						height: 34px;
						width: 77%;
						i {
							top: 4px;
							left: 5px;
							color: var(--lightgreen);
						}
					}
					&:nth-child(10) {
						width: 68%;
						i {
							top: 7px;
							left: 5px;
							color: var(--darkblue);
						}
					}
					&:nth-child(11) {
						width: 90%;
						height: 80px;
						border-width: 10px;
						animation: unsquish 0.4s cubic-bezier(0,.6,.28,1.51) forwards;
						transform-origin: bottom;
						border-radius: 8px;
						@keyframes unsquish {
							to {
								transform: scaleY(1.3);
							}
						}
						&:after {
							width: 4px;
						}
						i {
							top: 12px;
							left: 5px;
							font-size: 2rem;
							color: var(--yellow);
						}
					}

					// &:nth-child(1)
				}
			}
		}
	}
</style>
