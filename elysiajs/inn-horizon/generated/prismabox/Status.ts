import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const StatusPlain = t.Object(
  {
    id: t.String(),
    name: t.String(),
    type: t.Union(
      [
        t.Literal("BOOKING"),
        t.Literal("REVIEW"),
        t.Literal("REFUND"),
        t.Literal("PAYMENT"),
      ],
      { additionalProperties: false },
    ),
    created_at: t.Date(),
    updated_at: t.Date(),
    deleted_at: __nullable__(t.Date()),
  },
  { additionalProperties: false },
);

export const StatusRelations = t.Object({}, { additionalProperties: false });

export const StatusPlainInputCreate = t.Object(
  {
    name: t.String(),
    type: t.Union(
      [
        t.Literal("BOOKING"),
        t.Literal("REVIEW"),
        t.Literal("REFUND"),
        t.Literal("PAYMENT"),
      ],
      { additionalProperties: false },
    ),
    created_at: t.Optional(t.Date()),
    deleted_at: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const StatusPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    type: t.Optional(
      t.Union(
        [
          t.Literal("BOOKING"),
          t.Literal("REVIEW"),
          t.Literal("REFUND"),
          t.Literal("PAYMENT"),
        ],
        { additionalProperties: false },
      ),
    ),
    created_at: t.Optional(t.Date()),
    deleted_at: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const StatusRelationsInputCreate = t.Object(
  {},
  { additionalProperties: false },
);

export const StatusRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: false }),
);

export const StatusWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          name: t.String(),
          type: t.Union(
            [
              t.Literal("BOOKING"),
              t.Literal("REVIEW"),
              t.Literal("REFUND"),
              t.Literal("PAYMENT"),
            ],
            { additionalProperties: false },
          ),
          created_at: t.Date(),
          updated_at: t.Date(),
          deleted_at: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Status" },
  ),
);

export const StatusWhereUnique = t.Recursive(
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
              name: t.String(),
              type: t.Union(
                [
                  t.Literal("BOOKING"),
                  t.Literal("REVIEW"),
                  t.Literal("REFUND"),
                  t.Literal("PAYMENT"),
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
  { $id: "Status" },
);

export const StatusSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      type: t.Boolean(),
      created_at: t.Boolean(),
      updated_at: t.Boolean(),
      deleted_at: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const StatusInclude = t.Partial(
  t.Object(
    { type: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const StatusOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Status = t.Composite([StatusPlain, StatusRelations], {
  additionalProperties: false,
});

export const StatusInputCreate = t.Composite(
  [StatusPlainInputCreate, StatusRelationsInputCreate],
  { additionalProperties: false },
);

export const StatusInputUpdate = t.Composite(
  [StatusPlainInputUpdate, StatusRelationsInputUpdate],
  { additionalProperties: false },
);
