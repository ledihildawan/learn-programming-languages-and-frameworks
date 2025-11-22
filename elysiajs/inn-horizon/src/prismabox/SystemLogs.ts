import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SystemLogsPlain = t.Object(
  {
    id: t.String(),
    action_type: t.String(),
    table_name: t.String(),
    record_id: t.String(),
    old_data: t.Any(),
    new_data: t.Any(),
    createdAt: t.Date(),
  },
  { additionalProperties: false },
);

export const SystemLogsRelations = t.Object(
  {},
  { additionalProperties: false },
);

export const SystemLogsPlainInputCreate = t.Object(
  {
    action_type: t.String(),
    table_name: t.String(),
    old_data: t.Any(),
    new_data: t.Any(),
  },
  { additionalProperties: false },
);

export const SystemLogsPlainInputUpdate = t.Object(
  {
    action_type: t.Optional(t.String()),
    table_name: t.Optional(t.String()),
    old_data: t.Optional(t.Any()),
    new_data: t.Optional(t.Any()),
  },
  { additionalProperties: false },
);

export const SystemLogsRelationsInputCreate = t.Object(
  {},
  { additionalProperties: false },
);

export const SystemLogsRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: false }),
);

export const SystemLogsWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          action_type: t.String(),
          table_name: t.String(),
          record_id: t.String(),
          old_data: t.Any(),
          new_data: t.Any(),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "SystemLogs" },
  ),
);

export const SystemLogsWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.String() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.String() })], {
          additionalProperties: false,
        }),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.String(),
              action_type: t.String(),
              table_name: t.String(),
              record_id: t.String(),
              old_data: t.Any(),
              new_data: t.Any(),
              createdAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "SystemLogs" },
);

export const SystemLogsSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      action_type: t.Boolean(),
      table_name: t.Boolean(),
      record_id: t.Boolean(),
      old_data: t.Boolean(),
      new_data: t.Boolean(),
      createdAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const SystemLogsInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: false }),
);

export const SystemLogsOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      action_type: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      table_name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      record_id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      old_data: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      new_data: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const SystemLogs = t.Composite([SystemLogsPlain, SystemLogsRelations], {
  additionalProperties: false,
});

export const SystemLogsInputCreate = t.Composite(
  [SystemLogsPlainInputCreate, SystemLogsRelationsInputCreate],
  { additionalProperties: false },
);

export const SystemLogsInputUpdate = t.Composite(
  [SystemLogsPlainInputUpdate, SystemLogsRelationsInputUpdate],
  { additionalProperties: false },
);
