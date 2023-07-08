import React, { useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore';

import { auth } from '../firebase.config'
import { storage } from '../firebase.config';
import { db } from '../firebase.config';

import { toast } from 'react-toastify'

import '../styles/login.css'
import { useNavigate } from 'react-router-dom';
import { useGetTokenMutation, useLoginMutation, useSignUpMutation } from '../reducers/authSlice';

const Signup = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [addNewUser, { isLoading }] = useSignUpMutation()
  const [login] = useLoginMutation()
  const [getToken] = useGetTokenMutation()

  const navigate = useNavigate()

  const signup = async (e) => {
    e.preventDefault()
    setLoading(true)

    const convertData = () => {
      const mail = []
      const pass = []
      const roles = []
      const name = []

      username ? name.push({ "value": username }) : []
      email ? mail.push({ "value": email }) : []
      password ? pass.push({ "value": password }) : []
      roles.push({ "target_id": "authenticated" })
      return { "name": name, "mail": mail, "pass": pass }
    }



    const drupalData = JSON.stringify(convertData())
    const drupalLogin = JSON.stringify({ name: username, pass: password })
    let formData = new FormData()
    formData.append('grant_type', 'password')
    formData.append('client_id', 'f08017d1-24cb-4aaa-ae5f-45409913c027')
    formData.append('client_secret', 'simple_oauth_secret')
    formData.append('username', username)
    formData.append('password', password)
    // const drupalTokenData = {grant_type: "password", client_id: "f08017d1-24cb-4aaa-ae5f-45409913c027", client_secret:"simple_oauth_secret", username: username, password: password}
    //  const drupalToken = JSON.stringify(drupalTokenData)


    try {

      // const userCredential = await createUserWithEmailAndPassword(auth, email, password)
       
        // const user = userCredential.user
        // const storageRef = ref(storage, `images/${Date.now() + username}`)
        // const uploadTask = uploadBytesResumable(storageRef, file)
        
        // uploadTask.on((error) => {
        //   toast.error(error.message)
        // }, () => {
        //   getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
  
        //     // udpate user profile
        //     await updateProfile(user, {
        //       displayName: username,
        //       photoURL: downloadURL,
        //     })
  
        //     // store user data in firestore database
        //     await setDoc(doc(db, 'users', user.uid), {
        //       uid: user.uid,
        //       displayName: username,
        //       email,
        //       photoURL: downloadURL,
  
        //     })
  
  
        //   })
        // })
        // Add user to Drupal
      await addNewUser({username, email, password})
      .unwrap()
      .then((payload) => console.log('fulfilled', payload),)
      .catch((error) => console.log('rejected', error))
      console.log('token FormData', formData)

      // get User token after registration signin from drupal
     


      setLoading(false)
      toast.success('Account created')
      navigate('/home')
    } catch (error) {
      console.log(JSON.stringify(error))
      setLoading(false)
      toast.error('something went wrong')
    }
  }

  return <Helmet title='Signup'>
    <section>
      <Container>
        <Row>
          {
            loading ?

              <Col lg='6' className='text-center'>

                <h5 className='fw-bold'>Loading.. ....</h5>

              </Col>

              :

              <Col lg='6' className='m-auto text-center'>
                <h3 className="fw-bold mb-4"> Signup </h3>
                <Form className='auth__form' onSubmit={signup}>
                  <FormGroup className='form__group'>
                    <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder='Username' />
                  </FormGroup>

                  <FormGroup className='form__group'>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter your email' />
                  </FormGroup>

                  <FormGroup className='form__group'>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter your password' />
                  </FormGroup>

                  <FormGroup className='form__group'>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                  </FormGroup>

                  <button type='submit' className="buy__btn auth__btn">Create an account</button>
                  <p> Already have an account? <Link to='/login'>Login</Link> </p>
                </Form>
              </Col>
          }
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Signup
