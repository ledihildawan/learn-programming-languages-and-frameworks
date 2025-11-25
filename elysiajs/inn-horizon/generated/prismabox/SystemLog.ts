import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SystemLogPlain = t.Object(
  {
    id: t.String(),
    user_id: t.String(),
    action_type: t.Union(
      [
        t.Literal("CREATE"),
        t.Literal("UPDATE"),
        t.Literal("EXECUTE"),
        t.Literal("DELETE"),
      ],
      { additionalProperties: false },
    ),
    status: t.Union([t.Literal("SUCCESS"), t.Literal("FAILURE")], {
      additionalProperties: false,
    }),
    duration_ms: t.Integer(),
    table_name: t.String(),
    record_id: __nullable__(t.String()),
    old_data: __nullable__(t.Any()),
    new_data: __nullable__(t.Any()),
    ip_address: __nullable__(t.String()),
    user_agent: __nullable__(t.String()),
    route_endpoint: __nullable__(t.String()),
    source: t.Union(
      [
        t.Literal("HTTP"),
        t.Literal("SEEDER"),
        t.Literal("MIGRATION"),
        t.Literal("CLI"),
        t.Literal("CRON"),
        t.Literal("TEST"),
      ],
      { additionalProperties: false },
    ),
    message: __nullable__(t.String()),
    created_at: t.Date(),
  },
  { additionalProperties: false },
);

