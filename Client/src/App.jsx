import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './Components/auth/Auth.jsx'
import Login from './Pages/auth/Login.jsx'
import Register from './Pages/auth/Register.jsx'
import Shopping from './Components/Shopping/Shopping.jsx'

import CheckAuth from './Components/Common/Checkauth.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './features/Authslice/authslice.js'
import { ToastContainer } from 'react-toastify'
import Home from "./Pages/Shopping/Home.jsx"
import Listing from './Pages/Shopping/Listing.jsx'
import Checkout from './Pages/Shopping/Checkout.jsx'

const App = () => {
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.authen);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <div>loading....</div>;

  return (
    <>
      <div className='flex flex-col overflow-hidden bg-white'>
        <ToastContainer />

        <Routes>
          {/* Redirect root to home page */}
          <Route path="/" element={<Navigate to="/shop/home" replace />} />

          {/* Auth Routes */}
          <Route path="/auth" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Auth />
            </CheckAuth>
          }>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* Shopping Routes */}
          <Route path="/shop" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Shopping />
            </CheckAuth>
          }>
            <Route path="home" element={<Home />} />
            <Route path="listing" element={<Listing />} />
           
            <Route path="checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App;
