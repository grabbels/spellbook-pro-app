<script>
	import SafeViewPadding from '../../components/safeViewPadding.svelte';
	import { notification, passwordResetToken } from '../../stores';
	import { goto } from '$app/navigation';
	import CenterContainer from '../../components/centerContainer.svelte';
	import PaddingContainer from '../../components/paddingContainer.svelte';
	import Button from '../../components/button.svelte';
	import PocketBase from 'pocketbase';
	const pb = new PocketBase('https://db.spellbook.pro');
	let password;
	let passwordConfirm;
	async function handleSubmit() {
		if (password && passwordConfirm) {
			if (password.length > 6) {
				if (password === passwordConfirm) {
					try {
						await pb
							.collection('users')
							.confirmPasswordReset($passwordResetToken, password, passwordConfirm);
						goto('/login');
                        $passwordResetToken = ''
                        $notification = 'Password successfully changed, you can now log in with your new password!#positive';
					} catch (error) {
                        $notification = error.data.message + '#error'
						console.log(error.data);
					}
				} else {
					$notification = 'Passwords do not match.#error';
				}
			} else {
				$notification = 'Your password has to be at least 7 characters long.#error';
			}
		} else {
			$notification = 'Please fill out both fields.#error';
		}
	}
</script>

<SafeViewPadding noheader>
	<CenterContainer>
		<PaddingContainer>
			<h2>Change password</h2>
			<form on:submit|preventDefault={() => handleSubmit()}>
				<label for="password">New password</label>
				<input id="password" type="password" bind:value={password} />
				<label for="password-confirm">Confirm password</label>
				<input id="password-confirm" type="password" bind:value={passwordConfirm} />
				<div style="text-align: right">
					<Button submit text="Change password" type="fill accent" />
				</div>
			</form>
		</PaddingContainer>
	</CenterContainer>
</SafeViewPadding>
