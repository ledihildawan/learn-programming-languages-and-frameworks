import db from '@/db';
import { usersTable } from '@/db/schema';
import { first } from '@/db/utils';
import type { App } from '@/index';
import type { Nullable, User } from '@/types';
import { eq } from 'drizzle-orm';
import { t } from 'elysia';
import { ERROR, SUCCESS } from '../constants';
import { createToken, decodeToken, sendVerificationEmail } from '../helpers';
import { authJwt } from '../plugin';

export const signUpRoute = (app: App) =>
  app.use(authJwt).post(
    '/sign-up',
    async ({ body, jwtSignUp: jwt, error }) => {
      const existingUser = await first(db.select().from(usersTable).where(eq(usersTable.email, body.email)).limit(1));

      if (existingUser) {
        const decoded = await decodeToken(jwt)(existingUser.token!);

        let token: Nullable<string>;

        const response = { ...ERROR.EMAIL_ALREADY_REGISTERED };

        if (existingUser.isEmailVerified) {
          response.message = 'The email address is already registered and verified.';
          if (!existingUser.isSignIn) {
            response.message += ' Please sign in.';
          }
        } else {
          response.message = `The email address is already registered. Please check your inbox for a verification email. If you haven't received it, please check your spam folder or request a new one.`;
        }

        if (!decoded) {
          token = await createToken(jwt)(existingUser.email);

          await db
            .update(usersTable)
            .set({ verificationToken: token })
            .where(eq(usersTable.userId, existingUser.userId));

          await sendVerificationEmail(existingUser.email, token, 'signup');
        }

        return error(422, response);
      }

      const newUser = (await first(db.insert(usersTable).values(body).returning())) as User;

      const token = await createToken(jwt)(newUser.email);

      await db.update(usersTable).set({ token }).where(eq(usersTable.userId, newUser.userId!));

      await sendVerificationEmail(newUser.email, token, 'signup');

      return SUCCESS.SIGNUP;
    },
    {
      body: t.Object({
        email: t.String({ format: 'email' }),
      }),
    }
  );
