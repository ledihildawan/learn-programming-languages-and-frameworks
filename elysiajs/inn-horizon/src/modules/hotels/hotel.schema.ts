import { t } from 'elysia';

// ====================== CREATE HOTEL ======================
export const CreateHotelSchema = t.Object({
  name: t.String({ minLength: 3, maxLength: 200 }),
  address: t.String({ minLength: 10, maxLength: 500 }),
  city: t.String({ minLength: 2, maxLength: 100 }),
  province: t.Optional(t.String({ maxLength: 100 })),
  latitude: t.Optional(t.Number({ minimum: -90, maximum: 90 })),
  longitude: t.Optional(t.Number({ minimum: -180, maximum: 180 })),
  description: t.Optional(t.String({ maxLength: 5000 })),
  checkInTime: t.Optional(t.String({ pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$' })), // HH:MM format
  checkOutTime: t.Optional(t.String({ pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$' })), // HH:MM format
  cancellationHours: t.Optional(t.Number({ minimum: 0, maximum: 168 })), // Max 7 days (168 hours)
});

// ====================== UPDATE HOTEL ======================
export const UpdateHotelSchema = t.Object({
  name: t.Optional(t.String({ minLength: 3, maxLength: 200 })),
  address: t.Optional(t.String({ minLength: 10, maxLength: 500 })),
  city: t.Optional(t.String({ minLength: 2, maxLength: 100 })),
  province: t.Optional(t.String({ maxLength: 100 })),
  latitude: t.Optional(t.Number({ minimum: -90, maximum: 90 })),
  longitude: t.Optional(t.Number({ minimum: -180, maximum: 180 })),
  description: t.Optional(t.String({ maxLength: 5000 })),
  checkInTime: t.Optional(t.String({ pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$' })),
  checkOutTime: t.Optional(t.String({ pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$' })),
  cancellationHours: t.Optional(t.Number({ minimum: 0, maximum: 168 })),
  isActive: t.Optional(t.Boolean()),
});

// ====================== HOTEL QUERY ======================
export const GetHotelsQuerySchema = t.Object({
  page: t.Optional(t.Number({ minimum: 1, default: 1 })),
  limit: t.Optional(t.Number({ minimum: 1, maximum: 100, default: 10 })),
  search: t.Optional(t.String()),
  city: t.Optional(t.String()),
  province: t.Optional(t.String()),
  minRating: t.Optional(t.Number({ minimum: 0, maximum: 5 })),
  isActive: t.Optional(t.Boolean()),
  ownerId: t.Optional(t.String()),
  sortBy: t.Optional(t.Union([
    t.Literal('name'),
    t.Literal('avgRating'),
    t.Literal('createdAt'),
    t.Literal('totalReview'),
  ])),
  sortOrder: t.Optional(t.Union([t.Literal('asc'), t.Literal('desc')])),
});

// ====================== HOTEL PHOTO ======================
export const AddHotelPhotoSchema = t.Object({
  url: t.String({ format: 'uri' }),
  order: t.Optional(t.Number({ minimum: 0, default: 0 })),
});

export const UpdateHotelPhotoOrderSchema = t.Object({
  photos: t.Array(t.Object({
    id: t.String(),
    order: t.Number({ minimum: 0 }),
  })),
});

// ====================== HOTEL AMENITY ======================
export const AddHotelAmenitySchema = t.Object({
  name: t.String({ minLength: 2, maxLength: 100 }),
  icon: t.Optional(t.String({ maxLength: 100 })),
});

export const UpdateHotelAmenitySchema = t.Object({
  name: t.Optional(t.String({ minLength: 2, maxLength: 100 })),
  icon: t.Optional(t.String({ maxLength: 100 })),
});

// ====================== COVER PHOTO ======================
export const UpdateCoverPhotoSchema = t.Object({
  coverPhoto: t.String({ format: 'uri' }),
});

// ====================== TYPES ======================
export type CreateHotelInput = {
  name: string;
  address: string;
  city: string;
  province?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  checkInTime?: string;
  checkOutTime?: string;
  cancellationHours?: number;
};

export type UpdateHotelInput = {
  name?: string;
  address?: string;
  city?: string;
  province?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  checkInTime?: string;
  checkOutTime?: string;
  cancellationHours?: number;
  isActive?: boolean;
};

export type GetHotelsQuery = {
  page?: number;
  limit?: number;
  search?: string;
  city?: string;
  province?: string;
  minRating?: number;
  isActive?: boolean;
  ownerId?: string;
  sortBy?: 'name' | 'avgRating' | 'createdAt' | 'totalReview';
  sortOrder?: 'asc' | 'desc';
};
