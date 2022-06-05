import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const Register = () => {
  // Context
  const { registerUser } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [alert, setAlert] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setAlert({
        type: 'danger',
        message: 'Passwords must match each other'
      })
      setTimeout(() => setAlert(null), 5000)
      return
    }

    try {
      const registerData = await registerUser({username, password})
      if (!registerUser.success) {      
        setAlert({
          type: 'danger',
          message: registerData.message,
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
          <Form.Control
            type='password'
            placeholder='Confirm password'
            name='password'
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}    
          />
        </Form.Group>
        <AlertMessage info={alert} />
        <Button variant='success' type='submit'>Register</Button>
      </Form>
      <p>
        Already have an accout?
        <Link to='/login'>
          <Button variant='info' size='sm' className='ml-1'>
            Login
          </Button>
        </Link>
      </p>
    </>
  )
}

export default Register