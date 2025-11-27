import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const StatusType = t.Union(
  [
    t.Literal("BOOKING"),
    t.Literal("REVIEW"),
    t.Literal("REFUND"),
    t.Literal("PAYMENT"),
  ],
  { additionalProperties: false },
);
