import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ProductsList from './pages/ProductsList'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'


export default function App(){
return (
<AuthProvider>
<div className="min-h-screen">
<Navbar />
<main className="">
<Routes>
<Route path='/' element={<LandingPage/>} />
<Route path='/productos' element={<ProductsList/>} />
<Route path='/admin' element={<AdminLogin/>} />


<Route path='/admin/dashboard' element={
<ProtectedRoute>
<AdminDashboard />
</ProtectedRoute>
} />
</Routes>
</main>
</div>
</AuthProvider>
)
}