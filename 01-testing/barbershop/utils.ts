import type { User } from './types';

export function generateToken(jwt) {
  return async ({ user, role }: { user: User; role: string }) => {
    const token = await jwt.sign({
      role,
      email: user.email,
      userId: user.userId,
      isEmailVerified: Boolean(user.isEmailVerified),
    });

    return token;
  };
}
