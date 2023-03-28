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
	<h2>{$lookupBook.name}</h2>
</div>
<div class="pills">
	<Pill
		type="fill small"
		text={'Level ' + $lookupBook.level}
		icon="ri-user-star-line"
		label="Character level"
	/>
	<Pill
		type="fill small"
		text={$lookupBook.class}
		icon="ri-contacts-line"
		label="Character level"
	/>
</div>
<!-- <p>{$lookupBook.description}</p> -->
<div class="buttons">
	<div>
		<Button text="Open" icon="ri-folder-open-line" type="fill accent" on:click={() => {
			openSpellbook($lookupBook.id)
		}} />
	</div>
	{#if $user.id === $lookupBook.user_id}
		{#if $lookupBook.published === true}
			<div><Button text="Publish" icon="ri-share-line" type="fill blue" /></div>
		{:else if $lookupBook.published === false}
			<div><Button text="Unpublish" icon="ri-share-line" type="outline blue" /></div>
		{/if}

		<div>
			<Button
				text="Edit"
				icon="ri-edit-2-line"
				type="fill"
				on:click={() => ($bookToEdit = $lookupBook)}
			/>
		</div>
		<div><Button text="Delete" icon="ri-delete-bin-line" type="fill red" on:click={()=> $confirm = ['Are you sure you want to delete this spellbook?', {text: 'Cancel', type: 'outline', action: 'cancel'}, {text: 'Delete', icon: 'ri-delete-bin-line', type: 'fill red', action: 'delete-spellbook'}]} /></div>
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
		i {
			float: left;
			font-size: 3rem;
			margin-right: 0.2rem;
			margin-left: -0.35rem;
		}
	}
	.pills {
		margin-bottom: 1rem;
	}
	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
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
