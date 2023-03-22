<script>
	import { headerHeight } from '../stores';

	export let side = '';
    console.log($headerHeight)
</script>

<div
	style={side === 'bottom'
		? 'padding-top: 0'
		: side === 'top'
		? 'padding-bottom: 0'
		: ''}
>
	<slot />
</div>

<style lang="scss">
	div {
		width: 100%;
		height: 100%;
		position: relative;
		padding-bottom: calc(var(--safe-area-inset-bottom));
        padding-top: max(calc(var(--safe-area-inset-top) + 3rem), 4rem);
		pointer-events: auto;
	}
</style>
