import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRouter = ({ isAuth, children }) => {
	if (isAuth) {
		return children
	} else {
		return <Navigate to='/login' replace />
	}
}

export default PrivateRouter
