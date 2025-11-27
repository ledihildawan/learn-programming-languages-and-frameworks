import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const PaymentProvider = t.Union(
  [t.Literal("MIDTRANS"), t.Literal("XENDIT"), t.Literal("MANUAL")],
  { additionalProperties: false },
);
