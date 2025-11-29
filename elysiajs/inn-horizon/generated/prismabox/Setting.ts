import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SettingPlain = t.Object(
  { key: t.String(), value: t.Any() },
  { additionalProperties: false },
);

export const SettingRelations = t.Object({}, { additionalProperties: false });

export const SettingPlainInputCreate = t.Object(
  { value: t.Any() },
  { additionalProperties: false },
);

export const SettingPlainInputUpdate = t.Object(
  { value: t.Optional(t.Any()) },
  { additionalProperties: false },
);

export const SettingRelationsInputCreate = t.Object(
  {},
  { additionalProperties: false },
);

export const SettingRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: false }),
);

export const SettingWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          key: t.String(),
          value: t.Any(),
        },
        { additionalProperties: false },
      ),
    { $id: "Setting" },
  ),
);

export const SettingWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ key: t.String() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ key: t.String() })], {
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
            { key: t.String(), value: t.Any() },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Setting" },
);

export const SettingSelect = t.Partial(
  t.Object(
    { key: t.Boolean(), value: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const SettingInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: false }),
);

export const SettingOrderBy = t.Partial(
  t.Object(
    {
      key: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      value: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Setting = t.Composite([SettingPlain, SettingRelations], {
  additionalProperties: false,
});

export const SettingInputCreate = t.Composite(
  [SettingPlainInputCreate, SettingRelationsInputCreate],
  { additionalProperties: false },
);

export const SettingInputUpdate = t.Composite(
  [SettingPlainInputUpdate, SettingRelationsInputUpdate],
  { additionalProperties: false },
);
