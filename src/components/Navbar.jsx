import React from 'react'
import search from '../assets/image-removebg-preview(37).png'
import notification from '../assets/image-removebg-preview(39).png'
import chat from '../assets/image-removebg-preview(40).png'
import present from '../assets/image-removebg-preview(41).png'
import settings from '../assets/image-removebg-preview(42).png'
import guest from '../assets/i-removebg-preview.png'

const Navbar = () => {
	// Provide a fallback object if user is null
	const user = JSON.parse(localStorage.getItem('user'))

	return (
		<div className='flex items-center justify-between fixed top-0 w-[80%] py-[28px] px-[35px] bg-[#f4f2f7] z-[20]'>
			<div className='w-[60%] py-[10px] flex items-center bg-[#fdfdfd] rounded-[10px] px-[20px]'>
				<input
					className='w-[100%] outline-none'
					type='text'
					placeholder='Search here'
				/>
				<img className='w-[35px] h-[30px]' src={search} alt='Search icon' />
			</div>
			<div className='flex items-center gap-[15px] pr-[30px] border-r-[2px] border-[#e1e4eb]'>
				<button className='flex items-center justify-center rounded-[8px] bg-[#d1e5f7] w-[45px] h-[45px]'>
					<img
						className='w-[25px]'
						src={notification}
						alt='Notification icon'
					/>
				</button>
				<button className='flex items-center justify-center rounded-[8px] bg-[#d1e5f7] w-[45px] h-[45px]'>
					<img className='w-[25px]' src={chat} alt='Chat icon' />
				</button>
				<button className='flex items-center justify-center rounded-[8px] bg-[#dfdee8] w-[45px] h-[45px]'>
					<img className='w-[25px]' src={present} alt='Present icon' />
				</button>
				<button className='flex items-center justify-center rounded-[8px] bg-[#ffdada] w-[45px] h-[45px]'>
					<img className='w-[25px]' src={settings} alt='Settings icon' />
				</button>
			</div>
			<div className='flex items-center'>
				<p className='font-[Poppins] font-[400] text-[12px] w-[120px]'>
					Hello, {user.fullname}
				</p>
				<img
					className='w-[40px] h-[40px]'
					src={user.image || guest}
					alt='User profile'
				/>
			</div>
		</div>
	)
}

export default Navbar
