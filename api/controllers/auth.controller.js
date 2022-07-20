const { userModel } = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
  userModel
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.json({ error: 'Wrong ' })
      }
      bcrypt.compare(req.body.password, user.password,
        (err, result) => {
          if (!result) {
            return res.status(401).json({ error: 'Wrong email or password', err })
          } 
          const userData = {
            username: user.username,
            email: user.email,
            id: user._id
          }
          const token = jwt.sign(
            userData,
            process.env.SECRET,
            { expiresIn: '1h' }
          )

          return res.status(200).json({ token: token, ...userData })
        })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: 'Error iniciando sesión' })
    })
}

exports.signUp = (req, res) => {
  // const hashedPwd = bcrypt.hashSync(req.body.password, 10)

  userModel
    .create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      birthdate: req.body.dateofbirth,
      role: req.body.role,
    })
    .then(user => {
      const userData = { 
        username: user.username, 
        id: user._id, 
        email: user.email,
        role: user.role
      }
      const token = jwt.sign(
        userData,
        process.env.SECRET,
        { expiresIn: '48h' }
      )

      res.status(201).json({ token: token, ...userData })
    })
    .catch(err => {
      console.log(err)
      res.status(400).json(err)
    })
}
