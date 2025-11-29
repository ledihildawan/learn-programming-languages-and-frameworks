import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const BookingStatus = t.Union(
  [
    t.Literal("PENDING"),
    t.Literal("PAID"),
    t.Literal("CONFIRMED"),
    t.Literal("CHECKED_IN"),
    t.Literal("CHECKED_OUT"),
    t.Literal("COMPLETED"),
    t.Literal("CANCELLED"),
    t.Literal("REFUNDED"),
    t.Literal("EXPIRED"),
  ],
  { additionalProperties: false },
);
