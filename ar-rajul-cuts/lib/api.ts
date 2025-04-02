import { App } from '@/app/api/[[...slugs]]/route';
import { treaty } from '@elysiajs/eden';

export const api = treaty<App>(
  typeof window === 'undefined' ? `http://localhost:${process.env.PORT ?? 3000}` : window.location.origin
).api;
