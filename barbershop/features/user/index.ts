import db from '@/db';
import { checkIfRecordExistsInColumn, first } from '@/db/utils';
import { adminGuard } from '@/guards/admin';
import { eq } from 'drizzle-orm';
import Elysia, { t } from 'elysia';
import { usersTable } from './table';

export const user = new Elysia({ prefix: '/users' }).use(adminGuard).group('/', (app) =>
  app
    .derive(({ auth, error }) => {
      if (auth.role !== 'admin') {
        return error(403);
      }
    })
    .post(
      '',
      async ({ body, error, auth }) => {
        let emailExists = await checkIfRecordExistsInColumn(usersTable, 'email', body.email);

        if (auth)
          if (emailExists) {
            return error(422, {
              summary: 'Email already exists',
              message: 'The email provided is already registered',
            });
          }

        const user = await db.insert(usersTable).values(body).returning();

        return user;
      },
      {
        body: t.Object({
          email: t.String({ format: 'email' }),
        }),
      }
    )
    .patch(
      ':userId',
      async ({ body, params: { userId }, error }) => {
        const currentData = await db
          .select({ userId: usersTable.userId })
          .from(usersTable)
          .where(eq(usersTable.userId, userId));

        if (!currentData) {
          return error(404);
        }

        const updatedData = await first(
          db.update(usersTable).set(body).where(eq(usersTable.userId, userId)).returning()
        );

        return updatedData;
      },
      {
        params: t.Object({
          userId: t.Number(),
        }),
        body: t.Object({
          email: t.String({ format: 'email' }),
        }),
      }
    )
);
