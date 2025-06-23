import React, { useState } from 'react'
import login1 from '../assets/image-removebg-preview(11)(1).png'
import email1 from '../assets/pngimg.com - email_PNG49.png'
import password1 from '../assets/png-clipart-computer-icons-lock-multi-factor-authentication-font-awesome-security-key-miscellaneous-payment-removebg-preview.png'

const LoginLayout = ({ login }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const handleLogin = e => {
		e.preventDefault()
		if (email === 'Sedap' && password === 'admin') {
			login()
			setError('')
		} else {
			setError('Your Email or Password is Incorrect!')
		}
	}

	return (
		<div className='w-[100vw] h-[100vh] flex items-center'>
			<div className='w-[48%] bg-[#daf5f0] h-[100%] flex items-center justify-center'>
				<img className='w-[80%]' src={login1} alt='Login visual' />
			</div>
			<div className='w-[52%] h-[100%] px-[70px] pt-[70px] pb-[30px] flex flex-col gap-[3px]'>
				<div>
					<h1 className='font-[Poppins] font-[700] text-[#3f464a] text-[50px]'>
						Sedap.
					</h1>
				</div>
				<div className='flex flex-col gap-[30px] w-[500px]'>
					<div className='flex flex-col gap-[8px]'>
						<h2 className='font-[Poppins] font-[700] text-[#3f464a] text-[56px]'>
							Login to Admin
						</h2>
						<p className='font-[Poppins] font-[400] text-[23px] text-[#10111390] tracking-[2.5px]'>
							Enter your credentials to access <br /> your account
						</p>
					</div>
					<form className='flex flex-col gap-[20px]' onSubmit={handleLogin}>
						<div className='flex flex-col gap-[3px]'>
							<label htmlFor='email' className='flex items-end gap-[5px]'>
								<img className='w-[25px]' src={email1} alt='Email icon' />
								<p className='font-[Poppins] font-[500] text-[16px] text-[#3f464a]'>
									Email Address
								</p>
							</label>
							<input
								id='email'
								type='text'
								onChange={e => setEmail(e.target.value)}
								placeholder='Email Address'
								className='rounded-[8px] border-[2px] border-[#d4d4d3] w-[85%] px-[20px] py-[16px] placeholder:font-[Poppins] placeholder:font-[400] text-[15px] font-[600] text-[16px] outline-none'
							/>
						</div>
						<div className='flex flex-col gap-[3px]'>
							<label htmlFor='password' className='flex items-end gap-[5px]'>
								<img className='w-[25px]' src={password1} alt='Password icon' />
								<p className='font-[Poppins] font-[500] text-[16px] text-[#3f464a]'>
									Password
								</p>
							</label>
							<input
								id='password'
								type='password'
								onChange={e => setPassword(e.target.value)}
								placeholder='Password'
								className='rounded-[8px] border-[2px] border-[#d4d4d3] w-[85%] px-[20px] py-[16px] placeholder:font-[Poppins] placeholder:font-[400] text-[15px] font-[600] text-[16px] outline-none'
							/>
						</div>
						<div className='flex flex-col gap-[20px]'>
							{error && (
								<p className='font-[Poppins] font-[600] text-[18px] text-[red]'>
									{error}
								</p>
							)}
							<button
								type='submit'
								className='bg-[#00b588] rounded-[10px] py-[16px] w-[30%] font-[Poppins] font-[700] text-[white] text-[18px]'
							>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default LoginLayout
