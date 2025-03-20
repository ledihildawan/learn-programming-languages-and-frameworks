import * as schema from "@/db/schema";

export type Order = typeof schema.storeOrdersTable.$inferInsert;
export type Client = typeof schema.invoicingClientsTable.$inferInsert;
export type Office = typeof schema.hrOfficesTable.$inferInsert;
export type Invoice = typeof schema.invoicingInvoicesTable.$inferInsert;
export type Payment = typeof schema.invoicingPaymentsTable.$inferInsert;
export type Product = typeof schema.inventoryProductsTable.$inferInsert;
export type Shipper = typeof schema.storeShippersTable.$inferInsert;
export type Customer = typeof schema.storeCustomersTable.$inferInsert;
export type Employee = typeof schema.hrEmployeesTable.$inferInsert;
export type OrderItem = typeof schema.storeOrderItemsTable.$inferInsert;
export type OrderStatus = typeof schema.storeOrderStatusesTable.$inferInsert;
export type PaymentMethod = typeof schema.invoicingPaymentMethodsTable.$inferInsert;
export type OrderItemNote = typeof schema.storeOrderItemNotesTable.$inferInsert;
