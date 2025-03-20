import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { Separator } from "@radix-ui/react-separator";
import { and, between, desc, eq, gt, gte, ilike, inArray, isNull, or, sql } from "drizzle-orm";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { unstable_ViewTransition as ViewTransition } from "react";
import TableCustomer from "./components/table-customer";
import TableOrder from "./components/table-order";

async function getDataExercise1() {
  "use cache";

  cacheTag("exercise-1");
  cacheLife("hours");

  const products = await db
    .select({
      name: schema.inventoryProductsTable.name,
      newPrice: sql<number>`${schema.inventoryProductsTable.unitPrice} * 1.1`,
      productId: schema.inventoryProductsTable.productId,
      unitPrice: schema.inventoryProductsTable.unitPrice,
    })
    .from(schema.inventoryProductsTable);

  return products;
}

async function getDateExercise2() {
  "use cache";

  cacheTag("exercise-2");
  cacheLife("hours");

  const orders = await db
    .select()
    .from(schema.storeOrdersTable)
    .where(gte(schema.storeOrdersTable.orderDate, "2019-01-01"));

  return orders;
}

async function getDateExercise3() {
  "use cache";

  cacheTag("exercise-3");
  cacheLife("hours");

  const totalPriceCol = sql<number>`${schema.storeOrderItemsTable.quantity} * ${schema.storeOrderItemsTable.unitPrice}`;

  const orderItems = await db
    .select({
      orderId: schema.storeOrderItemsTable.orderId,
      quantity: schema.storeOrderItemsTable.quantity,
      productId: schema.storeOrderItemsTable.productId,
      unitPrice: schema.storeOrderItemsTable.unitPrice,
      totalPrice: totalPriceCol,
    })
    .from(schema.storeOrderItemsTable)
    .where(and(eq(schema.storeOrderItemsTable.orderId, 6), gt(totalPriceCol, "30")));

  return orderItems;
}

async function getDateExercise4() {
  "use cache";

  cacheTag("exercise-4");
  cacheLife("hours");

  const products = await db
    .select()
    .from(schema.inventoryProductsTable)
    .where(inArray(schema.inventoryProductsTable.quantityInStock, [49, 38, 72]));

  return products;
}

async function getDateExercise5() {
  "use cache";

  cacheTag("exercise-5");
  cacheLife("hours");

  const customers = await db
    .select()
    .from(schema.storeCustomersTable)
    .where(between(schema.storeCustomersTable.birthDate, "1990-1-1", "2000-1-1"));

  return customers;
}

async function getDateExercise6() {
  "use cache";

  cacheTag("exercise-6");
  cacheLife("hours");

  const customers = await db
    .select()
    .from(schema.storeCustomersTable)
    .where(
      or(ilike(schema.storeCustomersTable.address, "%TRAIL%"), ilike(schema.storeCustomersTable.address, "%AVENUE%")),
    );

  return customers;
}

async function getDateExercise7() {
  "use cache";

  cacheTag("exercise-7");
  cacheLife("hours");

  const customers = await db
    .select()
    .from(schema.storeCustomersTable)
    .where(ilike(schema.storeCustomersTable.phone, "%9"));

  return customers;
}

async function getDateExercise8() {
  "use cache";

  cacheTag("exercise-8");
  cacheLife("hours");

  const customers = await db
    .select()
    .from(schema.storeCustomersTable)
    .where(sql`${schema.storeCustomersTable.firstName} ~* 'elka|ambur'`);

  return customers;
}

async function getDateExercise9() {
  "use cache";

  cacheTag("exercise-9");
  cacheLife("hours");

  const customers = await db
    .select()
    .from(schema.storeCustomersTable)
    .where(sql`${schema.storeCustomersTable.lastName} ~* 'ey$|on$'`);

  return customers;
}

async function getDateExercise10() {
  "use cache";

  cacheTag("exercise-10");
  cacheLife("hours");

  const customers = await db
    .select()
    .from(schema.storeCustomersTable)
    .where(sql`${schema.storeCustomersTable.lastName} ~* '^my|se'`);

  return customers;
}

async function getDateExercise11() {
  "use cache";

  cacheTag("exercise-11");
  cacheLife("hours");

  const customers = await db
    .select()
    .from(schema.storeCustomersTable)
    .where(sql`${schema.storeCustomersTable.lastName} ~* 'B[r|u]'`);

  return customers;
}

