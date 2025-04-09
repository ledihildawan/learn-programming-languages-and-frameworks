export const DB_URL = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
export const URL_API =
  typeof window === 'undefined' ? `http://localhost:${process.env.PORT ?? 3000}` : window.location.origin;
export const SERVER_PORT = process.env.SERVER_PORT || 44720;
export const APP_PORT = process.env.APP_PORT || 32462;
