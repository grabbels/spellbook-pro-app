<script>
	import { modalCall, optionsCall } from '../../stores';
	import ListButton from '../listButton.svelte';
	import BackButton from './backButton.svelte';
</script>

<div class="title_wrap">
	<BackButton />
	<h2>
		<h3>settings</h3>
		Help
	</h2>
	<div>
		<h4>Tutorials</h4>
		<div>
			<ListButton
				text="Main screen/spellbook"
				icon="ri-file-list-3-line"
				on:click={() => ($modalCall = 'tutorial-spellbookscreen')}
			/>
			<ListButton
				text="Spells"
				icon="ri-magic-line"
				on:click={() => ($modalCall = 'tutorial-spells')}
			/>
		</div>
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
