import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const LoginForm = () => {
  // Context
  const { loginUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const loginData = await loginUser({username, password})
      if (loginData.success) {
        navigate('/dashboard')
      } else {
        setAlert({
          type: 'danger',
          message: loginData.message,
        })
        setTimeout(() => setAlert(null), 5000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Form className='my-4' onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type='text'
            placeholder='Username'
            name='username'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}    
          />
        </Form.Group>
        <AlertMessage info={alert} />
        <Button variant='success' type='submit'>Login</Button>
      </Form>
      <p>
        Don't have an accout?
        <Link to='/register'>
          <Button variant='info' size='sm' className='ml-1'>
            Register
          </Button>
        </Link>
      </p>
    </>
  )
}

export default LoginForm