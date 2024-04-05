
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

function SignIn() {

    

  return (
    <div>
        <NavLink className='nav-link text-center display-1 text-secondary mt-5' to='signin/authorprofile'>Author Profile</NavLink>
        <Outlet />
    </div>
  )
}

export default SignIn
