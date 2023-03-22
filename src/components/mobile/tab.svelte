<script>
	import { crossfade, fade } from 'svelte/transition';
	import { page } from '../../stores';
	export let name;
	export let icon = 'ri-checkbox-blank-circle-line';
</script>

<button on:touchstart on:click class="tab" class:active={$page === name.toLowerCase()}>
	<div class="button_inner">
		<div class="icon">
			{#if $page === name.toLowerCase()}
				<i transition:fade={{ duration: 100 }} class={icon.replace('line', 'fill')} />
			{:else}
				<i transition:fade={{ duration: 100 }} class={icon} />
			{/if}
		</div>
		<!-- <i class={$page === name.toLowerCase() ? icon.replace('line', 'fill') : icon} /> -->
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
				font-size: 0.8rem;
				transition: 0.15s;
				font-weight: 400;
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
	}
</style>
