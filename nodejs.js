// Require Modules
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

// Server
const hostname = '127.0.0.1';
const port = 3000;

// Object of Mime Types
const mimeTypes = {
  html: 'text/html',
  jpeg: 'image/jpeg',
  jpg: 'image/jpg',
  png: 'image/png',
  js: 'text/javascript',
  css: 'text/css',
};

// Create Server
http.createServer(function (req, res) {
  const uri = url.parse(req.url).pathname;
  const fileName = path.join(process.cwd(), unescape(uri));
  let stats;

  try {
    stats = fs.lstatSync(fileName);
  } catch (e) {
    res.writeHead(404, { 'Content-type': 'text/pain' });
    res.write('404 Not Found\n');
    res.end();

    return;
  }

  // Check if file/directory
  if (stats.isFile()) {
    const mimeType = mimeTypes[path.extname(fileName).split('.').reverse()[0]];
    res.writeHead(200, { 'Content-type': mimeType });

    const fileStream = fs.createReadStream(fileName);
    fileStream.pipe(res);
  } else if (stats.isDirectory()) {
    res.writeHead(302, {
      Location: 'index.html',
    });
    res.end();
  } else {
    res.writeHead(500, { 'Content-type': 'text/plain' });
    res.write('500 Internal Error');
  }
}).listen(port, hostname);