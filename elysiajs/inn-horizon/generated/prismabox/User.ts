import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const UserPlain = t.Object(
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
);

export const UserRelations = t.Object(
  {
    hotels: t.Array(
      t.Object(
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
      { additionalProperties: false },
    ),
    reviews: t.Array(
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
      { additionalProperties: false },
    ),
    bookings: t.Array(
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
      { additionalProperties: false },
    ),
    canceledBookings: t.Array(
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
      { additionalProperties: false },
    ),
    payouts: t.Array(
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
      { additionalProperties: false },
    ),
    processedPayouts: t.Array(
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
      { additionalProperties: false },
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

export const UserPlainInputCreate = t.Object(
  {
    role: t.Optional(
      t.Union([t.Literal("ADMIN"), t.Literal("HOST"), t.Literal("CUSTOMER")], {
        additionalProperties: false,
      }),
    ),
    name: t.Optional(__nullable__(t.String())),
    email: t.String(),
    password: t.String(),
    phone: t.String(),
    avatar: t.Optional(__nullable__(t.String())),
    isVerified: t.Optional(t.Boolean()),
    deletedAt: t.Optional(__nullable__(t.Date())),
    bankName: t.Optional(__nullable__(t.String())),
    bankCode: t.Optional(__nullable__(t.String())),
    accountNumber: t.Optional(__nullable__(t.String())),
    accountName: t.Optional(__nullable__(t.String())),
    walletBalance: t.Optional(t.Number()),
  },
  { additionalProperties: false },
);

export const UserPlainInputUpdate = t.Object(
  {
    role: t.Optional(
      t.Union([t.Literal("ADMIN"), t.Literal("HOST"), t.Literal("CUSTOMER")], {
        additionalProperties: false,
      }),
    ),
    name: t.Optional(__nullable__(t.String())),
    email: t.Optional(t.String()),
    password: t.Optional(t.String()),
    phone: t.Optional(t.String()),
    avatar: t.Optional(__nullable__(t.String())),
    isVerified: t.Optional(t.Boolean()),
    deletedAt: t.Optional(__nullable__(t.Date())),
    bankName: t.Optional(__nullable__(t.String())),
    bankCode: t.Optional(__nullable__(t.String())),
    accountNumber: t.Optional(__nullable__(t.String())),
    accountName: t.Optional(__nullable__(t.String())),
    walletBalance: t.Optional(t.Number()),
  },
  { additionalProperties: false },
);

export const UserRelationsInputCreate = t.Object(
  {
    hotels: t.Optional(
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
    reviews: t.Optional(
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
    bookings: t.Optional(
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
    canceledBookings: t.Optional(
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
    payouts: t.Optional(
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
    processedPayouts: t.Optional(
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

export const UserRelationsInputUpdate = t.Partial(
  t.Object(
    {
      hotels: t.Partial(
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
      reviews: t.Partial(
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
      bookings: t.Partial(
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
      canceledBookings: t.Partial(
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
      payouts: t.Partial(
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
      processedPayouts: t.Partial(
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

export const UserWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          role: t.Union(
            [t.Literal("ADMIN"), t.Literal("HOST"), t.Literal("CUSTOMER")],
            { additionalProperties: false },
          ),
          name: t.String(),
          email: t.String(),
          password: t.String(),
          phone: t.String(),
          avatar: t.String(),
          isVerified: t.Boolean(),
          deletedAt: t.Date(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          bankName: t.String(),
          bankCode: t.String(),
          accountNumber: t.String(),
          accountName: t.String(),
          walletBalance: t.Number(),
        },
        { additionalProperties: false },
      ),
    { $id: "User" },
  ),
);

export const UserWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), email: t.String(), phone: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [
            t.Object({ id: t.String() }),
            t.Object({ email: t.String() }),
            t.Object({ phone: t.String() }),
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
              role: t.Union(
                [t.Literal("ADMIN"), t.Literal("HOST"), t.Literal("CUSTOMER")],
                { additionalProperties: false },
              ),
              name: t.String(),
              email: t.String(),
              password: t.String(),
              phone: t.String(),
              avatar: t.String(),
              isVerified: t.Boolean(),
              deletedAt: t.Date(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
              bankName: t.String(),
              bankCode: t.String(),
              accountNumber: t.String(),
              accountName: t.String(),
              walletBalance: t.Number(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "User" },
);

export const UserSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      role: t.Boolean(),
      name: t.Boolean(),
      email: t.Boolean(),
      password: t.Boolean(),
      phone: t.Boolean(),
      avatar: t.Boolean(),
      isVerified: t.Boolean(),
      deletedAt: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      bankName: t.Boolean(),
      bankCode: t.Boolean(),
      accountNumber: t.Boolean(),
      accountName: t.Boolean(),
      hotels: t.Boolean(),
      reviews: t.Boolean(),
      bookings: t.Boolean(),
      canceledBookings: t.Boolean(),
      payouts: t.Boolean(),
      processedPayouts: t.Boolean(),
      ledgerEntries: t.Boolean(),
      walletBalance: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const UserInclude = t.Partial(
  t.Object(
    {
      role: t.Boolean(),
      hotels: t.Boolean(),
      reviews: t.Boolean(),
      bookings: t.Boolean(),
      canceledBookings: t.Boolean(),
      payouts: t.Boolean(),
      processedPayouts: t.Boolean(),
      ledgerEntries: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const UserOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      email: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      password: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      phone: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      avatar: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      isVerified: t.Union([t.Literal("asc"), t.Literal("desc")], {
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
      bankName: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      bankCode: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      accountNumber: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      accountName: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      walletBalance: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const User = t.Composite([UserPlain, UserRelations], {
  additionalProperties: false,
});

export const UserInputCreate = t.Composite(
  [UserPlainInputCreate, UserRelationsInputCreate],
  { additionalProperties: false },
);

export const UserInputUpdate = t.Composite(
  [UserPlainInputUpdate, UserRelationsInputUpdate],
  { additionalProperties: false },
);
