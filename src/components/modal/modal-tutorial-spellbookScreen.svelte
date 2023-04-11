<script>
	import Pill from '../pill.svelte';
	import Schoolicon from '../schoolicon.svelte';
	import SpellCard from '../spellCard.svelte';
	import { modalCall, visualViewport } from '../../stores';
	import Button from '../button.svelte';
	import { slide } from 'svelte/transition';
	import { Haptics, ImpactStyle } from '@capacitor/haptics';
	import Spellbook from '../../views/spellbook.svelte';

	let activeLi;
	let currentLi;
	let liList = [];
	let beforeHeight;
	let spellClicked = false;
	let firstTick = true;
	let listContainer;

	const hapticsImpactLight = async () => {
		await Haptics.impact({ style: ImpactStyle.Light });
	};

	$: if (activeLi !== currentLi) {
		if (firstTick === true) {
			firstTick = false;
			currentLi = activeLi;
		} else {
			hapticsImpactLight();
			currentLi = activeLi;
		}
	}

	function handleScroll() {
		activeLi = document
			.elementFromPoint($visualViewport.width / 2, beforeHeight + 100)
			.closest('li');
	}
</script>

<div class="tutorial_inner">
	<div class="before" bind:clientHeight={beforeHeight}>
		<div class="text">
			<h4>Tutorial</h4>
			<h1>Spellbook view</h1>
			<p>
				The main screen, or spellbook view to be more specific, displays the spells in the current
				opened spellbook.
			</p>
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="spell_container" on:click={() => (spellClicked = true)}>
			<div class="container_inner">
				<div
					class="phone"
					class:middle={activeLi === liList[4]}
					class:bottom={activeLi === liList[5]}
				>
					<div class="phone_inner">
						<div
							class="header"
							class:focus={activeLi == null ||
								activeLi === liList[0] ||
								activeLi === liList[1] ||
								activeLi === liList[2] ||
								activeLi === liList[3]}
						>
							<div class:focus={activeLi === liList[3]} class="add"><i class="ri-add-line" /></div>
							<div class:focus={activeLi === liList[1]} class="search">
								<p>Quick spell lookup...</p>
							</div>
							<div class:focus={activeLi === liList[2]} class="filter">
								<i class="ri-filter-line" />
							</div>
						</div>
						<div class="spells" class:focus={activeLi === liList[4]}>
							<div>
								<i style="color:var(--yellow)" class="ri-magic-line" />
							</div>
							<div>
								<i style="color:var(--lightblue)" class="ri-contrast-line" />
							</div>
							<div>
								<i style="color:var(--darkgreen)" class="ri-skull-line" />
							</div>
							<div>
								<i style="color:var(--red)" class="ri-fire-line" />
							</div>
							<div />
							<div />
						</div>
						<div class="tab_bar">
							<div class="icon"><i class="ri-book-open-line" /></div>
							<div class="name"><p>My awesome spellbook</p></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="text after">
		<!-- <ul
			on:touchstart={(e) => handleTouchStart(e)}
			on:touchend={(e) => handleTouchEnd(e)}
			on:touchmove={(e) => handleTouchMove(e)}
		> -->

		<ul bind:this={listContainer} on:scroll={() => handleScroll()}>
			<li bind:this={liList[0]} class:active={activeLi === liList[0] || activeLi == null}>
				<p>This is the header, where you can add, search and filter spells.</p>
			</li>
			<li bind:this={liList[1]} class:active={activeLi === liList[1]}>
				<p>With the quicksearch bar you can look up any spell in the heat of battle.</p>
			</li>
			<li bind:this={liList[2]} class:active={activeLi === liList[2]}>
				<p>
					With filters you can look for spells in your spellbook that fit specific needs, such as
					that pesky BBEG which is especially vulnerable to dex-saves...
				</p>
			</li>
			<li bind:this={liList[3]} class:active={activeLi === liList[3]}>
				<p>Use this button to add spells to your spellbook.</p>
			</li>
			<li bind:this={liList[4]} class:active={activeLi === liList[4]}>
				<p>
					These are the spells in the open spellbook. You'll learn more about them in the spells
					tutorial.
				</p>
			</li>
			<li bind:this={liList[5]} class:active={activeLi === liList[5]}>
				<p>
					And finally, this is the tab-bar. It shows the title of the current open spellbook. You can tap it to see and switch to other open spellbooks.
				</p>
				<div style="margin-top: 2rem">
				<Button on:click={() => ($modalCall = '')} text="Close" icon="ri-check-line" type="fill" />
				<Button on:click={() => ($modalCall = 'tutorial-spells')} text="Spells" icon="ri-arrow-right-s-line" type="fill accent" />
			</div>
			</li>
			<li bind:this={liList[6]} class:active={activeLi === liList[6]} />
		</ul>
	</div>
</div>

