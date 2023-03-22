<script>
	import { notification } from '../../stores';
	import { allowedTags } from '../../tags';
	import Tag from '../tag.svelte';
	let bookClass;
	let tagSearch = '';
	let bookColor;
	let tagResults = [];
	let newTag = '';
	let bookTags = [];
	let words = ['awesome', 'epic', 'evil', 'sorcerer', 'wizard', 'bbeg', 'npc'];
	let classes = [
		'Artificer',
		'Barbarian',
		'Bard',
		'Blood Hunter',
		'Cleric',
		'Druid',
		'Fighter',
		'Monk',
		'Paladin',
		'Ranger',
		'Rogue',
		'Sorcerer',
		'Warlock',
		'Wizard'
	];
	async function handleSubmit() {}
	function addTag(tag) {
		if (bookTags && bookTags.length > 7) {
			$notification = 'You can apply a maximumof eight tags.#info';
            tagSearch = ''
            tagResults = []
		} else {
			if (bookTags.includes(tag)) {
				$notification = 'Tag already applied!#info';
                tagSearch = ''
                tagResults = []
			} else {
				bookTags = [...bookTags, tag];
                tagSearch = ''
                tagResults = []
			}
		}
	}
</script>

<div style="--bookcolor: {bookColor ? bookColor : 'var(--white)'}">
	<h2><i class="ri-bookmark-line" /> New spellbook</h2>
	<form on:submit|preventDefault={() => handleSubmit()}>
		<!-- <label for="title">Book name</label>
		<input bind:value={bookName} id="name" type="text" /> -->
		<div class="row uneven">
			<div>
				<label for="class">Character class</label>
				<select bind:value={bookClass} id="class">
					<option selected disabled>Select a class</option>
					{#each classes as playerClass}
						<option value={playerClass.toLowerCase()}>{playerClass}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="level">Level</label>
				<input type="number" min="1" max="20" />
			</div>
		</div>
		<div class="column">
			<label for="tags">Tags</label>
			{#if bookTags.length}
				<ul class="book_tags">
					{#each bookTags as tag}
						<Tag text={tag} type="accent" />
					{/each}
				</ul>
			{/if}
			<input
				placeholder="Search tags..."
				autocomplete="off"
				bind:value={tagSearch}
				on:input={() => (tagResults = allowedTags.filter((el) => el.includes(tagSearch.toLowerCase())))}
				id="tags"
				type="text"
			/>
			<div class="tag_suggestions">
				<ul>
					{#if tagResults.length > 0}
						{#each tagResults as tag, i}
							{#if i === 0}
								<Tag on:click={() => addTag(tag)} text={tag} type="outline accent" />
							{:else}
								<Tag on:click={() => addTag(tag)} text={tag} type="outline" />
							{/if}
						{/each}
					{:else if tagResults.length < 1 && tagSearch.length < 1}
						{#each words as tag}
							{#if !bookTags.includes(tag)}
								<Tag on:click={() => addTag(tag)} text={tag} type="outline" />
							{/if}
						{/each}
					{/if}
				</ul>
			</div>
		</div>
	</form>
</div>

<style lang="scss">
	h2 {
		i {
			vertical-align: sub;
			color: var(--bookcolor);
		}
	}
	.row {
		label {
			margin-bottom: 0.5rem;
		}
		display: grid;
		gap: 0.5rem;
		grid-template-columns: 1fr 1fr;
		&.uneven {
			grid-template-columns: 1fr 100px;
		}
	}
	.column {
		display: flex;
		gap: 0.5rem;
		flex-direction: column;
		label,
		input {
			margin-bottom: 0;
		}
	}
	::placeholder {
		opacity: 0.5;
	}
	ul.book_tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
	}
	.tag_suggestions {
		width: calc(100% + 2rem);
		margin-left: -1rem;
		overflow-x: auto;
		mask-image: linear-gradient(
			90deg,
			transparent 2%,
			black 1rem,
			black calc(100% - 1rem),
			transparent 98%
		);
		ul {
			padding: 0 1rem;
			white-space: nowrap;
			display: flex;
			gap: 0.2rem;
		}
	}
</style>
