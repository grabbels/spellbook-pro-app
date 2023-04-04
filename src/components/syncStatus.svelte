<script>
	import { fly } from 'svelte/transition';
	import { online, syncStatus } from '../stores';
	let message;
	export let large;
	$: if ($online) {
		$online === false ? (message = 'offline') : '';
		setTimeout(() => {
			message = '';
		}, 2000);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class:large transition:fly={{ duration: 300, y: -50 }} class="sync_status">
	{#if online}
		{#if message}<span transition:fly={{ duration: 200, x: 20 }}>{message}</span>{/if}
		{#key $syncStatus}
			<div in:fly={{ y: -20 }} out:fly={{ y: 20 }} class="icon">
				{#if $syncStatus === 'working'}
					<div class="rotate"><i class="ri-loader-4-line" /></div>
				{:else if $syncStatus === 'done'}
					<i class="ri-check-line" />
				{:else if $syncStatus === 'error'}
					<i class="ri-close-line" />
				{:else}
					<i class={$online === true ? 'ri-cloud-line' : 'ri-cloud-off-line'} />
				{/if}
			</div>
		{/key}
	{/if}
</div>

<style lang="scss">
	.sync_status {
		position: absolute;
		right: 1rem;
		top: max(calc(var(--safe-area-inset-top) + 3px), 1rem);
		height: 20px;
		z-index: 100;
		// box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
		border-radius: 50vh;
		display: flex;
		align-items: center;
		transition: 0.3s;
		overflow: hidden;
		width: 100px;
		justify-content: flex-end;
		pointer-events: auto;
		// z-index: 100;
		// overflow: hidden;
		&:after {
			content: '';
			top: 0;
			right: 0;
			height: 20px;
			width: 20px;
			background-color: var(--onbackground);
			border-radius: 50vh;
		}
		div {
			height: 20px;
			width: 20px;
			display: inline-flex;
			align-items: center;
			justify-content: center;

			position: absolute;
			right: 0;
			top: 0;
			&.rotate {
				animation: rotate 1s cubic-bezier(0.17, 0.67, 0.83, 0.67) infinite;
				@keyframes rotate {
					to {
						transform: rotate(360deg);
					}
				}
			}
			i {
				margin: 0.3rem;
				z-index: 1;
				&.ri-cloud-line,
				&.ri-loader-4-line {
					color: var(--lightblue);
				}
				&.ri-cloud-off-line {
					color: grey;
				}
				&.ri-check-line {
					color: var(--lightgreen);
				}
				&.ri-close-line {
					color: var(--red);
				}
			}
		}

		span {
			color: var(--onforeground);
			font-size: 0.8rem;
			display: inline-block;
			width: auto;
			overflow: hidden;
			transition: 0.3s;
			position: absolute;
			right: 11px;
			top: 0;
			bottom: 0;
			border-radius: 50vh 0 0 50vh;
			background-color: var(--onbackground);
			padding: 0.3rem 0.7rem 0.35rem 0.4rem;
			display: flex;
			align-items: center;
			z-index: -1;
		}
		&.large {
			position: relative;
			transform: 0;
			left: auto;
			right: auto;
			top: auto;
			bottom: auto;
			width: auto;
			justify-content: center;
			align-items: center;
			display: inline-flex;
			height: 50px;
			width: 50px;
			&:after {
				height: 100%;
				width: 100%;
			}
			.icon {
				height: 100%;
				width: 100%;
                font-size: 2.5rem;
                div {
                    width: 50px;
                    height: 50px;
                }
			}
			span {
				display: none;
			}
		}
	}
</style>
