import type { Context } from 'hono';
import { env } from 'hono/adapter';
import { jwt } from 'hono/jwt';
import { API_PREFIX } from '../constants';
import { AUTH_PREFIX, LOGIN_ROUTE, REGISTER_ROUTE } from '../controllers/auth';
import type { APIUser } from '../models/api';

export async function checkJWTAuth(c: Context, next: () => Promise<void>): Promise<Response | void> {
  const basePath = API_PREFIX + AUTH_PREFIX;

  if ([basePath + LOGIN_ROUTE, basePath + REGISTER_ROUTE].includes(c.req.path)) {
    return await next();
  } else {
    const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c);
    
    const jwtMiddleware = jwt({
      secret: JWT_SECRET,
    });

    return jwtMiddleware(c, next);
  }
}