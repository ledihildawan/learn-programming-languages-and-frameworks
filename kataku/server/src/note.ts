import { db } from '@/db';
import * as schema from '@/db/schema';
import { Elysia, t } from 'elysia';
import slugify from 'slugify';
import { getUsername } from './user';

export const note = new Elysia({ prefix: '/note', tags: ['note'] })
  .use(getUsername)
  .guard({ isSignIn: true })
  .get('/', async () => {
    const notes = await db.select().from(schema.notes);

    return { data: notes };
  })
  .post(
    '/',
    async ({ body: { title, content }, username }) => {
      const slug = slugify(title || 'Untitled', { lower: true, strict: true });

      const note = await db
        .insert(schema.notes)
        .values({
          slug,
          title: title || 'Untitled',
          author: username!,
          content,
        })
        .returning();

      return { success: true, data: note?.[0] };
    },
    {
      body: t.Object({
        title: t.Optional(t.String()),
        content: t.String(),
      }),
    }
  )
  .guard({
    params: t.Object({
      index: t.Number(),
    }),
  })
  .get('/:index', ({ params: { index }, error }) => {
    return error(404, 'Not Found :(');
  })
  .delete('/:index', ({ params: { index }, error }) => {
    return error(422);
  })
  .patch('/:index', ({ params: { index }, body, error, username }) => {
    return error(422);
  });
