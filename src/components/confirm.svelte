<script>
	import { fade, fly } from 'svelte/transition';
	import { deleteSpellbook, resetUserData } from '../functions';
	import { confirm, lookupBookId, modalCall, notification } from '../stores';
	import { localLastSyncTime, localPendingChanges, localUserLibrary, openBooksIdsArray, user } from '../stores-persist';
	import Button from './button.svelte';
	import PocketBase from 'pocketbase';
	const pb = new PocketBase('https://db.spellbook.pro');
	import { goto } from '$app/navigation';
	let confirmText;
	let type;
	// let test = 'Are you sure you want to delete this spellbook?#Cancel:outline#Delete:fill.red'
	let buttons = $confirm.slice(1);
	if (buttons[0].type === 'type') {
		type = buttons[0];
		buttons = buttons.slice(1);
	}
	let text = $confirm[0];
	console.log($confirm);

	async function publishSpellbook(spellbook) {

	}
	async function unpublishSpellbook(spellbook) {

	}

	// let test = [
	// 	'Are you sure you want to delete all your spellbooks?',
	// 	{ text: 'DELETE', type: 'type', action: 'confirm' },
	// 	{ text: 'Cancel', type: 'outline', action: 'cancel' },
	// 	{ text: 'Delete', icon: 'ri-delete-bin-line', type: 'fill red', action: 'reset-library' }
	// ];
</script>

<div transition:fade={{ duration: 200 }} class="confirm_wrapper">
	<div
		in:fly={{ y: 10, duration: 200, delay: 100 }}
		out:fly={{ y: 10, duration: 200 }}
		class="confirm_modal"
	>
		<p>{text}</p>
		{#if type}
			<label for="confirm-text" style="margin-bottom: .5rem"
				>To confirm this action, type {type.text} below:</label
			>
			<input id="confirm-text" type="text" bind:value={confirmText} />
		{/if}
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
								// deleteSpellbook($lookupBookId);
								$openBooksIdsArray = $openBooksIdsArray.filter((o) => o !== $lookupBookId);
								$modalCall = '';
								delete $localUserLibrary[$lookupBookId];
								$localUserLibrary = $localUserLibrary
								$lookupBookId = '';
								$confirm = '';
								
							} else if (button.action == 'reset-library') {
								if (confirmText === type.text) {
									$localUserLibrary = [];
									$confirm = '';
								} else {
									$notification =
										"Type 'DELETE' in the textbox to confirm resetting your library.#info";
								}
							} else if (button.action == 'delete-account') {
								if (confirmText === type.text) {
									//DELETE ACCOUNT
									async () => {
										await pb.collection('users').delete($user.id);
										resetUserData();
										$confirm = '';
										goto('/onboarding');
									};
								} else {
									$notification =
										"Type 'DELETE' in the textbox to confirm deleting your account.#info";
								}
							} else if (button.action == 'logout') {
								pb.authStore.clear();
								resetUserData();
								$confirm = '';
								goto('/onboarding');
							} else if (button.action == 'publish-book') {
								$localUserLibrary[$lookupBookId].published = true
								publishSpellbook($localUserLibrary[$lookupBookId])
								$confirm = '';
							} else if (button.action == 'unpublish-book') {
								$localUserLibrary[$lookupBookId].published = false
								unpublishSpellbook($localUserLibrary[$lookupBookId])
								$confirm = '';
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
		z-index: 999;
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
			border-radius: var(--large-radius);
			box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
			.buttons {
				margin-top: 1.5rem;
				display: flex;
				justify-content: space-between;
				div {
					display: inline-block;
				}
			}
			input {
				margin-bottom: 0;
			}
		}
	}
</style>
