const mongoose = require('mongoose')

// USER
const userSchema = mongoose.Schema({
  email: String,
  name: String,
  // refrences
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
})

// const User = mongoose.model('User', userSchema)

module.exports = mongoose.model('User', userSchema)