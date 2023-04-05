<script>
	import Button from '../components/button.svelte';
	import Panel from '../components/panel.svelte';
	import SafeViewPadding from '../components/safeViewPadding.svelte';
	import { goto } from '$app/navigation';
	import PocketBase from 'pocketbase';
	import {
		lastLocalSpellsPull,
		lastSyncTry,
		localLastSyncTime,
		localUserLibrary,
		user
	} from '../stores-persist';
	import ListButton from '../components/listButton.svelte';
	import { confirm, manualSync, modalCall, notification, online, visualViewport } from '../stores';
	import { fade, fly } from 'svelte/transition';
	import OptionsPanel from '../components/optionsPanel.svelte';
	import Icon from '$lib/icon-outline.svg';
	import SyncStatus from '../components/syncStatus.svelte';
	const pb = new PocketBase('https://db.spellbook.pro');
	let optionsCall, nickname, email, theme, close, nicknameField, emailField, emailPassword;
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
		optionsCall = '';
		close = false;
	}
	if ($user) {
		nickname = $user.username;
		email = $user.email;
	}
	function formatDate(date, format) {
		//
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
			$notification = 'Please fill in a valid email address#alert;'
		}
	}
</script>

<SafeViewPadding>
	<ul>
		<ListButton
			text="Account"
			icon="ri-account-circle-line"
			on:click={() => (optionsCall = 'account')}
		/>
		<ListButton
			text="Interface"
			icon="ri-layout-4-line"
			on:click={() => (optionsCall = 'interface')}
		/>
		<ListButton
			text="Spellsheet"
			icon="ri-book-open-line"
			on:click={() => (optionsCall = 'spellsheet')}
		/>
		<ListButton text="Sync" icon="ri-refresh-line" on:click={() => (optionsCall = 'sync')} />
		<div style="margin-top:2rem; text-align: center; opacity: .3">
			<img src={Icon} alt="" style="display: inline-block; margin-bottom: .5rem; opacity: .5" />
			<p class="small">
				Spellbook Pro 1.0.0. <button class="href" on:click={() => ($modalCall = 'changelog')}
					>Changelog.</button
				><br />Spells database last pull: {new Date($lastLocalSpellsPull)
					.toJSON()
					.slice(0, 16)
					.replace('T', ' ')} UTC
			</p>
		</div>
		<ListButton text="Donate" icon="ri-hand-heart-line" on:click={() => (optionsCall = 'donate')} />
	</ul>
</SafeViewPadding>

{#if optionsCall}
	<OptionsPanel bind:close>
		<SafeViewPadding noheader>
			{#if optionsCall === 'account'}
				<div class="options_inner">
					<div class="title_wrap">
						<button on:click={() => (optionsCall = '')}><i class="ri-arrow-left-s-line" /></button>
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
				</div>
			{:else if optionsCall === 'interface'}
				<div class="options_inner">
					<div class="title_wrap">
						<button on:click={() => (optionsCall = '')}><i class="ri-arrow-left-s-line" /></button>
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
			{:else if optionsCall === 'spellsheet'}
				<div class="options_inner">
					<div class="title_wrap">
						<button on:click={() => (optionsCall = '')}><i class="ri-arrow-left-s-line" /></button>
						<h2>
							<h3>settings</h3>
							Spellsheet
						</h2>
					</div>
				</div>
			{:else if optionsCall === 'sync'}
				<div class="options_inner">
					<div class="title_wrap">
						<button on:click={() => (optionsCall = '')}><i class="ri-arrow-left-s-line" /></button>
						<h2>
							<h3>settings</h3>
							Sync
						</h2>
						<div>
							<div class="status">
								<h4>Sync status</h4>
								<SyncStatus large />
								{#key $lastSyncTry}
									<p in:fade>
										Last sync: {$lastSyncTry == 0 ? 'none' : new Date($lastSyncTry).toUTCString().replace('GMT', 'UTC')}
									</p>
								{/key}
								<div class="buttons">
									<Button
										text="Sync now"
										icon="ri-refresh-line"
										type="fill"
										on:click={() => ($manualSync = true)}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			{:else if optionsCall === 'donate'}
				<div class="options_inner">
					<div class="title_wrap">
						<button on:click={() => (optionsCall = '')}><i class="ri-arrow-left-s-line" /></button>
						<h2>
							<h3>settings</h3>
							Donate
						</h2>
						<p>Hi there! I'm Sem, and I made the Spellbook Pro app by myself. The idea was born when I grew more and more frustrated by how when spellcasters are involved, D&D fights drag on for ages for all the wrong reasons. And that's not on the players, but on how much information goes into playing a spellcaster. I started tinkering en before long Spellbook Pro was a reality!</p>
						<p>From the humble beginnings to the more serious later phase of releasing this app, I always knew I wanted to make this app free to use. I learn(ed) a lot while developing this platform and that's enough for me. <br><strong>Would you like to help me out anyway by providing me with a hot cup of coffee? Feel free to donate any amount you like, thank you!</strong></p>
						<div style="margin-top: 2rem"><Button text="Donate" icon="ri-heart-fill" type="fill accent"/></div>
						<p style="margin-top: 1rem">Curious what else I make? Visit <a style="color:var(--onbackground)" href="https://semhak.com">my website</a>!</p>
					</div>
				</div>
			{/if}
		</SafeViewPadding>
	</OptionsPanel>
{/if}

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
			button {
				background-color: var(--translucent);
				vertical-align: -3px;
				// padding: .5rem;
				width: 40px;
				height: 40px;
				border-radius: 12px;
				margin-right: 0.8rem;
				display: inline-flex;
				justify-content: center;
				align-items: center;
				i {
					font-size: 1.5rem;
				}
			}
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
