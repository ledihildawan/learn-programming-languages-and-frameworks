import { db } from "..";
import * as schema from "./../schema";
import { clients } from "./clients";
import { customers } from "./customers";
import { employees } from "./employees";
import { invoices } from "./invoices";
import { offices } from "./offices";
import { orderItemNotes } from "./order-item-notes";
import { orderItems } from "./order-items";
import { orderStatuses } from "./order-statuses";
import { orders } from "./orders";
import { paymentMethods } from "./payment-methods";
import { payments } from "./payments";
import { products } from "./products";
import { shippers } from "./shippers";

async function seeder() {
  await db.insert(schema.hrOfficesTable).values(offices);
  await db.insert(schema.hrEmployeesTable).values(employees);

  await db.insert(schema.invoicingClientsTable).values(clients);
  await db.insert(schema.invoicingInvoicesTable).values(invoices);
  await db.insert(schema.invoicingPaymentMethodsTable).values(paymentMethods);
  await db.insert(schema.invoicingPaymentsTable).values(payments);

  await db.insert(schema.inventoryProductsTable).values(products);

  await db.insert(schema.storeProductsTable).values(products);
  await db.insert(schema.storeCustomersTable).values(customers);
  await db.insert(schema.storeOrderStatusesTable).values(orderStatuses);
  await db.insert(schema.storeShippersTable).values(shippers);
  await db.insert(schema.storeOrdersTable).values(orders);
  await db.insert(schema.storeOrderItemNotesTable).values(orderItemNotes);
  await db.insert(schema.storeOrderItemsTable).values(orderItems);
}

seeder();
