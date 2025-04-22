import { createServer } from 'node:http';

const PORT = 9302;

const server = createServer();

const friends = [
  {
    id: 1,
    name: 'John',
  },
  {
    id: 2,
    name: 'Jane',
  },
  {
    id: 3,
    name: 'Ryan',
  },
];

server.on('request', (req, res) => {
  const items = req.url.split('/');

  if (req.method === 'POST' && items[1] === 'friends') {
    req.on('data', (data) => {
      const friend = data.toString();
      console.log('Request:', friend);
      friends.push(friend);
    });

    req.pipe(res);
  } else if (req.method === 'GET' && items[1] === 'friends') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    if (items.length === 3) {
      const friendIndex = Number(items[2]);

      res.end(JSON.stringify(friends[friendIndex]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === 'GET' && items[1] === 'messages') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
      <html>
        <body>
          <ul>
            <li>Hello Isacc!</li>
            <li>What are your thoughts on astronomy?</li>
          </ul>
        </body>
      </html>  
    `);
    res.end();
  } else {
    res.statusCode = 404;
  }
});

server.listen(PORT);
