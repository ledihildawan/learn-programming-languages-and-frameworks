import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const RoomPlain = t.Object(
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
);

export const RoomRelations = t.Object(
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
    photos: t.Array(
      t.Object(
        {
          id: t.String(),
          roomId: t.String(),
          url: t.String(),
          order: t.Integer(),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
    bookingDates: t.Array(
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
  },
  { additionalProperties: false },
);

export const RoomPlainInputCreate = t.Object(
  {
    name: t.String(),
    type: t.String(),
    maxGuests: t.Integer(),
    totalRooms: t.Optional(t.Integer()),
    size: t.Optional(__nullable__(t.Integer())),
    bedType: t.Optional(__nullable__(t.String())),
    price: t.Number(),
    extraBedPrice: t.Optional(__nullable__(t.Number())),
    extraBedAvailable: t.Optional(t.Boolean()),
    isActive: t.Optional(t.Boolean()),
    deletedAt: t.Optional(__nullable__(t.Date())),
    order: t.Optional(t.Integer()),
  },
  { additionalProperties: false },
);

export const RoomPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    type: t.Optional(t.String()),
    maxGuests: t.Optional(t.Integer()),
    totalRooms: t.Optional(t.Integer()),
    size: t.Optional(__nullable__(t.Integer())),
    bedType: t.Optional(__nullable__(t.String())),
    price: t.Optional(t.Number()),
    extraBedPrice: t.Optional(__nullable__(t.Number())),
    extraBedAvailable: t.Optional(t.Boolean()),
    isActive: t.Optional(t.Boolean()),
    deletedAt: t.Optional(__nullable__(t.Date())),
    order: t.Optional(t.Integer()),
  },
  { additionalProperties: false },
);

export const RoomRelationsInputCreate = t.Object(
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
    photos: t.Optional(
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
    bookingDates: t.Optional(
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
  },
  { additionalProperties: false },
);

export const RoomRelationsInputUpdate = t.Partial(
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
      photos: t.Partial(
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
      bookingDates: t.Partial(
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
    },
    { additionalProperties: false },
  ),
);

export const RoomWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          hotelId: t.String(),
          name: t.String(),
          type: t.String(),
          maxGuests: t.Integer(),
          totalRooms: t.Integer(),
          size: t.Integer(),
          bedType: t.String(),
          price: t.Number(),
          extraBedPrice: t.Number(),
          extraBedAvailable: t.Boolean(),
          isActive: t.Boolean(),
          deletedAt: t.Date(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          order: t.Integer(),
        },
        { additionalProperties: false },
      ),
    { $id: "Room" },
  ),
);

export const RoomWhereUnique = t.Recursive(
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
              hotelId: t.String(),
              name: t.String(),
              type: t.String(),
              maxGuests: t.Integer(),
              totalRooms: t.Integer(),
              size: t.Integer(),
              bedType: t.String(),
              price: t.Number(),
              extraBedPrice: t.Number(),
              extraBedAvailable: t.Boolean(),
              isActive: t.Boolean(),
              deletedAt: t.Date(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
              order: t.Integer(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Room" },
);

export const RoomSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      hotel: t.Boolean(),
      hotelId: t.Boolean(),
      name: t.Boolean(),
      type: t.Boolean(),
      maxGuests: t.Boolean(),
      totalRooms: t.Boolean(),
      size: t.Boolean(),
      bedType: t.Boolean(),
      price: t.Boolean(),
      extraBedPrice: t.Boolean(),
      extraBedAvailable: t.Boolean(),
      isActive: t.Boolean(),
      deletedAt: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      order: t.Boolean(),
      photos: t.Boolean(),
      bookingDates: t.Boolean(),
      bookings: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const RoomInclude = t.Partial(
  t.Object(
    {
      hotel: t.Boolean(),
      photos: t.Boolean(),
      bookingDates: t.Boolean(),
      bookings: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const RoomOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      hotelId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      type: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      maxGuests: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      totalRooms: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      size: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      bedType: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      price: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      extraBedPrice: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      extraBedAvailable: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      isActive: t.Union([t.Literal("asc"), t.Literal("desc")], {
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
      order: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Room = t.Composite([RoomPlain, RoomRelations], {
  additionalProperties: false,
});

export const RoomInputCreate = t.Composite(
  [RoomPlainInputCreate, RoomRelationsInputCreate],
  { additionalProperties: false },
);

export const RoomInputUpdate = t.Composite(
  [RoomPlainInputUpdate, RoomRelationsInputUpdate],
  { additionalProperties: false },
);
