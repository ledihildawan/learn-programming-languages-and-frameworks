import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const PayoutStatus = t.Union(
  [
    t.Literal("PENDING"),
    t.Literal("PROCESSING"),
    t.Literal("COMPLETED"),
    t.Literal("REJECTED"),
  ],
  { additionalProperties: false },
);
