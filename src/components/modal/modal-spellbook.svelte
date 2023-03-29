<script>
	import { openSpellbook } from '../../functions';
	import { bookToEdit, confirm, lookupBook } from '../../stores';
	import { activeBookIndex, openBooksIdsArray, user } from '../../stores-persist';
	import Button from '../button.svelte';
	import Pill from '../pill.svelte';
	import SpellCard from '../spellCard.svelte';
	let sortedSpellsList;
	if ($lookupBook.list) {
		sortSpells();
	}

	function sortSpells() {
		sortedSpellsList = [[], [], [], [], [], [], [], [], [], []];
		for (let i = 0; i < $lookupBook.list.length; i++) {
			sortedSpellsList[$lookupBook.list[i].level].push($lookupBook.list[i]);
		}
	}
</script>

<div class="title">
	<i class="ri-bookmark-fill" style="--bookcolor: {$lookupBook.color}; color: var(--bookcolor)" />
	<h2>{$lookupBook.name.toString().replaceAll(',', ' ')}</h2>
</div>
<div class="pills">
	<Pill
		type="fill"
		text={'Level ' + $lookupBook.level}
		icon="ri-user-star-line"
		label="Character level"
	/>
	<Pill type="fill" text={$lookupBook.class} icon="ri-contacts-line" label="Character level" />
</div>
<div class="tags">
	{#each $lookupBook.tags as tag}
		<Pill type="fill small" text={tag} icon="ri-hashtag" />
	{/each}
</div>
<!-- <p>{$lookupBook.description}</p> -->
<div class="buttons">
	{#if $user.id === $lookupBook.user_id}
		<div>
			<Button
				text="Open"
				icon="ri-folder-open-line"
				type="fill accent"
				on:click={() => {
					openSpellbook($lookupBook.id);
				}}
			/>
		</div>
	{:else}
		<div>
			<Button
				text="Import"
				icon="ri-download-2-line"
				type="fill accent"
				on:click={() => {

				}}
			/>
		</div>
	{/if}
	<div>
		<Button
			text="View"
			icon="ri-eye-line"
			type="fill blue"
			on:click={() => {
				openSpellbook($lookupBook.id);
			}}
		/>
	</div>
	<div>
		<Button
			text="Edit"
			icon="ri-edit-2-line"
			type="fill"
			on:click={() => ($bookToEdit = $lookupBook)}
		/>
	</div>
	{#if $user.id === $lookupBook.user_id}
		{#if $lookupBook.published === true}
			<div>
				<Button
					text="Publish"
					icon="ri-share-line"
					type="fill blue"
					on:click={() =>
						($confirm = [
							'Are you sure you want to publish this spellbook?',
							{ text: 'Cancel', type: 'outline', action: 'cancel' },
							{ text: 'Publish', icon: 'ri-share-line', type: 'fill blue', action: 'publish-book' }
						])}
				/>
			</div>
		{:else if $lookupBook.published === false}
			<div>
				<Button
					text="Unpublish"
					icon="ri-lock-line"
					type="outline blue"
					on:click={() =>
						($confirm = [
							'Are you sure you want to unpublish this spellbook?',
							{ text: 'Cancel', type: 'outline', action: 'cancel' },
							{
								text: 'Unpublish',
								icon: 'ri-lock-line',
								type: 'outline blue',
								action: 'unpublish-book'
							}
						])}
				/>
			</div>
		{/if}

		<div>
			<Button
				text="Delete"
				icon="ri-delete-bin-line"
				type="outline red"
				on:click={() =>
					($confirm = [
						'Are you sure you want to delete this spellbook?',
						{ text: 'Cancel', type: 'outline', action: 'cancel' },
						{
							text: 'Delete',
							icon: 'ri-delete-bin-line',
							type: 'fill red',
							action: 'delete-spellbook'
						}
					])}
			/>
		</div>
	{/if}
</div>
<div class="spells">
	{#each sortedSpellsList as list, i}
		{#if list.length > 0}
			<h4>{i === 0 ? 'Cantrips' : 'Level ' + i}</h4>
			<ul class="list">
				{#each list as spell}
					<SpellCard data={spell} type="small" />
				{/each}
			</ul>
		{/if}
	{:else}
		<p style="opacity: .7">This spellbook has no spells</p>
	{/each}
</div>

<style lang="scss">
	.title {
		max-width: 85%;
		text-transform: capitalize;
		i {
			float: left;
			font-size: 3rem;
			margin-right: 0.2rem;
			margin-left: -0.35rem;
		}
	}
	.pills {
		margin-bottom: 0.5rem;
	}
	.tags {
		display: flex;
		gap: 0.2rem;
		flex-wrap: wrap;
		margin-bottom: 2rem;
	}
	.buttons {
		display: grid;
		gap: 0.3rem;
		grid-template-columns: 1fr;
		gap: 0.3rem;
		width: 100%;
		div {
			display: grid;
		}
	}
	.spells {
		margin-top: 2rem;
		h4 {
			margin-left: 0;
		}
		ul {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 0.4rem;
		}
	}
</style>
