const express = require('express');

const app = express();
const router = express.Router();

const data = require('./data');

// app.get('/api/employees', (req, res) => res.send('Hello world!'));
// app.post('/api/employees', (req, res) => res.send('HTTP POST in action'));
// app.all('/api/employees', (req, res) => res.send(`${req.method} in action`));
// app.route('/api/employess')
//   .get((req, res) => res.send('GET'))
//   .post((req, res) => res.send('POST'));

router.get('/employess', (req, res) => res.send(data));

router.get('/employess/:id', (req, res) => {
  const employe = data.filter(d => d.id === req.params.id);

  res.send(employe);
});

app.use('/api', router);

const port = 3000;

app.listen(port, () => console.log(`Server is listening on ${port}.`));