var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 3000;

var todoRoutes = require('./routes/todos');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', function(req, res, next) {
  res.sendFile('index.html')
});

app.use('/api/todos', todoRoutes);

app.listen(port, function() {
  console.log('App is running on http://127.0.0.1:' + port);
});