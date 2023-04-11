<script>
	import { fade } from 'svelte/transition';
	import { manualSync, optionsCall } from '../../stores';
	import { lastSyncTry, localLastSyncTime } from '../../stores-persist';
	import Button from '../button.svelte';
	import SyncStatus from '../syncStatus.svelte';
	import BackButton from './backButton.svelte';
</script>

<div class="title_wrap">
	<BackButton />
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
					Last sync: {$lastSyncTry == 0
						? 'none'
						: new Date($lastSyncTry).toUTCString().replace('GMT', 'UTC')}
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
			<p class="small" style="opacity: .5; margin-top: 3rem">
				Debugging checksum: {$localLastSyncTime}
			</p>
		</div>
	</div>
</div>

<style lang="scss">
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
	.title_wrap {
		margin-bottom: 1rem;
		h2 {
			display: inline-block;
		}
	}
	form {
		margin-bottom: 1rem;
	}
	.buttons {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		div {
			margin-bottom: 0.5rem;
		}
	}
</style>
