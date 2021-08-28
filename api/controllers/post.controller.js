const { postModel } = require('../models/post.model')
const { userModel } = require('../models/user.model')

exports.createPost = async (req, res) => {
  try {
    const post = await postModel.create(req.body)
    post.creator = res.locals.user.id
    await post.save()

    res.locals.user.post.push(post.id)
    await res.locals.user.save()

    res.status(200).json({ msg: 'Post created succesfull', post })

  } catch (err) {
    res.status(400).json(err)
  }
}

exports.updatePost = async (req, res) => {
  try {
    
    const post = await postModel.findByIdAndUpdate(req.params.postId, req.body, { new: true, useFindAndModify: false })
    res.status(200).json({ msg: 'Post updated succesfull', post })

  } catch (err) {
    res.status(500).json(err)
  }
}

exports.getPost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.postId)
    res.status(200).json({ msg: 'Post found succesfull', post })
  } catch (err) {
    res.status(404).json(err)
  }
}

exports.deletePost = async (req, res) => {
  try {
    const post = await postModel.findByIdAndDelete(req.params.postId)
    const user = await userModel.findById(res.locals.user.id)
    user.post.remove(req.params.postId)

    await user.save()
    res.status(200).json({ msg: 'Post deleted', post })
  } catch (error) {
    res.status(500).json(error)
  }
}