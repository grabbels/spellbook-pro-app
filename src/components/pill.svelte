<script>
	export let type;
	export let icon;
	export let text;
	export let label;
</script>

<div class="pill {type}">
	<i class={type.includes('discreet') ? icon.replace('line', 'line') : icon} /><span>{text}</span>
</div>

<style lang="scss">
	.pill {
		display: inline-block;
		border: 2px solid var(--primary);
		background-color: var(--primary);
		padding: 0.35rem 0.55rem 0.35rem 0.35rem;
		border-radius: 50vh;
		font-size: 1rem;
		color: var(--onforeground);
		i {
			color: var(--onforeground);
			vertical-align: -4px;
			font-size: 1.1rem;
			margin-right: 0.2rem;
		}
		&.bold {
			font-weight: 500;
		}
		&:nth-child(1) {
			background-color: var(--lightgreen);
			border-color: var(--lightgreen);
		}
		&:nth-child(2) {
			background-color: var(--lightblue);
			border-color: var(--lightblue);
		}
		&:nth-child(3) {
			background-color: var(--yellow);
			border-color: var(--yellow);
		}
		&.small {
			background-color: var(--translucent);
			color: var(--onbackground);
			border-color: transparent;
			font-size: 0.9rem;
			padding: 0.3rem 0.5rem 0.3rem 0.4rem;
			i {
				color: var(--onbackground);
				font-size: 1rem;
			}
		}
		&.outline,
		&.discreet {
			background-color: transparent;
			border-width: 2px;
			&:nth-child(1) {
				color: var(--lightgreen);
				i {
					color: var(--lightgreen);
				}
			}

			&:nth-child(2) {
				color: var(--lightblue);
				i {
					color: var(--lightblue);
				}
			}

			&:nth-child(3) {
				color: var(--yellow);
				i {
					color: var(--yellow);
				}
			}
			&.small {
				background-color: transparent;
				border-width: 2px;
				border-color: var(--translucent);
				color: var(--translucent);
				i {
					color: var(--translucent);
				}
			}
			&.discreet {
				border-width: 0;
				padding: 0 0.1rem 0;
			}
		}
		&.neutral {
			background-color: var(--translucent);
			color: var(--onbackground);
			border-color: transparent;
			i {
				color: var(--onbackground);
			}
		}
		&.green {
			background-color: var(--lightgreen);
			color: var(--onforeground);
			text-transform: capitalize;
			border-color: var(--lightgreen);
			i {
				color: var(--onforeground);
			}
		}
		&.blue {
			background-color: var(--lightblue);
			color: var(--onforeground);
			border-color: var(--lightblue);
			i {
				color: var(--onforeground);
			}
		}
		&.red {
			background-color: var(--red);
			border-color: var(--red);
			color: var(--onforeground);
			i {
				color: var(--onforeground);
			}
		}
	}
</style>
