import { prisma } from '../../lib/prisma';
import { hashPassword, comparePassword, validatePasswordStrength } from '../../utils/hash';
import { generateTokenPair, verifyRefreshToken } from '../../utils/jwt';
import type { RegisterDTO, LoginDTO, RefreshTokenDTO, AuthResponse, UserResponse } from './auth.schema';

/**
 * Register a new user
 */
export async function registerUser(data: RegisterDTO): Promise<AuthResponse> {
  // Validate password strength
  const passwordValidation = validatePasswordStrength(data.password);
  if (!passwordValidation.isValid) {
    throw new Error(passwordValidation.error);
  }

  // Check if email already exists
  const existingEmail = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingEmail) {
    throw new Error('Email already registered');
  }

  // Check if phone already exists
  const existingPhone = await prisma.user.findUnique({
    where: { phone: data.phone },
  });

  if (existingPhone) {
    throw new Error('Phone number already registered');
  }

  // Validate role-specific requirements
  if (data.role === 'HOST') {
    // For HOST, we might want to require bank info (optional for now)
    if (data.accountNumber && !data.bankName) {
      throw new Error('Bank name is required when account number is provided');
    }
  }

  // Hash password
  const hashedPassword = await hashPassword(data.password);

  // Create user
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      phone: data.phone,
      role: data.role || 'CUSTOMER',
      bankName: data.bankName,
      bankCode: data.bankCode,
      accountNumber: data.accountNumber,
      accountName: data.accountName,
      isVerified: false, // Email verification disabled for now, set to false
    },
  });

  // Generate tokens
  const tokens = generateTokenPair({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  // TODO: Send verification email
  // await sendVerificationEmail(user.email, verificationToken);

  return {
    user: formatUserResponse(user),
    tokens,
  };
}

/**
 * Login user
 */
export async function loginUser(data: LoginDTO): Promise<AuthResponse> {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check if user is deleted
  if (user.deletedAt) {
    throw new Error('Account has been deleted');
  }

  // Verify password
  const isPasswordValid = await comparePassword(data.password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate tokens
  const tokens = generateTokenPair({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    user: formatUserResponse(user),
    tokens,
  };
}

/**
 * Refresh access token
 */
export async function refreshAccessToken(data: RefreshTokenDTO): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  // Verify refresh token
  const payload = verifyRefreshToken(data.refreshToken);

  if (!payload) {
    throw new Error('Invalid or expired refresh token');
  }

  // Get user from database
  const user = await prisma.user.findFirst({
    where: {
      id: payload.userId,
      deletedAt: null,
    },
  });

  if (!user) {
    throw new Error('User not found or has been deleted');
  }

  // Generate new token pair
  const tokens = generateTokenPair({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  return tokens;
}

/**
 * Change user password
 */
export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
): Promise<void> {
  // Validate new password strength
  const passwordValidation = validatePasswordStrength(newPassword);
  if (!passwordValidation.isValid) {
    throw new Error(passwordValidation.error);
  }

  // Get user
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Verify current password
  const isPasswordValid = await comparePassword(currentPassword, user.password);

  if (!isPasswordValid) {
    throw new Error('Current password is incorrect');
  }

  // Check if new password is same as current
  const isSamePassword = await comparePassword(newPassword, user.password);
  if (isSamePassword) {
    throw new Error('New password must be different from current password');
  }

  // Hash new password
  const hashedPassword = await hashPassword(newPassword);

  // Update password
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
}

/**
 * Verify email (simplified version - token-based verification)
 */
export async function verifyEmail(token: string): Promise<void> {
  // This is a simplified version
  // In production, you would:
  // 1. Verify the token (JWT or random token stored in DB)
  // 2. Extract user ID from token
  // 3. Mark user as verified

  // For now, we'll decode a JWT token
  const { verifyAccessToken } = await import('../../utils/jwt');
  const payload = verifyAccessToken(token);

  if (!payload) {
    throw new Error('Invalid or expired verification token');
  }

  // Update user verification status
  await prisma.user.update({
    where: { id: payload.userId },
    data: { isVerified: true },
  });
}

/**
 * Resend verification email
 */
export async function resendVerificationEmail(email: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.isVerified) {
    throw new Error('Email already verified');
  }

  // TODO: Generate verification token and send email
  // const verificationToken = generateAccessToken({
  //   userId: user.id,
  //   email: user.email,
  //   role: user.role,
  // });
  // await sendVerificationEmail(user.email, verificationToken);
}

/**
 * Request password reset
 */
export async function requestPasswordReset(email: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    // Don't reveal if email exists or not for security
    return;
  }

  if (user.deletedAt) {
    return;
  }

  // TODO: Generate reset token and send email
  // const resetToken = generateAccessToken({
  //   userId: user.id,
  //   email: user.email,
  //   role: user.role,
  // });
  // await sendPasswordResetEmail(user.email, resetToken);
}

/**
 * Reset password with token
 */
export async function resetPassword(token: string, newPassword: string): Promise<void> {
  // Validate new password strength
  const passwordValidation = validatePasswordStrength(newPassword);
  if (!passwordValidation.isValid) {
    throw new Error(passwordValidation.error);
  }

  // Verify token
  const { verifyAccessToken } = await import('../../utils/jwt');
  const payload = verifyAccessToken(token);

  if (!payload) {
    throw new Error('Invalid or expired reset token');
  }

  // Get user
  const user = await prisma.user.findFirst({
    where: {
      id: payload.userId,
      deletedAt: null,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Hash new password
  const hashedPassword = await hashPassword(newPassword);

  // Update password
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });
}

/**
 * Get user profile
 */
export async function getUserProfile(userId: string): Promise<UserResponse> {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      deletedAt: null,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return formatUserResponse(user);
}

/**
 * Format user response (exclude sensitive data)
 */
function formatUserResponse(user: any): UserResponse {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    role: user.role,
    avatar: user.avatar,
    isVerified: user.isVerified,
    bankName: user.bankName,
    bankCode: user.bankCode,
    accountNumber: user.accountNumber,
    accountName: user.accountName,
    walletBalance: user.walletBalance.toString(),
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}
