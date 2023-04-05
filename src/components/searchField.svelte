<script>
	import { addSpellsMenuOpen, scrollY } from '../stores';

	export let placeholder;
	export let value = '';
	export let right = false;
	export let showclose = false;
	export let field;
	export let noclose = false;
</script>

<form on:submit|preventDefault>
	<i class="ri-search-line" />
	<!-- svelte-ignore a11y-autofocus -->
	<input bind:this={field} type="text" bind:value {placeholder} class:right on:focus on:focusout />
	{#if showclose}
		<button
			class="cancel"
			on:click={() => {
				value = '';
				$addSpellsMenuOpen = false;
			}}><i class="ri-close-line" /></button
		>
	{:else if value && !noclose}
		<button
			class="cancel"
			on:click={() => {
				value = '';
				$addSpellsMenuOpen = false;
			}}><i class="ri-close-line" /></button
		>
	{/if}
</form>

<style lang="scss">
	form {
		display: flex;
		align-items: center;
		position: relative;
		height: 100%;
		input {
			padding-left: 2rem;
			margin-bottom: 0;
			height: 100%;
			font-family: 'Kanit';
			&::placeholder {
				font-family: 'Kanit';
			}
			&.right {
				border-radius: 0 18px 18px 0;
			}
		}
		i.ri-search-line {
			position: absolute;
			left: 0.7rem;
			opacity: 0.5;
			margin-top: 1px;
		}
		.cancel {
			position: absolute;
			right: 0.5rem;
			border-radius: 50vh;
			width: 20px;
			height: 20px;
			background-color: var(--moretranslucent);
			top: 50%;
			transform: translateY(-50%);
			display: flex;
			align-items: center;
			justify-content: center;
			i {
				color: var(--translucent);
				font-size: 1rem;
			}
		}
	}
</style>
