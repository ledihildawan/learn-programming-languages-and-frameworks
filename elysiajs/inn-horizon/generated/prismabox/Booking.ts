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
        phone: __nullable__(t.String()),
        avatar: __nullable__(t.String()),
        isVerified: t.Boolean(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
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
        size: __nullable__(t.Integer()),
        bedType: __nullable__(t.String()),
        price: t.Number(),
        totalRooms: t.Integer(),
        createdAt: t.Date(),
      },
      { additionalProperties: false },
    ),
    payment: __nullable__(
      t.Object(
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
      ),
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
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const BookingPlainInputCreate = t.Object(
  {
    checkIn: t.Date(),
    checkOut: t.Date(),
    nights: t.Integer(),
    guests: t.Integer(),
    totalPrice: t.Number(),
    status: t.Optional(
      t.Union(
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
    ),
    guestName: t.String(),
    guestPhone: t.String(),
    guestEmail: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const BookingPlainInputUpdate = t.Object(
  {
    checkIn: t.Optional(t.Date()),
    checkOut: t.Optional(t.Date()),
    nights: t.Optional(t.Integer()),
    guests: t.Optional(t.Integer()),
    totalPrice: t.Optional(t.Number()),
    status: t.Optional(
      t.Union(
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
    ),
    guestName: t.Optional(t.String()),
    guestPhone: t.Optional(t.String()),
    guestEmail: t.Optional(__nullable__(t.String())),
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
          guestEmail: t.String(),
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
            {
              id: t.String(),
              roomId_checkIn_checkOut: t.Object(
                { roomId: t.String(), checkIn: t.Date(), checkOut: t.Date() },
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
            t.Object({
              roomId_checkIn_checkOut: t.Object(
                { roomId: t.String(), checkIn: t.Date(), checkOut: t.Date() },
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
              guestEmail: t.String(),
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
      userId: t.Boolean(),
      user: t.Boolean(),
      roomId: t.Boolean(),
      room: t.Boolean(),
      checkIn: t.Boolean(),
      checkOut: t.Boolean(),
      nights: t.Boolean(),
      guests: t.Boolean(),
      totalPrice: t.Boolean(),
      status: t.Boolean(),
      guestName: t.Boolean(),
      guestPhone: t.Boolean(),
      guestEmail: t.Boolean(),
      payment: t.Boolean(),
      review: t.Boolean(),
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
      payment: t.Boolean(),
      review: t.Boolean(),
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
      nights: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      guests: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      totalPrice: t.Union([t.Literal("asc"), t.Literal("desc")], {
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
