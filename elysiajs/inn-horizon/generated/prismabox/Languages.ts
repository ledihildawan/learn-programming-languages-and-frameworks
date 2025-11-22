import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const LanguagesPlain = t.Object(
  {
    id: t.String(),
    code: t.String(),
    name: t.String(),
    created_at: __nullable__(t.Date()),
    updated_at: __nullable__(t.Date()),
    deleted_at: __nullable__(t.Date()),
  },
  { additionalProperties: false },
);

export const LanguagesRelations = t.Object({}, { additionalProperties: false });

export const LanguagesPlainInputCreate = t.Object(
  {
    code: t.String(),
    name: t.String(),
    created_at: t.Optional(__nullable__(t.Date())),
    deleted_at: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const LanguagesPlainInputUpdate = t.Object(
  {
    code: t.Optional(t.String()),
    name: t.Optional(t.String()),
    created_at: t.Optional(__nullable__(t.Date())),
    deleted_at: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const LanguagesRelationsInputCreate = t.Object(
  {},
  { additionalProperties: false },
);

export const LanguagesRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: false }),
);

export const LanguagesWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          code: t.String(),
          name: t.String(),
          created_at: t.Date(),
          updated_at: t.Date(),
          deleted_at: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Languages" },
  ),
);

export const LanguagesWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), code: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ code: t.String() })],
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
              code: t.String(),
              name: t.String(),
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
  { $id: "Languages" },
);

export const LanguagesSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      code: t.Boolean(),
      name: t.Boolean(),
      created_at: t.Boolean(),
      updated_at: t.Boolean(),
      deleted_at: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const LanguagesInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: false }),
);

export const LanguagesOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      code: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Languages = t.Composite([LanguagesPlain, LanguagesRelations], {
  additionalProperties: false,
});

export const LanguagesInputCreate = t.Composite(
  [LanguagesPlainInputCreate, LanguagesRelationsInputCreate],
  { additionalProperties: false },
);

export const LanguagesInputUpdate = t.Composite(
  [LanguagesPlainInputUpdate, LanguagesRelationsInputUpdate],
  { additionalProperties: false },
);
