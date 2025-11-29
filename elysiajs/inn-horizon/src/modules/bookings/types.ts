import { t } from "elysia";
import { BookingStatus, PaymentStatus } from "../../../generated/prisma/enums";

// ====================== Request DTOs ======================

export const CheckAvailabilityDTO = t.Object({
  roomId: t.String({ format: "uuid" }),
  checkIn: t.String({ format: "date" }),
  checkOut: t.String({ format: "date" }),
});

export const CreateBookingDTO = t.Object({
  roomId: t.String({ format: "uuid" }),
  checkIn: t.String({ format: "date" }),
  checkOut: t.String({ format: "date" }),
  guests: t.Integer({ minimum: 1 }),
  guestName: t.String({ minLength: 2, maxLength: 100 }),
  guestPhone: t.String({ minLength: 8, maxLength: 20 }),
  guestEmail: t.Optional(t.String({ format: "email" })),
  guestNotes: t.Optional(t.String({ maxLength: 500 })),
});

export const UpdateBookingStatusDTO = t.Object({
  status: t.Enum(BookingStatus),
  notes: t.Optional(t.String({ maxLength: 500 })),
});

export const CancelBookingDTO = t.Object({
  reason: t.Optional(t.String({ maxLength: 500 })),
});

export const BookingQueryDTO = t.Object({
  page: t.Optional(t.Integer({ minimum: 1, default: 1 })),
  limit: t.Optional(t.Integer({ minimum: 1, maximum: 100, default: 10 })),
  status: t.Optional(t.Enum(BookingStatus)),
  startDate: t.Optional(t.String({ format: "date" })),
  endDate: t.Optional(t.String({ format: "date" })),
  search: t.Optional(t.String()),
});

// ====================== Response DTOs ======================

export const BookingItemDTO = t.Object({
  id: t.String(),
  bookingCode: t.String(),
  checkIn: t.String(),
  checkOut: t.String(),
  nights: t.Integer(),
  guests: t.Integer(),
  guestName: t.String(),
  guestPhone: t.String(),
  guestEmail: t.Nullable(t.String()),
  guestNotes: t.Nullable(t.String()),
  totalPrice: t.String(),
  platformFee: t.String(),
  hostPayout: t.String(),
  status: t.Enum(BookingStatus),
  expiredAt: t.Nullable(t.String()),
  confirmedAt: t.Nullable(t.String()),
  checkedInAt: t.Nullable(t.String()),
  canceledAt: t.Nullable(t.String()),
  cancelReason: t.Nullable(t.String()),
  createdAt: t.String(),
  updatedAt: t.String(),
  room: t.Object({
    id: t.String(),
    name: t.String(),
    type: t.String(),
    price: t.String(),
    hotel: t.Object({
      id: t.String(),
      name: t.String(),
      slug: t.String(),
      city: t.String(),
      address: t.String(),
      coverPhoto: t.Nullable(t.String()),
    }),
  }),
  user: t.Object({
    id: t.String(),
    name: t.Nullable(t.String()),
    email: t.String(),
    phone: t.String(),
  }),
  payment: t.Nullable(
    t.Object({
      id: t.String(),
      amount: t.String(),
      provider: t.String(),
      status: t.Enum(PaymentStatus),
      snapToken: t.Nullable(t.String()),
      paymentUrl: t.Nullable(t.String()),
      paidAt: t.Nullable(t.String()),
      expiredAt: t.Nullable(t.String()),
      createdAt: t.String(),
    }),
  ),
});

export const BookingDetailDTO = t.Object({
  id: t.String(),
  bookingCode: t.String(),
  checkIn: t.String(),
  checkOut: t.String(),
  nights: t.Integer(),
  guests: t.Integer(),
  guestName: t.String(),
  guestPhone: t.String(),
  guestEmail: t.Nullable(t.String()),
  guestNotes: t.Nullable(t.String()),
  totalPrice: t.String(),
  platformFee: t.String(),
  hostPayout: t.String(),
  status: t.Enum(BookingStatus),
  expiredAt: t.Nullable(t.String()),
  confirmedAt: t.Nullable(t.String()),
  checkedInAt: t.Nullable(t.String()),
  canceledAt: t.Nullable(t.String()),
  cancelReason: t.Nullable(t.String()),
  canceledBy: t.Nullable(
    t.Object({
      id: t.String(),
      name: t.Nullable(t.String()),
      email: t.String(),
    }),
  ),
  createdAt: t.String(),
  updatedAt: t.String(),
  room: t.Object({
    id: t.String(),
    name: t.String(),
    type: t.String(),
    maxGuests: t.Integer(),
    size: t.Nullable(t.Integer()),
    bedType: t.Nullable(t.String()),
    price: t.String(),
    hotel: t.Object({
      id: t.String(),
      name: t.String(),
      slug: t.String(),
      city: t.String(),
      province: t.Nullable(t.String()),
      address: t.String(),
      checkInTime: t.String(),
      checkOutTime: t.String(),
      coverPhoto: t.Nullable(t.String()),
      cancellationHours: t.Nullable(t.Integer()),
    }),
    photos: t.Array(
      t.Object({
        id: t.String(),
        url: t.String(),
        order: t.Integer(),
      }),
    ),
  }),
  user: t.Object({
    id: t.String(),
    name: t.Nullable(t.String()),
    email: t.String(),
    phone: t.String(),
  }),
  payment: t.Nullable(
    t.Object({
      id: t.String(),
      amount: t.String(),
      provider: t.String(),
      providerRef: t.Nullable(t.String()),
      status: t.Enum(PaymentStatus),
      snapToken: t.Nullable(t.String()),
      paymentUrl: t.Nullable(t.String()),
      paidAt: t.Nullable(t.String()),
      expiredAt: t.Nullable(t.String()),
      failureReason: t.Nullable(t.String()),
      createdAt: t.String(),
    }),
  ),
  roomSnapshot: t.Any(),
});

