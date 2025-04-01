import type { Auth } from '@/types';
import type { App } from '..';

export const auth = () => (app: App) =>
  app.derive(async ({ jwt, bearer: token, error }) => {
    if (!token) {
      return error(401);
    }

    const decoded = (await jwt.verify(token)) as unknown;

    const auth = decoded as Auth;

    return { auth };
  });
