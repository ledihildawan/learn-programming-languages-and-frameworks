import bcrypt from 'bcryptjs';
import { Elysia, t } from 'elysia';
import { PrismaClient } from '../../prisma';

const prisma = new PrismaClient();

export const users = new Elysia({ prefix: '/users' })
  .get('/', async () => {
    const users = await prisma.users.findMany();

    return {
      success: true,
      message: 'Users data fetched successfully',
      data: users,
    };
  })
  .post(
    '/',
    async ({ body }) => {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(body.password, salt);

      const user = await prisma.users.create({
        data: {
          email: body.email,
          username: body.username,
          password_hash: hash,
          first_name: body.first_name,
          last_name: body.last_name,
          phone_number: body.phone_number,
          country_id: body.country_id,
        },
      });

      return {
        success: true,
        message: 'User created successfully',
        data: user,
      };
    },
    {
      body: t.Object({
        username: t.String(),
        email: t.String(),
        password: t.String(),
        first_name: t.String(),
        last_name: t.String(),
        phone_number: t.String(),
        country_id: t.String(),
      }),
    }
  )
  .patch(
    '/:id',
    async ({ params, body }) => {
      const user = await prisma.users.update({
        where: { id: params.id },
        data: { ...body },
      });

      return {
        success: true,
        message: 'User updated successfully',
        data: user,
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        username: t.Optional(t.String()),
        email: t.Optional(t.String()),
        password: t.Optional(t.String()),
        first_name: t.Optional(t.String()),
        last_name: t.Optional(t.String()),
        phone_number: t.Optional(t.String()),
        country_id: t.Optional(t.String()),
      }),
    }
  )
  .delete(
    '/:id',
    async ({ params }) => {
      const user = await prisma.users.delete({
        where: { id: params.id },
      });

      return {
        success: true,
        message: 'User deleted successfully',
        data: user,
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );
