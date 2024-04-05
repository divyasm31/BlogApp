import './header.css'
import React from 'react'
import { NavLink } from 'react-router-dom'
function Header() {
  return (
    <div>
      <ul className="bar nav p-4 d-flex justify-content-end">
        <li className="nav-item">
            <NavLink className="item nav-link fs-4" to="">Home</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="item nav-link  fs-4" to="signup">SignUp</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="item nav-link fs-4" to="signin">SignIn</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Header
