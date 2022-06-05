const express = require("express")
const router = express.Router()

const Post = require("../models/Post")
const verifyToken = require('../middleware/authentication')

// @route GET api/posts
// @desc Get post
// @access Private
router.get('/', verifyToken, async(req, res) => {
  try {
    const posts = await Post.find({user: req.userId}).populate('user', ['username'])
    res.json({success: true, posts})
  } catch(error) {
    console.log(error)
    res.status(500).json({success: false, message: 'Internal server error'})
  }
})

// @route POST api/posts
// @desc Create post
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body

  // Simple validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" })
  }

  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || 'TO LEARN',
      user: req.userId,
    })

    await newPost.save()

    res.json({ success: true, message: 'Happy learning!', post: newPost})
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: 'Internal server error'})
  }
})

// @route PUT api/posts
// @desc Update post
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body

  // Simple validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" })
  }

  try {
    let updatePost = {
      title,
      description: description || '',
      url: (url.startsWith("https://") ? url : `https://${url}`) || '',
      status: status || 'TO LEARN',
      user: req.userId,
    } 

    const postUpdateCondition = {_id: req.params.id, user: req.userId}

    updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, {new: true})

    // User not authorised to update post
    if (!updatePost) {
      return res.status(401).json({success: false, message: 'Post not found or user are not authorize'})
    }

    res.json({success: true, message: 'Excellent progress!', post: updatePost})
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: 'Internal server error'})
  }
})

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = {_id: req.params.id, user: req.userId}
    const deletePost = await Post.findByIdAndDelete(postDeleteCondition)

    // User not authorised to delete post
    if (!deletePost) {
      return res.status(401).json({success: false, message: 'Post not found or user are not authorize'})
    }

    res.json({success: true, posts: deletePost})
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: 'Internal server error'})
  }
})

module.exports = router
