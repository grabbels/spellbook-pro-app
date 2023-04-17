<script>
	import { fade } from 'svelte/transition';
	import { openSpellbook } from '../../functions';
	import { bookToEdit, confirm, lookupBookId, lookupSpellList, lookupUserId, modalCall } from '../../stores';
	import {
		localUserFavoriteBooks,
		localUserLibrary,
		openBooksIdsArray,
		spells,
		user
	} from '../../stores-persist';
	import Button from '../button.svelte';
	import Loader from '../loader.svelte';
	import Pill from '../pill.svelte';
	import SpellCard from '../spellCard.svelte';
	import PocketBase from 'pocketbase';
	const pb = new PocketBase('https://db.spellbook.pro');
	let spellbook;
	let raw;
	let username;
	let sortedSpellsList = [[], [], [], [], [], [], [], [], [], []];

	if ($localUserLibrary[$lookupBookId]) {
		spellbook = $localUserLibrary[$lookupBookId];
	} else {
		getGlobalSpellbook($lookupBookId);
	}

	async function getGlobalSpellbook(id) {
		try {
			const record = await pb.collection('spellbooks').getOne(id);
			spellbook = record;
			if (record) {
				spellbook = record.book;
				raw = record;
				let userId = record.user_id;
				const usernameRecord = await pb
					.collection('usernames')
					.getFirstListItem(`user_id="${userId}"`);
				username = usernameRecord.username;
			}
		} catch (error) {
			console.log(error.data);
		}
	}

	$: if (spellbook && spellbook.list) {
		console.log(spellbook);
		sortSpells();
	}

	function sortSpells() {
		sortedSpellsList = [[], [], [], [], [], [], [], [], [], []];
		let spellbookSpellList = spellbook.list;
		if (spellbookSpellList) {
			for (let i = 0; i < spellbookSpellList.length; i++) {
				sortedSpellsList[$spells.find((o) => o.id == spellbookSpellList[i]).level].push(
					$spells.find((o) => o.id == spellbookSpellList[i]).id
				);
			}
		}
	}

	async function addToFavorites(id) {
		$localUserFavoriteBooks = [...$localUserFavoriteBooks, id];
		await pb.collection('spellbooks').update(id, {
			'favorites+': 1
		});
	}
	async function removeFromFavorites(id) {
		$localUserFavoriteBooks.splice($localUserFavoriteBooks.indexOf($lookupBookId), 1);
		$localUserFavoriteBooks = $localUserFavoriteBooks;
		await pb.collection('spellbooks').update(id, {
			'favorites-': 1
		});
	}
</script>

{#if spellbook}
	<div in:fade={{ duration: 300 }}>
		<div class="title">
			<i
				class="ri-{spellbook.icon}-fill"
				style="--bookcolor: {spellbook.color}; color: var(--bookcolor)"
			/>
			<h2>{spellbook.name.toString().replaceAll(',', ' ')}</h2>
		</div>
		{#if !$lookupBookId.includes($user.id)}
			<div class="username" style="height: 34px">
				{#if username}<p in:fade={{duration: 200}}>Made by <strong><button class="href" on:click={()=>{$modalCall = 'user'; $lookupUserId = spellbook.user_id}}>{username}</button></strong></p>{/if}
			</div>
		{/if}
		<div class="pills">
			<Pill
				type="fill"
				text={'Level ' + spellbook.level}
				icon="ri-user-star-line"
				label="Character level"
			/>
			<Pill type="fill" text={spellbook.class} icon="ri-contacts-line" label="Character level" />
			{#if raw}
				<Pill text={raw.favorites} type="large bold red" icon="ri-heart-fill" />
				<Pill text={raw.views} type="large bold neutral" icon="ri-eye-fill" />
			{/if}
		</div>
		<div class="tags">
			{#each spellbook.tags as tag}
				<Pill type="fill small" text={tag} icon="ri-hashtag" />
			{/each}
		</div>
		<!-- <p>{spellbook.description}</p> -->
		<div class="buttons">
			{#if $user.id === spellbook.user_id}
				<div>
					<Button
						text="Open"
						icon="ri-folder-open-line"
						type="fill accent liquid"
						liquid
						on:click={() => {
							openSpellbook($lookupBookId);
						}}
					/>
				</div>
			{:else}
				<div>
					<Button
						text="View"
						liquid
						icon="ri-eye-line"
						type="fill blue liquid"
						on:click={() => {$modalCall = 'spellbook-view'; $lookupSpellList = spellbook.list}}
					/>
				</div>
				<div>
					<Button text="Import" icon="ri-download-line" type="fill accent" on:click={() => {}} />
				</div>
				{#key $localUserFavoriteBooks}
					{#if $localUserFavoriteBooks.includes($lookupBookId)}
						<div>
							<Button
								text="Remove from favorites"
								icon="ri-heart-line"
								type="outline red"
								on:click={() => {
									removeFromFavorites($lookupBookId);
								}}
							/>
						</div>
					{:else}
						<div>
							<Button
								text="Favorite"
								icon="ri-heart-fill"
								type="fill red"
								on:click={() => {
									addToFavorites($lookupBookId);
								}}
							/>
						</div>
					{/if}
				{/key}
			{/if}
			<!-- <div>
				<Button
					text="View"
					icon="ri-eye-line"
					type="fill blue"
					on:click={() => {
						openSpellbook(spellbook.id);
					}}
				/>
			</div> -->
			{#if $user.id === spellbook.user_id}
				<div>
					<Button
						text="Edit"
						icon="ri-edit-2-line"
						type="fill"
						on:click={() => ($bookToEdit = spellbook)}
					/>
				</div>
			{/if}
			{#if $user.id === spellbook.user_id}
				{#if spellbook.published === false}
					<div>
						<Button
							text="Publish"
							icon="ri-share-line"
							type="fill blue"
							on:click={() =>
								($confirm = [
									'Are you sure you want to publish this spellbook? This means it will be available to the community in the "Browse" tab.',
									{ text: 'Cancel', type: 'outline', action: 'cancel' },
									{
										text: 'Publish',
										icon: 'ri-share-line',
										type: 'fill blue',
										action: 'publish-book'
									}
								])}
						/>
					</div>
				{:else if spellbook.published === true}
					<div>
						<Button
							text="Unpublish"
							icon="ri-lock-line"
							type="outline blue"
							on:click={() =>
								($confirm = [
									'Are you sure you want to unpublish this spellbook? This means it will be no longer available to the community in the "Browse" tab.',
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
						{#each list as spellId}
							{@const spell = $spells.find((o) => o.id == spellId)}
							<SpellCard data={spell} type="small" />
						{/each}
					</ul>
				{/if}
			{:else}
				<p style="opacity: .7">This spellbook has no spells</p>
			{/each}
		</div>
	</div>
{:else}
	<Loader />
{/if}

<style lang="scss">
	.title {
		max-width: 85%;
		text-transform: capitalize;
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		margin-bottom: 1rem;
		i {
			float: left;
			font-size: 3rem;
			margin-right: 0.2rem;
			margin-left: -0.35rem;
		}
		h2 {
			margin: 0;
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
		display: flex;
		flex-direction: column;
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
			align-items: flex-start;
		}
	}
</style>
