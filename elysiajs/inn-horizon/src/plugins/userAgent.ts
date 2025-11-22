import { Elysia } from 'elysia';

export const userAgent = (app: Elysia) => app.derive(({ headers }) => ({ userAgent: headers['user-agent'] || '' }));
