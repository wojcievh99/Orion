import React, { useContext, useState, useEffect } from 'react'
import HeartIcon from '../assets/heart-icon.png'
import FavArticles from './FavArticles';

import { collection, doc, getDocs, arrayUnion, updateDoc, getDoc } from 'firebase/firestore';
import { database } from '../config/firebase';

import { PageContext } from '../context/PageContext';
import { ArticleContext } from '../context/ArticleContext';
import { AuthContext } from '../context/AuthContext';

import { UploadRequiredContext } from '../context/UploadRequiredContext';

const Articles = () => {

  const {setCurrentPage} = useContext(PageContext)
  const {setCurrentArticle} = useContext(ArticleContext)
  const {currentUser} = useContext(AuthContext)
  const {uploadRequired, setUploadRequired} = useContext(UploadRequiredContext)

  const [content, setContent] = useState([])
  const [favContent, setFavContent] = useState([])

  const uploadArticlesContent = async () => {
    const querySnapshot = await getDocs(collection(database, 'Articles'))
    let filteredData = []
    querySnapshot.forEach((doc) => {
      filteredData.push(doc.data())
    })
    setContent(pc => filteredData)

    setUploadRequired(pr => false)
  }

  const uploadFavContent = async () => {
    try {
      const docRef = doc(database, `FavArticles`, `${currentUser.displayName}_${currentUser.email}`)
      const docSnap = await getDoc(docRef)

      setFavContent(fc => docSnap.data().articles)
      setUploadRequired(pr => false)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {

    uploadArticlesContent()
    uploadFavContent()

  }, [uploadRequired])

  const openAnArticle = (prompt) => {
    setCurrentPage('openArticle')
    setCurrentArticle(prompt)
  }

  const addToFavourite = async (prompt) => {
    try {
      const userDocRef = doc(database, `FavArticles`, `${currentUser.displayName}_${currentUser.email}`)
      
      await updateDoc(userDocRef, {
        owner: `${currentUser.displayName}_${currentUser.email}`,
        articles: arrayUnion(`${prompt.Author}_${prompt.Title}`)
      }) 

    } catch (err) {
      console.error(err)
    }

    setUploadRequired(pr => true)
  }

  const displayContent = (prompt) => {

    const displayingElement = prompt.element

    let fav = false
    favContent.forEach(element => {
      if (element == `${displayingElement.Author}_${displayingElement.Title}`) fav = true;
    })
    
    return (
        !fav &&
        <div className='article' key={prompt.id}>
            <div className='article-info'>
              <button onClick={() => openAnArticle(displayingElement)}>{displayingElement.Title}</button>
              <p>{displayingElement.Author}</p>
            </div>
            <input id="favourites" type='checkBox' style={{display: 'none'}}/>
            <label onClick={() => addToFavourite(displayingElement)} htmlFor='favourites'><img src={HeartIcon} alt="" /></label>
        </div>
    )

  }

  return (
    <div className='Articles'>
      <div className='myContent'>
        <button onClick={() => setCurrentPage('myArticles')}>Your Work</button>
        <button onClick={() => setCurrentPage('addNewArticle')}>new Article</button>
      </div>

      <div className='browseContent'>
      <FavArticles/>
      {content.map((element, id) => 
        displayContent({element, id})    
      )} 
      </div>

    </div>
  )
}

export default Articles
