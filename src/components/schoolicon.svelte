<script>
	export let school;
	export let type = '';
	var iconClass = '';
	$: switch (school.toLowerCase()) {
		case 'evocation':
			iconClass = 'ri-fire-line';
			break;
		case 'abjuration':
			iconClass = 'ri-shield-line';
			break;
		case 'conjuration':
			iconClass = 'ri-loader-line';
			break;
		case 'divination':
			iconClass = 'ri-open-arm-line';
			break;
		case 'enchantment':
			iconClass = 'ri-margic-line';
			break;
		case 'illusion':
			iconClass = 'ri-spy-line';
			break;
		case 'necromancy':
			iconClass = 'ri-skull-line';
			break;
		case 'transmutation':
			iconClass = 'ri-contrast-line';
			break;
		case 'blank':
			iconClass = 'ri-checkbox-blank-circle-fill';
			break;
		default:
			break;
	}
</script>

{#if school.toLowerCase() === 'evocation'}
	<i class="{school.toLowerCase()} {type} ri-fire-line" />
{:else if school.toLowerCase() === 'abjuration'}
	<i class="{school.toLowerCase()} {type} ri-shield-line" />
{:else if school.toLowerCase() === 'conjuration'}
	<i class="{school.toLowerCase()} {type} ri-loader-line" />
{:else if school.toLowerCase() === 'divination'}
	<i class="{school.toLowerCase()} {type} ri-open-arm-line" />
{:else if school.toLowerCase() === 'enchantment'}
	<i class="{school.toLowerCase()} {type} ri-magic-line" />
{:else if school.toLowerCase() === 'illusion'}
	<i class="{school.toLowerCase()} {type} ri-spy-line" />
{:else if school.toLowerCase() === 'necromancy'}
	<i class="{school.toLowerCase()} {type} ri-skull-line" />
{:else if school.toLowerCase() === 'transmutation'}
	<i class="{school.toLowerCase()} {type} ri-contrast-line" />
{/if}

<style lang="scss">
	i {
		color: var(--white);
		font-size: 2rem;
		vertical-align: -6px;
		// margin-right: 0.5rem;
		&.evocation {
			color: var(--red);
		}
		&.divination {
			color: var(--purple);
		}
		&.abjuration {
			color: var(--lightgreen);
		}
		&.conjuration {
			color: var(--lightblue);
		}
		&.enchantment {
			color: var(--yellow);
		}
		&.illusion {
			color: var(--darkblue);
		}
		&.necromancy {
			color: var(--darkgreen);
		}
		&.transmutation {
			color: var(--pink);
		}
		&.small {
			font-size: 1.3rem;
			margin-right: 0.2rem;
			vertical-align: -5px;
			margin-left: -3px;
		}
		&.tiny {
			font-size: 1rem;
			margin-right: 0.2rem;
			vertical-align: -2px;
			margin-left: -3px;
		}
	}
</style>
