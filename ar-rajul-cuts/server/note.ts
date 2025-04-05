import { db } from '@/db';
import * as schema from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Elysia, t } from 'elysia';
import { first } from 'radash';
import slugify from 'slugify';
import { store } from './store';
import { getUsername } from './user';

export const note = new Elysia({ prefix: '/note', tags: ['note'] })
  .use(store)
  .use(getUsername)
  .get('/', async () => {
    const notes = await db.select().from(schema.note);

    return { data: notes };
  })
  .post(
    '/',
    async ({ body: { title, content }, username, wsClient }) => {
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

      wsClient.list.forEach((ws) => {
        ws.send({
          type: 'updateRecents',
          data: notes,
        });
      });

      return { success: true, data: first(note) };
    },
    {
      isSignIn: true,
      body: t.Object({
        title: t.String(),
        content: t.String(),
      }),
    }
  );
// .get(
//   '/:index',
//   ({ note, params: { index }, error }) => {
//     return note.data[index] ?? error(404, 'Not Found :(');
//   },
//   {
//     params: t.Object({
//       index: t.Number(),
//     }),
//   }
// )
// .guard({
//   params: t.Object({
//     index: t.Number(),
//   }),
// })
// .delete('/:index', ({ note, params: { index }, error }) => {
//   if (index in note.data) return note.remove(index);

//   return error(422);
// })
// .patch(
//   '/:index',
//   ({ note, params: { index }, body: { data }, error, username }) => {
//     if (index in note.data) return note.update(index, { data, author: username });

//     return error(422);
//   },
//   {
//     isSignIn: true,
//     body: 'memo',
//   }
// );
