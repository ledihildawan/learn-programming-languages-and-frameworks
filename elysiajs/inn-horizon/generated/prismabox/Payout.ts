import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const PayoutPlain = t.Object(
  {
    id: t.String(),
    hostId: t.String(),
    amount: t.Number(),
    status: t.Union(
      [
        t.Literal("PENDING"),
        t.Literal("PROCESSING"),
        t.Literal("COMPLETED"),
        t.Literal("REJECTED"),
      ],
      { additionalProperties: false },
    ),
    payoutCode: t.String(),
    requestedAt: t.Date(),
    processedAt: __nullable__(t.Date()),
    note: __nullable__(t.String()),
    proofOfTransfer: __nullable__(t.String()),
    processorId: __nullable__(t.String()),
    deletedAt: __nullable__(t.Date()),
    createdAt: t.Date(),
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
        phone: t.String(),
        avatar: __nullable__(t.String()),
        isVerified: t.Boolean(),
        deletedAt: __nullable__(t.Date()),
        createdAt: t.Date(),
        updatedAt: t.Date(),
        bankName: __nullable__(t.String()),
        bankCode: __nullable__(t.String()),
        accountNumber: __nullable__(t.String()),
        accountName: __nullable__(t.String()),
        walletBalance: t.Number(),
      },
      { additionalProperties: false },
    ),
    processor: __nullable__(
      t.Object(
        {
          id: t.String(),
          role: t.Union(
            [t.Literal("ADMIN"), t.Literal("HOST"), t.Literal("CUSTOMER")],
            { additionalProperties: false },
          ),
          name: __nullable__(t.String()),
          email: t.String(),
          password: t.String(),
          phone: t.String(),
          avatar: __nullable__(t.String()),
          isVerified: t.Boolean(),
          deletedAt: __nullable__(t.Date()),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          bankName: __nullable__(t.String()),
          bankCode: __nullable__(t.String()),
          accountNumber: __nullable__(t.String()),
          accountName: __nullable__(t.String()),
          walletBalance: t.Number(),
        },
        { additionalProperties: false },
      ),
    ),
    ledgerEntries: t.Array(
      t.Object(
        {
          id: t.String(),
          hostId: t.String(),
          bookingId: __nullable__(t.String()),
          payoutId: __nullable__(t.String()),
          amount: t.Number(),
          type: t.Union(
            [
              t.Literal("INCOME_BOOKING"),
              t.Literal("PAYOUT_WITHDRAWAL"),
              t.Literal("REFUND_DEDUCTION"),
              t.Literal("PLATFORM_FEE_DEDUCTION"),
            ],
            { additionalProperties: false },
          ),
          description: t.String(),
          balanceAfter: t.Number(),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const PayoutPlainInputCreate = t.Object(
  {
    amount: t.Number(),
    status: t.Optional(
      t.Union(
        [
          t.Literal("PENDING"),
          t.Literal("PROCESSING"),
          t.Literal("COMPLETED"),
          t.Literal("REJECTED"),
        ],
        { additionalProperties: false },
      ),
    ),
    payoutCode: t.String(),
    requestedAt: t.Optional(t.Date()),
    processedAt: t.Optional(__nullable__(t.Date())),
    note: t.Optional(__nullable__(t.String())),
    proofOfTransfer: t.Optional(__nullable__(t.String())),
    deletedAt: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const PayoutPlainInputUpdate = t.Object(
  {
    amount: t.Optional(t.Number()),
    status: t.Optional(
      t.Union(
        [
          t.Literal("PENDING"),
          t.Literal("PROCESSING"),
          t.Literal("COMPLETED"),
          t.Literal("REJECTED"),
        ],
        { additionalProperties: false },
      ),
    ),
    payoutCode: t.Optional(t.String()),
    requestedAt: t.Optional(t.Date()),
    processedAt: t.Optional(__nullable__(t.Date())),
    note: t.Optional(__nullable__(t.String())),
    proofOfTransfer: t.Optional(__nullable__(t.String())),
    deletedAt: t.Optional(__nullable__(t.Date())),
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
    processor: t.Optional(
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
    ledgerEntries: t.Optional(
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
      processor: t.Partial(
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
      ledgerEntries: t.Partial(
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
          status: t.Union(
            [
              t.Literal("PENDING"),
              t.Literal("PROCESSING"),
              t.Literal("COMPLETED"),
              t.Literal("REJECTED"),
            ],
            { additionalProperties: false },
          ),
          payoutCode: t.String(),
          requestedAt: t.Date(),
          processedAt: t.Date(),
          note: t.String(),
          proofOfTransfer: t.String(),
          processorId: t.String(),
          deletedAt: t.Date(),
          createdAt: t.Date(),
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
          t.Object(
            { id: t.String(), payoutCode: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ payoutCode: t.String() })],
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
              hostId: t.String(),
              amount: t.Number(),
              status: t.Union(
                [
                  t.Literal("PENDING"),
                  t.Literal("PROCESSING"),
                  t.Literal("COMPLETED"),
                  t.Literal("REJECTED"),
                ],
                { additionalProperties: false },
              ),
              payoutCode: t.String(),
              requestedAt: t.Date(),
              processedAt: t.Date(),
              note: t.String(),
              proofOfTransfer: t.String(),
              processorId: t.String(),
              deletedAt: t.Date(),
              createdAt: t.Date(),
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
      host: t.Boolean(),
      hostId: t.Boolean(),
      amount: t.Boolean(),
      status: t.Boolean(),
      payoutCode: t.Boolean(),
      requestedAt: t.Boolean(),
      processedAt: t.Boolean(),
      note: t.Boolean(),
      proofOfTransfer: t.Boolean(),
      processor: t.Boolean(),
      processorId: t.Boolean(),
      ledgerEntries: t.Boolean(),
      deletedAt: t.Boolean(),
      createdAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const PayoutInclude = t.Partial(
  t.Object(
    {
      host: t.Boolean(),
      status: t.Boolean(),
      processor: t.Boolean(),
      ledgerEntries: t.Boolean(),
      _count: t.Boolean(),
    },
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
      payoutCode: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      requestedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      processedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      note: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      proofOfTransfer: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      processorId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      deletedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
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
