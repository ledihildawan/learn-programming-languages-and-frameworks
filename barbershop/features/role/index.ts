import db from '@/db';
import { first } from '@/db/utils';
import { eq } from 'drizzle-orm';
import Elysia, { t } from 'elysia';
import { rolesTable } from './table';

const bodyManipulationValidation = t.Object({
  roleName: t.String({ minLength: 3 }),
  description: t.Optional(t.String({ minLength: 3 })),
});

const paramsManipulationValidation = t.Object({
  roleId: t.Number(),
});

export const role = new Elysia({ prefix: '/roles' })
  .get('/', async () => {
    const data = await db.select().from(rolesTable);

    return data;
  })
  .post(
    '/',
    async ({ body }) => {
      const data = await first(db.insert(rolesTable).values(body).returning());

      return data;
    },
    {
      body: bodyManipulationValidation,
    }
  )
  .patch(
    '/:roleId',
    async ({ params: { roleId }, body, error }) => {
      const data = await first(db.update(rolesTable).set(body).where(eq(rolesTable.roleId, roleId)).returning());

      if (!data) {
        return error(404);
      }

      return data;
    },
    {
      body: bodyManipulationValidation,
      params: paramsManipulationValidation,
    }
  )
  .delete(
    '/:roleId',
    async ({ params: { roleId }, error }) => {
      const data = await first(db.delete(rolesTable).where(eq(rolesTable.roleId, roleId)).returning());

      if (!data) {
        return error(404);
      }

      return data;
    },
    {
      params: paramsManipulationValidation,
    }
  );
