<script>
	import { addSpellsMenuOpen, modalCall, noScroll } from '../stores';
	import { goto } from '$app/navigation';
	function toggleNoScroll() {
		$noScroll ? ($noScroll = false) : ($noScroll = true);
	}
</script>

<div>
	<button on:click={() => goto('/')}>home</button>
	<button on:click={() => goto('/login')}>login</button>
	<button on:click={() => goto('/onboarding')}>onboarding</button>
</div>

<style>
	div {
		position: fixed;
		opacity: .25;
		z-index: 999;
		top: var(--safe-area-inset-top);
		left: 0;
	}
	button {
		background: white;
		color: black;
	}
</style>
