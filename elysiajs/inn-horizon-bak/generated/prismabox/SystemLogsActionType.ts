import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SystemLogsActionType = t.Union(
  [
    t.Literal("CREATE"),
    t.Literal("READ"),
    t.Literal("UPDATE"),
    t.Literal("EXECUTE"),
    t.Literal("DELETE"),
    t.Literal("RESTORE"),
  ],
  { additionalProperties: false },
);
