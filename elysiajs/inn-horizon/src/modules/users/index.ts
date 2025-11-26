import bcrypt from 'bcryptjs';
import { Elysia, t } from 'elysia';
import { db } from '../../db';
import { ip } from '../../plugins/ip';
import { userAgent } from '../../plugins/userAgent';
import { hashPassword } from '../../utils/users';

const userCreateBody = t.Object({
  username: t.String(),
  email: t.String(),
  password: t.String(),
  first_name: t.String(),
  last_name: t.String(),
  phone_number: t.String(),
  country_id: t.String(),
  role_id: t.String(),
  profile_image_url: t.String(),
});

const userUpdateBody = t.Object({
  username: t.Optional(t.String()),
  email: t.Optional(t.String()),
  password: t.Optional(t.String()),
  first_name: t.Optional(t.String()),
  last_name: t.Optional(t.String()),
  phone_number: t.Optional(t.String()),
  country_id: t.Optional(t.String()),
  role_id: t.Optional(t.String()),
  profile_image_url: t.Optional(t.String()),
});

const paramsWithId = {
  params: t.Object({
    id: t.String(),
  }),
};

function omitPassword(user: any) {
  if (!user) return user;
  const { password_hash, ...rest } = user;
  return rest;
}

export const users = new Elysia({ prefix: '/users' })
  .use(ip)
  .use(userAgent)
  .get('/', async () => {
    try {
      const results = await db.users.findMany();

      return {
        success: true,
        message: 'Users data fetched successfully',
        data: results.map(omitPassword),
      };
    } catch (err) {
      return { success: false, message: 'Failed to fetch users', error: String(err) };
    }
  })
  .post(
    '/',
    async ({ body, ip, userAgent }) => {
      try {
        const { password, ...rest } = body;
        const password_hash = await hashPassword(password);

        const created = await db.users.create({
          data: { ...rest, password_hash },
        });

        // await createAuditLog(
        //   'CREATE',
        //   'users',
        //   created.id,
        //   null,
        //   created,
        //   process.env.USER_ID!,
        //   process.env.USER_ROLE_NAME!,
        //   ip.address,
        //   userAgent
        // );

        return {
          success: true,
          message: 'User created successfully',
          data: omitPassword(created),
        };
      } catch (err) {
        return { success: false, message: 'Failed to create user', error: String(err) };
      }
    },
    { body: userCreateBody }
  )
  .patch(
    '/:id',
    async ({ params, body, ip, userAgent }) => {
      try {
        const id = (params as any).id;
        const { password, ...rest } = body as any;

        const existing = await db.users.findUnique({ where: { id } });
        if (!existing) return { success: false, message: 'User not found' };

        const updateData: any = { ...rest };

        if (typeof password === 'string' && password.length > 0) {
          const isSame = await bcrypt.compare(password, existing.password_hash);

          if (!isSame) {
            updateData.password_hash = await hashPassword(password);
          }
        }

        const updated = await db.users.update({
          where: { id },
          data: updateData,
        });

        // await createAuditLog(
        //   'UPDATE',
        //   'users',
        //   updated.id,
        //   existing,
        //   updated,
        //   process.env.USER_ID!,
        //   process.env.USER_ROLE_NAME!,
        //   ip.address,
        //   userAgent
        // );

        return {
          success: true,
          message: 'User updated successfully',
          data: omitPassword(updated),
        };
      } catch (err) {
        return { success: false, message: 'Failed to update user', error: String(err) };
      }
    },
    { params: paramsWithId.params, body: userUpdateBody }
  )
  .delete(
    '/:id',
    async ({ params, ip, userAgent }) => {
      try {
        const id = (params as any).id;
        const existing = await db.users.findUnique({ where: { id } });
        if (!existing) return { success: false, message: 'User not found' };

        const deleted = await db.users.delete({ where: { id } });

        // await createAuditLog(
        //   'DELETE',
        //   'users',
        //   deleted.id,
        //   existing,
        //   null,
        //   process.env.USER_ID!,
        //   process.env.USER_ROLE_NAME!,
        //   ip.address,
        //   userAgent
        // );

        return {
          success: true,
          message: 'User deleted successfully',
          data: omitPassword(deleted),
        };
      } catch (err) {
        return { success: false, message: 'Failed to delete user', error: String(err) };
      }
    },
    { params: paramsWithId.params }
  );
