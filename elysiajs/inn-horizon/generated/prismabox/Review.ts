import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ReviewPlain = t.Object(
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
);

export const ReviewRelations = t.Object(
  {
    hotel: t.Object(
      {
        id: t.String(),
        ownerId: t.String(),
        name: t.String(),
        slug: t.String(),
        address: t.String(),
        city: t.String(),
        province: __nullable__(t.String()),
        latitude: __nullable__(t.Number()),
        longitude: __nullable__(t.Number()),
        description: __nullable__(t.String()),
        coverPhoto: __nullable__(t.String()),
        checkInTime: t.String(),
        checkOutTime: t.String(),
        cancellationHours: __nullable__(t.Integer()),
        isActive: t.Boolean(),
        deletedAt: __nullable__(t.Date()),
        createdAt: t.Date(),
        updatedAt: t.Date(),
        avgRating: t.Number(),
        totalReview: t.Integer(),
      },
      { additionalProperties: false },
    ),
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
  },
  { additionalProperties: false },
);

export const ReviewPlainInputCreate = t.Object(
  {
    rating: t.Integer(),
    comment: t.Optional(__nullable__(t.String())),
    deletedAt: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const ReviewPlainInputUpdate = t.Object(
  {
    rating: t.Optional(t.Integer()),
    comment: t.Optional(__nullable__(t.String())),
    deletedAt: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const ReviewRelationsInputCreate = t.Object(
  {
    hotel: t.Object(
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
  },
  { additionalProperties: false },
);

export const ReviewRelationsInputUpdate = t.Partial(
  t.Object(
    {
      hotel: t.Object(
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
    },
    { additionalProperties: false },
  ),
);

export const ReviewWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          hotelId: t.String(),
          userId: t.String(),
          bookingId: t.String(),
          rating: t.Integer(),
          comment: t.String(),
          deletedAt: t.Date(),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Review" },
  ),
);

export const ReviewWhereUnique = t.Recursive(
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
              hotelId: t.String(),
              userId: t.String(),
              bookingId: t.String(),
              rating: t.Integer(),
              comment: t.String(),
              deletedAt: t.Date(),
              createdAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Review" },
);

export const ReviewSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      hotel: t.Boolean(),
      hotelId: t.Boolean(),
      user: t.Boolean(),
      userId: t.Boolean(),
      booking: t.Boolean(),
      bookingId: t.Boolean(),
      rating: t.Boolean(),
      comment: t.Boolean(),
      deletedAt: t.Boolean(),
      createdAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ReviewInclude = t.Partial(
  t.Object(
    {
      hotel: t.Boolean(),
      user: t.Boolean(),
      booking: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ReviewOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      hotelId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      bookingId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      rating: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      comment: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Review = t.Composite([ReviewPlain, ReviewRelations], {
  additionalProperties: false,
});

export const ReviewInputCreate = t.Composite(
  [ReviewPlainInputCreate, ReviewRelationsInputCreate],
  { additionalProperties: false },
);

export const ReviewInputUpdate = t.Composite(
  [ReviewPlainInputUpdate, ReviewRelationsInputUpdate],
  { additionalProperties: false },
);
