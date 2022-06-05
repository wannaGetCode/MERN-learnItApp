import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'
import { AuthContext } from '../../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import SinglePost from '../posts/SinglePost'
import AddPostModal from '../posts/AddPostModal'
import UpdateModal from '../posts/UpdateModal'
import addIcon from '../../assets/plus-circle-fill.svg'

const Dashboard = () => {
  // Open/close add post modal
  const [addPostModal, setAddPostModal] = useState(false)
  const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: null,
  })

  // Contexts
  const {authState: {user: {username}}} = useContext(AuthContext)

  const {
    postState: {post, posts, postsLoading},
    getPosts,
  } = useContext(PostContext)

  // Get all posts in first rendering
  useEffect(() => {
    getPosts()
  }, [])

  let body = null

  if (postsLoading) {
    body = (
      <div className='spinner-container'>
        <Spinner animation='border' variant='info' />
      </div>
    )
  } else if (posts.length === 0) {
    body = (
      <Card className='text-center mx-5 my-5'>
        <Card.Header as='h1'>Hi {username}</Card.Header>
        <Card.Body>
          <Card.Title>Welcome to LearnIt</Card.Title>
          <Card.Text>
            Click the button below to track your first skill to learn
          </Card.Text>
          <Button variant='primary' onClick={setAddPostModal}>LearnIt!</Button>
        </Card.Body>
      </Card>
    )
  } else {
    body = (
      <>
        <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
          {posts.map(post => (
            <Col key={post._id} className='my-2'>
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
        
        {/* Open Add post Modal */}
        <OverlayTrigger
          placement='left'
          overlay={<Tooltip>Add a new thing to learn</Tooltip>}
        >
          <Button
            className='btn-floating'
            onClick={handleModal}
          >
            <img src={addIcon} alt='Add course' height='60' width='60' />
          </Button>
        </OverlayTrigger>
      </>
    )
  }

  function handleModal() {
    setAddPostModal(true)
  }

  function handleCloseToast() {
    setShowToast({
      show: false,
      message: '',
      type: null,
    })
  }

  return (
    <>
      {body}
      <AddPostModal
        addPostModal={addPostModal}
        setAddPostModal={setAddPostModal}
        setShowToast={setShowToast}
      />
      {post && <UpdateModal setShowToast={setShowToast} />}

      {/* After post is added, show toast */}
      <Toast
        show={showToast.show}
        style={{position: 'fixed', top: '20%', right: '10px'}}
        className={`bg-${showToast.type} text-white`}
        onClose={handleCloseToast}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{showToast.message}</strong>
        </Toast.Body>
      </Toast>'
    </>
  )
}

export default Dashboard