'use client'
import React from 'react'
import { cartStore } from '../cartStore'

function page() {
	const { cart } = cartStore()
	console.log(cart, '99')

	return (
		<div className='grid grid-cols-5 gap-3 mt-3'>
			{cart?.map((item) => (
				<Product product={item} key={item.id} />
			))}
		</div>
	)
}

export default page
