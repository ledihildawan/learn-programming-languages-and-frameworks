import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const HotelPhotoPlain = t.Object(
  {
    id: t.String(),
    hotelId: t.String(),
    url: t.String(),
    isCover: t.Boolean(),
  },
  { additionalProperties: false },
);

export const HotelPhotoRelations = t.Object(
  {
    hotel: t.Object(
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
  },
  { additionalProperties: false },
);

export const HotelPhotoPlainInputCreate = t.Object(
  { url: t.String(), isCover: t.Optional(t.Boolean()) },
  { additionalProperties: false },
);

export const HotelPhotoPlainInputUpdate = t.Object(
  { url: t.Optional(t.String()), isCover: t.Optional(t.Boolean()) },
  { additionalProperties: false },
);

export const HotelPhotoRelationsInputCreate = t.Object(
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

export const HotelPhotoRelationsInputUpdate = t.Partial(
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

export const HotelPhotoWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          hotelId: t.String(),
          url: t.String(),
          isCover: t.Boolean(),
        },
        { additionalProperties: false },
      ),
    { $id: "HotelPhoto" },
  ),
);

export const HotelPhotoWhereUnique = t.Recursive(
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
              url: t.String(),
              isCover: t.Boolean(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "HotelPhoto" },
);

export const HotelPhotoSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      hotelId: t.Boolean(),
      hotel: t.Boolean(),
      url: t.Boolean(),
      isCover: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const HotelPhotoInclude = t.Partial(
  t.Object(
    { hotel: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const HotelPhotoOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      hotelId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      url: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      isCover: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const HotelPhoto = t.Composite([HotelPhotoPlain, HotelPhotoRelations], {
  additionalProperties: false,
});

export const HotelPhotoInputCreate = t.Composite(
  [HotelPhotoPlainInputCreate, HotelPhotoRelationsInputCreate],
  { additionalProperties: false },
);

export const HotelPhotoInputUpdate = t.Composite(
  [HotelPhotoPlainInputUpdate, HotelPhotoRelationsInputUpdate],
  { additionalProperties: false },
);
