const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  lastname: String,
  email: {
    unique: [true, 'Este email ya existe, intenta con otro'],
    required: [true, 'Por favor ingrese un email válido'],
    type: String
  },
  birthdate: Date,
  role: String,
  usersfollowed: [{
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
