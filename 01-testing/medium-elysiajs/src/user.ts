import jwt from '@elysiajs/jwt';
import { eq } from 'drizzle-orm';
import { Elysia, t } from 'elysia';
import { omit } from 'lodash';
import { db } from './db';
import { table } from './db/schema';
import { first, recordExists } from './db/utils';
import { User } from './types';

export async function auth(app: Elysia) {
  return app
    .use(
      jwt({
        secret: process.env.JWT_SECRET!,
      })
    )
    .derive(async ({ headers, jwt, set }) => {
      const authHeader = headers.authorization;

      const auth: {
        user: User | undefined | null;
        error: string;
        isAuthenticated: boolean;
      } = {
        user: null,
        error: '',
        isAuthenticated: false,
      };

      if (!authHeader || !authHeader.startsWith('Token ')) {
        set.status = 401;

        auth.error = 'Unauthorized';

        return { auth };
      }

      const token = authHeader?.split(' ')[1];

      try {
        const decoded = (await jwt.verify(token)) as User;

        const user = await first(db.select().from(table.user).where(eq(table.user.email, decoded.email)).limit(1));

        auth.user = {
          ...omit(user, 'password'),
          token,
        };
        auth.isAuthenticated = true;
      } catch (error) {
        auth.error = 'Invalid token';
      }

      return { auth };
    })
    .onBeforeHandle(({ auth }) => {
      if (!auth.isAuthenticated) {
        return {
          error: auth.error,
        };
      }
    });
}

async function transformUser(jwt, user: User) {
  const token = await generateJwtToken(jwt, user!);

  return {
    user: {
      ...omit(user, 'password'),
      token,
    },
  };
}

async function getUser(email: string): Promise<User | undefined> {
  const user = await first(db.select().from(table.user).where(eq(table.user.email, email)).limit(1));

  return user;
}

async function generateJwtToken(jwt, user: User) {
  const token = await jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username,
  });

  return token;
}

export const user = new Elysia()
  .use(
    jwt({
      secret: process.env.JWT_SECRET!,
    })
  )
  .post(
    '/users/login',
    async ({ jwt, body, error }) => {
      const emailTaken = await recordExists(table.user, 'email', body.user.email);
      const invalidMessage = error(422, {
        statusCode: 422,
        message: 'Credentials are not valid',
      });

      if (!emailTaken) {
        return invalidMessage;
      }

      const user = await getUser(body.user.email);
      const isPasswordCorrect = await Bun.password.verify(body.user.password, user!.password);

      if (!isPasswordCorrect) {
        return invalidMessage;
      }

      const token = await generateJwtToken(jwt, user!);

      return {
        user: {
          ...omit(user, 'password'),
          token,
        },
      };
    },
    {
      body: t.Object({
        user: t.Object({
          email: t.String({
            format: 'email',
          }),
          password: t.String({
            minLength: 8,
          }),
        }),
      }),
    }
  )
  .use(auth)
  .get('/user', ({ auth }) => ({ user: auth?.user }))
  .post(
    '/users',
    async ({ body, jwt, error }) => {
      body.user.password = await Bun.password.hash(body.user.password);

      const emailTaken = await recordExists(table.user, 'email', body.user.email);
      const usernameTaken = await recordExists(table.user, 'username', body.user.username);

      if (emailTaken || usernameTaken) {
        return error(422, {
          message: 'Email or username are taken',
          statusCode: 422,
        });
      }

      const user = await first(db.insert(table.user).values(body.user).returning());

      return transformUser(jwt, user!);
    },
    {
      body: t.Object({
        user: t.Object({
          username: t.String({
            minLength: 6,
          }),
          email: t.String({
            format: 'email',
          }),
          password: t.String({
            minLength: 8,
          }),
        }),
      }),
    }
  )
  .put(
    '/user',
    async ({ auth, body, jwt }) => {
      if (body.user.password) {
        body.user.password = await Bun.password.hash(body.user.password);
      }

      const user = await first(
        db.update(table.user).set(body.user).where(eq(table.user.id, auth!.user!.id!)).returning()
      );

      return transformUser(jwt, user!);
    },
    {
      body: t.Object({
        user: t.Object({
          username: t.Optional(
            t.String({
              minLength: 6,
            })
          ),
          email: t.Optional(
            t.String({
              format: 'email',
            })
          ),
          password: t.Optional(
            t.String({
              minLength: 8,
            })
          ),
          image: t.Optional(t.String()),
          bio: t.Optional(t.String()),
        }),
      }),
    }
  );
