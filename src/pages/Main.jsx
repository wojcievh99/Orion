import React, {useContext, useEffect, useState} from 'react'

import { doc, getDoc } from 'firebase/firestore'
import { database } from '../config/firebase'

const Main = () => {

  const [content, setContent] = useState([])

  const uploadMainContent = async () => {
    const docRef = doc(database, 'PageContent', 'MainPageContent')
    const docSnap = await getDoc(docRef)

    setContent(pc => docSnap.data())
  }

  useEffect(() => {
    uploadMainContent();
  }, [])

  return (
      <div className='MainPage'>

        <div className='logo'>
          <p>Orion</p>
        </div>

        <div className='content'>
          
          {Object.keys(content).map((field) => 
            <div key={field}>
              <p className='content-title'>{field}</p>

              <div className='content-text'>
                { 
                  content[field].split("[endl]").map((paragraph, key) => 
                      <p key={key}>{paragraph}</p>
                  )
                }
              </div>
            </div>
          )}
        </div>

      </div>
  )
}

export default Main