<style lang="scss">
	.tutorial_inner {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		// min-height: 100%;
		// max-height: 100%;
		height: 100%;
		.spell_container {
			padding: 1rem 0.5rem;
			margin-left: -1.5rem;
			// margin: 2.5rem 0 1.5rem -1rem;
			position: relative;
			width: calc(100% + 3rem);
			max-height: 200px;
			overflow: hidden;
			&:after {
				content: '';
				left: 0;
				top: 0;
				bottom: 0;
				right: 0;
				position: absolute;
				background-color: var(--bodybg);
				filter: brightness(0.8);
				z-index: -1;
			}
			.container_inner {
				width: 100%;
				display: flex;
				justify-content: center;
				.phone {
					width: 80%;
					max-width: 400px;
					aspect-ratio: 1 / 1.9;
					position: relative;
					background-color: var(--inputbg);
					border-radius: 7vw;
					border: 8px solid var(--lightbg);
					overflow: hidden;
					transition: 1s;
					&.middle {
						transform: translateY(-45%);
					}
					&.bottom {
						transform: translateY(-70%);
					}
					.phone_inner {
						.header {
							position: absolute;
							left: 1rem;
							top: 1rem;
							right: 1rem;
							height: 2.8rem;
							background-color: var(--lightbg);
							border-radius: 0.8rem;
							display: grid;
							gap: 0.2rem;
							grid-template-columns: 2.8rem 1fr 2.8rem;
							z-index: 2;
							opacity: 0.5;
							&.focus {
								opacity: 1;
							}
							i {
								font-size: 1rem;
							}
							.add {
								background-color: var(--accent);
								color: var(--onforeground);
								display: flex;
								justify-content: center;
								align-items: center;
								position: relative;
								border-radius: 0.8rem 0 0 0.8rem;
								&:after {
									content: '';
									position: absolute;
									left: -0.6rem;
									top: -0.3rem;
									right: -0.6rem;
									bottom: -0.3rem;
									border-radius: 12px;
									border: 3px solid var(--lightblue);
									z-index: 1;
									opacity: 0;
								}
								&.focus {
									&:after {
										animation: breathe 1.5s infinite;
									}
								}
							}
							.filter {
								background-color: var(--moretranslucent);
								display: flex;
								justify-content: center;
								align-items: center;
								position: relative;
								border-radius: 0 0.8rem 0.8rem 0;
								&:after {
									content: '';
									position: absolute;
									left: -0.6rem;
									top: -0.3rem;
									right: -0.6rem;
									bottom: -0.3rem;
									border-radius: 12px;
									border: 3px solid var(--lightblue);
									z-index: 1;
									opacity: 0;
								}
								&.focus {
									&:after {
										animation: breathe 1.5s infinite;
									}
								}
							}
							.search {
								display: flex;
								justify-content: flex-start;
								align-items: center;
								position: relative;
								p {
									margin: 0 0.4rem;
									font-size: 0.8rem;
									opacity: 0.5;
								}
								&:after {
									content: '';
									position: absolute;
									left: -0.6rem;
									top: -0.3rem;
									right: -0.6rem;
									bottom: -0.3rem;
									border-radius: 12px;
									border: 3px solid var(--lightblue);
									z-index: 1;
									opacity: 0;
								}
								&.focus {
									&:after {
										animation: breathe 1.5s infinite;
									}
								}
							}
						}
						.spells {
							width: 100%;
							padding: 1.3rem;
							position: absolute;
							top: 3rem;
							z-index: 1;
							opacity: 0.3;
							transition: 0.7s;
							&.focus {
								opacity: 1;
								i {
									opacity: 1;
								}
							}
							div {
								width: 100%;
								height: 100px;
								background-color: var(--lightbg);
								margin-bottom: 0.3rem;
								border-radius: 4vw;
								display: flex;
								justify-content: center;
								align-items: center;
								i {
									font-size: 3rem;
									opacity: 0.2;
									transition: 0.7s;
								}
							}
						}
						.tab_bar {
							position: absolute;
							bottom: 1rem;
							left: 1rem;
							right: 1rem;
							height: 2.6rem;
							border-radius: 2.5vw;
							background-color: var(--red);
							z-index: 2;
							display: grid;
							grid-template-columns: 2.6rem 1fr;
							overflow: hidden;
							&:after {
								content: '';
								top: 0;
								left: 0;
								bottom: 0;
								right: 0;
								position: absolute;
								background-color: var(--darkener);
							}
							.icon {
								z-index: 1;
								position: relative;
								display: flex;
								align-items: center;
								justify-content: center;
								i {
									height: 80%;
									width: 80%;
									display: block;
									display: flex;
									justify-content: center;
									align-items: center;
									background-color: var(--translucent);
									border-radius: 2.5vw;
								}
							}
							.name {
								width: 100%;
								position: relative;
								justify-content: center;
								align-items: center;
								display: flex;
								p {
									width: 100%;
									margin: -.1rem 0.5rem 0;
									text-align: center;
									font-weight: 400;
									z-index: 1;
									font-size: .95rem;
								}
							}
						}
					}
				}
			}
		}
		@keyframes breathe {
			0% {
				opacity: 0;
			}
			50% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		.text {
			width: 100%;
			margin-top: 1rem;
			h1 {
				margin-bottom: 1rem;
			}
			h4 {
				margin-left: 0;
			}
			padding: 0 1rem;

			&.after {
				height: 100%;
				overflow: hidden;
				// mask-image: linear-gradient(0deg, transparent 0%, transparent 40%, black 60%, black 100%);

				ul {
					padding-bottom: 100%;
					height: 100%;
					overflow-y: auto;
					scroll-snap-type: y mandatory;
					scroll-behavior: smooth;
					-webkit-overflow-scrolling: touch;
					&::-webkit-scrollbar {
						-webkit-appearance: none;
						width: 0;
						height: 0;
					}
					li {
						opacity: 0.1;
						transition: 0.3s;
						padding-bottom: 3rem;
						scroll-snap-align: start;
						transform: scale(0.95);
						p {
							margin: 0;
						}
						&.active {
							opacity: 1;
							transform: scale(1);
						}
					}
				}
			}
			// ul {
			// 	padding-bottom: 100%;
			// }
		}
		// ul {
		// background: -webkit-linear-gradient(transparent 0%, transparent 39%, #fff 40%, #fff 60%, transparent 61%, transparent 100%);
		// background-clip: text;
		// -webkit-text-fill-color: transparent;
		// }
	}
</style>
