const mongoose = require('mongoose')

// POST
const postSchema = mongoose.Schema({
  title: String,
  content: String
})

// const Post = mongoose.model('Post', postSchema)

module.exports = mongoose.model('Post', postSchema)