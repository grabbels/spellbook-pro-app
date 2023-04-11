<script>
	import { modalCall } from "../../stores";
import Button from "../button.svelte";

</script>
<div>
    <h2 style="max-width: 80%">Welcome to Spellbook Pro!</h2>
    <p style="margin-bottom: 1rem">New here, or need a refresher?</p>
    <div style="text-align: center"><Button text="Start the tutorial" icon="ri-magic-line" liquid type="fill liquid blue" on:click={()=> $modalCall = 'tutorial-spells'}/></div>
    <p style="margin-top: 1.5rem">Already tried and trusted, or rather explore the app yourself? Move right along!</p>
    <div style="text-align: center"><Button text="Close" icon="ri-close-line" type="fill" on:click={()=> $modalCall = ''} /></div>
    <p style="margin-top: 1rem">Not to worry: you can return to the tutorials at any point in the <strong>settings</strong> menu!</p>
</div>