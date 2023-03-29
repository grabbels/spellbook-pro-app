<script>
	export let type;
	export let text;
	export let submit = false;
	export let icon = '';
	export let right = false;
	export let left = false;
	export let invisible = false;
	export let disabled = false;
	let buttonWidth,buttonHeight;
	export let loading = false;
</script>

<button
	bind:clientWidth={buttonWidth}
	bind:clientHeight={buttonHeight}
	on:click
	type={submit ? 'submit' : ''}
	class={type}
	class:right
	class:invisible
	class:disabled
	class:left
	class:loading={loading}
	style={loading ? 'width:' + buttonWidth + 'px; height:' + buttonHeight + 'px' : ''}
>
	{#if loading === true}
		<div class="loading"><i class="ri-loader-5-line" /></div>
	{:else}
		{#if icon && !right}
			<i class={icon} />
		{/if}
		{text}
		{#if icon && right}
			<i class={icon} />
		{/if}
	{/if}
</button>

<style lang="scss">
	button {
		border-radius: 18px 0 0 18px;
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
			filter: brightness(.8);
		}
		&:active {
			transform: scale(0.95);
		}
		&:first-child {
			border-radius: 18px 0 0 18px;
		}
		&:last-child {
			border-radius: 0 18px 18px 0;
		}
		&:not(:only-child, :first-child, :last-child) {
			border-radius: 0;
		}
		&:only-child {
			border-radius: 18px;
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
			margin-top: -.1rem;
			i {
				font-size: 1.5rem;
			}
			@keyframes rotate {
				to {transform: rotate(360deg)}
			}
		}
		&.right {
			padding: 0.6rem 0.5rem 0.6rem 0.8rem;
			i {
				margin-right: 0;
				margin-left: 0.2rem;
			}
		}
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
			@media (hover: hover) {
				&:hover {
					filter: drop-shadow(0 0 5px rgba(var(--accentrgb), 0.8));
				}
			}
		}
		&.blue {
			background-color: var(--lightblue);
			color: var(--onforeground);
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
			&.red {
				border-color: var(--red);
			}
			&.translucent {
				color: var(--onbackground);
				border-color: var(--onbackground);
				opacity: .3;
			}
		}
		&.disabled {
			pointer-events: none;
		}
		&.left {
			border-radius: 18px 0 0 18px;
		}
	}
</style>
