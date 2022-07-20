const router = require('express').Router()

const {
  getPost,
  createPost,
  updatePost,
  deletePost,
  getPostByUser,
  getPostByCategory,
  getAllPosts
} = require('../controllers/post.controller')

const { checkAuth } = require('../middlewares/index')

router 
  .get('/', getAllPosts)
  .get('/:postId', getPost)
  .get('/user/:userId', getPostByUser)
  .post('/', checkAuth, createPost)
  .post('/category', getPostByCategory)
  .put('/:postId', checkAuth, updatePost)
  .delete('/:postId', checkAuth, deletePost)

  exports.postRouter = router