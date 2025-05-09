import db from '@/db';
import { checkIfRecordExistsInColumn, first } from '@/db/utils';
import type { App } from '@/index';
import { eq } from 'drizzle-orm';
import { t } from 'elysia';
import { usersTable } from './table';

export const user = () => (app: App) =>
  app
    .post(
      '',
      async ({ body, error }) => {
        let emailExists = await checkIfRecordExistsInColumn(usersTable, 'email', body.email);

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
    );
