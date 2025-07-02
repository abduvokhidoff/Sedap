import React from 'react'
import period from '../assets/image-removebg-preview(46).png'
import arrow from '../assets/image-removebg-preview(47).png'

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'))
	return (
		<div className='flex flex-col gap-[20px] px-[25px] '>
			<div className='flex items-center justify-between'>
        <div>
          <h2>Dashboard</h2>
          <p>Hi, {user.fullname}. Welcome back to Sedap Admin! </p>
        </div>
        <div>
          <div>
            <img src={period} alt="" />
          </div>
          <div>
            <h3>Filter Period</h3>
            <p>17 April 2020 - 21 May 2020</p>
          </div>
          <div>
            <img src={arrow} alt="" />
          </div>
        </div>
      </div>
			<div></div>
			<div></div>
		</div>
	)
}

export default Dashboard
