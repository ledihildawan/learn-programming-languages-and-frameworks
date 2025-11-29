import { t } from "elysia";
import {
  PaymentProvider,
  PaymentStatus,
} from "../../../generated/prisma/enums";

// ====================== Request DTOs ======================

export const CreatePaymentDTO = t.Object({
  bookingId: t.String({ format: "uuid" }),
  provider: t.Optional(t.Enum(PaymentProvider)),
});

export const PaymentCallbackDTO = t.Object({
  order_id: t.String(),
  status_code: t.String(),
  transaction_status: t.String(),
  transaction_id: t.Optional(t.String()),
  fraud_status: t.Optional(t.String()),
  gross_amount: t.Optional(t.String()),
  payment_type: t.Optional(t.String()),
  signature_key: t.Optional(t.String()),
});

export const PaymentQueryDTO = t.Object({
  page: t.Optional(t.Integer({ minimum: 1, default: 1 })),
  limit: t.Optional(t.Integer({ minimum: 1, maximum: 100, default: 10 })),
  status: t.Optional(t.Enum(PaymentStatus)),
  provider: t.Optional(t.Enum(PaymentProvider)),
  startDate: t.Optional(t.String({ format: "date" })),
  endDate: t.Optional(t.String({ format: "date" })),
});

// ====================== Response DTOs ======================

export const PaymentItemDTO = t.Object({
  id: t.String(),
  bookingId: t.String(),
  amount: t.String(),
  provider: t.Enum(PaymentProvider),
  providerRef: t.Nullable(t.String()),
  status: t.Enum(PaymentStatus),
  snapToken: t.Nullable(t.String()),
  paymentUrl: t.Nullable(t.String()),
  paidAt: t.Nullable(t.String()),
  expiredAt: t.Nullable(t.String()),
  failureReason: t.Nullable(t.String()),
  createdAt: t.String(),
  booking: t.Object({
    id: t.String(),
    bookingCode: t.String(),
    guestName: t.String(),
    checkIn: t.String(),
    checkOut: t.String(),
    status: t.String(),
  }),
});

export const PaymentDetailDTO = t.Object({
  id: t.String(),
  bookingId: t.String(),
  amount: t.String(),
  provider: t.Enum(PaymentProvider),
  providerRef: t.Nullable(t.String()),
  status: t.Enum(PaymentStatus),
  snapToken: t.Nullable(t.String()),
  paymentUrl: t.Nullable(t.String()),
  paidAt: t.Nullable(t.String()),
  expiredAt: t.Nullable(t.String()),
  failureReason: t.Nullable(t.String()),
  createdAt: t.String(),
  booking: t.Object({
    id: t.String(),
    bookingCode: t.String(),
    guestName: t.String(),
    guestPhone: t.String(),
    guestEmail: t.Nullable(t.String()),
    checkIn: t.String(),
    checkOut: t.String(),
    nights: t.Integer(),
    guests: t.Integer(),
    totalPrice: t.String(),
    status: t.String(),
    room: t.Object({
      id: t.String(),
      name: t.String(),
      type: t.String(),
      hotel: t.Object({
        id: t.String(),
        name: t.String(),
        city: t.String(),
        address: t.String(),
      }),
    }),
  }),
});

export const PaymentResponseDTO = t.Object({
  success: t.Boolean(),
  data: PaymentDetailDTO,
});

export const PaymentListResponseDTO = t.Object({
  success: t.Boolean(),
  data: t.Array(PaymentItemDTO),
  pagination: t.Object({
    page: t.Integer(),
    limit: t.Integer(),
    total: t.Integer(),
    totalPages: t.Integer(),
  }),
});

// ====================== Internal Types ======================

export interface CreatePaymentData {
  bookingId: string;
  amount: number;
  provider: PaymentProvider;
  expiredAt: Date;
}

export interface MidtransTransactionDetails {
  order_id: string;
  gross_amount: number;
}

export interface MidtransItemDetails {
  id: string;
  price: number;
  quantity: number;
  name: string;
}

export interface MidtransCustomerDetails {
  first_name: string;
  last_name?: string;
  email?: string;
  phone: string;
}

export interface MidtransCreateTransactionRequest {
  transaction_details: MidtransTransactionDetails;
  item_details: MidtransItemDetails[];
  customer_details: MidtransCustomerDetails;
  enabled_payments?: string[];
  expiry?: {
    unit: string;
    duration: number;
  };
}

export interface MidtransTransactionResponse {
  token: string;
  redirect_url: string;
}

export interface MidtransNotification {
  transaction_time: string;
  transaction_status: string;
  transaction_id: string;
  status_message: string;
  status_code: string;
  signature_key: string;
  settlement_time?: string;
  payment_type: string;
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  fraud_status: string;
  currency: string;
}

export interface PaymentFilters {
  bookingId?: string;
  userId?: string;
  status?: PaymentStatus;
  provider?: PaymentProvider;
  startDate?: Date;
  endDate?: Date;
}

// ====================== Constants ======================

export const PAYMENT_CONSTANTS = {
  MIDTRANS_EXPIRY_DURATION: 24, // hours
  MIDTRANS_EXPIRY_UNIT: "hour",
  MIDTRANS_ENABLED_PAYMENTS: [
    "credit_card",
    "mandiri_clickpay",
    "cimb_clicks",
    "bca_klikbca",
    "bca_klikpay",
    "bri_epay",
    "echannel",
    "permata_va",
    "bca_va",
    "bni_va",
    "bri_va",
    "other_va",
    "gopay",
    "shopeepay",
    "qris",
    "akulaku",
  ],
} as const;

// ====================== Helper Functions ======================

export function generateOrderId(bookingCode: string): string {
  const timestamp = Date.now();
  return `${bookingCode}-${timestamp}`;
}

export function formatPaymentForResponse(payment: any) {
  return {
    ...payment,
    amount: payment.amount.toString(),
    booking: payment.booking
      ? {
          ...payment.booking,
          totalPrice: payment.booking.totalPrice.toString(),
          room: payment.booking.room
            ? {
                ...payment.booking.room,
                hotel: payment.booking.room.hotel,
              }
            : undefined,
        }
      : undefined,
  };
}

export function mapMidtransStatus(
  transactionStatus: string,
  fraudStatus?: string,
): PaymentStatus {
  // Handle fraud status first
  if (fraudStatus === "deny" || fraudStatus === "challenge") {
    return PaymentStatus.FAILED;
  }

  // Map transaction status
  switch (transactionStatus) {
    case "capture":
    case "settlement":
      return PaymentStatus.SETTLED;
    case "pending":
      return PaymentStatus.PENDING;
    case "deny":
    case "cancel":
    case "failure":
      return PaymentStatus.FAILED;
    case "expire":
      return PaymentStatus.EXPIRED;
    case "refund":
    case "partial_refund":
      return PaymentStatus.REFUNDED;
    default:
      return PaymentStatus.PENDING;
  }
}

export function validateMidtransSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  serverKey: string,
): string {
  const crypto = require("crypto");
  const hash = crypto
    .createHash("sha512")
    .update(`${orderId}${statusCode}${grossAmount}${serverKey}`)
    .digest("hex");
  return hash;
}
