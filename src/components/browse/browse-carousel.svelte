<script>
	import { beforeUpdate, onDestroy, onMount } from 'svelte';
	import PocketBase from 'pocketbase';
	import liquidGif from '$lib/liquid-greyscale.gif';
	import Pill from '../pill.svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import { lookupBookId, modalCall } from '../../stores';
	import { localUserLibrary } from '../../stores-persist';
	const pb = new PocketBase('https://db.spellbook.pro');
	let books = [];
	let slides = [];
	let totalSlides;
	let activeSlide = 0;
	let interval;

	export let type;

	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	async function getRecent() {
		try {
			const resultList = await pb.collection('spellbooks').getList(1, 5, {
				filter: 'public = true',
				sort: '-' + type
			});
			books = resultList.items;
			// setTimeout(() => {
			// 	totalSlides = slides.length;
			// 	interval = setInterval(nextSlide, 5000);
			// }, 1 + Math.random() * 1000);
		} catch (error) {
			console.log(error.data);
		}
	}

	onMount(() => {
		getRecent();
	});

	onDestroy(()=> {
		clearInterval(interval)
		activeSlide = 0;
	})

	beforeUpdate(()=>{
		activeSlide = 0
	})

	function nextSlide() {
		console.log(slides.length);
		if (activeSlide < slides.length - 1) {
			activeSlide++;
			slides[activeSlide].scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'center'
			});
		} else {
			activeSlide = 0;
			slides[activeSlide].scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'center'
			});
		}
	}

	async function handleClick(id) {
		$lookupBookId = id;
		$modalCall = 'spellbook';
		await pb.collection('spellbooks').update(id, {
			'views+': 1
		});
	}

	onMount(() => {});
</script>

<div class="carousel">
	<ul on:touchstart={() => clearInterval(interval)}>
		{#each books as book, i}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li
				in:fly={{ duration: 1200, x: -1000}}
				style="--bookcolor: {book.book.color}"
				on:click={() => handleClick(book.id)}
				bind:this={slides[i]}
			>
				<div class="inner">
					<div class="title">
						<i class="icon ri-{book.book.icon}-fill" />
						<h2>{book.book.name.toString().replaceAll(',', ' ')}</h2>
					</div>
					<div class="pills">
						<Pill text={book.book.class} type="large green" icon="ri-contacts-line" />
						<Pill text="Level {book.book.level}" type="large blue" icon="ri-user-star-line" />
					</div>
					<div class="pills tags">
						<!-- <Pill text={book.favorites} type="small bold red" icon="ri-heart-fill" />
						<Pill text={book.views} type="small bold neutral" icon="ri-eye-fill" /> -->
						{#each book.book.tags as tag}
							<Pill text={tag} type="small" icon="ri-hashtag" />
						{/each}
					</div>
					<div class="spells">
						<!-- {#each book.book.list as spell}
							<Pill text="" type="small" icon="ri-hashtag" />
						{/each} -->
					</div>
				</div>
				<div class="background_static" />
				<div class="video">
					<img src={liquidGif} alt="" />
				</div>
			</li>
		{:else}
			<li class="placeholder" style="--bookcolor: var(--moretranslucent)">
				<div class="inner" />
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
		max-width: 400px;
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
				.background_static {
					content: '';
					position: absolute;
					left: 0.5rem;
					top: 0.5rem;
					right: 0.5rem;
					bottom: 0.5rem;
					border-radius: var(--medium-radius);
					border: 2px solid var(--bookcolor);
					background-color: rgba(0, 0, 0, 0.4);
					z-index: -1;
				}
				.inner {
					height: 100%;
					width: 100%;
					padding: 1.5rem;
					overflow: hidden;
					position: relative;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					mask-image: linear-gradient(
						180deg,
						black calc(100% - 2rem),
						transparent calc(100% - 1rem)
					);
					position: relative;

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
					.pills {
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						gap: 0.2rem;
						margin-bottom: 0.2rem;
						&.tags {
							text-transform: lowercase;
						}
					}
				}
				.video {
					position: absolute;
					left: 0.5rem;
					top: 0.5rem;
					right: 0.5rem;
					bottom: 0.5rem;
					z-index: -2;
					background-color: var(--bookcolor);
					border-radius: var(--medium-radius);
					img {
						height: 100%;
						width: 100%;
						object-fit: cover;
						opacity: 1;
						mix-blend-mode: soft-light;
						// filter: brightness(1.3);
						border-radius: var(--medium-radius);
						filter: contrast(1.3);
						// background-color: var(--bookcolor);
					}
				}
				&.placeholder {
					opacity: 0.3;
					animation: pulse 1s infinite;
					.inner {
						background-color: var(--moretranslucent);
						mask-image: none;
						border-radius: var(--medium-radius);
					}
					@keyframes pulse {
						0% {
							opacity: 0.3;
						}
						50% {
							opacity: 0.4;
						}
						100% {
							opacity: 0.3;
						}
					}
				}
			}
		}
	}
</style>
