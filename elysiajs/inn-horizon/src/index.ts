import { Elysia, t } from 'elysia';
import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

const app = new Elysia()
  .onError(({ error }) => {
    return new Response(error.toString());
  })
  .group('/api', (app) =>
    app
      .get('/countries', async () => {
        const countries = await prisma.countries.findMany();

        return {
          success: true,
          message: 'Countries data fetched successfully',
          data: countries,
        };
      })
      .post(
        '/countries',
        async ({ body }) => {
          const country = await prisma.countries.create({ data: { ...body } });

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
        '/countries/:id',
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
        '/countries/:id',
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
      )
  )
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
