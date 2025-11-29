import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const HotelAmenityPlain = t.Object(
  {
    id: t.String(),
    hotelId: t.String(),
    name: t.String(),
    icon: __nullable__(t.String()),
  },
  { additionalProperties: false },
);

export const HotelAmenityRelations = t.Object(
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
  },
  { additionalProperties: false },
);

export const HotelAmenityPlainInputCreate = t.Object(
  { name: t.String(), icon: t.Optional(__nullable__(t.String())) },
  { additionalProperties: false },
);

export const HotelAmenityPlainInputUpdate = t.Object(
  { name: t.Optional(t.String()), icon: t.Optional(__nullable__(t.String())) },
  { additionalProperties: false },
);

export const HotelAmenityRelationsInputCreate = t.Object(
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
  },
  { additionalProperties: false },
);

export const HotelAmenityRelationsInputUpdate = t.Partial(
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
    },
    { additionalProperties: false },
  ),
);

export const HotelAmenityWhere = t.Partial(
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
          icon: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "HotelAmenity" },
  ),
);

export const HotelAmenityWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.String(),
              hotelId_name: t.Object(
                { hotelId: t.String(), name: t.String() },
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
              hotelId_name: t.Object(
                { hotelId: t.String(), name: t.String() },
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
              hotelId: t.String(),
              name: t.String(),
              icon: t.String(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "HotelAmenity" },
);

export const HotelAmenitySelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      hotel: t.Boolean(),
      hotelId: t.Boolean(),
      name: t.Boolean(),
      icon: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const HotelAmenityInclude = t.Partial(
  t.Object(
    { hotel: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const HotelAmenityOrderBy = t.Partial(
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
      icon: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const HotelAmenity = t.Composite(
  [HotelAmenityPlain, HotelAmenityRelations],
  { additionalProperties: false },
);

export const HotelAmenityInputCreate = t.Composite(
  [HotelAmenityPlainInputCreate, HotelAmenityRelationsInputCreate],
  { additionalProperties: false },
);

export const HotelAmenityInputUpdate = t.Composite(
  [HotelAmenityPlainInputUpdate, HotelAmenityRelationsInputUpdate],
  { additionalProperties: false },
);
