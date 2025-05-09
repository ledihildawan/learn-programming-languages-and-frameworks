import * as schema from '../db/schema';

import { db } from '../db';
import { asc, desc } from 'drizzle-orm';

export async function sortingSkipping() {
  // Sorting data by one column
  // Sort direction
  console.table(
    await db
      .select({
        nameOfTheBook: schema.title.titleName,
        price: schema.title.price,
      })
      .from(schema.title)
      .orderBy(desc(schema.title.titleName))
  );

  // Sorting data by multiple columns
  console.table(
    await db
      .select({
        titleName: schema.title.titleName,
        advance: schema.title.advance,
        royality: schema.title.royalty,
      })
      .from(schema.title)
      .orderBy(desc(schema.title.advance), asc(schema.title.royalty))
  );

  // Sorting by hidden columns
  console.table(
    await db
      .select({
        titleName: schema.title.titleName,
      })
      .from(schema.title)
      .orderBy(desc(schema.title.advance), asc(schema.title.royalty))
  );

  // Skipping data
  // Using limit to reduce results
  console.table(
    await db
      .select({
        titleName: schema.title.titleName,
        publicationDate: schema.title.publicationDate,
      })
      .from(schema.title)
      .orderBy(desc(schema.title.publicationDate))
      .limit(3)
  );

  // Using OFFSET to select a different limited set
  console.table(
    await db
      .select({
        titleName: schema.title.titleName,
        publicationDate: schema.title.publicationDate,
      })
      .from(schema.title)
      .orderBy(desc(schema.title.publicationDate))
      .limit(3)
      .offset(1)
  );

  // Lab
  console.table(
    await db
      .select()
      .from(schema.author)
      .orderBy(asc(schema.author.lastName), asc(schema.author.firstName))
  );

  console.table(
    await db
      .select()
      .from(schema.title)
      .orderBy(desc(schema.title.price))
      .limit(1)
  );
}
