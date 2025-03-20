import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { Separator } from "@radix-ui/react-separator";
import { aliasedTable, asc, between, eq, gt, isNotNull, lt, sql } from "drizzle-orm";
import { unionAll } from "drizzle-orm/pg-core";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { unstable_ViewTransition as ViewTransition } from "react";

async function getDataExercise1() {
  "use cache";

  cacheTag("rdfmt-exercise-1");
  cacheLife("hours");

  const orderItems = await db
    .select({
      orderId: schema.storeOrderItemsTable.orderId,
      quantity: schema.storeOrderItemsTable.quantity,
      productId: schema.storeOrderItemsTable.productId,
      unitPrice: schema.inventoryProductsTable.unitPrice,
      totalPrice: sql<number>`${schema.storeOrderItemsTable.quantity} * ${schema.inventoryProductsTable.unitPrice}`,
      productName: schema.inventoryProductsTable.name,
    })
    .from(schema.storeOrderItemsTable)
    .innerJoin(
      schema.inventoryProductsTable,
      eq(schema.storeOrderItemsTable.productId, schema.inventoryProductsTable.productId),
    );

  return orderItems;
}

async function getDataExercise2() {
  "use cache";

  cacheTag("rdfmt-exercise-2");
  cacheLife("hours");

  const orderItems = await db
    .select({
      orderId: schema.storeOrderItemsTable.orderId,
      quantity: schema.storeOrderItemsTable.quantity,
      productId: schema.storeOrderItemsTable.productId,
      unitPrice: schema.inventoryProductsTable.unitPrice,
      totalPrice: sql<number>`${schema.storeOrderItemsTable.quantity} * ${schema.inventoryProductsTable.unitPrice}`,
      productName: schema.inventoryProductsTable.name,
    })
    .from(schema.storeOrderItemsTable)
    .innerJoin(
      schema.inventoryProductsTable,
      eq(schema.storeOrderItemsTable.productId, schema.inventoryProductsTable.productId),
    );

  return orderItems;
}

async function getDataExercise3() {
  "use cache";

  cacheTag("rdfmt-exercise-3");
  cacheLife("hours");

  const manager = aliasedTable(schema.hrEmployeesTable, "manager");
  const employee = aliasedTable(schema.hrEmployeesTable, "employee");

  const data = await db
    .select({
      manager: manager.firstName,
      lastName: employee.lastName,
      firstName: employee.firstName,
      employeeId: employee.officeId,
    })
    .from(employee)
    .innerJoin(manager, eq(employee.reportTo, manager.employeeId));

  return data;
}

async function getDataExercise4() {
  "use cache";

  cacheTag("rdfmt-exercise-4");
  cacheLife("hours");

  const data = await db
    .select({
      orderId: schema.storeOrdersTable.orderId,
      orderDate: schema.storeOrdersTable.orderDate,
      firstName: schema.storeCustomersTable.firstName,
      lastName: schema.storeCustomersTable.lastName,
      status: schema.storeOrderStatusesTable.name,
    })
    .from(schema.storeOrdersTable)
    .innerJoin(
      schema.storeCustomersTable,
      eq(schema.storeOrdersTable.customerId, schema.storeCustomersTable.customerId),
    )
    .innerJoin(
      schema.storeOrderStatusesTable,
      eq(schema.storeOrdersTable.status, schema.storeOrderStatusesTable.orderStatusId),
    )
    .where(isNotNull(schema.storeOrdersTable.status))
    .orderBy(asc(schema.storeOrderStatusesTable.name));

  return data;
}
async function getDataExercise5() {
  "use cache";

  cacheTag("rdfmt-exercise-5");
  cacheLife("hours");

  const data = await db
    .select({
      date: schema.invoicingPaymentsTable.date,
      invoiceId: schema.invoicingPaymentsTable.invoiceId,
      amount: schema.invoicingPaymentsTable.amount,
      name: schema.invoicingClientsTable.name,
      paymentMethod: schema.invoicingPaymentMethodsTable.name,
    })
    .from(schema.invoicingPaymentsTable)
    .innerJoin(
      schema.invoicingClientsTable,
      eq(schema.invoicingClientsTable.clientId, schema.invoicingClientsTable.clientId),
    )
    .innerJoin(
      schema.invoicingPaymentMethodsTable,
      eq(schema.invoicingPaymentsTable.paymentMethod, schema.invoicingPaymentMethodsTable.paymentMethodId),
    );

  return data;
}

async function getDataExercise6() {
  "use cache";

  cacheTag("rdfmt-exercise-6");
  cacheLife("hours");

  const data = await db
    .select({
      productId: schema.storeProductsTable.productId,
      name: schema.storeProductsTable.name,
      quantity: schema.storeOrderItemsTable.quantity,
    })
    .from(schema.storeOrderItemsTable)
    .rightJoin(
      schema.storeProductsTable,
      eq(schema.storeOrderItemsTable.productId, schema.storeProductsTable.productId),
    );

  return data;
}

