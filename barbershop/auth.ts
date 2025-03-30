import jwt from '@elysiajs/jwt';
import { eq } from 'drizzle-orm';
import Elysia, { t } from 'elysia';
import db from './db';
import { rolesTable, usersTable } from './db/schema';
import { first } from './db/utils';
import mail from './mail';
import { setupTemplateEmailSignIn } from './mail/sign-in';
import { setupTemplateEmailSignUp } from './mail/sign-up';
import type { Auth, Role, User } from './types';
import { generateToken } from './utils';

const jwtSignUp = jwt({
  exp: '15m',
  name: 'jwtSignUp',
  secret: process.env.JWT_SECRET!,
});

const signUp = new Elysia().use(jwtSignUp).post(
  '/sign-up',
  async ({ body, error, jwtSignUp }) => {
    const user = await first(db.select().from(usersTable).where(eq(usersTable.email, body.email)).limit(1));

    if (user) {
      let data = {
        summary: 'Email already exists',
        message: 'The email provided is already registered',
      };

      if (!user.isEmailVerified) {
        data = {
          summary: 'Email already registered but not verified',
          message: 'The email is already registered but has not been verified yet',
        };
      }

      return error(422, data);
    }

    const newUser = (await first(db.insert(usersTable).values(body).returning())) as User;
    const role = (await first(
      db.select({ roleName: rolesTable.roleName }).from(rolesTable).where(eq(rolesTable.roleId, newUser.roleId!))
    )) as Role;

    const token = await generateToken(jwtSignUp)({ user: newUser!, role: role.roleName });

    await mail.sendMail({
      from: 'lhildawan@gmail.com',
      to: newUser.email,
      subject: 'Verify Your Email Address',
      html: setupTemplateEmailSignUp(token),
    });

    return {
      summary: 'User registration successful',
      message: 'User has been successfully registered. Please verify your email to complete the registration process.',
    };
  },
  {
    body: t.Object({
      email: t.String({ format: 'email' }),
    }),
  }
);

export const auth = new Elysia({ prefix: '/auth' })
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET!,
    })
  )
  .get(
    '/verify',
    async ({ query: { token }, jwt, error }) => {
      const decoded = (await jwt.verify(token)) as unknown as Auth;

      if (!decoded) {
        return error(400, {
          summary: 'Email verification failed',
          message: 'The verification link is invalid or has expired. Please request a new verification link.',
        });
      }

      const user = await first(db.select().from(usersTable).where(eq(usersTable.email, decoded.email)));

      if (!user) {
        return error(404);
      }

      if (user.isEmailVerified) {
        return {
          summary: 'Email already verified',
          message: 'This email has already been verified. You can now log in to your account.',
        };
      }

      await db.update(usersTable).set({ isEmailVerified: true }).where(eq(usersTable.userId, user.userId));

      return {
        summary: 'Email verification successful',
        message: 'Your email has been successfully verified. Your account is now active.',
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
            userId: usersTable.userId,
            roleName: rolesTable.roleName,
            isEmailVerified: usersTable.isEmailVerified,
          })
          .from(usersTable)
          .leftJoin(rolesTable, eq(rolesTable.roleId, usersTable.roleId))
          .where(eq(usersTable.userId, usersTable.userId))
      );

      if (!user) {
        return error(401, {
          summary: 'Email is not registered',
          message: 'The email provided is not registered in our system',
        });
      }

      const token = await generateToken(jwt)({ user: user!, role: user.roleName! });

      await mail.sendMail({
        from: 'lhildawan@gmail.com',
        to: user.email,
        subject: `Sign In to ${process.env.APP_NAME} Without a Password`,
        html: setupTemplateEmailSignIn(token),
      });
    },
    {
      body: t.Object({
        email: t.String({ format: 'email' }),
      }),
    }
  )
  .use(signUp);
