import { create } from 'zustand'

export const userStore = create((set) => ({
	users: [],
	setUsers: (newUser) =>
		set((state) => ({ users: [...state.users, newUser] })),
}))
