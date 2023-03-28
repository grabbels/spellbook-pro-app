<script>
	import Button from '../components/button.svelte';
	import Panel from '../components/panel.svelte';
	import SafeViewPadding from '../components/safeViewPadding.svelte';
	import { goto } from '$app/navigation';
	import PocketBase from 'pocketbase';
	import { localLastSyncTime, user } from '../stores-persist';
	import ListButton from '../components/listButton.svelte';
	import { online, visualViewport } from '../stores';
	import { fly } from 'svelte/transition';
	import OptionsPanel from '../components/optionsPanel.svelte';
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
						<div><Button icon="ri-lock-password-line" text="Change password" type="fill" /></div>
					</form>
					<div class="buttons">
						<Button text="Reset library" icon="ri-restart-line" type="outline" />
						<Button text="Delete account" icon="ri-delete-bin-line" type="outline" />
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

								{#if $online}
									<div class="icon"><i class="ri-cloud-line" /></div>
									<p><strong>Online</strong></p>
								{:else}
									<div class="icon"><i class="ri-cloud-off-line" /></div>
									<p><strong>Offline</strong></p>
								{/if}

								<p>Last sync: {new Date($localLastSyncTime).toUTCString()}</p>
								<div class="buttons">
									<Button text="Sync now" icon="ri-refresh-line" type="fill"/>
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
				margin-top: .3rem;
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
		}
	}
</style>
