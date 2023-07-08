

import React from 'react'
import  useAuth  from '../custom-hooks/useAuth'
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({children}) => {

    const currentUser = useSelector(state => state.user || JSON.parse(localStorage.getItem('user')))
      console.log('user', currentUser)
 
  return currentUser ? children : <Navigate to='/login' />
}

export default ProtectedRoute