import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const PaymentPlain = t.Object(
  {
    id: t.String(),
    bookingId: t.String(),
    amount: t.Number(),
    provider: t.Union(
      [t.Literal("MIDTRANS"), t.Literal("XENDIT"), t.Literal("MANUAL")],
      { additionalProperties: false },
    ),
    providerId: __nullable__(t.String()),
    status: t.String(),
    paidAt: __nullable__(t.Date()),
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
        nights: t.Integer(),
        guests: t.Integer(),
        totalPrice: t.Number(),
        status: t.Union(
          [
            t.Literal("PENDING"),
            t.Literal("PAID"),
            t.Literal("CONFIRMED"),
            t.Literal("CANCELLED"),
            t.Literal("COMPLETED"),
            t.Literal("REFUNDED"),
          ],
          { additionalProperties: false },
        ),
        guestName: t.String(),
        guestPhone: t.String(),
        guestEmail: __nullable__(t.String()),
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
    provider: t.Union(
      [t.Literal("MIDTRANS"), t.Literal("XENDIT"), t.Literal("MANUAL")],
      { additionalProperties: false },
    ),
    status: t.Optional(t.String()),
    paidAt: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const PaymentPlainInputUpdate = t.Object(
  {
    amount: t.Optional(t.Number()),
    provider: t.Optional(
      t.Union(
        [t.Literal("MIDTRANS"), t.Literal("XENDIT"), t.Literal("MANUAL")],
        { additionalProperties: false },
      ),
    ),
    status: t.Optional(t.String()),
    paidAt: t.Optional(__nullable__(t.Date())),
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
          provider: t.Union(
            [t.Literal("MIDTRANS"), t.Literal("XENDIT"), t.Literal("MANUAL")],
            { additionalProperties: false },
          ),
          providerId: t.String(),
          status: t.String(),
          paidAt: t.Date(),
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
            { id: t.String(), bookingId: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ bookingId: t.String() })],
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
              provider: t.Union(
                [
                  t.Literal("MIDTRANS"),
                  t.Literal("XENDIT"),
                  t.Literal("MANUAL"),
                ],
                { additionalProperties: false },
              ),
              providerId: t.String(),
              status: t.String(),
              paidAt: t.Date(),
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
      bookingId: t.Boolean(),
      booking: t.Boolean(),
      amount: t.Boolean(),
      provider: t.Boolean(),
      providerId: t.Boolean(),
      status: t.Boolean(),
      paidAt: t.Boolean(),
      createdAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const PaymentInclude = t.Partial(
  t.Object(
    { booking: t.Boolean(), provider: t.Boolean(), _count: t.Boolean() },
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
      providerId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      status: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      paidAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
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
