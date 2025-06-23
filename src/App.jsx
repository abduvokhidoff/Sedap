import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginLayout from './pages/LoginLayout'
import MainLayout from './pages/MainLayout'
import Dashboard from './pages/Dashboard'
import OrderList from './pages/OrderList'
import OrderDetail from './pages/OrderDetail'
import Customer from './pages/Customer'
import Analytics from './pages/Analytics'
import Reviewer from './pages/Reviewer'
import Foods from './pages/Foods'
import FoodDetail from './pages/FoodDetail'
import CustomerDetail from './pages/CustomerDetail'
import Calendar from './pages/Calendar'
import Chats from './pages/Chats'
import Wallet from './pages/Wallet'
import PrivateRouter from './components/PrivateRouter'
import ProtectedLogin from './components/ProtectedLogin'

const App = () => {
	const [isAuth, setIsAuth] = useState(() => {
		return localStorage.getItem('isAuth') === 'true'
	})

	const login = () => {
		setIsAuth(true)
		localStorage.setItem('isAuth', 'true')
	}

	const logout = () => {
		setIsAuth(false)
		localStorage.removeItem('isAuth')
	}

	const router = createBrowserRouter([
		{
			path: '/login',
			element: (
				<ProtectedLogin isAuth={isAuth}>
					<LoginLayout login={login} />
				</ProtectedLogin>
			),
		},
		{
			path: '/',
			element: (
				<PrivateRouter isAuth={isAuth}>
					<MainLayout logout={logout} />
				</PrivateRouter>
			),
			children: [
				{ index: true, element: <Dashboard /> },
				{ path: 'order-list', element: <OrderList /> },
				{ path: 'order-detail', element: <OrderDetail /> },
				{ path: 'customer', element: <Customer /> },
				{ path: 'analytics', element: <Analytics /> },
				{ path: 'reviews', element: <Reviewer /> },
				{ path: 'foods', element: <Foods /> },
				{ path: 'food-detail', element: <FoodDetail /> },
				{ path: 'customer-detail', element: <CustomerDetail /> },
				{ path: 'calendar', element: <Calendar /> },
				{ path: 'chat', element: <Chats /> },
				{ path: 'wallet', element: <Wallet /> },
			],
		},
	])

	return <RouterProvider router={router} />
}

export default App
