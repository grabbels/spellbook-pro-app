<script>
	import BrowseCarousel from '../components/browse/browse-carousel.svelte';
import SafeViewPadding from '../components/safeViewPadding.svelte';
	import SearchField from '../components/searchField.svelte';
</script>
<!-- <div class="gradient"></div> -->
<SafeViewPadding>
	<div style="padding-top: 3rem; padding-bottom: 5rem">
		<div class="card">
			<h1>Community favorites</h1>
			<h3><i class="ri-eye-fill"></i>Popular</h3>
			<BrowseCarousel type="views"/>
			<h3><i class="ri-heart-fill"></i>Loved</h3>
			<BrowseCarousel type="favorites"/>
		</div>
		<h1>Search</h1>
		<div style="padding: .5rem">
			<SearchField placeholder="Search by nickname, tags, class..." />
		</div>
		<h3>Class</h3>
		<div class="button_grid">
			<button style="--color: var(--darkblue)"><i class="ri-magic-line"/>Wizard</button>
			<button style="--color: var(--red)"><i class="ri-fire-line"/>Sorcerer</button>
			<button style="--color: var(--purple)"><i class="ri-skull-2-line"/>Warlock</button>
			<button style="--color: var(--onbackground)"><i class="ri-open-arm-line"/>Cleric</button>
			<button style="--color: var(--lightgreen)"><i class="ri-leaf-line"/>Druid</button>
			<button style="--color: var(--pink)"><i class="ri-music-2-line"/>Bard</button>
			<button style="--color: var(--red)"><i class="ri-settings-2-line"/>Artificer</button>
			<button style="--color: var(--darkgreen)"><i class="ri-focus-2-line"/>Ranger</button>
			<button style="--color: var(--inputbg)"><i class="ri-spy-line"/>Rogue</button>
			<button style="--color: var(--yellow)"><i class="ri-shield-line"/>Paladin</button>
			<button style="--color: var(--brown)"><i class="ri-sword-line"/>Fighter</button>
			<button style="--color: var(--lightblue)"><i class="ri-ancient-gate-line"/>Monk</button>
		</div>
		<h3>Tags</h3>

		<h3>Character level</h3>
		<div class="button_grid four">
			<button style="--color: var(--inputbg)">1</button>
			<button style="--color: var(--inputbg)">2</button>
			<button style="--color: var(--inputbg)">3</button>
			<button style="--color: var(--inputbg)">4</button>
			<button style="--color: var(--inputbg)">5</button>
			<button style="--color: var(--inputbg)">6</button>
			<button style="--color: var(--inputbg)">7</button>
			<button style="--color: var(--inputbg)">8</button>
			<button style="--color: var(--inputbg)">9</button>
			<button style="--color: var(--inputbg)">10</button>
			<button style="--color: var(--inputbg)">11</button>
			<button style="--color: var(--inputbg)">12</button>
			<button style="--color: var(--inputbg)">13</button>
			<button style="--color: var(--inputbg)">14</button>
			<button style="--color: var(--inputbg)">15</button>
			<button style="--color: var(--inputbg)">16</button>
			<button style="--color: var(--inputbg)">17</button>
			<button style="--color: var(--inputbg)">18</button>
			<button style="--color: var(--inputbg)">19</button>
			<button style="--color: var(--inputbg)">20</button>
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
	h1,h3 {
		margin: .5rem;
	}
	h3 {
		i {
			vertical-align: -2px;
			font-size: 1.1rem;
			margin-right: .3rem;
		}
	}
	.card {
		margin: .5rem .5rem 2rem;
		padding: 1rem .5rem;
		background-color: var(--lightbg);
		box-shadow: 0 10px 10px rgba(0,0,0,.3);
		border-radius: var(--large-radius);
	}
	.button_grid {
		display: grid;
		gap: .2rem;
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: 48px;
		padding: 0 .5rem .5rem;
		&.four {
		grid-template-columns: 1fr 1fr 1fr 1fr;

		}
		button {
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 8px;
			
			background-color: rgba(0,0,0,.5);
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
				opacity: .8;
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
</style>
