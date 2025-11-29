import { Elysia } from 'elysia';
import { authMiddleware } from '../../middlewares/auth';
import {
  RegisterSchema,
  LoginSchema,
  RefreshTokenSchema,
  ChangePasswordSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  VerifyEmailSchema,
  ResendVerificationSchema,
} from './auth.schema';
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  changePassword,
  verifyEmail,
  resendVerificationEmail,
  requestPasswordReset,
  resetPassword,
  getUserProfile,
} from './auth.service';

export const authRoute = new Elysia({ prefix: '/auth' })
  // ====================== PUBLIC ROUTES ======================

  /**
   * @route POST /api/auth/register
   * @desc Register a new user (Customer or Host)
   * @access Public
   */
  .post(
    '/register',
    async ({ body, set }) => {
      try {
        const result = await registerUser(body);
        set.status = 201;
        return {
          success: true,
          message: 'Registration successful',
          data: result,
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          error: error.message || 'Registration failed',
        };
      }
    },
    {
      body: RegisterSchema,
      detail: {
        tags: ['Auth'],
        summary: 'Register new user',
        description: 'Create a new user account (CUSTOMER or HOST role)',
      },
    },
  )

  /**
   * @route POST /api/auth/login
   * @desc Login user and get access token
   * @access Public
   */
  .post(
    '/login',
    async ({ body, set }) => {
      try {
        const result = await loginUser(body);
        return {
          success: true,
          message: 'Login successful',
          data: result,
        };
      } catch (error: any) {
        set.status = 401;
        return {
          success: false,
          error: error.message || 'Login failed',
        };
      }
    },
    {
      body: LoginSchema,
      detail: {
        tags: ['Auth'],
        summary: 'Login user',
        description: 'Authenticate user and receive JWT tokens',
      },
    },
  )

  /**
   * @route POST /api/auth/refresh
   * @desc Refresh access token using refresh token
   * @access Public
   */
  .post(
    '/refresh',
    async ({ body, set }) => {
      try {
        const tokens = await refreshAccessToken(body);
        return {
          success: true,
          message: 'Token refreshed successfully',
          data: tokens,
        };
      } catch (error: any) {
        set.status = 401;
        return {
          success: false,
          error: error.message || 'Token refresh failed',
        };
      }
    },
    {
      body: RefreshTokenSchema,
      detail: {
        tags: ['Auth'],
        summary: 'Refresh access token',
        description: 'Get new access token using refresh token',
      },
    },
  )

  /**
   * @route POST /api/auth/verify-email
   * @desc Verify user email address
   * @access Public
   */
  .post(
    '/verify-email',
    async ({ body, set }) => {
      try {
        await verifyEmail(body.token);
        return {
          success: true,
          message: 'Email verified successfully',
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          error: error.message || 'Email verification failed',
        };
      }
    },
    {
      body: VerifyEmailSchema,
      detail: {
        tags: ['Auth'],
        summary: 'Verify email',
        description: 'Verify user email address with token',
      },
    },
  )

  /**
   * @route POST /api/auth/resend-verification
   * @desc Resend email verification link
   * @access Public
   */
  .post(
    '/resend-verification',
    async ({ body, set }) => {
      try {
        await resendVerificationEmail(body.email);
        return {
          success: true,
          message: 'Verification email sent successfully',
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          error: error.message || 'Failed to resend verification email',
        };
      }
    },
    {
      body: ResendVerificationSchema,
      detail: {
        tags: ['Auth'],
        summary: 'Resend verification email',
        description: 'Request new email verification link',
      },
    },
  )

  /**
   * @route POST /api/auth/forgot-password
   * @desc Request password reset link
   * @access Public
   */
  .post(
    '/forgot-password',
    async ({ body, set }) => {
      try {
        await requestPasswordReset(body.email);
        return {
          success: true,
          message: 'Password reset instructions sent to your email',
        };
      } catch (error: any) {
        // Don't reveal if email exists or not
        return {
          success: true,
          message: 'If the email exists, password reset instructions have been sent',
        };
      }
    },
    {
      body: ForgotPasswordSchema,
      detail: {
        tags: ['Auth'],
        summary: 'Forgot password',
        description: 'Request password reset link via email',
      },
    },
  )

  /**
   * @route POST /api/auth/reset-password
   * @desc Reset password with token
   * @access Public
   */
  .post(
    '/reset-password',
    async ({ body, set }) => {
      try {
        await resetPassword(body.token, body.newPassword);
        return {
          success: true,
          message: 'Password reset successfully',
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          error: error.message || 'Password reset failed',
        };
      }
    },
    {
      body: ResetPasswordSchema,
      detail: {
        tags: ['Auth'],
        summary: 'Reset password',
        description: 'Reset password using reset token',
      },
    },
  )

  // ====================== PROTECTED ROUTES ======================

  /**
   * @route GET /api/auth/me
   * @desc Get current user profile
   * @access Private
   */
  .use(authMiddleware)
  .get(
    '/me',
    async ({ user, set }) => {
      try {
        const profile = await getUserProfile(user.id);
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
        tags: ['Auth'],
        summary: 'Get current user',
        description: 'Get authenticated user profile',
        security: [{ bearerAuth: [] }],
      },
    },
  )

  /**
   * @route POST /api/auth/change-password
   * @desc Change user password
   * @access Private
   */
  .post(
    '/change-password',
    async ({ user, body, set }) => {
      try {
        await changePassword(user.id, body.currentPassword, body.newPassword);
        return {
          success: true,
          message: 'Password changed successfully',
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          error: error.message || 'Password change failed',
        };
      }
    },
    {
      body: ChangePasswordSchema,
      detail: {
        tags: ['Auth'],
        summary: 'Change password',
        description: 'Change authenticated user password',
        security: [{ bearerAuth: [] }],
      },
    },
  )

  /**
   * @route POST /api/auth/logout
   * @desc Logout user (client-side token removal)
   * @access Private
   */
  .post(
    '/logout',
    async ({ set }) => {
      // In JWT authentication, logout is typically handled client-side
      // by removing the token from storage
      // We can add token blacklist here if needed in the future
      return {
        success: true,
        message: 'Logged out successfully',
      };
    },
    {
      detail: {
        tags: ['Auth'],
        summary: 'Logout user',
        description: 'Logout current user (remove tokens client-side)',
        security: [{ bearerAuth: [] }],
      },
    },
  );
