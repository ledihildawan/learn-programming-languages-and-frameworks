import { sql } from 'drizzle-orm';

import { currencies, paymentMethods } from '../data';

import {
  text,
  uuid,
  index,
  pgEnum,
  boolean,
  varchar,
  integer,
  numeric,
  pgTable,
  timestamp,
  primaryKey,
} from 'drizzle-orm/pg-core';

export const currencyEnum = pgEnum('currency', currencies);
export const paymentMethodEnum = pgEnum('payment_method', paymentMethods);

// Base columns for all tables
const baseColumns = {
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  isDeleted: boolean('is_deleted').notNull().default(false),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
};

export const promotion = pgTable(
  'Promotion',
  {
    promotionID: uuid('PromotionID').primaryKey().defaultRandom(),
    promotionCode: varchar('PromotionCode', { length: 20 }).notNull().unique(),
    promotionStartDate: timestamp('PromotionStartDate', {
      withTimezone: true,
    }).notNull(),
    promotionEndDate: timestamp('PromotionEndDate', {
      withTimezone: true,
    }).notNull(),
    discountPercentage: numeric('DiscountPercentage', {
      precision: 5,
      scale: 2,
    }).notNull(),
    description: text('Description'),
    ...baseColumns,
  },
  (table) => ({
    codeIdx: index('promotion_code_idx').on(table.promotionCode),
    dateIdx: index('promotion_dates_idx').on(
      table.promotionStartDate,
      table.promotionEndDate
    ),
    // Check that startDate is before endDate
    checkDates: sql`CHECK (${table.promotionStartDate} < ${table.promotionEndDate})`,
  })
);

export const client = pgTable(
  'Client',
  {
    clientID: uuid('ClientID').primaryKey().defaultRandom(),
    firstName: varchar('FirstName', { length: 50 }).notNull(),
    lastName: varchar('LastName', { length: 50 }).notNull(),
    email: varchar('Email', { length: 100 }).notNull().unique(),
    phone: varchar('Phone', { length: 20 }),
    address: varchar('Address', { length: 100 }),
    city: varchar('City', { length: 50 }),
    state: varchar('State', { length: 50 }),
    zip: varchar('Zip', { length: 20 }),
    country: varchar('Country', { length: 50 }),
    ...baseColumns,
  },
  (table) => ({
    nameIdx: index('client_name_idx').on(table.firstName, table.lastName),
    emailIdx: index('client_email_idx').on(table.email),
  })
);

export const novel = pgTable(
  'Novel',
  {
    novelID: uuid('NovelID').primaryKey().defaultRandom(),
    novelName: varchar('NovelName', { length: 100 }).notNull(),
    price: numeric('Price', { precision: 10, scale: 2 }).notNull(),
    currency: currencyEnum('Currency').notNull().default('USD'),
    advance: numeric('Advance', { precision: 12, scale: 2 }).notNull(),
    royalty: numeric('Royalty', { precision: 5, scale: 2 }),
    publicationDate: timestamp('PublicationDate', {
      withTimezone: true,
    }).notNull(),
    isbn: varchar('ISBN', { length: 20 }).unique(),
    description: text('Description'),
    ...baseColumns,
  },
  (table) => ({
    nameIdx: index('novel_name_idx').on(table.novelName),
    publicationDateIdx: index('novel_pub_date_idx').on(table.publicationDate),
    isbnIdx: index('novel_isbn_idx').on(table.isbn),
    // Check that price is positive
    checkPrice: sql`CHECK (${table.price} > 0)`,
  })
);

