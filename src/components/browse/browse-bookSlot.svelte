<script>
	import { fade } from 'svelte/transition';
	import Pill from '../pill.svelte';
	import Schoolicon from '../schoolicon.svelte';

	export let data;
</script>

{#if data === 'placeholder'}
	<button class="placeholder" style="--bookcolor: var(--moretranslucent)" />
{:else}
	<button in:fade={{ duration: 200 }} style="--bookcolor: {data.color}" on:click>
		<h2><i class="ri-{data.icon}-fill" />{data.book_name}</h2>
		<div class="pills">
			<Pill icon="ri-contacts-line" text={data.character_class} type="small green" />
			<Pill icon="ri-user-star-list" text="Level {data.character_level}" type="small blue" />
			{#each data.tags as tag}
				<Pill icon="ri-hashtag" text={tag.toLowerCase()} type="small" />
			{/each}
		</div>
		{#if data.spelltypes}
			<div class="spells">
				{#each Object.keys(data.spelltypes) as spelltype}
					<div class="count">
						<Schoolicon school={spelltype} type="tiny" />{data.spelltypes[spelltype]}
					</div>
				{/each}
			</div>
		{/if}
	</button>
{/if}

<style lang="scss">
	button {
		margin-bottom: 0.5rem;
		background-color: rgba(0, 0, 0, 0.5);
		padding: 1.5rem 1rem;
		position: relative;
		width: 100%;
		border-radius: var(--large-radius);
		// border: 2px solid var(--bookcolor);
		min-height: 150px;
		overflow: hidden;
		box-sizing: border-box;
		background-color: var(--cardbg);
		// &:after {
		// 	content: '';
		// 	position: absolute;
		// 	left: 0;
		// 	right: 0;
		// 	top: 0;
		// 	bottom: 0;
		// 	background-color: var(--bookcolor);
		// 	z-index: -1;
		// }
		h2 {
			text-transform: capitalize;
			margin: 0 0 0.5rem;
			font-size: 1.5rem;
			i {
				color: var(--bookcolor);
				vertical-align: sub;
				margin-right: 0.2rem;
			}
		}
		.pills {
			display: flex;
			flex-wrap: wrap;
			gap: 0.2rem;
		}
		.spells {
			margin-top: 0.5rem;
			display: flex;
			flex-wrap: wrap;
			gap: 0.2rem;
			.count {
				background-color: var(--moretranslucent);
				display: inline-block;
				padding: 0.2rem 0.4rem;
				border-radius: 50vw;
			}
		}
		&.placeholder {
			opacity: .5;
			animation: pulse 1s infinite;
			@keyframes pulse {
				0% {opacity: .5}
				50% {opacity: 1}
				100% {opacity: .5}
			}
		}
	}
</style>
