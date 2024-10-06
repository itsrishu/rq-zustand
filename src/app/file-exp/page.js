'use client'
import React, { useState } from 'react'
import data from './data.json'
import { Folder, File } from 'lucide-react'

const useTreeTraversal = () => {
	const insertNode = (tree, uid, text, isFolder) => {
		if (tree.uid === uid) {
			tree.items.unshift({
				uid: new Date().getTime(),
				title: text,
				isFolder: isFolder,
				items: [],
			})
			return tree
		}

		let latestNode = []
		latestNode = tree.items.map((item) => {
			return insertNode(item, uid, text, isFolder)
		})

		return { ...tree, items: latestNode }
	}

	return { insertNode }
}

export default function page() {
	const [explorerData, setExplorerData] = useState(data)
	const { insertNode } = useTreeTraversal()

	const insert = (uid, text, isFolder) => {
		const updatedTree = insertNode(explorerData, uid, text, isFolder)
		setExplorerData(updatedTree)
	}

	return (
		<div className=''>
			<Folders explorerData={explorerData} insert={insert} />
		</div>
	)
}

function Folders({ explorerData, insert }) {
	const [isExpanded, setIsExpanded] = useState(true)
	const [text, setText] = useState('')
	const [input, setInput] = useState({
		isVisible: false,
		isFolder: false,
	})

	const insertItem = () => {
		insert(explorerData.uid, text, input.isFolder)
		setText('')
		setInput({
			isVisible: false,
			isFolder: false,
		})
	}

	const handleKeyUp = (e) => {
		if (e.keyCode === 13) {
			insertItem()
		}
	}

	if (explorerData.isFolder) {
		return (
			<div className='ml-3'>
				<div
					className='flex'
					onClick={() => setIsExpanded(!isExpanded)}
				>
					<Folder />
					<h2 className='ml-2'>{explorerData.title}</h2>
					<div>
						<button
							onClick={(e) => {
								if (e) e.preventDefault()
								setInput({ isVisible: true, isFolder: true })
							}}
						>
							<Folder />
						</button>
						<button>
							<File
								onClick={(e) => {
									if (e) e.preventDefault()
									setInput({
										isVisible: true,
										isFolder: false,
									})
								}}
							/>
						</button>
					</div>
				</div>

				{input.isVisible && (
					<div className='flex'>
						{input.isFolder ? <Folder /> : <File />}
						<input
							value={text}
							onChange={(e) => setText(e.target.value)}
							onKeyUp={(e) => handleKeyUp(e)}
							className='text-gray-900'
						/>
					</div>
				)}

				{isExpanded &&
					explorerData?.items?.map((exp) => (
						<Folders explorerData={exp} insert={insert} />
					))}
			</div>
		)
	} else {
		return (
			<div className='ml-3'>
				<div className='flex'>
					<File />
					<h2 className='ml-2'>{explorerData.title}</h2>
				</div>
			</div>
		)
	}
}
