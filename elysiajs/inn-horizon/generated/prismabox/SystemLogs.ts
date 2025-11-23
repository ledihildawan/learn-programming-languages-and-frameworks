import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SystemLogsPlain = t.Object(
  {
    id: t.String(),
    user_id: t.String(),
    action_type: t.String(),
    table_name: t.String(),
    record_id: t.String(),
    old_data: __nullable__(t.Any()),
    new_data: __nullable__(t.Any()),
    ip_address: __nullable__(t.String()),
    user_agent: __nullable__(t.String()),
    route_endpoint: __nullable__(t.String()),
    source: __nullable__(t.String()),
    message: __nullable__(t.String()),
    created_at: t.Date(),
  },
  { additionalProperties: false },
);

export const SystemLogsRelations = t.Object(
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

export const SystemLogsPlainInputCreate = t.Object(
  {
    action_type: t.String(),
    table_name: t.String(),
    old_data: t.Optional(__nullable__(t.Any())),
    new_data: t.Optional(__nullable__(t.Any())),
    ip_address: t.Optional(__nullable__(t.String())),
    user_agent: t.Optional(__nullable__(t.String())),
    route_endpoint: t.Optional(__nullable__(t.String())),
    source: t.Optional(__nullable__(t.String())),
    message: t.Optional(__nullable__(t.String())),
    created_at: t.Optional(t.Date()),
  },
  { additionalProperties: false },
);

export const SystemLogsPlainInputUpdate = t.Object(
  {
    action_type: t.Optional(t.String()),
    table_name: t.Optional(t.String()),
    old_data: t.Optional(__nullable__(t.Any())),
    new_data: t.Optional(__nullable__(t.Any())),
    ip_address: t.Optional(__nullable__(t.String())),
    user_agent: t.Optional(__nullable__(t.String())),
    route_endpoint: t.Optional(__nullable__(t.String())),
    source: t.Optional(__nullable__(t.String())),
    message: t.Optional(__nullable__(t.String())),
    created_at: t.Optional(t.Date()),
  },
  { additionalProperties: false },
);

export const SystemLogsRelationsInputCreate = t.Object(
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

export const SystemLogsRelationsInputUpdate = t.Partial(
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

export const SystemLogsWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          user_id: t.String(),
          action_type: t.String(),
          table_name: t.String(),
          record_id: t.String(),
          old_data: t.Any(),
          new_data: t.Any(),
          ip_address: t.String(),
          user_agent: t.String(),
          route_endpoint: t.String(),
          source: t.String(),
          message: t.String(),
          created_at: t.Date(),
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
              user_id: t.String(),
              action_type: t.String(),
              table_name: t.String(),
              record_id: t.String(),
              old_data: t.Any(),
              new_data: t.Any(),
              ip_address: t.String(),
              user_agent: t.String(),
              route_endpoint: t.String(),
              source: t.String(),
              message: t.String(),
              created_at: t.Date(),
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
      user: t.Boolean(),
      user_id: t.Boolean(),
      action_type: t.Boolean(),
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

export const SystemLogsInclude = t.Partial(
  t.Object(
    { user: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const SystemLogsOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      user_id: t.Union([t.Literal("asc"), t.Literal("desc")], {
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
      ip_address: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      user_agent: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      route_endpoint: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      source: t.Union([t.Literal("asc"), t.Literal("desc")], {
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
