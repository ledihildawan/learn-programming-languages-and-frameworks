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
    phone: __nullable__(t.String()),
    avatar: __nullable__(t.String()),
    isVerified: t.Boolean(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
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
          latitude: __nullable__(t.Number()),
          longitude: __nullable__(t.Number()),
          description: __nullable__(t.String()),
          coverPhoto: __nullable__(t.String()),
          isActive: t.Boolean(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
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
          createdAt: t.Date(),
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
          bankName: t.String(),
          accountNo: t.String(),
          accountName: t.String(),
          status: t.String(),
          requestedAt: t.Date(),
          processedAt: __nullable__(t.Date()),
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
    phone: t.Optional(__nullable__(t.String())),
    avatar: t.Optional(__nullable__(t.String())),
    isVerified: t.Optional(t.Boolean()),
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
    phone: t.Optional(__nullable__(t.String())),
    avatar: t.Optional(__nullable__(t.String())),
    isVerified: t.Optional(t.Boolean()),
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
          createdAt: t.Date(),
          updatedAt: t.Date(),
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
              createdAt: t.Date(),
              updatedAt: t.Date(),
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
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      hotels: t.Boolean(),
      bookings: t.Boolean(),
      reviews: t.Boolean(),
      payouts: t.Boolean(),
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
      bookings: t.Boolean(),
      reviews: t.Boolean(),
      payouts: t.Boolean(),
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
