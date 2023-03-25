<script>
    export let fill = false;
    export let altone = false;
    export let alttwo = false;
</script>

<div class:fill class:altone class:alttwo class="phone">
	<div class="bezel" />
	<slot />
</div>

<style lang="scss">
	.phone {
		margin: 1rem 0 2rem;
		display: inline-block;
		aspect-ratio: 9 / 17;
		width: 65%;
		background-color: var(--inputbg);
		border-radius: 28px;
		position: relative;
		.bezel {
            pointer-events: none;
			position: absolute;
			border-radius: 24px;
			height: 100%;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			border: 8px solid var(--lightbg);
			z-index: 2;
		}
        &.fill {
            width: 100%;
            .bezel {
                border-width: 6px;
            }
        }
        &.altone {
            .bezel {
                border-color: var(--lightgreen);
            }
        }
        &.alttwo {
            background-color: var(--bodybg);
            .bezel {
                border-color: var(--purple);
            }
        }
	}
</style>
