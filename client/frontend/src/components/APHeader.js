import React from 'react'

function APHeader() {
  return (
    <div>
      <div>
      <ul className="bar nav p-4 d-flex justify-content-end d-flex bg-info mb-5">
        <li className="nav-item bg-transparent text-dark">
            Welcome, User
        </li>
        <li className="nav-item" style={{marginLeft:"50px"}}>
            <button className='text-dark bg-info'style={{border:"transparent"}}>SignOut</button>
        </li>
      </ul>
      </div>
    </div>
  )
}

export default APHeader
