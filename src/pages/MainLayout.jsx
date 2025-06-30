import React from 'react'
import { Outlet } from 'react-router-dom'
import Aside from '../components/Aside'
import Navbar from '../components/Navbar'

const MainLayout = ({ logout }) => {
	return (
		<div className='flex'>
			<div className='h-[100vh] w-[20%] '>
				<Aside />
			</div>
			<div className='bg-[#f4f2f7] w-[80%] pt-[106px]'>
				<Navbar logout={logout}/>
				<Outlet />
			</div>
		</div>
	)
}

export default MainLayout
