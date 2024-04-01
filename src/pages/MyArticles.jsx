import React, {useEffect, useState, useContext} from 'react'

import { collection, getDocs } from 'firebase/firestore'
import { database } from '../config/firebase'

import { AuthContext } from '../context/AuthContext'
import { UploadRequiredContext } from '../context/UploadRequiredContext'

const MyArticles = () => {

  const { currentUser } = useContext(AuthContext)
  const {uploadRequired, setUploadRequired} = useContext(UploadRequiredContext)

  const [content, setContent] = useState([])

  const uploadArticlesContent = async () => {
    const querySnapshot = await getDocs(collection(database, 'Articles'))
    let filteredData = []
    querySnapshot.forEach((doc) => {
      filteredData.push(doc.data())
    })
    setContent(pc => filteredData)
    setUploadRequired(up => false)
  }

  useEffect(() => {
    uploadArticlesContent()
  }, [uploadRequired])

  const displayMyContent = (prompt) => {
    
      return(
      prompt.element.AuthorID == `${currentUser.displayName}_${currentUser.email}` &&

      <div key={prompt.id} className='content-paragraph'>

        <p className='content-title'>{prompt.element.Title}</p>
        <p className='content-author'>{prompt.element.Author}</p>

        <div className='content-text'>
        {prompt.element.Content.split('[endl]').map((element, key) => 
          <p key={key}>{element}</p>
        )}
        </div>

      </div>
      );
    
  }


  return (
    <div className='DefaultPage'>
      
    <div className='title'>
     <p>Your work</p>
    </div>

    <div className='content'>
         
      {content.map((element, id) => 

       displayMyContent({element, id})

      )}
         
    </div>

   </div>
  )
}

export default MyArticles

