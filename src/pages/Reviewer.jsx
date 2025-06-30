import React, { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

const Reviews = () => {
	const [reviews, setReviews] = useState([])
	const [filteredReviews, setFilteredReviews] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [currentSlide, setCurrentSlide] = useState(0)
	const [selectedDate, setSelectedDate] = useState('')
	const [availableDates, setAvailableDates] = useState([])
	const [sortOption, setSortOption] = useState('Latest')
	const [searchQuery, setSearchQuery] = useState('')

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const res = await fetch('https://sedap-2.onrender.com/api/comments')
				if (!res.ok) throw new Error('Failed to fetch reviews')
				const data = await res.json()
				if (!Array.isArray(data))
					throw new Error('Expected an array of reviews')

				setReviews(data)

				const dates = [
					...new Set(data.map(r => r.date || r.createdAt).filter(Boolean)),
				].sort()
				setAvailableDates(dates)
				const defaultDate = dates[0] || ''
				setSelectedDate(defaultDate)
				filterAndSortReviews(data, defaultDate, sortOption, searchQuery)
			} catch (err) {
				console.error(err)
				setError(err.message)
				setFilteredReviews([])
			} finally {
				setLoading(false)
			}
		}
		fetchReviews()
	}, [])

	const filterAndSortReviews = (data, date, sort, query) => {
		let filtered = date
			? data.filter(r => (r.date || r.createdAt) === date)
			: [...data]

		if (query.trim()) {
			filtered = filtered.filter(r =>
				(r.title || r.dishName || '')
					.toLowerCase()
					.includes(query.toLowerCase())
			)
		}

		const sorted = [...filtered].sort((a, b) => {
			const dateA = new Date(a.date || a.createdAt || 0)
			const dateB = new Date(b.date || b.createdAt || 0)
			const ratingA = parseFloat(a.rating || a.ball || -1)
			const ratingB = parseFloat(b.rating || b.ball || -1)

			if (sort === 'Latest') return dateB - dateA
			if (sort === 'Oldest') return dateA - dateB
			if (sort === 'Highest Rated') return ratingB - ratingA
			if (sort === 'Lowest Rated') return ratingA - ratingB
			return 0
		})

		setFilteredReviews(sorted)
		setCurrentSlide(0)
	}

	const handleDateFilter = e => {
		const date = e.target.value
		setSelectedDate(date)
		filterAndSortReviews(reviews, date, sortOption, searchQuery)
	}

	const handleSortFilter = e => {
		const sort = e.target.value
		setSortOption(sort)
		filterAndSortReviews(reviews, selectedDate, sort, searchQuery)
	}

	const handleSearch = e => {
		const query = e.target.value
		setSearchQuery(query)
		filterAndSortReviews(reviews, selectedDate, sortOption, query)
	}

	const nextSlide = () => {
		if (filteredReviews.length > 3) {
			setCurrentSlide(prev => Math.min(prev + 1, filteredReviews.length - 3))
		}
	}

	const prevSlide = () => {
		if (filteredReviews.length > 3) {
			setCurrentSlide(prev => Math.max(prev - 1, 0))
		}
	}

	const renderStars = rating => {
		const stars = Math.floor(parseFloat(rating || 0))
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`w-4 h-4 ${
					i < stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
				}`}
			/>
		))
	}

	const getInitials = name => {
		return name
			? name
					.split(' ')
					.map(n => n[0])
					.join('')
					.toUpperCase()
			: 'U'
	}

	if (loading) {
		return (
			<div className='min-h-screen p-6'>
				<div className='animate-pulse max-w-7xl mx-auto'>
					<div className='h-8 bg-gray-200 rounded w-32 mb-6'></div>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{[1, 2, 3].map(i => (
							<div key={i} className='bg-white rounded-2xl p-6 shadow-sm'>
								<div className='w-full h-48 bg-gray-200 rounded-xl mb-4'></div>
								<div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
								<div className='h-4 bg-gray-200 rounded w-1/2'></div>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='min-h-screen p-6'>
				<p className='text-red-600 text-center'>{error}</p>
			</div>
		)
	}

	return (
		<div className='min-h-screen'>
			<div className='max-w-7xl mx-auto p-6'>
				{/* Title & Date Filter */}
				<div className='flex items-center justify-between mb-8'>
					<div>
						<h1 className='text-2xl font-semibold text-gray-800 mb-2'>
							Reviews
						</h1>
						<div className='text-sm text-gray-500 flex items-center gap-2'>
							<span className='text-teal-500 hover:underline cursor-pointer'>
								Dashboard
							</span>
							/<span>Customer Reviews</span>
						</div>
					</div>
					<div className='flex items-center bg-white px-4 py-2 rounded-lg shadow-sm gap-2'>
						<Calendar className='w-4 h-4 text-gray-400' />
						<select
							value={selectedDate}
							onChange={handleDateFilter}
							className='px-3 py-2 border border-gray-200 rounded-lg text-sm'
						>
							<option value=''>All Dates</option>
							{availableDates.map((d, i) => (
								<option key={i} value={d}>
									{d}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Top 3 Carousel */}
				<div className='relative mb-12'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden'>
						{filteredReviews
							.slice(currentSlide, currentSlide + 3)
							.map((review, i) => (
								<div
									key={review._id || i}
									className='bg-white rounded-2xl p-6 shadow-sm'
								>
									<div className='flex items-center gap-4 mb-4'>
										<div className='w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden'>
											<img
												src={review.img || avatar}
												alt={review.title || review.dishName || 'Food item'}
												className='w-full h-full object-cover rounded-full'
											/>
										</div>
										<div className='flex-1'>
											<h3 className='font-semibold text-gray-800 mb-1'>
												{review.title || review.dishName || 'Delicious Dish'}
											</h3>
											<span className='text-teal-500 px-2 py-1 rounded text-xs font-medium'>
												{review.category || review.cotegory || 'MAIN COURSE'}
											</span>
										</div>
									</div>
									<p className='text-sm text-gray-600 mb-4 line-clamp-3'>
										{review.description ||
											review.comment ||
											review.content ||
											'No review content.'}
									</p>
									<div className='bg-gray-100 rounded-xl p-4 flex items-center space-x-3'>
										<div className='w-10 h-10 bg-indigo-500 rounded-full text-white flex items-center justify-center overflow-hidden'>
											{review.author?.avatar ? (
												<img
													src={review.author.avatar}
													alt={review.author.name}
													className='w-full h-full object-cover rounded-full'
												/>
											) : (
												getInitials(review.author?.name)
											)}
										</div>
										<div className='flex-1'>
											<div className='flex items-center justify-between'>
												<span className='font-medium text-gray-800 text-sm'>
													{review.author?.name || 'Anonymous'}
												</span>
												<div className='flex items-center gap-1'>
													<Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
													<span className='font-semibold text-gray-800'>
														{review.ball || '0'}
													</span>
												</div>
											</div>
											<span className='text-xs text-gray-500'>
												{review.author?.position}
											</span>
										</div>
									</div>
								</div>
							))}
					</div>

					{filteredReviews.length > 3 && (
						<div className='flex justify-end mt-4 gap-2'>
							<button
								onClick={prevSlide}
								disabled={currentSlide === 0}
								className='w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50'
							>
								<ChevronLeft className='w-4 h-4 text-gray-600' />
							</button>
							<button
								onClick={nextSlide}
								disabled={currentSlide >= filteredReviews.length - 3}
								className='w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50'
							>
								<ChevronRight className='w-4 h-4 text-gray-600' />
							</button>
						</div>
					)}
				</div>

				{/* All Reviews Section */}
				<div className='bg-white rounded-2xl p-6 shadow-sm'>
					<div className='flex items-center justify-between mb-6'>
						<h2 className='text-xl font-semibold text-gray-800'>
							Others review
						</h2>
						<select
							value={sortOption}
							onChange={handleSortFilter}
							className='px-3 py-2 border border-gray-200 rounded-lg'
						>
							<option value='Latest'>Latest</option>
							<option value='Oldest'>Oldest</option>
							<option value='Highest Rated'>Highest Rated</option>
							<option value='Lowest Rated'>Lowest Rated</option>
						</select>
					</div>
					<div className='space-y-6'>
						{filteredReviews.map((review, i) => (
							<div
								key={review._id || i}
								className='flex space-x-4 pb-6 border-b border-gray-100 last:border-b-0'
							>
								<div className='w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden text-white font-semibold'>
									{review.author?.avatar ? (
										<img
											src={review.author.avatar}
											alt={review.author.name}
											className='w-full h-full object-cover rounded-full'
										/>
									) : (
										getInitials(review.author?.name)
									)}
								</div>
								<div className='flex-1'>
									<div className='flex items-start justify-between mb-2'>
										<div>
											<h4 className='font-medium text-gray-800'>
												{review.author?.name || 'Anonymous User'}
											</h4>
											<div className='flex items-center space-x-2 text-xs text-gray-500 mt-1'>
												<span>{review.author?.position}</span>
												<span>•</span>
												<span>{review.date || 'Unknown date'}</span>
											</div>
										</div>
										<div className='flex items-center space-x-4'>
											<div className='flex space-x-1'>
												{review.tags?.map((tag, idx) => (
													<span
														key={idx}
														className={`px-2 py-1 rounded text-xs font-medium ${
															tag === 'Good Services'
																? 'bg-blue-100 text-blue-600'
																: tag === 'Good Places'
																? 'bg-green-100 text-green-600'
																: tag === 'Excellent'
																? 'bg-orange-100 text-orange-600'
																: tag === 'Delicious'
																? 'bg-teal-100 text-teal-600'
																: 'bg-gray-100 text-gray-600'
														}`}
													>
														{tag}
													</span>
												))}
											</div>
											<div className='text-right'>
												<div className='text-xl font-bold text-gray-800 mb-1'>
													{review.ball || 'N/A'}
												</div>
												<div className='flex space-x-1'>
													{renderStars(review.ball)}
												</div>
											</div>
										</div>
									</div>
									<p className='text-sm text-gray-600 leading-relaxed'>
										{review.comment ||
											review.description ||
											review.content ||
											'No review text.'}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Reviews
