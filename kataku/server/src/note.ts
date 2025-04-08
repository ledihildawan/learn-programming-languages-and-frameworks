import { db } from '@/db';
import * as schema from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Elysia, t } from 'elysia';
import slugify from 'slugify';
import { getUsername } from './user';

export const note = new Elysia({ prefix: '/note', tags: ['note'] })
  .use(getUsername)
  .guard({
    isSignIn: true,
  })
  .get('/', async () => {
    const notes = await db.select().from(schema.note);

    return { data: notes };
  })
  .post(
    '/',
    async ({ body: { title, content }, username }) => {
      const slug = slugify(title, { lower: true, strict: true });

      const note = await db
        .insert(schema.note)
        .values({
          slug,
          title,
          author: username!,
          content,
        })
        .returning();

      const notes = await db.select().from(schema.note).orderBy(desc(schema.note.lastAccessedAt));

      return { success: true, data: note?.[0] };
    },
    {
      body: t.Object({
        title: t.String(),
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
