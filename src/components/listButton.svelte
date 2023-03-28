<script>
	export let text;
	export let icon = '';
</script>

<li>
	<button on:click
		>{#if icon}<i class={icon} /> {/if}{text}
        <i class="ri-arrow-right-s-line"/>
	</button>
</li>

<style lang="scss">
	li {
		width: 100%;
		button {
			box-sizing: border-box;
			width: 100%;
			padding: 1.2rem 1.2rem;
			background-color: var(--cardbg);
			border-radius: 24px;
			margin-bottom: 0.7rem;
			font-size: 1.1rem;
            position: relative;
			i {
				font-size: 1.4rem;
				vertical-align: -5.5px;
				margin-right: 0.5rem;
			}
            .ri-arrow-right-s-line {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: .5rem;
                font-size: 2rem;
                color: var(--moretranslucent)
            }
		}
	}
</style>
