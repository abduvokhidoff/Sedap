import React, { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

const ChartOrders = () => {
  const [period, setPeriod] = useState('monthly')
  const [orders, setOrders] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          'https://sedap-3.onrender.com/api/analytics'
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Fetched data:', data)

        // Установка данных о заказах
        if (data.orders) {
          setOrders(data.orders)
        } else {
          throw new Error('Invalid data structure')
        }
      } catch (err) {
        console.error('Error fetching orders:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) {
    return (
      <div className='max-w-[670px] w-full bg-gray-50 rounded-2xl shadow-sm p-6 mt-[20px]'>
        <div className='flex items-center justify-center h-96'>
          <div className='text-gray-500'>Loading...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='max-w-[670px] w-full bg-gray-50 rounded-2xl shadow-sm p-6 mt-[20px]'>
        <div className='flex items-center justify-center h-96'>
          <div className='text-red-500'>Error: {error}</div>
        </div>
      </div>
    )
  }

  if (!orders) {
    return (
      <div className='max-w-[670px] w-full bg-gray-50 rounded-2xl shadow-sm p-6 mt-[20px]'>
        <div className='flex items-center justify-center h-96'>
          <div className='text-gray-500'>No data available</div>
        </div>
      </div>
    )
  }

  if (!orders[period]) {
    return (
      <div className='max-w-[670px] w-full bg-gray-50 rounded-2xl shadow-sm p-6 mt-[20px]'>
        <div className='flex items-center justify-center h-96'>
          <div className='text-gray-500'>No data available for {period}</div>
        </div>
      </div>
    )
  }

  const currentOrders = orders[period]

  // Format number for display (handles large numbers better)
  const formatNumber = num => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'k'
    }
    return num.toLocaleString()
  }

  return (
    <div className='max-w-[670px] h-[500px] w-full bg-gray-50 rounded-2xl shadow-sm p-6'>
      <div className='flex justify-between items-start mb-6'>
        <div>
          <h3 className='text-xl font-semibold text-gray-800 mb-1'>
            Chart Orders
          </h3>
          <p className='text-sm text-gray-500'>
            Lorem ipsum dolor sit amet, consectetur
          </p>
        </div>
        <div className='flex gap-1 bg-white rounded-xl p-1'>
          {[
            { key: 'monthly', label: 'Monthly' },
            { key: 'weekly', label: 'Weekly' },
            { key: 'daily', label: 'Daily' },
          ].map(p => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                period === p.key
                  ? 'text-gray-500 bg-gray-50 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className='flex items-start gap-8 mb-8'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 rounded-lg flex items-center justify-center'>
            <img src='./src/assets/chart.png' alt='' />
          </div>
          <div>
            <p className='text-2xl font-bold text-green-600'>
              {formatNumber(currentOrders.totalSales)}
            </p>
            <p className='text-gray-500 text-sm'>Total Sales</p>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 rounded-lg flex items-center justify-center'>
            <img src='./src/assets/chart.png' alt='' />
          </div>
          <div>
            <p className='text-2xl font-bold text-green-600'>
              {currentOrders.avgSalesPerDay.toLocaleString()}
            </p>
            <p className='text-gray-500 text-sm'>Avg. Sales per day</p>
          </div>
        </div>
      </div>

      <ResponsiveContainer width='100%' height={280}>
        <LineChart
          data={currentOrders.chart}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id='colorGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#10b981' stopOpacity={0.3} />
              <stop offset='100%' stopColor='#10b981' stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray='3 3'
            stroke='#e5e7eb'
            vertical={false}
          />
          <XAxis
            dataKey='label'
            stroke='#9ca3af'
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#9ca3af' }}
          />
          <YAxis
            stroke='#9ca3af'
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatNumber}
            tick={{ fill: '#9ca3af' }}
          />
          <Tooltip
            formatter={value => [formatNumber(value), 'Orders']}
            labelStyle={{
              color: '#374151',
              fontSize: '14px',
              fontWeight: '500',
            }}
            contentStyle={{
              backgroundColor: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              boxShadow:
                '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              padding: '12px 16px',
            }}
          />
          <Line
            type='monotone'
            dataKey='value'
            stroke='#10b981'
            strokeWidth={2.5}
            dot={false}
            activeDot={false}
            fill='url(#colorGradient)'
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ChartOrders
