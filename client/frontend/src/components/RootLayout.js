import React from 'react'
import Footer from './Footer'
import {Outlet} from 'react-router-dom'
import Header from './Header'

function RootLayout() {
  return (
    <div>
      <Header />
      <div className='bg-light mt-0'style={{minHeight: "73vh"}}>
        <Outlet />
        </div>
      <Footer />
    </div>
  )
}

export default RootLayout
