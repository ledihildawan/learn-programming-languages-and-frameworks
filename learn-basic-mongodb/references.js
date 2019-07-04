const mongoose = require('mongoose')

// collections
const Post = require('./models/post')
const User = require('./models/user')

mongoose.connect('mongodb://127.0.0.1/blog_demo_2', { useNewUrlParser: true })

Post.create({
  title: 'Lorem ipsum the best copy',
  content: 'awesome thi si the bset akfadslkf jasd l;f'
}, (err, post) => {
  User.findOne({ email: 'john@gmail.com' }, (err, foundUser) => {
    if (err) {
      console.log(err)
    } else {
      foundUser.posts.push(post)
      foundUser.save((err, data) => {
        if (err) {
          console.log(err)
        } else {
          console.log(data)
        }
      })
    }
  })
})

// User.create({
//   email: 'john@gmail.com',
//   name: 'John Snow'
// })

// Retrive john posts from posts collection relation
// User.findOne({ email: 'john@gmail.com'} ).populate('posts').exec((err, user) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(user)
//   }
// })