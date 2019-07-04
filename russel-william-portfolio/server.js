const StaticServer = require('static-server')

const server = new StaticServer({
  rootPath: './',
  port: 3000
})

server.start(() => {
  console.log(`Server started on port ${server.port}`)
})