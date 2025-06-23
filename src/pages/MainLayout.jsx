import React from 'react'
import { Outlet } from 'react-router-dom'
import Aside from '../components/Aside'
import Navbar from '../components/Navbar'

const MainLayout = ({ logout }) => {
	return (
		<div className='flex'>
			<div className='h-[100%] w-[18%] '>
				<Aside />
			</div>
			<div className='bg-[#f4f2f7] w-[82%]'>
				<Navbar logout={logout}/>
				<Outlet />
			</div>
		</div>
	)
}

export default MainLayout
