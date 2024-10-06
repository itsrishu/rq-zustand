import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { cartStore } from './cartStore'
import { useRouter } from 'next/navigation'

function Header() {
	const { totalItems } = cartStore()
	const router = useRouter()

	return (
		<div className='flex justify-between items-center p-3 border-b-[1px] border-solid border-gray-500'>
			<h1>Cart</h1>
			<div
				className='flex mr-2 cursor-pointer'
				onClick={() => router.push('/cart/cart-page')}
			>
				<ShoppingCart className='mr-2' />
				{totalItems}
			</div>
		</div>
	)
}

export default Header
