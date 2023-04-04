<script>
	import { addSpellsMenuOpen, horizontalSwipe, notification, visualViewport } from '../stores';
	import { spells } from '../stores-persist';
	import SafeViewPadding from './safeViewPadding.svelte';
	import SearchField from './searchField.svelte';
	import SearchResult from './searchResult.svelte';
	let input;
	let query;
	let results = [];
	$: if ($addSpellsMenuOpen) {
		console.log(input)
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
</script>

<div
	class:open={$addSpellsMenuOpen}
	class="ui-add_spells_menu"
	style="height: {$visualViewport.height}px"
>
	<SafeViewPadding nooverflow side="bottom">
		<div class="inner">
			<div class="input_wrapper">
				<SearchField
					bind:field={input}
					placeholder="Search spells..."
					on:blur={() => handleBlur()}
					bind:value={query}
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
			height: 100%;
			padding: 0 1rem;
			overflow: hidden;

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
	}
</style>
