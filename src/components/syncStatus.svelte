<script>
	import { fly } from "svelte/transition";
	import { online } from "../stores";
</script>
<div transition:fly={{duration: 300, y: -50}} class="sync_status">

</div>
<style lang="scss">
.sync_status {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	top: calc(var(--safe-area-inset-top) + 5rem);
	width: 30px;
	height: 30px;
	background-color: white;
	z-index: 100;
	box-shadow: 0 5px 10px rgba(0,0,0,.3);
	border-radius: 50vh;
}
</style>