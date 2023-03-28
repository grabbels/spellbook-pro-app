<script>
	import { bookToEdit, modalCall, notification, view } from '../../stores';
	import { activeBookIndex, localUserLibrary, openBooksIdsArray, user } from '../../stores-persist';
	import { allowedTags } from '../../tags';
	import Button from '../button.svelte';
	import Tag from '../tag.svelte';
	import WordInput from '../wordInput.svelte';
	let bookClass, bookColor, bookLevel, bookName;
	let bookTags = [];

	if ($bookToEdit) {
		bookClass = bookClass ? $bookToEdit.class : ''
		bookColor = bookColor ? $bookToEdit.color : ''
		bookLevel = bookLevel ? $bookToEdit.level : ''
		bookName = bookName ? $bookToEdit.name : []
		bookTags = bookTags ? $bookToEdit.tags : []
	}

	let tagSearch = '';
	let tagResults = [];
	let newTag = '';
	let submit = false;
	$: if (submit === true) {
		setTimeout(() => {
			submit = false;
		}, 2000);
	}

	
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
	async function handleSubmit() {
		console.log(bookName.length);
		submit = true;
		if (bookName.length && bookClass && bookColor && bookLevel) {
			let newBook = {
				id: $user.id + '-' + Date.now(),
				name: bookName,
				tags: bookTags,
				class: bookClass,
				color: bookColor,
				level: bookLevel,
				published: false,
				user: $user.username,
				user_id: $user.id,
				list: []
			};
			$localUserLibrary = [...$localUserLibrary, newBook];
			$modalCall = '';
			$openBooksIdsArray = [...$openBooksIdsArray, newBook.id];
			$activeBookIndex = $openBooksIdsArray.length - 1;
			$view = 'spellbook';
		} else {
			$notification = 'Please fill out all fields (tags are not required)#error';
		}
	}

	function addTag(tag) {
		if (bookTags && bookTags.length > 7) {
			$notification = 'You can apply a maximumof eight tags.#info';
			tagSearch = '';
			tagResults = [];
		} else {
			if (bookTags.includes(tag)) {
				$notification = 'Tag already applied!#info';
				tagSearch = '';
				tagResults = [];
			} else {
				bookTags = [...bookTags, tag];
				tagSearch = '';
				tagResults = [];
			}
		}
	}
	// $: console.log(bookName ? bookName.toString().replace(',', ' ').charAt(0).toUpperCase() + bookName.toString().replace(',', ' ').slice(1) : '')
</script>

<div style="--bookcolor: {bookColor ? bookColor : 'var(--white)'}">
	<h2><i class="ri-bookmark-{bookColor ? 'fill' : 'line'}" /> {$bookToEdit ? 'Edit spellbook' : 'New spellbook'}</h2>
	{#if !$bookToEdit}
	<p style="opacity: .7">
		Give your new spellbook some details to recognize it by. Don't worry, you can change all these
		later!
	</p>
	{/if}
	<!-- <label for="title">Book name</label>
		<input bind:value={bookName} id="name" type="text" /> -->
	<!-- <label for="name">Name</label>
		<input type="text" id="name" minlength="5" maxlength="60"> -->
	<label for="">Name</label>
	<div style="border-radius: 12px" class:missing={!bookName?.length && submit}>
		<WordInput bind:value={bookName} />
	</div>
	<div class="row uneven">
		<div>
			<label for="class">Character class</label>
			<select bind:value={bookClass} id="class" class:missing={!bookClass && submit}>
				<option value="" selected disabled>Select a class</option>
				{#each classes as playerClass}
					<option value={playerClass.toLowerCase()}>{playerClass}</option>
				{/each}
			</select>
		</div>
		<div>
			<label for="level">Level</label>
			<input
				inputmode="numeric"
				type="number"
				min="1"
				max="20"
				bind:value={bookLevel}
				class:missing={!bookLevel && submit}
			/>
		</div>
	</div>
	<div class="column">
		<label for="tags">Tags</label>
		{#if bookTags.length}
			<ul class="book_tags">
				{#each bookTags as tag}
					<Tag
						text={tag}
						type="accent"
						on:click={() => (bookTags = bookTags.filter((x) => x !== tag))}
					/>
				{/each}
			</ul>
		{/if}
		<input
			placeholder="Search tags..."
			autocomplete="off"
			bind:value={tagSearch}
			on:input={() =>
				(tagResults = allowedTags.filter((el) => el.includes(tagSearch.toLowerCase())))}
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
	<div class="column">
		<label for="color">Color</label>
		<div class="color_picker" class:missing={!bookColor && submit}>
			<input type="radio" bind:group={bookColor} name="color" id="purple" value="var(--purple)" />
			<label for="purple" name="color" id="purple" style="background-color: var(--purple)" />
			<input type="radio" bind:group={bookColor} name="color" id="red" value="var(--red)" />
			<label for="red" id="red" style="background-color: var(--red)" />
			<input
				type="radio"
				bind:group={bookColor}
				name="color"
				id="lightgreen"
				value="var(--lightgreen)"
			/>
			<label for="lightgreen" id="lightgreen" style="background-color: var(--lightgreen)" />
			<input
				type="radio"
				bind:group={bookColor}
				name="color"
				id="lightblue"
				value="var(--lightblue)"
			/>
			<label for="lightblue" id="lightblue" style="background-color: var(--lightblue)" />
			<input type="radio" bind:group={bookColor} name="color" id="yellow" value="var(--yellow)" />
			<label for="yellow" id="yellow" style="background-color: var(--yellow)" />
			<input
				type="radio"
				bind:group={bookColor}
				name="color"
				id="darkblue"
				value="var(--darkblue)"
			/>
			<label for="darkblue" id="darkblue" style="background-color: var(--darkblue)" />
			<input
				type="radio"
				bind:group={bookColor}
				name="color"
				id="darkgreen"
				value="var(--darkgreen)"
			/>
			<label for="darkgreen" id="darkgreen" style="background-color: var(--darkgreen)" />
			<input type="radio" bind:group={bookColor} name="color" id="pink" value="var(--pink)" />
			<label for="pink" id="pink" style="background-color: var(--purppinkle)" />
		</div>
	</div>
	<div style="margin-top: 2rem; text-align: center">
		<Button
			on:click={() => handleSubmit()}
			text="Create spellbook"
			icon="ri-add-line"
			type="fill accent"
		/>
	</div>
</div>

<style lang="scss">
	h2 {
		i {
			vertical-align: sub;
			color: var(--bookcolor);
		}
	}
	.missing {
		box-shadow: 0 0 0 2px var(--red);
		transition: 0.2s;
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
		margin-bottom: 0.5rem;
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
		font-family: 'Roboto Mono';
		button {
		}
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
			font-family: 'Roboto Mono';
		}
	}
	.color_picker {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(45px, 1fr));
		gap: 0.3rem;
		position: relative;
		border-radius: 6px;
		label {
			aspect-ratio: 1 / 1;
			border-radius: 6px;
			cursor: pointer;
			border: 2px solid transparent;
			transition: 0.05s;
		}
		input {
			display: none;
			&:checked + label {
				border: 4px solid var(--panelbg);
				box-shadow: 0 0 0 2px var(--accent);
				border-radius: 10px;
			}
		}
	}
	select {
		width: 100%;
	}
</style>