export const AvailabilityResponseDTO = t.Object({
  available: t.Boolean(),
  roomId: t.String(),
  checkIn: t.String(),
  checkOut: t.String(),
  nights: t.Integer(),
  totalRooms: t.Integer(),
  availableRooms: t.Integer(),
  price: t.String(),
  totalPrice: t.String(),
  message: t.Optional(t.String()),
});

export const BookingListResponseDTO = t.Object({
  success: t.Boolean(),
  data: t.Array(BookingItemDTO),
  pagination: t.Object({
    page: t.Integer(),
    limit: t.Integer(),
    total: t.Integer(),
    totalPages: t.Integer(),
  }),
});

export const BookingResponseDTO = t.Object({
  success: t.Boolean(),
  data: BookingDetailDTO,
});

export const AvailabilityCheckResponseDTO = t.Object({
  success: t.Boolean(),
  data: AvailabilityResponseDTO,
});

// ====================== Internal Types ======================

export interface BookingPriceCalculation {
  nights: number;
  pricePerNight: number;
  subtotal: number;
  platformFee: number;
  hostPayout: number;
  totalPrice: number;
}

export interface CreateBookingData {
  roomId: string;
  userId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  guestNotes?: string;
  pricing: BookingPriceCalculation;
  roomSnapshot: any;
}

export interface BookingFilters {
  userId?: string;
  hotelId?: string;
  status?: BookingStatus;
  startDate?: Date;
  endDate?: Date;
  search?: string;
}

// ====================== Constants ======================

export const BOOKING_CONSTANTS = {
  PLATFORM_FEE_PERCENTAGE: 10, // 10% platform fee
  PAYMENT_EXPIRY_HOURS: 24, // Payment must be completed within 24 hours
  BOOKING_EXPIRY_MINUTES: 15, // Booking expires after 15 minutes if not paid
  MIN_CANCELLATION_HOURS: 24, // Minimum hours before check-in to cancel
  MAX_BOOKING_DAYS: 90, // Maximum booking duration
  MIN_BOOKING_DAYS: 1, // Minimum booking duration
  MAX_GUESTS_PER_ROOM: 10, // Maximum guests per room
} as const;

// ====================== Helper Functions ======================

export function generateBookingCode(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `BK${timestamp}${random}`;
}

export function calculateNights(checkIn: Date, checkOut: Date): number {
  const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function calculateBookingPrice(
  pricePerNight: number,
  nights: number,
): BookingPriceCalculation {
  const subtotal = pricePerNight * nights;
  const platformFee =
    subtotal * (BOOKING_CONSTANTS.PLATFORM_FEE_PERCENTAGE / 100);
  const totalPrice = subtotal;
  const hostPayout = totalPrice - platformFee;

  return {
    nights,
    pricePerNight,
    subtotal,
    platformFee,
    hostPayout,
    totalPrice,
  };
}

export function getPaymentExpiryDate(): Date {
  const now = new Date();
  return new Date(
    now.getTime() + BOOKING_CONSTANTS.PAYMENT_EXPIRY_HOURS * 60 * 60 * 1000,
  );
}

export function getBookingExpiryDate(): Date {
  const now = new Date();
  return new Date(
    now.getTime() + BOOKING_CONSTANTS.BOOKING_EXPIRY_MINUTES * 60 * 1000,
  );
}

export function canCancelBooking(
  checkInDate: Date,
  cancellationHours?: number,
): boolean {
  const now = new Date();
  const hoursUntilCheckIn =
    (checkInDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  const requiredHours =
    cancellationHours || BOOKING_CONSTANTS.MIN_CANCELLATION_HOURS;
  return hoursUntilCheckIn >= requiredHours;
}

export function validateBookingDates(
  checkIn: Date,
  checkOut: Date,
): { valid: boolean; error?: string } {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  checkIn.setHours(0, 0, 0, 0);
  checkOut.setHours(0, 0, 0, 0);

  if (checkIn < now) {
    return { valid: false, error: "Check-in date cannot be in the past" };
  }

  if (checkOut <= checkIn) {
    return {
      valid: false,
      error: "Check-out date must be after check-in date",
    };
  }

  const nights = calculateNights(checkIn, checkOut);

  if (nights < BOOKING_CONSTANTS.MIN_BOOKING_DAYS) {
    return {
      valid: false,
      error: `Minimum booking duration is ${BOOKING_CONSTANTS.MIN_BOOKING_DAYS} night(s)`,
    };
  }

  if (nights > BOOKING_CONSTANTS.MAX_BOOKING_DAYS) {
    return {
      valid: false,
      error: `Maximum booking duration is ${BOOKING_CONSTANTS.MAX_BOOKING_DAYS} nights`,
    };
  }

  return { valid: true };
}

export function formatBookingForResponse(booking: any) {
  return {
    ...booking,
    totalPrice: booking.totalPrice.toString(),
    platformFee: booking.platformFee.toString(),
    hostPayout: booking.hostPayout.toString(),
    room: {
      ...booking.room,
      price: booking.room.price.toString(),
    },
    payment: booking.payment
      ? {
          ...booking.payment,
          amount: booking.payment.amount.toString(),
        }
      : null,
  };
}
