




import React, { useEffect, useState } from 'react';
import ChartOrders from '../components/ChartOrders';
import MostSelling from '../components/MostSelling';
import TrendingItems from '../components/TrendingItems';
import Revenue from '../components/Revenue';
import MostFavourite from '../components/MostFavourite';

const Analytics = () => {
  const [ setData] = useState({
    orders: [],
    mostSellingItems: [],
    trendingItems: [],
    revenue: null,
    favouriteItems: [],
  });

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch('https://sedap-3.onrender.com/api/analytics', {
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const analyticsData = await response.json();
        
        setData({
          orders: analyticsData.orders,
          mostSellingItems: analyticsData.mostSellingItems,
          trendingItems: analyticsData.trendingItems,
          revenue: analyticsData.revenue,
          favouriteItems: analyticsData.favouriteItems,
        });
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div className='px-[25px] h-full min-h-[1300px]'>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='text-[24px] font-semibold text-gray-700'>Analytics</h2>
          <p className='text-gray-400 mt-[5px]'>Here is your restaurant summary with graph view</p>
        </div>
        <div className='bg-white w-[250px] h-[60px] rounded-[8px] px-[10px] flex items-center gap-[5px]'>
          <img src="./src/assets/calendar.png" alt="" />
          <div>
            <p className='text-gray-700 text-[16px]'>Filter Periode</p>
            <p className='text-gray-400 text-[10.5px]'>17 April 2020 - 21 May 2020</p>
          </div>
        </div>
      </div>

      <div className='flex justify-between mt-[20px]'>
        <ChartOrders />
        <MostSelling />
      </div>

      <div className='flex justify-between mt-[20px] relative'>
        <TrendingItems className="absolute"/>
        <Revenue />
      </div>

      <div className='relative'>
        <MostFavourite /> 
      </div>
    </div>
  );
};

export default Analytics;
