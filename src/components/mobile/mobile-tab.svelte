<script>
	import { crossfade, fade } from 'svelte/transition';
	import { view } from '../../stores';
	export let name;
	export let icon = 'ri-checkbox-blank-circle-line';
	let activeTab;
	$: $view === 'spellbook' ? activeTab = 'one' : $view === 'library' ? activeTab = 'two' : $view === 'browse' ? activeTab = 'three' : $view === 'settings' ? activeTab = 'four' : '';
</script>

<button on:touchstart on:click class="tab {activeTab}" class:active={$view === name.toLowerCase()}>
	<div class="button_inner">
		<div class="icon">
			{#if $view === name.toLowerCase()}
				<i transition:fade={{ duration: 100 }} class={icon.replace('line', 'fill')} />
			{:else}
				<i transition:fade={{ duration: 100 }} class={icon} />
			{/if}
		</div>
		<!-- <i class={$view === name.toLowerCase() ? icon.replace('line', 'fill') : icon} /> -->
		<p>{name}</p>
	</div>
</button>

<style lang="scss">
	button.tab {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 0.2rem;
		background-color: var(--lightbg);
		padding: 0.3rem 0;
		position: relative;
		transition: .1s;
		&:after {
			top: 0.3rem;
			left: 0.3rem;
			right: 0.3rem;
			bottom: 0.3rem;
			position: absolute;
			content: '';
			background-color: transparent;
			transition: 0.2s;
			border-radius: var(--large-radius);
		}
		.button_inner {
			display: flex;
			flex-direction: column;
			align-items: center;
			opacity: 0.7;
			transition: 0.15s;
			.icon {
				height: 27px;
				width: 27px;
				position: relative;
				i {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					font-size: 1.5rem;
					transition: 0.15s;
				}
			}

			p {
				margin: 0;
				font-size: 0.7rem;
				transition: 0.15s;
				font-weight: 400;
			}
		}

		&:active {
			
			// &:after {
			// 	background-color: var(--moretranslucent);
			// }
			.button_inner {
				transform: scale(1.05);
			}
		}
		&.active {
			.button_inner {
				opacity: 1;
				i,
				p {
					color: var(--accent);
				}
			}
		}
		&:first-of-type {
			border-radius: var(--large-radius) 0 0 var(--large-radius);
		}
		&:last-of-type {
			border-radius: 0 var(--large-radius) var(--large-radius) 0;
			&:after {
				content: '';
				position: absolute;
				left: 0.3rem;
				top: 0.3rem;
				bottom: 0.3rem;
				right: 0.3rem;
				background-color: var(--moretranslucent);
				border-radius: var(--large-radius);
				pointer-events: none;
				opacity: .7;
			}
			&.one {
				&:after {
					transform: translateX(calc(-300% - 1.8rem));
				}
			}
			&.two {
				&:after {
					transform: translateX(calc(-200% - 1.2rem));
				}
			}
			&.three {
				&:after {
					transform: translateX(calc(-100% - 0.6rem));
				}
			}
			&.four {
				&:after {
					transform: 0;
				}
			}
		}
	}
</style>
