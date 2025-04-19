import { randomUUIDv7 } from 'bun';
import { eq, SQL } from 'drizzle-orm';
import { PgColumn, PgSelect } from 'drizzle-orm/pg-core';
import slugify from 'slugify';
import { db } from '.';
import * as schema from './schema';

export function withPagination<T extends PgSelect>(
  qb: T,
  orderByColumn: PgColumn | SQL | SQL.Aliased,
  page = 1,
  pageSize = 3
) {
  return qb
    .orderBy(orderByColumn)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export function getPaginationInfo(total: number, page: number, pageSize: number) {
  const totalPages = Math.ceil(total / pageSize);
  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;

  return {
    total,
    page,
    pageSize,
    totalPages,
    prevPage,
    nextPage,
  };
}

export async function first<T>(query: Promise<T[]>): Promise<T | undefined> {
  const results = await query;

  return results?.[0];
}

export async function doestSlugExits(slug: string) {
  const result = await db
    .select({ slug: schema.notes.slug })
    .from(schema.notes)
    .where(eq(schema.notes.slug, slug))
    .limit(1);

  return result?.at(0);
}

export async function generateUniqueSlug(value: string) {
  const slug = slugify(value, { lower: true, strict: true });

  let uniqueSlug = slug;

  while (await doestSlugExits(uniqueSlug)) {
    uniqueSlug = `${slug}-${randomUUIDv7()}`;
  }

  return uniqueSlug;
}
