import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button'

import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { PostContext } from '../../contexts/PostContext'


const ActionButtons = ({ url, id }) => {
  const { deletePost, findPost, setUpdateModal } = useContext(PostContext)

  function handleEditPost(postId) {
    findPost(postId)
    setUpdateModal(true)
  }

  return (
    <>
      <Button className='post-button' href={url} target='_blank'>
        <img src={playIcon} alt='Play button' width='32' height='32' />
      </Button>
      <Button className='post-button' onClick={handleEditPost.bind(this, id)}>
        <img src={editIcon} alt='Edit button' width='24' height='24' />
      </Button>
      <Button className='post-button' onClick={deletePost.bind(this, id)}>
        <img src={deleteIcon} alt='Delete button' width='24' height='24' />
      </Button>
    </>
  )
}

export default ActionButtons