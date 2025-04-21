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

  if (items === 'friends') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    if (items.length === 3) {
      const friendIndex = Number(items[2]);

      res.end(JSON.stringify(friends[friendIndex]));
    }
  } else {
    res.end(JSON.stringify(friends));
  }
});

server.listen(PORT);
