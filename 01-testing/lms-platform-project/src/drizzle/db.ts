import * as schema from "./schema";

import { env } from "@/data/env/server";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle({
  schema,
  connection: {
    host: env.DB_HOST,
    user: env.DB_USER,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
  },
});
