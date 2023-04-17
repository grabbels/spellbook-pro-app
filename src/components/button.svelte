<script>
	export let type;
	export let text;
	export let iconfill = false;
	export let submit = false;
	export let icon = '';
	export let right = false;
	export let left = false;
	export let liquid = false;
	export let invisible = false;
	export let disabled = false;
	let buttonWidth, buttonHeight;
	export let loading = false;
	import liquidGif from '$lib/liquid-greyscale.gif';
	import { fade } from 'svelte/transition';
	import { quickSearchPanelOpen } from '../stores';
</script>

<button
	bind:clientWidth={buttonWidth}
	bind:clientHeight={buttonHeight}
	on:click|stopPropagation
	type={submit ? 'submit' : ''}
	class={type}
	class:right
	class:invisible
	class:disabled
	class:left
	class:liquid
	class:notext={!text}
	class:loading
	class:nooverflow={$quickSearchPanelOpen}
	style={loading ? 'width:' + buttonWidth + 'px; height:' + buttonHeight + 'px' : ''}
>
	{#if loading === true}
		<div class="loading"><i class="ri-loader-5-line" /></div>
	{:else}
		{#if icon && !right}
			<i class={iconfill ? icon.replace('line', 'fill') : icon} />
		{/if}
		{text}
		{#if icon && right}
			<i class={iconfill ? icon.replace('line', 'fill') : icon} />
		{/if}
	{/if}
	{#if liquid}
		<div class="video">
			<img src={liquidGif} alt="">
		</div>
	{/if}
</button>

<style lang="scss">
	button {
		border-radius: var(--large-radius) 0 0 var(--large-radius);
		border: 2px solid transparent;
		min-height: 48px;
		box-sizing: border-box;
		padding: 0.6rem 0.8rem;
		transition: 0.2s;
		min-width: 80px;
		text-align: center;
		white-space: nowrap;
		position: relative;
		// &:after {
		// 	content: '';
		// 	position: absolute;
		// 	left: -2px;
		// 	top: -2px;
		// 	right: -2px;
		// 	bottom: -2px;
		// 	opacity: 0;
		// 	transition: .2s;
		// 	// z-index: -1;
		// 	background-color: rgba(0,0,0,.3);
		// }
		&.loading {
			pointer-events: none;
			filter: brightness(0.8);
		}
		&:active {
			transform: scale(0.95);
		}
		&:first-child {
			border-radius: var(--large-radius) 0 0 var(--large-radius);
			.video {
				border-radius: var(--large-radius) 0 0 var(--large-radius);
			}
		}
		&:last-child {
			border-radius: 0 var(--large-radius) var(--large-radius) 0;
			.video {
				border-radius: 0 var(--large-radius) var(--large-radius) 0;
			}
		}
		&:not(:only-child, :first-child, :last-child) {
			border-radius: 0;
			.video {
				border-radius: 0;
			}
		}
		&:only-child {
			border-radius: var(--large-radius);
			.video {
				border-radius: var(--large-radius);
				&:after,
				&:before,
				video {
					border-radius: var(--large-radius);
				}
			}
		}
		i {
			vertical-align: -4px;
			font-size: 1.1rem;
			margin-right: 0.2rem;
		}
		.loading {
			animation-name: rotate;
			animation-duration: 1s;
			animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
			animation-iteration-count: infinite;
			margin-top: -0.1rem;
			i {
				font-size: 1.5rem;
				height: 18px;
			}
			@keyframes rotate {
				to {
					transform: rotate(360deg);
				}
			}
		}
		// &.right {
		// 	padding: 0.6rem 0.5rem 0.6rem 0.8rem;
		// 	i {
		// 		margin-right: 0;
		// 		margin-left: 0.2rem;
		// 	}
		// }
		&.fill {
			background-color: var(--inputbg);
			color: var(--onbackground);
			@media (hover: hover) {
				&:hover {
					background-color: var(--primary);
				}
			}
		}
		&.accent {
			background-color: var(--accent);
			color: var(--onforeground);
			.video  {
				background-color: var(--accent);
			}
			@media (hover: hover) {
				&:hover {
					filter: drop-shadow(0 0 5px rgba(var(--accentrgb), 0.8));
				}
			}
		}
		&.blue {
			background-color: var(--lightblue);
			color: var(--onforeground);
			.video  {
				background-color: var(--lightblue);
			}
			@media (hover: hover) {
				&:hover {
					filter: drop-shadow(0 0 5px rgba(var(--accentrgb), 0.8));
				}
			}
		}
		&.red {
			background-color: var(--red);
			color: var(--onforeground);
			@media (hover: hover) {
				&:hover {
					filter: drop-shadow(0 0 5px rgba(var(--accentrgb), 0.8));
				}
			}
		}
		&.yellow {
			background-color: var(--yellow);
			color: var(--onforeground);
		}
		&.darkblue {
			background-color: var(--darkblue);
			color: var(--onbackground);
		}
		&.darkgreen {
			background-color: var(--darkgreen);
			color: var(--onbackground);
		}
		&.card {
			background-color: var(--cardbg);
			color: var(--onbackground);
		}
		&.subtle {
			background-color: var(--inputbg);
			color: var(--onbackground);
		}
		&.purple {
			background-color: var(--purple);
			color: var(--onbackground);
		}
		&.nude {
			background-color: transparent;
			padding: 0.8rem;
			min-height: 0;
			color: var(--transparent);
		}
		&.translucent {
			background-color: var(--moretranslucent);
			color: var(--onbackgroundtranslucent);
		}
		&.outline {
			background-color: transparent;
			border-color: var(--inputbg);
			color: var(--onbackground);
			&.accent {
				border-color: var(--accent);
				// color: var(--accent)
			}
			&.blue {
				border-color: var(--lightblue);
				// color: var(--lightblue)
			}
			&.darkgreen {
				border-color: var(--darkgreen);
				// color: var(--onbackground);
			}
			&.red {
				border-color: var(--red);
			}
			&.yellow {
				border-color: var(--yellow);
			}
			&.translucent {
				color: var(--onbackground);
				border-color: var(--onbackground);
				opacity: 0.3;
			}
			&.darkblue {
				background-color: var(--bodybg);
				color: var(--onbackground);
				border-color: var(--darkblue);
			}
		}
		&.disabled {
			pointer-events: none;
			color: var(--lesstranslucent);
		}
		&.left {
			border-radius: var(--large-radius) 0 0 var(--large-radius);
			width: 100%;
		}
		&.right {
			border-radius: 0 var(--large-radius) var(--large-radius) 0;
			width: 100%;
		}
		&.notext {
			min-width: 0 !important;
			display: inline-flex;
			justify-content: center;
			align-items: center;
			padding: 0;
			i {
				margin: 0;
			}
		}
		&.nooverflow {
			overflow: hidden;
		}
		&.liquid {
			background-color: transparent;

			z-index: 3;
			.video {
				z-index: -1;
				position: absolute;
				left: -4px;
				top: -4px;
				bottom: -2px;
				right: -2px;
				width: calc(100% + 6px);
				height: calc(100% + 6px);
				overflow: hidden;
				
				img {
					position: absolute;
					top: 0;
					left: 0;
					height: 100%;
					width: 100%;
					object-fit: cover;
					z-index: 1;
					mix-blend-mode: soft-light;
							filter: contrast(1.3);

					// transform: rotate(45deg);
					// filter: contrast(1.2) brightness(.8);
					// mix-blend-mode: luminosity;
					// filter: brightness(.7);
					// opacity: .6;
				}
			}
		}
		&.label {
			pointer-events: none;
			background-color: var(--moretranslucent);
			color: var(--lesstranslucent);
			padding-right: .6rem;
			padding-left: .9rem;
			min-width: 0;
			height: 100%;
		}
	}
</style>
