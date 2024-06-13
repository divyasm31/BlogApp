import React from 'react'
import { NavLink, Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux'
// import Footer from './Footer'

function APBody() {

  let { currentUser } = useSelector(state=>state.userAuthorLoginReducer)

  return (
    <div className='parent'>
          <div className='d-flex justify-content-between mx-auto contn '>
            <div className='text-center col-sm-6 m-2 p-2 r '>
              <NavLink   style={{backgroundColor:'transparent',color:'#b10269',textDecorationLine:"none"}} className='n' to={`/authorprofile/${currentUser.username}/addarticle`}>Add New Article</NavLink>
            </div>
            <div className='text-center col-sm-6 m-2 p-2 r '>
            <NavLink to={`/authorprofile/${currentUser.username}/articles-by-author`} style={{backgroundColor:'transparent',color:'#b10269',textDecorationLine:"none"}} className='n'>Articles</NavLink>
            </div>
          </div>
      <Outlet/>
    </div>
  )
}

export default APBody
