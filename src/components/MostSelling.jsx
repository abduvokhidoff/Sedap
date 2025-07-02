import { useEffect, useState } from "react"

const MostSelling = () => {
	const [items, setItems] = useState([])
	const [period, setPeriod] = useState('weekly')

	useEffect(() => {
		const fetchMostSellingItems = async () => {
			try {
				const response = await fetch(
					'https://sedap-3.onrender.com/api/analytics'
				)
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}
				const data = await response.json()
				setItems(data.mostSellingItems || [])
			} catch (error) {
				console.error('Error:', error)
			}
		}

		fetchMostSellingItems()
	}, [])

	return (
		<div className='bg-white p-6 rounded-2xl shadow-sm w-[450px] h-[570px]'>
			<div className='flex items-start justify-between mb-8'>
				<div>
					<h2 className='text-xl font-bold text-gray-900'>
						Most Selling Items
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
					.sort((a, b) => b.sales - a.sales)
					.slice(0, 5)
					.map((item, index) => (
						<div key={item.id} className='flex items-center justify-between'>
							<div className='flex items-center gap-4'>
								<span className='text-gray-400 font-semibold text-xl w-8'>
									#{index + 1}
								</span>
								<div className='w-16 h-16 rounded-2xl overflow-hidden bg-gray-100'>
									<img
										src={item.image}
										alt={item.name}
										className='w-full h-full object-cover'
									/>
								</div>
								<div className='flex-1'>
									<h3 className='text-gray-900 font-semibold text-[16px] leading-tight mb-1'>
										{item.name}
									</h3>
									<div className='flex items-center gap-3'>
										<span className='text-gray-500 text-sm font-medium'>
											${item.price}
										</span>
										<span className='text-teal-500 text-xs font-bold uppercase tracking-wide'>
											{item.category}
										</span>
									</div>
								</div>
							</div>

							<div className='text-right'>
								<div className='flex items-center justify-end gap-2 mb-1'>
									<span className='text-gray-900 font-bold text-2xl'>
										{item.sales}
									</span>
								</div>
								<div className='text-sm text-gray-400'>Sales</div>
							</div>
						</div>
					))}
			</div>
		</div>
	)
}

export default MostSelling
