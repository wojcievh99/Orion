import React, { useEffect, useState } from 'react'
import AvatarIcon from '../../assets/avatar-default-symbolic-icon-479x512-n8sg74wg.png'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, database, storage } from '../../config/firebase'
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';

const Register = () => {

  const [access, setAcces] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const submitRegister = async (e) => {
    e.preventDefault()
    setLoading(l => true)
    setError(e => false)

    const email = e.target[0].value;
    const password = e.target[1].value;
    const displayName = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      const storageRef = ref(storage, `${displayName}_${email}`);
      
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            })
          } catch (error) {
            console.error(error)
          }
        })
      })

      await setDoc(doc(database, `FavArticles`, `${displayName}_${email}`), {
        articles: [],
      })


    } catch (error) {
      setError(e => true)
      setLoading(l => false)
    }
  }

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(l => true)
    setError(e => false)

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      setError(e => true)
      setLoading(l => false)
    }

  }

  const handleChangeAccess = () => {
    setAcces(acc => !acc)
  }

  useEffect(() => {
    setTimeout(() => setError(e => false), 5000)
  }, [error])

  return (
    <div className='authentication'>
    {access ? 
      
      <div className='Form'>

        <div className='title'>LogIn</div>
        <form onSubmit={submitLogin}>
          <input placeholder='Email...' type='email'/>
          <input placeholder='Password...' type='password'/>

            <button style={{border: error ? '2px solid #930707' : loading ? '2px solid blueviolet' : '2px solid black'}}>Submit</button>
        </form>

        <p>You don't have an account? <button onClick={handleChangeAccess}>Register</button></p>

      </div>
   
      :
    
      <div className='Form'>

        <div className='title'>Register</div>
        <form onSubmit={submitRegister}>
            <input placeholder='Email...' type='email'/>
            <input placeholder='Password...' type='password'/>
            <input placeholder='Username...' maxLength='10' type='text'/>
            
            <input id='avaInpt' type='file' style={{display: "none"}}/>
            <label htmlFor='avaInpt'>
            <img src={AvatarIcon} alt="" />
            <p>Add an Avatar</p>
            <p className='info'>(it's prefered for the image to be square-shaped)</p>
            </label>
          
          <button style={{border: error ? '2px solid #930707' : loading ? '2px solid blueviolet' : '2px solid black'}}>Submit</button>
        
        </form>
        <p>You already have an account? <button onClick={handleChangeAccess}>Login</button></p>
      </div>
    
    }
    </div>
  )
}

export default Register
