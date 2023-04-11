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
	import {
		confirm,
		manualSync,
		modalCall,
		notification,
		online,
		optionsCall,
		visualViewport
	} from '../stores';

	import { fade, fly } from 'svelte/transition';
	import OptionsPanel from '../components/optionsPanel.svelte';
	import Icon from '$lib/icon-outline.svg';
	import SyncStatus from '../components/syncStatus.svelte';
	import SettingsAccount from '../components/settings/settings-account.svelte';
	import SettingsInterface from '../components/settings/settings-interface.svelte';
	import SettingsSpellsheet from '../components/settings/settings-spellsheet.svelte';
	import SettingsSync from '../components/settings/settings-sync.svelte';
	import SettingsHelp from '../components/settings/settings-help.svelte';
	import SettingsDonate from '../components/settings/settings-donate.svelte';
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

<SafeViewPadding>
	<ul>
		<ListButton
			text="Account"
			icon="ri-account-circle-line"
			on:click={() => ($optionsCall = 'account')}
		/>
		<ListButton
			text="Interface"
			icon="ri-layout-4-line"
			on:click={() => ($optionsCall = 'interface')}
		/>
		<ListButton
			text="Spellbook"
			icon="ri-book-open-line"
			on:click={() => ($optionsCall = 'spellsheet')}
		/>
		<ListButton text="Sync" icon="ri-refresh-line" on:click={() => ($optionsCall = 'sync')} />
		<ListButton text="Help" icon="ri-question-line" on:click={() => ($optionsCall = 'help')} />
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
		<ListButton
			text="Donate"
			icon="ri-hand-heart-line"
			on:click={() => ($optionsCall = 'donate')}
		/>
	</ul>
</SafeViewPadding>

{#if $optionsCall}
	<OptionsPanel bind:close>
		<SafeViewPadding noheader>
			<div class="options_inner">
				{#if $optionsCall === 'account'}
					<SettingsAccount />
				{:else if $optionsCall === 'interface'}
					<SettingsInterface />
				{:else if $optionsCall === 'spellsheet'}
					<SettingsSpellsheet/>
				{:else if $optionsCall === 'sync'}
					<SettingsSync/>
				{:else if $optionsCall === 'help'}
					<SettingsHelp/>
				{:else if $optionsCall === 'donate'}
					<SettingsDonate/>
				{/if}
			</div>
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
		
	}
</style>
