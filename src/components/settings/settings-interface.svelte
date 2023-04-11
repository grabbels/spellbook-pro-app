<script>
	import { optionsCall } from '../../stores';
	import BackButton from './backButton.svelte';
	let theme;
</script>

<div class="options_inner">
	<div class="title_wrap">
		<BackButton />
		<h2>
			<h3>settings</h3>
			Interface
		</h2>
		<form on:submit|preventDefault>
			<label for="theme">Theme</label>
			<select bind:value={theme} name="theme" id="theme">
				<option value="system">System theme</option>
				<option value="dark">Dark</option>
				<option value="light">Light</option>
				<option value="dark-mono">Dark (monochrome)</option>
				<option value="light-mono">Light (monochrome)</option>
			</select>
		</form>
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
