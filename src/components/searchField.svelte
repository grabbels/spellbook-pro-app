<script>
	import { scrollY } from "../stores";


	export let placeholder;
	export let value = '';
	export let right;
</script>

<form on:submit|preventDefault>
	<i class="ri-search-line" />
	<input type="text" bind:value {placeholder} class:right on:focus on:focusout />
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
		i {
			position: absolute;
			left: 0.7rem;
			opacity: 0.5;
			margin-top: 1px;
		}
	}
</style>
