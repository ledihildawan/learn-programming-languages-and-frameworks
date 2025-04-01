import type { App } from '..';
import { auth } from './auth';

export const role = (role?: string) => {
  return (app: App) =>
    app.use(auth()).derive(({ auth, error }) => {
      if (role !== auth.role) {
        return error(401);
      }
    });
};
