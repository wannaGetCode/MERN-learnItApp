import { createContext, useReducer, useState } from 'react';
import { postReducer } from '../reducers/postReducer'
import { apiURL, POSTS_LOADED_SUCCESS, POSTS_LOADED_FAIL, ADD_POST, DELETE_POST, UPDATE_POST, FIND_POST } from './constants'
import axios from 'axios'

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
  // State
  const [updateModal, setUpdateModal] = useState(false)

  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postsLoading: true,
  })

  // Get all posts
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiURL}/posts`)
      if (response.data.success) {
        dispatch({type: POSTS_LOADED_SUCCESS, payload: response.data.posts})
      }
    } catch (error) {
      dispatch({type: POSTS_LOADED_FAIL})
    }
  }

  // Add post
  const addPost = async newPost => {
    try {
      const response = await axios.post(`${apiURL}/posts`, newPost)
      if (response.data.success) {
        dispatch({ type: ADD_POST, payload: response.data.post})
        return response.data
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : {success: false, message: 'Server error'}
    }
  }

  // Delete post
  const deletePost = async postId => {
    try {
      const response = await axios.delete(`${apiURL}/posts/${postId}`)
      if (response.data.success) {
        dispatch({type: DELETE_POST, payload: postId})
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Find post to update
  const findPost = postId => {
    const post = postState.posts.find(post => post._id === postId)
    dispatch({ type: FIND_POST, payload: post})
  }

  // Update post
  const updatePost = async currentPost => {
    try {
      const response = await axios.put(`${apiURL}/posts/${currentPost._id}`, currentPost)
      if (response.data.success) {
        dispatch({type: UPDATE_POST, payload: response.data.post})
        return response.data
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : {success: false, message: 'Server error'}
    }
  }

  // Post context data
  const postcontextData = { postState, getPosts, addPost, deletePost, updatePost, findPost, updateModal, setUpdateModal }

  return (
    <PostContext.Provider value={postcontextData}>
      {children}
    </PostContext.Provider>
  )
}

export default PostContextProvider