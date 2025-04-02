import { default as db } from '@/db';
import { usersTable } from '@/db/schema';
import { first } from '@/db/utils';
import type { App } from '@/index';
import { eq } from 'drizzle-orm';
import { t } from 'elysia';
import { ERROR, SUCCESS } from '../constants';

export const signOutRoute = (app: App) =>
  app.post(
    '/sign-out',
    async ({ bearer, error }) => {
      const user = await first(
        db
          .select({
            userId: usersTable.userId,
            token: usersTable.token,
          })
          .from(usersTable)
          .where(eq(usersTable.token, bearer))
          .limit(1)
      );

      if (!user) return error(400, ERROR.NO_SESSION);

      if (bearer !== user.token) return error(401, ERROR.INVALID_SESSION);

      await db
        .update(usersTable)
        .set({
          token: null,
          isSignIn: false,
          lastSignOutAt: new Date(),
          verificationToken: null,
        })
        .where(eq(usersTable.userId, user.userId));

      return SUCCESS.SIGNOUT;
    },
    {
      headers: t.Object({
        authorization: t.String(),
      }),
    }
  );
