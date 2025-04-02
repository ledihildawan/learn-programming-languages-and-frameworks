// app/user/[[...slugs]]/route.ts
import { Elysia, t } from 'elysia';

// Membuat aplikasi Elysia dengan prefix '/user'
const app = new Elysia({ prefix: '/user' })
  // Endpoint untuk mendapatkan data pengguna
  .get('/:id', ({ params }) => {
    return { message: `User ID: ${params.id}` };
  })
  // Endpoint untuk membuat pengguna baru
  .post(
    '/',
    ({ body }) => {
      return { message: `User ${body.name} created!` };
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
      }),
    }
  )
  // Endpoint untuk memperbarui data pengguna
  .put(
    '/:id',
    ({ params, body }) => {
      return { message: `User ID: ${params.id} updated with name ${body.name}` };
    },
    {
      body: t.Object({
        name: t.String(),
      }),
    }
  )
  // Endpoint untuk menghapus data pengguna
  .delete('/:id', ({ params }) => {
    return { message: `User ID: ${params.id} deleted!` };
  });

// Mengekspor handler GET, POST, PUT, DELETE
export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
