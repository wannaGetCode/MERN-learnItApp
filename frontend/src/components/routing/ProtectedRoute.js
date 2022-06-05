import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import Spinner from 'react-bootstrap/esm/Spinner'
import NavBar from '../layout/NavBar'

const ProtectedRoute = () => {
  const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)

  if (authLoading) {
    return (
      <div className='spinner-container'>
        <Spinner animation='border' variant='info' />
      </div>
    )
  }

  return isAuthenticated ? <><NavBar /><Outlet /></> : <Navigate to='/login' />
}

export default ProtectedRoute