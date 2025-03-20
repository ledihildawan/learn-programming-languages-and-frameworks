import { db } from ".";

async function reset() {
  console.log("⏳ Resetting database...");

  const start = Date.now();

  const schemas = ["store", "drizzle", "public", "invetory", "hr", "invoicing"];

  for (const schema of schemas) {
    await db.execute(`DROP SCHEMA IF EXISTS ${schema} CASCADE;`);
  }

  for (const schema of schemas) {
    await db.execute(`CREATE SCHEMA IF NOT EXISTS ${schema};`);
  }

  const end = Date.now();

  console.log(`✅ Reset completed in ${end - start}ms`);

  process.exit(0);
}

reset().catch((err) => {
  console.error("❌ Reset failed");
  console.error(err);

  process.exit(1);
});
