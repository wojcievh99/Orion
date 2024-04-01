import React, { useState, createContext } from 'react'

export const UploadRequiredContext = createContext()

export const UploadRequiredContextProvider = ({children}) => {

    const [uploadRequired, setUploadRequired] = useState(false)

  return (
    <UploadRequiredContext.Provider value={{uploadRequired, setUploadRequired}}>
        {children}
    </UploadRequiredContext.Provider>
  )
}