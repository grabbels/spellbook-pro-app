<script>
	import { onMount } from 'svelte';
	import { bookToEdit, lookupBookId, modalCall, notification, view } from '../../stores';
	import {
		activeOpenBookId,
		localUserLibrary,
		openBooksIdsArray,
		user
	} from '../../stores-persist';
	import { allowedTags } from '../../tags';
	import Button from '../button.svelte';
	import Tag from '../tag.svelte';
	import WordInput from '../wordInput.svelte';
	import { classes } from '../../staticData';
	let bookClass, bookName, bookColor, bookLevel, bookIcon, bookDateCreated, bookPublished;
	let bookList = [];
	let bookTags = [];
	console.log($bookToEdit);
	if ($bookToEdit) {
		$bookToEdit.class ? (bookClass = $bookToEdit.class) : '';
		$bookToEdit.color ? (bookColor = $bookToEdit.color) : '';
		$bookToEdit.level ? (bookLevel = $bookToEdit.level) : '';
		$bookToEdit.published ? (bookPublished = $bookToEdit.published) : '';
		$bookToEdit.icon ? (bookIcon = $bookToEdit.icon) : '';
		$bookToEdit.tags ? (bookTags = $bookToEdit.tags) : '';
		$bookToEdit.name ? (bookName = $bookToEdit.name) : '';
		$bookToEdit.list ? (bookList = $bookToEdit.list) : [];
		$bookToEdit.date_created ? (bookDateCreated = $bookToEdit.date_created) : '';
	}

	$: if (bookName && bookName.length > 8) {
		bookName.pop();
		$notification = 'The name can be a maximum of 8 words long.#info';
	}
	onMount(() => {});

	let tagSearch = '';
	let tagResults = [];
	let newTag = '';
	let submit = false;
	$: if (submit === true) {
		setTimeout(() => {
			submit = false;
		}, 2000);
	}

	let icons = [
		'magic',
		'open-arm',
		'robot',
		'aliens',
		'bear-smile',
		'criminal',
		'sword',
		'ghost',
		'ghost-2',
		'spy',
		'skull',
		'skull-2',
		'sun',
		'moon',
		'flashlight',
		'windy',
		'rainy',
		'fire',
		'meteor',
		'moon-clear',
		'ancient-pavilion',
		'hospital',
		'mail',
		'cloud',
		'award',
		'medal',
		'flag',
		'chat-smile-3',
		'quill-pen',
		'brush',
		'contrast-2',
		'palette',
		'home-4',
		'bug',
		'bug-2',
		'gamepad',
		'file-list-3',
		'file-paper',
		'book',
		'book-mark',
		'book-2',
		'book-3',
		'file-mark',
		'safe-2',
		'shopping-cart',
		'shopping-basket',
		'vip-crown',
		'vip-crown-2',
		'vip-diamond',
		'coin',
		'auction',
		'trophy',
		'gift',
		'hand-heart',
		'heart',
		'hearts',
		'nurse',
		'first-aid-kit',
		'flask',
		'test-tube',
		'virus',
		'stethoscope',
		'zzz',
		'map-pin-3',
		'treasure-map',
		'earth',
		'globe',
		'car',
		'sailboat',
		'ship',
		'footprint',
		'lifebuoy',
		'cup',
		'landscape',
		'music',
		'music-2',
		'star',
		'settings-3',
		'checkbox-blank-circle',
		'checkbox-blank',
		'delete-bin-5',
		'lock',
		'history',
		'thumb-up',
		'thumb-down',
		'user',
		'user-2',
		'user-3',
		'user-4',
		'user-5',
		'user-6',
		'group',
		'user-voice',
		'emotion',
		'emotion-happy',
		'emotion-normal',
		'emotion-unhappy',
		'emotion-sad'
	];

	let words = ['Awesome', 'Epic', 'Evil', 'Sorcerer', 'Wizard', 'Bbeg', 'Npc'];
	let colors = ['purple', 'lightgreen', 'lightblue', 'red', 'yellow', 'darkblue', 'darkgreen'];
	function handleSubmit() {
		submit = true;
		if (bookName.length && bookClass && bookColor && bookLevel && bookColor) {
			let saveId;
			if ($bookToEdit) {
				saveId = $bookToEdit.id;
				save();
			} else {
				saveId = $user.id + '_' + Date.now();
				save();
			}
			function save() {
				$localUserLibrary[saveId] = {
					id: saveId ? saveId : $user.id + '_' + Date.now(),
					name: bookName,
					tags: bookTags,
					class: bookClass,
					icon: bookIcon,
					color: bookColor,
					level: bookLevel,
					published: bookPublished ? bookPublished : false,
					user: $user.username,
					user_id: $user.id,
					date_created: bookDateCreated ? bookDateCreated : Date.now(),
					date_edited: Date.now(),
					list: bookList.length ? bookList : []
				};
				$localUserLibrary = $localUserLibrary;
				$modalCall = '';
				if (!$bookToEdit) {
					$openBooksIdsArray = [...$openBooksIdsArray, saveId];
					$activeOpenBookId = saveId;
					$view = 'spellbook';
				} else {
					$bookToEdit = '';
					$lookupBookId = '';
				}
			}
		} else {
			$notification = 'Please fill out all fields (tags are not required)#error';
		}
	}

	function addTag(tag) {
		if (bookTags && bookTags.length > 7) {
			$notification = 'You can apply a maximum of eight tags.#info';
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

<form
	on:keydown={(e) => (e.key == 'Enter' ? e.preventDefault() : '')}
	on:submit|preventDefault
	style="--bookcolor: {bookColor ? bookColor : 'var(--white)'}"
>
	<h2>
		<i class="ri-bookmark-{bookColor ? 'fill' : 'line'}" />
		{$bookToEdit ? 'Edit spellbook' : 'New spellbook'}
	</h2>
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
	<div style="border-radius: var(--medium-radius)" class:missing={!bookName?.length && submit}>
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
				(tagResults = allowedTags.filter((el) =>
					el.toLowerCase().includes(tagSearch.toLowerCase())
				))}
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
			{#each colors as color}
				<input type="radio" bind:group={bookColor} name="color" id={color} value="var(--{color})" />
				<label for={color} name="color" id={color} style="background-color: var(--{color})" />
			{/each}
		</div>
	</div>
	<div class="column icons" class:missing={!bookIcon && submit}>
		<label for="icon">Icon</label>
		<div class="icon_picker">
			{#each icons as icon}
				<input bind:group={bookIcon} id={icon} name="icon" value={icon} type="radio" />
				<label for={icon}><i class="ri-{icon}-fill" style="color: {bookColor}" /></label>
			{/each}
		</div>
	</div>
	<div style="margin-top: 2rem; text-align: center">
		{#if $bookToEdit}
			<div>
				<Button
					on:click={() => handleSubmit()}
					text="Save changes"
					icon="ri-save-line"
					type="fill accent"
				/>
				<Button
					on:click={() => {
						$modalCall = '';
						$bookToEdit = '';
						$lookupBookId = '';
					}}
					text="Cancel"
					icon="ri-close-line"
					type="fill"
				/>
			</div>
		{:else}
			<Button
				on:click={() => handleSubmit()}
				text="Create spellbook"
				icon="ri-add-line"
				type="fill accent"
			/>
		{/if}
	</div>
</form>

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
	label {
		margin-bottom: 0.5rem;
	}
	.row {
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
	.icons {
		.icon_picker {
			display: grid;
			gap: 0.3rem;
			grid-template-columns: repeat(auto-fit, minmax(45px, 1fr));
			justify-content: space-between;
			gap: 0.3rem;
			label {
				// aspect-ratio: 1 / 1;
				// border-radius: 6px;
				cursor: pointer;
				border: 2px solid transparent;
				transition: 0.05s;
				display: flex;
				justify-content: center;
				align-items: center;
				i {
					font-size: 2.7rem;
					transition: 0.15s;
					color: var(--lesstranslucent);
				}
			}
			input {
				display: none;
				&:checked + label {
					i {
						filter: drop-shadow(2px 0px 0px var(--onbackground))
							drop-shadow(-2px 0px 0px var(--onbackground))
							drop-shadow(0px 2px 0px var(--onbackground))
							drop-shadow(0px -2px 0px var(--onbackground));
					}
				}
			}
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
