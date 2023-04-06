<script>
	import { openSpellbook } from '../../functions';
	import { bookToEdit, confirm, lookupBookId } from '../../stores';
	import { localUserLibrary, openBooksIdsArray, spells, user } from '../../stores-persist';
	import Button from '../button.svelte';
	import Pill from '../pill.svelte';
	import SpellCard from '../spellCard.svelte';
	let sortedSpellsList = [[], [], [], [], [], [], [], [], [], []];
	if ($localUserLibrary[$lookupBookId].list) {
		sortSpells();
	}
	
	function sortSpells() {
		sortedSpellsList = [[], [], [], [], [], [], [], [], [], []];
		let spellbookSpellList = $localUserLibrary[$lookupBookId].list;
		if (spellbookSpellList) {
			for (let i = 0; i < spellbookSpellList.length; i++) {
				sortedSpellsList[$spells.find((o) => o.id == spellbookSpellList[i]).level].push(
					$spells.find((o) => o.id == spellbookSpellList[i]).id
				);
			}
		}
	}
	// function sortSpells() {
	// 	console.log('sorting');
	// 	$sortedSpellsList = [[], [], [], [], [], [], [], [], [], []];
	// 	if ($spellList) {
	// 		for (let i = 0; i < $spellList.length; i++) {
	// 			$sortedSpellsList[$spells.find((o) => o.id == $spellList[i]).level].push($spellList[i]);
	// 		}
	// 	}
	// }
</script>

{#if $localUserLibrary[$lookupBookId]}
	<div class="title">
		<i
			class="ri-bookmark-fill"
			style="--bookcolor: {$localUserLibrary[$lookupBookId].color}; color: var(--bookcolor)"
		/>
		<h2>{$localUserLibrary[$lookupBookId].name.toString().replaceAll(',', ' ')}</h2>
	</div>
	<div class="pills">
		<Pill
			type="fill"
			text={'Level ' + $localUserLibrary[$lookupBookId].level}
			icon="ri-user-star-line"
			label="Character level"
		/>
		<Pill
			type="fill"
			text={$localUserLibrary[$lookupBookId].class}
			icon="ri-contacts-line"
			label="Character level"
		/>
	</div>
	<div class="tags">
		{#each $localUserLibrary[$lookupBookId].tags as tag}
			<Pill type="fill small" text={tag} icon="ri-hashtag" />
		{/each}
	</div>
	<!-- <p>{$localUserLibrary[$lookupBookId].description}</p> -->
	<div class="buttons">
		{#if $user.id === $localUserLibrary[$lookupBookId].user_id}
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
				<Button text="Import" icon="ri-download-2-line" type="fill accent" on:click={() => {}} />
			</div>
		{/if}
		<!-- <div>
			<Button
				text="View"
				icon="ri-eye-line"
				type="fill blue"
				on:click={() => {
					openSpellbook($localUserLibrary[$lookupBookId].id);
				}}
			/>
		</div> -->
		<div>
			<Button
				text="Edit"
				icon="ri-edit-2-line"
				type="fill"
				on:click={() => ($bookToEdit = $localUserLibrary[$lookupBookId])}
			/>
		</div>
		{#if $user.id === $localUserLibrary[$lookupBookId].user_id}
			{#if $localUserLibrary[$lookupBookId].published === false}
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
			{:else if $localUserLibrary[$lookupBookId].published === true}
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
