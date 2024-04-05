import React from 'react'
import APHeader from './APHeader'
import APBody from './APBody'
import { Outlet } from 'react-router-dom'

function AuthorProfile() {
  return (
    <div>
      <APHeader />
      <div style={{minHeight:"73vh"}}>
        <APBody />
      </div>
    </div>
  )
}

export default AuthorProfile
