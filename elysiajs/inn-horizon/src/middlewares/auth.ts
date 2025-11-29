import { Elysia } from "elysia";
import { verifyAccessToken } from "../utils/jwt";
import { prisma } from "../lib/prisma";

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  name: string | null;
  phone: string;
  isVerified: boolean;
}

/**
 * Authentication middleware
 * Verifies JWT token and attaches user to request
 */
export const authMiddleware = new Elysia({ name: "auth" }).derive(
  async ({ headers, set }) => {
    const authorization = headers.authorization;

    console.log(headers);

    if (!authorization || !authorization.startsWith("Bearer ")) {
      set.status = 401;
      throw new Error("Missing or invalid authorization header");
    }

    const token = authorization.substring(7); // Remove 'Bearer ' prefix
    const payload = verifyAccessToken(token);

    if (!payload) {
      set.status = 401;
      throw new Error("Invalid or expired token");
    }

    // Get user from database to ensure they still exist and aren't deleted
    const user = await prisma.user.findFirst({
      where: {
        id: payload.userId,
        deletedAt: null,
      },
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        phone: true,
        isVerified: true,
      },
    });

    if (!user) {
      set.status = 401;
      throw new Error("User not found or has been deleted");
    }

    return {
      user: user as AuthUser,
    };
  },
);

/**
 * Optional authentication middleware
 * Attaches user to request if token is valid, but doesn't throw error if not
 */
export const optionalAuthMiddleware = new Elysia({
  name: "optional-auth",
}).derive(async ({ headers }) => {
  const authorization = headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return { user: null };
  }

  const token = authorization.substring(7);
  const payload = verifyAccessToken(token);

  if (!payload) {
    return { user: null };
  }

  const user = await prisma.user.findFirst({
    where: {
      id: payload.userId,
      deletedAt: null,
    },
    select: {
      id: true,
      email: true,
      role: true,
      name: true,
      phone: true,
      isVerified: true,
    },
  });

  return {
    user: user as AuthUser | null,
  };
});

/**
 * Role-based access control middleware
 * Use after authMiddleware to check user role
 */
export const requireRole = (...allowedRoles: string[]) => {
  return new Elysia({ name: "role-guard" }).derive(({ user, set }: any) => {
    if (!user) {
      set.status = 401;
      throw new Error("Authentication required");
    }

    if (!allowedRoles.includes(user.role)) {
      set.status = 403;
      throw new Error(
        `Access denied. Required role: ${allowedRoles.join(" or ")}`,
      );
    }

    return {};
  });
};

/**
 * Require verified email middleware
 */
export const requireVerified = new Elysia({ name: "verified-guard" }).derive(
  ({ user, set }: any) => {
    if (!user) {
      set.status = 401;
      throw new Error("Authentication required");
    }

    if (!user.isVerified) {
      set.status = 403;
      throw new Error(
        "Email verification required. Please verify your email first.",
      );
    }

    return {};
  },
);
