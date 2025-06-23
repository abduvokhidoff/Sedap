import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedLogin = ({ isAuth, children }) => {
  if (isAuth) {
    return <Navigate to="/" replace />
  } else {
    return children
  }
}

export default ProtectedLogin
