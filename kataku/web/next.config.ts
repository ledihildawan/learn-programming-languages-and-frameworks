import createJiti from "jiti";
import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti@^1 we can import .ts files :)
jiti("./src/env/client.ts");
jiti("./src/env/server.ts");

const nextConfig: NextConfig = {};

export default nextConfig;
