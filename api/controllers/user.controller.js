const { userModel } = require('../models/user.model')
const { postModel } = require('../models/post.model')

exports.getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId)
    res.status(200).json(user)
  } catch (err) {
    res.status(404).json(err)
  }
}

exports.updateUser = async (req, res) => {
  try {
    const user = await userModel.findOneAndUpdate({ _id: res.locals.user._id }, req.body, { new: true })
    res.status(200).json(user)
  } catch (err) {
    res.status(404).json(err)
  }
}

exports.deleteUser = async (req, res) => {
  try {
    await userModel.deleteOne({ _id: res.locals.user._id })
    res.status(200).json('Tu cuenta ha sido eliminada correctamente')
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.follow = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId)
    user.followers.push(res.locals.user.id)
    await user.save()
    res.locals.user.followedusers.push(user.id)
    await res.locals.user.save()

    res.status(200).json({ msg: 'User followed succesfull', user })
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.unfollow = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId)
    user.followers.remove(res.locals.user.id)
    await user.save()
    res.locals.user.followedusers.remove(user.id)
    await res.locals.user.save()

    res.status(200).json({ msg: 'User unfollowed succesfull', user })
    
  } catch (err) {
    res.status(500).json(err)
  }
}

// exports.feed = async (req, res) => {
//   try {
//     let arrPosts = []
//     const mychannels = res.locals.user.followedusers
//     console.log(mychannels)
//     for (let i = 0; i < mychannels.length; i++) {
//       let posts = await postModel.find({ creator: mychannels[i] })
//       arrPosts.push(...posts)
//     }

//     res.status(200).json(arrPosts)
//   } catch (error) {
//     res.status(500).json(error)
//   }
// }