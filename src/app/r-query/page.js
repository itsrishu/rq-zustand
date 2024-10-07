'use client'
import React, { useCallback, useRef, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import data from './data.json'
import {
	useQuery,
	useMutation,
	useQueryClient,
	useInfiniteQuery,
} from '@tanstack/react-query'
import PostList from './postList'

//https://jsonplaceholder.typicode.com/todos?_page=${page}

const fetchData = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(data)
		}, 200)
	})
}

const addData = (tree) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const newItem = {
				uid: new Date().getTime(),
				title: Math.random().toString(36).slice(-5),
			}
			resolve([...tree, newItem])
		}, 200)
	})
}

function Page() {
	const queryClient = useQueryClient()
	const [toggle, setToggle] = useState(true)

	const observer = useRef()

	const fetchTodos = async ({ pageParam }) => {
		const res = await fetch(
			`https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`
		)
		return res.json()
	}

	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
	} = useInfiniteQuery({
		queryKey: ['todos'],
		queryFn: fetchTodos,
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			return lastPage.length === 10 ? pages.length + 1 : undefined
		},
	})

	const lastItemRef = useCallback(
		(node) => {
			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver(
				(entries) => {
					const entry = entries[0]
					if (entry.isIntersecting && hasNextPage) {
						fetchNextPage()
					}
				},
				{
					threshold: '1',
				}
			)
			if (node) observer.current.observe(node)
		},
		[hasNextPage]
	)

	// const mutation = useMutation({
	// 	mutationFn: (currentTree) => addData(currentTree), // Properly pass the current tree to addData
	// 	onSuccess: (newTree) => {
	// 		// Update the query cache with the new tree data
	// 		queryClient.setQueryData(['data'], newTree)
	// 	},
	// })

	const content = data?.pages?.map((page) =>
		page.map((p, idx) => {
			return (
				<Todo
					key={p.id}
					todo={p}
					innerRef={page.length === idx + 1 ? lastItemRef : null}
				/>
			)
		})
	)

	return (
		<div className='flex justify-center flex-col items-center'>
			<div>
				<h2 className='title'>My Posts</h2>
				<button onClick={() => setToggle(!toggle)}>Toggle</button>
				{toggle && <PostList />}
			</div>
			{/* <div>{content}</div> */}
			{/* {hasNextPage ? (
				<button
					className='flex p-2 border border-solid border-gray-400 rounded-md mt-3'
					onClick={fetchNextPage}
				>
					Load More
				</button>
			) : null} */}

			{isFetchingNextPage || isFetching ? (
				<div className='flex mt-3'>
					<LoaderCircle
						size={48}
						className='animate-spin text-blue-500'
					/>
				</div>
			) : null}
		</div>
	)
}

export default Page

const Todo = ({ todo, innerRef }) => {
	return (
		<div
			ref={innerRef}
			className='flex h-20 border border-solid border-gray-400 rounded-md mt-2'
		>
			<h1>{todo.title}</h1>
		</div>
	)
}
