import db from '@/db';
import { usersTable } from '@/db/schema';
import { first } from '@/db/utils';
import type { App } from '@/index';
import { eq } from 'drizzle-orm';
import { t } from 'elysia';
import { ERROR, INFO, SUCCESS } from '../constants';
import { createTokenVerification, sendVerificationEmail } from '../helpers';
import { authJwt } from '../plugin';

export const signUpRoute = (app: App) =>
  app.use(authJwt).post(
    '/sign-up',
    async ({ body, jwtSignUp: jwt, error }) => {
      const existingUser = await first(db.select().from(usersTable).where(eq(usersTable.email, body.email)).limit(1));

      if (existingUser?.isSignIn && existingUser?.token) {
        return INFO.EMAIL_ALREADY_SIGNED_UP;
      }

      if (!existingUser) {
        const newUser = await first(db.insert(usersTable).values(body).returning());

        const { verificationToken } = await createTokenVerification(jwt)({
          email: newUser!.email,
          userId: newUser!.userId,
          verificationToken: newUser!.verificationToken!,
        });

        await sendVerificationEmail(newUser!.email, verificationToken, 'signup');

        return SUCCESS.SIGNUP;
      }

      const { verificationToken, isFreshToken, oldVerificationToken } = await createTokenVerification(jwt)({
        email: existingUser.email,
        userId: existingUser.userId,
        verificationToken: existingUser.verificationToken!,
      });

      if (isFreshToken) {
        await sendVerificationEmail(existingUser.email, verificationToken, 'signup');
      }

      if (!existingUser.isEmailVerified && oldVerificationToken === existingUser.verificationToken) {
        return error(400, ERROR.EMAIL_NOT_VERIFIED);
      }

      return error(422, existingUser.isEmailVerified ? ERROR.EMAIL_ALREADY_VERIFIED : ERROR.EMAIL_ALREADY_REGISTERED);
    },
    {
      body: t.Object({
        email: t.String({ format: 'email' }),
      }),
    }
  );
