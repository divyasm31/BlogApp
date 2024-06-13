import './up.css'
import React from 'react'
import { Outlet,NavLink } from 'react-router-dom'
import APHeader from './APHeader'
import Footer from './Footer'

function AdminProfile() {
  return (
    <div className='parent'>
      <APHeader />
      <div className='dc text-center'>
      <NavLink className='nv text-decoration-none display-4 text-center' to='articles'>Articles</NavLink>
      </div>
      <Outlet />  
      <Footer />    
    </div>
  )
}

export default AdminProfile
