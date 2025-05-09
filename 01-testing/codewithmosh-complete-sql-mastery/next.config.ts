import type { NextConfig } from "next";
import { envConfig } from "./env/config";

envConfig();

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
    authInterrupts: true,
    viewTransition: true,
  },
};

export default nextConfig;
