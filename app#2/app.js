const express = require('express')
const ejs = require('ejs')

const PORT = process.env.PORT || 3000
const HOSTNAME = '127.0.0.1'

const app = express()

app.use(express.static('public'))

app.set('views', 'views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home-guest')
})

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server started on http://${HOSTNAME}:${PORT}`)
})