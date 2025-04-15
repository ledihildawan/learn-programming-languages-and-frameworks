import { randomUUIDv7 } from 'bun';
import { eq } from 'drizzle-orm';
import slugify from 'slugify';
import { db } from '.';
import * as schema from './schema';

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

  let uniqueSlug = `${slug}-${randomUUIDv7()}`;

  while (await doestSlugExits(uniqueSlug)) {
    console.log(uniqueSlug);
    uniqueSlug = `${slug}-${randomUUIDv7()}`;
  }

  return uniqueSlug;
}
