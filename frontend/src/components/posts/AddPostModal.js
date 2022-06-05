import React, { useState, useContext } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { PostContext } from '../../contexts/PostContext'

const AddPostModal = ({ addPostModal, setAddPostModal, setShowToast }) => {
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    url: '',
    status: 'ON GOING',
  })

  const {title, description, url} = newPost

  const { addPost } = useContext(PostContext)

  function handleHideModal() {
    setAddPostModal(false)
    setNewPost({
      title: '',
      description: '',
      url: '',
      status: 'ON GOING',
    })
  }

  function handleChange(e) {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const {success, message} = await addPost(newPost)
    handleHideModal()
    setShowToast({
      show: true,
      message,
      type: success ? 'success' : 'danger',
    })
  }

  return (
    <Modal show={addPostModal} onHide={handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className='my-4'>
            <Form.Control
              type='text'
              placeholder='Title'
              name='title'
              aria-describedby='title-help'
              value={title}
              onChange={handleChange}
              required
            />
            <Form.Text id='title-help' muted>Required</Form.Text>
          </Form.Group>
          <Form.Group className='my-4'>
            <Form.Control
              as='textarea'
              row={3}
              placeholder='Description'
              name='description'
              value={description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='my-4'>
            <Form.Control
              type='text'
              placeholder='Youtube tutorial'
              name='url'
              value={url}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleHideModal}>Cancel</Button>
          <Button variant='primary' type='submit'>LearnIt!</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddPostModal