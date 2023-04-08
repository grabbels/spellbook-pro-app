<script>
	import { onMount } from 'svelte';
	import PocketBase from 'pocketbase';
	import liquid from '$lib/liquid-greyscale.mp4';
	import Pill from '../pill.svelte';
	import { fade } from 'svelte/transition';
	import { lookupBookId, modalCall } from '../../stores';
	import { localUserLibrary } from '../../stores-persist';
	const pb = new PocketBase('https://db.spellbook.pro');
	let books = [];

	async function getRecent() {
		try {
			const resultList = await pb.collection('spellbooks').getList(1, 5, {
				filter: 'public = true'
			});
			books = resultList.items;
			console.log(resultList);
		} catch (error) {
			console.log(error.data);
		}
	}

	onMount(() => {
		getRecent();
	});

	function handleClick(id) {
		$lookupBookId = id;
		$modalCall = 'spellbook';
	}
</script>

<h1>Popular</h1>
<div class="carousel">
	<ul>
		{#each books as book}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li in:fade={{duration:200}} style="--bookcolor: {book.book.color}" on:click={() => handleClick(book.id)}>
				<div class="inner">
					<div class="title">
						<i class="icon ri-{book.book.icon}-fill" />
						<h2>{book.book.name.toString().replaceAll(',', ' ')}</h2>
					</div>
					<div class="pills">
						<Pill text={book.favorites} type="large bold red" icon="ri-heart-fill" />
						<Pill text={book.book.class} type="large green" icon="ri-contacts-line" />
						<Pill text="Level {book.book.level}" type="large blue" icon="ri-user-star-line" />
					</div>
					<div class="pills tags">
						{#each book.book.tags as tag}
							<Pill text={tag} type="small" icon="ri-hashtag" />
						{/each}
					</div>
					<div class="spells">
						<!-- {#each book.book.list as spell}
							<Pill text="" type="small" icon="ri-hashtag" />
						{/each} -->
					</div>
					<div class="video">
						<video
							width="100%"
							height="100%"
							in:fade={{ duration: 300 }}
							playsinline
							autoplay
							muted
							loop
						>
							<source src={liquid} id="video" type="video/mp4" />
						</video>
					</div>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	h1 {
		padding: 1rem;
	}
	.carousel {
		width: 100%;
		mask-image: linear-gradient(
			90deg,
			transparent 0%,
			black 0.5rem,
			black calc(100% - 0.5rem),
			transparent 100%
		);
		overflow: hidden;
		ul {
			display: flex;
			// gap: 1rem;
			overflow-x: auto;
			scroll-snap-type: x mandatory;
			scroll-behavior: smooth;
			-webkit-overflow-scrolling: touch;
			li {
				padding: 0.5rem;
				height: 200px;
				display: inline-block;
				width: 100%;
				scroll-snap-align: start;
				flex-shrink: 0;
				position: relative;
				cursor: pointer;
				.inner {
					border-radius: var(--medium-radius);
					border: 2px solid var(--bookcolor);
					height: 100%;
					width: 100%;
					padding: 1.5rem;
					overflow: hidden;
					background-color: rgba(0, 0, 0, 0.5);
					position: relative;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					// z-index: 1;
					i {
						font-size: 2.8rem;
						float: left;
						margin-right: 0.7rem;
						height: 100%;
						display: flex;
						align-items: center;
					}
					h2 {
						text-transform: capitalize;
						font-size: 1.3rem;
						margin: 0;
					}
					.video {
						position: absolute;
						left: 0;
						top: 0;
						right: 0;
						bottom: 0;
						z-index: -1;
						background-color: var(--bookcolor);
						video {
							object-fit: cover;
							opacity: 1;
							mix-blend-mode: soft-light;
							// background-color: var(--bookcolor);
						}
					}
					.pills {
						width: 100%;
						display: flex;
						gap: 0.2rem;
						margin-bottom: 0.2rem;
						&.tags {
							text-transform: lowercase;
						}
					}
				}
			}
		}
	}
</style>
