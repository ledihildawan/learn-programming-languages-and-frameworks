import db from '@/db';
import { rolesTable, usersTable } from '@/db/schema';
import { first } from '@/db/utils';
import type { App } from '@/index';
import type { User } from '@/types';
import { eq } from 'drizzle-orm';
import { t } from 'elysia';
import { ERROR, INFO, SUCCESS } from '../constants';
import { decodeToken } from '../helpers';

export const verifyRoute = (app: App) =>
  app.get(
    '/verify',
    async ({ query, jwt, error }) => {
      let decoded = await decodeToken(jwt)(query.verificationToken);

      if (!decoded) return error(400, ERROR.INVALID_TOKEN);

      const user = await first(
        db
          .select({
            email: usersTable.email,
            token: usersTable.token,
            userId: usersTable.userId,
            isSignIn: usersTable.isSignIn,
            lastSignInAt: usersTable.lastSignInAt,
            emailVerifiedAt: usersTable.emailVerifiedAt,
            isEmailVerified: usersTable.isEmailVerified,
            verificationToken: usersTable.verificationToken,
          })
          .from(usersTable)
          .where(eq(usersTable.email, decoded.email))
          .limit(1)
      );

      if (!user) return error(404, ERROR.EMAIL_NOT_FOUND);

      decoded = await decodeToken(jwt)(user.verificationToken!);

      if (user.isSignIn && user.isEmailVerified) {
        return {
          ...INFO.EMAIL_ALREADY_SIGNED_IN,
          data: {
            user: decoded,
            token: user.token,
          },
        };
      }

      const updates: Partial<User> = {};

      if (!user.isSignIn) updates.isSignIn = true;
      if (!user.lastSignInAt) updates.lastSignInAt = new Date();
      if (!user.isEmailVerified) updates.isEmailVerified = true;
      if (!user.emailVerifiedAt) updates.emailVerifiedAt = new Date();

      if (user.verificationToken) updates.verificationToken = null;

      await db.update(usersTable).set(updates).where(eq(usersTable.userId, user.userId));

      if (!updates.isSignIn && user.isEmailVerified && user.verificationToken) {
        return error(409, ERROR.EMAIL_ALREADY_VERIFIED);
      }

      const updatedUser = await first(
        db
          .select({
            role: rolesTable.roleName,
            email: usersTable.email,
            userId: usersTable.userId,
            isEmailVerified: usersTable.isEmailVerified,
          })
          .from(usersTable)
          .leftJoin(rolesTable, eq(rolesTable.roleId, usersTable.roleId))
          .where(eq(usersTable.email, decoded!.email))
          .limit(1)
      );

      console.log(updatedUser, decoded);

      const newToken = await jwt.sign({
        role: updatedUser!.role!,
        email: updatedUser!.email,
        userId: updatedUser!.userId,
        isEmailVerified: Number(updatedUser!.isEmailVerified),
      });

      await db.update(usersTable).set({ token: newToken }).where(eq(usersTable.userId, updatedUser!.userId));

      return {
        data: {
          user: updatedUser,
          token: newToken,
        },
        ...SUCCESS.EMAIL_VERIFIED,
      };
    },
    {
      query: t.Object({ verificationToken: t.String() }),
    }
  );
