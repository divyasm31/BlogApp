import './apbody.css'
import React from 'react'
import APHeader from './APHeader'
import APBody from './APBody'
import Footer from './Footer'
// import { Outlet } from 'react-router-dom'

function AuthorProfile() {
  return (
    <div className='parent'>
      <APHeader />
      {/* <div className='parent' style={{minHeight:"73vh"}}> */}
        <APBody />
      {/* </div> */}
      <Footer />
    </div>
  )
}

export default AuthorProfile
