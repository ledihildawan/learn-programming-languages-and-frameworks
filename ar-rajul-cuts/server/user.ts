import { auth } from '@/lib/auth';
import { Elysia, t } from 'elysia';

export const userService = new Elysia({ name: 'user/service' })
  .model({
    signIn: t.Object({
      username: t.String({ minLength: 3 }),
      password: t.String({ minLength: 8 }),
    }),
  })
  .derive({ as: 'scoped' }, async ({ request: { headers } }) => {
    const session = await auth.api.getSession({ headers });

    return {
      user: session?.user,
      session: session?.session,
    };
  })
  .macro({
    isSignIn: {
      async beforeHandle({ error, session, user }) {
        if (!session && !user) {
          return error(404, {
            success: 'error',
            message: 'Unauthorized Access: Token is missing',
          });
        }
      },
    },
  });

export const getUsername = new Elysia()
  .use(userService)
  .guard({ isSignIn: true })
  .resolve(({ user }) => ({ username: user!.username }))
  .as('plugin');
