import React, { useState, useEffect } from 'react'

const MostFavourite = () => {
	const [favouriteItems, setFavouriteItems] = useState([])
	const [loading, setLoading] = useState(true)
	const [activeFilter, setActiveFilter] = useState('Daily')

	useEffect(() => {
		const fetchFavouriteItems = async () => {
			try {
				const response = await fetch(
					'https://sedap-3.onrender.com/api/analytics'
				)
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}
				const data = await response.json()
				setFavouriteItems(data.favouriteItems || [])
				setLoading(false)
			} catch (error) {
				console.error('Error fetching favourite items:', error)
				setLoading(false)
			}
		}

		fetchFavouriteItems()
	}, [])

	const renderStars = rating => {
		const stars = []
		const fullStars = Math.floor(rating)
		const hasHalfStar = rating % 1 !== 0

		for (let i = 0; i < 5; i++) {
			if (i < fullStars) {
				stars.push(
					<span key={i} className='text-yellow-400 text-sm'>
						★
					</span>
				)
			} else if (i === fullStars && hasHalfStar) {
				stars.push(
					<span key={i} className='text-yellow-400 text-sm'>
						★
					</span>
				)
			} else {
				stars.push(
					<span key={i} className='text-gray-300 text-sm'>
						★
					</span>
				)
			}
		}
		return stars
	}

	if (loading) {
		return (
			<div className='bg-white p-6 rounded-2xl shadow-sm'>
				<div className='animate-pulse'>
					<div className='h-6 bg-gray-200 rounded w-48 mb-4'></div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4'>
						{[...Array(6)].map((_, i) => (
							<div key={i} className='h-64 bg-gray-200 rounded-2xl'></div>
						))}
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='bg-white p-6 rounded-2xl shadow-sm mt-[500px]'>
			{/* Header */}
			<div className='flex justify-between items-center mb-6'>
				<div>
					<h2 className='text-xl font-semibold text-gray-900 mb-1'>
						Most Favourite Items
					</h2>
					<p className='text-sm text-gray-500'>
						Lorem ipsum dolor sit amet, consectetur
					</p>
				</div>
				<div className='flex bg-gray-100 rounded-lg p-1'>
					{['Monthly', 'Weekly', 'Daily'].map(filter => (
						<button
							key={filter}
							onClick={() => setActiveFilter(filter)}
							className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
								activeFilter === filter
									? 'bg-white text-gray-900 shadow-sm'
									: 'text-gray-600 hover:text-gray-900'
							}`}
						>
							{filter}
						</button>
					))}
				</div>
			</div>

			{/* Items Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4'>
				{favouriteItems.map(item => (
					<div key={item.id} className='group cursor-pointer'>
						{/* Image Container */}
						<div className='relative mb-3 overflow-hidden rounded-2xl'>
							<img
								src={item.image}
								alt={item.name}
								className='w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300'
								onError={e => {
									e.target.src =
										'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDIwMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04NyA3MEw5MyA3Nkw4NyA4MkM4NCA4NSA4MSA4MiA4MSA3OVY3M0M4MSA3MCA4NCA2NyA4NyA3MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTExMyA3MEwxMDcgNzZMMTEzIDgyQzExNiA4NSAxMTkgODIgMTE5IDc5VjczQzExOSA3MCAxMTYgNjcgMTEzIDcwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNOTMgODJIODdWNzZIOTNWODJaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xMDcgODJIMTEzVjc2SDEwN1Y4MloiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+'
								}}
							/>
						</div>

						{/* Content */}
						<div className='space-y-2'>
							<h3 className='font-medium text-gray-900 text-sm leading-tight line-clamp-2 min-h-[2.5rem]'>
								{item.name}
							</h3>

							{/* Rating */}
							<div className='flex items-center gap-2'>
								<div className='flex items-center'>
									{renderStars(parseFloat(item.rating))}
								</div>
								<span className='text-xs text-gray-500'>
									({item.reviews} reviews)
								</span>
							</div>

							{/* Like Button */}
							<button className='flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors'>
								<svg
									className='w-4 h-4'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
									/>
								</svg>
								<span className='text-sm font-medium'>
									{(item.likes / 1000).toFixed(1)}k Like it
								</span>
							</button>
						</div>
					</div>
				))}
			</div>

			{/* View More Button */}
			<div className='flex justify-end mt-6'>
				<button className='flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium'>
					View more
					<svg
						className='w-4 h-4'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M19 9l-7 7-7-7'
						/>
					</svg>
				</button>
			</div>
		</div>
	)
}

export default MostFavourite
