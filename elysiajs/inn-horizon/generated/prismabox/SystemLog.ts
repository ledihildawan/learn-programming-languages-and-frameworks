import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SystemLogPlain = t.Object(
  {
    id: t.String(),
    user_id: __nullable__(t.String()),
    actor_role: __nullable__(t.String()),
    action: t.String(),
    table_name: t.String(),
    record_id: __nullable__(t.String()),
    changes: __nullable__(t.Any()),
    old_data: __nullable__(t.Any()),
    new_data: __nullable__(t.Any()),
    duration_ms: t.Integer(),
    created_at: t.Date(),
    ip_address: __nullable__(t.String()),
    user_agent: __nullable__(t.String()),
    route: __nullable__(t.String()),
    status: t.String(),
    message: __nullable__(t.String()),
    metadata: __nullable__(t.Any()),
  },
  { additionalProperties: false },
);

export const SystemLogRelations = t.Object(
  {
    user: __nullable__(
      t.Object(
        {
          id: t.String(),
          role_id: t.String(),
          username: __nullable__(t.String()),
          email: t.String(),
          password_hash: t.String(),
          first_name: __nullable__(t.String()),
          last_name: __nullable__(t.String()),
          phone_number: __nullable__(t.String()),
          country_id: t.String(),
          profile_image_url: __nullable__(t.String()),
          is_active: __nullable__(t.Boolean()),
          is_verified: __nullable__(t.Boolean()),
          email_verified_at: __nullable__(t.Date()),
          created_at: t.Date(),
          updated_at: t.Date(),
          deleted_at: __nullable__(t.Date()),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const SystemLogPlainInputCreate = t.Object(
  {
    actor_role: t.Optional(__nullable__(t.String())),
    action: t.String(),
    table_name: t.String(),
    changes: t.Optional(__nullable__(t.Any())),
    old_data: t.Optional(__nullable__(t.Any())),
    new_data: t.Optional(__nullable__(t.Any())),
    duration_ms: t.Integer(),
    created_at: t.Optional(t.Date()),
    ip_address: t.Optional(__nullable__(t.String())),
    user_agent: t.Optional(__nullable__(t.String())),
    route: t.Optional(__nullable__(t.String())),
    status: t.String(),
    message: t.Optional(__nullable__(t.String())),
    metadata: t.Optional(__nullable__(t.Any())),
  },
  { additionalProperties: false },
);

export const SystemLogPlainInputUpdate = t.Object(
  {
    actor_role: t.Optional(__nullable__(t.String())),
    action: t.Optional(t.String()),
    table_name: t.Optional(t.String()),
    changes: t.Optional(__nullable__(t.Any())),
    old_data: t.Optional(__nullable__(t.Any())),
    new_data: t.Optional(__nullable__(t.Any())),
    duration_ms: t.Optional(t.Integer()),
    created_at: t.Optional(t.Date()),
    ip_address: t.Optional(__nullable__(t.String())),
    user_agent: t.Optional(__nullable__(t.String())),
    route: t.Optional(__nullable__(t.String())),
    status: t.Optional(t.String()),
    message: t.Optional(__nullable__(t.String())),
    metadata: t.Optional(__nullable__(t.Any())),
  },
  { additionalProperties: false },
);

export const SystemLogRelationsInputCreate = t.Object(
  {
    user: t.Optional(
      t.Object(
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
    ),
  },
  { additionalProperties: false },
);

export const SystemLogRelationsInputUpdate = t.Partial(
  t.Object(
    {
      user: t.Partial(
        t.Object(
          {
            connect: t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            disconnect: t.Boolean(),
          },
          { additionalProperties: false },
        ),
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
          actor_role: t.String(),
          action: t.String(),
          table_name: t.String(),
          record_id: t.String(),
          changes: t.Any(),
          old_data: t.Any(),
          new_data: t.Any(),
          duration_ms: t.Integer(),
          created_at: t.Date(),
          ip_address: t.String(),
          user_agent: t.String(),
          route: t.String(),
          status: t.String(),
          message: t.String(),
          metadata: t.Any(),
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
              actor_role: t.String(),
              action: t.String(),
              table_name: t.String(),
              record_id: t.String(),
              changes: t.Any(),
              old_data: t.Any(),
              new_data: t.Any(),
              duration_ms: t.Integer(),
              created_at: t.Date(),
              ip_address: t.String(),
              user_agent: t.String(),
              route: t.String(),
              status: t.String(),
              message: t.String(),
              metadata: t.Any(),
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
      user_id: t.Boolean(),
      user: t.Boolean(),
      actor_role: t.Boolean(),
      action: t.Boolean(),
      table_name: t.Boolean(),
      record_id: t.Boolean(),
      changes: t.Boolean(),
      old_data: t.Boolean(),
      new_data: t.Boolean(),
      duration_ms: t.Boolean(),
      created_at: t.Boolean(),
      ip_address: t.Boolean(),
      user_agent: t.Boolean(),
      route: t.Boolean(),
      status: t.Boolean(),
      message: t.Boolean(),
      metadata: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const SystemLogInclude = t.Partial(
  t.Object(
    { user: t.Boolean(), _count: t.Boolean() },
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
      actor_role: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      action: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      table_name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      record_id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      changes: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      old_data: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      new_data: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      duration_ms: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      created_at: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      ip_address: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      user_agent: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      route: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      status: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      message: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      metadata: t.Union([t.Literal("asc"), t.Literal("desc")], {
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
