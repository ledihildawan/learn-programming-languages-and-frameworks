import db from '@/db';
import { usersTable } from '@/db/schema';
import { first } from '@/db/utils';
import type { App } from '@/index';
import { eq } from 'drizzle-orm';
import { t } from 'elysia';
import { ERROR, INFO, SUCCESS } from '../constants';
import { ensureFreshToken, sendVerificationEmail } from '../helpers';
import { authJwt } from '../plugin';

export const signInRoute = (app: App) =>
  app.use(authJwt).post(
    '/sign-in',
    async ({ body, error, jwtSignUp: jwt }) => {
      const user = await first(
        db
          .select({
            email: usersTable.email,
            token: usersTable.token,
            userId: usersTable.userId,
            isSignIn: usersTable.isSignIn,
            isEmailVerified: usersTable.isEmailVerified,
            verificationToken: usersTable.verificationToken,
          })
          .from(usersTable)
          .where(eq(usersTable.email, body.email))
          .limit(1)
      );

      if (!user) return error(404, ERROR.EMAIL_NOT_FOUND);
      if (!user.isEmailVerified) return error(401, ERROR.EMAIL_NOT_VERIFIED);

      const { token, isFreshToken } = await ensureFreshToken({
        jwt,
        email: user.email,
        token: user.verificationToken!,
        userId: user.userId,
      });

      if (!isFreshToken) {
        await sendVerificationEmail(user.email, token as string, 'signin');
      }

      if (user.isEmailVerified && user.isSignIn) return INFO.EMAIL_ALREADY_SIGNED_IN;

      return SUCCESS.SIGNIN;
    },
    {
      body: t.Object({
        email: t.String({ format: 'email' }),
      }),
    }
  );

export type SignInRoute = ReturnType<typeof signInRoute>;
