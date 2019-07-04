const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// Handlebars - template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set staic folder
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
const db = require('./config/database');

// test db
// db.authenticate()
//   .then(() => console.log('Database connected...'))
//   .catch(err => console.log('Error: ' + err))

// Routes
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));
app.use('/gigs', require('./routes/gigs'));

app.listen(PORT, console.log(`Server started on http://127.0.0.1:${PORT}`))