<script>
	import { emailConfirmToken, modalCall, notification } from '../../stores';
	import Button from '../button.svelte';
	import PocketBase from 'pocketbase';
	import { goto } from '$app/navigation';
	import SafeViewPadding from '../safeViewPadding.svelte';
	import { user } from '../../stores-persist';
	const pb = new PocketBase('https://db.spellbook.pro');

	async function refreshAuth() {
		console.log('refreshAuth');
		try {
			const authData = await pb.collection('users').authRefresh();
			if (authData.record) {
				$user = authData.record;
				syncLibrary(authData.record);
			}
		} catch (error) {
			console.log(error);
			$user = null;
		}
	}
	let password;
	async function handleConfirm() {
		if (password) {
			try {
				await pb.collection('users').confirmEmailChange($emailConfirmToken, password);
				
				$notification = 'You can now log in with your new email address.#positive';
				$emailConfirmToken = '';
				$modalCall = '';
				pb.authStore.clear();
				resetUserData();
                goto('/login');
			} catch (error) {
				console.log(error.data);
				$notification = 'Oops, an unknown error occurred!#error';
				goto('/');
				$modalCall = '';
			}
		} else {
			$notification = 'Please enter your password.#error';
		}
	}
</script>

<SafeViewPadding>
	<div>
		<p>Please confirm your email address change with your password:</p>
		<input type="password" placeholder="Password" bind:value={password} />
		<div>
			<Button
				text="Confirm"
				icon="ri-check-line"
				type="fill accent"
				on:click={() => handleConfirm()}
			/>
		</div>
	</div>
</SafeViewPadding>
