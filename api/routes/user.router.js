const {
  getUser, 
  updateUser, 
  deleteUser,
  follow,
  unfollow,
  feed
} = require('../controllers/user.controller')

const { checkAuth } = require('../middlewares/index')

const router = require('express').Router()

router 
  .get('/:userId', getUser)
  // .get('/', checkAuth, feed)
  .put('/', checkAuth, updateUser)
  .put('/follow/:userId', checkAuth, follow)
  .put('/unfollow/:userId', checkAuth, unfollow)
  .delete('/', checkAuth, deleteUser)

exports.userRouter = router