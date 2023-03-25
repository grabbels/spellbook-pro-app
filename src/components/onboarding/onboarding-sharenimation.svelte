<script>
	import OnboardingPhone from './onboarding-phone.svelte';
</script>

<div>
	<div class="books">
		<div class="book"><i class="ri-bookmark-fill" /></div>
		<div class="book"><i class="ri-bookmark-fill" /></div>
	</div>
	<div class="phone">
		<OnboardingPhone fill altone>
			<div class="inner" />
		</OnboardingPhone>
	</div>
	<div class="phone">
		<OnboardingPhone fill alttwo>
			<div class="inner" />
		</OnboardingPhone>
	</div>
</div>

<style lang="scss">
	div {
		width: 100%;
		// min-height: 400px;
		display: flex;
		justify-content: space-between;
		gap: 3rem;
		.phone {
			display: inline-block;
			height: 100%;
			aspect-ratio: 1 / 3;
			&:last-child {
				display: flex;
				align-items: flex-end;
			}
		}
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
		}
		.books {
			position: absolute;
			width: 100%;
			aspect-ratio: 1 / 1;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			display: flex;
			justify-content: space-between;
			align-items: center;
			z-index: 2;
			padding: 9%;
			animation: rotate 7s linear infinite;
			@keyframes rotate {
				to {
					transform: translateY(-50%) rotate(360deg);
				}
			}
			.book {
				width: 28%;
				aspect-ratio: 2.7 / 1;
				background-color: beige;
				border: 6px solid var(--brown);
				border-right: 0;
				border-radius: 5px;
				position: relative;
				animation: level 7s linear infinite;
				@keyframes level {
					to {
						transform: rotate(-360deg);
					}
				}
				i {
					font-size: 1.2rem;
					position: absolute;
					left: 5%;
					top: 20%;
				}
				&:nth-child(1) {
					i {
						color: var(--red);
					}
				}
				&:nth-child(2) {
					i {
						color: var(--lightblue);
					}
				}
			}
		}
	}
</style>
