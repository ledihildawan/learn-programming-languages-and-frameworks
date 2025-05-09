import * as schema from './../schema';

import { db } from '../index';
import { titles } from './title.seeder';
import { authors } from './author.seeder';
import { customers } from './customer.seeder';
import { promotions } from './promotion.seeder';
import { orderHeaders } from './order-header.seeder';
import { titleAuthors } from './title-author.seeder';

export async function seeder() {
  await db.insert(schema.title).values(titles);
  await db.insert(schema.author).values(authors);
  await db.insert(schema.customer).values(customers);
  await db.insert(schema.titleAuthor).values(titleAuthors);
  await db.insert(schema.orderHeader).values(orderHeaders);
  await db.insert(schema.promotion).values(promotions);

  await db.insert(schema.myFirstQuery).values([{ outcome: 'Hello, World!' }]);
}

seeder();
