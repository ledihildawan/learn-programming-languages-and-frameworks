import * as schema from './../db/schema';

import { db } from '../db';

export async function select() {
  // Retrieving an individual or multiple columns
  // Renaming output columns using aliases
  console.table(
    await db
      .select({
        bookName: schema.title.titleName,
        alsoBookName: schema.title.titleName,
        price: schema.title.price,
      })
      .from(schema.title)
  );

  // Retrieving all columns
  console.table(await db.select().from(schema.title));
}
