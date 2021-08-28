const jwt = require('jsonwebtoken')
const { userModel } = require('../api/models/user.model')

exports.checkAuth = (req, res, next) => {
  jwt.verify(req.headers.token, process.env.SECRET, (err, token) => {
    if (err) {
      console.log(err)
      res.status(403).json({ error: 'Token not valid' })
    } else {
      userModel
        .findOne({ email: token.email })
        .then(user => {
          if (user) {
            res.locals.user = user
            next()
          } else {
            res.status(400).json({ err: 'User not found' })
          }
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({ err: 'Issue in DB' })
        })
    }
  })
}

exports.isCreator = (req, res, next) => {
  if (res.locals.user.typeofuser === 'Creator' ||
  res.locals.user.typeofuser === 'Moderator' ||
  res.locals.user.typeofuser === 'Admin') {
    next()
  } else {
    res.status(400).json({ err: 'User is not creator' })
  }
}

exports.isModerator = (req, res, next) => {
  if (res.locals.user.typeofuser === 'Moderator' ||
  res.locals.user.typeofuser === 'Admin') {
    next()
  } else {
    res.status(400).json({ err: 'User is not a moderator' })
  }
}

exports.isAdmin = (req, res, next) => {
  if (res.locals.user.typeofuser === 'Admin') {
    next()
  } else {
    res.status(400).json({ err: 'User is not a admin' })
  }
}

exports.isSubscriber = (req, res, next) => {
  const idChannel = req.params.channelId
  if (res.locals.user.channelsfollowed.includes(idChannel)) {
    console.log('User is subcribed to channel')
    next()
  } else {
    res.status(400).json({ err: 'User is not a subscriber to this channel' })
  }
}
