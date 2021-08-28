const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: String, 
  content: String,
  multimedia: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  date: {
    type: Date,
    default: Date.now()
  },
  // comments: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'comment'
  // }]
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }]
})

exports.postModel = mongoose.model('post', postSchema)
