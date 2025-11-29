import { prisma } from '../../lib/prisma';
import type { UpdateProfileDTO, GetUsersQuery, UserProfile, UsersListResponse } from './user.schema';

/**
 * Get user profile by ID
 */
export async function getUserById(userId: string): Promise<UserProfile> {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      deletedAt: null,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return formatUserProfile(user);
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  data: UpdateProfileDTO,
): Promise<UserProfile> {
  // Check if user exists
  const existingUser = await prisma.user.findFirst({
    where: {
      id: userId,
      deletedAt: null,
    },
  });

  if (!existingUser) {
    throw new Error('User not found');
  }

  // If phone is being updated, check if it's already taken
  if (data.phone && data.phone !== existingUser.phone) {
    const phoneExists = await prisma.user.findFirst({
      where: {
        phone: data.phone,
        id: { not: userId },
        deletedAt: null,
      },
    });

    if (phoneExists) {
      throw new Error('Phone number already in use');
    }
  }

  // Validate bank info consistency
  if (data.accountNumber && !data.bankName && !existingUser.bankName) {
    throw new Error('Bank name is required when account number is provided');
  }

  // Update user
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      phone: data.phone,
      bankName: data.bankName,
      bankCode: data.bankCode,
      accountNumber: data.accountNumber,
      accountName: data.accountName,
    },
  });

  return formatUserProfile(updatedUser);
}

/**
 * Update user avatar
 */
export async function updateUserAvatar(
  userId: string,
  avatarUrl: string,
): Promise<UserProfile> {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { avatar: avatarUrl },
  });

  return formatUserProfile(user);
}

/**
 * Delete user avatar
 */
export async function deleteUserAvatar(userId: string): Promise<UserProfile> {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { avatar: null },
  });

  return formatUserProfile(user);
}

/**
 * Get list of users (Admin only)
 */
export async function getUsers(query: GetUsersQuery): Promise<UsersListResponse> {
  const page = query.page || 1;
  const limit = query.limit || 20;
  const skip = (page - 1) * limit;

  // Build where clause
  const where: any = {
    deletedAt: null,
  };

  if (query.role) {
    where.role = query.role;
  }

  if (query.isVerified !== undefined) {
    where.isVerified = query.isVerified;
  }

  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: 'insensitive' } },
      { email: { contains: query.search, mode: 'insensitive' } },
      { phone: { contains: query.search } },
    ];
  }

  // Get total count
  const total = await prisma.user.count({ where });

  // Get users
  const users = await prisma.user.findMany({
    where,
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });

  return {
    users: users.map(formatUserProfile),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Soft delete user account
 */
export async function deleteUserAccount(userId: string): Promise<void> {
  // Check if user exists
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      deletedAt: null,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Check if user has active bookings
  const activeBookings = await prisma.booking.count({
    where: {
      userId: userId,
      status: {
        in: ['PENDING', 'PAID', 'CONFIRMED', 'CHECKED_IN'],
      },
    },
  });

  if (activeBookings > 0) {
    throw new Error('Cannot delete account with active bookings. Please complete or cancel them first.');
  }

  // If user is a host, check if they have active hotels
  if (user.role === 'HOST') {
    const activeHotels = await prisma.hotel.count({
      where: {
        ownerId: userId,
        isActive: true,
        deletedAt: null,
      },
    });

    if (activeHotels > 0) {
      throw new Error('Cannot delete account with active hotels. Please deactivate them first.');
    }
  }

  // Soft delete user
  await prisma.user.update({
    where: { id: userId },
    data: { deletedAt: new Date() },
  });
}

/**
 * Admin: Update user verification status
 */
export async function updateUserVerification(
  userId: string,
  isVerified: boolean,
): Promise<UserProfile> {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { isVerified },
  });

  return formatUserProfile(user);
}

/**
 * Admin: Update user role
 */
export async function updateUserRole(
  userId: string,
  role: 'ADMIN' | 'HOST' | 'CUSTOMER',
): Promise<UserProfile> {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  return formatUserProfile(user);
}

/**
 * Get user statistics (for admin dashboard)
 */
export async function getUserStatistics() {
  const [totalUsers, totalCustomers, totalHosts, totalAdmins, verifiedUsers] = await Promise.all([
    prisma.user.count({ where: { deletedAt: null } }),
    prisma.user.count({ where: { role: 'CUSTOMER', deletedAt: null } }),
    prisma.user.count({ where: { role: 'HOST', deletedAt: null } }),
    prisma.user.count({ where: { role: 'ADMIN', deletedAt: null } }),
    prisma.user.count({ where: { isVerified: true, deletedAt: null } }),
  ]);

  return {
    totalUsers,
    totalCustomers,
    totalHosts,
    totalAdmins,
    verifiedUsers,
    unverifiedUsers: totalUsers - verifiedUsers,
  };
}

/**
 * Format user profile response
 */
function formatUserProfile(user: any): UserProfile {
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
