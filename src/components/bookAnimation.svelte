<script>
	import overlay from '$lib/book.jpg';
	import overlayflip from '$lib/bookflip.jpg';
	import one from '$lib/title/1.svg';
	import two from '$lib/title/2.svg';
	import three from '$lib/title/3.svg';
	import four from '$lib/title/4.svg';
	import five from '$lib/title/5.svg';
	import six from '$lib/title/6.svg';
	import seven from '$lib/title/7.svg';
	import eight from '$lib/title/8.svg';
	import nine from '$lib/title/9.svg';
	import ten from '$lib/title/10.svg';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	let book;
	export let type = '';
	onMount(() => {});
	function restartAnimation() {
		book.classList.remove('animate');
		setTimeout(() => {
			book.classList.add('animate');
		}, 1);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="book_wrapper {type}">
	{#if type === 'splash'}
		<div class="title">
			<img src={ten} alt="" />
			<img src={nine} alt="" />
			<img src={eight} alt="" />
			<img src={seven} alt="" />
			<img src={six} alt="" />
			<img src={five} alt="" />
			<img src={four} alt="" />
			<img src={three} alt="" />
			<img src={two} alt="" />
			<img src={one} alt="" />
		</div>
	{/if}
	<div class="book_inner">
		<div class="book animate" bind:this={book}>
			<!-- <div class="spine" /> -->
			<div class="pages">
				<div
					class="page cover"
					style="--i: 18px; --negi: 0px; background-image: url('{overlay}')"
				/>
				<div class="page" style="--i: 14px; --negi: -2px">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
						dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
						Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
						mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipis
					</p>
				</div>
				<div class="page" style="--i: 12px; --negi: -4px">
					<p>
						Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
						nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
						officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
						adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
						enim ad minim veniam, quis nostrud exercitation ulla exercitation.
					</p>
				</div>
				<div class="page" style="--i: 10px; --negi: -6px">
					<p>
						Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
						veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
						eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetu
					</p>
				</div>
				<div class="page" style="--i: 8px; --negi: -8px">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
						dolor in reprehenderit in voluptate velit esse cillum dol
					</p>
				</div>
				<div class="page" style="--i: 6px; --negi: -10px">
					<p>
						Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
						nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
						officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
						adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
						enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
						commodo consequat. Duis aute irure dolor in reprehenderit in volupta
					</p>
				</div>
				<div class="page" style="--i: 4px; --negi: -12px">
					<p>
						Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
						veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
						eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consect
					</p>
				</div>
				<div class="page" style="--i: 2px; --negi: -14px">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
						dolor in reprehenderit in voluptate velit esse cillum dolo
					</p>
				</div>
				{#if type === 'repeat'}
					<div
						class="page cover"
						style="--i: 0px; --negi: -18px; background-image: url('{overlayflip}')"
						on:animationend={restartAnimation}
					/>
				{:else}
					<div
						class="page cover"
						style="--i: 0px; --negi: -18px; background-image: url('{overlayflip}')"
					/>
				{/if}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@mixin delay($rule, $number, $value) {
		@for $i from 1 to ($number + 1) {
			&:nth-child(#{$i}) {
				-webkit-#{$rule}-delay: (#{$i * $value});
				#{$rule}-delay: (#{$i * $value});
			}
		}
	}
	@mixin stack($rule, $number, $value) {
		@for $i from 1 to ($number + 1) {
			&:nth-child(#{$i}) {
				#{$rule}: translateZ((#{$i * $value}));
			}
		}
	}
	.book_wrapper {
		width: 200px;
		height: 200px;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		transform: scale(1.7);
		&.splash {
			transform: scale(.6);
			// height: 100vh;
			filter: contrast(1.2) hue-rotate(10deg) brightness(1.1);
			width: 100vw;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			background-color: var(--bg);
			z-index: 9999999;
			margin-left: 10vw;
			.book_inner {
				// transform: scale(1) translate(-23%, -4%);
				transform: scale(1) translate(72%, -4%);
				animation-name: splash;
				animation-duration: 1.4s;
				animation-fill-mode: forwards;
				animation-iteration-count: 1;
				animation-timing-function: cubic-bezier(.4,0,.6,1);
				@keyframes splash {
					to {transform: scale(1) translate(-128%, -4%)}
				}
				.book {
					animation-name: none;
				}
			}
		}
		// background: radial-gradient(circle, rgba(22, 9, 57, 1) 10%, rgba(33, 14, 79, 0) 60%);
	}
	.title {
		width: 350px;
		height: 60px;
		position: absolute;
		z-index: 2;
		img {
			width: 100%;
			height: auto;
			position: absolute;
			left: 0;
			top: 0;
			filter: blur(5px);
			opacity: 0;
			animation-name: reveal;
			animation-fill-mode: forwards;
			animation-duration: 1s;
			animation-iteration-count: 1;
			@include delay(animation, 10, 0.1s);
			@keyframes reveal {
				to {
					filter: blur(0px);
					opacity: 1;
				}
			}
		}
	}
	.book_inner {
		transform: translate(-16%, -3%) scale(0.7);
	}
	.book {
		position: relative;
		width: 144px;
		height: 100px;
		// display: flex;
		// flex-direction: column-reverse;
		transform-style: preserve-3d;
		transform: perspective(500px) translateX(0);
		animation-timing-function: ease-in-out;
		animation-duration: 1.6s;
		// animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1);
		animation-iteration-count: 1;
		animation-delay: 0.4s;
		animation-fill-mode: forwards;
		transition-property: transform;
		@keyframes shift {
			0% {
				transform: perspective(500px) translateX(0px);
			}
			100% {
				transform: perspective(500px) translateX(50%);
			}
		}
		// transform: rotate3d(2, 6, 10, -25deg);
		// transform: scaleX(1) scaleY(1) scaleZ(1) rotateX(72deg) rotateY(0deg) rotateZ(-15deg)
		// 	translateX(0px) translateY(0px) translateZ(0px) skewX(0deg) skewY(0deg);
		// animation-duration: 1.8s;
		// animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
		// animation-iteration-count: 1;
		// animation-fill-mode: forwards;
		// will-change: transform;
		// transition-property: transform;
		// @keyframes turning {
		// 	0% {
		// 		transform: scaleX(1) scaleY(1) scaleZ(1) rotateX(72deg) rotateY(0deg) rotateZ(-15deg)
		// 			translateX(0px) translateY(0px) translateZ(0px) skewX(0deg) skewY(0deg);
		// 	}
		// 	100% {
		// 		transform: scaleX(1) scaleY(1) scaleZ(1) rotateX(72deg) rotateY(-180deg) rotateZ(-15deg)
		// 			translateX(0px) translateY(0px) translateZ(0px) skewX(0deg) skewY(0deg);
		// 	}
		// }

		// .spine {
		// 	background: #763624;
		// 	border: 3px solid #582d21;
		// 	height: 100px;
		// 	width: 15px;
		// 	position: absolute;
		// 	top: 0;
		// 	left: 0;
		// 	transform: translate(64px, -8px) rotateY(90deg);
		// }
		// animation-name: shift;
		&.animate {
			animation-name: shift;
			.pages {
				.page {
					animation-name: flipping;
					&.cover {
						animation-name: coverflipping;
						&:first-child {
							transform: translateZ(18px) translateX(-5px);
							animation-name: firstcoverflipping;
						}
						&:last-child {
							transform: translateZ(-18px);
						}
					}
				}
			}
		}
		.pages {
			position: absolute;
			top: 0;
			left: 0;
			transform-style: preserve-3d;
			.page {
				position: absolute;
				left: 72px;
				top: 2px;
				height: 100px;
				width: 72px;
				// background-color: #d5cebe;
				// transform: rotate3d(1, 1, 1, 0deg);
				transform: translateZ(var(--i));
				background: rgb(213, 206, 190);
				background: linear-gradient(
					270deg,
					rgba(213, 206, 190, 1) 0%,
					rgba(213, 206, 190, 1) 71%,
					rgba(131, 127, 118, 1) 100%
				);
				border-left: 1px solid #582d21;
				transform-origin: center left;
				outline: 1px solid transparent;
				transform-style: preserve-3d;
				animation-duration: 1.2s;
				animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1);
				animation-iteration-count: 1;
				animation-fill-mode: forwards;
				will-change: transform;
				transition-property: transform;
				border-radius: 0 4px 4px 0;
				@include delay(animation, 20, 0.1s);
				@include stack(transform, 20, 2px);

				p {
					display: none;
					font-family: "Nakaryon's Gifts";
					overflow: hidden;
					font-size: 0.9rem;
					color: #666;
					margin-top: 0.55rem;
					overflow-x: hidden;
					height: 83%;
					word-break: break-all;
					opacity: 0.5;
				}
				&.cover {
					background-color: #763624;
					// border: 5px solid #582d21;
					background-size: 100% 100%;
					border-radius: 4px;
					width: 76px;
					height: 104px;
					left: 74px;
					top: 0;
					&:first-child {
						transform: translateZ(18px) translateX(-4px);
					}
					&:last-child {
						transform: translateZ(0px) translateX(0px);
					}
				}
				@keyframes flipping {
					0% {
						filter: drop-shadow(0 0 20px rgba(0, 170, 204, 0));
						transform: rotateY(0deg) translateZ(var(--i));
					}
					25% {
						filter: drop-shadow(0 0 20px rgba(0, 170, 204, 0));
					}
					50% {
						filter: drop-shadow(0 0 20px rgba(0, 170, 204, 1));
					}
					80% {
						filter: drop-shadow(0 0 20px rgba(0, 170, 204, 0));
					}
					100% {
						transform: rotateY(-180deg) translateZ(var(--negi));
						filter: drop-shadow(0 0 20px rgba(0, 170, 204, 0));
					}
				}
				@keyframes coverflipping {
					0% {
						transform: rotateY(0deg) translateZ(var(--i));
					}
					100% {
						transform: rotateY(-180deg) translateZ(var(--negi));
					}
				}
				@keyframes firstcoverflipping {
					0% {
						transform: rotateY(0deg) translateX(-4px) translateZ(var(--i));
					}
					100% {
						transform: rotateY(-180deg) translateX(0px) translateZ(var(--negi));
					}
				}
				// @keyframes firstflipping {
				// 	0% {
				// 		transform: rotateY(0deg) translateZ(var(--i));
				// 	}
				// 	75% {
				// 		transform: rotateY(-180deg) translateZ(var(--negi));
				// 	}
				// 	100% {
				// 		transform: rotateY(-180deg) translateZ(var(--negi));
				// 	}
				// }
				// @keyframes lastflipping {
				// 	0% {
				// 		transform: rotateY(0deg) translateX(0) translateZ(var(--i));
				// 	}
				// 	50% {
				// 		transform: rotateY(-180deg) translateX(-3px) translateZ(var(--negi));
				// 		border-radius: 4px 0 0 4px;
				// 	}
				// 	100% {
				// 		transform: rotateY(-180deg) scaleX(-1) translateX(-3px) translateZ(var(--negi));
				// 	}
				// }
			}
		}
	}

	// @keyframes flipping {
	// 	0% {
	// 		transform: rotateY(0deg) translateZ(var(--i) px);
	// 	}
	// 	100% {
	// 		transform: rotateY(-180deg);
	// 	}
	// }
</style>
