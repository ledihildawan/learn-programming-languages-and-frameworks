import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const BookingDatePlain = t.Object(
  { id: t.String(), bookingId: t.String(), roomId: t.String(), date: t.Date() },
  { additionalProperties: false },
);

export const BookingDateRelations = t.Object(
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
  },
  { additionalProperties: false },
);

export const BookingDatePlainInputCreate = t.Object(
  { date: t.Date() },
  { additionalProperties: false },
);

export const BookingDatePlainInputUpdate = t.Object(
  { date: t.Optional(t.Date()) },
  { additionalProperties: false },
);

export const BookingDateRelationsInputCreate = t.Object(
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
  },
  { additionalProperties: false },
);

export const BookingDateRelationsInputUpdate = t.Partial(
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
    },
    { additionalProperties: false },
  ),
);

export const BookingDateWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          bookingId: t.String(),
          roomId: t.String(),
          date: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "BookingDate" },
  ),
);

export const BookingDateWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.String(),
              roomId_date: t.Object(
                { roomId: t.String(), date: t.Date() },
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
              roomId_date: t.Object(
                { roomId: t.String(), date: t.Date() },
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
              roomId: t.String(),
              date: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "BookingDate" },
);

export const BookingDateSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      booking: t.Boolean(),
      bookingId: t.Boolean(),
      room: t.Boolean(),
      roomId: t.Boolean(),
      date: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const BookingDateInclude = t.Partial(
  t.Object(
    { booking: t.Boolean(), room: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const BookingDateOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      bookingId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      roomId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      date: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const BookingDate = t.Composite(
  [BookingDatePlain, BookingDateRelations],
  { additionalProperties: false },
);

export const BookingDateInputCreate = t.Composite(
  [BookingDatePlainInputCreate, BookingDateRelationsInputCreate],
  { additionalProperties: false },
);

export const BookingDateInputUpdate = t.Composite(
  [BookingDatePlainInputUpdate, BookingDateRelationsInputUpdate],
  { additionalProperties: false },
);
