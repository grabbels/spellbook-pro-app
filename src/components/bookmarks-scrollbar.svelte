<script>
	import { sortedSpellsList, levelInView } from '../stores';
	import { Haptics, ImpactStyle } from '@capacitor/haptics';
	import { localUserLibrary } from '../stores-persist';
	let levelGroup = [];
	let spellGroup;
	let activeLevelGroup = null;
	let scrollbarActive = false;
	let levelGroupPositions = [];
	let totalSpells = 0;
	let totalLevels = 0;
	let scrollTimeOut = false;
	let previousAnchor;

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
				activeLevelGroup = element.closest('.sub_scrollbar');
				if (!scrollTimeOut && elementAnchor !== previousAnchor) {
					scrollTimeOut = true;
					hapticsImpactLight();
					if (document.getElementById(elementAnchor)) {
						document.getElementById(elementAnchor).scrollIntoView();
						previousAnchor = elementAnchor;
						setTimeout(() => {
							scrollTimeOut = false;
						}, 80);
					}
				}
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
	{#key $localUserLibrary}
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
					class:in_view={levelNumber == $levelInView}
				>
					{#each level as spell, i}
						{@const spellNumber = i}
						<div data-id={levelNumber + `${spellNumber}`} />
					{/each}
				</div>
			{/if}
		{/each}
	{/key}
</div>

<style lang="scss">
	div.bookmarks_scrollbar {
		position: absolute;
		right: 0;
		top: calc(var(--safe-area-inset-top) + 6rem);
		bottom: calc(var(--safe-area-inset-bottom) + 10rem);
		width: 5px;
		transition: 0.2s;
		pointer-events: auto;
		padding-right: 0.3rem;
		padding-left: 1.5rem;
		box-sizing: content-box;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		mix-blend-mode: lighten;
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
			&.in_view {
				background-color: var(--lightblue);
			}
			&:last-child {
				margin-bottom: 0;
			}
			&.focus {
				background-color: var(--lightblue);
				width: 25px;
				margin-left: -15px;
				// border-radius: 10px;
				div {
					&:after {
						// display: block;
						opacity: 0.15;
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
				overflow: hidden;
				&:after {
					opacity: 0;
					transition: 0.3s;
					content: '';
					position: absolute;
					right: 0px;
					bottom: calc(50% - 1px);
					width: 13px;
					height: 2px;
					border-radius: 50vh;
					background-color: var(--bodybg);
				}
			}
		}
	}
</style>
