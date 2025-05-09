import * as schema from '../db/schema';

import { db } from '../db';
import {
  and,
  asc,
  between,
  desc,
  eq,
  gt,
  gte,
  ilike,
  inArray,
  isNotNull,
  isNull,
  like,
  lt,
  lte,
  ne,
  not,
  notInArray,
  or,
} from 'drizzle-orm';

export async function filtering() {
  // Filtering on a single condition
  // Filtering on numeric values
  console.table(
    await db
      .select({
        titleName: schema.title.titleName,
        advanced: schema.title.advance,
      })
      .from(schema.title)
      .where(eq(schema.title.advance, '10000.00'))
  );

  // Filtering on string values
  console.table(
    await db
      .select({
        advanced: schema.title.advance,
      })
      .from(schema.title)
      .where(eq(schema.title.titleName, 'Anne of Fact Tables'))
  );

  // Filtering on date values
  console.table(
    await db
      .select({
        titleName: schema.title.titleName,
        publicationDate: schema.title.publicationDate,
      })
      .from(schema.title)
      .where(eq(schema.title.publicationDate, new Date('2020-03-14')))
  );

  // Filtering on multiple conditions
  // Filtering that requires all conditions
  console.table(
    await db
      .select({
        titleName: schema.title.titleName,
        advance: schema.title.advance,
        royalty: schema.title.royalty,
        publicationDate: schema.title.publicationDate,
      })
      .from(schema.title)
      .where(
        and(
          eq(schema.title.advance, '5000'),
          eq(schema.title.royalty, '15'),
          eq(schema.title.publicationDate, new Date('2015-04-30'))
        )
      )
  );

  // Filtering that requires any one of many conditions
  console.table(
    await db
      .select({
        titleName: schema.title.titleName,
        advance: schema.title.advance,
        royalty: schema.title.royalty,
        price: schema.title.price,
      })
      .from(schema.title)
      .where(
        or(
          eq(schema.title.advance, '5000'),
          eq(schema.title.royalty, '15'),
          eq(schema.title.price, '9.95')
        )
      )
  );

  // Controlling the order of multiple filters
  console.table(
    await db
      .select({
        FirstName: schema.author.firstName,
        LastName: schema.author.lastName,
        PaymentMethod: schema.author.paymentMethod,
      })
      .from(schema.author)
      .where(
        and(
          eq(schema.author.paymentMethod, 'Check'),
          or(
            eq(schema.author.firstName, 'Jorge'),
            eq(schema.author.lastName, 'Miller')
          )
        )
      )
  );

  // Filtering and using ORDER BY
  console.table(
    await db
      .select({
        titleName: schema.title.titleName,
        price: schema.title.price,
        publicationDate: schema.title.publicationDate,
        advance: schema.title.advance,
      })
      .from(schema.title)
      .where(
        and(
          eq(schema.title.price, '9.95'),
          or(
            eq(schema.title.publicationDate, new Date('2016-02-06')),
            eq(schema.title.advance, '6000')
          )
        )
      )
      .orderBy(asc(schema.title.titleName))
  );

  // Filtering on spesific values
  console.table(
    await db
      .select({
        titleName: schema.title.titleName,
        price: schema.title.price,
      })
      .from(schema.title)
      .where(inArray(schema.title.price, ['10.95', '12.95']))
  );

  // Filtering on a range of values
  // Filtering on an opening-ended range
  console.table(
    await db
      .select({
        titleName: schema.title.titleName,
        price: schema.title.price,
      })
      .from(schema.title)
      .where(gt(schema.title.price, '9.95'))
  );

  console.table(
    await db
      .select({
        titleName: schema.title.titleName,
        price: schema.title.price,
      })
      .from(schema.title)
      .where(lt(schema.title.price, '9.95'))
  );

  console.table(
    await db
      .select({
        titleName: schema.title.titleName,
        price: schema.title.price,
      })
      .from(schema.title)
      .where(gte(schema.title.price, '9.95'))
  );

  // Filtering a defined range
  console.table(
    await db
      .select({
        titleName: schema.title.titleName,
        price: schema.title.price,
      })
      .from(schema.title)
      .where(and(between(schema.title.price, '8.95', '10.95')))
      .orderBy(asc(schema.title.price))
  );

  // Negating a spesific value
  console.table(
    await db
      .select({
        titleName: schema.title.titleName,
        price: schema.title.price,
      })
      .from(schema.title)
      .where(ne(schema.title.price, '7.95'))
      .orderBy(asc(schema.title.price))
  );

  // Negating any filter condition
  console.table(
    await db
      .select({
        titleName: schema.title.titleName,
        price: schema.title.price,
      })
      .from(schema.title)
      .where(notInArray(schema.title.price, ['10.95', '12.95']))
      .orderBy(asc(schema.title.publicationDate))
  );

  // Combining types of filter conditions
  console.table(
    await db
      .select({
        titleName: schema.title.titleName,
        advance: schema.title.advance,
        royalty: schema.title.royalty,
        publicationDate: schema.title.publicationDate,
      })
      .from(schema.title)
      .where(
        or(
          and(gt(schema.title.advance, '5000'), ne(schema.title.royalty, '12')),
          gt(schema.title.publicationDate, new Date('2020-01-01'))
        )
      )
  );

  // Filtering with wildcards
  // Filtering with the percent sign (%)
  console.table(
    await db
      .select({
        firstName: schema.author.firstName,
        lastName: schema.author.lastName,
      })
      .from(schema.author)
      .where(like(schema.author.lastName, 'S%'))
  );

  console.table(
    await db
      .select({
        firstName: schema.author.firstName,
        lastName: schema.author.lastName,
      })
      .from(schema.author)
      .where(ilike(schema.author.lastName, '%N'))
  );

  console.table(
    await db
      .select({
        firstName: schema.author.firstName,
        lastName: schema.author.lastName,
      })
      .from(schema.author)
      .where(ilike(schema.author.lastName, 'M%N'))
  );

  console.table(
    await db
      .select({
        firstName: schema.author.firstName,
        lastName: schema.author.lastName,
      })
      .from(schema.author)
      .where(ilike(schema.author.lastName, '%DE%'))
  );

  // Filtering with an underscore (_)
  console.table(
    await db
      .select({
        firstName: schema.author.firstName,
        lastName: schema.author.lastName,
      })
      .from(schema.author)
      .where(like(schema.author.firstName, 'R_b%'))
  );

  console.table(
    await db
      .select({
        firstName: schema.author.firstName,
        lastName: schema.author.lastName,
      })
      .from(schema.author)
      .where(like(schema.author.firstName, '__u%'))
  );

  // Filtering with null values
  console.table(
    await db
      .select()
      .from(schema.author)
      .where(isNotNull(schema.author.middleName))
  );

  console.table(
    await db
      .select()
      .from(schema.author)
      .where(isNull(schema.author.middleName))
  );

  // Lab
  console.table(
    await db
      .select({
        titleName: schema.title.titleName,
        price: schema.title.price,
      })
      .from(schema.title)
      .where(
        // ne(schema.title.price, '9.95')
        // not(eq(schema.title.price, '9.95'))
        // or(lt(schema.title.price, '9.95'), gt(schema.title.price, '9.95'))
        // notInArray(schema.title.price, ['9.95'])
        // inArray(schema.title.price, ['7.95', '8.95', '10.95', '12.95'])
        // or(
        //   between(schema.title.price, '7.95', '8.95'),
        //   between(schema.title.price, '10.95', '12.95')
        // )
        not(between(schema.title.price, '9.95', '9.95'))
      )
      .orderBy(asc(schema.title.price))
  );

  console.table(
    await db
      .select()
      .from(schema.author)
      .where(
        or(
          eq(schema.author.middleName, 'Anne'),
          isNull(schema.author.middleName)
        )
      )
  );

  console.table(
    await db
      .select()
      .from(schema.author)
      .where(
        and(
          like(schema.author.firstName, 'D%'),
          isNull(schema.author.middleName)
        )
      )
  );

  console.table(
    await db
      .select({
        titleName: schema.title.titleName,
        price: schema.title.price,
      })
      .from(schema.title)
      .where(
        and(like(schema.title.titleName, 'The%'), lt(schema.title.price, '10'))
      )
  );

  console.table(
    await db
      .select({
        titleName: schema.title.titleName,
        price: schema.title.price,
      })
      .from(schema.title)
      .where(
        and(
          like(schema.title.titleName, '%s'),
          gt(schema.title.publicationDate, new Date('2020-01-01'))
        )
      )
  );

  console.table(
    await db
      .select({
        titleName: schema.title.titleName,
        price: schema.title.price,
      })
      .from(schema.title)
      .where(
        or(
          like(schema.title.titleName, '% of %'),
          like(schema.title.titleName, '% in %'),
          like(schema.title.titleName, 'of %'),
          like(schema.title.titleName, 'in %'),
          like(schema.title.titleName, '% of'),
          like(schema.title.titleName, '% in')
        )
      )
  );
}
