import React, { createContext, useState } from 'react'

export const PageContext = createContext()

export const PageContextProvider = ({children}) => {

    const [currentPage, setCurrentPage] = useState('main')

  return (
    <PageContext.Provider value={{currentPage, setCurrentPage}}>
      {children}
    </PageContext.Provider>
  )
}


