<script>
	import { fade } from 'svelte/transition';
	import { allowedTags } from '../tags';
	export let placeholder = '';
	export let value = [];
	let newWord = '';
	let input = [];
	let activeInput;
	let newWordAtEnd;
	let suggestions = [];
	$: if (newWord) {
		newWord = newWord.toLowerCase();
		suggestions = allowedTags.filter((el) => el.toLowerCase().includes(newWord.toLowerCase()));
	} else {
		suggestions = '';
	}
	function handleEnter(e) {
		e.preventDefault();
		for (let i = 0; i < suggestions.length; i++) {
			if (suggestions[i].toLowerCase() == newWord.toLowerCase()) {
				console.log(activeInput);
				value.splice(activeInput, 0, newWord);
				value = value;
				if ((activeInput = value.length)) {
					console.log('moving on');
					activeInput + 2;
					newWord = '';
				} else {
					activeInput = null;
					newWord = '';
				}
			} else {
			}
		}
	}
	function handleBackspace(e) {
		if (!newWord) {
			console.log(activeInput);
			value.splice(activeInput - 1, 1);

			value = value;
			if (activeInput > 0) {
				activeInput--;
			}
		}
	}
</script>

<div
	class="input_wrapper"
	on:keydown={(e) =>
		e.key == 'Enter' ? handleEnter(e) : e.key == 'Backspace' ? handleBackspace(e) : ''}
>
	<button
		class="input"
		on:click={() => {
			activeInput = value.length;
			console.log(activeInput);
		}}
	>
		{#key value}
			{#each value as word, i}
				<li>
					<button
						class="inserter"
						on:click|stopPropagation={() => {
							activeInput = i;
						}}
					/>
					{#if activeInput === i}
						<!-- svelte-ignore a11y-autofocus -->
						<input
							class="new_word"
							type="text"
							bind:value={newWord}
							style="width: {newWord.length + 2}ch"
							autofocus
							on:focusout={() => {
								setTimeout(() => {
									activeInput = null;
									newWord = '';
								}, 10);
							}}
						/>
					{/if}
					<span>{word}</span>
				</li>
			{/each}
			{#if activeInput === value.length}
				<!-- svelte-ignore a11y-autofocus -->
				<li>
					<input
						class="new_word"
						type="text"
						bind:value={newWord}
						style="width: {newWord.length + 2}ch"
						autofocus
						on:focusout={() => {
							setTimeout(() => {
								activeInput = null;
								newWord = '';
							}, 10);
						}}
					/>
				</li>
			{/if}
		{/key}
	</button>
	{#if suggestions}
		<div transition:fade={{ duration: 150 }} class="suggestions">
			<ul>
				{#each suggestions as suggestion}
					<li>
						<button
							on:click={() => {
								value.splice(activeInput, 0, suggestion);
								value = value;
								if ((activeInput = value.length)) {
									console.log('moving on');
									activeInput + 2;
									newWord = '';
								} else {
									activeInput = null;
									newWord = '';
								}
							}}
						>
							{suggestion}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style lang="scss">
	div {
		position: relative;
		width: 100%;
		button {
			
			display: flex;
			flex-wrap: wrap;
			position: relative;
			height: auto;
			cursor: auto;
			gap: 0.3rem;
			cursor: text;
			min-height: 52px;
			padding: .4rem .8rem;
			width: 100%;
			li {
				position: relative;
				// margin-right: 0.3rem;
				display: flex;
				gap: 0.3rem;
				cursor: default;
                text-transform: capitalize;
			}
			span,
			input {
				font-family: 'Roboto Mono';
				// font-weight: 500;
				height: 34px;
				position: relative;
				display: inline-flex;
				// height: 100%;
				justify-content: center;
				margin-bottom: 0;
				align-items: center;
				// margin-right: 0.2rem;
				background-color: var(--moretranslucent);
				padding: 0 0.5rem;
				border-radius: 6px;
				min-height: 0;
				transition: 0s;
				&:focus {
					border-color: transparent;
				}
				&.new_word {
					transition: 0;
				}
			}
			input {
				background-color: transparent;
			}

			button.inserter {
				position: absolute;
				width: 1.5rem;
				left: -0.85rem;
				height: calc(100% + 1.5rem);
				top: -0.75rem;
				z-index: 2;
				cursor: text;
			}
		}
		.suggestions {
			width: calc(100% + 2rem);
			position: absolute;
			left: -1rem;
			top: 100%;
			z-index: 1;
			height: 100vh;
			// mask-image: linear-gradient(180deg, black 80%, transparent 100%);
			border-radius: 0 0 18px 18px;
			background-color: var(--panelbg);
			padding: 0.4rem 1.8rem 2rem;
			ul {
				display: flex;
				flex-wrap: wrap;
				gap: 0.3rem;
				max-height: 150px;
				overflow: hidden;
				justify-content: center;
				li {
					// margin-bottom: .3rem;
					button {
						font-family: 'Roboto Mono';
						height: 34px;
						display: inline-flex;
						justify-content: center;
						margin-bottom: 0;
						align-items: center;
						background-color: var(--moretranslucent);
						padding: 0 0.5rem;
						border-radius: 6px;
						min-height: 0;
						transition: 0s;
                        cursor: pointer;
						width: auto;
					}
				}
			}
		}
	}
</style>
