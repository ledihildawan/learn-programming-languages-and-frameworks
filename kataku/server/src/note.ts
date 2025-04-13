import { db } from '@/db';
import * as schema from '@/db/schema';
import { Elysia, t } from 'elysia';
import { getUserId } from './user';

export const note = new Elysia({ prefix: '/note', tags: ['note'] })
  .use(getUserId)
  .guard({ isSignIn: true })
  .get('/', async () => {
    const notes = await db.select().from(schema.notes);

    return { data: notes };
  })
  .post(
    '/',
    async ({ body, userId }) => {
      console.log(body);

      // const slug = slugify(title || 'Untitled', { lower: true, strict: true });

      // const note = await db
      //   .insert(schema.notes)
      //   .values({
      //     slug,
      //     title: title || 'Untitled',
      //     author: userId!,
      //     content,
      //   })
      //   .returning();

      // return { success: true, data: note?.[0] };
    },
    {
      // body: t.Object({
      //   title: t.String(),
      //   content: t.String(),
      // }),
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
  .patch('/:index', ({ params: { index }, body, error, userId }) => {
    return error(422);
  });
