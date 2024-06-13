import './apheader.css'
import { IoLogOutOutline } from "react-icons/io5";
import { BiSolidHomeHeart } from "react-icons/bi";
import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { resetState } from '../redux/slices/userAuthorSlice'
function APHeader() {
  let { loginUserStatus,currentUser } = useSelector(state=>state.userAuthorLoginReducer);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  function handleLogout(){
    let actionObj = resetState();
    // console.log(actionObj)
    localStorage.removeItem('token');
    dispatch(actionObj);
    navigate('/signin')
  }
  return (
    <div className='parent'>
      <div className='conaphead container mx-auto'>
      <ul className="barap nav p-4 d-flex justify-content-end d-flex  mb-5">
        <li className='nav-item hh align-self-start'><NavLink className='h' to='/'><BiSolidHomeHeart style={{backgroundColor:"#ffadad",color:"#563c14",fontSize:"7vh"}}/>Home</NavLink></li>
        <li className="nav-item bg-transparent text-dark">
            Welcome, <span className='sp fw-bolder bg-transparent'>{currentUser.username}</span> <sub className='sb fs-5'> ({currentUser.userType})</sub>
        </li>
        <li className="nav-item" style={{marginLeft:"50px"}}>
            <button className='btn signout mt-0 pt-2 text-dark' onClick={handleLogout}><IoLogOutOutline className='logo bg-transparent' /> SignOut</button>
        </li>
      </ul>
      </div>
    </div>
  )
}

export default APHeader
