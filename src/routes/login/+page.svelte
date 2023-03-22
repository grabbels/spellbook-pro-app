<script>
	import SafeViewPadding from '../../components/safeViewPadding.svelte';
	import Panel from '../../components/panel.svelte';
	import BookAnimation from '../../components/bookAnimation.svelte';
	import Button from '../../components/button.svelte';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import { visualViewport } from '../../stores';
    import Icon from '$lib/icon-small.png'
    let focus, emailField, passwordField;
	async function handleLogin() {
		console.log('handle login');
	}
</script>

<SafeViewPadding>
	<div
		class="login_form"
		out:fly={{ duration: 300, y: 20 }}
		in:fly={{ duration: 300, y: 20, delay: 300 }}
        style="height: {$visualViewport.height}px"
	>
		<div class="inner">
				<div class="book_wrap" style="overflow: hidden; transition: .3s; height: {focus ? '0px' : '150px'}; transform: scale({focus ? '0' : '1'}); opacity: {focus ? '0' : '1'}">
                    <img src="{Icon}" alt="">
                </div>
			<h1>Spellbook<span>Pro</span></h1>
			<Panel>
				<h2>Log in</h2>
				<form on:submit|preventDefault={() => handleLogin()}>
					<input on:focus={()=>focus = true} on:blur={()=>focus = false} bind:this={emailField} required placeholder="E-mail" type="email" />
					<input on:focus={()=>focus = true} on:blur={()=>focus = false} bind:this={passwordField} required placeholder="Password" type="password" />
					<div style="text-align: right"><Button submit text="Log in" type="fill accent" /></div>
				</form>
			</Panel>
			<p>
				No account yet? <button class="href" on:click={() => goto('/onboarding')}
					>Create an account</button
				>.
			</p>
		</div>
	</div>
</SafeViewPadding>

<!-- <div class="background" />
<div class="isolate">
	<div class="noise" />
	<div class="overlay" />
</div> -->
<style lang="scss">
	.login_form {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: .5rem;
		.inner {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			// padding-bottom: 8rem;
			h1 {
				margin-top: .5rem;
				margin-bottom: 2rem;
				span {
					vertical-align: super;
					font-size: 1.2rem;
					font-weight: 300;
					margin-left: 0.2rem;
				}
			}
			p {
				margin-top: 1rem;
			}
            img {
                width: 150px;
                border-radius: 24px;
            }
		}
	}
</style>
