import jwt from '@elysiajs/jwt';
import { eq } from 'drizzle-orm';
import { t } from 'elysia';
import type { App } from '.';
import db from './db';
import { rolesTable, usersTable } from './db/schema';
import { first } from './db/utils';
import mail from './mail';
import { setupTemplateEmailSignIn } from './mail/sign-in';
import { setupTemplateEmailSignUp } from './mail/sign-up';
import type { Nullable, User } from './types';

const signUpFirstMessage = {
  status: 'error',
  message: 'The email address is not registered. Please sign up first.',
};

const sendEmailRegistration = async ({ email, token }: { email: string; token: string }) => {
  await mail.sendMail({
    to: email,
    html: setupTemplateEmailSignUp(token),
    from: 'lhildawan@gmail.com',
    subject: 'Welcome! Please Verify Your Email to Complete Registration',
  });
};

const decodedVerificationToken = (jwt) => async (token: string) => {
  const decoded = await jwt.verify(token);

  return decoded as { email: string };
};

const generateVerificationToken = (jwt) => async (email: string) => {
  const token = await jwt.sign({ email });

  return token as string;
};

export const auth = () => (app: App) =>
  app
    .use(
      jwt({
        exp: '15m',
        name: 'jwtSignUp',
        secret: process.env.JWT_SECRET!,
      })
    )
    .get(
      '/verify',
      async ({ query, jwt, error }) => {
        const decoded = await decodedVerificationToken(jwt)(query.token);

        if (!decoded) {
          return error(400, {
            status: 'error',
            message: 'The verification link is invalid or has expired. Please request a new verification email.',
          });
        }

        const user = await first(
          db
            .select({
              email: usersTable.email,
              token: usersTable.token,
              userId: usersTable.userId,
              isSignIn: usersTable.isSignIn,
              lastSignInAt: usersTable.lastSignInAt,
              emailVerifiedAt: usersTable.emailVerifiedAt,
              isEmailVerified: usersTable.isEmailVerified,
            })
            .from(usersTable)
            .where(eq(usersTable.email, decoded.email))
            .limit(1)
        );

        if (!user) {
          return error(404, signUpFirstMessage);
        }

        if (!user.isSignIn && user.isEmailVerified) {
          return error(409, {
            summary: 'Email already verified',
            message: 'This email has already been verified. You can now log in to your account.',
          });
        }

        if (user.isSignIn && user.isEmailVerified) {
          return {
            status: 'info',
            message: 'You are already logged in. Please continue your session.',
          };
        }

        const data = {} as Partial<Pick<User, 'isEmailVerified' | 'emailVerifiedAt' | 'isSignIn' | 'lastSignInAt'>>;

        if (!user.isEmailVerified) {
          data.isEmailVerified = true;
        }

        if (!user.emailVerifiedAt) {
          data.emailVerifiedAt = new Date();
        }

        if (!user.isSignIn) {
          data.isSignIn = true;
        }

        if (!user.lastSignInAt) {
          data.lastSignInAt = new Date();
        }

        await db.update(usersTable).set(data).where(eq(usersTable.userId, user.userId));

        const updatedUser = await first(
          db
            .select({
              role: rolesTable.roleName,
              email: usersTable.email,
              userId: usersTable.userId,
              isEmailVerified: usersTable.isEmailVerified,
            })
            .from(usersTable)
            .leftJoin(rolesTable, eq(rolesTable.roleId, usersTable.roleId))
            .where(eq(usersTable.email, decoded.email))
            .limit(1)
        );

        const newToken = await jwt.sign({
          role: updatedUser!.role!,
          email: updatedUser!.email,
          userId: updatedUser!.userId,
          isEmailVerified: Number(updatedUser!.isEmailVerified),
        });

        return {
          data: {
            user: updatedUser,
            token: newToken,
          },
          status: 'success',
          message: 'Your email has been successfully verified. You are now logged in.',
        };
      },
      {
        query: t.Object({
          token: t.String(),
        }),
      }
    )
    .post(
      '/sign-in',
      async ({ error, jwt }) => {
        const user = await first(
          db
            .select({
              email: usersTable.email,
              isEmailVerified: usersTable.isEmailVerified,
            })
            .from(usersTable)
            .leftJoin(rolesTable, eq(rolesTable.roleId, usersTable.roleId))
            .where(eq(usersTable.userId, usersTable.userId))
        );

        if (!user) {
          return error(404, signUpFirstMessage);
        }

        const token = await generateVerificationToken(jwt)(user.email);

        if (!user.isEmailVerified) {
          await mail.sendMail({
            to: user.email,
            html: setupTemplateEmailSignUp(token),
            from: 'lhildawan@gmail.com',
            subject: 'Welcome! Please Verify Your Email to Complete Registration',
          });

          return error(401, {
            status: 'error',
            message: 'Your email address is not verified. Please check your inbox to verify your email.',
          });
        }

        await mail.sendMail({
          to: user.email,
          html: setupTemplateEmailSignIn(token),
          from: 'lhildawan@gmail.com',
          subject: 'Your Magic Link to Sign In',
        });

        return {
          status: 'success',
          message: 'Sign In successful! A magic link has been sent to your email.',
        };
      },
      {
        body: t.Object({
          email: t.String({ format: 'email' }),
        }),
      }
    )
    .post(
      '/sign-up',
      async ({ body, jwtSignUp: jwt, error }) => {
        let token: Nullable<string>;

        const user = await first(db.select().from(usersTable).where(eq(usersTable.email, body.email)).limit(1));

        if (user) {
          const data = {
            status: 'error',
            message: 'The email address is already registered. Please Sign In or use a different email to Sign Up.',
          };
          const decoded = await decodedVerificationToken(jwt)(user.token!);

          if (user.isEmailVerified) {
            data.message = 'The email address is already registered and verified.';

            if (!user.isSignIn) {
              data.message += ' Please sign in.';
            }
          } else {
            data.message =
              "The email address is already registered. Please check your inbox for a verification email. If you haven't received it, please check your spam folder or request a new verification email.";
          }

          if (!decoded) {
            token = await generateVerificationToken(jwt)(user.email);

            await db.update(usersTable).set({ token }).where(eq(usersTable.userId, user.userId));

            await sendEmailRegistration({ token, email: user.email });
          }

          return error(422, data);
        }

        const newUser = (await first(db.insert(usersTable).values(body).returning())) as User;

        token = await generateVerificationToken(jwt)(newUser.email);

        await db.update(usersTable).set({ token }).where(eq(usersTable.userId, newUser.userId!));

        await sendEmailRegistration({ email: newUser.email, token });

        return {
          status: 'success',
          message: 'Sign Up successful! Please check your email to verify your account.',
        };
      },
      {
        body: t.Object({
          email: t.String({ format: 'email' }),
        }),
      }
    );
