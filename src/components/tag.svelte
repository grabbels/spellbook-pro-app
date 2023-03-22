<script>
	export let text;
	export let type = 'accent';
</script>

<button class={type} on:click>
	<i class="ri-hashtag" />{text}
</button>

<style lang="scss">
    button {
        padding: .7rem .6rem .7rem .5rem;
        // height: 42px;
        background-color: var(--translucent);
        border-radius: 12px;
        border: 2px solid transparent;
        i {
            vertical-align: sub;
        }
        &.accent {
            background-color: var(--accent);
            color: var(--onforeground);
        }
        &.outline {
            background-color: transparent;
            border-color: var(--translucent);
            &.accent {
                border-color: var(--accent);
                color: var(--onbackground);
            }
        }
    }
</style>
