import type { Auth } from '@/types';
import bearer from '@elysiajs/bearer';
import jwt from '@elysiajs/jwt';
import type Elysia from 'elysia';

export function adminGuard(app: Elysia) {
  return app
    .use(
      jwt({
        secret: process.env.JWT_SECRET!,
      })
    )
    .use(bearer())
    .derive(async ({ jwt, bearer: token, error }) => {
      if (!token) {
        return error(401);
      }

      const decoded = (await jwt.verify(token)) as unknown as Auth;

      return { auth: decoded };
    });
}
