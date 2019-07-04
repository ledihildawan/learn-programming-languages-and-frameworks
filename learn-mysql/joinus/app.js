var express = require('express');
var mysql = require('mysql');
var faker = require('faker');

var app = express();
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'join_us'
})

app.get('/', function(req, res) {
  connection.query('SELECT COUNT(*) AS count FROM users', function(err, results, fields) {
  if (err) throw err
    var count = results[0].count;
    res.send(count.toString())
  });
});

app.listen(3000, function() {
  console.log('http://127.0.0.1:3000');
});