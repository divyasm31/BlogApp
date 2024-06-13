import './header.css'
import React from 'react'
import { NavLink } from 'react-router-dom'
function Header() {
  return (
    <div className='container mx-auto'>
      <ul className="bar nav p-2 d-flex justify-content-end">
    <li className="nav-item">
        <NavLink className="item nav-link fs-4" to="/" activeClassName="active">
            Home
        </NavLink>
    </li>
    <li className="nav-item">
        <NavLink className="item nav-link fs-4" to="/signup" activeClassName="active">
            SignUp
        </NavLink>
    </li>
    <li className="nav-item">
        <NavLink className="item nav-link fs-4" to="/signin" activeClassName="active">
            SignIn
        </NavLink>
    </li>
</ul>
    </div>
  )
}

export default Header
