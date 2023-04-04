// Cloud               local            localPendingChanges
// id: ABC             id: ABC
// id: XYZ             id: XYZ*         XYZ: {list: {add: ['123-456', 'abc-def'], remove: ['456-789']}}
// id: QRS             (id: QRS)        QRS: {delete: true}
//                     id: DEF!         DEF: {~contents~}

//!SYNC TRIGGERED LOCALLY
//received from server
let records = {
	abc: {
		id: 'abc',
		name: ['curse', 'of', 'the', 'sea', 'sorcerer', '/', 'bard'],
		tags: ['awesome', 'epic', 'sorcerer'],
		class: 'sorcerer',
		icon: 'windy',
		color: 'var(--lightblue)',
		level: 12,
		published: false,
		user: 'Grabbels',
		user_id: 'qifyezl9wou7dmh',
		list: [
			'3obr2uhwd3cdrpz',
			'j1zd0rj72f5wm63',
			'vd1yra5uezj2g7i',
			'soyep2e6qgtni87',
			'oliik4e35udgzbd',
			'q9mm43ya4ejnrdv',
			'p4awpt2d2h1irf7',
			'debmc63a7sr25fv'
		]
	},
	xyz: {
		id: 'xyz',
		name: ['sneaky', 'spellthief', '/', 'bladesinger'],
		tags: [],
		class: 'wizard',
		icon: 'criminal',
		color: 'var(--red)',
		level: 11,
		published: false,
		user: 'Grabbels',
		user_id: 'qifyezl9wou7dmh',
		list: [
			'9luehf4s8y8uxwl',
			'u4atyg7l3cxl1t8',
			'61dfxrltx2l0ury',
			'hmaljfx0macp387',
			'li68kf5h7s42wr3',
			's8t81664a14tbpx'
		]
	},
	qrs: {
		id: 'qrs',
		name: ['sneaky', 'spellthief', '/', 'bladesinger'],
		tags: [],
		class: 'wizard',
		icon: 'criminal',
		color: 'var(--red)',
		level: 11,
		published: false,
		user: 'Grabbels',
		user_id: 'qifyezl9wou7dmh',
		list: [
			'9luehf4s8y8uxwl',
			'u4atyg7l3cxl1t8',
			'61dfxrltx2l0ury',
			'hmaljfx0macp387',
			'li68kf5h7s42wr3',
			's8t81664a14tbpx'
		]
	}
};

//localPendingChanges
let localPendingChanges = {
	xyz: {
		list: {
			add: ['123-456', 'abc-def'],
			remove: ['456-789']
		}
	},
	qrs: {
		delete: true
	},
	def: {
		id: 'def',
		name: ['curse', 'of', 'the', 'sea', 'sorcerer', '/', 'bard'],
		tags: ['awesome', 'epic', 'sorcerer'],
		class: 'sorcerer',
		icon: 'windy',
		color: 'var(--lightblue)',
		level: 12,
		published: false,
		user: 'Grabbels',
		user_id: 'qifyezl9wou7dmh',
		list: [
			'3obr2uhwd3cdrpz',
			'j1zd0rj72f5wm63',
			'vd1yra5uezj2g7i',
			'soyep2e6qgtni87',
			'oliik4e35udgzbd',
			'q9mm43ya4ejnrdv',
			'p4awpt2d2h1irf7',
			'debmc63a7sr25fv'
		]
	}
};

//local function run on received records to implement changes
// for (const id in records) {
//     if (records[id] === localPendingChanges) {

// 	}
// }