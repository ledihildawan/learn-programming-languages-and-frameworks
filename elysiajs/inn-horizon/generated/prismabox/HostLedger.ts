import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const HostLedgerPlain = t.Object(
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
);

export const HostLedgerRelations = t.Object(
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
    booking: __nullable__(
      t.Object(
        {
          id: t.String(),
          userId: t.String(),
          roomId: t.String(),
          checkIn: t.Date(),
          checkOut: t.Date(),
          bookingCode: t.String(),
          nights: t.Integer(),
          guests: t.Integer(),
          guestName: t.String(),
          guestPhone: t.String(),
          guestEmail: __nullable__(t.String()),
          guestNotes: __nullable__(t.String()),
          totalPrice: t.Number(),
          platformFee: t.Number(),
          hostPayout: t.Number(),
          status: t.Union(
            [
              t.Literal("PENDING"),
              t.Literal("PAID"),
              t.Literal("CONFIRMED"),
              t.Literal("CHECKED_IN"),
              t.Literal("CHECKED_OUT"),
              t.Literal("COMPLETED"),
              t.Literal("CANCELLED"),
              t.Literal("REFUNDED"),
              t.Literal("EXPIRED"),
            ],
            { additionalProperties: false },
          ),
          expiredAt: __nullable__(t.Date()),
          confirmedAt: __nullable__(t.Date()),
          checkedInAt: __nullable__(t.Date()),
          canceledAt: __nullable__(t.Date()),
          cancelReason: __nullable__(t.String()),
          canceledById: __nullable__(t.String()),
          roomSnapshot: t.Any(),
          isTest: t.Boolean(),
          paymentId: __nullable__(t.String()),
          deletedAt: __nullable__(t.Date()),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    ),
    payout: __nullable__(
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
          processedAt: __nullable__(t.Date()),
          note: __nullable__(t.String()),
          proofOfTransfer: __nullable__(t.String()),
          processorId: __nullable__(t.String()),
          deletedAt: __nullable__(t.Date()),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const HostLedgerPlainInputCreate = t.Object(
  {
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
  },
  { additionalProperties: false },
);

export const HostLedgerPlainInputUpdate = t.Object(
  {
    amount: t.Optional(t.Number()),
    type: t.Optional(
      t.Union(
        [
          t.Literal("INCOME_BOOKING"),
          t.Literal("PAYOUT_WITHDRAWAL"),
          t.Literal("REFUND_DEDUCTION"),
          t.Literal("PLATFORM_FEE_DEDUCTION"),
        ],
        { additionalProperties: false },
      ),
    ),
    description: t.Optional(t.String()),
    balanceAfter: t.Optional(t.Number()),
  },
  { additionalProperties: false },
);

export const HostLedgerRelationsInputCreate = t.Object(
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
    booking: t.Optional(
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
    payout: t.Optional(
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

export const HostLedgerRelationsInputUpdate = t.Partial(
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
      booking: t.Partial(
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
      payout: t.Partial(
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

export const HostLedgerWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          hostId: t.String(),
          bookingId: t.String(),
          payoutId: t.String(),
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
    { $id: "HostLedger" },
  ),
);

export const HostLedgerWhereUnique = t.Recursive(
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
              bookingId: t.String(),
              payoutId: t.String(),
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
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "HostLedger" },
);

export const HostLedgerSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      host: t.Boolean(),
      hostId: t.Boolean(),
      booking: t.Boolean(),
      bookingId: t.Boolean(),
      payout: t.Boolean(),
      payoutId: t.Boolean(),
      amount: t.Boolean(),
      type: t.Boolean(),
      description: t.Boolean(),
      balanceAfter: t.Boolean(),
      createdAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const HostLedgerInclude = t.Partial(
  t.Object(
    {
      host: t.Boolean(),
      booking: t.Boolean(),
      payout: t.Boolean(),
      type: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const HostLedgerOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      hostId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      bookingId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      payoutId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      amount: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      description: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      balanceAfter: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const HostLedger = t.Composite([HostLedgerPlain, HostLedgerRelations], {
  additionalProperties: false,
});

export const HostLedgerInputCreate = t.Composite(
  [HostLedgerPlainInputCreate, HostLedgerRelationsInputCreate],
  { additionalProperties: false },
);

export const HostLedgerInputUpdate = t.Composite(
  [HostLedgerPlainInputUpdate, HostLedgerRelationsInputUpdate],
  { additionalProperties: false },
);
