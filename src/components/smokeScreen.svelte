<script>
	import { fade } from 'svelte/transition';
	import { modalCall } from '../stores';
	export let solid;
	let fadeDuration;
	if (solid) {
		fadeDuration = 100
	} else {
		fadeDuration = 200
	}
</script>

<button
	class:solid
	in:fade={{ duration: fadeDuration }}
	out:fade={{ duration: 200 }}
	on:click={() => ($modalCall = '')}
/>

<style lang="scss">
	button {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
        width: 100%;
        height: 100%;
		z-index: 100;
		background-color: rgba(0, 0, 0, 0.7);
		backdrop-filter: contrast(.8);
		pointer-events: none;
		&.solid {
			background-color: var(--panelbg);
		}
	}
</style>
