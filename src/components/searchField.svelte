<script>
    export let placeholder;
    export let value = '';
    export let right;
</script>
<form on:submit|preventDefault>
	<i class="ri-search-line" />
	<input
		type="text"
		bind:value={value}
		placeholder={placeholder}
        class:right={right}
		on:focus
		on:focusout
	/>
</form>
<style lang="scss">
    form {
        display: flex;
        align-items: center;
        position: relative;
    }
    input {
        padding-left: 2rem;
        margin-bottom: 0;
        &.right {
            border-radius: 0 18px 18px 0;
        }
    }
    i {
        position: absolute;
        left: .7rem;
        opacity: .5;
        margin-top: 1px;
    }
</style>
