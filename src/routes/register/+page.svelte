<script>
	import SafeViewPadding from '../../components/safeViewPadding.svelte';
	import Button from '../../components/button.svelte';
	import { modalCall, notification } from '../../stores';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	let nickname, email, password, passwordConfirm, terms;
	let loadingRegister = false;
	$: console.log(terms);
	import PocketBase from 'pocketbase';
	const pb = new PocketBase('https://db.spellbook.pro');

	async function handleRegister() {
		if (nickname && email && password && passwordConfirm) {
			if (terms) {
				loadingRegister = true;
				try {
					const data = {
						username: nickname,
						email: email,
						emailVisibility: false,
						password: password,
						passwordConfirm: passwordConfirm,
						library: {},
						notes: {},
						favorite_books: {},
						prepared_spells: {},
						last_sync_time: 0
					};

					const record = await pb.collection('users').create(data);
					const usernameData = {
						user_id: record.id,
						username: nickname
					};
					const usernameRecord = await pb.collection('usernames').create(usernameData);

					// (optional) send an email verification request
					await pb.collection('users').requestVerification(email);
					if (record) {
						$notification =
							'Registration succesful! Please check your email to confirm your account creation to get started.#info';
						loadingRegister = false;
						goto('/onboarding');
					}
				} catch (error) {
					console.log(error.data.data);
					if (error.data.data.email) {
						$notification = error.data.data.email.message + '#error';
						loadingRegister = false;
					} else if (error.data.data.username) {
						$notification = error.data.data.username.message + '#error';
						loadingRegister = false;
					} else if (error.data.data.passwordConfirm) {
						$notification = 'Passwords do not match#error';
						loadingRegister = false;
					} else if (error.data.data.password) {
						if (error.data.data.password.code == 'validation_length_out_of_range') {
							$notification = 'Password length must be between 7 and 72 characters#error';
						}
						loadingRegister = false;
					} else {
						$notification = 'An unknown error occured#error';
						loadingRegister = false;
					}
				}
			} else {
				$notification =
					'Accepting the terms, conditions and privacy policy is required to create an account#error';
			}
		} else {
			$notification = 'Please fill in all the required fields#error';
		}
	}
</script>

<div class="register_form">
	<SafeViewPadding>
		<h1 style="margin-bottom: 1rem; text-align: center">Register</h1>
		<form on:submit|preventDefault={() => handleRegister()}>
			<!-- <label for="Nickname">Nickname</label> -->
			<input id="nickname" type="text" placeholder="Nickname" bind:value={nickname} />
			<p class="discreet">
				Your nickname is used as an identifier when sharing spellbooks, be sure to not use any
				personal information in your nickname.
			</p>
			<!-- <label for="email">Email address</label> -->
			<input id="email" type="email" placeholder="Email" bind:value={email} />
			<!-- <label for="password">Password</label> -->
			<input id="password" type="password" placeholder="Password" bind:value={password} />
			<!-- <label for="passwordconfirm">Confirm password</label> -->
			<input
				id="passwordconfirm"
				type="password"
				placeholder="Repeat password"
				bind:value={passwordConfirm}
			/>
			<div class="row">
				<input id="terms" type="checkbox" bind:checked={terms} />
				<label style="margin-left: .5rem" for="terms"
					>I accept the <button class="href" on:click={() => ($modalCall = 'terms')}
						>terms and conditions and the privacy policy</button
					></label
				>
			</div>
			<div class="row" style="margin-top: 1rem">
				<div>
					<Button
						on:click={() => goto('/onboarding')}
						text="Back"
						icon="ri-arrow-left-s-line"
						type="fill"
					/>
				</div>
				<div>
					<Button
						submit
						loading={loadingRegister}
						text="Register"
						icon="ri-user-add-line"
						type="fill accent"
					/>
				</div>
			</div>
		</form>
	</SafeViewPadding>
</div>

<style lang="scss">
	.register_form {
		padding: 1rem;
		label {
			color: var(--onbackground) !important;
		}
		p.discreet {
			opacity: 0.7;
			font-size: 0.9rem;
		}
		.row {
			display: flex;
			width: 100%;
			justify-content: space-between;
		}
		input[type='checkbox'] {
			height: auto;
			min-height: 0;
		}
	}
</style>
