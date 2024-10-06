const DB_DATA = [
	{ id: 1, name: 'Lettuce', price: 15, isAvailable: true },
	{ id: 2, name: 'Tomato', price: 10, isAvailable: true },
	{ id: 3, name: 'Onions', price: 10, isAvailable: true },
	{ id: 4, name: 'Pickles', price: 10, isAvailable: true },
	{ id: 5, name: 'Jalapenos', price: 15, isAvailable: true },
	{ id: 6, name: 'Grilled Mushrooms', price: 25, isAvailable: true },
]

export const fetchDBData = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(DB_DATA)
		}, 300)
	})
}

export const alterDBData = (tree, newItem) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const appendNewItem = [...tree]
			appendNewItem.push({
				...newItem,
				id: new Date().getTime(),
			})
			resolve(appendNewItem)
		}, 300)
	})
}
