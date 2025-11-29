import { PrismaClient } from "../../generated/prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Create PostgreSQL connection pool
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
  await pool.end();
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  await pool.end();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  await pool.end();
  process.exit(0);
});
