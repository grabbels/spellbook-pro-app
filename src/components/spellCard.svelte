<script>
	import { fade } from 'svelte/transition';
	import { lookupSpell, modalCall, spellList } from '../stores';
	import { localUserLibrary, localUserPreferences } from '../stores-persist';
	import Button from './button.svelte';
	import Pill from './pill.svelte';
	import Schoolicon from './schoolicon.svelte';
	export let type;
	export let data;
	export let id = '';

	let fadeDuration = 0;

	// type === 'list' || type === 'small' ? (fadeDuration = 0) : '';
</script>

{#if data}
	<button
		class="card {type}"
		id={id}
		on:click={() => {
			if (type !== 'small') {
				$lookupSpell = data;
				$modalCall = 'spell';
			}
		}}
	>
		<div class="card_inner">
			<div class="block title">
				<h2>
					<div class="icon">
						<Schoolicon
							type={type === 'list' || type === 'small' ? 'small' : ''}
							school={data.school}
						/>
					</div>
					{data.name}
				</h2>
			</div>
			{#if type !== 'small'}
				<div class="block pills">
					<Pill
						type={type === 'embed' ? 'fill' : 'discreet'}
						text={data.casting_time}
						icon="ri-flashlight-line"
						label="Casting time"
					/>
					<Pill
						type={type === 'embed' ? 'fill' : 'discreet'}
						text={data.range}
						icon="ri-arrow-right-up-line"
						label="Range"
					/>
					<Pill
						type={type === 'embed' ? 'fill' : 'discreet'}
						text={data.duration}
						icon="ri-time-line"
						label="Duration"
					/>
				</div>
				<div class="block pills" style="margin-bottom: .7rem">
					<Pill
						type="small {type === 'embed' ? 'fill' : 'discreet'}"
						text={data.school}
						icon="ri-book-2-line"
						label="School of magic"
					/>
					{#if data.save}
						<Pill
							type="small {type === 'embed' ? 'fill' : 'discreet'}"
							text={data.save}
							icon="ri-lifebuoy-line"
							label="Range"
						/>
					{/if}
					<!-- <Pill type="small" text={data.duration} icon="ri-time-line" label="Duration" /> -->
				</div>
				{#if type === 'embed' || (type === 'list' && $localUserPreferences.spellDescription === true)}
					<div class="block description">
						<div class="description_inner">
							{@html data.description}
						</div>
					</div>
					<div class="block buttons" style="margin-top: 2rem; pointer-events: auto">
						{#if $spellList.findIndex((p) => p.id == data.id)}
							<Button
								text="Remove spell"
								icon="ri-close-line"
								type="outline translucent"
								on:click={()=>{
									
								}}
							/>
						{:else}
							<Button text="Add to spellbook" icon="ri-add-line" type="fill" on:click />
						{/if}
					</div>
				{/if}
			{/if}
		</div>
	</button>
{/if}

<style lang="scss">
	.card {
		text-align: left;
		.block.pills {
			margin-bottom: 0.3rem;
			display: flex;
			gap: 0.3rem;
			flex-wrap: wrap;
		}
		&.small {
			width: 100%;
			.card_inner {
				.block.title {
					h2 {
						display: flex;
						font-size: 1rem;
						font-weight: 300;
						margin-bottom: 0.3rem;
						color: var(--lesstranslucent);
						.icon {
							margin-top: -0.13rem;
							margin-left: 0.1rem;
							margin-right: 0.2rem;
						}
					}
				}
			}
		}
		&.embed {
			pointer-events: none;
			.card_inner {
				padding: 0;
				.block.title {
					h2 {
						max-width: 90%;
						.icon {
							display: inline-block;
							// margin-left: -5px;
							margin-right: 0.2rem;
							vertical-align: -3px;
						}
					}
				}
			}
		}
		&.list {
			background-color: var(--cardbg);
			border-radius: 0;
			position: relative;
			overflow: hidden;
			margin: 0.4rem 0.8rem;
			padding: 0.5rem 0.8rem;
			border-radius: 24px;
			.card_inner {
				margin: 0 0.5rem;
				padding: 0.7rem 0 0.2rem;
				.block.title {
					h2 {
						font-size: 1.3rem;
						margin-bottom: 0.5rem;
						.icon {
							display: inline-block;
							margin-left: 1px;
							vertical-align: 1px;
						}
					}
				}
				.block.description {
					opacity: 0.7;
					max-height: 100px;
					mask-image: linear-gradient(180deg, black calc(100% - 2rem), transparent 100%);
					margin-bottom: 0.7rem;
					.description_inner {
						// height: 100%;
						p {
							font-size: 0.95rem;
						}
					}
				}
			}
			&:last-child {
				.card_inner {
					border-bottom: 0;
				}
			}
		}
	}
</style>
