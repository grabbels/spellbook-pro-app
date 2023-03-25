<script>
	import Login from '../../components/login.svelte';
	import SafeViewPadding from '../../components/safeViewPadding.svelte';
	import Shift from '$lib/shift-bg.png';
	import { fade } from 'svelte/transition';
	import CenterContainer from '../../components/centerContainer.svelte';
</script>

<SafeViewPadding>
	<CenterContainer>
    <div style="padding: 1rem">
		<Login />
	</div>
    </CenterContainer>
</SafeViewPadding>
<div class="shift-bg" transition:fade>
	<div class="rotate">
		<div class="shift" style="background-image: url({Shift})" />
		<div class="shift" style="background-image: url({Shift})" />
		<div class="shift" style="background-image: url({Shift})" />
		<div class="shift" style="background-image: url({Shift})" />
		<div class="shift" style="background-image: url({Shift})" />
		<div class="shift" style="background-image: url({Shift})" />
	</div>
</div>

<style lang="scss">
	.shift-bg {
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		background-color: var(--bodybg);
		opacity: 0.2;
		// filter: contrast(0.8);
		filter: blur(2px);
		.rotate {
			transform: rotate(20deg);
			position: absolute;
			top: 0;
			// left: -50px;
			width: 100%;
			height: 100%;
			// filter: blur(1px);
			.shift {
				// display: inline-block;
				width: 378px;
				height: 1994px;
				height: 200%;
				background-size: contain;
				background-repeat: repeat-y;
				// transform: rotate(20deg);
				position: absolute;
				left: 0;
				top: -50%;
				background-position: 0 0%;
				animation-name: shift;
				animation-timing-function: linear;
				animation-iteration-count: infinite;
				animation-duration: 45s;
				@keyframes shift {
					to {
						background-position: 0 997px;
					}
				}
				&:nth-child(1) {
					transform: translate(-250%, -10%);
				}
				&:nth-child(2) {
					transform: translate(-150%, -5%);
				}
				&:nth-child(3) {
					transform: translate(-50%, 0%);
				}
				&:nth-child(4) {
					transform: translate(50%, 5%);
				}
				&:nth-child(5) {
					transform: translate(150%, 10%);
				}
				&:nth-child(6) {
					transform: translate(250%, 15%);
				}
			}
		}
	}
</style>
