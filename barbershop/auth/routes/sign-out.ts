import db from '@/db';
import { usersTable } from '@/db/schema';
import type { App } from '@/index';
import { eq } from 'drizzle-orm';
import { t } from 'elysia';
import { ERROR, SUCCESS } from '../constants';
import type { TokenPayload } from '../types';

export const signOutRoute = (app: App) =>
  app.post(
    '/sign-out',
    async ({ jwt, bearer: token, error }) => {
      if (!token) return error(400, ERROR.NO_SESSION);

      const decoded = (await jwt.verify(token)) as TokenPayload | null;
      if (!decoded?.userId) return error(401, ERROR.INVALID_SESSION);

      await db
        .update(usersTable)
        .set({
          token: null,
          isSignIn: false,
          lastSignOutAt: new Date(),
        })
        .where(eq(usersTable.userId, decoded.userId));

      return SUCCESS.SIGNOUT;
    },
    {
      headers: t.Object({
        authorization: t.String(),
      }),
    }
  );
