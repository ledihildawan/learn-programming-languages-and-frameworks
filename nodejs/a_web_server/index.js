const http = require('http');
let server = http.createServer((req, res) => {
  res.end('Hello Node.js');
});
server.listen(8080);
server.close();

server = http
  .createServer((req, res) => {
    res.end(req.headers['user-agent']);
  })
  .listen(8081);

server = http.createServer((req, res) => {
  Object.keys(req.headers).forEach((key) => {
    res.write(`${key}: ${req.headers[key]}\n`);
  });
  res.end();
});
server.listen(8082);
