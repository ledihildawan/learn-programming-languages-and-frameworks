import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_DATABASE_URI: z.string().url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_DATABASE_URI: process.env.NEXT_PUBLIC_DATABASE_URI,
  },
});
