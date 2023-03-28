<script>
	import { fade, fly } from 'svelte/transition';
	import { deleteSpellbook } from '../functions';
	import { confirm, lookupBook, modalCall } from '../stores';
	import { localUserLibrary } from '../stores-persist';
	import Button from './button.svelte';
	// let test = 'Are you sure you want to delete this spellbook?#Cancel:outline#Delete:fill.red'
	let buttons = $confirm.slice(1);
    let text = $confirm[0]
	console.log($confirm);
	
</script>

<div transition:fade={{ duration: 200 }} class="confirm_wrapper">
	<div in:fly={{ y: 10, duration: 200, delay: 100 }} out:fly={{ y: 10, duration: 200 }} class="confirm_modal">
		<p>{text}</p>
		<div class="buttons">
			{#each buttons as button}
				<div>
					<Button
						text={button.text}
						type={button.type}
						icon={button.icon}
						on:click={() => {
							if (button.action == 'cancel') {
								$confirm = '';
							} else if (button.action == 'delete-spellbook') {
								deleteSpellbook($lookupBook.id)
								$confirm = '';
								$lookupBook = '';
								$modalCall = '';
							}
						}}
					/>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.confirm_wrapper {
		z-index: 10000;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		position: absolute;
		background-color: rgba(0, 0, 0, 0.8);
		pointer-events: auto;
		.confirm_modal {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background-color: var(--lightbg);
			min-height: 150px;
			width: 100%;
			padding: 2rem;
			max-width: 300px;
			border-radius: 18px;
			.buttons {
				margin-top: 1.5rem;
				display: flex;
				justify-content: space-between;
				div {
					display: inline-block;
				}
			}
		}
	}
</style>
