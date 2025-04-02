import db from '@/db';
import { usersTable } from '@/db/schema';
import { first } from '@/db/utils';
import type { App } from '@/index';
import { eq } from 'drizzle-orm';
import { t } from 'elysia';
import { ERROR, INFO, SUCCESS } from '../constants';
import { createTokenVerification, sendVerificationEmail } from '../helpers';
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

      if (user.isSignIn && user.token) return INFO.EMAIL_ALREADY_SIGNED_IN;

      if (!user.isEmailVerified) return error(401, ERROR.EMAIL_NOT_VERIFIED);

      const { verificationToken, isFreshToken } = await createTokenVerification(jwt)({
        email: user.email,
        verificationToken: user.verificationToken!,
        userId: user.userId,
      });

      if (isFreshToken) {
        await sendVerificationEmail(user.email, verificationToken, 'signin');
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