export const SystemLogRelations = t.Object(
  {
    user: t.Object(
      {
        id: t.String(),
        role_id: t.String(),
        username: t.String(),
        email: t.String(),
        password_hash: t.String(),
        first_name: __nullable__(t.String()),
        last_name: __nullable__(t.String()),
        phone_number: __nullable__(t.String()),
        country_id: t.String(),
        profile_image_url: __nullable__(t.String()),
        created_at: t.Date(),
        updated_at: t.Date(),
        deleted_at: __nullable__(t.Date()),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const SystemLogPlainInputCreate = t.Object(
  {
    action_type: t.Union(
      [
        t.Literal("CREATE"),
        t.Literal("UPDATE"),
        t.Literal("EXECUTE"),
        t.Literal("DELETE"),
      ],
      { additionalProperties: false },
    ),
    status: t.Union([t.Literal("SUCCESS"), t.Literal("FAILURE")], {
      additionalProperties: false,
    }),
    duration_ms: t.Integer(),
    table_name: t.String(),
    old_data: t.Optional(__nullable__(t.Any())),
    new_data: t.Optional(__nullable__(t.Any())),
    ip_address: t.Optional(__nullable__(t.String())),
    user_agent: t.Optional(__nullable__(t.String())),
    route_endpoint: t.Optional(__nullable__(t.String())),
    source: t.Union(
      [
        t.Literal("HTTP"),
        t.Literal("SEEDER"),
        t.Literal("MIGRATION"),
        t.Literal("CLI"),
        t.Literal("CRON"),
        t.Literal("TEST"),
      ],
      { additionalProperties: false },
    ),
    message: t.Optional(__nullable__(t.String())),
    created_at: t.Optional(t.Date()),
  },
  { additionalProperties: false },
);

export const SystemLogPlainInputUpdate = t.Object(
  {
    action_type: t.Optional(
      t.Union(
        [
          t.Literal("CREATE"),
          t.Literal("UPDATE"),
          t.Literal("EXECUTE"),
          t.Literal("DELETE"),
        ],
        { additionalProperties: false },
      ),
    ),
    status: t.Optional(
      t.Union([t.Literal("SUCCESS"), t.Literal("FAILURE")], {
        additionalProperties: false,
      }),
    ),
    duration_ms: t.Optional(t.Integer()),
    table_name: t.Optional(t.String()),
    old_data: t.Optional(__nullable__(t.Any())),
    new_data: t.Optional(__nullable__(t.Any())),
    ip_address: t.Optional(__nullable__(t.String())),
    user_agent: t.Optional(__nullable__(t.String())),
    route_endpoint: t.Optional(__nullable__(t.String())),
    source: t.Optional(
      t.Union(
        [
          t.Literal("HTTP"),
          t.Literal("SEEDER"),
          t.Literal("MIGRATION"),
          t.Literal("CLI"),
          t.Literal("CRON"),
          t.Literal("TEST"),
        ],
        { additionalProperties: false },
      ),
    ),
    message: t.Optional(__nullable__(t.String())),
    created_at: t.Optional(t.Date()),
  },
  { additionalProperties: false },
);

export const SystemLogRelationsInputCreate = t.Object(
  {
    user: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const SystemLogRelationsInputUpdate = t.Partial(
  t.Object(
    {
      user: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    },
    { additionalProperties: false },
  ),
);

export const SystemLogWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          user_id: t.String(),
          action_type: t.Union(
            [
              t.Literal("CREATE"),
              t.Literal("UPDATE"),
              t.Literal("EXECUTE"),
              t.Literal("DELETE"),
            ],
            { additionalProperties: false },
          ),
          status: t.Union([t.Literal("SUCCESS"), t.Literal("FAILURE")], {
            additionalProperties: false,
          }),
          duration_ms: t.Integer(),
          table_name: t.String(),
          record_id: t.String(),
          old_data: t.Any(),
          new_data: t.Any(),
          ip_address: t.String(),
          user_agent: t.String(),
          route_endpoint: t.String(),
          source: t.Union(
            [
              t.Literal("HTTP"),
              t.Literal("SEEDER"),
              t.Literal("MIGRATION"),
              t.Literal("CLI"),
              t.Literal("CRON"),
              t.Literal("TEST"),
            ],
            { additionalProperties: false },
          ),
          message: t.String(),
          created_at: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "SystemLog" },
  ),
);

export const SystemLogWhereUnique = t.Recursive(
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
              user_id: t.String(),
              action_type: t.Union(
                [
                  t.Literal("CREATE"),
                  t.Literal("UPDATE"),
                  t.Literal("EXECUTE"),
                  t.Literal("DELETE"),
                ],
                { additionalProperties: false },
              ),
              status: t.Union([t.Literal("SUCCESS"), t.Literal("FAILURE")], {
                additionalProperties: false,
              }),
              duration_ms: t.Integer(),
              table_name: t.String(),
              record_id: t.String(),
              old_data: t.Any(),
              new_data: t.Any(),
              ip_address: t.String(),
              user_agent: t.String(),
              route_endpoint: t.String(),
              source: t.Union(
                [
                  t.Literal("HTTP"),
                  t.Literal("SEEDER"),
                  t.Literal("MIGRATION"),
                  t.Literal("CLI"),
                  t.Literal("CRON"),
                  t.Literal("TEST"),
                ],
                { additionalProperties: false },
              ),
              message: t.String(),
              created_at: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "SystemLog" },
);

export const SystemLogSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      user: t.Boolean(),
      user_id: t.Boolean(),
      action_type: t.Boolean(),
      status: t.Boolean(),
      duration_ms: t.Boolean(),
      table_name: t.Boolean(),
      record_id: t.Boolean(),
      old_data: t.Boolean(),
      new_data: t.Boolean(),
      ip_address: t.Boolean(),
      user_agent: t.Boolean(),
      route_endpoint: t.Boolean(),
      source: t.Boolean(),
      message: t.Boolean(),
      created_at: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const SystemLogInclude = t.Partial(
  t.Object(
    {
      user: t.Boolean(),
      action_type: t.Boolean(),
      status: t.Boolean(),
      source: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const SystemLogOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      user_id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      duration_ms: t.Union([t.Literal("asc"), t.Literal("desc")], {
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
      ip_address: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      user_agent: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      route_endpoint: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      message: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      created_at: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const SystemLog = t.Composite([SystemLogPlain, SystemLogRelations], {
  additionalProperties: false,
});

export const SystemLogInputCreate = t.Composite(
  [SystemLogPlainInputCreate, SystemLogRelationsInputCreate],
  { additionalProperties: false },
);

export const SystemLogInputUpdate = t.Composite(
  [SystemLogPlainInputUpdate, SystemLogRelationsInputUpdate],
  { additionalProperties: false },
);
