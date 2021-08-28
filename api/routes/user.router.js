const {
  getUser, 
  updateUser, 
  deleteUser,
} = require('../controllers/user.controller')

const { checkAuth } = require('../../utils/index')

const router = require('express').Router()

router 
  .get('/:userId', getUser)
  .put('/', checkAuth, updateUser)
  .delete('/', checkAuth, deleteUser)

exports.userRouter = router