import React from 'react'
import { NavLink, Outlet} from 'react-router-dom'

function APBody() {
  return (
    <div>
      <div>
       
          <div className='container bg-warning mx-auto'>
            <div className='row gy-2'>
            <div className='text-center bg-danger col-sm-6'>
              <NavLink to='authorprofile/addarticle' style={{backgroundColor:'transparent',color:'floralwhite',textDecorationLine:"none"}}>Add New Article</NavLink>
            </div>
            <div className='text-center bg-danger col-sm-6'>
            <NavLink to='authorprofile/articles' style={{backgroundColor:'transparent',color:'floralwhite',textDecorationLine:"none"}}>Articles</NavLink>
            </div>
            </div>
          </div>
      </div>
      <Outlet/>
    </div>
  )
}

export default APBody
