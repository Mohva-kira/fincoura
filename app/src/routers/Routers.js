import { Routes, Route, Navigate } from 'react-router-dom'

import React from 'react'
import Home from '../pages/Home'
import Checkout from '../pages/Checkout'
import Shop from '../pages/Shop'
import ProductDetails from '../pages/ProductDetails'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Cart from '../pages/Cart'
import ProtectedRoute from './ProtectedRoute'
import Profil from '../pages/Profil'
import Orders from '../pages/Orders'

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to="home" />} />
            <Route path='home' element={<Home />} />
            <Route path='shop' element={<Shop />} />
            <Route
                path='checkout'
                element={
                    <ProtectedRoute>
                        <Checkout />
                    </ProtectedRoute>
                }
            />
            <Route path='shop/:id' element={<ProductDetails />} />
            <Route path='profil/:id' element={<Profil />} />
            <Route path='Orders/:id' element={<Orders />} />
            <Route path='cart' element={<Cart />} />
            <Route path='login' element={<Login />} />
            <Route path='signUp' element={<Signup />} />
        </Routes>
    )

}

export default Routers