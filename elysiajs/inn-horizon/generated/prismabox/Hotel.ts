import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const HotelPlain = t.Object(
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
);

export const HotelRelations = t.Object(
  {
    owner: t.Object(
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
    rooms: t.Array(
      t.Object(
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
      { additionalProperties: false },
    ),
    photos: t.Array(
      t.Object(
        {
          id: t.String(),
          hotelId: t.String(),
          url: t.String(),
          order: t.Integer(),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
    amenities: t.Array(
      t.Object(
        {
          id: t.String(),
          hotelId: t.String(),
          name: t.String(),
          icon: __nullable__(t.String()),
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
  },
  { additionalProperties: false },
);

export const HotelPlainInputCreate = t.Object(
  {
    name: t.String(),
    slug: t.String(),
    address: t.String(),
    city: t.String(),
    province: t.Optional(__nullable__(t.String())),
    latitude: t.Optional(__nullable__(t.Number())),
    longitude: t.Optional(__nullable__(t.Number())),
    description: t.Optional(__nullable__(t.String())),
    coverPhoto: t.Optional(__nullable__(t.String())),
    checkInTime: t.Optional(t.String()),
    checkOutTime: t.Optional(t.String()),
    cancellationHours: t.Optional(__nullable__(t.Integer())),
    isActive: t.Optional(t.Boolean()),
    deletedAt: t.Optional(__nullable__(t.Date())),
    avgRating: t.Optional(t.Number()),
    totalReview: t.Optional(t.Integer()),
  },
  { additionalProperties: false },
);

export const HotelPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    slug: t.Optional(t.String()),
    address: t.Optional(t.String()),
    city: t.Optional(t.String()),
    province: t.Optional(__nullable__(t.String())),
    latitude: t.Optional(__nullable__(t.Number())),
    longitude: t.Optional(__nullable__(t.Number())),
    description: t.Optional(__nullable__(t.String())),
    coverPhoto: t.Optional(__nullable__(t.String())),
    checkInTime: t.Optional(t.String()),
    checkOutTime: t.Optional(t.String()),
    cancellationHours: t.Optional(__nullable__(t.Integer())),
    isActive: t.Optional(t.Boolean()),
    deletedAt: t.Optional(__nullable__(t.Date())),
    avgRating: t.Optional(t.Number()),
    totalReview: t.Optional(t.Integer()),
  },
  { additionalProperties: false },
);

export const HotelRelationsInputCreate = t.Object(
  {
    owner: t.Object(
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
    rooms: t.Optional(
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
    amenities: t.Optional(
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
  },
  { additionalProperties: false },
);

export const HotelRelationsInputUpdate = t.Partial(
  t.Object(
    {
      owner: t.Object(
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
      rooms: t.Partial(
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
      amenities: t.Partial(
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
    },
    { additionalProperties: false },
  ),
);

export const HotelWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          ownerId: t.String(),
          name: t.String(),
          slug: t.String(),
          address: t.String(),
          city: t.String(),
          province: t.String(),
          latitude: t.Number(),
          longitude: t.Number(),
          description: t.String(),
          coverPhoto: t.String(),
          checkInTime: t.String(),
          checkOutTime: t.String(),
          cancellationHours: t.Integer(),
          isActive: t.Boolean(),
          deletedAt: t.Date(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          avgRating: t.Number(),
          totalReview: t.Integer(),
        },
        { additionalProperties: false },
      ),
    { $id: "Hotel" },
  ),
);

export const HotelWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), slug: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ slug: t.String() })],
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
              ownerId: t.String(),
              name: t.String(),
              slug: t.String(),
              address: t.String(),
              city: t.String(),
              province: t.String(),
              latitude: t.Number(),
              longitude: t.Number(),
              description: t.String(),
              coverPhoto: t.String(),
              checkInTime: t.String(),
              checkOutTime: t.String(),
              cancellationHours: t.Integer(),
              isActive: t.Boolean(),
              deletedAt: t.Date(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
              avgRating: t.Number(),
              totalReview: t.Integer(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Hotel" },
);

export const HotelSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      owner: t.Boolean(),
      ownerId: t.Boolean(),
      name: t.Boolean(),
      slug: t.Boolean(),
      address: t.Boolean(),
      city: t.Boolean(),
      province: t.Boolean(),
      latitude: t.Boolean(),
      longitude: t.Boolean(),
      description: t.Boolean(),
      coverPhoto: t.Boolean(),
      checkInTime: t.Boolean(),
      checkOutTime: t.Boolean(),
      cancellationHours: t.Boolean(),
      isActive: t.Boolean(),
      deletedAt: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      rooms: t.Boolean(),
      photos: t.Boolean(),
      amenities: t.Boolean(),
      reviews: t.Boolean(),
      avgRating: t.Boolean(),
      totalReview: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const HotelInclude = t.Partial(
  t.Object(
    {
      owner: t.Boolean(),
      rooms: t.Boolean(),
      photos: t.Boolean(),
      amenities: t.Boolean(),
      reviews: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const HotelOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      ownerId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      slug: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      address: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      city: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      province: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      latitude: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      longitude: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      description: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      coverPhoto: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      checkInTime: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      checkOutTime: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      cancellationHours: t.Union([t.Literal("asc"), t.Literal("desc")], {
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
      avgRating: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      totalReview: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Hotel = t.Composite([HotelPlain, HotelRelations], {
  additionalProperties: false,
});

export const HotelInputCreate = t.Composite(
  [HotelPlainInputCreate, HotelRelationsInputCreate],
  { additionalProperties: false },
);

export const HotelInputUpdate = t.Composite(
  [HotelPlainInputUpdate, HotelRelationsInputUpdate],
  { additionalProperties: false },
);
