import { Elysia } from "elysia";
import { paymentService } from "../payments/service";
import { AppError } from "../../utils/errors";

export const webhookController = new Elysia({ prefix: "/webhooks" })
  /**
   * Midtrans payment notification webhook
   * POST /webhooks/midtrans
   */
  .post(
    "/midtrans",
    async ({ body, set }) => {
      try {
        console.log("Received Midtrans webhook:", JSON.stringify(body, null, 2));

        // Process payment notification
        const payment = await paymentService.processPaymentNotification(body);

        return {
          success: true,
          message: "Notification processed successfully",
          data: {
            paymentId: payment.id,
            status: payment.status,
          },
        };
      } catch (error: any) {
        console.error("Webhook processing error:", error);
        set.status = error.status || 500;
        return {
          success: false,
          error: error.message || "Failed to process notification",
        };
      }
    },
    {
      detail: {
        tags: ["Webhooks"],
        summary: "Midtrans payment notification",
        description: "Webhook endpoint for Midtrans payment notifications",
      },
    }
  )

  /**
   * Test webhook endpoint
   * POST /webhooks/test
   */
  .post(
    "/test",
    async ({ body, set }) => {
      try {
        console.log("Test webhook received:", JSON.stringify(body, null, 2));

        return {
          success: true,
          message: "Test webhook received successfully",
          received: body,
          timestamp: new Date().toISOString(),
        };
      } catch (error: any) {
        set.status = error.status || 500;
        return {
          success: false,
          error: error.message || "Failed to process test webhook",
        };
      }
    },
    {
      detail: {
        tags: ["Webhooks"],
        summary: "Test webhook",
        description: "Test webhook endpoint for debugging",
      },
    }
  )

  /**
   * Health check for webhooks
   * GET /webhooks/health
   */
  .get(
    "/health",
    async () => {
      return {
        success: true,
        status: "ok",
        timestamp: new Date().toISOString(),
        endpoints: {
          midtrans: "/webhooks/midtrans",
          test: "/webhooks/test",
        },
      };
    },
    {
      detail: {
        tags: ["Webhooks"],
        summary: "Webhook health check",
        description: "Check if webhook endpoints are operational",
      },
    }
  );
