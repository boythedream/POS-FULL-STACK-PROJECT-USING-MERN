import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ItemPage from './pages/ItemPage'
import Cartpage from './pages/Cartpage'
import Register from './pages/Register'
import Login from './pages/Login'
import Bills from './pages/Bills'
import Customer from './pages/Customer'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>} />
          <Route path='/items' element={
            <ProtectedRoute>
              <ItemPage />
            </ProtectedRoute>} />
          <Route path='/cart' element={
            <ProtectedRoute>
              <Cartpage />
            </ProtectedRoute>} />
          <Route path='/bills' element={
            <ProtectedRoute>
              <Bills />
            </ProtectedRoute>} />
          <Route path='/customers' element={
            <ProtectedRoute>
              <Customer />
            </ProtectedRoute>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

export function ProtectedRoute({ children }) {
  if (localStorage.getItem('auth')) {
    return children;
  }
  else {
    return <Navigate to={'/login'} />
  }
}