export const order = pgTable(
  'Order',
  {
    orderID: uuid('OrderID').primaryKey().defaultRandom(),
    clientID: uuid('ClientID')
      .notNull()
      .references(() => client.clientID, { onDelete: 'restrict' }),
    promotionID: uuid('PromotionID').references(() => promotion.promotionID, {
      onDelete: 'set null',
    }),
    orderDate: timestamp('OrderDate', { withTimezone: true }).notNull(),
    totalAmount: numeric('TotalAmount', { precision: 12, scale: 2 }).notNull(),
    currency: currencyEnum('Currency').notNull().default('USD'),
    status: varchar('Status', { length: 20 }).notNull().default('PENDING'),
    notes: text('Notes'),
    ...baseColumns,
  },
  (table) => ({
    clientIdx: index('order_client_idx').on(table.clientID),
    orderDateIdx: index('order_date_idx').on(table.orderDate),
    statusIdx: index('order_status_idx').on(table.status),
    // Check that totalAmount is positive
    checkAmount: sql`CHECK (${table.totalAmount} > 0)`,
  })
);

export const author = pgTable(
  'Author',
  {
    authorID: uuid('AuthorID').primaryKey().defaultRandom(),
    firstName: varchar('FirstName', { length: 50 }).notNull(),
    middleName: varchar('MiddleName', { length: 50 }),
    lastName: varchar('LastName', { length: 50 }).notNull(),
    email: varchar('Email', { length: 100 }).unique(),
    paymentMethod: paymentMethodEnum('PaymentMethod').notNull(),
    paymentDetails: text('PaymentDetails'),
    biography: text('Biography'),
    ...baseColumns,
  },
  (table) => ({
    nameIdx: index('author_name_idx').on(table.firstName, table.lastName),
    emailIdx: index('author_email_idx').on(table.email),
  })
);

export const orderLine = pgTable(
  'OrderLine',
  {
    orderLineID: uuid('OrderLineID').primaryKey().defaultRandom(),
    orderID: uuid('OrderID')
      .notNull()
      .references(() => order.orderID, { onDelete: 'cascade' }),
    novelID: uuid('NovelID')
      .notNull()
      .references(() => novel.novelID, { onDelete: 'restrict' }),
    quantity: integer('Quantity').notNull(),
    itemPrice: numeric('ItemPrice', { precision: 10, scale: 2 }).notNull(),
    discount: numeric('Discount', { precision: 5, scale: 2 }).default('0.00'),
    subtotal: numeric('Subtotal', { precision: 12, scale: 2 }).notNull(),
    ...baseColumns,
  },
  (table) => ({
    orderIdx: index('order_line_order_idx').on(table.orderID),
    novelIdx: index('order_line_novel_idx').on(table.novelID),
    // Check quantity and price are positive
    checkQuantity: sql`CHECK (${table.quantity} > 0)`,
    checkPrice: sql`CHECK (${table.itemPrice} > 0)`,
    // Check that subtotal = quantity * itemPrice - discount
    checkSubtotal: sql`CHECK (${table.subtotal} = ${table.quantity} * ${table.itemPrice} - ${table.discount})`,
  })
);

export const novelAuthor = pgTable(
  'NovelAuthor',
  {
    novelID: uuid('NovelID')
      .notNull()
      .references(() => novel.novelID, { onDelete: 'cascade' }),
    authorID: uuid('AuthorID')
      .notNull()
      .references(() => author.authorID, { onDelete: 'cascade' }),
    authorOrder: integer('AuthorOrder').notNull(),
    royaltyShare: numeric('RoyaltyShare', { precision: 5, scale: 2 }),
    ...baseColumns,
  },
  (table) => ({
    pk: primaryKey({ columns: [table.novelID, table.authorID] }),
    compsiteKey: '',
    novelIdx: index('novel_author_novel_idx').on(table.novelID),
    authorIdx: index('novel_author_author_idx').on(table.authorID),
    // Check that royaltyShare is between 0 and 100
    checkRoyaltyShare: sql`CHECK (${table.royaltyShare} >= 0 AND ${table.royaltyShare} <= 100)`,
  })
);

export const myFirstQuery = pgTable('MyFirstQuery', {
  outcome: text('Outcome').notNull(),
});
