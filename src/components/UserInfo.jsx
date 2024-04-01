import React, { useCallback, useContext, useEffect, useState } from 'react'
import DefaultAvatar from '../assets/avatar-default-symbolic-icon-479x512-n8sg74wg.png'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, storage } from '../config/firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import { signOut } from 'firebase/auth'

import { AuthContext } from '../context/AuthContext'

const UserInfo = () => {

  const { currentUser } = useContext(AuthContext)
  
  return (
    <div className='UserInfo'>
      <div className='avatar'>
        <img src={currentUser.photoURL} alt="" />
      </div>
      <div className='PersonalInfo'>
        <p>{currentUser.displayName ? currentUser.displayName : 'loading...'}</p>
        <button onClick={() => signOut(auth)}>Log out</button>
      </div>
    </div>
  )
}

export default UserInfo
