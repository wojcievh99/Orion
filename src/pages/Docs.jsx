import React, {useEffect, useState} from 'react'

import { doc, getDoc } from 'firebase/firestore'
import { database } from '../config/firebase'

const Docs = () => {

  const [content, setContent] = useState([])

  const uploadMainContent = async () => {
    const docRef = doc(database, 'PageContent', 'DocsPageContent')
    const docSnap = await getDoc(docRef)

    setContent(pc => docSnap.data())
  }

  useEffect(() => {
    uploadMainContent();
  }, [])

  return (
    <div className='DefaultPage'>
      
     <div className='title'>
      <p>Documentation</p>
     </div>

     <div className='content'>
          
          {Object.keys(content).map((field) => 
            <div key={field} className='content-paragraph'>
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

export default Docs
