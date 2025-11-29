import Midtrans from "midtrans-client";

const isProduction = process.env.NODE_ENV === "production";

export const snap = new Midtrans.Snap({
  isProduction,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!,
});

export const core = new Midtrans.CoreApi({
  isProduction,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!,
});

/**
 * Refund a Midtrans transaction
 * @param transactionId - The transaction ID from Midtrans
 * @param amount - The amount to refund
 * @param reason - The reason for refund
 * @returns Object containing success status and response data
 */
export async function refundMidtrans(
  transactionId: string,
  amount: number,
  reason: string = "Customer cancelled booking",
) {
  try {
    const refundResponse = await (core as any).transaction.refund(transactionId, {
      amount,
      reason,
    });
    return { success: true, data: refundResponse };
  } catch (error: any) {
    console.error("Midtrans refund error:", error);
    return { success: false, error: error.message || "Refund failed" };
  }
}

/**
 * Get transaction status from Midtrans
 * @param orderId - The order ID
 * @returns Transaction status response
 */
export async function getTransactionStatus(orderId: string) {
  try {
    const statusResponse = await (core as any).transaction.status(orderId);
    return { success: true, data: statusResponse };
  } catch (error: any) {
    console.error("Midtrans get status error:", error);
    return {
      success: false,
      error: error.message || "Failed to get transaction status",
    };
  }
}

/**
 * Cancel a pending transaction
 * @param orderId - The order ID to cancel
 * @returns Cancel response
 */
export async function cancelTransaction(orderId: string) {
  try {
    const cancelResponse = await (core as any).transaction.cancel(orderId);
    return { success: true, data: cancelResponse };
  } catch (error: any) {
    console.error("Midtrans cancel error:", error);
    return {
      success: false,
      error: error.message || "Failed to cancel transaction",
    };
  }
}

/**
 * Expire a pending transaction
 * @param orderId - The order ID to expire
 * @returns Expire response
 */
export async function expireTransaction(orderId: string) {
  try {
    const expireResponse = await (core as any).transaction.expire(orderId);
    return { success: true, data: expireResponse };
  } catch (error: any) {
    console.error("Midtrans expire error:", error);
    return {
      success: false,
      error: error.message || "Failed to expire transaction",
    };
  }
}

/**
 * Create Snap payment token
 * @param parameter - Snap transaction parameters
 * @returns Snap token and redirect URL
 */
export async function createSnapToken(parameter: any) {
  try {
    const transaction = await snap.createTransaction(parameter);
    return {
      success: true,
      data: {
        token: transaction.token,
        redirect_url: transaction.redirect_url,
      },
    };
  } catch (error: any) {
    console.error("Midtrans create token error:", error);
    return {
      success: false,
      error: error.message || "Failed to create payment token",
    };
  }
}

/**
 * Verify notification signature from Midtrans webhook
 * @param notificationJson - The notification body from webhook
 * @returns Verified notification response
 */
export async function verifyNotification(notificationJson: any) {
  try {
    const statusResponse =
      await (core as any).transaction.notification(notificationJson);
    return { success: true, data: statusResponse };
  } catch (error: any) {
    console.error("Midtrans verify notification error:", error);
    return {
      success: false,
      error: error.message || "Failed to verify notification",
    };
  }
}
