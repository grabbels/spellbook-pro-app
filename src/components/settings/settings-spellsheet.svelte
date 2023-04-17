<script>
	import { optionsCall } from '../../stores';
	import { localUserPreferences } from '../../stores-persist';
	import BackButton from './backButton.svelte';
	let spellbookLayout = $localUserPreferences.spellbookLayout
	$: if (spellbookLayout) {
		$localUserPreferences.spellbookLayout = spellbookLayout
	} else {
		spellbookLayout = 'list'
	}
	
</script>

<div class="title_wrap">
	<BackButton />
	<h2>
		<h3>settings</h3>
		Spellbook
	</h2>
	<h4>Layout</h4>
	<div class="layout">
		<input type="radio" name="layout" id="layout-list" value="list" bind:group={spellbookLayout} />
		<label for="layout-list">
			<div class="illustration">
				<div />
				<div />
				<div />
			</div>
			<p>List (compact)</p>
		</label>
		<input type="radio" name="layout" id="layout-grid" value="grid" bind:group={spellbookLayout} />
		<label for="layout-grid">
			<div class="illustration">
				<div />
				<div />
				<div />
				<div />
			</div>
			<p>Grid</p>
		</label>
		<input type="radio" name="layout" id="layout-list-full" value="list-full" bind:group={spellbookLayout} />
		<label for="layout-list-full">
			<div class="illustration">
				<div>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
				<div></div>
			</div>
			<p>List (full)</p>
		</label>

	</div>
</div>

<style lang="scss">
	.title_wrap {
		margin-bottom: 1rem;
		h2 {
			display: inline-block;
		}
	}
	form {
		margin-bottom: 1rem;
	}
	.buttons {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		div {
			margin-bottom: 0.5rem;
		}
	}
	.layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		background-color: var(--moretranslucent);
		padding: .5rem;
		border-radius: var(--medium-radius);
		gap: 0.5rem;
		height: auto;
		input {
			display: none;
			&:checked + label {
				outline: 2px solid var(--accent);
			}
				
		}
		label {
			aspect-ratio: 1 / 0.8;
			position: relative;
			background-color: var(--inputbg);
			border-radius: 8px;
			padding: 0.5rem .5rem .3rem;
			transition: .15s;
			p {
				margin: .1rem 0 0;
				font-weight: 400;
				color: var(--onbackground);
				text-align: center;
				font-size: .95rem;
			}
			.illustration {
				height: 80px;
				width: 100%;
			}
			&[for='layout-list'] {
				.illustration {
					display: flex;
					flex-direction: column;
					gap: 0.2rem;
					div {
						background-color: var(--translucent);
						border-radius: 8px;
						height: 100%;
					}
				}
			}
			&[for='layout-grid'] {
				.illustration {
					display: grid;
					grid-template-columns: 1fr 1fr;
					grid-template-rows: 1fr 1fr;
					gap: 0.2rem;
					div {
						background-color: var(--translucent);
						border-radius: 8px;
						height: 100%;
					}
				}
			}
			&[for='layout-list-full'] {
				.illustration {
					display: grid;
					grid-template-columns: 1fr;
					grid-template-rows: 1fr 15px;
					gap: 0.2rem;
					div {
						background-color: var(--translucent);
						border-radius: 8px;
						height: 100%;
						padding: .5rem;
						display: flex;
						gap: .2rem;
						flex-wrap: wrap;
						&:last-child {
							border-radius: 8px 8px 4px 4px;
							padding: 0;
						}
					}
				}
			}
		}
	}
</style>
