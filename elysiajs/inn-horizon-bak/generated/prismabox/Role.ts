import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const RolePlain = t.Object(
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
);

export const RoleRelations = t.Object(
  {
    users: t.Array(
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
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const RolePlainInputCreate = t.Object(
  {
    name: t.Union(
      [
        t.Literal("Admin"),
        t.Literal("Host"),
        t.Literal("Customer"),
        t.Literal("System"),
      ],
      { additionalProperties: false },
    ),
    created_at: t.Optional(t.Date()),
    deleted_at: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const RolePlainInputUpdate = t.Object(
  {
    name: t.Optional(
      t.Union(
        [
          t.Literal("Admin"),
          t.Literal("Host"),
          t.Literal("Customer"),
          t.Literal("System"),
        ],
        { additionalProperties: false },
      ),
    ),
    created_at: t.Optional(t.Date()),
    deleted_at: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const RoleRelationsInputCreate = t.Object(
  {
    users: t.Optional(
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

export const RoleRelationsInputUpdate = t.Partial(
  t.Object(
    {
      users: t.Partial(
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

export const RoleWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
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
          deleted_at: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Role" },
  ),
);

export const RoleWhereUnique = t.Recursive(
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
              deleted_at: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Role" },
);

export const RoleSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      created_at: t.Boolean(),
      updated_at: t.Boolean(),
      deleted_at: t.Boolean(),
      users: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const RoleInclude = t.Partial(
  t.Object(
    { name: t.Boolean(), users: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const RoleOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Role = t.Composite([RolePlain, RoleRelations], {
  additionalProperties: false,
});

export const RoleInputCreate = t.Composite(
  [RolePlainInputCreate, RoleRelationsInputCreate],
  { additionalProperties: false },
);

export const RoleInputUpdate = t.Composite(
  [RolePlainInputUpdate, RoleRelationsInputUpdate],
  { additionalProperties: false },
);
