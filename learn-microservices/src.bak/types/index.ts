import * as schema from './../db/schema';

export type Novel = typeof schema.novel.$inferInsert;
export type Order = typeof schema.order.$inferInsert;
export type Client = typeof schema.client.$inferInsert;
export type Author = typeof schema.author.$inferInsert;
export type Promotion = typeof schema.promotion.$inferInsert;
export type OrderLine = typeof schema.orderLine.$inferInsert;
export type NovelAuthor = typeof schema.novelAuthor.$inferInsert;
export type MyFirstQuery = typeof schema.myFirstQuery.$inferInsert;

export type Currency = (typeof schema.currencies)[number];
export type PaymentMethod = (typeof schema.paymentMethods)[number];
