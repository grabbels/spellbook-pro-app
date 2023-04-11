<script>
	import { optionsCall } from '../../stores';
</script>

<button on:click={() => ($optionsCall = '')}><i class="ri-arrow-left-s-line" /></button>

<style lang="scss">
	button {
		background-color: var(--translucent);
		vertical-align: -3px;
		// padding: .5rem;
		width: 40px;
		height: 40px;
		border-radius: var(--medium-radius);
		margin-right: 0.8rem;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		i {
			font-size: 1.5rem;
		}
	}
</style>
