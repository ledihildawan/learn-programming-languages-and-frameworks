import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const RoleName = t.Union(
  [
    t.Literal("Admin"),
    t.Literal("Host"),
    t.Literal("Customer"),
    t.Literal("System"),
  ],
  { additionalProperties: false },
);