async function getDataExercise7() {
  "use cache";

  cacheTag("rdfmt-exercise-6");
  cacheLife("hours");

  const data = await db
    .select({
      status: schema.storeOrderStatusesTable.name,
      orderId: schema.storeOrdersTable.orderId,
      shipper: schema.storeShippersTable.name,
      orderDate: schema.storeOrdersTable.orderDate,
      firstName: schema.storeCustomersTable.firstName,
    })
    .from(schema.storeOrdersTable)
    .innerJoin(
      schema.storeCustomersTable,
      eq(schema.storeOrdersTable.customerId, schema.storeCustomersTable.customerId),
    )
    .leftJoin(schema.storeShippersTable, eq(schema.storeOrdersTable.shipperId, schema.storeShippersTable.shipperId))
    .leftJoin(
      schema.storeOrderStatusesTable,
      eq(schema.storeOrdersTable.status, schema.storeOrderStatusesTable.orderStatusId),
    )
    .orderBy(asc(schema.storeOrderStatusesTable.name));

  return data;
}

async function getDataExercise8() {
  "use cache";

  cacheTag("rdfmt-exercise-8");
  cacheLife("hours");

  const manager = aliasedTable(schema.hrEmployeesTable, "manager");
  const employee = aliasedTable(schema.hrEmployeesTable, "employee");

  const data = await db
    .select({
      manager: manager.firstName,
      lastName: employee.lastName,
      firstName: employee.firstName,
      employeeId: employee.officeId,
    })
    .from(employee)
    .leftJoin(manager, eq(employee.reportTo, manager.employeeId));

  return data;
}

async function getDataExercise9() {
  "use cache";

  cacheTag("rdfmt-exercise-9");
  cacheLife("hours");

  const data = await db
    .select({
      date: schema.invoicingPaymentsTable.date,
      client: schema.invoicingClientsTable.name,
      amount: schema.invoicingPaymentsTable.amount,
      paymentMethod: schema.invoicingPaymentMethodsTable.name,
    })
    .from(schema.invoicingPaymentsTable)
    .innerJoin(
      schema.invoicingClientsTable,
      eq(schema.invoicingPaymentsTable.clientId, schema.invoicingClientsTable.clientId),
    )
    .innerJoin(
      schema.invoicingPaymentMethodsTable,
      eq(schema.invoicingPaymentsTable.paymentMethod, schema.invoicingPaymentMethodsTable.paymentMethodId),
    );

  return data;
}

async function getDataExercise10() {
  "use cache";

  cacheTag("rdfmt-exercise-10");
  cacheLife("hours");

  const columns = {
    customerId: schema.storeCustomersTable.customerId,
    firstName: schema.storeCustomersTable.firstName,
    points: schema.storeCustomersTable.points,
  };

  const customerTypeGold = db
    .select({
      ...columns,
      type: sql<string>`'Gold'`,
    })
    .from(schema.storeCustomersTable)
    .where(gt(schema.storeCustomersTable.points, 3000));
  const customerTypeBronze = db
    .select({
      ...columns,
      type: sql<string>`'Bronze'`,
    })
    .from(schema.storeCustomersTable)
    .where(lt(schema.storeCustomersTable.points, 2000));
  const customerTypeSilver = db
    .select({
      ...columns,
      type: sql<string>`'Silver'`,
    })
    .from(schema.storeCustomersTable)
    .where(between(schema.storeCustomersTable.points, 2000, 3000));

  const data = await unionAll(customerTypeBronze, customerTypeSilver, customerTypeGold);

  return data;
}

