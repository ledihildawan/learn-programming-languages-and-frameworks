import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const RoomPhotoPlain = t.Object(
  { id: t.String(), roomId: t.String(), url: t.String() },
  { additionalProperties: false },
);

export const RoomPhotoRelations = t.Object(
  {
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
  },
  { additionalProperties: false },
);

export const RoomPhotoPlainInputCreate = t.Object(
  { url: t.String() },
  { additionalProperties: false },
);

export const RoomPhotoPlainInputUpdate = t.Object(
  { url: t.Optional(t.String()) },
  { additionalProperties: false },
);

export const RoomPhotoRelationsInputCreate = t.Object(
  {
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

export const RoomPhotoRelationsInputUpdate = t.Partial(
  t.Object(
    {
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

export const RoomPhotoWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          roomId: t.String(),
          url: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "RoomPhoto" },
  ),
);

export const RoomPhotoWhereUnique = t.Recursive(
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
            { id: t.String(), roomId: t.String(), url: t.String() },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "RoomPhoto" },
);

export const RoomPhotoSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      roomId: t.Boolean(),
      room: t.Boolean(),
      url: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const RoomPhotoInclude = t.Partial(
  t.Object(
    { room: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const RoomPhotoOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      roomId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      url: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const RoomPhoto = t.Composite([RoomPhotoPlain, RoomPhotoRelations], {
  additionalProperties: false,
});

export const RoomPhotoInputCreate = t.Composite(
  [RoomPhotoPlainInputCreate, RoomPhotoRelationsInputCreate],
  { additionalProperties: false },
);

export const RoomPhotoInputUpdate = t.Composite(
  [RoomPhotoPlainInputUpdate, RoomPhotoRelationsInputUpdate],
  { additionalProperties: false },
);
