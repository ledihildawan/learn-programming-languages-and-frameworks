import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SystemLogsSource = t.Union(
  [
    t.Literal("HTTP"),
    t.Literal("SEEDER"),
    t.Literal("MIGRATION"),
    t.Literal("CLI"),
    t.Literal("CRON"),
    t.Literal("TEST"),
    t.Literal("WEBHOOK"),
    t.Literal("BATCH"),
  ],
  { additionalProperties: false },
);
