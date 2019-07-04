var faker = require('faker')
var mysql = require('mysql')

// console.log(faker.internet.email())
// console.log(faker.date.past())

// function generateAddress() {
//   console.log(faker.address.streetAddress())
//   console.log(faker.address.city())
//   console.log(faker.address.state())
// }

// generateAddress()
// generateAddress()

// Connect To MySQL

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'join_us'
})

// run queris
for (var i = 0; i < 500; i++) {
// var data = {
//   email: faker.internet.email(),
//   created_at: faker.date.past()
// }
// var q = 'INSERT INTO users SET ?'

// connection.query(q, data, function(error, results, fields) {
//   if (error) throw error
//   console.log(results)
// })

// connection.end()
}

var data = []

for (var i = 0; i < 500; i++) {
  data.push([
    faker.internet.email(),
    faker.date.past()
  ])
}

var q = 'INSERT INTO users (email, created_at) VALUES ?'

connection.query(q, [data], function(error, results, fields) {
  if (error) throw error
  console.log(results)
})

connection.end()