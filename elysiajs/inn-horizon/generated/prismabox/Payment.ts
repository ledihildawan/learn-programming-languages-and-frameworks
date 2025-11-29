import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const PaymentPlain = t.Object(
  {
    id: t.String(),
    bookingId: t.String(),
    amount: t.Number(),
    provider: t.Union([t.Literal("MIDTRANS"), t.Literal("MANUAL")], {
      additionalProperties: false,
    }),
    providerRef: __nullable__(t.String()),
    status: t.Union(
      [
        t.Literal("PENDING"),
        t.Literal("SETTLED"),
        t.Literal("FAILED"),
        t.Literal("EXPIRED"),
        t.Literal("REFUNDED"),
      ],
      { additionalProperties: false },
    ),
    snapToken: __nullable__(t.String()),
    paymentUrl: __nullable__(t.String()),
    paidAt: __nullable__(t.Date()),
    expiredAt: __nullable__(t.Date()),
    failureReason: __nullable__(t.String()),
    isTest: t.Boolean(),
    deletedAt: __nullable__(t.Date()),
    createdAt: t.Date(),
  },
  { additionalProperties: false },
);

export const PaymentRelations = t.Object(
  {
    booking: t.Object(
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
  },
  { additionalProperties: false },
);

export const PaymentPlainInputCreate = t.Object(
  {
    amount: t.Number(),
    provider: t.Union([t.Literal("MIDTRANS"), t.Literal("MANUAL")], {
      additionalProperties: false,
    }),
    providerRef: t.Optional(__nullable__(t.String())),
    status: t.Optional(
      t.Union(
        [
          t.Literal("PENDING"),
          t.Literal("SETTLED"),
          t.Literal("FAILED"),
          t.Literal("EXPIRED"),
          t.Literal("REFUNDED"),
        ],
        { additionalProperties: false },
      ),
    ),
    snapToken: t.Optional(__nullable__(t.String())),
    paymentUrl: t.Optional(__nullable__(t.String())),
    paidAt: t.Optional(__nullable__(t.Date())),
    expiredAt: t.Optional(__nullable__(t.Date())),
    failureReason: t.Optional(__nullable__(t.String())),
    isTest: t.Optional(t.Boolean()),
    deletedAt: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const PaymentPlainInputUpdate = t.Object(
  {
    amount: t.Optional(t.Number()),
    provider: t.Optional(
      t.Union([t.Literal("MIDTRANS"), t.Literal("MANUAL")], {
        additionalProperties: false,
      }),
    ),
    providerRef: t.Optional(__nullable__(t.String())),
    status: t.Optional(
      t.Union(
        [
          t.Literal("PENDING"),
          t.Literal("SETTLED"),
          t.Literal("FAILED"),
          t.Literal("EXPIRED"),
          t.Literal("REFUNDED"),
        ],
        { additionalProperties: false },
      ),
    ),
    snapToken: t.Optional(__nullable__(t.String())),
    paymentUrl: t.Optional(__nullable__(t.String())),
    paidAt: t.Optional(__nullable__(t.Date())),
    expiredAt: t.Optional(__nullable__(t.Date())),
    failureReason: t.Optional(__nullable__(t.String())),
    isTest: t.Optional(t.Boolean()),
    deletedAt: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const PaymentRelationsInputCreate = t.Object(
  {
    booking: t.Object(
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

export const PaymentRelationsInputUpdate = t.Partial(
  t.Object(
    {
      booking: t.Object(
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

export const PaymentWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          bookingId: t.String(),
          amount: t.Number(),
          provider: t.Union([t.Literal("MIDTRANS"), t.Literal("MANUAL")], {
            additionalProperties: false,
          }),
          providerRef: t.String(),
          status: t.Union(
            [
              t.Literal("PENDING"),
              t.Literal("SETTLED"),
              t.Literal("FAILED"),
              t.Literal("EXPIRED"),
              t.Literal("REFUNDED"),
            ],
            { additionalProperties: false },
          ),
          snapToken: t.String(),
          paymentUrl: t.String(),
          paidAt: t.Date(),
          expiredAt: t.Date(),
          failureReason: t.String(),
          isTest: t.Boolean(),
          deletedAt: t.Date(),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Payment" },
  ),
);

export const PaymentWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.String(),
              bookingId: t.String(),
              provider_providerRef_isTest: t.Object(
                {
                  provider: t.Union(
                    [t.Literal("MIDTRANS"), t.Literal("MANUAL")],
                    { additionalProperties: false },
                  ),
                  providerRef: t.String(),
                  isTest: t.Boolean(),
                },
                { additionalProperties: false },
              ),
            },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [
            t.Object({ id: t.String() }),
            t.Object({ bookingId: t.String() }),
            t.Object({
              provider_providerRef_isTest: t.Object(
                {
                  provider: t.Union(
                    [t.Literal("MIDTRANS"), t.Literal("MANUAL")],
                    { additionalProperties: false },
                  ),
                  providerRef: t.String(),
                  isTest: t.Boolean(),
                },
                { additionalProperties: false },
              ),
            }),
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
              bookingId: t.String(),
              amount: t.Number(),
              provider: t.Union([t.Literal("MIDTRANS"), t.Literal("MANUAL")], {
                additionalProperties: false,
              }),
              providerRef: t.String(),
              status: t.Union(
                [
                  t.Literal("PENDING"),
                  t.Literal("SETTLED"),
                  t.Literal("FAILED"),
                  t.Literal("EXPIRED"),
                  t.Literal("REFUNDED"),
                ],
                { additionalProperties: false },
              ),
              snapToken: t.String(),
              paymentUrl: t.String(),
              paidAt: t.Date(),
              expiredAt: t.Date(),
              failureReason: t.String(),
              isTest: t.Boolean(),
              deletedAt: t.Date(),
              createdAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Payment" },
);

export const PaymentSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      booking: t.Boolean(),
      bookingId: t.Boolean(),
      amount: t.Boolean(),
      provider: t.Boolean(),
      providerRef: t.Boolean(),
      status: t.Boolean(),
      snapToken: t.Boolean(),
      paymentUrl: t.Boolean(),
      paidAt: t.Boolean(),
      expiredAt: t.Boolean(),
      failureReason: t.Boolean(),
      isTest: t.Boolean(),
      deletedAt: t.Boolean(),
      createdAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const PaymentInclude = t.Partial(
  t.Object(
    {
      booking: t.Boolean(),
      provider: t.Boolean(),
      status: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const PaymentOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      bookingId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      amount: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      providerRef: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      snapToken: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      paymentUrl: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      paidAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      expiredAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      failureReason: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      isTest: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Payment = t.Composite([PaymentPlain, PaymentRelations], {
  additionalProperties: false,
});

export const PaymentInputCreate = t.Composite(
  [PaymentPlainInputCreate, PaymentRelationsInputCreate],
  { additionalProperties: false },
);

export const PaymentInputUpdate = t.Composite(
  [PaymentPlainInputUpdate, PaymentRelationsInputUpdate],
  { additionalProperties: false },
);
