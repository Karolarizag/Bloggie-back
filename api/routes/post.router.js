const router = require('express').Router()

const {
  getPost,
  createPost,
  updatePost,
  deletePost,
  getPostByUser,
  getPostByCategory
} = require('../controllers/post.controller')

const { checkAuth } = require('../../utils/index')

router 
.get('/category', getPostByCategory)
  .get('/:postId', getPost)
  .get('/user/:userId', getPostByUser)
  .post('/', checkAuth, createPost)
  .put('/:postId', checkAuth, updatePost)
  .delete('/:postId', checkAuth, deletePost)

  exports.postRouter = router