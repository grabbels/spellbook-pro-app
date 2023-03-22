<script>
	export let type;
	export let text;
	export let submit = false;
	export let icon = '';
</script>

<button on:click type={submit ? 'submit' : ''} class={type}
	>{#if icon}<i class={icon} />{/if}{text}</button
>

<style lang="scss">
	button {
		border-radius: 18px 0 0 18px;
		border: 2px solid transparent;
		min-height: 48px;
		box-sizing: border-box;
		padding: 0.6rem 0.8rem;
		transition: 0.2s;
		min-width: 80px;
		text-align: center;
		white-space: nowrap;

		&:first-child {
			border-radius: 18px 0 0 18px;
		}
		&:last-child {
			border-radius: 0 18px 18px 0;
		}
		&:not(:only-child, :first-child, :last-child) {
			border-radius: 0;
		}
		&:only-child {
			border-radius: 18px;
		}
		i {
			vertical-align: -3.5px;
			font-size: 1.1rem;
			margin-right: 0.2rem;
		}
		&.fill {
			background-color: var(--inputbg);
			color: var(--onbackground);
			@media (hover: hover) {
				&:hover {
					background-color: var(--primary);
				}
			}
		}
		&.accent {
			background-color: var(--accent);
			color: var(--onforeground);
			@media (hover: hover) {
				&:hover {
					filter: drop-shadow(0 0 5px rgba(var(--accentrgb), 0.8));
				}
			}
		}
		&.blue {
			background-color: var(--lightblue);
			color: var(--onforeground);
			@media (hover: hover) {
				&:hover {
					filter: drop-shadow(0 0 5px rgba(var(--accentrgb), 0.8));
				}
			}
		}
		&.red {
			background-color: var(--red);
			color: var(--onforeground);
			@media (hover: hover) {
				&:hover {
					filter: drop-shadow(0 0 5px rgba(var(--accentrgb), 0.8));
				}
			}
		}
		&.outline {
			background-color: transparent;
			border-color: var(--inputbg);
			color: var(--onbackground);
			&.accent {
				border-color: var(--accent);
				// color: var(--accent)
			}
			&.blue {
				border-color: var(--lightblue);
				// color: var(--lightblue)
			}
		}
	}
</style>
