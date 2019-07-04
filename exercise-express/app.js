const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  const title = req.query.s
  const url = `https://www.omdbapi.com/?apikey=1e601f03&s=${title}`

  request(url, (error, response, body) => {
    if (!error & response.statusCode === 200) {
      const movies = JSON.parse(body)
      res.render('home', { movies: movies['Search'], title })
    }
  })
})

app.listen(3000, () => console.log('Server running on http://127.0.0.1:3000'))