<script>
    import SafeViewPadding from '../../components/safeViewPadding.svelte';
	import Panel from '../../components/panel.svelte';
	import Button from '../../components/button.svelte';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import { visualViewport } from '../../stores';
</script>

<SafeViewPadding>
	<div
		class="onboarding_form"
		out:fly={{ duration: 300, y: 20 }}
		in:fly={{ duration: 300, y: 20, delay: 300 }}
        style="height: {$visualViewport.height}px"
	>
		<div class="inner">

            <div class="slide">
                <h1>Spellbook<span>Pro</span></h1>
            </div>
				<!-- <div class="book_wrap" style="overflow: hidden; transition: .3s; height: {focus ? '0px' : '200px'}; transform: scale({focus ? '0' : '1'}); opacity: {focus ? '0' : '1'}">
                    <BookAnimation />
                </div> -->
			
		</div>
	</div>
</SafeViewPadding>

<style lang="scss">
	.onboarding_form {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		.inner {
            width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			// padding-bottom: 8rem;
			h1 {
				margin-top: -1.5rem;
				margin-bottom: 2rem;
				span {
					vertical-align: super;
					font-size: 1.2rem;
					font-weight: 300;
					margin-left: 0.2rem;
				}
			}
			// p {
			// 	margin-top: 1rem;
			// }
		}
	}
</style>