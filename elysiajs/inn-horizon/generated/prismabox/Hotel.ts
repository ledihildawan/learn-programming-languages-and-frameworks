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
    latitude: __nullable__(t.Number()),
    longitude: __nullable__(t.Number()),
    description: __nullable__(t.String()),
    coverPhoto: __nullable__(t.String()),
    isActive: t.Boolean(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
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
        phone: __nullable__(t.String()),
        avatar: __nullable__(t.String()),
        isVerified: t.Boolean(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
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
          size: __nullable__(t.Integer()),
          bedType: __nullable__(t.String()),
          price: t.Number(),
          totalRooms: t.Integer(),
          createdAt: t.Date(),
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
    photos: t.Array(
      t.Object(
        {
          id: t.String(),
          hotelId: t.String(),
          url: t.String(),
          isCover: t.Boolean(),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
    amenities: t.Array(
      t.Object(
        { id: t.String(), hotelId: t.String(), name: t.String() },
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
    latitude: t.Optional(__nullable__(t.Number())),
    longitude: t.Optional(__nullable__(t.Number())),
    description: t.Optional(__nullable__(t.String())),
    coverPhoto: t.Optional(__nullable__(t.String())),
    isActive: t.Optional(t.Boolean()),
  },
  { additionalProperties: false },
);

export const HotelPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    slug: t.Optional(t.String()),
    address: t.Optional(t.String()),
    city: t.Optional(t.String()),
    latitude: t.Optional(__nullable__(t.Number())),
    longitude: t.Optional(__nullable__(t.Number())),
    description: t.Optional(__nullable__(t.String())),
    coverPhoto: t.Optional(__nullable__(t.String())),
    isActive: t.Optional(t.Boolean()),
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
          latitude: t.Number(),
          longitude: t.Number(),
          description: t.String(),
          coverPhoto: t.String(),
          isActive: t.Boolean(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
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
              latitude: t.Number(),
              longitude: t.Number(),
              description: t.String(),
              coverPhoto: t.String(),
              isActive: t.Boolean(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
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
      ownerId: t.Boolean(),
      owner: t.Boolean(),
      name: t.Boolean(),
      slug: t.Boolean(),
      address: t.Boolean(),
      city: t.Boolean(),
      latitude: t.Boolean(),
      longitude: t.Boolean(),
      description: t.Boolean(),
      coverPhoto: t.Boolean(),
      isActive: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      rooms: t.Boolean(),
      reviews: t.Boolean(),
      photos: t.Boolean(),
      amenities: t.Boolean(),
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
      reviews: t.Boolean(),
      photos: t.Boolean(),
      amenities: t.Boolean(),
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
      isActive: t.Union([t.Literal("asc"), t.Literal("desc")], {
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
