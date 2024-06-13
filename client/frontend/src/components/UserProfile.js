import './up.css'
// import React, { useState } from 'react'
import APHeader from './APHeader'
import { NavLink, Outlet } from 'react-router-dom';
import Footer from './Footer';


function UserProfile() {

  return (
    <div className='parent' >
      <APHeader />
      <div className='dc text-center'>
      <NavLink className='nv text-decoration-none display-4' to='articles'>Articles</NavLink>
      </div>
      <Outlet />
      <Footer />
    </div>
  )
}

export default UserProfile
