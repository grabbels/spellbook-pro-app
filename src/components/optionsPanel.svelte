<script>
	import { fly } from 'svelte/transition';
	import { screenWidth, visualViewport } from '../stores';
	let horizontalSwipe, touchMove, touchStart;
	export let close = false;
	function handleTouchStart(e) {
		touchMove = true;
		touchStart = e.touches[0].clientX;
	}
	function handleTouchMove(e) {
		if (e.touches[0].clientX > touchStart) {
			horizontalSwipe = Math.max(
				0,
				Math.min((e.touches[0].clientX - touchStart) / $screenWidth, 1)
			);
		}
	}
	function handleTouchEnd(e) {
		if (horizontalSwipe > 0.25) {
			close = true;
		} else {
			touchStart = 0;
			horizontalSwipe = 0;
		}
	}
</script>

<div
	in:fly={{ duration: 250, x: 50 }}
	out:fly={{ duration: 250, x: 50 }}
	class="settings_pane"
	on:touchmove={(e) => handleTouchMove(e)}
	on:touchstart={(e) => handleTouchStart(e)}
	on:touchend={(e) => handleTouchEnd(e)}
>
	<slot />
</div>

<style lang="scss">
	.settings_pane {
		position: fixed;
		height: 100%;
		width: 100vw;
		z-index: 100;
		left: 0;
		top: 0;
		transition: 0.3s;
		right: 0;
		background-color: var(--bodybg);
		overflow-y: auto;
	}
</style>
