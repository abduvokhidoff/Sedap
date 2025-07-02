import React, { useState, useEffect } from 'react'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Tooltip,
	Area,
	AreaChart,
} from 'recharts'

const Revenue = () => {
	const [revenueData, setRevenueData] = useState(null)
	const [filter, setFilter] = useState('monthly')

	useEffect(() => {
		const fetchRevenue = async () => {
			try {
				const response = await fetch(
					'https://sedap-3.onrender.com/api/analytics'
				)
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}
				const data = await response.json()
				setRevenueData(data.revenue)
			} catch (error) {
				console.error('Error:', error)
			}
		}

		fetchRevenue()
	}, [])

	const getCurrentData = () => {
		if (!revenueData) return { chart: [], totalRevenue: 0 }

		switch (filter) {
			case 'daily':
				return revenueData.daily
			case 'weekly':
				return revenueData.weekly
			case 'monthly':
			default:
				return revenueData.monthly
		}
	}

	const formatValue = value => {
		if (value >= 1000000) {
			return `${(value / 1000000).toFixed(1)}M`
		} else if (value >= 1000) {
			return `${(value / 1000).toFixed(0)}k`
		}
		return value.toString()
	}

	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<div className='bg-white p-3 rounded-lg shadow-lg border'>
					<p className='text-gray-900 font-semibold'>
						${formatValue(payload[0].value)}
					</p>
					<p className='text-gray-500 text-sm'>2 July 2020</p>
				</div>
			)
		}
		return null
	}

	const currentData = getCurrentData()

	return (
		<div className='bg-white p-6 rounded-2xl shadow-sm w-[450px] h-[470px] absolute right-[0px]'>
			<div className='flex items-start justify-between mb-8'>
				<div>
					<h2 className='text-xl font-bold text-gray-900'>Revenue</h2>
					<p className='text-sm text-gray-400 mt-1'>
						Lorem ipsum dolor sit amet, consectetur
					</p>
				</div>
				<div className='flex bg-gray-50 rounded-lg p-1'>
					<button
						className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
							filter === 'monthly'
								? 'bg-white text-gray-900 shadow-sm'
								: 'text-gray-600 hover:text-gray-900'
						}`}
						onClick={() => setFilter('monthly')}
					>
						Monthly
					</button>
					<button
						className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
							filter === 'weekly'
								? 'bg-white text-gray-900 shadow-sm'
								: 'text-gray-600 hover:text-gray-900'
						}`}
						onClick={() => setFilter('weekly')}
					>
						Weekly
					</button>
					<button
						className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
							filter === 'daily'
								? 'bg-white text-gray-900 shadow-sm'
								: 'text-gray-600 hover:text-gray-900'
						}`}
						onClick={() => setFilter('daily')}
					>
						Daily
					</button>
				</div>
			</div>

			<div className='h-[280px] w-full'>
				<ResponsiveContainer width='100%' height='100%'>
					<AreaChart data={currentData.chart}>
						<defs>
							<linearGradient id='colorGradient' x1='0' y1='0' x2='0' y2='1'>
								<stop offset='0%' stopColor='#3B82F6' stopOpacity={0.3} />
								<stop offset='100%' stopColor='#3B82F6' stopOpacity={0.05} />
							</linearGradient>
						</defs>
						<XAxis
							dataKey='label'
							axisLine={false}
							tickLine={false}
							tick={{ fontSize: 12, fill: '#9CA3AF' }}
							dy={10}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tick={{ fontSize: 12, fill: '#9CA3AF' }}
							tickFormatter={formatValue}
							domain={[0, 'dataMax + 100000']}
						/>
						<Tooltip content={<CustomTooltip />} />
						<Area
							type='monotone'
							dataKey='value'
							stroke='#3B82F6'
							strokeWidth={3}
							fill='url(#colorGradient)'
							dot={false}
							activeDot={{
								r: 6,
								fill: '#3B82F6',
								strokeWidth: 2,
								stroke: '#fff',
							}}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

export default Revenue
