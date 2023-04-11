<script>
	import { optionsCall } from '../../stores';
	import Button from '../button.svelte';
	import BackButton from './backButton.svelte';
</script>

<div class="title_wrap">
	<BackButton />
	<h2>
		<h3>settings</h3>
		Donate
	</h2>
	<p>
		Hi there! I'm Sem, and I made the Spellbook Pro app by myself. The idea was born when I grew
		more and more frustrated by how when spellcasters are involved, D&D fights drag on for ages for
		all the wrong reasons. And that's not on the players, but on how much information goes into
		playing a spellcaster. I started tinkering en before long Spellbook Pro was a reality!
	</p>
	<p>
		From the humble beginnings to the more serious later phase of releasing this app, I always knew
		I wanted to make this app free to use. I learn(ed) a lot while developing this platform and
		that's enough for me. <br /><strong
			>Would you like to help me out anyway by providing me with a hot cup of coffee? Feel free to
			donate any amount you like, thank you!</strong
		>
	</p>
	<div style="margin-top: 2rem">
		<Button text="Donate" icon="ri-heart-fill" liquid type="fill accent liquid" />
	</div>
	<p style="margin-top: 1rem">
		Curious what else I make? Visit <a style="color:var(--onbackground)" href="https://semhak.com"
			>my website</a
		>!
	</p>
</div>

<style lang="scss">
	.title_wrap {
		margin-bottom: 1rem;
		h2 {
			display: inline-block;
		}
	}
	form {
		margin-bottom: 1rem;
	}
	.buttons {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		div {
			margin-bottom: 0.5rem;
		}
	}
</style>
