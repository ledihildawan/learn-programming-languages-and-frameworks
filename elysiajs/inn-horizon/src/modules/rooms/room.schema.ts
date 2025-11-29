import { t } from 'elysia';

// ====================== CREATE ROOM ======================
export const CreateRoomSchema = t.Object({
  hotelId: t.String(),
  name: t.String({ minLength: 3, maxLength: 200 }),
  type: t.String({ minLength: 2, maxLength: 100 }), // e.g., "Deluxe", "Suite", "Standard"
  maxGuests: t.Number({ minimum: 1, maximum: 20 }),
  totalRooms: t.Number({ minimum: 1, maximum: 100 }),
  size: t.Optional(t.Number({ minimum: 1 })), // in square meters
  bedType: t.Optional(t.String({ maxLength: 100 })), // e.g., "King", "Queen", "Twin"
  price: t.Number({ minimum: 0 }),
  extraBedPrice: t.Optional(t.Number({ minimum: 0 })),
  extraBedAvailable: t.Optional(t.Boolean()),
  order: t.Optional(t.Number({ minimum: 0, default: 0 })),
});

// ====================== UPDATE ROOM ======================
export const UpdateRoomSchema = t.Object({
  name: t.Optional(t.String({ minLength: 3, maxLength: 200 })),
  type: t.Optional(t.String({ minLength: 2, maxLength: 100 })),
  maxGuests: t.Optional(t.Number({ minimum: 1, maximum: 20 })),
  totalRooms: t.Optional(t.Number({ minimum: 1, maximum: 100 })),
  size: t.Optional(t.Number({ minimum: 1 })),
  bedType: t.Optional(t.String({ maxLength: 100 })),
  price: t.Optional(t.Number({ minimum: 0 })),
  extraBedPrice: t.Optional(t.Number({ minimum: 0 })),
  extraBedAvailable: t.Optional(t.Boolean()),
  order: t.Optional(t.Number({ minimum: 0 })),
  isActive: t.Optional(t.Boolean()),
});

// ====================== ROOM QUERY ======================
export const GetRoomsQuerySchema = t.Object({
  page: t.Optional(t.Number({ minimum: 1, default: 1 })),
  limit: t.Optional(t.Number({ minimum: 1, maximum: 100, default: 10 })),
  hotelId: t.Optional(t.String()),
  type: t.Optional(t.String()),
  minPrice: t.Optional(t.Number({ minimum: 0 })),
  maxPrice: t.Optional(t.Number({ minimum: 0 })),
  minGuests: t.Optional(t.Number({ minimum: 1 })),
  isActive: t.Optional(t.Boolean()),
  sortBy: t.Optional(t.Union([
    t.Literal('name'),
    t.Literal('price'),
    t.Literal('maxGuests'),
    t.Literal('order'),
    t.Literal('createdAt'),
  ])),
  sortOrder: t.Optional(t.Union([t.Literal('asc'), t.Literal('desc')])),
});

// ====================== ROOM AVAILABILITY ======================
export const CheckAvailabilitySchema = t.Object({
  checkIn: t.String({ format: 'date' }), // YYYY-MM-DD
  checkOut: t.String({ format: 'date' }), // YYYY-MM-DD
  guests: t.Optional(t.Number({ minimum: 1, default: 1 })),
});

// ====================== ROOM PHOTO ======================
export const AddRoomPhotoSchema = t.Object({
  url: t.String({ format: 'uri' }),
  order: t.Optional(t.Number({ minimum: 0, default: 0 })),
});

export const UpdateRoomPhotoOrderSchema = t.Object({
  photos: t.Array(t.Object({
    id: t.String(),
    order: t.Number({ minimum: 0 }),
  })),
});

// ====================== TYPES ======================
export type CreateRoomInput = {
  hotelId: string;
  name: string;
  type: string;
  maxGuests: number;
  totalRooms: number;
  size?: number;
  bedType?: string;
  price: number;
  extraBedPrice?: number;
  extraBedAvailable?: boolean;
  order?: number;
};

export type UpdateRoomInput = {
  name?: string;
  type?: string;
  maxGuests?: number;
  totalRooms?: number;
  size?: number;
  bedType?: string;
  price?: number;
  extraBedPrice?: number;
  extraBedAvailable?: boolean;
  order?: number;
  isActive?: boolean;
};

export type GetRoomsQuery = {
  page?: number;
  limit?: number;
  hotelId?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  minGuests?: number;
  isActive?: boolean;
  sortBy?: 'name' | 'price' | 'maxGuests' | 'order' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
};

export type CheckAvailabilityInput = {
  checkIn: string;
  checkOut: string;
  guests?: number;
};
