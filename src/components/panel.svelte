<script>
    export let narrow = false;
</script>

<div class:narrow={narrow}>
    <slot/>
</div>

<style lang="scss">
    div {
        width: 100%;
        background-color: var(--moretranslucent);
        border-radius: 12px;
        padding: 1rem;
        box-shadow: 0 3px 5px rgba(10, 10, 10, 0.2);
        margin-top: .5rem;
        &:first-child {
            margin-top: 4rem;
        }
        &.narrow {
            padding: .5rem;
        }
    }
</style>