<script>
	import Button from '../components/button.svelte';
	import Panel from '../components/panel.svelte';
	import SafeViewPadding from '../components/safeViewPadding.svelte';
	import { goto } from '$app/navigation';
	import PocketBase from 'pocketbase';
	import { user } from '../stores-persist';
	const pb = new PocketBase('https://db.spellbook.pro');
	// import goto from '$app/navigation'
</script>

<SafeViewPadding>
	<Panel>
		<h2 style="margin: 0">Hi Grabbels!</h2>
		<div>
			<Button
				text="Log out"
				type="fill"
				icon="ri-logout-circle-line"
				on:click={() => {
					pb.authStore.clear();
					$user = null;
					goto('/onboarding');
				}}
			/>
		</div>
	</Panel>
	<Panel>
		<div style="height: 4000px" />
	</Panel>
</SafeViewPadding>
