import { create } from 'zustand'

export const postsStore = create((set) => ({
	posts: [],
	isLoading: false,
	error: '',
	fetchTodos: async () => {
		set({ isLoading: true })
		try {
			const resp = await fetch(
				'https://jsonplaceholder.typicode.com/todos'
			)

			const res = await resp.json()
			set({ posts: res })
		} catch (e) {
			set({ error: e })
		} finally {
			set({ isLoading: false })
		}
	},
}))
