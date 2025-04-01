import type { App } from '..';
import { signInRoute } from './routes/sign-in';
import { signOutRoute } from './routes/sign-out';
import { signUpRoute } from './routes/sign-up';
import { verifyRoute } from './routes/verify';

export const auth = () => (app: App) => app.use(verifyRoute).use(signInRoute).use(signUpRoute).use(signOutRoute);
