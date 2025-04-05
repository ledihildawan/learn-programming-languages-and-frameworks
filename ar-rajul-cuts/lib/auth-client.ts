import { usernameClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: `http://localhost:${process.env.SERVER_PORT || 44720}`,

  plugins: [
    // magicLinkClient(),
    usernameClient(),
  ],
});
