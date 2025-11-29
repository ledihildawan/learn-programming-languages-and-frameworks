import { Elysia, t } from 'elysia';
import { authMiddleware, requireRole } from '../../middlewares/auth';
import {
  UpdateProfileSchema,
  GetUsersQuerySchema,
} from './user.schema';
import {
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  deleteUserAvatar,
  getUsers,
  deleteUserAccount,
  updateUserVerification,
  updateUserRole,
  getUserStatistics,
} from './user.service';

export const usersRoute = new Elysia({ prefix: '/users' })
  // ====================== PROTECTED ROUTES (All authenticated users) ======================
  .use(authMiddleware)

  /**
   * @route GET /api/users/profile
   * @desc Get current user profile
   * @access Private
   */
  .get(
    '/profile',
    async ({ user, set }) => {
      try {
        const profile = await getUserById(user.id);
        return {
          success: true,
          data: profile,
        };
      } catch (error: any) {
        set.status = 404;
        return {
          success: false,
          error: error.message || 'Failed to get profile',
        };
      }
    },
    {
      detail: {
        tags: ['Users'],
        summary: 'Get current user profile',
        description: 'Get authenticated user profile information',
        security: [{ bearerAuth: [] }],
      },
    },
  )

  /**
   * @route PUT /api/users/profile
   * @desc Update current user profile
   * @access Private
   */
  .put(
    '/profile',
    async ({ user, body, set }) => {
      try {
        const updatedProfile = await updateUserProfile(user.id, body);
        return {
          success: true,
          message: 'Profile updated successfully',
          data: updatedProfile,
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          error: error.message || 'Failed to update profile',
        };
      }
    },
    {
      body: UpdateProfileSchema,
      detail: {
        tags: ['Users'],
        summary: 'Update user profile',
        description: 'Update authenticated user profile information',
        security: [{ bearerAuth: [] }],
      },
    },
  )

  /**
   * @route POST /api/users/avatar
   * @desc Upload user avatar
   * @access Private
   */
  .post(
    '/avatar',
    async ({ user, body, set }) => {
      try {
        // For now, we'll just save the file name
        // In production, you'd upload to cloud storage (S3, Cloudinary, etc.)
        const file = body.avatar;
        const fileName = `avatars/${user.id}-${Date.now()}-${file.name}`;

        // TODO: Implement actual file upload to storage
        // For now, we'll use a placeholder URL
        const avatarUrl = `/uploads/${fileName}`;

        const updatedProfile = await updateUserAvatar(user.id, avatarUrl);

        return {
          success: true,
          message: 'Avatar uploaded successfully',
          data: updatedProfile,
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          error: error.message || 'Failed to upload avatar',
        };
      }
    },
    {
      body: t.Object({
        avatar: t.File({
          type: ['image/jpeg', 'image/png', 'image/webp'],
          maxSize: 5 * 1024 * 1024, // 5MB
        }),
      }),
      detail: {
        tags: ['Users'],
        summary: 'Upload avatar',
        description: 'Upload user profile avatar image',
        security: [{ bearerAuth: [] }],
      },
    },
  )

  /**
   * @route DELETE /api/users/avatar
   * @desc Delete user avatar
   * @access Private
   */
  .delete(
    '/avatar',
    async ({ user, set }) => {
      try {
        const updatedProfile = await deleteUserAvatar(user.id);
        return {
          success: true,
          message: 'Avatar deleted successfully',
          data: updatedProfile,
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          error: error.message || 'Failed to delete avatar',
        };
      }
    },
    {
      detail: {
        tags: ['Users'],
        summary: 'Delete avatar',
        description: 'Remove user profile avatar',
        security: [{ bearerAuth: [] }],
      },
    },
  )

  /**
   * @route DELETE /api/users/account
   * @desc Delete user account (soft delete)
   * @access Private
   */
  .delete(
    '/account',
    async ({ user, set }) => {
      try {
        await deleteUserAccount(user.id);
        return {
          success: true,
          message: 'Account deleted successfully',
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          error: error.message || 'Failed to delete account',
        };
      }
    },
    {
      detail: {
        tags: ['Users'],
        summary: 'Delete account',
        description: 'Soft delete user account (cannot be undone)',
        security: [{ bearerAuth: [] }],
      },
    },
  )

  // ====================== ADMIN ONLY ROUTES ======================
  .use(requireRole('ADMIN'))

  /**
   * @route GET /api/users
   * @desc Get list of users with filters
   * @access Private (Admin only)
   */
  .get(
    '/',
    async ({ query, set }) => {
      try {
        const result = await getUsers(query);
        return {
          success: true,
          data: result,
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          error: error.message || 'Failed to get users',
        };
      }
    },
    {
      query: GetUsersQuerySchema,
      detail: {
        tags: ['Users', 'Admin'],
        summary: 'Get users list',
        description: 'Get paginated list of users with filters (Admin only)',
        security: [{ bearerAuth: [] }],
      },
    },
  )

  /**
   * @route GET /api/users/statistics
   * @desc Get user statistics
   * @access Private (Admin only)
   */
  .get(
    '/statistics',
    async ({ set }) => {
      try {
        const stats = await getUserStatistics();
        return {
          success: true,
          data: stats,
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          error: error.message || 'Failed to get statistics',
        };
      }
    },
    {
      detail: {
        tags: ['Users', 'Admin'],
        summary: 'Get user statistics',
        description: 'Get user statistics for admin dashboard',
        security: [{ bearerAuth: [] }],
      },
    },
  )

  /**
   * @route GET /api/users/:id
   * @desc Get user by ID
   * @access Private (Admin only)
   */
  .get(
    '/:id',
    async ({ params, set }) => {
      try {
        const user = await getUserById(params.id);
        return {
          success: true,
          data: user,
        };
      } catch (error: any) {
        set.status = 404;
        return {
          success: false,
          error: error.message || 'User not found',
        };
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        tags: ['Users', 'Admin'],
        summary: 'Get user by ID',
        description: 'Get specific user information by ID (Admin only)',
        security: [{ bearerAuth: [] }],
      },
    },
  )

  /**
   * @route PATCH /api/users/:id/verify
   * @desc Update user verification status
   * @access Private (Admin only)
   */
  .patch(
    '/:id/verify',
    async ({ params, body, set }) => {
      try {
        const user = await updateUserVerification(params.id, body.isVerified);
        return {
          success: true,
          message: 'User verification status updated',
          data: user,
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          error: error.message || 'Failed to update verification status',
        };
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        isVerified: t.Boolean(),
      }),
      detail: {
        tags: ['Users', 'Admin'],
        summary: 'Update user verification',
        description: 'Update user email verification status (Admin only)',
        security: [{ bearerAuth: [] }],
      },
    },
  )

  /**
   * @route PATCH /api/users/:id/role
   * @desc Update user role
   * @access Private (Admin only)
   */
  .patch(
    '/:id/role',
    async ({ params, body, set }) => {
      try {
        const user = await updateUserRole(params.id, body.role);
        return {
          success: true,
          message: 'User role updated',
          data: user,
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          error: error.message || 'Failed to update role',
        };
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        role: t.Union([
          t.Literal('ADMIN'),
          t.Literal('HOST'),
          t.Literal('CUSTOMER'),
        ]),
      }),
      detail: {
        tags: ['Users', 'Admin'],
        summary: 'Update user role',
        description: 'Update user role (Admin only)',
        security: [{ bearerAuth: [] }],
      },
    },
  )

  /**
   * @route DELETE /api/users/:id
   * @desc Delete user account (Admin)
   * @access Private (Admin only)
   */
  .delete(
    '/:id',
    async ({ params, set }) => {
      try {
        await deleteUserAccount(params.id);
        return {
          success: true,
          message: 'User account deleted successfully',
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          error: error.message || 'Failed to delete user account',
        };
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        tags: ['Users', 'Admin'],
        summary: 'Delete user',
        description: 'Soft delete user account by ID (Admin only)',
        security: [{ bearerAuth: [] }],
      },
    },
  );
