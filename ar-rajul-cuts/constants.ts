export const DB_URL = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
export const URL_API =
  typeof window === 'undefined' ? `http://localhost:${process.env.PORT ?? 3000}` : window.location.origin;
