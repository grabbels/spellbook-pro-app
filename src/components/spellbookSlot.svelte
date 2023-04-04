<script>
	import { fade } from 'svelte/transition';
	import { localUserLibrary } from '../stores-persist';
	import Pill from './pill.svelte';
	export let id;
</script>

<button on:click style="--bookcolor: {$localUserLibrary[id].color}" in:fade={{duration:100}}>
	<div class="inner">
		<div>
			<i class="ri-{$localUserLibrary[id].icon ? $localUserLibrary[id].icon : 'bookmark'}-fill" style="color: {$localUserLibrary[id].color}"/>
			<!-- <div class="book">
				<div class="book_inner">
					<h1>{data.character}</h1>
				</div>
				<i class="ri-bookmark-fill" />
			</div> -->
		</div>
		<div style="align-self:center; margin-top: -.4rem">
			<h2>{$localUserLibrary[id].name.toString().replaceAll(',', ' ')}</h2>
			<div class="pills">
				<Pill type="fill small green" text={$localUserLibrary[id].class} icon="ri-contacts-line" label="Character level" />
				<Pill
					type="fill small blue"
					text={'Level ' + $localUserLibrary[id].level}
					icon="ri-user-star-line"
					label="Character level"
				/>
			</div>
		</div>
	</div>
</button>

<style lang="scss">
	button {
		margin-bottom: 0.3rem;
		background-color: var(--cardbg);
		// margin: .4rem .8rem;
		padding: 1.5rem 1.3rem;
		border-radius: 24px;
		position: relative;
		width: 100%;
		box-sizing: border-box;
		// box-shadow: 0 3px 5px rgba(10, 10, 10, 0.2);
		.inner {
			display: grid;
			grid-template-columns: 60px 1fr;
			gap: 1rem;
			align-content: center;
			// grid-auto-rows: min-content;
			div {
				position: relative;
			}
			h2 {
				font-size: 1.2rem;
				margin-bottom: 0.5rem;
				text-transform: capitalize;
			}
			i {
				font-size: 3rem;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}
			// .book {
			// 	// height: 100%;
			// 	width: 100%;
			// 	height: 105px;
			// 	// aspect-ratio: 1 / 1.4;
			// 	border-radius: 12px;
			// 	background-color: var(--bookcolor);
			// 	// padding: 0.3rem;
			// 	position: relative;
			// 	z-index: 1;
			// 	box-shadow: var(--shadow);
			// 	&:before {
			// 		content: '';
			// 		position: absolute;
			// 		left: 0;
			// 		top: 0;
			// 		right: 0;
			// 		bottom: 0;
			// 		background-color: var(--brown);
			// 		opacity: 0.92;
			// 		border-radius: 10px;
			// 		// z-index: -1;
			// 	}
			// 	&:after {
			// 		position: absolute;
			// 		content: '';
			// 		left: 0;
			// 		top: 0;
			// 		right: 0;
			// 		bottom: 0;
			// 		background-color: var(--bookcolor);
			// 		z-index: -1;
			// 		filter: blur(5px);
			// 		opacity: 0.3;
			// 		border-radius: 3px;
			// 		display: none;
			// 	}
			// 	i {
			// 		font-size: 1.2rem;
			// 		position: absolute;
			// 		bottom: -12px;
			// 		z-index: -1;
			// 		left: 5px;
			// 		color: var(--bookcolor);
			// 	}
			// 	.book_inner {
			// 		position: relative;
			// 		width: 100%;
			// 		height: 100%;
			// 		border: 7px solid rgba(0, 0, 0, 0.25);
			// 		border-radius: 12px;
			// 		z-index: 1;
			// 		padding: 1.1rem 0.3rem;
			// 		text-align: center;

			// 		h1 {
			// 			font-size: 0.7rem;
			// 			font-family: 'Forum';

			// 			color: rgba(0, 0, 0, 0.6);
			// 		}
			// 	}
			// }
		}
	}
</style>
