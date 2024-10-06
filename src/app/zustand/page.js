'use client'
import React, { useEffect } from 'react'
import { postsStore } from './pStore'

function page() {
	const store = postsStore()
	const { posts, fetchTodos } = store

	useEffect(() => {
		fetchTodos()
	}, [])

	return <div>page</div>
}

export default page