async function getDateExercise12() {
  "use cache";

  cacheTag("exercise-12");
  cacheLife("hours");

  const orders = await db.select().from(schema.storeOrdersTable).where(isNull(schema.storeOrdersTable.shipperId));

  return orders;
}

async function getDataExercise13() {
  "use cache";

  cacheTag("exercise-13");
  cacheLife("hours");

  const totalPriceCol = sql<number>`${schema.storeOrderItemsTable.quantity} * ${schema.storeOrderItemsTable.unitPrice}`;

  const orderItems = await db
    .select({
      orderId: schema.storeOrderItemsTable.orderId,
      quantity: schema.storeOrderItemsTable.quantity,
      productId: schema.storeOrderItemsTable.productId,
      unitPrice: schema.storeOrderItemsTable.unitPrice,
      totalPrice: totalPriceCol,
    })
    .from(schema.storeOrderItemsTable)
    .orderBy(desc(totalPriceCol));

  return orderItems;
}

async function getDataExercise14() {
  "use cache";

  cacheTag("exercise-14");
  cacheLife("hours");

  const customers = await db
    .select()
    .from(schema.storeCustomersTable)
    .orderBy(desc(schema.storeCustomersTable.points))
    .limit(3);

  return customers;
}

export default async function RetrievingDataFromASingleTable() {
  const exercise1 = await getDataExercise1();
  const exercise2 = await getDateExercise2();
  const exercise3 = await getDateExercise3();
  const exercise4 = await getDateExercise4();
  const exercise5 = await getDateExercise5();
  const exercise6 = await getDateExercise6();
  const exercise7 = await getDateExercise7();
  const exercise8 = await getDateExercise8();
  const exercise9 = await getDateExercise9();
  const exercise10 = await getDateExercise10();
  const exercise11 = await getDateExercise11();
  const exercise12 = await getDateExercise12();
  const exercise13 = await getDataExercise13();
  const exercise14 = await getDataExercise14();

  return (
    <ViewTransition>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Retrieving Data From a Single Table</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="p-4">
        <h1 className="mb-4 text-xl font-bold">Retrieving Data From a Single Table</h1>

        <section id="exercise-1">
          <h2 className="text-md font-semibold">Exercise 1</h2>

          <div className="my-4 text-sm">
            <p>
              Write an SQL query to return all the products with the following columns: name, unit price and new price
              (calculated as unit price * 1.1).
            </p>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>product_id</TableHead>
                <TableHead>name</TableHead>
                <TableHead>unit_price</TableHead>
                <TableHead>new_price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercise1.map((product) => (
                <TableRow key={product.productId}>
                  <TableCell>{product.productId}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.unitPrice}</TableCell>
                  <TableCell>{product.newPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <hr className="my-8" />

        <section id="exercise-2">
          <h2 className="text-md font-semibold">Exercise 2</h2>

          <div className="my-4 text-sm">
            <p>Write an SQL query to retrieve all orders placed in the year 2019.</p>
          </div>

          <TableOrder orders={exercise2}></TableOrder>
        </section>

        <hr className="my-8" />

        <section id="exercise-3">
          <h2 className="text-md font-semibold">Exercise 3</h2>

          <div className="my-4 text-sm">
            <p>
              Write an SQL query to retrieve all items from the order_items table for order #6, where the total price is
              greater than 30.
            </p>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>order_id</TableHead>
                <TableHead>product_id</TableHead>
                <TableHead>quantity</TableHead>
                <TableHead>unit_price</TableHead>
                <TableHead>total_price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercise3.map((orderItem) => (
                <TableRow key={orderItem.orderId}>
                  <TableCell>{orderItem.orderId}</TableCell>
                  <TableCell>{orderItem.productId}</TableCell>
                  <TableCell>{orderItem.quantity}</TableCell>
                  <TableCell>{orderItem.unitPrice}</TableCell>
                  <TableCell>{orderItem.totalPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <hr className="my-8" />

        <section id="exercise-4">
          <h2 className="text-md font-semibold">Exercise 4</h2>

          <div className="my-4 text-sm">
            <p>
              Write an SQL query to retrieve all products from the products table where the quantity in stock is equal
              to 49, 38, or 72.
            </p>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>product_id</TableHead>
                <TableHead>name</TableHead>
                <TableHead>quantity_in_stock</TableHead>
                <TableHead>unit_price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercise4.map((product) => (
                <TableRow key={product.productId}>
                  <TableCell>{product.productId}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantityInStock}</TableCell>
                  <TableCell>{product.unitPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <hr className="my-8" />

        <section id="exercise-5">
          <h2 className="text-md font-semibold">Exercise 5</h2>

          <div className="my-4 text-sm">
            <p>
              Write an SQL query to retrieve all customers from the customers table who were born between January 1,
              1990, and January 1, 2000.
            </p>
          </div>

          <TableCustomer customers={exercise5}></TableCustomer>
        </section>

        <hr className="my-8" />

        <section id="exercise-6">
          <h2 className="text-md font-semibold">Exercise 6</h2>

          <div className="my-4 text-sm">
            <p>
              Write an SQL query to retrieve all customers from the customers table whose address contains either TRAIL
              or AVENUE.
            </p>
          </div>

          <TableCustomer customers={exercise6}></TableCustomer>
        </section>

        <hr className="my-8" />

        <section id="exercise-7">
          <h2 className="text-md font-semibold">Exercise 7</h2>

          <div className="my-4 text-sm">
            Write an SQL query to retrieve all customers from the customers table whose phone number ends with 9.
          </div>

          <TableCustomer customers={exercise7}></TableCustomer>
        </section>

        <hr className="my-8" />

        <section id="exercise-8">
          <h2 className="text-md font-semibold">Exercise 8</h2>

          <div className="my-4 text-sm">
            Write an SQL query to retrieve all customers from the customers table whose first name is either ELKA or
            AMBUR.
          </div>

          <TableCustomer customers={exercise8}></TableCustomer>
        </section>

        <hr className="my-8" />

        <section id="exercise-9">
          <h2 className="text-md font-semibold">Exercise 9</h2>

          <div className="my-4 text-sm">
            Write an SQL query to retrieve all customers from the customers table whose last name ends with EY or ON.
          </div>

          <TableCustomer customers={exercise9}></TableCustomer>
        </section>

        <hr className="my-8" />

        <section id="exercise-10">
          <h2 className="text-md font-semibold">Exercise 10</h2>

          <div className="my-4 text-sm">
            Write an SQL query to retrieve all customers from the customers table whose first name starts with MY or
            contains SE.
          </div>

          <TableCustomer customers={exercise10}></TableCustomer>
        </section>

        <hr className="my-8" />

        <section id="exercise-11">
          <h2 className="text-md font-semibold">Exercise 11</h2>

          <div className="my-4 text-sm">
            Write an SQL query to retrieve all customers from the customers table whose first name starts with MY or
            contains SE.
          </div>

          <TableCustomer customers={exercise11}></TableCustomer>
        </section>

        <hr className="my-8" />

        <section id="exercise-12">
          <h1 className="text-md font-semibold">Exercise 12</h1>

          <div className="my-4 text-sm">
            <p>Write an SQL query to retrieve all orders from the orders table that have not been shipped.</p>
          </div>

          <TableOrder orders={exercise12}></TableOrder>
        </section>

        <hr className="my-8" />

        <section id="exercise-13">
          <h2 className="text-md font-semibold">Exercise 13</h2>

          <div className="my-4 text-sm">
            <p>
              Write an SQL query to retrieve all items from the order_items table for order #6, where the total price is
              greater than 30.
            </p>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>order_id</TableHead>
                <TableHead>product_id</TableHead>
                <TableHead>quantity</TableHead>
                <TableHead>unit_price</TableHead>
                <TableHead>total_price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercise13.map((orderItem) => (
                <TableRow key={orderItem.orderId}>
                  <TableCell>{orderItem.orderId}</TableCell>
                  <TableCell>{orderItem.productId}</TableCell>
                  <TableCell>{orderItem.quantity}</TableCell>
                  <TableCell>{orderItem.unitPrice}</TableCell>
                  <TableCell>{orderItem.totalPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <hr className="my-8" />

        <section id="exercise-14">
          <h2 className="text-md font-semibold">Exercise 14</h2>

          <div className="my-4 text-sm">
            <p>
              Write an SQL query to retrieve the top three local customers based on a specific criteria, such as points.
            </p>
          </div>

          <TableCustomer customers={exercise14}></TableCustomer>
        </section>
      </main>
    </ViewTransition>
  );
}
