import { MidtransClient } from "midtrans-client";
import {
  MidtransCreateTransactionRequest,
  MidtransTransactionResponse,
  MidtransNotification,
  PAYMENT_CONSTANTS,
  generateOrderId,
  mapMidtransStatus,
  validateMidtransSignature,
} from "./types";
import { AppError } from "../../utils/errors";

export class MidtransService {
  private snap: any;
  private core: any;
  private serverKey: string;
  private isProduction: boolean;

  constructor() {
    this.serverKey = process.env.MIDTRANS_SERVER_KEY || "";
    this.isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";

    if (!this.serverKey) {
      console.warn("MIDTRANS_SERVER_KEY is not set. Payment features will not work.");
    }

    // Initialize Snap API
    this.snap = new MidtransClient.Snap({
      isProduction: this.isProduction,
      serverKey: this.serverKey,
      clientKey: process.env.MIDTRANS_CLIENT_KEY || "",
    });

    // Initialize Core API
    this.core = new MidtransClient.CoreApi({
      isProduction: this.isProduction,
      serverKey: this.serverKey,
      clientKey: process.env.MIDTRANS_CLIENT_KEY || "",
    });
  }

  /**
   * Create Midtrans transaction and get Snap token
   */
  async createTransaction(
    bookingCode: string,
    amount: number,
    customerName: string,
    customerEmail: string | undefined,
    customerPhone: string,
    itemDetails: {
      id: string;
      name: string;
      price: number;
      quantity: number;
    }[]
  ): Promise<MidtransTransactionResponse> {
    try {
      if (!this.serverKey) {
        throw new AppError("Payment service is not configured", 500);
      }

      // Generate unique order ID
      const orderId = generateOrderId(bookingCode);

      // Split customer name
      const nameParts = customerName.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || firstName;

      // Prepare transaction request
      const parameter: MidtransCreateTransactionRequest = {
        transaction_details: {
          order_id: orderId,
          gross_amount: amount,
        },
        item_details: itemDetails,
        customer_details: {
          first_name: firstName,
          last_name: lastName,
          email: customerEmail,
          phone: customerPhone,
        },
        enabled_payments: PAYMENT_CONSTANTS.MIDTRANS_ENABLED_PAYMENTS,
        expiry: {
          unit: PAYMENT_CONSTANTS.MIDTRANS_EXPIRY_UNIT,
          duration: PAYMENT_CONSTANTS.MIDTRANS_EXPIRY_DURATION,
        },
      };

      // Create transaction
      const transaction = await this.snap.createTransaction(parameter);

      return {
        token: transaction.token,
        redirect_url: transaction.redirect_url,
      };
    } catch (error: any) {
      console.error("Midtrans create transaction error:", error);
      throw new AppError(
        error.message || "Failed to create payment transaction",
        500
      );
    }
  }

  /**
   * Check transaction status
   */
  async checkTransactionStatus(orderId: string): Promise<any> {
    try {
      if (!this.serverKey) {
        throw new AppError("Payment service is not configured", 500);
      }

      const status = await this.core.transaction.status(orderId);
      return status;
    } catch (error: any) {
      console.error("Midtrans check status error:", error);
      throw new AppError(
        error.message || "Failed to check transaction status",
        500
      );
    }
  }

  /**
   * Cancel transaction
   */
  async cancelTransaction(orderId: string): Promise<any> {
    try {
      if (!this.serverKey) {
        throw new AppError("Payment service is not configured", 500);
      }

      const result = await this.core.transaction.cancel(orderId);
      return result;
    } catch (error: any) {
      console.error("Midtrans cancel transaction error:", error);
      throw new AppError(
        error.message || "Failed to cancel transaction",
        500
      );
    }
  }

  /**
   * Refund transaction
   */
  async refundTransaction(
    orderId: string,
    amount?: number,
    reason?: string
  ): Promise<any> {
    try {
      if (!this.serverKey) {
        throw new AppError("Payment service is not configured", 500);
      }

      const parameter: any = {};

      if (amount) {
        parameter.refund_amount = amount;
      }

      if (reason) {
        parameter.reason = reason;
      }

      const result = await this.core.transaction.refund(orderId, parameter);
      return result;
    } catch (error: any) {
      console.error("Midtrans refund transaction error:", error);
      throw new AppError(
        error.message || "Failed to refund transaction",
        500
      );
    }
  }

  /**
   * Validate notification from Midtrans
   */
  validateNotification(notification: MidtransNotification): boolean {
    try {
      if (!this.serverKey) {
        return false;
      }

      const expectedSignature = validateMidtransSignature(
        notification.order_id,
        notification.status_code,
        notification.gross_amount,
        this.serverKey
      );

      return expectedSignature === notification.signature_key;
    } catch (error) {
      console.error("Signature validation error:", error);
      return false;
    }
  }

  /**
   * Process Midtrans notification
   */
  processNotification(notification: MidtransNotification) {
    const paymentStatus = mapMidtransStatus(
      notification.transaction_status,
      notification.fraud_status
    );

    return {
      orderId: notification.order_id,
      transactionId: notification.transaction_id,
      status: paymentStatus,
      grossAmount: parseFloat(notification.gross_amount),
      paymentType: notification.payment_type,
      transactionTime: notification.transaction_time,
      settlementTime: notification.settlement_time,
      fraudStatus: notification.fraud_status,
      statusMessage: notification.status_message,
    };
  }

  /**
   * Get payment methods
   */
  getEnabledPaymentMethods(): string[] {
    return PAYMENT_CONSTANTS.MIDTRANS_ENABLED_PAYMENTS;
  }

  /**
   * Format amount for Midtrans (in IDR, no decimal)
   */
  formatAmount(amount: number): number {
    return Math.round(amount);
  }
}

export const midtransService = new MidtransService();
