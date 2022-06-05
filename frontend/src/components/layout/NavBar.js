import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import learnItLogo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

const NavBar = () => {
  const {authState: {user: {username}}, logoutUser}  = useContext(AuthContext)

  const handleLogout = () => logoutUser()

  return (
    <Navbar expand='lg' bg='primary' variant='dark' className='shadow p-3'>
      <Navbar.Brand className='font-weight-bold text-white'>
        <img src={learnItLogo} alt='Application logo' width='32' height='32' className='mx-2' />
        LearnIt
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav' className='justify-content-between'>
        <Nav className='mr-auto'>
          <Nav.Link className='font-weight-bold text-white' to='/dashboard' as={Link}>
            Dashboard
          </Nav.Link>
          <Nav.Link className='font-weight-bold text-white' to='/about' as={Link}>
            About
          </Nav.Link>
        </Nav>
        
        <Nav>
          <Nav.Link className='font-weight-bold text-white' disabled>
            Welcome <strong>{username}</strong>
          </Nav.Link>
          <Button variant='secondary' className='font-weight-bold text-white' onClick={handleLogout}>
            <img src={logoutIcon} alt='Log out' width='32' height='32' className='mr-2' />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar