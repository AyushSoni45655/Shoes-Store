import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
  const token = useSelector((state) => state.user?.token)

  return token ? <Navigate to="/" replace /> : children
}

export default PublicRoute
