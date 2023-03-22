<script>
	import { fly } from 'svelte/transition';
	import { notification } from '../stores';
	let text = $notification;
	setTimeout(() => {
	    $notification = '';
	}, ($notification.length * 90));
</script>

<button transition:fly={{ duration: 200, y: 10 }} on:click={() => ($notification = '')}>
	<div class="inner">
		<i
			class={text.split('#')[1] == 'positive'
				? 'ri-checkbox-circle-line'
				: text.split('#')[1] == 'info'
				? 'ri-information-line'
				: ''}
		/>
		<p>
			{text.split('#')[0]}
		</p>
	</div>
</button>

<style lang="scss">
	button {
		position: fixed;
		bottom: calc(var(--safe-area-inset-bottom) + 3.75rem);
		z-index: 1000;
		padding: 0 1rem;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		.inner {
			padding: 0.6rem 1.4rem 0.6rem 1rem;
			align-items: center;
			width: auto;
			display: inline-flex;
			border-radius: 50vh;
			box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
			background-color: var(--onbackground);
			max-width: 90vw;
			i {
				font-size: 1.2rem;
				vertical-align: -4px;
				margin-right: 0.3rem;
				&.ri-checkbox-circle-line {
					color: var(--lightgreen);
				}
				&.ri-information-line {
					color: var(--lightblue);
				}
			}
			p {
				color: var(--onforeground);
				font-weight: 400;
				margin: 0;
				width: 100%;
				display: block;
				white-space:normal;
			}
		}
	}
</style>
