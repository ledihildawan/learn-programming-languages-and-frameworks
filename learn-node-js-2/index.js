import express from 'express';
import bodyParser from 'body-parser';
import users from './mocks/users';
import logger from './middleware/logger';
import withAuthenticated from './middleware/withwithAuthenticated';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(withAuthenticated);
app.use(logger);

const port = process.env.PORT;

app.get('/v1/users', (req, res) => {
  res.send(users);
  res.status(200).end();
});

app.get('/v1/users/:id', (req, res) => {
  res.send(users[0])
  res.status(200).end();
});

app.post('/v1/users', (req, res) => {
  const { username, email, role } = req.body;
  console.log('post: data => ', username, email, role)
  res.status(200).end();
});

app.put('/v1/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;
  console.log('post: data => ', id, username, email, role)
  res.status(200).end();
});

app.delete('/v1/users/:id', (req, res) => {
  const { id } = req.param;
  console.log('delete: id => ', id);
  res.status(200).end();
});

app.get('/heartbeat', (req, res) => res.send({
  dateTime: new Date().toJSON()
}));

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});