import React, { useState } from 'react'
// Import all your icons - inactive versions
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

// Import all your icons - active versions
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
import { NavLink } from 'react-router-dom'

const Aside = () => {
	// State to track which menu item is active
	const [activeItem, setActiveItem] = useState(0)

	// Menu items data with inactive and active icons
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
			path: 'order-list',
			label: 'Order List',
			icon: analytics,
			activeIcon: analyticsActive,
		},
		{
			id: 2,
			path: 'order-detail',
			label: 'Order Detail',
			icon: users,
			activeIcon: usersActive,
		},
		{
			id: 3,
			path: 'customer',
			label: 'Customer',
			icon: products,
			activeIcon: productsActive,
		},
		{
			id: 4,
			path: 'analytics',
			label: 'Analytics',
			icon: orders,
			activeIcon: ordersActive,
		},
		{
			id: 5,
			path: 'reviews',
			label: 'Reviews',
			icon: settings,
			activeIcon: settingsActive,
		},
		{
			id: 6,
			path: 'foods',
			label: 'Foods',
			icon: reports,
			activeIcon: reportsActive,
		},
		{
			id: 7,
			path: 'food-detail',
			label: 'Food Detail',
			icon: messages,
			activeIcon: messagesActive,
		},
		{
			id: 8,
			path: 'customer-detail',
			label: 'Customer Detail',
			icon: calendar,
			activeIcon: calendarActive,
		},
		{
			id: 9,
			path: 'calendar',
			label: 'Calendar',
			icon: support,
			activeIcon: supportActive,
		},
		{
			id: 10,
			path: 'chat',
			label: 'Chat',
			icon: profile,
			activeIcon: profileActive,
		},
		{
			id: 11,
			path: 'wallet',
			label: 'Wallet',
			icon: logout,
			activeIcon: logoutActive,
		},
	]

	// Handle menu item click
	const handleItemClick = itemId => {
		setActiveItem(itemId)
		console.log(
			`Navigating to: ${menuItems.find(item => item.id === itemId)?.label}`
		)
	}

	return (
		<div className='flex flex-col gap-[24px] py-[45px]'>
			<div className='px-[35px]'>
				<h1 className='font-[Poppins] font-[700] text-[40px] text-[#333333]'>
					Sedap<span className='text-[#00b095]'>.</span>
				</h1>
				<p className='font-[Poppins] font-[500] text-[14px] text-[#c4c5c8]'>
					Modern Admin Dashboard
				</p>
			</div>

			<div className='flex flex-col gap-[8px]'>
				{menuItems.map(item => (
					<div key={item.id} className='px-[35px]'>
						<NavLink
							to={item.path}
							onClick={() => handleItemClick(item.id)}
							className={`flex items-center gap-[12px] w-[100%] transition-all duration-200 relative ${
								activeItem === item.id
									? 'before:absolute before:left-[-35px] before:top-0 before:h-full before:w-[4px] before:bg-gradient-to-b before:from-[#00b8a1] before:to-[#00d4aa] before:rounded-r-[10px] before:shadow-lg before:content-[""]'
									: ''
							}`}
						>
							<div
								className={`flex items-center gap-[10px] py-[12px] rounded-[12px] px-[20px] w-[100%] transition-all duration-300 ${
									activeItem === item.id
										? 'bg-[#ccf3ef] text-[#00b8a1]'
										: 'bg-transparent text-[#574f60]'
								}`}
							>
								<img
									src={activeItem === item.id ? item.activeIcon : item.icon}
									alt={item.label}
									className='w-[20px] h-[20px]'
								/>
								<p className='font-[Roboto] font-[500] text-[14px]'>
									{item.label}
								</p>
							</div>
						</NavLink>
					</div>
				))}
			</div>
		</div>
	)
}

export default Aside
