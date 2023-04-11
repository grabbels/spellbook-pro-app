<script>
	import { optionsCall } from '../../stores';
	import BackButton from './backButton.svelte';
</script>

<div class="title_wrap">
	<BackButton />
	<h2>
		<h3>settings</h3>
		Spellbook
	</h2>
	<div>
		<label for="layout-list" />
		<input type="radio" name="layout" id="layout-list" />
	</div>
</div>

<style lang="scss">
	.title_wrap {
		margin-bottom: 1rem;
		h2 {
			display: inline-block;
		}
	}
	form {
		margin-bottom: 1rem;
	}
	.buttons {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		div {
			margin-bottom: 0.5rem;
		}
	}
</style>
