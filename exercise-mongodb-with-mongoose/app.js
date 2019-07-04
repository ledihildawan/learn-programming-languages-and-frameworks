const mongoose = require('mongoose')

// connection
mongoose.connect('mongodb://localhost/cat_app')

// Define pattern for data
const catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
})

const Cat = mongoose.model('Cat', catSchema)

// Add data to current collection
const john = new Cat({
  name: 'John',
  age: 11,
  temperament: 'Grouchy'
})

john.save((err, cat) => err ? console.log('Something went wrong!') : console.log('We just saved a john to the db: ', cat))

// Retrive all cats from the DB
Cat.find({}, (err, cats) => err ? console.log('Something went wrong!') : console.log('All THE CATS: ', cats))

// Create
Cat.create({
  name: 'John',
  age: 11,
  temperament: 'Grouchy'
}, (err, newCat) => err ? console.log('Something went wrong!') : console.log('cat saved: ', newCat))