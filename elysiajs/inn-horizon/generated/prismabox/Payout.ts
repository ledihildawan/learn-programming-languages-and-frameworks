import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const PayoutPlain = t.Object(
  {
    id: t.String(),
    hostId: t.String(),
    amount: t.Number(),
    bankName: t.String(),
    accountNo: t.String(),
    accountName: t.String(),
    status: t.String(),
    requestedAt: t.Date(),
    processedAt: __nullable__(t.Date()),
  },
  { additionalProperties: false },
);

export const PayoutRelations = t.Object(
  {
    host: t.Object(
      {
        id: t.String(),
        role: t.Union(
          [t.Literal("ADMIN"), t.Literal("HOST"), t.Literal("CUSTOMER")],
          { additionalProperties: false },
        ),
        name: __nullable__(t.String()),
        email: t.String(),
        password: t.String(),
        phone: __nullable__(t.String()),
        avatar: __nullable__(t.String()),
        isVerified: t.Boolean(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const PayoutPlainInputCreate = t.Object(
  {
    amount: t.Number(),
    bankName: t.String(),
    accountNo: t.String(),
    accountName: t.String(),
    status: t.Optional(t.String()),
    requestedAt: t.Optional(t.Date()),
    processedAt: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const PayoutPlainInputUpdate = t.Object(
  {
    amount: t.Optional(t.Number()),
    bankName: t.Optional(t.String()),
    accountNo: t.Optional(t.String()),
    accountName: t.Optional(t.String()),
    status: t.Optional(t.String()),
    requestedAt: t.Optional(t.Date()),
    processedAt: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const PayoutRelationsInputCreate = t.Object(
  {
    host: t.Object(
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

export const PayoutRelationsInputUpdate = t.Partial(
  t.Object(
    {
      host: t.Object(
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

export const PayoutWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          hostId: t.String(),
          amount: t.Number(),
          bankName: t.String(),
          accountNo: t.String(),
          accountName: t.String(),
          status: t.String(),
          requestedAt: t.Date(),
          processedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Payout" },
  ),
);

export const PayoutWhereUnique = t.Recursive(
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
              hostId: t.String(),
              amount: t.Number(),
              bankName: t.String(),
              accountNo: t.String(),
              accountName: t.String(),
              status: t.String(),
              requestedAt: t.Date(),
              processedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Payout" },
);

export const PayoutSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      hostId: t.Boolean(),
      host: t.Boolean(),
      amount: t.Boolean(),
      bankName: t.Boolean(),
      accountNo: t.Boolean(),
      accountName: t.Boolean(),
      status: t.Boolean(),
      requestedAt: t.Boolean(),
      processedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const PayoutInclude = t.Partial(
  t.Object(
    { host: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const PayoutOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      hostId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      amount: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      bankName: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      accountNo: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      accountName: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      status: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      requestedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      processedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Payout = t.Composite([PayoutPlain, PayoutRelations], {
  additionalProperties: false,
});

export const PayoutInputCreate = t.Composite(
  [PayoutPlainInputCreate, PayoutRelationsInputCreate],
  { additionalProperties: false },
);

export const PayoutInputUpdate = t.Composite(
  [PayoutPlainInputUpdate, PayoutRelationsInputUpdate],
  { additionalProperties: false },
);
