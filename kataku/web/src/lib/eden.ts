import { env } from "@/env/client";
import { treaty } from "@elysiajs/eden";
import { App } from "@server/index";

export const eden = treaty<App>(env.NEXT_PUBLIC_SERVER_URL, {
  fetch: { credentials: "include" },
});
