<script>
	import { modalCall, view, tabPanelOpen, visualViewport, zoomOutModifier, notification } from '../../stores';
	import { activeOpenBookId, localUserLibrary, openBooksIdsArray } from '../../stores-persist';
	import Button from '../button.svelte';
	import Pill from '../pill.svelte';
	let touchStart, touchEnd, currentPos, direction, touchDrag, panelHeight;
	function handleTouchStart(e) {
		touchStart = e.touches[0].screenY;
		touchDrag = true;
	}
	function handleTouchMove(e) {
		if (e.touches[0].screenY > touchStart) {
			currentPos = e.touches[0].screenY - touchStart;
			$zoomOutModifier = Math.max(0, Math.min((currentPos / panelHeight) * 3, 1));
		} else {
			currentPos = 0;
		}
		touchEnd = e.touches[0].screenY;
	}
	function handleTouchEnd(e) {
		touchDrag = false;
		if (touchEnd > touchStart + 200) {
			$tabPanelOpen = false;
			touchStart = 0;
			touchEnd = 0;
			currentPos = 0;
			$zoomOutModifier = 0;
		} else {
			touchStart = 0;
			touchEnd = 0;
			currentPos = 0;
			$zoomOutModifier = 0;
		}
	}
</script>

<div
	class="ui-mobile_tab_panel"
	bind:clientHeight={panelHeight}
	on:touchstart={(e) => handleTouchStart(e)}
	on:touchmove={(e) => handleTouchMove(e)}
	on:touchend={(e) => handleTouchEnd(e)}
	class:open={$tabPanelOpen}
	style="{touchDrag ? 'transition: 0s;' : 'transition: .4s;'} transform: translateY({touchDrag
		? currentPos + 'px'
		: $tabPanelOpen === false
		? '100%'
		: $tabPanelOpen === true
		? '0'
		: ''})"
>
	<div class="inner">
		<div class="handle">
			<button on:click={() => ($tabPanelOpen = false)}>
				<div class="chevron">
					<span
						style="transform: rotate({$zoomOutModifier * 45}deg) translateX({$zoomOutModifier *
							5.5}px);"
					/>
					<span
						style="transform: rotate({$zoomOutModifier * 45 * -1}deg) translateX({$zoomOutModifier *
							5.5 *
							-1}px);"
					/>
				</div>
			</button>
		</div>
		<h4>Open spellbooks</h4>
		<div class="tabs">
			{#each $openBooksIdsArray as openSpellbookId}
			 {#if JSON.stringify($localUserLibrary).includes(openSpellbookId)}
				<button
					on:click={() => {
						$activeOpenBookId = openSpellbookId;
						$tabPanelOpen = false;
					}}
					class="tab"
					class:active={openSpellbookId === $activeOpenBookId}
					style="--bookcolor: {$localUserLibrary[openSpellbookId].color}"
				>
					<div class="tab_inner">
						<div class="title">
							<div class="icon">
								<i class="ri-{$localUserLibrary[openSpellbookId].icon}-fill" />
							</div>
							<span>{$localUserLibrary[openSpellbookId].name.toString().replaceAll(',', ' ')}</span>
							<div class="close"><button on:click|stopPropagation={()=>{
								$openBooksIdsArray.splice($openBooksIdsArray.indexOf(openSpellbookId), 1)
								$openBooksIdsArray = $openBooksIdsArray
							}}><i class="ri-close-line" /></button></div>
						</div>
						<!-- <div class="pills">
							<Pill
								text={$localUserLibrary[openSpellbookId].class}
								icon="ri-contacts-line"
								type="small fill"
							/>
							<Pill
								text="Level {$localUserLibrary[openSpellbookId].level}"
								icon="ri-user-star-line"
								type="small fill"
							/>
						</div> -->
					</div>
				</button>
				{/if}
			{/each}
		</div>
		<div class="buttons">
			<Button
				text="New book"
				icon="ri-add-line"
				type="fill accent"
				on:click={() => {
					if (Object.keys($localUserLibrary).length < 12) {
						$modalCall = 'new';
					} else {
						$notification = 'You have reached the maximum of 12 spellbooks.#info';
					}
				}}
			/>
			<Button
				text="Library"
				icon="ri-book-mark-line"
				type="fill blue"
				on:click={() => {
					$tabPanelOpen = false;
					$view = 'library';
				}}
			/>
		</div>
	</div>
</div>

<style lang="scss">
	.ui-mobile_tab_panel {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: calc(100% - 1.5rem - var(--safe-area-inset-top));
		background-color: var(--panelbg);
		z-index: 250;
		box-shadow: 0 3px 20px rgba(0, 0, 0, 0.5);
		border-radius: var(--large-radius) var(--large-radius) 0 0;
		pointer-events: auto;

		.inner {
			padding: 0 1rem 1rem;
			display: grid;
			grid-template-rows: 45px auto 1fr;
			height: 100%;
			h4 {
				text-align: center;
				margin: -0.3rem 0 1rem;
			}
			.handle {
				button {
					width: 100%;
					text-align: center;
					height: 100%;
					.chevron {
						display: inline-block;
						height: 100%;
						width: 35px;
						position: relative;
						transform: scale(0.9);
						opacity: 0.2;
						span {
							height: 3px;
							width: 50%;
							background-color: var(--onbackground);
							top: calc(50% - 1.5px);
							display: block;
							position: absolute;

							&:first-child {
								left: 0;
								border-radius: 50vh 0 0 50vh;
							}
							&:last-child {
								right: 0;
								border-radius: 0 50vh 50vh 0;
							}
						}
					}
				}
			}
			.tabs {
				grid-template-columns: 1fr;
				grid-auto-rows: max-content;
				display: grid;
				grid-gap: 0.3rem;
				button.tab {
					// background-color: var(--moretranslucent);
					border-radius: var(--medium-radius);
					overflow: hidden;
					height: 100%;
					display: flex;
					align-items: center;
					// border: 2px solid transparent;
					position: relative;
					transition: 0.15s;
					box-sizing: border-box;
					// padding: 2px;
					// min-height: 100px;
					&:after {
						content: '';
						position: absolute;
						left: 0;
						top: 0;
						right: 0;
						bottom: 0;
						background-color: var(--bookcolor);
						z-index: -1;
						opacity: 0.2;
					}
					.tab_inner {
						width: 100%;
						padding: 0.7rem;
						.title {
							height: auto;
							text-transform: capitalize;
							display: grid;
							grid-template-columns: 16px 1fr 16px;
							align-items: center;
							gap: 0.3rem;
							font-weight: 400;
							width: 100%;
							span {
								text-align: center;
								display: inline-block;
								// margin-top: -px;
								// line-height: 1;
							}
							i {
								// height: 20px;
								// width: 20px;
								display: inline-block;
							}
							.icon {
								i {
									color: var(--bookcolor);
									font-size: 1.3rem;
								}
							}
							.close {
								i {
									font-size: 1.3rem;
									opacity: 0.5;
								}
							}
						}
						.pills {
							display: flex;
							width: 100%;
							justify-content: space-around;
							gap: 0.2rem;
						}
					}
					&.active {
						border: 2px solid var(--bookcolor);
						// background-color: var(--bookcolor);
					}
				}
			}
			.buttons {
				position: absolute;
				bottom: calc(var(--safe-area-inset-bottom) + 1rem);
				left: 1rem;
				right: 1rem;
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 0.3rem;
			}
		}
	}
</style>
