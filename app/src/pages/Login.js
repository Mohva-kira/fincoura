import React, {useState} from 'react'
import Helmet from '../components/Helmet/Helmet'
import {Container, Row, Col, Form, FormGroup} from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.config'
import { toast } from 'react-toastify'


import '../styles/login.css'
import { useGetTokenMutation } from '../reducers/authSlice'


const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [getToken] = useGetTokenMutation()

  const navigate = useNavigate()
  let formData = new FormData()
  formData.append('grant_type', 'password')
  formData.append('client_id', 'f08017d1-24cb-4aaa-ae5f-45409913c027')
  formData.append('client_secret', 'simple_oauth_secret')

  formData.append('password', password)


  const signIn = async (e) => {
    e.preventDefault()
    setLoading(true)
     
    try {

      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      const user = userCredential.user

      
      formData.append('username', user.displayName)
     

      await getToken(formData)
      .unwrap()
      .then((payload) => {
        console.log('fulfilled', payload)
        localStorage.setItem('access_token', payload.access_token)
        localStorage.setItem('refresh_token', payload.refresh_token)
       
      })
      .catch((error) => console.log('rejected', error))


      setLoading(false)
      toast.success('Successfull logged in')
      navigate('/checkout')
      
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
  }



  return <Helmet title='Login'>
    <section>
      <Container>
        <Row>
         {
          loading ? <Col lg='12' className='text-center'> <h5 className='fw-bold'>Loading.......</h5> </Col> :
          <Col lg='6' className='m-auto text-center'>
          <h3 className="fw-bold mb-4"> Login </h3>
          <Form className='auth__form' onSubmit={signIn}>
            <FormGroup className='form__group'>
              <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='enter your email'/>
            </FormGroup>

            <FormGroup className='form__group'>
              <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='enter your password'/>
            </FormGroup>

            <button type='submit' className="buy__btn auth__btn">Login</button>
            <p> Don't have an account? <Link to='/signup'>Create an account</Link> </p>
          </Form>
        </Col>
         }
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Login
