const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  lastname: String,
  email: String,
  birthdate: String,
  role: String,
  followedusers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  postsliked: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }],
  verified: Boolean,
  profilepic: String,
  bannerpic: String, 
  discrpiton: String,
  post:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }]
})

exports.userModel = mongoose.model('user', userSchema)
