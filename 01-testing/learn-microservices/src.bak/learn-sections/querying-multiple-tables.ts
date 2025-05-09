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

export async function queryingMultipleTables() {
  console.table(
    await db
      .select({
        clientId: schema.order.clientID,
        firstName: schema.client.firstName,
        lastName: schema.client.lastName,
        orderItem: schema.orderLine.orderID,
      })
      .from(schema.order)
      .innerJoin(
        schema.client,
        eq(schema.order.clientID, schema.client.clientID)
      )
  );
}
