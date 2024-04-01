import React, { createContext, useState } from 'react'

export const ArticleContext = createContext()

export const ArticleContextProvider = ({children}) => {

    const [currentArticle, setCurrentArticle] = useState({})

  return (
    <ArticleContext.Provider value={{currentArticle, setCurrentArticle}}>
      {children}
    </ArticleContext.Provider>
  )
}