<script>
	import { fly, scale } from 'svelte/transition';
	import { bookToEdit, lookupSpell, modalCall } from '../stores';
	import Close from './close.svelte';
	import ModalLogin from './modal/modal-login.svelte';
	import SpellCard from './spellCard.svelte';
	import Noise from '$lib/noise.svg';
	import ModalSpellbook from './modal/modal-spellbook.svelte';
	import ModalNew from './modal/modal-new-edit.svelte';
	import ModalTerms from './modal/modal-terms.svelte';
	import ModalChangelog from './modal/modal-changelog.svelte';
	import ModalConfirmEmailChange from './modal/modal-confirmEmailChange.svelte';
	import ModalTutorialSpellbook from './modal/modal-tutorial-spells.svelte';
	import ModalWelcome from './modal/modal-welcome.svelte';
	import ModalTutorialSpellbookScreen from './modal/modal-tutorial-spellbookScreen.svelte';

	let fullScreen = false;
	let fullscreenModalCalls = [
		'login',
		'spellbook',
		'new',
		'edit',
		'confirm-email-change',
		'tutorial-spells'
	];
	let modalOuterAnimationArgs;
	let modalContainerAnimationArgs;

	function transition(node, options) {
		return options.fn(node, options);
	}

	$: if (new RegExp(fullscreenModalCalls.join('|')).test($modalCall)) {
		fullScreen = true;
		modalOuterAnimationArgs = {
			fn: scale,
			duration: 0
		};
		modalContainerAnimationArgs = {
			fn: fly,
			y: 20,
			duration: 400
		};
	} else {
		setTimeout(() => {
			fullScreen = false;
		}, 250);
		modalOuterAnimationArgs = {
			fn: scale,
			start: 0.97,
			duration: 200
		};
		modalContainerAnimationArgs = {
			fn: fly,
			duration: 0
		};
	}
	let modalInner;
	let scrollY;
</script>

<div
	class="container"
	class:fullscreen={fullScreen}
	in:transition={modalContainerAnimationArgs}
	out:transition={modalContainerAnimationArgs}
>
	<!-- <div class="outer" transition:fly={{ y: 15, duration: 250 }}> -->
	<div
		class="outer"
		in:transition={modalOuterAnimationArgs}
		out:transition={modalOuterAnimationArgs}
	>
		{#if $modalCall !== 'login'}
			<div class="close">
				<Close
					on:click={() => {
						$modalCall = '';
						$lookupSpell = '';
						$bookToEdit = '';
					}}
				/>
			</div>
		{/if}
		<div class="inner">
			<div bind:this={modalInner} class="modal_content">
				{#if $modalCall === 'spell'}
					{#key $lookupSpell}
						<div in:fly>
							<SpellCard type="embed" data={$lookupSpell} />
						</div>
					{/key}
				{/if}
				{#if $modalCall === 'login'}
					<ModalLogin />
				{/if}
				{#if $modalCall === 'spellbook'}
					<ModalSpellbook />
				{/if}
				{#if $modalCall === 'new' || $modalCall === 'edit'}
					<ModalNew />
				{/if}
				{#if $modalCall === 'terms'}
					<ModalTerms />
				{/if}
				{#if $modalCall === 'changelog'}
					<ModalChangelog />
				{/if}
				{#if $modalCall === 'confirm-email-change'}
					<ModalConfirmEmailChange />
				{/if}
				{#if $modalCall === 'welcome'}
					<ModalWelcome />
				{/if}
				{#if $modalCall === 'tutorial-spells'}
					<ModalTutorialSpellbook />
				{/if}
				{#if $modalCall === 'tutorial-spellbookscreen'}
					<ModalTutorialSpellbookScreen />
				{/if}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 200;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: max(calc(var(--safe-area-inset-top) + 1rem), 3rem) 0.7rem
			max(calc(var(--safe-area-inset-bottom) + 1rem), 3rem);
		pointer-events: none;
		.outer {
			pointer-events: auto;
			background-color: var(--panelbg);
			width: 100%;
			// min-height: 350px;
			box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
			border-radius: var(--huge-radius);
			max-height: 100%;
			position: relative;
			display: flex;
			overflow: hidden;
			// &:after {
			// 	content: '';
			// 	left: 0;
			// 	top: 0;
			// 	right: 0;
			// 	bottom: 0;
			// 	position: absolute;
			// 	background: url('../lib/noise.svg');
			// 	background-repeat: repeat;
			// 	opacity: 1;
			// 	mix-blend-mode: soft-light;
			// 	filter: contrast(1) brightness(4);
			// 	// mix-blend-mode: multiply;
			// }
			.inner {
				position: relative;
				z-index: 1;
				width: 100%;
				.modal_content {
					overflow-x: hidden;
					overflow-y: auto;
					max-height: 100%;
					padding: 1.8rem 1.5rem;
					width: 100%;
				}
				// &:after {
				// 	position: absolute;
				// 	content: '';
				// 	bottom: 0;
				// 	left: 0;
				// 	right: 0;
				// 	height: 3rem;
				// 	z-index: 1;
				// 	background-color: var(--cardbg);
				// 	mask-image: linear-gradient(0deg, black 10%, transparent 100%);
				// }
			}
			.close {
				position: absolute;
				top: 1rem;
				right: 1rem;
				z-index: 2;
			}
		}
		&.fullscreen {
			background-color: var(--cardbg);
			padding: 0;
			.close {
				top: calc(var(--safe-area-inset-top) + 1rem);
				position: fixed;
			}
			.outer {
				box-shadow: none;
				height: 100%;
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: flex-start;
				overflow-y: auto;
				border-radius: 0;
				.inner {
					height: 100%;
					.modal_content {
						padding-top: calc(var(--safe-area-inset-top) + 1.5rem);
						height: 100%;
						// height: 100%;
						position: relative;
					}
				}
			}
		}
	}
</style>
