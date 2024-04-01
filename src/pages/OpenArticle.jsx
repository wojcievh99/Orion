import React, { useContext } from 'react'

import {ArticleContext} from '../context/ArticleContext'

const OpenArticle = () => {

    const {currentArticle} = useContext(ArticleContext)
    
    const displayArticle = () => {
       const {Author: author, Title: title, Content: content} = currentArticle

        return (
            <div className='openedArticle'>

                <div className='title'>
                    <p>{title}</p>
                </div>

                <div className='content'>
                    <p className='content-author'>{author}</p>
                    <div className='content-text'>
                        {content.split('[endl]').map((element, id) => 
                            <p key={id}>{element}</p>
                        )}
                    </div>
                </div>

            </div>
        );

    }


  return (
    <div className='DefaultPage'>
      {displayArticle()}
    </div>
  )
}

export default OpenArticle
