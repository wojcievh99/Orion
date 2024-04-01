import React, { useContext, useState } from 'react'

import { collection, addDoc } from 'firebase/firestore'
import { AuthContext } from '../context/AuthContext'
import { database } from '../config/firebase'
import { UploadRequiredContext } from '../context/UploadRequiredContext'

const AddNewArticle = () => {

  const { currentUser } = useContext(AuthContext)
  const {setUploadRequired} = useContext(UploadRequiredContext)

  const [ currentArticleContent, setCurrentArticleContent ] = useState()

  const submitArticle = async (e) => {
    e.preventDefault()

    const author = e.target[0].value
    const title = e.target[1].value
    
    const collectionRef = collection(database, 'Articles')

    const modeledContent = currentArticleContent.split('\n').join('[endl]')

    try {

      await addDoc(collectionRef, {
        Author: author,
        AuthorID: `${currentUser.displayName}_${currentUser.email}`,
        Title: title,
        Content: modeledContent,
        ArticleID: `${author}_${title}_${currentUser.displayName}_${currentUser.email}`
      })

    } catch (err) {
      console.error(err)
    }

    e.target[0].value = ""
    e.target[1].value = ""
    setCurrentArticleContent("")
    document.getElementById('content').value = ""

    setUploadRequired(up => true)
  }

  return (
    <div className='DefaultPage'>

      <div className='title'>
        <p>Share your research</p>
      </div>

      <form onSubmit={submitArticle} className='addArticleInputs'>
        
        <input type='text' placeholder='Author...'/>
        <input type='text' placeholder='Title...'/>
        
        <label htmlFor='content'>Content: </label>
        <textarea id='content' rows='30' onChange={() => setCurrentArticleContent(pc => document.getElementById('content').value)}/>

        <button>Submit</button>
      
      </form>

    </div>
  )
}

export default AddNewArticle
