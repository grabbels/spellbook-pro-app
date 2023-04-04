<script>
	import { addSpell, notification } from '../../stores';
	import { activeOpenBookId, localUserLibrary } from '../../stores-persist';
	$: if ($addSpell) {
        console.log('test')
		if ($localUserLibrary[$activeOpenBookId].list.includes($addSpell)) {
			$notification = 'Spell already in spellbook.#error';
            $addSpell = null
		} else {
			$localUserLibrary[$activeOpenBookId].list = [
				...$localUserLibrary[$activeOpenBookId].list,
				$addSpell
			];
			$notification = 'Spell added.#positive';
			$addSpell = null
		}
	}
</script>
