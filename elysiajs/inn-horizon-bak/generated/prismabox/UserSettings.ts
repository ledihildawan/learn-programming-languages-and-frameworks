import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const UserSettingsPlain = t.Object(
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
);

export const UserSettingsRelations = t.Object(
  {
    user: t.Object(
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
  },
  { additionalProperties: false },
);

export const UserSettingsPlainInputCreate = t.Object(
  {
    timezone: t.Optional(t.String()),
    locale: t.Optional(t.String()),
    currency: t.Optional(t.String()),
    theme: t.Optional(t.String()),
    date_format: t.Optional(t.String()),
    time_format: t.Optional(t.String()),
    email_notifications: t.Optional(t.Boolean()),
    push_notifications: t.Optional(t.Boolean()),
    marketing_emails: t.Optional(t.Boolean()),
    metadata: t.Optional(__nullable__(t.Any())),
    created_at: t.Optional(t.Date()),
  },
  { additionalProperties: false },
);

export const UserSettingsPlainInputUpdate = t.Object(
  {
    timezone: t.Optional(t.String()),
    locale: t.Optional(t.String()),
    currency: t.Optional(t.String()),
    theme: t.Optional(t.String()),
    date_format: t.Optional(t.String()),
    time_format: t.Optional(t.String()),
    email_notifications: t.Optional(t.Boolean()),
    push_notifications: t.Optional(t.Boolean()),
    marketing_emails: t.Optional(t.Boolean()),
    metadata: t.Optional(__nullable__(t.Any())),
    created_at: t.Optional(t.Date()),
  },
  { additionalProperties: false },
);

export const UserSettingsRelationsInputCreate = t.Object(
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

export const UserSettingsRelationsInputUpdate = t.Partial(
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

export const UserSettingsWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
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
          metadata: t.Any(),
          created_at: t.Date(),
          updated_at: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "UserSettings" },
  ),
);

export const UserSettingsWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ user_id: t.String() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ user_id: t.String() })], {
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
              metadata: t.Any(),
              created_at: t.Date(),
              updated_at: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "UserSettings" },
);

export const UserSettingsSelect = t.Partial(
  t.Object(
    {
      user_id: t.Boolean(),
      user: t.Boolean(),
      timezone: t.Boolean(),
      locale: t.Boolean(),
      currency: t.Boolean(),
      theme: t.Boolean(),
      date_format: t.Boolean(),
      time_format: t.Boolean(),
      email_notifications: t.Boolean(),
      push_notifications: t.Boolean(),
      marketing_emails: t.Boolean(),
      metadata: t.Boolean(),
      created_at: t.Boolean(),
      updated_at: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const UserSettingsInclude = t.Partial(
  t.Object(
    { user: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const UserSettingsOrderBy = t.Partial(
  t.Object(
    {
      user_id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      timezone: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      locale: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      currency: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      theme: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      date_format: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      time_format: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      email_notifications: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      push_notifications: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      marketing_emails: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      metadata: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      created_at: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updated_at: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const UserSettings = t.Composite(
  [UserSettingsPlain, UserSettingsRelations],
  { additionalProperties: false },
);

export const UserSettingsInputCreate = t.Composite(
  [UserSettingsPlainInputCreate, UserSettingsRelationsInputCreate],
  { additionalProperties: false },
);

export const UserSettingsInputUpdate = t.Composite(
  [UserSettingsPlainInputUpdate, UserSettingsRelationsInputUpdate],
  { additionalProperties: false },
);
