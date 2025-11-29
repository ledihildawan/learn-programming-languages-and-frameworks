import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const LedgerType = t.Union(
  [
    t.Literal("INCOME_BOOKING"),
    t.Literal("PAYOUT_WITHDRAWAL"),
    t.Literal("REFUND_DEDUCTION"),
    t.Literal("PLATFORM_FEE_DEDUCTION"),
  ],
  { additionalProperties: false },
);