export default async function RetrievingDataFromMultipeTables() {
  const exercise1 = await getDataExercise1();
  const exercise2 = await getDataExercise2();
  const exercise3 = await getDataExercise3();
  const exercise4 = await getDataExercise4();
  const exercise5 = await getDataExercise5();
  const exercise6 = await getDataExercise6();
  const exercise7 = await getDataExercise7();
  const exercise8 = await getDataExercise8();
  const exercise9 = await getDataExercise9();
  const exercise10 = await getDataExercise10();

  return (
    <ViewTransition>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Retrieving Data From Multipe Tables</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="p-4">
        <h1 className="mb-4 text-xl font-bold">Retrieving Data From Multipe Tables</h1>

        <section id="exercise-1">
          <h2 className="text-md font-semibold">Exercise 1 (Inner Joins)</h2>

          <div className="my-4"></div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>order_id</TableHead>
                <TableHead>product_id</TableHead>
                <TableHead>product_name</TableHead>
                <TableHead>quantity</TableHead>
                <TableHead>unit_price</TableHead>
                <TableHead>total_price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercise1.map((orderItem) => (
                <TableRow key={orderItem.orderId}>
                  <TableCell>{orderItem.orderId}</TableCell>
                  <TableCell>{orderItem.productId}</TableCell>
                  <TableCell>{orderItem.productName}</TableCell>
                  <TableCell>{orderItem.quantity}</TableCell>
                  <TableCell>{orderItem.unitPrice}</TableCell>
                  <TableCell>{orderItem.totalPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <hr className="my-8" />

        <section id="exercise-2">
          <h2 className="text-md font-semibold">Exercise 2 (Join Across Schema)</h2>

          <div className="my-4"></div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>order_id</TableHead>
                <TableHead>product_id</TableHead>
                <TableHead>product_name</TableHead>
                <TableHead>quantity</TableHead>
                <TableHead>unit_price</TableHead>
                <TableHead>total_price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercise2.map((orderItem) => (
                <TableRow key={orderItem.orderId}>
                  <TableCell>{orderItem.orderId}</TableCell>
                  <TableCell>{orderItem.productId}</TableCell>
                  <TableCell>{orderItem.productName}</TableCell>
                  <TableCell>{orderItem.quantity}</TableCell>
                  <TableCell>{orderItem.unitPrice}</TableCell>
                  <TableCell>{orderItem.totalPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <hr className="my-8" />

        <section id="exercise-3">
          <h2 className="text-md font-semibold">Exercise 3 (Self Joins)</h2>

          <div className="my-4"></div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>employee_id</TableHead>
                <TableHead>first_name</TableHead>
                <TableHead>last_name</TableHead>
                <TableHead>manager</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercise3.map((employee) => (
                <TableRow key={employee.employeeId}>
                  <TableCell>{employee.employeeId}</TableCell>
                  <TableCell>{employee.firstName}</TableCell>
                  <TableCell>{employee.lastName}</TableCell>
                  <TableCell>{employee.manager}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <hr className="my-8" />

        <section id="exercise-4">
          <h2 className="text-md font-semibold">Exercise 4 (Multiple Joins)</h2>

          <div className="my-4"></div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>order_id</TableHead>
                <TableHead>order_date</TableHead>
                <TableHead>first_name</TableHead>
                <TableHead>last_name</TableHead>
                <TableHead>status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercise4.map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.firstName}</TableCell>
                  <TableCell>{order.lastName}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <hr className="my-5" />

        <div className="my-4"></div>

        <section id="exercise-5">
          <h2 className="text-md font-semibold">Exercise 5 (Multiple Joins)</h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>date</TableHead>
                <TableHead>invoice_id</TableHead>
                <TableHead>amount</TableHead>
                <TableHead>name</TableHead>
                <TableHead>payment_method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercise5.map((payment) => (
                <TableRow key={payment.invoiceId}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.invoiceId}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.name}</TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <hr className="my-5" />

        <div className="my-4"></div>

        <section id="exercise-6">
          <h2 className="text-md font-semibold">Exercise 6 (Right Join)</h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>product_id</TableHead>
                <TableHead>name</TableHead>
                <TableHead>quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercise6.map((product) => (
                <TableRow key={product.productId}>
                  <TableCell>{product.productId}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <hr className="my-5" />

        <div className="my-4"></div>

        <section id="exercise-7">
          <h2 className="text-md font-semibold">Exercise 7</h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ordre_date</TableHead>
                <TableHead>order_id</TableHead>
                <TableHead>first_name</TableHead>
                <TableHead>shipper</TableHead>
                <TableHead>status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercise7.map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.firstName}</TableCell>
                  <TableCell>{order.shipper}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <hr className="my-8" />

        <section id="exercise-8">
          <h2 className="text-md font-semibold">Exercise 8 (Self Outer Joins)</h2>

          <div className="my-4"></div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>employee_id</TableHead>
                <TableHead>first_name</TableHead>
                <TableHead>last_name</TableHead>
                <TableHead>manager</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercise8.map((employee) => (
                <TableRow key={employee.employeeId}>
                  <TableCell>{employee.employeeId}</TableCell>
                  <TableCell>{employee.firstName}</TableCell>
                  <TableCell>{employee.lastName}</TableCell>
                  <TableCell>{employee.manager}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <hr className="my-8" />

        <section id="exercise-9">
          <h2 className="text-md font-semibold">Exercise 9</h2>

          <div className="my-4"></div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>date</TableHead>
                <TableHead>client</TableHead>
                <TableHead>amount</TableHead>
                <TableHead>payment_method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercise9.map((payment) => (
                <TableRow key={payment.date}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.client}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <hr className="my-8" />

        <section id="exercise-10">
          <h2 className="text-md font-semibold">Exercise 10</h2>

          <div className="my-4"></div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>customer_id</TableHead>
                <TableHead>first_name</TableHead>
                <TableHead>points</TableHead>
                <TableHead>type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercise10.map((customer) => (
                <TableRow key={customer.customerId}>
                  <TableCell>{customer.customerId}</TableCell>
                  <TableCell>{customer.firstName}</TableCell>
                  <TableCell>{customer.points}</TableCell>
                  <TableCell>{customer.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </main>
    </ViewTransition>
  );
}
