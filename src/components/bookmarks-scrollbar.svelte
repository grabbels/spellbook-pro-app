<script>
	import { sortedSpellsList } from '../stores';
	import { Haptics, ImpactStyle } from '@capacitor/haptics';
	let levelGroup = [];
	let spellGroup;
	let activeLevelGroup;
	let scrollbarActive = false;
	let levelGroupPositions = [];
	let totalSpells = 0;
	let totalLevels = 0;

	$: for (let i = 0; i < $sortedSpellsList.length; i++) {
		totalSpells = totalSpells + $sortedSpellsList[i].length;
		if ($sortedSpellsList[i].length) {
			totalLevels++;
		}
	}

	function handleTouchStart(e) {
		scrollbarActive = true;
		activeLevelGroup = e.target.closest('.sub_scrollbar');
		// console.log( )
		// document.getElementById(e.target.dataset.id).scrollIntoView();
	}
	function handleTouchMove(e) {
		let element = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);

		if (element) {
			let elementAnchor = element.dataset.id;
			if (elementAnchor) {
                hapticsImpactLight()
				document.getElementById(elementAnchor).scrollIntoView();
				activeLevelGroup = element.closest('.sub_scrollbar');
			}
		}

		// document.getElementById(e.target.dataset.id).scrollIntoView();
	}
	function handleTouchEnd(e) {
		scrollbarActive = false;
		activeLevelGroup = null;
		console.log(e);
	}

	const hapticsImpactLight = async () => {
		await Haptics.impact({ style: ImpactStyle.Light });
	};
</script>

<div
	class="bookmarks_scrollbar"
	class:active={scrollbarActive}
	on:touchstart|preventDefault={(e) => handleTouchStart(e)}
	on:touchmove|preventDefault={(e) => handleTouchMove(e)}
	on:touchend|preventDefault={(e) => handleTouchEnd(e)}
>
	{#each $sortedSpellsList as level, i}
		{@const levelNumber = i}

		{#if level.length > 0}
			<!-- <div
				class="sub_scrollbar focus"
				style="height: {(level.length / totalSpells) * 100}%"
				bind:this={levelGroup[i]}
				
			> -->
			<div
				class="sub_scrollbar"
				style="height: {(level.length / totalSpells) * 100}%"
				bind:this={levelGroup[i]}
				class:focus={activeLevelGroup === levelGroup[i]}
			>
				{#each level as spell, i}
					{@const spellNumber = i}
					<div data-id={levelNumber + `${spellNumber}`} />
				{/each}
			</div>
		{/if}
	{/each}
</div>

<style lang="scss">
	div.bookmarks_scrollbar {
		position: absolute;
		right: 0;
		top: calc(var(--safe-area-inset-top) + 8rem);
		bottom: calc(var(--safe-area-inset-bottom) + 8rem);
		width: 5px;
		transition: 0.2s;
		pointer-events: auto;
		padding-right: 0.3rem;
		box-sizing: content-box;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		&.active {
			width: 10px;
			div {
				pointer-events: auto;
			}
		}
		div.sub_scrollbar {
			background-color: var(--cardbg);
			width: 100%;
			transition: 0.2s;
			border-radius: 5px;
			position: relative;
			height: auto;
			display: flex;
			flex-direction: column;
			height: auto;
			align-items: stretch;
			justify-content: stretch;
			pointer-events: none;
			&:last-child {
				margin-bottom: 0;
			}
			&.focus {
				background-color: var(--lightblue);
				width: 25px;
				margin-left: -15px;
				border-radius: 10px;
				div {
					&:after {
						// display: block;
						opacity: 1;
					}
				}
			}
			// height: 50px;
			div {
				// height: 50px;
				position: relative;
				margin-left: -95vw;
				flex: 1;
				width: 100vw;
				border-bottom: var(--onbackground);
				&:after {
					opacity: 0;
					transition: 0.3s;
					content: '';
					position: absolute;
					right: 0px;
					bottom: calc(50% - 2px);
					width: 13px;
					height: 2px;
					border-radius: 50vh;
					background-color: var(--translucent);
				}
			}
		}
	}
</style>
