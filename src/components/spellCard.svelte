<script>
	import { fade } from 'svelte/transition';
	import { addSpell, lookupSpell, modalCall, notification, spellList } from '../stores';
	import {
		activeOpenBookId,
		localUserLibrary,
		localUserNotes,
		localUserPreferences,
		localUserPreparedSpells,
		openBooksIdsArray,
		spells
	} from '../stores-persist';
	import Button from './button.svelte';
	import Pill from './pill.svelte';
	import Schoolicon from './schoolicon.svelte';
	import { onMount } from 'svelte';
	export let type;
	export let data;
	let description = data.description;
	export let nobuttons = false;
	export let id = '';
	let editNote = false;

	let noteText, noteTextArea, scrollHeight;
	let fadeDuration = 0;

	function preparedAddRemove() {
		if (
			$localUserPreparedSpells[$activeOpenBookId] &&
			$localUserPreparedSpells[$activeOpenBookId].includes(data.id)
		) {
			$localUserPreparedSpells[$activeOpenBookId].splice(
				$localUserPreparedSpells[$activeOpenBookId].indexOf(data.id),
				1
			);
			if ($localUserPreparedSpells[$activeOpenBookId].length < 1) {
				delete $localUserPreparedSpells[$activeOpenBookId];
			}
			$localUserPreparedSpells = $localUserPreparedSpells;
		} else {
			if (!$localUserPreparedSpells[$activeOpenBookId]) {
				$localUserPreparedSpells[$activeOpenBookId] = [];
				$localUserPreparedSpells[$activeOpenBookId] = [
					...$localUserPreparedSpells[$activeOpenBookId],
					data.id
				];
				$localUserPreparedSpells = $localUserPreparedSpells;
			} else {
				$localUserPreparedSpells[$activeOpenBookId] = [
					...$localUserPreparedSpells[$activeOpenBookId],
					data.id
				];
				$localUserPreparedSpells = $localUserPreparedSpells;
			}
		}
	}

	function handleNote() {
		editNote = true;
		noteText =
			$localUserNotes.spells && $localUserNotes.spells[data.id]
				? $localUserNotes.spells[data.id]
				: '';
		setTimeout(() => {
			noteTextArea.focus();
		}, 1);
	}
	function saveNote() {
		!$localUserNotes.spells ? ($localUserNotes.spells = {}) : '';
		$localUserNotes.spells[data.id] = noteText;
		editNote = false;
	}
	function cancelNote() {
		editNote = false;
	}

	const findIndices = (str, char) =>
		str.split('').reduce((indices, letter, index) => {
			letter === char && indices.push(index);
			return indices;
		}, []);

	function replaceAt(str, index, ch) {
		return str.replace(/./g, (c, i) => (i == index ? ch : c));
	}
	let spellLinksArray = [];
	if (type === 'embed') {
		let openBrackets = findIndices(description, '[');
		let closeBrackets = findIndices(description, ']');
		if (openBrackets.length > 0) {
			for (let i = openBrackets.length - 1; i >= 0; i--) {
				let spellName = description.substr(
					openBrackets[i] + 1,
					closeBrackets[i] - openBrackets[i] - 1
				);
				let spell = $spells.find((o) => o.name.toLowerCase() == spellName);
				spellLinksArray = [...spellLinksArray, spell];
				console.log(spellLinksArray);
				let openTag = '<button data-id=' + spell.id + ' class="spell_link href accent">';
				let closeTag = '</button>';
				description = replaceAt(description, closeBrackets[i], closeTag);
				description = replaceAt(description, openBrackets[i], openTag);
			}
			spellLinksArray = spellLinksArray.reverse()
		}
	}

	onMount(() => {
		let spellLinks = document.querySelectorAll('button.spell_link');
		for (let i = spellLinks.length - 1; i >= 0; i--) {
			spellLinks[i].addEventListener('click', (e) => {
				e.stopPropagation();
				$lookupSpell = spellLinksArray[i];
			});
		}
	});
</script>

