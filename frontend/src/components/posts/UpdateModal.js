import React, { useState, useContext, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { PostContext } from '../../contexts/PostContext'

const UpdateModal = ({ setShowToast }) => {
  const {postState: {post}, updatePost, updateModal, setUpdateModal} = useContext(PostContext)

  const [currentPost, setCurrentPost] = useState(post)

  const {title, description, url, status} = currentPost

  function handleHideModal() {
    setUpdateModal(false)
    setCurrentPost(post)
  }

  function handleChange(e) {
    setCurrentPost({
      ...currentPost,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(currentPost)
    const {success, message} = await updatePost(currentPost)
    handleHideModal()
    setShowToast({
      show: true,
      message,
      type: success ? 'success' : 'danger',
    })
  }

  useEffect(() => {
    setCurrentPost(post)
  }, [post])

  return (
    <Modal show={updateModal} onHide={handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Making progress?</Modal.Title>
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
          <Form.Group className='my-4'>
            <Form.Select
              value={status}
              name='status'
              onChange={handleChange}
            >
              <option value='' disabled>Select your progress</option>
              <option value='TO LEARN'>TO LEARN</option>
              <option value='ON GOING'>ON GOING</option>
              <option value='LEARNED'>LEARNED</option>
            </Form.Select>
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

export default UpdateModal