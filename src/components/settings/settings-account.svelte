<script>
	import Button from '../../components/button.svelte';
	import PocketBase from 'pocketbase';
	import { user } from '../../stores-persist';
	import { confirm, notification, optionsCall } from '../../stores';
	import BackButton from './backButton.svelte';
	const pb = new PocketBase('https://db.spellbook.pro');
	let nickname, email, close, nicknameField, emailField, emailPassword;
	let changeNickname = false;
	let changeEmail = false;
	let loadingNickname = false;
	let loadingEmail = false;
	$: if (changeNickname) {
		setTimeout(() => {
			nicknameField.focus();
		}, 1);
	} else {
		nickname = $user.username;
	}
	$: if (changeEmail) {
		setTimeout(() => {
			emailField.focus();
		}, 1);
	} else {
		email = $user.email;
	}

	$: if (close === true) {
		$optionsCall = '';
		close = false;
	}
	if ($user) {
		nickname = $user.username;
		email = $user.email;
	}

	async function handleNicknameChange() {
		loadingNickname = true;
		const data = {
			username: nickname
		};
		try {
			const record = await pb.collection('users').update($user.id, data);
			if (record) {
				loadingNickname = false;
				changeNickname = false;
				$notification = 'Nickname succesfully changed!#positive';
				$user.username = record.username;
				nickname = record.username;

				const resultList = await pb
					.collection('usernames')
					.getFirstListItem(`user_id="${$user.id}"`);

				let id = resultList.items[0].id;
				console.log(id);
				const data = {
					username: nickname
				};
				const nicknameUpdate = await pb.collection('usernames').update(id, data);
			}
		} catch (error) {
			loadingNickname = false;
			console.log(error.data);
			if (error.data.data.username.message) {
				$notification = error.data.data.username.message + '#error';
			}
			$notification = 'Uh oh, Something went wrong.#error';
		}
	}
	async function handleEmailChange() {
		loadingEmail = true;
		if (email) {
			try {
				await pb.collection('users').requestEmailChange(email);
				loadingEmail = false;
				changeEmail = false;
				$notification =
					'An email has been sent to your new email address with a link to confirm the change.#info';
				email = $user.email;
			} catch (error) {
				loadingEmail = false;
				console.log(error.data);
				// if (error.data.data.username.message) {
				// 	$notification = error.data.data.email.message + '#error';
				// }
				$notification = 'Uh oh, Something went wrong.#error';
			}
		} else {
			$notification = 'Please fill in a valid email address#alert;';
		}
	}
</script>

<div class="title_wrap">
	<BackButton />
	<h2>
		<h3>settings</h3>
		Account
	</h2>
</div>
<form on:submit|preventDefault>
	<label for="nickname">Nickname</label>
	<input
		id="nickname"
		type="text"
		bind:value={nickname}
		disabled={changeNickname === false}
		bind:this={nicknameField}
	/>
	<div>
		{#if changeNickname === false}
			<Button
				icon="ri-edit-2-line"
				text="Change nickname"
				type="fill"
				on:click={() => (changeNickname = true)}
			/>
		{:else}
			<Button
				icon="ri-save-line"
				text="Save"
				type="fill"
				loading={loadingNickname}
				on:click={() => handleNicknameChange()}
			/>
			<Button
				icon="ri-close-line"
				text="Cancel"
				type="outline"
				on:click={() => (changeNickname = false)}
			/>
		{/if}
	</div>
</form>
<form on:submit|preventDefault>
	<label for="email">Email</label>
	<input
		id="email"
		type="email"
		bind:value={email}
		disabled={changeEmail === false}
		bind:this={emailField}
	/>
	{#if changeEmail}
		<input
			id="emailpassword"
			type="password"
			placeholder="Confirm with password"
			bind:value={emailPassword}
		/>
	{/if}
	<div>
		{#if changeEmail === false}
			<Button
				icon="ri-edit-2-line"
				text="Change Email"
				type="fill"
				on:click={() => (changeEmail = true)}
			/>
		{:else}
			<Button
				icon="ri-save-line"
				text="Save"
				type="fill"
				loading={loadingEmail}
				on:click={() => handleEmailChange()}
			/>
			<Button
				icon="ri-close-line"
				text="Cancel"
				type="outline"
				on:click={() => (changeEmail = false)}
			/>
		{/if}
	</div>
</form>
<form on:submit|preventDefault>
	<label for="password">Password</label>
	<!-- <input id="email" type="email" bind:value={email} disabled> -->
	<div>
		<Button
			icon="ri-lock-password-line"
			text="Request password change"
			type="fill"
			on:click={async () => {
				await pb.collection('users').requestPasswordReset($user.email);
				$notification =
					'A link to change your password has been sent to your registered email-address.#info';
			}}
		/>
	</div>
</form>
<div class="buttons">
	<div>
		<Button
			text="Log out"
			icon="ri-logout-circle-line"
			type="outline"
			on:click={() =>
				($confirm = [
					'Are you sure you want to log out?',
					{ text: 'Cancel', type: 'outline', action: 'cancel' },
					{
						text: 'Log out',
						icon: 'ri-logout-circle-line',
						type: 'fill blue',
						action: 'logout'
					}
				])}
		/>
	</div>
	<div>
		<Button
			text="Reset library"
			icon="ri-restart-line"
			type="outline"
			on:click={() =>
				($confirm = [
					'Are you sure you want to delete all your spellbooks?',
					{ text: 'DELETE', type: 'type', action: 'confirm' },
					{ text: 'Cancel', type: 'outline', action: 'cancel' },
					{
						text: 'Delete',
						icon: 'ri-delete-bin-line',
						type: 'fill red',
						action: 'reset-library'
					}
				])}
		/>
	</div>
	<div>
		<Button
			text="Delete account"
			icon="ri-delete-bin-line"
			type="outline"
			on:click={() =>
				($confirm = [
					'Are you sure you want to delete your account?',
					{ text: 'DELETE', type: 'type', action: 'confirm' },
					{ text: 'Cancel', type: 'outline', action: 'cancel' },
					{
						text: 'Delete',
						icon: 'ri-delete-bin-line',
						type: 'fill red',
						action: 'reset-library'
					}
				])}
		/>
	</div>
</div>

<style lang="scss">
	ul {
		padding: 1rem;
		width: 100%;
	}
	img {
		width: 60px;
	}
	.options_inner {
		padding: 2rem;
		.title_wrap {
			margin-bottom: 1rem;
			h2 {
				display: inline-block;
			}
		}
		form {
			margin-bottom: 1rem;
		}
		.status {
			margin-top: 2rem;
			text-align: center;
			h4 {
				margin-bottom: 1rem;
			}
			p {
				margin-top: 0.3rem;
			}
			.icon {
				display: inline-block;
				height: 50px;
				width: 50px;
				background-color: var(--onbackground);
				border-radius: 50vh;
				display: inline-flex;
				justify-content: center;
				align-items: center;
				i {
					font-size: 2.3rem;
					&.ri-cloud-line {
						color: var(--lightblue);
					}
				}
			}
		}
		.buttons {
			margin-top: 1rem;
			display: flex;
			flex-direction: column;
			div {
				margin-bottom: 0.5rem;
			}
		}
	}
</style>
