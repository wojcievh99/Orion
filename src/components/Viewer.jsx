import React, { useContext } from 'react'
import Main from '../pages/Main';
import Docs from '../pages/Docs';
import Events from '../pages/Events';
import MyArticles from '../pages/MyArticles';
import AddNewArticle from '../pages/AddNewArticle';
import OpenArticle from '../pages/OpenArticle';

import { PageContext } from '../context/PageContext';

const Viewer = () => {

  const {currentPage} = useContext(PageContext)

  switch (currentPage) {
    case 'main':
      return (
        <div className='scroll'>
           <Main/>
        </div>
      )
    case 'docs':
      return (
        <div className='scroll'>
           <Docs/>
        </div>
      )
    case 'events':
      return (
        <div className='scroll'>
           <Events/>
        </div>
      )
    case 'myArticles':
      return (
        <div className='scroll'>
           <MyArticles/>
        </div>
      )
    case 'addNewArticle':
      return (
        <div className='scroll'>
           <AddNewArticle/>
        </div>
        )
    case 'openArticle':
      return (
        <div className='scroll'>
           <OpenArticle/>
        </div>
        )
  }
}

export default Viewer
