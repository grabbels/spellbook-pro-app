<script>
	import { linear, quadInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import { filterPanelOpen, filters, spellList } from '../../stores';
	import Button from '../button.svelte';
	import SafeViewPadding from '../safeViewPadding.svelte';
	let saveFilters = [];
	let castingtimeFilters = [];
	let rangeFilters = [];
	$: $spellList, gatherFilters();

	function gatherFilters() {
		for (let i = 0; i < $spellList.length; i++) {
			if ($spellList[i].save) {
				!saveFilters.includes($spellList[i].save) ? saveFilters.push($spellList[i].save) : '';
			}
			if (
				$spellList[i].casting_time.toLowerCase().includes('action') &&
				!castingtimeFilters.includes('action')
			) {
				castingtimeFilters.push('action');
			}
			if (
				$spellList[i].casting_time.toLowerCase().includes('bonus') &&
				!castingtimeFilters.includes('bonus')
			) {
				castingtimeFilters.push('bonus');
			}
			if (
				$spellList[i].casting_time.toLowerCase().includes('reaction') &&
				!castingtimeFilters.includes('reaction')
			) {
				castingtimeFilters.push('reaction');
			}
			if (
				$spellList[i].range.toLowerCase().includes('feet') &&
				!rangeFilters.includes('feet')
			) {
				rangeFilters.push('feet');
			}
			if (
				$spellList[i].range.toLowerCase().includes('self') &&
				!rangeFilters.includes('self')
			) {
				rangeFilters.push('self');
			}
			if (
				$spellList[i].range.toLowerCase().includes('touch') &&
				!rangeFilters.includes('touch')
			) {
				rangeFilters.push('touch');
			}
		}
		console.log(rangeFilters)
	}
	// let castingTime, range, save;
	// $: if (castingTime || range || save) {
	// 	castingTime
	// 		? ($filters.casting_time = castingTime.toLowerCase())
	// 		: delete $filters.casting_time,
	// 		range ? ($filters.range = range.toLowerCase()) : delete $filters.range,
	// 		save ? ($filters.save = save.toLowerCase()) : delete $filters.save;
	// 	console.log($filters);
	// } else {
	// 	$filters = {};
	$: console.log($filters);
	// }

	function handleReset() {
		$filters = {};
		$filterPanelOpen = false;
	}
</script>

<div class:open={$filterPanelOpen} class="ui_mobile_filter_panel">
	<button class="close" on:click|stopPropagation={() => ($filterPanelOpen = false)}>
		<i class="ri-close-line" />
	</button>
	<div class="filters_inner">
		<h2><i class="ri-filter-line" /> Filter spellsheet</h2>
		{#if castingtimeFilters.length > 0}
			<h4>Casting time</h4>
			<div class="filter row castime-time">
				<input
					disabled
					type="radio"
					bind:group={$filters.casting_time}
					id="disabled"
					name="casting-time"
					value=""
				/>
				<label for="disabled" disabled><i class="ri-flashlight-line" /></label>
				{#each castingtimeFilters as castingtime}
					<input
						type="radio"
						bind:group={$filters.casting_time}
						id={castingtime}
						name="casting-time"
						value={castingtime}
					/>
					<label for={castingtime}>{castingtime}</label>
				{/each}
			</div>
		{/if}
		{#if rangeFilters.length > 0}
			<h4>Range</h4>
			<div class="filter row range">
				<input disabled type="radio" bind:group={$filters.range} name="range" value="" />
				<label for="disabled" disabled><i class="ri-arrow-right-up-line" /> </label>
				{#each rangeFilters as range}
					<input type="radio" bind:group={$filters.range} id={range} name="range" value={range} />
					<label for={range}>{range}</label>
				{/each}
				{#if $filters.range}
					<button
						class="reset_filter"
						on:click={() => {
							delete $filters.range;
							$filters = $filters;
						}}><i class="ri-close-line" /></button
					>
				{/if}
			</div>
		{/if}
		<h4>Saving throw</h4>
		{#if saveFilters.length > 0}
			<div class="filter row save">
				<input disabled type="radio" bind:group={$filters.save} name="save" value="" />
				<label for="disabled" disabled><i class="ri-lifebuoy-line" /> </label>
				{#each saveFilters as save}
					<input type="radio" bind:group={$filters.save} id={save} name="save" value={save} />
					<label for={save}>{save}</label>
				{/each}
				{#if $filters.save}
					<button
						class="reset_filter"
						on:click={() => {
							delete $filters.save;
							$filters = $filters;
						}}><i class="ri-close-line" /></button
					>
				{/if}
			</div>
		{/if}
		{#if Object.keys($filters).length}
			<div transition:slide={{ duration: 300 }} style="margin-top:1.5rem">
				<Button
					text="Remove filters"
					icon="ri-filter-off-line"
					type="outline red"
					on:click={() => handleReset()}
				/>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.ui_mobile_filter_panel {
		width: 100%;
		position: absolute;
		left: 0;
		right: 0;
		// height: 500px;
		background-color: var(--panelbg);
		bottom: 0;
		z-index: 9999;
		border-radius: 18px 18px 0 0;
		box-shadow: 0 3px 20px rgba(0, 0, 0, 0.5);
		transition: 0.4s;
		transform: translateY(100%);
		pointer-events: auto;
		padding-bottom: var(--safe-area-inset-bottom);
		&.open {
			transform: translateY(0);
		}
		button.close {
			position: absolute;
			right: 1rem;
			top: 1rem;
			i {
				font-size: 1.8rem;
				color: var(--lesstranslucent);
			}
		}
		.filters_inner {
			width: 100%;
			padding: 1.5rem 1rem;
			h2 {
				font-size: 1.2rem;
				i {
					vertical-align: -3px;
					margin-right: 0.2rem;
				}
			}
			h4 {
				margin: 0 0 0.3rem 0;
			}
			.filter {
				&.row {
					margin-bottom: 0.5rem;
					display: flex;
					input {
						display: none;
						&:checked {
							& + label {
								background-color: var(--darkblue);
								color: var(--onbackground);
							}
						}
					}
					label {
						padding: 0.9rem 0.7rem;
						background-color: var(--inputbg);
						color: var(--onbackground);
						display: inline-flex;
						justify-content: center;
						align-items: center;
						transition: 0.1s;
						cursor: pointer;
						i {
							font-size: 1.3rem;
						}
						&:first-of-type {
							border-radius: 12px 0 0 12px;
						}
						// &:nth-child(2) {
						//     border-radius: 12px 0 0 12px;
						// }
						&:last-of-type {
							border-radius: 0 12px 12px 0;
							padding-right: 1rem;
						}
					}
					button {
						padding: 0.5rem 0.8rem;

						i {
							font-size: 1.3rem;
							color: var(--lesstranslucent);
						}
					}
				}
			}
		}
	}
</style>
