import React, { useEffect, useState } from 'react'
import axios from 'axios'
import view from '../assets/view.png'
import edit from '../assets/edit.png'
import deletes from '../assets/delete.png'
import duplicate from '../assets/duplicate.png'

const Foods = () => {
	const [foods, setFoods] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [searchTerm, setSearchTerm] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isAddingCard, setIsAddingCard] = useState(false)
	const [formData, setFormData] = useState({
		title: '',
		img: '',
		type: 'Food',
		name: '',
	})

	useEffect(() => {
		axios
			.get('https://sedap-2.onrender.com/api/foods')
			.then(res => {
				const data = Array.isArray(res.data) ? res.data : [res.data]
				setFoods(data)
				setIsLoading(false)
			})
			.catch(err => {
				console.error('API Error:', err)
				setIsLoading(false)
			})
	}, [])

	const handleDuplicate = food => {
		const { title, img, type, name } = food
		axios
			.post('https://sedap-2.onrender.com/api/foods', {
				title,
				img,
				type,
				name,
			})
			.then(res => setFoods(prev => [...prev, res.data]))
			.catch(err => console.error('Duplicate error:', err))
	}

	const handleDelete = id => {
		if (!id) return console.warn("ID yo'q!")
		axios
			.delete(`https://sedap-2.onrender.com/api/foods/${id}`)
			.then(() => setFoods(prev => prev.filter(item => item._id !== id)))
			.catch(err => console.error('Delete error:', err))
	}

	const handleAddFood = () => {
		setIsModalOpen(false)
		setIsAddingCard(true)
		axios
			.post('https://sedap-2.onrender.com/api/foods', formData)
			.then(res => {
				setFoods(prev => [...prev, res.data])
				setFormData({ title: '', img: '', type: 'Food', name: '' })
			})
			.catch(err => console.error('Add new food error:', err))
			.finally(() => setIsAddingCard(false))
	}

	const filteredFoods = foods.filter(item =>
		item.title.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div className='px-[35px] bg-gray-100 pb-[60px] w-full relative '>
			{/* Modal */}
			{isModalOpen && (
				<div className='fixed inset-0 bg-[#00000080] backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50'>
					<div className='bg-white rounded-lg p-6 w-[400px] space-y-4'>
						<h2 className='text-xl font-semibold text-gray-700 text-center'>
							Add New Menu
						</h2>
						<input
							type='text'
							placeholder='Title'
							value={formData.title}
							onChange={e =>
								setFormData({ ...formData, title: e.target.value })
							}
							className='w-full px-4 py-2 border rounded-md'
						/>
						<input
							type='text'
							placeholder='Image URL'
							value={formData.img}
							onChange={e => setFormData({ ...formData, img: e.target.value })}
							className='w-full px-4 py-2 border rounded-md'
						/>
						<input
							type='text'
							placeholder='Name'
							value={formData.name}
							onChange={e => setFormData({ ...formData, name: e.target.value })}
							className='w-full px-4 py-2 border rounded-md'
						/>
						<div className='flex justify-end gap-2'>
							<button
								onClick={() => setIsModalOpen(false)}
								className='px-4 py-2 bg-gray-300 rounded'
							>
								Cancel
							</button>
							<button
								onClick={handleAddFood}
								disabled={isAddingCard}
								className='px-4 py-2 bg-green-500 text-white rounded'
							>
								{isAddingCard ? 'Adding...' : 'Add'}
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Header & Search */}
			<div className='flex justify-between items-center'>
				<div>
					<p className='text-[24px] font-medium text-gray-600'>Foods</p>
					<p className='text-[14px] text-gray-400'>
						Here is your menu summary with graph view
					</p>
				</div>
				<div className='flex items-center gap-4'>
					<input
						type='text'
						placeholder='Search here'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						className='bg-white w-[400px] py-[16px] pl-[20px] rounded-[13px] shadow-2xl'
					/>
					<button className='p-[16px] bg-white rounded-[10px] shadow-2xl'>
						<img
							className='w-[20px]'
							src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Cc1G24SQxBgLgRuqBjRuAFivCke99FBVTQ&s'
							alt=''
						/>
					</button>
					<button
						onClick={() => setIsModalOpen(true)}
						className='bg-green-500 py-[14px] px-6 text-white rounded-[13px] shadow-2xl'
					>
						New Menu
					</button>
				</div>
			</div>

			{/* Cards */}
			<div className='flex flex-wrap gap-[20px] justify-center mt-[130px] gap-y-[130px]'>
				{isLoading
					? Array(5)
							.fill()
							.map((_, i) => (
								<div
									key={i}
									className='bg-white w-[240px] h-[340px] rounded-[15px] animate-pulse flex flex-col items-center pt-[100px] gap-4'
								>
									<div className='w-[72%] h-[50%] rounded-full bg-gray-200 absolute left-[14%] bottom-[72%]' />
									<div className='h-5 w-[75%] bg-gray-200 rounded' />
									<div className='h-3 w-[40%] bg-gray-200 rounded' />
									<div className='flex gap-2 mt-[20px]'>
										{[1, 2, 3, 4].map(v => (
											<div
												key={v}
												className='w-10 h-10 bg-gray-200 rounded-xl'
											/>
										))}
									</div>
								</div>
							))
					: filteredFoods.map(v => (
							<div
								key={v._id}
								className='bg-white w-[240px] h-[340px] rounded-[15px] flex flex-col items-center pt-[100px] gap-4 relative'
							>
								<img
									className='w-[72%] h-[50%] rounded-full absolute left-[14%] bottom-[72%]'
									src={v.img}
									alt='product'
								/>
								<p className='text-[16px] text-gray-600 w-[75%] text-center font-semibold mt-[30px]'>
									{v.title}
								</p>
								<p className='text-xs mt-[10px]'>
									<span className='text-green-500'>{v.type} /</span> {v.name}
								</p>
								<div className='flex gap-2 mt-[20px]'>
									{[
										{ img: view, label: 'View' },
										{ img: edit, label: 'Edit' },
										{
											img: deletes,
											label: 'Delete',
											action: () => handleDelete(v._id),
										},
										{
											img: duplicate,
											label: 'Duplicate',
											action: () => handleDuplicate(v),
										},
									].map(({ img, label, action }) => (
										<div key={label} className='flex flex-col items-center'>
											<button
												onClick={action}
												className='p-1.5 bg-opacity-50 rounded-xl bg-gray-300 hover:bg-gray-400'
											>
												<img className='w-7' src={img} alt={label} />
											</button>
											<p className='text-gray-400 text-xs'>{label}</p>
										</div>
									))}
								</div>
							</div>
					  ))}

				{isAddingCard && (
					<div className='flex justify-center items-center w-[240px] h-[340px] bg-white rounded-[15px]'>
						<div className='w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin' />
					</div>
				)}
			</div>

			{/* Pagination */}
			<div className='flex justify-between w-full items-center mt-10'>
				<p className='text-gray-600 font-medium'>
					Showing {foods.length} from 100 Menu
				</p>
				<div className='flex bg-white rounded-lg overflow-hidden border'>
					{['<', 1, 2, 3, 4, '>'].map((v, i) => (
						<p
							key={i}
							className='px-5 py-3 border-r last:border-r-0 cursor-pointer hover:bg-slate-700 hover:text-white transition-all'
						>
							{v}
						</p>
					))}
				</div>
			</div>

			{/* Chart */}
			<div className='w-full h-[640px] bg-white rounded-xl my-10 flex justify-evenly items-center'>
				{[
					{
						percent: 75,
						color: 'text-blue-500',
						fill: '#3B82F6',
						label: 'Burger',
					},
					{
						percent: 32,
						color: 'text-red-500',
						fill: '#EF4444',
						label: 'Pizza',
					},
					{
						percent: 67,
						color: 'text-yellow-400',
						fill: '#FACC15',
						label: 'Soft Drink',
					},
				].map(({ percent, color, fill, label }, i) => (
					<div key={i} className='flex flex-col items-center'>
						<svg className='w-64 h-64'>
							<circle
								className='text-gray-200'
								strokeWidth='10'
								stroke='currentColor'
								fill='transparent'
								r='104'
								cx='128'
								cy='128'
							/>
							<circle
								className={color}
								strokeWidth='40'
								strokeDasharray='326'
								strokeDashoffset={326 - (326 * percent) / 100}
								strokeLinecap='round'
								stroke='currentColor'
								fill='transparent'
								r='104'
								cx='128'
								cy='128'
							/>
							<text
								x='128'
								y='140'
								textAnchor='middle'
								fill={fill}
								fontSize='30'
								fontWeight='bold'
							>
								{percent}%
							</text>
						</svg>
						<p className='mt-4 text-gray-600 font-medium text-xl'>{label}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default Foods
