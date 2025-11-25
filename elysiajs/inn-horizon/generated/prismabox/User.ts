import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const UserPlain = t.Object(
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
);

export const UserRelations = t.Object(
  {
    role: t.Object(
      {
        id: t.String(),
        name: t.Union(
          [
            t.Literal("Admin"),
            t.Literal("Host"),
            t.Literal("Customer"),
            t.Literal("System"),
          ],
          { additionalProperties: false },
        ),
        created_at: t.Date(),
        updated_at: t.Date(),
        deleted_at: __nullable__(t.Date()),
      },
      { additionalProperties: false },
    ),
    country: t.Object(
      {
        id: t.String(),
        name: t.String(),
        code: t.String(),
        created_at: t.Date(),
        updated_at: t.Date(),
        deleted_at: __nullable__(t.Date()),
      },
      { additionalProperties: false },
    ),
    systemLogs: t.Array(
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
      ),
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const UserPlainInputCreate = t.Object(
  {
    username: t.String(),
    email: t.String(),
    password_hash: t.String(),
    first_name: t.Optional(__nullable__(t.String())),
    last_name: t.Optional(__nullable__(t.String())),
    phone_number: t.Optional(__nullable__(t.String())),
    profile_image_url: t.Optional(__nullable__(t.String())),
    created_at: t.Optional(t.Date()),
    deleted_at: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const UserPlainInputUpdate = t.Object(
  {
    username: t.Optional(t.String()),
    email: t.Optional(t.String()),
    password_hash: t.Optional(t.String()),
    first_name: t.Optional(__nullable__(t.String())),
    last_name: t.Optional(__nullable__(t.String())),
    phone_number: t.Optional(__nullable__(t.String())),
    profile_image_url: t.Optional(__nullable__(t.String())),
    created_at: t.Optional(t.Date()),
    deleted_at: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const UserRelationsInputCreate = t.Object(
  {
    role: t.Object(
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
    country: t.Object(
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
    systemLogs: t.Optional(
      t.Object(
        {
          connect: t.Array(
            t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const UserRelationsInputUpdate = t.Partial(
  t.Object(
    {
      role: t.Object(
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
      country: t.Object(
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
      systemLogs: t.Partial(
        t.Object(
          {
            connect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
            disconnect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
          },
          { additionalProperties: false },
        ),
      ),
    },
    { additionalProperties: false },
  ),
);

export const UserWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          role_id: t.String(),
          username: t.String(),
          email: t.String(),
          password_hash: t.String(),
          first_name: t.String(),
          last_name: t.String(),
          phone_number: t.String(),
          country_id: t.String(),
          profile_image_url: t.String(),
          created_at: t.Date(),
          updated_at: t.Date(),
          deleted_at: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "User" },
  ),
);

export const UserWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), username: t.String(), email: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [
            t.Object({ id: t.String() }),
            t.Object({ username: t.String() }),
            t.Object({ email: t.String() }),
          ],
          { additionalProperties: false },
        ),
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
              role_id: t.String(),
              username: t.String(),
              email: t.String(),
              password_hash: t.String(),
              first_name: t.String(),
              last_name: t.String(),
              phone_number: t.String(),
              country_id: t.String(),
              profile_image_url: t.String(),
              created_at: t.Date(),
              updated_at: t.Date(),
              deleted_at: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "User" },
);

export const UserSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      role: t.Boolean(),
      role_id: t.Boolean(),
      username: t.Boolean(),
      email: t.Boolean(),
      password_hash: t.Boolean(),
      first_name: t.Boolean(),
      last_name: t.Boolean(),
      phone_number: t.Boolean(),
      country: t.Boolean(),
      country_id: t.Boolean(),
      profile_image_url: t.Boolean(),
      created_at: t.Boolean(),
      updated_at: t.Boolean(),
      deleted_at: t.Boolean(),
      systemLogs: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const UserInclude = t.Partial(
  t.Object(
    {
      role: t.Boolean(),
      country: t.Boolean(),
      systemLogs: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const UserOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      role_id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      username: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      email: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      password_hash: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      first_name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      last_name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      phone_number: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      country_id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      profile_image_url: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      created_at: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updated_at: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      deleted_at: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const User = t.Composite([UserPlain, UserRelations], {
  additionalProperties: false,
});

export const UserInputCreate = t.Composite(
  [UserPlainInputCreate, UserRelationsInputCreate],
  { additionalProperties: false },
);

export const UserInputUpdate = t.Composite(
  [UserPlainInputUpdate, UserRelationsInputUpdate],
  { additionalProperties: false },
);
