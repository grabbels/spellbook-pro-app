<script>
	import BrowseCarousel from '../components/browse/browse-carousel.svelte';
	import SafeViewPadding from '../components/safeViewPadding.svelte';
	import SearchField from '../components/searchField.svelte';
	import { goto } from '$app/navigation';
	import { browseFilter, lookupBookId, modalCall } from '../stores';
	import Button from '../components/button.svelte';
	import PocketBase from 'pocketbase';
	import { localUserFavoriteBooks } from '../stores-persist';
	import Loader from '../components/loader.svelte';
	import BrowseBookSlot from '../components/browse/browse-bookSlot.svelte';
	import { fade } from 'svelte/transition';
	import WordInput from '../components/wordInput.svelte';
	const pb = new PocketBase('https://db.spellbook.pro');
	let browsePage = 'popular';
	let favoriteBooks = [];
	let browseBooks = [];
	let loadingFavorites;
	let placeholderSlots = [0, 1, 2];
	$: if (browsePage === 'favorites') {
		loadingFavorites = true;
		getFavoriteBooks();
	}

	function openBook(id) {
		$modalCall = 'spellbook';
		$lookupBookId = id;
	}

	async function getFavoriteBooks() {
		favoriteBooks = [];
		for (let i = 0; i < $localUserFavoriteBooks.length; i++) {
			const record = await pb.collection('spellbooks').getOne($localUserFavoriteBooks[i]);
			if (record) {
				favoriteBooks = [...favoriteBooks, record];
				loadingFavorites = false;
			} else {
				loadingFavorites = false;
			}
		}
	}
	async function getBrowseBooks() {
		browseBooks = [];
		try {
			const resultList = await pb.collection('spellbooks').getList(1, 50);
			if (resultList) {
				if (resultList.items.length > 0) {
					browseBooks = resultList.items;
				} else {
					browseBooks = 'No results.';
				}
			}
		} catch (error) {
			console.log(error.data);
		}
	}
</script>

<!-- <div class="gradient"></div> -->
<SafeViewPadding>
	<div class="wrap" style="padding-top: 2.5rem; padding-bottom: 5rem">
		<div class="card">
			<div style="display: grid; width: 100%; gap: .2rem; grid-template-columns: 1fr 1fr 1fr">
				<Button
					text="Trending"
					on:click={() => (browsePage = 'popular')}
					icon="ri-medal-2-{browsePage === 'popular' ? 'fill' : 'line'}"
					type="fill {browsePage === 'popular' ? 'yellow' : ''}"
				/>
				<Button
					text="Browse"
					on:click={() => (browsePage = 'browse')}
					icon="ri-dashboard-{browsePage === 'browse' ? 'fill' : 'line'}"
					type="fill {browsePage === 'browse' ? 'blue' : ''}"
				/>
				<Button
					text="Favorites"
					on:click={() => (browsePage = 'favorites')}
					icon="ri-heart-{browsePage === 'favorites' ? 'fill' : 'line'}"
					type="fill {browsePage === 'favorites' ? 'red' : ''}"
				/>
			</div>
			{#key browsePage}
				<div style="margin-top: 1rem">
					{#if browsePage === 'popular'}
						<div>
							<h3><i class="ri-eye-fill" />Popular</h3>
							<BrowseCarousel type="views" />
						</div>
						<div>
							<h3><i class="ri-heart-fill" />Loved</h3>
							<BrowseCarousel type="favorites" />
						</div>
					{:else if browsePage === 'browse'}
						<div class="filters">
							<h4>filters</h4>
							<div>
								<WordInput placeholder="Search by tags..." />
							</div>
						</div>
						<div>
							{#if (browseBooks = 'No results.')}
								<p style="margin-top: 1rem; text-align: center">No results.</p>
							{:else}
								{#each browseBooks as book}
									<BrowseBookSlot data={book} on:click={() => openBook(book.id)} />
								{:else}
									<p style="margin-top: 1rem; text-align: center">No results.</p>
								{/each}
							{/if}
						</div>
					{:else if browsePage === 'favorites'}
						{#if loadingFavorites === true}
							{#each placeholderSlots as slot, i}
								<div in:fade={{ duration: 200, delay: i * 100 }}>
									<BrowseBookSlot data="placeholder" />
								</div>
							{/each}
						{:else}
							{#each favoriteBooks as book}
								<BrowseBookSlot data={book} on:click={() => openBook(book.id)} />
							{:else}
								<p style="margin-top: 1rem; text-align: center">
									You don't have any favorite books yet.
								</p>
							{/each}
						{/if}
					{/if}
				</div>
			{/key}
		</div>
	</div>
</SafeViewPadding>

<style lang="scss">
	.gradient {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 700px;
		background-color: var(--lightbg);
		z-index: -1;
		mask-image: linear-gradient(180deg, black 70%, transparent 100%);
	}
	h1,
	h3 {
		margin: 0.5rem;
	}
	h3 {
		margin-bottom: 0;
		i {
			vertical-align: -2px;
			font-size: 1.1rem;
			margin-right: 0.3rem;
		}
	}
	.card {
		// margin: 0.5rem 0.5rem 2rem;
		padding: 1rem 0.5rem;
		// background-color: var(--lightbg);
		// box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
		// border-radius: var(--large-radius);
		@media only screen and (min-width: 992px) {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			h1 {
				width: 100%;
			}
		}
	}
	.filters {
		width: 100%;
		min-height: 50px;
		background-color: var(--lightbg);
		border-radius: var(--medium-radius);
		padding: 0.5rem 1rem;
	}
	.button_grid {
		display: grid;
		gap: 0.2rem;
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: 48px;
		padding: 0 0.5rem 0.5rem;
		min-width: 330px;
		&.four {
			grid-template-columns: 1fr 1fr 1fr 1fr;
		}
		button {
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 8px;

			background-color: rgba(0, 0, 0, 0.5);
			overflow: hidden;
			position: relative;
			i {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 1rem;
				margin: 0;
			}
			&:before {
				border: 2px solid var(--color);
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				z-index: 1;
				opacity: 0.8;
				border-radius: 8px;
			}
			&:after {
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				background-color: var(--color);
				z-index: -1;
			}
		}
	}
	div.wrap {
		@media only screen and (min-width: 992px) {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
		}
	}
</style>
