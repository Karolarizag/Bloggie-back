const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: String, 
  subtitle: String,
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
  }],
  category: String
})

exports.postModel = mongoose.model('post', postSchema)
