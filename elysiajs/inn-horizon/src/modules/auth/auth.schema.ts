import { t } from 'elysia';

// ====================== REQUEST DTOs ======================

export const RegisterSchema = t.Object({
  email: t.String({
    format: 'email',
    error: 'Valid email is required'
  }),
  password: t.String({
    minLength: 8,
    maxLength: 72,
    error: 'Password must be between 8-72 characters'
  }),
  name: t.Optional(t.String({
    minLength: 2,
    maxLength: 100
  })),
  phone: t.String({
    minLength: 10,
    maxLength: 15,
    pattern: '^[0-9+]+$',
    error: 'Valid phone number is required'
  }),
  role: t.Optional(t.Union([
    t.Literal('CUSTOMER'),
    t.Literal('HOST'),
  ], {
    default: 'CUSTOMER'
  })),
  // Bank info (optional, for HOST)
  bankName: t.Optional(t.String()),
  bankCode: t.Optional(t.String()),
  accountNumber: t.Optional(t.String()),
  accountName: t.Optional(t.String()),
});

export const LoginSchema = t.Object({
  email: t.String({
    format: 'email',
    error: 'Valid email is required'
  }),
  password: t.String({
    error: 'Password is required'
  }),
});

export const RefreshTokenSchema = t.Object({
  refreshToken: t.String({
    error: 'Refresh token is required'
  }),
});

export const ChangePasswordSchema = t.Object({
  currentPassword: t.String({
    error: 'Current password is required'
  }),
  newPassword: t.String({
    minLength: 8,
    maxLength: 72,
    error: 'New password must be between 8-72 characters'
  }),
});

export const ForgotPasswordSchema = t.Object({
  email: t.String({
    format: 'email',
    error: 'Valid email is required'
  }),
});

export const ResetPasswordSchema = t.Object({
  token: t.String({
    error: 'Reset token is required'
  }),
  newPassword: t.String({
    minLength: 8,
    maxLength: 72,
    error: 'New password must be between 8-72 characters'
  }),
});

export const VerifyEmailSchema = t.Object({
  token: t.String({
    error: 'Verification token is required'
  }),
});

export const ResendVerificationSchema = t.Object({
  email: t.String({
    format: 'email',
    error: 'Valid email is required'
  }),
});

// ====================== RESPONSE DTOs ======================

export const UserResponseSchema = t.Object({
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
  walletBalance: t.String(), // Decimal as string
  createdAt: t.String(),
  updatedAt: t.String(),
});

export const AuthResponseSchema = t.Object({
  user: UserResponseSchema,
  tokens: t.Object({
    accessToken: t.String(),
    refreshToken: t.String(),
  }),
});

export const LoginResponseSchema = AuthResponseSchema;

export const RefreshTokenResponseSchema = t.Object({
  accessToken: t.String(),
  refreshToken: t.String(),
});

// ====================== TYPESCRIPT TYPES ======================

export type RegisterDTO = {
  email: string;
  password: string;
  name?: string;
  phone: string;
  role?: 'CUSTOMER' | 'HOST';
  bankName?: string;
  bankCode?: string;
  accountNumber?: string;
  accountName?: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};

export type RefreshTokenDTO = {
  refreshToken: string;
};

export type ChangePasswordDTO = {
  currentPassword: string;
  newPassword: string;
};

export type ForgotPasswordDTO = {
  email: string;
};

export type ResetPasswordDTO = {
  token: string;
  newPassword: string;
};

export type VerifyEmailDTO = {
  token: string;
};

export type ResendVerificationDTO = {
  email: string;
};

export type UserResponse = {
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

export type AuthResponse = {
  user: UserResponse;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};
