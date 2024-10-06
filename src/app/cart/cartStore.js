import { create } from 'zustand'

export const cartStore = create((set) => ({
	error: '',
	cart: [],
	products: { products: [] },
	fetchProducts: async () => {
		try {
			const resp = await fetch('https://dummyjson.com/products')
			const res = await resp.json()
			set({ products: res })
		} catch (e) {
			console.error('Error fetching products:', e)
			set({ error: e })
		}
	},
	totalValue: 0,
	totalItems: 0,
	updateCart: (product) =>
		set((state) => ({
			...state,
			cart: { ...state.cart, product },
			totalItems: state.totalItems + 1,
			totalValue: state.totalValue + product.price,
		})),

	updateItemCount: () =>
		set((state) => ({ totalItems: state.totalItems + 1 })),
}))
