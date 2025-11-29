import { Elysia, t } from "elysia";
import { paymentService } from "./service";
import { authMiddleware } from "../../middlewares/auth";
import { AppError } from "../../utils/errors";
import {
  CreatePaymentDTO,
  PaymentQueryDTO,
  formatPaymentForResponse,
} from "./types";

export const paymentController = new Elysia({ prefix: "/payments" })
  .use(authMiddleware)

  /**
   * Create payment for booking
   * POST /payments
   */
  .post(
    "/",
    async ({ body, user, set }) => {
      try {
        if (!user) {
          throw new AppError("Authentication required", 401);
        }

        const { bookingId, provider } = body as any;

        const payment = await paymentService.createPayment(
          bookingId,
          user.sub,
          provider,
        );

        set.status = 201;
        return {
          success: true,
          data: formatPaymentForResponse(payment),
          message: "Payment created successfully",
        };
      } catch (error: any) {
        set.status = error.status || 500;
        return {
          success: false,
          error: error.message || "Failed to create payment",
        };
      }
    },
    {
      body: CreatePaymentDTO,
      detail: {
        tags: ["Payments"],
        summary: "Create payment",
        description: "Create payment for a booking",
      },
    },
  )

  /**
   * Get user's payments
   * GET /payments/my
   */
  .get(
    "/my",
    async ({ query, user, set }) => {
      try {
        if (!user) {
          throw new AppError("Authentication required", 401);
        }

        const {
          page = 1,
          limit = 10,
          status,
          provider,
          startDate,
          endDate,
        } = query as any;

        const filters: any = {
          userId: user.sub,
        };

        if (status) {
          filters.status = status;
        }

        if (provider) {
          filters.provider = provider;
        }

        if (startDate) {
          filters.startDate = new Date(startDate);
        }

        if (endDate) {
          filters.endDate = new Date(endDate);
        }

        const result = await paymentService.listPayments(
          filters,
          parseInt(page),
          parseInt(limit),
        );

        return {
          success: true,
          data: result.payments.map(formatPaymentForResponse),
          pagination: result.pagination,
        };
      } catch (error: any) {
        set.status = error.status || 500;
        return {
          success: false,
          error: error.message || "Failed to fetch payments",
        };
      }
    },
    {
      detail: {
        tags: ["Payments"],
        summary: "Get my payments",
        description: "Get all payments for the authenticated user",
      },
    },
  )

  /**
   * Get payment by ID
   * GET /payments/:id
   */
  .get(
    "/:id",
    async ({ params, user, set }) => {
      try {
        if (!user) {
          throw new AppError("Authentication required", 401);
        }

        const payment = await paymentService.getPaymentById(
          params.id,
          user.sub,
          user.role,
        );

        return {
          success: true,
          data: formatPaymentForResponse(payment),
        };
      } catch (error: any) {
        set.status = error.status || 500;
        return {
          success: false,
          error: error.message || "Failed to fetch payment",
        };
      }
    },
    {
      detail: {
        tags: ["Payments"],
        summary: "Get payment by ID",
        description: "Get detailed information about a specific payment",
      },
    },
  )

  /**
   * Get payment by booking ID
   * GET /payments/booking/:bookingId
   */
  .get(
    "/booking/:bookingId",
    async ({ params, user, set }) => {
      try {
        if (!user) {
          throw new AppError("Authentication required", 401);
        }

        const payment = await paymentService.getPaymentByBookingId(
          params.bookingId,
          user.sub,
          user.role,
        );

        return {
          success: true,
          data: formatPaymentForResponse(payment),
        };
      } catch (error: any) {
        set.status = error.status || 500;
        return {
          success: false,
          error: error.message || "Failed to fetch payment",
        };
      }
    },
    {
      detail: {
        tags: ["Payments"],
        summary: "Get payment by booking ID",
        description: "Get payment details for a specific booking",
      },
    },
  )

  /**
   * Check payment status
   * GET /payments/:id/status
   */
  .get(
    "/:id/status",
    async ({ params, user, set }) => {
      try {
        if (!user) {
          throw new AppError("Authentication required", 401);
        }

        const payment = await paymentService.checkPaymentStatus(
          params.id,
          user.sub,
          user.role,
        );

        return {
          success: true,
          data: formatPaymentForResponse(payment),
        };
      } catch (error: any) {
        set.status = error.status || 500;
        return {
          success: false,
          error: error.message || "Failed to check payment status",
        };
      }
    },
    {
      detail: {
        tags: ["Payments"],
        summary: "Check payment status",
        description: "Check current status of a payment from provider",
      },
    },
  )

  /**
   * Cancel payment
   * POST /payments/:id/cancel
   */
  .post(
    "/:id/cancel",
    async ({ params, user, set }) => {
      try {
        if (!user) {
          throw new AppError("Authentication required", 401);
        }

        const payment = await paymentService.cancelPayment(
          params.id,
          user.sub,
          user.role,
        );

        return {
          success: true,
          data: formatPaymentForResponse(payment),
          message: "Payment cancelled successfully",
        };
      } catch (error: any) {
        set.status = error.status || 500;
        return {
          success: false,
          error: error.message || "Failed to cancel payment",
        };
      }
    },
    {
      detail: {
        tags: ["Payments"],
        summary: "Cancel payment",
        description: "Cancel a pending payment",
      },
    },
  )

  /**
   * Refund payment (Admin only)
   * POST /payments/:id/refund
   */
  .post(
    "/:id/refund",
    async ({ params, body, user, set }) => {
      try {
        if (!user) {
          throw new AppError("Authentication required", 401);
        }

        if (user.role !== "ADMIN") {
          throw new AppError("Only admins can process refunds", 403);
        }

        const { reason } = (body as any) || {};

        const payment = await paymentService.refundPayment(
          params.id,
          user.sub,
          user.role,
          reason,
        );

        return {
          success: true,
          data: formatPaymentForResponse(payment),
          message: "Payment refunded successfully",
        };
      } catch (error: any) {
        set.status = error.status || 500;
        return {
          success: false,
          error: error.message || "Failed to refund payment",
        };
      }
    },
    {
      body: t.Object({
        reason: t.Optional(t.String({ maxLength: 500 })),
      }),
      detail: {
        tags: ["Payments - Admin"],
        summary: "Refund payment",
        description: "Process refund for a payment (Admin only)",
      },
    },
  )

  /**
   * Get payment statistics (Admin only)
   * GET /payments/admin/stats
   */
  .get(
    "/admin/stats",
    async ({ query, user, set }) => {
      try {
        if (!user) {
          throw new AppError("Authentication required", 401);
        }

        if (user.role !== "ADMIN") {
          throw new AppError("Only admins can access payment statistics", 403);
        }

        const { startDate, endDate } = query as any;

        const filters: any = {};

        if (startDate) {
          filters.startDate = new Date(startDate);
        }

        if (endDate) {
          filters.endDate = new Date(endDate);
        }

        const stats = await paymentService.getPaymentStats(filters);

        return {
          success: true,
          data: stats,
        };
      } catch (error: any) {
        set.status = error.status || 500;
        return {
          success: false,
          error: error.message || "Failed to fetch payment statistics",
        };
      }
    },
    {
      detail: {
        tags: ["Payments - Admin"],
        summary: "Get payment statistics",
        description: "Get payment statistics (Admin only)",
      },
    },
  )

  /**
   * List all payments (Admin only)
   * GET /payments/admin/all
   */
  .get(
    "/admin/all",
    async ({ query, user, set }) => {
      try {
        if (!user) {
          throw new AppError("Authentication required", 401);
        }

        if (user.role !== "ADMIN") {
          throw new AppError("Only admins can access all payments", 403);
        }

        const {
          page = 1,
          limit = 10,
          status,
          provider,
          startDate,
          endDate,
        } = query as any;

        const filters: any = {};

        if (status) {
          filters.status = status;
        }

        if (provider) {
          filters.provider = provider;
        }

        if (startDate) {
          filters.startDate = new Date(startDate);
        }

        if (endDate) {
          filters.endDate = new Date(endDate);
        }

        const result = await paymentService.listPayments(
          filters,
          parseInt(page),
          parseInt(limit),
        );

        return {
          success: true,
          data: result.payments.map(formatPaymentForResponse),
          pagination: result.pagination,
        };
      } catch (error: any) {
        set.status = error.status || 500;
        return {
          success: false,
          error: error.message || "Failed to fetch payments",
        };
      }
    },
    {
      detail: {
        tags: ["Payments - Admin"],
        summary: "Get all payments",
        description: "Get all payments in the system (Admin only)",
      },
    },
  );
