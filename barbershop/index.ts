import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { auth } from './auth';
import { role } from './features/role';
import { user } from './features/user';

new Elysia()
  .use(swagger())
  .group('/api/v1', (app) => app.use(auth).use(role).use(user))
  .listen(2437);
