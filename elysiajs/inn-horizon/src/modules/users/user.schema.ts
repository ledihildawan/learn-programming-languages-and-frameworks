import { t } from 'elysia';

// ====================== REQUEST DTOs ======================

export const UpdateProfileSchema = t.Object({
  name: t.Optional(t.String({
    minLength: 2,
    maxLength: 100,
    error: 'Name must be between 2-100 characters'
  })),
  phone: t.Optional(t.String({
    minLength: 10,
    maxLength: 15,
    pattern: '^[0-9+]+$',
    error: 'Valid phone number is required'
  })),
  // Bank information (for HOST role)
  bankName: t.Optional(t.String({
    maxLength: 100
  })),
  bankCode: t.Optional(t.String({
    maxLength: 20
  })),
  accountNumber: t.Optional(t.String({
    maxLength: 50
  })),
  accountName: t.Optional(t.String({
    maxLength: 100
  })),
});

export const UploadAvatarSchema = t.Object({
  avatar: t.File({
    type: ['image/jpeg', 'image/png', 'image/webp'],
    maxSize: 5 * 1024 * 1024, // 5MB
    error: 'Avatar must be a valid image file (JPEG, PNG, WEBP) and less than 5MB'
  }),
});

// ====================== QUERY DTOs ======================

export const GetUsersQuerySchema = t.Object({
  page: t.Optional(t.Numeric({
    minimum: 1,
    default: 1
  })),
  limit: t.Optional(t.Numeric({
    minimum: 1,
    maximum: 100,
    default: 20
  })),
  role: t.Optional(t.Union([
    t.Literal('ADMIN'),
    t.Literal('HOST'),
    t.Literal('CUSTOMER'),
  ])),
  search: t.Optional(t.String({
    minLength: 1,
    maxLength: 100
  })),
  isVerified: t.Optional(t.Boolean()),
});

// ====================== RESPONSE DTOs ======================

export const UserProfileSchema = t.Object({
  id: t.String(),
  email: t.String(),
  name: t.Union([t.String(), t.Null()]),
  phone: t.String(),
  role: t.String(),
  avatar: t.Union([t.String(), t.Null()]),
  isVerified: t.Boolean(),
  bankName: t.Union([t.String(), t.Null()]),
  bankCode: t.Union([t.String(), t.Null()]),
  accountNumber: t.Union([t.String(), t.Null()]),
  accountName: t.Union([t.String(), t.Null()]),
  walletBalance: t.String(),
  createdAt: t.String(),
  updatedAt: t.String(),
});

export const UsersListResponseSchema = t.Object({
  users: t.Array(UserProfileSchema),
  pagination: t.Object({
    page: t.Number(),
    limit: t.Number(),
    total: t.Number(),
    totalPages: t.Number(),
  }),
});

// ====================== TYPESCRIPT TYPES ======================

export type UpdateProfileDTO = {
  name?: string;
  phone?: string;
  bankName?: string;
  bankCode?: string;
  accountNumber?: string;
  accountName?: string;
};

export type UploadAvatarDTO = {
  avatar: File;
};

export type GetUsersQuery = {
  page?: number;
  limit?: number;
  role?: 'ADMIN' | 'HOST' | 'CUSTOMER';
  search?: string;
  isVerified?: boolean;
};

export type UserProfile = {
  id: string;
  email: string;
  name: string | null;
  phone: string;
  role: string;
  avatar: string | null;
  isVerified: boolean;
  bankName: string | null;
  bankCode: string | null;
  accountNumber: string | null;
  accountName: string | null;
  walletBalance: string;
  createdAt: string;
  updatedAt: string;
};

export type UsersListResponse = {
  users: UserProfile[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
