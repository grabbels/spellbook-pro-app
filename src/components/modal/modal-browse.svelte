<script>
	import { onMount } from 'svelte';
	import { browseFilter } from '../../stores';
	import PocketBase from 'pocketbase';
	import BrowseBookSlot from '../browse/browse-bookSlot.svelte';
	const pb = new PocketBase('https://db.spellbook.pro');
	let pageNum = 1;
	let filterString;
	let books = [];
	let classFilter;
	let levelFilter;
	if ($browseFilter.character_class) {
		classFilter = $browseFilter.character_class.toLowerCase();
	}
	if ($browseFilter.character_level) {
		classFilter = $browseFilter.character_level;
	}

	async function getBooksWithFilter() {
		filterString = '';
		for (const key in $browseFilter) {
			if (filterString) {
				if (key == 'character_level') {
					filterString = filterString + '&& ' + key + ' = ' + $browseFilter[key];
				} else {
					filterString = filterString + '&& ' + key + ' = "' + $browseFilter[key] + '"';
				}
			} else {
				if (key == 'character_level') {
					filterString = 'public = true && ' + key + ' = ' + $browseFilter[key];
				} else {
					filterString = 'public = true && ' + key + ' = "' + $browseFilter[key] + '"';
				}
			}
            console.log(filterString)
		}
		try {
			const resultList = await pb.collection('spellbooks').getList(pageNum, 10, {
				filter: filterString
			});
			books = resultList.items;
			console.log(books);
		} catch (error) {
			console.log(error);
		}
	}

	onMount(() => {
		getBooksWithFilter();
	});

	function handleChange() {
		console.log('test');
		if (classFilter) {
			$browseFilter.character_class = classFilter;
			console.log(classFilter);
		}
		if (levelFilter) {
			$browseFilter.character_level = levelFilter;
		}
		getBooksWithFilter();
	}
</script>

<h2 style="margin-left: 2rem">Browse books</h2>
<div class="filters">
	<h4>Filters</h4>
	<div class="filter class">
		<label for="class">Character class</label>
		<select name="class" id="class" bind:value={classFilter} on:change={() => handleChange()}>
			<option value="" selected>Filter by class...</option>
			<option value="wizard">Wizard</option>
			<option value="sorcerer">Sorcerer</option>
			<option value="warlock">Warlock</option>
			<option value="druid">Druid</option>
			<option value="bard">Bard</option>
			<option value="artificer">Artificer</option>
			<option value="ranger">Ranger</option>
			<option value="rogue">Rogue</option>
			<option value="paladin">Paladin</option>
			<option value="fighter">Fighter</option>
			<option value="monk">Monk</option>
		</select>
	</div>
	<div class="filter level">
		<label for="level">Character level</label>

		<select name="level" id="level" bind:value={levelFilter} on:change={() => handleChange()}>
			<option value="" selected>Filter by level...</option>
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
			<option value="7">7</option>
			<option value="8">8</option>
			<option value="9">9</option>
			<option value="10">10</option>
			<option value="11">11</option>
			<option value="12">12</option>
			<option value="13">13</option>
			<option value="14">14</option>
			<option value="15">15</option>
			<option value="16">16</option>
			<option value="17">17</option>
			<option value="18">18</option>
			<option value="19">19</option>
			<option value="20">20</option>
		</select>
	</div>
</div>
<div class="list">
	{#each books as book}
		<BrowseBookSlot data={book} />
	{/each}
</div>

<style lang="scss">
	.filters {
		padding: 1rem;
		margin-bottom: 1rem;
		background-color: var(--moretranslucent);
		border-radius: var(--large-radius);
		h4 {
			margin: 0 0 0.5rem;
		}
		.filter {
			&:last-child {
				select {
					margin-bottom: 0;
				}
			}
		}
	}
</style>
