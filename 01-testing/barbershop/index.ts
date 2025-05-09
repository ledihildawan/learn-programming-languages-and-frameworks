import bearer from '@elysiajs/bearer';
import jwt from '@elysiajs/jwt';
import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { auth } from './auth';
import { role } from './features/role';
import { user } from './features/user';
import { role as roleGuard } from './guards/role';

const router = () => (app: App) =>
  app
    .group('/api/v1/auth', (app) => app.use(auth()))
    .group('/api/v1/admin', (app) =>
      app
        .use(roleGuard('admin'))
        .group('/roles', (app) => app.use(role()))
        .group('/users', (app) => app.use(user()))
    );

export const app = new Elysia()
  .use(swagger())
  .use(
    jwt({
      secret: process.env.JWT_SECRET!,
    })
  )
  .use(bearer());

app.use(router());

app.listen(2437);

export type App = typeof app;
