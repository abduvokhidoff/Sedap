import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

// Icons...
import dashboard from '../assets/image-removebg-preview(13).png'
import analytics from '../assets/image-removebg-preview(15).png'
import users from '../assets/image-removebg-preview(17).png'
import products from '../assets/image-removebg-preview(19).png'
import orders from '../assets/image-removebg-preview(21).png'
import settings from '../assets/image-removebg-preview(23).png'
import reports from '../assets/image-removebg-preview(25).png'
import messages from '../assets/image-removebg-preview(27).png'
import calendar from '../assets/image-removebg-preview(29).png'
import support from '../assets/image-removebg-preview(31).png'
import profile from '../assets/image-removebg-preview(33).png'
import logout from '../assets/image-removebg-preview(35).png'
import dashboardActive from '../assets/image-removebg-preview(14).png'
import analyticsActive from '../assets/image-removebg-preview(16).png'
import usersActive from '../assets/image-removebg-preview(18).png'
import productsActive from '../assets/image-removebg-preview(20).png'
import ordersActive from '../assets/image-removebg-preview(22).png'
import settingsActive from '../assets/image-removebg-preview(24).png'
import reportsActive from '../assets/image-removebg-preview(26).png'
import messagesActive from '../assets/image-removebg-preview(28).png'
import calendarActive from '../assets/image-removebg-preview(30).png'
import supportActive from '../assets/image-removebg-preview(32).png'
import profileActive from '../assets/image-removebg-preview(34).png'
import logoutActive from '../assets/image-removebg-preview(36).png'
import chef from '../assets/image-removebg-preview(38).png'

const Aside = () => {
	const location = useLocation()

	const menuItems = [
		{
			id: 0,
			path: '/',
			label: 'Dashboard',
			icon: dashboard,
			activeIcon: dashboardActive,
		},
		{
			id: 1,
			path: '/order-list',
			label: 'Order List',
			icon: analytics,
			activeIcon: analyticsActive,
		},
		{
			id: 2,
			path: '/order-detail',
			label: 'Order Detail',
			icon: users,
			activeIcon: usersActive,
		},
		{
			id: 3,
			path: '/customer',
			label: 'Customer',
			icon: products,
			activeIcon: productsActive,
		},
		{
			id: 4,
			path: '/analytics',
			label: 'Analytics',
			icon: orders,
			activeIcon: ordersActive,
		},
		{
			id: 5,
			path: '/reviews',
			label: 'Reviews',
			icon: settings,
			activeIcon: settingsActive,
		},
		{
			id: 6,
			path: '/foods',
			label: 'Foods',
			icon: reports,
			activeIcon: reportsActive,
		},
		{
			id: 7,
			path: '/food-detail',
			label: 'Food Detail',
			icon: messages,
			activeIcon: messagesActive,
		},
		{
			id: 8,
			path: '/customer-detail',
			label: 'Customer Detail',
			icon: calendar,
			activeIcon: calendarActive,
		},
		{
			id: 9,
			path: '/calendar',
			label: 'Calendar',
			icon: support,
			activeIcon: supportActive,
		},
		{
			id: 10,
			path: '/chat',
			label: 'Chat',
			icon: profile,
			activeIcon: profileActive,
		},
		{
			id: 11,
			path: '/wallet',
			label: 'Wallet',
			icon: logout,
			activeIcon: logoutActive,
		},
	]

	return (
		<div className='flex flex-col fixed top-0 left-0 h-screen w-[20%] bg-white z-10'>
			<div className='px-[35px] py-[24px]'>
				<h1 className='font-[Poppins] font-[700] text-[40px] text-[#333333]'>
					Sedap<span className='text-[#00b095]'>.</span>
				</h1>
				<p className='font-[Poppins] font-[500] text-[14px] text-[#c4c5c8]'>
					Modern Admin Dashboard
				</p>
			</div>

			<div
				className='flex-1 w-[100%] overflow-y-auto hover:scrollbar-thin scrollbar-thumb-[#ccf3ef] scrollbar-track-transparent'
				style={{ direction: 'rtl' }}
			>
				<div
					className='flex flex-col gap-[30px] px-[35px] pb-[30px] w-[100%]'
					style={{ direction: 'ltr' }}
				>
					<div className='flex flex-col gap-[8px]'>
						{menuItems.map(item => {
							const isActive = location.pathname === item.path

							return (
								<NavLink key={item.id} to={item.path}>
									<div
										className={`flex items-center gap-[12px] w-full transition-all duration-200 relative ${
											isActive
												? 'before:absolute before:left-[-35px] before:top-0 before:h-full before:w-[4px] before:bg-gradient-to-b before:from-[#00b8a1] before:to-[#00d4aa] before:rounded-r-[10px] before:shadow-lg before:content-[""]'
												: ''
										}`}
									>
										<div
											className={`flex items-center gap-[10px] py-[12px] rounded-[12px] px-[20px] w-[100%] transition-all duration-300 ${
												isActive
													? 'bg-[#ccf3ef] text-[#00b8a1]'
													: 'bg-transparent text-[#574f60]'
											}`}
										>
											<img
												src={isActive ? item.activeIcon : item.icon}
												alt={item.label}
												className='w-[20px] h-[20px]'
											/>
											<p className='font-[Roboto] font-[600] text-[14px]'>
												{item.label}
											</p>
										</div>
									</div>
								</NavLink>
							)
						})}
					</div>

					{/* Bottom box */}
					<div className='flex items-center gap-[3px] bg-[#00b095] rounded-[10px] px-[10px] py-[10px]'>
						<div className='flex flex-col items-start gap-[8px] w-[60%]'>
							<p className='text-[9px] font-[Poppins] font-[400] text-[white]'>
								Please, organize your menus through button below
							</p>
							<button className='bg-[white] font-[Poppins] font-[500] text-[black] rounded-[8px] text-[12px] px-[5px] py-[5px]'>
								+Add Menus
							</button>
						</div>
						<div className='w-[40%]'>
							<img src={chef} alt='Chef' className='h-[100px] w-[100px]' />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Aside
