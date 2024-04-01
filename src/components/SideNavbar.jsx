import React from 'react'
import UserInfo from './UserInfo'
import Articles from './Articles'

const SideNavbar = () => {
  return (
    <div className='sideNavBar'>
      <UserInfo/>
      <Articles/>
    </div>
  )
}

export default SideNavbar
