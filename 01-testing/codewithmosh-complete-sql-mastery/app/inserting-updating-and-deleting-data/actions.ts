"use server";

// import { db } from "@/db"
// import * as schema from "@/db/schema"

export async function createCustomer(formData: FormData) {
  console.log(formData.get("firstName"));
  // await db.insert(schema.storeCustomersTable).values({});
}
