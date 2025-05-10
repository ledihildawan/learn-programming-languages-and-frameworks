import { db } from "@/db";
import * as schema from "@/db/schema";
import { and, asc, count, desc, eq, gt, lt } from "drizzle-orm";
import { Elysia, t } from "elysia";
import slugify from "slugify";
import {
  first,
  generateUniqueSlug,
  getPaginationInfo,
  withPagination,
} from "./db/utils";
import { getUserId } from "./user";

export const note = new Elysia({ prefix: "/note", tags: ["note"] })
  .use(getUserId())
  .get(
    "/",
    async ({ query: { page, pageSize, sort }, userId }) => {
      const orderBy = sort?.length
        ? sort.map((item) =>
            item.desc ? desc(schema.notes[item.id]) : asc(schema.notes[item.id])
          )
        : [asc(schema.notes.createdAt)];

      const query = db
        .select({
          title: schema.notes.title,
          slug: schema.notes.slug,
          content: schema.notes.content,
          createdAt: schema.notes.createdAt,
          updatedAt: schema.notes.updatedAt,
          author: schema.users.name,
        })
        .from(schema.notes)
        .leftJoin(schema.users, eq(schema.users.id, schema.notes.author))
        .where(eq(schema.users.id, userId!));

      const notes = await withPagination(
        query.$dynamic(),
        orderBy,
        page,
        pageSize
      );
      const total =
        (
          await first(
            db
              .select({ id: schema.users.id, total: count() })
              .from(schema.notes)
              .leftJoin(schema.users, eq(schema.users.id, schema.notes.author))
              .where(eq(schema.users.id, userId!))
              .groupBy(schema.users.id)
          )
        )?.total || 0;

      return {
        data: notes,
        pagination: getPaginationInfo(total, page, pageSize),
      };
    },
    {
      query: t.Object({
        page: t.Number(),
        pageSize: t.Number(),
        sort: t.Optional(
          t.Array(
            t.Object({
              desc: t.Boolean(),
              id: t.String(),
            })
          )
        ),
      }),
    }
  )
  .post(
    "/",
    async ({ body: { title, content }, userId }) => {
      const slug = await generateUniqueSlug(title);

      const note = await db
        .insert(schema.notes)
        .values({
          slug,
          title,
          author: userId!,
          content,
        })
        .returning();
      const auditLog = await db.insert(schema.auditLogs).values({
        userId,
        action: "create",
        module: "note",
        createdAt: new Date(),
        description: `A new note titled '${title}' was created on ${new Date().toLocaleString()}.`,
      });

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
  .get("/:slug", async ({ params: { slug }, error, userId }) => {
    const note = await first(
      db
        .select()
        .from(schema.notes)
        .where(
          and(eq(schema.notes.slug, slug), eq(schema.notes.author, userId!))
        )
    );

    if (!note) {
      return error(404, "Not Found :(");
    }

    const nextNote = await first(
      db
        .select()
        .from(schema.notes)
        .where(
          and(gt(schema.notes.id, note.id), eq(schema.notes.author, userId!))
        )
        .orderBy(asc(schema.notes.id))
        .limit(1)
    );
    const prevNote = await first(
      db
        .select()
        .from(schema.notes)
        .where(
          and(lt(schema.notes.id, note.id), eq(schema.notes.author, userId!))
        )
        .orderBy(desc(schema.notes.id))
        .limit(1)
    );

    return {
      data: note,
      nextNote,
      prevNote,
    };
  })
  .delete("/:slug", async ({ params: { slug }, error, userId }) => {
    const note = await first(
      db.select().from(schema.notes).where(eq(schema.notes.slug, slug))
    );

    if (!note) {
      return error(404, "Not Found :(");
    }

    await db.delete(schema.notes).where(eq(schema.notes.slug, slug));

    const auditLog = await db.insert(schema.auditLogs).values({
      userId,
      action: "delete",
      module: "note",
      createdAt: new Date(),
      description: `Note titled '${note.title}' was deleted on ${new Date().toLocaleString()}.`,
    });

    return {
      data: null,
    };
  })
  .patch(
    "/:slug",
    async ({ params: { slug }, body, error, userId }) => {
      const note = await first(
        db.select().from(schema.notes).where(eq(schema.notes.slug, slug))
      );

      if (!note) {
        return error(404, "Not Found :(");
      }

      const isEqualSlug = note.slug === slugify(body.title!);
      const newSlug = !isEqualSlug && (await generateUniqueSlug(body.title!));

      const updatedNote = await first(
        db
          .update(schema.notes)
          .set({
            ...body,
            slug: newSlug || note.slug,
            updatedAt: new Date(),
          })
          .where(eq(schema.notes.slug, slug))
          .returning()
      );

      const auditLog = await db.insert(schema.auditLogs).values({
        userId,
        action: "update",
        module: "note",
        oldValue: JSON.stringify(note),
        newValue: JSON.stringify(updatedNote),
        createdAt: new Date(),
        description: `Note titled '${note.title}' was updated on ${new Date().toLocaleString()}.`,
      });

      return {
        data: updatedNote,
      };
    },
    {
      body: t.Object({
        title: t.Optional(t.String()),
        content: t.Optional(t.String()),
      }),
    }
  );
