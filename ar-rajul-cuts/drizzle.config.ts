import { defineConfig } from 'drizzle-kit';
import { DB_URL } from './constants';

export default defineConfig({
  out: './db/drizzle',
  schema: './db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: DB_URL,
  },
});
