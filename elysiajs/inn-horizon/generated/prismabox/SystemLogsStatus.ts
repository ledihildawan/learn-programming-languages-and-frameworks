import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SystemLogsStatus = t.Union(
  [t.Literal("SUCCESS"), t.Literal("FAILURE")],
  { additionalProperties: false },
);
