import React, { useContext } from 'react'
import Main from '../pages/Main';
import Docs from '../pages/Docs';
import Events from '../pages/Events';

import { PageContext } from '../context/PageContext'


const MainNavbar = () => {

  const {setCurrentPage} = useContext(PageContext)

  return (
    <div className='MainNavBar'>
        <button onClick={() => setCurrentPage(p => 'main')}>Main</button>
        <button onClick={() => setCurrentPage(p => 'docs')}>Docs</button>
        <button onClick={() => setCurrentPage(p => 'events')}>Events</button>
    </div>
  )
}

export default MainNavbar
