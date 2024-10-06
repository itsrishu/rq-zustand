'use client'
import React, { useEffect } from 'react'
import { cartStore } from './cartStore'
import Header from './Header'
import Product from './products'

function page() {
	const store = cartStore()
	const { products, fetchProducts } = store || {}

	useEffect(() => {
		if (fetchProducts) {
			fetchProducts()
		} else {
			console.error('fetchProducts is undefined')
		}
	}, [fetchProducts])

	if (!products || !products.products) {
		return <div>Loading...</div>
	}

	return (
		<div>
			<Header />
			<div className='grid grid-cols-5 gap-3 mt-3'>
				{products.products.map((p) => (
					<Product product={p} key={p.id} />
				))}
			</div>
		</div>
	)
}

export default page
