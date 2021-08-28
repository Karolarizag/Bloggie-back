const router = require('express').Router()

const { authRouter } = require('./auth.router')
const { userRouter } = require('./user.router')
const { postRouter } = require('./post.router')

router 
  .use('/auth', authRouter)
  .use('/user', userRouter)
  .use('/post', postRouter)

exports.router = router
