import React, { useState, useEffect } from 'react'

const TrendingItems = () => {
	const [items, setItems] = useState([])
	const [period, setPeriod] = useState('weekly') // default period

	useEffect(() => {
		const fetchTrendingItems = async () => {
			try {
				const response = await fetch(
					'https://sedap-3.onrender.com/api/analytics'
				)
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}
				const data = await response.json()
				setItems(data.trendingItems || [])
			} catch (error) {
				console.error('Error:', error)
			}
		}

		fetchTrendingItems()
	}, [])

	const getTrendIcon = trend => {
		return trend === 'up' ? (
			<img src='./src/assets/up.png' alt='Trending Up' className='w-7 h-7' />
		) : (
			<img
				src='./src/assets/down.png'
				alt='Trending Down'
				className='w-7 h-7'
			/>
		)
	}

	const getTrendColor = trend => {
		return trend === 'up' ? 'text-green-400' : 'text-red-400'
	}

	return (
		<div className='bg-white p-6 rounded-2xl shadow-sm w-[670px] h-[550px] absolute top-[-70px]'>
			<div className='flex items-start justify-between mb-8'>
				<div>
					<h2 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
						🔥 Trending Items
					</h2>
					<p className='text-sm text-gray-400 mt-1'>
						Lorem ipsum dolor sit amet, consectetur
					</p>
				</div>
				<div className='relative'>
					<select
						value={period}
						onChange={e => setPeriod(e.target.value)}
						className='bg-gray-50 text-gray-600 px-4 py-2 rounded-lg text-sm border-none outline-none appearance-none pr-8 cursor-pointer'
					>
						<option value='weekly'>Weekly</option>
						<option value='daily'>Daily</option>
						<option value='monthly'>Monthly</option>
					</select>
					<svg
						className='absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none'
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
				</div>
			</div>

			<div className='space-y-6'>
				{items
					.sort((a, b) => b[period] - a[period]) // сортировка по текущему периоду
					.map((item, index) => (
						<div key={item.id} className='flex items-center justify-between'>
							<div className='flex items-center gap-4'>
								<span className='text-gray-400 font-semibold text-xl w-8'>
									#{index + 1}
								</span>
								<div className='w-16 h-16 rounded-2xl overflow-hidden bg-gray-100'>
									<img
										src={item.img}
										alt={item.name}
										className='w-full h-full object-cover'
									/>
								</div>
								<div className='flex-1'>
									<h3 className='text-gray-900 font-semibold text-[18px] leading-tight mb-1'>
										{item.name}
									</h3>
									<div className='flex items-center gap-3'>
										<span className='text-gray-500 text-sm font-medium'>
											$14.99
										</span>
										<span className='text-teal-500 text-xs font-bold uppercase tracking-wide'>
											{item.category}
										</span>
									</div>
								</div>
							</div>

							<div className='text-right'>
								<div className='flex items-center justify-end gap-2 mb-1'>
									<div
										className={`${getTrendColor(item.trend)} flex items-center`}
									>
										{getTrendIcon(item.trend)}
									</div>
									<span className='text-gray-900 font-bold text-2xl'>
										{item[period]}
									</span>
								</div>
								<div className='text-sm text-gray-400'>
									Sales{' '}
									<span className={`${getTrendColor(item.trend)} font-medium`}>
										({item.change})
									</span>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	)
}

export default TrendingItems
