import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const BookingPlain = t.Object(
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
);

export const BookingRelations = t.Object(
  {
    user: t.Object(
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
    room: t.Object(
      {
        id: t.String(),
        hotelId: t.String(),
        name: t.String(),
        type: t.String(),
        maxGuests: t.Integer(),
        totalRooms: t.Integer(),
        size: __nullable__(t.Integer()),
        bedType: __nullable__(t.String()),
        price: t.Number(),
        extraBedPrice: __nullable__(t.Number()),
        extraBedAvailable: t.Boolean(),
        isActive: t.Boolean(),
        deletedAt: __nullable__(t.Date()),
        createdAt: t.Date(),
        updatedAt: t.Date(),
        order: t.Integer(),
      },
      { additionalProperties: false },
    ),
    canceledBy: __nullable__(
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
    payment: __nullable__(
      t.Object(
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
      ),
    ),
    dates: t.Array(
      t.Object(
        {
          id: t.String(),
          bookingId: t.String(),
          roomId: t.String(),
          date: t.Date(),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
    review: __nullable__(
      t.Object(
        {
          id: t.String(),
          hotelId: t.String(),
          userId: t.String(),
          bookingId: __nullable__(t.String()),
          rating: t.Integer(),
          comment: __nullable__(t.String()),
          deletedAt: __nullable__(t.Date()),
          createdAt: t.Date(),
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

export const BookingPlainInputCreate = t.Object(
  {
    checkIn: t.Date(),
    checkOut: t.Date(),
    bookingCode: t.String(),
    nights: t.Integer(),
    guests: t.Integer(),
    guestName: t.String(),
    guestPhone: t.String(),
    guestEmail: t.Optional(__nullable__(t.String())),
    guestNotes: t.Optional(__nullable__(t.String())),
    totalPrice: t.Number(),
    platformFee: t.Number(),
    hostPayout: t.Number(),
    status: t.Optional(
      t.Union(
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
    ),
    expiredAt: t.Optional(__nullable__(t.Date())),
    confirmedAt: t.Optional(__nullable__(t.Date())),
    checkedInAt: t.Optional(__nullable__(t.Date())),
    canceledAt: t.Optional(__nullable__(t.Date())),
    cancelReason: t.Optional(__nullable__(t.String())),
    roomSnapshot: t.Any(),
    isTest: t.Optional(t.Boolean()),
    deletedAt: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const BookingPlainInputUpdate = t.Object(
  {
    checkIn: t.Optional(t.Date()),
    checkOut: t.Optional(t.Date()),
    bookingCode: t.Optional(t.String()),
    nights: t.Optional(t.Integer()),
    guests: t.Optional(t.Integer()),
    guestName: t.Optional(t.String()),
    guestPhone: t.Optional(t.String()),
    guestEmail: t.Optional(__nullable__(t.String())),
    guestNotes: t.Optional(__nullable__(t.String())),
    totalPrice: t.Optional(t.Number()),
    platformFee: t.Optional(t.Number()),
    hostPayout: t.Optional(t.Number()),
    status: t.Optional(
      t.Union(
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
    ),
    expiredAt: t.Optional(__nullable__(t.Date())),
    confirmedAt: t.Optional(__nullable__(t.Date())),
    checkedInAt: t.Optional(__nullable__(t.Date())),
    canceledAt: t.Optional(__nullable__(t.Date())),
    cancelReason: t.Optional(__nullable__(t.String())),
    roomSnapshot: t.Optional(t.Any()),
    isTest: t.Optional(t.Boolean()),
    deletedAt: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const BookingRelationsInputCreate = t.Object(
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
    room: t.Object(
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
    canceledBy: t.Optional(
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
    payment: t.Optional(
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
    dates: t.Optional(
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
    review: t.Optional(
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

export const BookingRelationsInputUpdate = t.Partial(
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
      room: t.Object(
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
      canceledBy: t.Partial(
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
      payment: t.Partial(
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
      dates: t.Partial(
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
      review: t.Partial(
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

export const BookingWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
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
          guestEmail: t.String(),
          guestNotes: t.String(),
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
          expiredAt: t.Date(),
          confirmedAt: t.Date(),
          checkedInAt: t.Date(),
          canceledAt: t.Date(),
          cancelReason: t.String(),
          canceledById: t.String(),
          roomSnapshot: t.Any(),
          isTest: t.Boolean(),
          paymentId: t.String(),
          deletedAt: t.Date(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Booking" },
  ),
);

export const BookingWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), bookingCode: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ bookingCode: t.String() })],
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
              userId: t.String(),
              roomId: t.String(),
              checkIn: t.Date(),
              checkOut: t.Date(),
              bookingCode: t.String(),
              nights: t.Integer(),
              guests: t.Integer(),
              guestName: t.String(),
              guestPhone: t.String(),
              guestEmail: t.String(),
              guestNotes: t.String(),
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
              expiredAt: t.Date(),
              confirmedAt: t.Date(),
              checkedInAt: t.Date(),
              canceledAt: t.Date(),
              cancelReason: t.String(),
              canceledById: t.String(),
              roomSnapshot: t.Any(),
              isTest: t.Boolean(),
              paymentId: t.String(),
              deletedAt: t.Date(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Booking" },
);

export const BookingSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      user: t.Boolean(),
      userId: t.Boolean(),
      room: t.Boolean(),
      roomId: t.Boolean(),
      checkIn: t.Boolean(),
      checkOut: t.Boolean(),
      bookingCode: t.Boolean(),
      nights: t.Boolean(),
      guests: t.Boolean(),
      guestName: t.Boolean(),
      guestPhone: t.Boolean(),
      guestEmail: t.Boolean(),
      guestNotes: t.Boolean(),
      totalPrice: t.Boolean(),
      platformFee: t.Boolean(),
      hostPayout: t.Boolean(),
      status: t.Boolean(),
      expiredAt: t.Boolean(),
      confirmedAt: t.Boolean(),
      checkedInAt: t.Boolean(),
      canceledAt: t.Boolean(),
      cancelReason: t.Boolean(),
      canceledBy: t.Boolean(),
      canceledById: t.Boolean(),
      roomSnapshot: t.Boolean(),
      isTest: t.Boolean(),
      payment: t.Boolean(),
      paymentId: t.Boolean(),
      dates: t.Boolean(),
      review: t.Boolean(),
      ledgerEntries: t.Boolean(),
      deletedAt: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const BookingInclude = t.Partial(
  t.Object(
    {
      user: t.Boolean(),
      room: t.Boolean(),
      status: t.Boolean(),
      canceledBy: t.Boolean(),
      payment: t.Boolean(),
      dates: t.Boolean(),
      review: t.Boolean(),
      ledgerEntries: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const BookingOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      roomId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      checkIn: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      checkOut: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      bookingCode: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      nights: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      guests: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      guestName: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      guestPhone: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      guestEmail: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      guestNotes: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      totalPrice: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      platformFee: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      hostPayout: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      expiredAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      confirmedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      checkedInAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      canceledAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      cancelReason: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      canceledById: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      roomSnapshot: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      isTest: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      paymentId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      deletedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Booking = t.Composite([BookingPlain, BookingRelations], {
  additionalProperties: false,
});

export const BookingInputCreate = t.Composite(
  [BookingPlainInputCreate, BookingRelationsInputCreate],
  { additionalProperties: false },
);

export const BookingInputUpdate = t.Composite(
  [BookingPlainInputUpdate, BookingRelationsInputUpdate],
  { additionalProperties: false },
);
