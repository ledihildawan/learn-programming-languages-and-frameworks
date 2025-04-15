import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Elysia, t } from 'elysia';
import { generateUniqueSlug } from './db/utils';
import { getUserId } from './user';

export const note = new Elysia({ prefix: '/note', tags: ['note'] })
  .use(getUserId)
  .get('/', async () => {
    const notes = await db.select().from(schema.notes);

    return { data: notes };
  })
  .post(
    '/',
    async ({ body: { title, content }, userId }) => {
      const newTitle = title || 'Untitled';
      const slug = await generateUniqueSlug(newTitle);

      const note = await db
        .insert(schema.notes)
        .values({
          slug,
          title: newTitle,
          author: userId,
          content,
        })
        .returning();

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
      slug: t.String(),
    }),
  })
  .get('/:slug', async ({ params: { slug }, error }) => {
    const note = await db.select().from(schema.notes).where(eq(schema.notes.slug, slug));

    if (!note) {
      return error(404, 'Not Found :(');
    }

    return {
      data: note?.at(0),
    };
  })
  .delete('/:slug', async ({ params: { slug }, error }) => {
    const note = await db.select().from(schema.notes).where(eq(schema.notes.slug, slug));

    if (!note) {
      return error(404, 'Not Found :(');
    }

    await db.delete(schema.notes).where(eq(schema.notes.slug, slug));

    return {
      data: null,
    };
  })
  .patch(
    '/:slug',
    async ({ params: { slug }, body, error, userId }) => {
      const note = await db.select().from(schema.notes).where(eq(schema.notes.slug, slug));

      if (!note) {
        return error(404, 'Not Found :(');
      }

      const updatedNote = await db
        .update(schema.notes)
        .set({ ...body, author: userId })
        .where(eq(schema.notes.slug, slug))
        .returning();

      return {
        data: updatedNote?.at(0),
      };
    },
    {
      body: t.Object({
        title: t.Optional(t.String()),
        content: t.Optional(t.String()),
      }),
    }
  );
