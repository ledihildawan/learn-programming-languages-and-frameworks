import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const UserPlain = t.Object(
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
    userSettings: __nullable__(
      t.Object(
        {
          user_id: t.String(),
          timezone: t.String(),
          locale: t.String(),
          currency: t.String(),
          theme: t.String(),
          date_format: t.String(),
          time_format: t.String(),
          email_notifications: t.Boolean(),
          push_notifications: t.Boolean(),
          marketing_emails: t.Boolean(),
          metadata: __nullable__(t.Any()),
          created_at: t.Date(),
          updated_at: t.Date(),
        },
        { additionalProperties: false },
      ),
    ),
    systemLogs: t.Array(
      t.Object(
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
      ),
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const UserPlainInputCreate = t.Object(
  {
    username: t.Optional(__nullable__(t.String())),
    email: t.String(),
    password_hash: t.String(),
    first_name: t.Optional(__nullable__(t.String())),
    last_name: t.Optional(__nullable__(t.String())),
    phone_number: t.Optional(__nullable__(t.String())),
    profile_image_url: t.Optional(__nullable__(t.String())),
    is_active: t.Optional(__nullable__(t.Boolean())),
    is_verified: t.Optional(__nullable__(t.Boolean())),
    email_verified_at: t.Optional(__nullable__(t.Date())),
    created_at: t.Optional(t.Date()),
    deleted_at: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const UserPlainInputUpdate = t.Object(
  {
    username: t.Optional(__nullable__(t.String())),
    email: t.Optional(t.String()),
    password_hash: t.Optional(t.String()),
    first_name: t.Optional(__nullable__(t.String())),
    last_name: t.Optional(__nullable__(t.String())),
    phone_number: t.Optional(__nullable__(t.String())),
    profile_image_url: t.Optional(__nullable__(t.String())),
    is_active: t.Optional(__nullable__(t.Boolean())),
    is_verified: t.Optional(__nullable__(t.Boolean())),
    email_verified_at: t.Optional(__nullable__(t.Date())),
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
    userSettings: t.Optional(
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
      userSettings: t.Partial(
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
          is_active: t.Boolean(),
          is_verified: t.Boolean(),
          email_verified_at: t.Date(),
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
              is_active: t.Boolean(),
              is_verified: t.Boolean(),
              email_verified_at: t.Date(),
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
      role_id: t.Boolean(),
      role: t.Boolean(),
      username: t.Boolean(),
      email: t.Boolean(),
      password_hash: t.Boolean(),
      first_name: t.Boolean(),
      last_name: t.Boolean(),
      phone_number: t.Boolean(),
      country_id: t.Boolean(),
      country: t.Boolean(),
      profile_image_url: t.Boolean(),
      is_active: t.Boolean(),
      is_verified: t.Boolean(),
      email_verified_at: t.Boolean(),
      created_at: t.Boolean(),
      updated_at: t.Boolean(),
      deleted_at: t.Boolean(),
      userSettings: t.Boolean(),
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
      userSettings: t.Boolean(),
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
      is_active: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      is_verified: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      email_verified_at: t.Union([t.Literal("asc"), t.Literal("desc")], {
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
