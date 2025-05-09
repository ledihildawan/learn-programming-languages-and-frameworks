import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { timing } from 'hono/timing';

const app = new Hono();

app.use('*', timing());
app.use('*', logger());

console.log(Bun.env.TEST);

app.get('/', (c) => {
  return c.json({
    message: 'Hello world!',
  });
});

export default app;
