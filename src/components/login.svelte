<script>
	import Button from './button.svelte';
	import { goto } from '$app/navigation';
	import { notification } from '../stores';

	import PocketBase from 'pocketbase';
	const pb = new PocketBase('https://db.spellbook.pro');
	// console.log($pbStore);
	let email, password;
	let loadingLogin = false;
	async function handleLogin() {
		loadingLogin = true;
		console.log('handle login');
		if (email) {
			if (password) {
				try {
					const authData = await pb.collection('users').authWithPassword(email, password);
					if (authData) {
						console.log(authData);						
						goto('/')
						loadingLogin = false;
					}
				} catch (error) {
					console.log(error);
					if (error.data) {
						if (error.data.message == 'Failed to authenticate.') {
							$notification = 'Unknown email and password combination#error';
							loadingLogin = false;
						} else if (error.data) {
							$notification = error.data.message + '#error';
							loadingLogin = false;
						}
					} else {
						$notification = 'An unknown error occured#error';
						loadingLogin = false;
					}
				}
			} else {
				$notification = 'Your password is required#error';
				loadingLogin = false;
			}
		} else {
			$notification = 'Your email address is required#error';
			loadingLogin = false;
		}
	}
</script>

<div class="login_form">
	<div class="inner">
		<!-- <div
			class="icon_wrap"
			style="overflow: hidden; transition: .3s; height: {focus ? '0px' : '300px'};  opacity: {focus
				? '0'
				: '1'}; transform: scale({focus ? '.85' : '1'})"
		>
			<img src={Icon} alt="" />
			<h1>Spellbook<span>Pro</span></h1>
		</div> -->

		<!-- <Panel> -->
		<div class="login_panel">
			<h2>Log in</h2>
			<form on:submit|preventDefault={() => handleLogin()}>
				<input bind:value={email} placeholder="E-mail" type="email" autocomplete="username" />
				<input bind:value={password} placeholder="Password" type="password" autocomplete="password" />
				<div style="text-align: center">
					<Button submit loading={loadingLogin} text="Log in" type="fill accent" />
				</div>
			</form>
			<p>
				No account yet? <button class="href" on:click={() => goto('/register')}
					>Create an account</button
				>.
			</p>
		</div>
		<!-- </Panel> -->
	</div>
</div>

<!-- <div class="background" />
<div class="isolate">
	<div class="noise" />
	<div class="overlay" />
</div> -->
<style lang="scss">
	.login_form {
		// height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		// padding: 0.5rem;

		.inner {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			// padding-bottom: 8rem;
			.login_panel {
				margin-top: 1rem;
				height: 100%;
				// padding: 1rem;
				p {
					margin-top: 1rem;
					text-align: center;
				}
			}

			.icon_wrap {
				display: flex;
				flex-direction: column;
				align-items: center;
				img {
					width: 150px;
					border-radius: 24px;
				}
				h1 {
					margin-top: 0.5rem;
					margin-bottom: 2rem;
					span {
						vertical-align: super;
						font-size: 1.2rem;
						font-weight: 300;
						margin-left: 0.2rem;
					}
				}
			}
		}
	}
</style>
