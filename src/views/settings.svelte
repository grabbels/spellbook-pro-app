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
	let optionsCall, nickname, email, theme, close;
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
	// import goto from '$app/navigation'
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
						<input id="nickname" type="text" bind:value={nickname} disabled />
						<div><Button icon="ri-edit-2-line" text="Change nickname" type="fill" /></div>
					</form>
					<form on:submit|preventDefault>
						<label for="email">Email</label>
						<input id="email" type="email" bind:value={email} disabled />
						<div><Button icon="ri-edit-2-line" text="Change E-mail" type="fill" /></div>
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
								<SyncStatus large/>
								{#key $lastSyncTry}
									<p in:fade>
										Last sync: {new Date($lastSyncTry).toUTCString().replace('GMT', 'UTC')}
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
