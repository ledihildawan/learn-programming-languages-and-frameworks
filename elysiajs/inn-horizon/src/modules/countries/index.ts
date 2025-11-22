import { Elysia, t } from 'elysia';
import { PrismaClient } from '../../prisma';

const prisma = new PrismaClient();

export const countries = new Elysia({ prefix: '/countries' })
  .get('/', async () => {
    const countries = await prisma.countries.findMany();

    return {
      success: true,
      message: 'Countries data fetched successfully',
      data: countries,
    };
  })
  .post(
    '/',
    async ({ body }) => {
      const country = await prisma.countries.create({ data: { ...body } });

      await prisma.systemLogs.create({
        data: {
          action_type: 'CREATE',
          table_name: 'countries',
          record_id: country.id,
          old_data: {},
          new_data: country,
        },
      });

      return {
        success: true,
        message: 'Country created successfully',
        data: country,
      };
    },
    {
      body: t.Object({
        name: t.String(),
        code: t.String(),
      }),
    }
  )
  .patch(
    '/:id',
    async ({ params, body }) => {
      const country = await prisma.countries.update({
        where: { id: params.id },
        data: { ...body },
      });

      return {
        success: true,
        message: 'Country updated successfully',
        data: country,
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        name: t.Optional(t.String()),
        code: t.Optional(t.String()),
      }),
    }
  )
  .delete(
    '/:id',
    async ({ params }) => {
      const country = await prisma.countries.delete({
        where: { id: params.id },
      });

      return {
        success: true,
        message: 'Country deleted successfully',
        data: country,
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );
