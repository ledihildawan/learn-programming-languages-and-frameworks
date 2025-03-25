import { eq } from 'drizzle-orm';
import Elysia, { t } from 'elysia';
import slugify from 'slugify';
import { db } from './db';
import { table } from './db/schema';
import { first } from './db/utils';
import { Article } from './types';
import { auth } from './user';

export function getSlug(title: string) {
  return slugify(title, { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
}

export const article = new Elysia({ prefix: '/articles' })
  .get(
    '/:slug',
    async ({ params }) => {
      const article = await first(
        db
          .select()
          .from(table.article)
          .leftJoin(table.user, eq(table.article.authorId, table.user.id))
          .where(eq(table.article.slug, params.slug))
          .limit(1)
      );

      return {
        article,
      };
    },
    {
      params: t.Object({
        slug: t.String(),
      }),
    }
  )
  .use(auth)
  .post(
    '/',
    async ({ auth, body }) => {
      const data = {
        ...body.article,
        slug: getSlug(body.article.title),
        authorId: auth!.user!.id,
      } as Article;

      if (!body.article.tagList.length) {
        body.article.tagList = [];
      }

      const article = await first(db.insert(table.article).values(data).returning());

      return {
        article,
      };
    },
    {
      body: t.Object({
        article: t.Object({
          title: t.String(),
          description: t.String(),
          body: t.String(),
          tagList: t.Array(t.String()),
        }),
      }),
    }
  )
  .delete(
    '/:slug',
    async ({ params, error, auth }) => {
      const article = await first(db.select().from(table.article).where(eq(table.article.slug, params.slug)).limit(1));

      if (!article) {
        return error(404, 'Article does not exist');
      }

      if (article.authorId !== auth!.user!.id) {
        return error(403, 'You are not an author');
      }

      await db.delete(table.article).where(eq(table.article.slug, params.slug));
    },
    {
      params: t.Object({
        slug: t.String(),
      }),
    }
  )
  .patch(
    '/:slug',
    async ({ body, params, auth, error }) => {
      const currentArticle = await first(
        db.select().from(table.article).where(eq(table.article.slug, params.slug)).limit(1)
      );

      if (!currentArticle) {
        return error(404, 'Article does not exist');
      }

      if (currentArticle.authorId !== auth!.user!.id) {
        return error(403, 'You are not an author');
      }

      const updatedArticle = await first(db.update(table.article).set(body.article).returning());

      return {
        user: updatedArticle,
      };
    },
    {
      params: t.Object({
        slug: t.String(),
      }),
      body: t.Object({
        article: t.Object({
          title: t.Optional(t.String()),
          description: t.Optional(t.String()),
          body: t.Optional(t.String()),
          tagList: t.Optional(t.Array(t.String())),
        }),
      }),
    }
  );