{#if data}
		<button
			class="card {type}"
			{id}
			data-id={data.id}
			data-range={data.range}
			data-casting-time={data.casting_time}
			data-duration={data.duration}
			data-save={data.save}
			on:click={() => {
				if (type !== 'small' && type !== 'embed') {
					$lookupSpell = data;
					$modalCall = 'spell';
				}
			}}
		>
			{#if type === 'list' && data.level > 0}
				<button
					on:click|stopPropagation={() => preparedAddRemove()}
					class:active={$localUserPreparedSpells[$activeOpenBookId] &&
						$localUserPreparedSpells[$activeOpenBookId].includes(data.id)}
					class="prepared"
				/>
			{/if}
			<div class="card_inner">
				<!-- {#if type == 'list' && $localUserLibrary.notes && $localUserLibrary.notes[data.id]}
				<i class="has_note ri-sticky-note-fill" />
			{/if} -->
				<div class="block title">
					<h2>
						<div class="icon">
							<Schoolicon
								type={type === 'list' || type === 'small' ? 'small' : ''}
								school={data.school}
							/>
						</div>
						{data.name}
					</h2>
				</div>
				{#if type !== 'small'}
					<div class="block pills">
						<Pill
							type={type === 'embed' ? 'fill' : 'discreet'}
							text={data.casting_time}
							icon="ri-flashlight-line"
							label="Casting time"
						/>
						<Pill
							type={type === 'embed' ? 'fill' : 'discreet'}
							text={data.range}
							icon="ri-arrow-right-up-line"
							label="Range"
						/>
						<Pill
							type={type === 'embed' ? 'fill' : 'discreet'}
							text={data.duration}
							icon="ri-time-line"
							label="Duration"
						/>
					</div>
					<div class="block pills" style="margin-bottom: .7rem">
						<Pill
							type="small {type === 'embed' ? 'fill' : 'discreet'}"
							text={data.type}
							icon="ri-book-2-line"
							label="Level and school of magic"
						/>
						{#if data.save}
							<Pill
								type="small {type === 'embed' ? 'fill' : 'discreet'}"
								text={data.save}
								icon="ri-lifebuoy-line"
								label="Range"
							/>
						{/if}
						<!-- <Pill type="small" text={data.duration} icon="ri-time-line" label="Duration" /> -->
					</div>
					{#if type === 'embed' || (type === 'list' && $localUserPreferences.spellDescription === true)}
						<div class="block description">
							<div class="description_inner">
								{@html description}
							</div>
						</div>
						{#if editNote === true || ($localUserNotes.spells && $localUserNotes.spells[data.id])}
							<div class="block note" class:edit={editNote}>
								<h4><i class="ri-sticky-note-line" /> Note</h4>
								{#if $localUserNotes.spells && $localUserNotes.spells[data.id] && editNote !== true}
									<p>{$localUserNotes.spells[data.id]}</p>
								{:else if editNote === true}
									<textarea
										maxlength="500"
										bind:this={noteTextArea}
										bind:value={noteText}
										name="note"
										id="note"
										on:input={() => (scrollHeight = noteTextArea.scrollHeight)}
										style="height: {scrollHeight}px"
									/>
								{/if}
							</div>
						{/if}
						{#if nobuttons == false}
							<div class="block buttons" style="margin-top: 2rem; pointer-events: auto">
								{#if $localUserNotes.spells && $localUserNotes.spells[data.id] && editNote !== true}
									<Button
										text="Edit note"
										icon="ri-edit-2-line"
										type="outline darkgreen"
										on:click={() => handleNote()}
									/>
								{:else if editNote === true}
									<Button
										text="Save note"
										icon="ri-save-line"
										type="fill darkgreen"
										on:click={() => saveNote()}
									/>
								{:else}
									<Button
										text="Note"
										icon="ri-sticky-note-line"
										type="outline darkgreen"
										on:click={() => handleNote()}
									/>
								{/if}
								{#if editNote === true}
									<Button
										text="Cancel"
										icon="ri-close-line"
										type="outline"
										on:click={() => cancelNote()}
									/>
								{:else if JSON.stringify($spellList).includes(data.id)}
									<Button
										text="Remove spell"
										icon="ri-close-line"
										type="outline red"
										on:click={() => {
											$localUserLibrary[$activeOpenBookId].list = $localUserLibrary[
												$activeOpenBookId
											].list.filter((o) => o !== data.id);
											$modalCall = '';
										}}
									/>
								{:else}
									<Button
										text="Add to spellbook"
										icon="ri-add-line"
										type="outline accent"
										on:click={() => {
											$addSpell = data.id;
										}}
									/>
								{/if}
							</div>
						{/if}
					{/if}
				{/if}
			</div>
		</button>
{/if}

<style lang="scss">
	.card {
		text-align: left;
		.prepared {
			position: absolute;
			top: 1.4rem;
			right: 1.2rem;
			height: 17px;
			width: 17px;
			border-radius: 50vh;
			background-color: var(--moretranslucent);
			&.active {
				background-color: var(--accent);
			}
		}
		.has_note {
			position: absolute;
			top: 1rem;
			right: 1rem;
			color: var(--darkgreen);
			opacity: 0.5;
		}
		.block.pills {
			margin-bottom: 0.3rem;
			display: flex;
			gap: 0.3rem;
			flex-wrap: wrap;
		}
		.block.note {
			padding: 1rem;
			// background-color: rgb(62, 56, 51);
			background-color: var(--darkgreen);
			box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
			border-radius: var(--large-radius);
			margin-top: 2rem;
			pointer-events: auto;
			// color: var(--);
			h4 {
				margin-left: -2px;
				margin-top: 0;
				i {
					vertical-align: -5px;
					font-size: 1.4rem;
				}
			}
			p {
				margin-bottom: 0.2rem;
				white-space: pre-wrap;
			}
			textarea {
				resize: none;
				background-color: var(--moretranslucent);
				border: none;
				color: var(--onbackground);
				min-height: 100px;
				max-height: 200px;
			}
			// border-radius: var(--small-radius);
		}
		&.small {
			width: 100%;
			.card_inner {
				.block.title {
					h2 {
						display: flex;
						font-size: 1rem;
						font-weight: 300;
						margin-bottom: 0.3rem;
						color: var(--lesstranslucent);
						.icon {
							margin-top: -0.13rem;
							margin-left: 0.1rem;
							margin-right: 0.2rem;
						}
					}
				}
			}
		}
		&.embed {
			pointer-events: none;
			.card_inner {
				padding: 0;
				.block.title {
					h2 {
						max-width: 90%;
						.icon {
							display: inline-block;
							// margin-left: -5px;
							margin-right: 0.2rem;
							vertical-align: -3px;
						}
					}
				}
				.block.description {
					pointer-events: auto;
					cursor: default;
					.spell_link {
						cursor: pointer;
					}
				}
			}
		}
		&.list {
			background-color: var(--cardbg);
			border-radius: 0;
			position: relative;
			overflow: hidden;
			margin: 0.4rem 0.8rem;
			padding: 0.5rem 0.8rem;
			border-radius: var(--huge-radius);
			.card_inner {
				margin: 0 0.5rem;
				padding: 0.7rem 0 0.2rem;
				.block.title {
					h2 {
						font-size: 1.3rem;
						margin-bottom: 0.5rem;
						.icon {
							display: inline-block;
							margin-left: 1px;
							vertical-align: 1px;
						}
					}
				}
				.block.description {
					opacity: 0.7;
					max-height: 100px;
					mask-image: linear-gradient(180deg, black calc(100% - 2rem), transparent 100%);
					margin-bottom: 0.7rem;
					.description_inner {
						// height: 100%;
						p {
							font-size: 0.95rem;
						}
					}
				}
			}
			&:last-child {
				.card_inner {
					border-bottom: 0;
				}
			}
		}
		&.shadow {
			box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
		}
	}
</style>
