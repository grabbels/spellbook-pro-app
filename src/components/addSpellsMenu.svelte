<script>
	import { slide } from 'svelte/transition';
	import {
		addSpellsMenuOpen,
		horizontalSwipe,
		notification,
		view,
		visualViewport
	} from '../stores';
	import { spells } from '../stores-persist';
	import Button from './button.svelte';
	import SafeViewPadding from './safeViewPadding.svelte';
	import SearchField from './searchField.svelte';
	import SearchResult from './searchResult.svelte';
	let input;
	let query;
	let results = [];
	$: if ($addSpellsMenuOpen) {
		console.log(input);
		if (input) {
			input.focus();
		}
	} else {
		query = '';
	}
	function handleBlur() {
		// $addSpellsMenuOpen = false;
	}
	$: if (query) {
		results = [];
		query = query.toLowerCase();
		for (let i = 0; i < $spells.length; i++) {
			if ($spells[i].name.toLowerCase().includes(query)) {
				results.push($spells[i]);
			}
		}
	} else {
		results = [];
	}
	let touchMove = false;
	let blur = false;
	let touchStart, screenWidth;
	function handleTouchStart(e) {
		touchMove = true;
		touchStart = e.touches[0].clientX;
	}
	function handleTouchMove(e) {
		if (touchStart / screenWidth > 0.88) {
			if (e.touches[0].clientX < touchStart) {
				$horizontalSwipe = (e.touches[0].clientX - touchStart) / screenWidth + 1;
			}
		}
	}
	function handleTouchEnd(e) {
		if ($horizontalSwipe < 0.6 && $horizontalSwipe > 0.1) {
			console.log($horizontalSwipe);
			$addSpellsMenuOpen = false;
			touchStart = 0;
			$horizontalSwipe = 0;
			input.blur();
		} else {
			touchStart = 0;
			$horizontalSwipe = 0;
		}
	}
</script>

<div
	class:open={$addSpellsMenuOpen}
	class="ui-add_spells_menu"
	style="height: {$visualViewport.height}px"
	on:touchmove={(e) => handleTouchMove(e)}
	on:touchstart={(e) => handleTouchStart(e)}
	on:touchend={(e) => handleTouchEnd(e)}
	bind:clientWidth={screenWidth}
>
	<SafeViewPadding nooverflow side="bottom">
		<div class="inner">
			<div class="input_wrapper">
				<SearchField
					bind:field={input}
					placeholder="Search spells..."
					bind:value={query}
					on:blur={() => (blur = true)}
					on:focus={() => (blur = false)}
				/>
				<!-- <button class="close" on:click={() => ($addSpellsMenuOpen = false)}>
					<i class="ri-close-line" />
				</button> -->
			</div>
			<div class="scroll_wrap">
				<ul>
					{#if results.length > 0}
						{#each results as result}
							<SearchResult type="add" data={result} />
						{/each}
					{:else if query}
						<SearchResult type="add" data="noresult" />
					{/if}
				</ul>
			</div>
		</div>
	</SafeViewPadding>
	{#if blur || !query}
		<div in:slide class="close_panel">
			<Button
				on:click={() => ($addSpellsMenuOpen = false)}
				icon="ri-arrow-right-s-line"
				text="Back"
				type="outline"
			/>
		</div>
	{/if}
</div>

<style lang="scss">
	.ui-add_spells_menu {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: linear-gradient(180deg, var(--cardbg) 0%, var(--panelbg) 100%);
		z-index: 200;
		transform: translateX(-100%);
		transition: 0.4s;
		pointer-events: auto;
		overflow: hidden;
		&:before {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0;
			width: 2rem;
			background: linear-gradient(270deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%);
			z-index: -1;
		}
		&:after {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			background-color: var(--darkener);
			z-index: -1;
		}
		.inner {
			width: 100%;
			margin-top: max(1rem, var(--safe-area-inset-top));
			pointer-events: auto;
			height: calc(100% - 1rem);
			padding: 0 1rem;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			position: relative;
			* {
				pointer-events: auto;
			}
			.input_wrapper {
				width: 100%;
				position: relative;
				input {
					width: 100%;
					&::placeholder {
						opacity: 1;
					}
				}
				button.close {
					position: absolute;
					right: 0.2rem;
					top: 50%;
					transform: translateY(-50%);

					display: flex;
					justify-content: center;
					align-items: center;
					padding: 0.5rem;
					i {
						background-color: var(--translucent);
						border-radius: 50vw;
						font-size: 1rem;
						opacity: 0.5;
						width: 20px;
						height: 20px;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
			.scroll_wrap {
				height: 100%;
				overflow-y: auto;
				overflow-x: hidden;
				touch-action: none;
				padding-bottom: calc(var(--safe-area-inset-bottom) + 2.5rem);
				ul {
					// padding: 1rem;
					overflow-y: auto;
				}
			}
		}
		.close_panel {
			text-align: center;
			position: fixed;
			width: 100%;
			// height
			left: 0;
			right: 0;
			bottom: 2rem;
		}
	}
</style>
