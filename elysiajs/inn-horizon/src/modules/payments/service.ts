import { PrismaClient, Prisma } from "../../../generated/prisma/client";
import {
  BookingStatus,
  PaymentProvider,
  PaymentStatus,
} from "../../../generated/prisma/enums";
import { prisma as db } from "../../lib/prisma";
import { midtransService } from "./midtrans.service";
import { AppError } from "../../utils/errors";
import { CreatePaymentData, PaymentFilters, generateOrderId } from "./types";
import { addHours } from "date-fns";

export class PaymentService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient = db) {
    this.prisma = prisma;
  }

  /**
   * Create payment for booking
   */
  async createPayment(
    bookingId: string,
    userId: string,
    provider: PaymentProvider = PaymentProvider.MIDTRANS,
  ) {
    // Get booking details
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId, deletedAt: null },
      include: {
        room: {
          include: {
            hotel: {
              select: {
                id: true,
                name: true,
                ownerId: true,
              },
            },
          },
        },
        payment: true,
      },
    });

    if (!booking) {
      throw new AppError("Booking not found", 404);
    }

    // Check if user owns the booking
    if (booking.userId !== userId) {
      throw new AppError(
        "You don't have permission to pay for this booking",
        403,
      );
    }

    // Check booking status
    if (booking.status !== BookingStatus.PENDING) {
      throw new AppError(
        `Cannot create payment for booking with status: ${booking.status}`,
        400,
      );
    }

    // Check if booking is expired
    if (booking.expiredAt && new Date() > booking.expiredAt) {
      // Update booking to expired
      await this.prisma.booking.update({
        where: { id: bookingId },
        data: { status: BookingStatus.EXPIRED },
      });
      throw new AppError("Booking has expired", 400);
    }

    // Check if payment already exists
    if (booking.payment) {
      if (booking.payment.status === PaymentStatus.SETTLED) {
        throw new AppError("Booking has already been paid", 400);
      }

      // If payment is pending or failed, return existing payment
      if (
        booking.payment.status === PaymentStatus.PENDING ||
        booking.payment.status === PaymentStatus.FAILED
      ) {
        return booking.payment;
      }
    }

    // Calculate expiry date
    const expiredAt = addHours(new Date(), 24);

    // Create payment based on provider
    if (provider === PaymentProvider.MIDTRANS) {
      return await this.createMidtransPayment(booking, expiredAt);
    } else {
      return await this.createManualPayment(booking, expiredAt);
    }
  }

  /**
   * Create Midtrans payment
   */
  private async createMidtransPayment(booking: any, expiredAt: Date) {
    try {
      // Prepare item details
      const itemDetails = [
        {
          id: booking.roomId,
          name: `${booking.room.hotel.name} - ${booking.room.name}`,
          price: midtransService.formatAmount(booking.totalPrice.toNumber()),
          quantity: 1,
        },
      ];

      // Create Midtrans transaction
      const midtransResponse = await midtransService.createTransaction(
        booking.bookingCode,
        midtransService.formatAmount(booking.totalPrice.toNumber()),
        booking.guestName,
        booking.guestEmail,
        booking.guestPhone,
        itemDetails,
      );

      // Generate order ID
      const orderId = generateOrderId(booking.bookingCode);

      // Create or update payment in database
      const payment = await this.prisma.payment.upsert({
        where: { bookingId: booking.id },
        update: {
          status: PaymentStatus.PENDING,
          snapToken: midtransResponse.token,
          paymentUrl: midtransResponse.redirect_url,
          providerRef: orderId,
          expiredAt,
        },
        create: {
          bookingId: booking.id,
          amount: booking.totalPrice,
          provider: PaymentProvider.MIDTRANS,
          providerRef: orderId,
          status: PaymentStatus.PENDING,
          snapToken: midtransResponse.token,
          paymentUrl: midtransResponse.redirect_url,
          expiredAt,
        },
        include: {
          booking: {
            include: {
              room: {
                include: {
                  hotel: true,
                },
              },
            },
          },
        },
      });

      return payment;
    } catch (error: any) {
      console.error("Create Midtrans payment error:", error);
      throw new AppError(
        error.message || "Failed to create payment",
        error.status || 500,
      );
    }
  }

  /**
   * Create manual payment
   */
  private async createManualPayment(booking: any, expiredAt: Date) {
    const payment = await this.prisma.payment.upsert({
      where: { bookingId: booking.id },
      update: {
        status: PaymentStatus.PENDING,
        expiredAt,
      },
      create: {
        bookingId: booking.id,
        amount: booking.totalPrice,
        provider: PaymentProvider.MANUAL,
        status: PaymentStatus.PENDING,
        expiredAt,
      },
      include: {
        booking: {
          include: {
            room: {
              include: {
                hotel: true,
              },
            },
          },
        },
      },
    });

    return payment;
  }

  /**
   * Get payment by ID
   */
  async getPaymentById(paymentId: string, userId?: string, userRole?: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId, deletedAt: null },
      include: {
        booking: {
          include: {
            room: {
              include: {
                hotel: {
                  select: {
                    id: true,
                    name: true,
                    city: true,
                    address: true,
                    ownerId: true,
                  },
                },
              },
            },
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    if (!payment) {
      throw new AppError("Payment not found", 404);
    }

    // Authorization check
    if (userId && userRole !== "ADMIN") {
      const isOwner = payment.booking.userId === userId;
      const isHost = payment.booking.room.hotel.ownerId === userId;

      if (!isOwner && !isHost) {
        throw new AppError(
          "You don't have permission to access this payment",
          403,
        );
      }
    }

    return payment;
  }

  /**
   * Get payment by booking ID
   */
  async getPaymentByBookingId(
    bookingId: string,
    userId?: string,
    userRole?: string,
  ) {
    const payment = await this.prisma.payment.findUnique({
      where: { bookingId, deletedAt: null },
      include: {
        booking: {
          include: {
            room: {
              include: {
                hotel: {
                  select: {
                    id: true,
                    name: true,
                    city: true,
                    address: true,
                    ownerId: true,
                  },
                },
              },
            },
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    if (!payment) {
      throw new AppError("Payment not found", 404);
    }

    // Authorization check
    if (userId && userRole !== "ADMIN") {
      const isOwner = payment.booking.userId === userId;
      const isHost = payment.booking.room.hotel.ownerId === userId;

      if (!isOwner && !isHost) {
        throw new AppError(
          "You don't have permission to access this payment",
          403,
        );
      }
    }

    return payment;
  }

  /**
   * List payments with filters and pagination
   */
  async listPayments(
    filters: PaymentFilters,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;

    const where: Prisma.PaymentWhereInput = {
      deletedAt: null,
    };

    if (filters.bookingId) {
      where.bookingId = filters.bookingId;
    }

    if (filters.userId) {
      where.booking = {
        userId: filters.userId,
      };
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.provider) {
      where.provider = filters.provider;
    }

    if (filters.startDate || filters.endDate) {
      where.createdAt = {};

      if (filters.startDate) {
        where.createdAt.gte = filters.startDate;
      }

      if (filters.endDate) {
        where.createdAt.lte = filters.endDate;
      }
    }

    const [payments, total] = await Promise.all([
      this.prisma.payment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          booking: {
            select: {
              id: true,
              bookingCode: true,
              guestName: true,
              checkIn: true,
              checkOut: true,
              status: true,
            },
          },
        },
      }),
      this.prisma.payment.count({ where }),
    ]);

    return {
      payments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Process payment notification (webhook)
   */
  async processPaymentNotification(notification: any) {
    // Validate notification
    if (!midtransService.validateNotification(notification)) {
      throw new AppError("Invalid payment notification signature", 400);
    }

    // Process notification
    const processedData = midtransService.processNotification(notification);

    // Find payment by provider reference
    const payment = await this.prisma.payment.findFirst({
      where: {
        providerRef: processedData.orderId,
        provider: PaymentProvider.MIDTRANS,
      },
      include: {
        booking: {
          include: {
            room: {
              include: {
                hotel: {
                  select: {
                    ownerId: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!payment) {
      throw new AppError("Payment not found", 404);
    }

    // Update payment status
    const updatedPayment = await this.prisma.$transaction(async (tx) => {
      // Update payment
      const updated = await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: processedData.status,
          paidAt:
            processedData.status === PaymentStatus.SETTLED
              ? new Date(processedData.transactionTime)
              : null,
          failureReason:
            processedData.status === PaymentStatus.FAILED
              ? processedData.statusMessage
              : null,
        },
      });

      // Update booking status based on payment status
      if (processedData.status === PaymentStatus.SETTLED) {
        await tx.booking.update({
          where: { id: payment.bookingId },
          data: {
            status: BookingStatus.PAID,
            paymentId: payment.id,
          },
        });

        // Add to host's wallet balance
        const hostId = payment.booking.room.hotel.ownerId;
        await tx.user.update({
          where: { id: hostId },
          data: {
            walletBalance: {
              increment: payment.booking.hostPayout,
            },
          },
        });

        // Get updated balance
        const host = await tx.user.findUnique({
          where: { id: hostId },
          select: { walletBalance: true },
        });

        // Create ledger entry
        await tx.hostLedger.create({
          data: {
            hostId,
            bookingId: payment.bookingId,
            amount: payment.booking.hostPayout,
            type: "INCOME_BOOKING",
            description: `Income from booking ${payment.booking.bookingCode}`,
            balanceAfter: host!.walletBalance,
          },
        });
      } else if (processedData.status === PaymentStatus.FAILED) {
        // Don't change booking status, allow retry
        console.log(
          `Payment failed for booking ${payment.booking.bookingCode}`,
        );
      } else if (processedData.status === PaymentStatus.EXPIRED) {
        await tx.booking.update({
          where: { id: payment.bookingId },
          data: {
            status: BookingStatus.EXPIRED,
          },
        });

        // Delete booking dates to free up the room
        await tx.bookingDate.deleteMany({
          where: { bookingId: payment.bookingId },
        });
      }

      return updated;
    });

    return updatedPayment;
  }

  /**
   * Check payment status from provider
   */
  async checkPaymentStatus(
    paymentId: string,
    userId?: string,
    userRole?: string,
  ) {
    const payment = await this.getPaymentById(paymentId, userId, userRole);

    if (payment.provider === PaymentProvider.MIDTRANS && payment.providerRef) {
      try {
        const status = await midtransService.checkTransactionStatus(
          payment.providerRef,
        );

        const paymentStatus = midtransService.processNotification({
          ...status,
          signature_key: "", // Not needed for manual check
        });

        // Update payment if status changed
        if (paymentStatus.status !== payment.status) {
          const updatedPayment = await this.prisma.payment.update({
            where: { id: payment.id },
            data: {
              status: paymentStatus.status,
              paidAt:
                paymentStatus.status === PaymentStatus.SETTLED
                  ? new Date(paymentStatus.transactionTime)
                  : payment.paidAt,
            },
            include: {
              booking: {
                include: {
                  room: {
                    include: {
                      hotel: true,
                    },
                  },
                },
              },
            },
          });

          // Update booking status if payment is settled
          if (paymentStatus.status === PaymentStatus.SETTLED) {
            await this.prisma.booking.update({
              where: { id: payment.bookingId },
              data: {
                status: BookingStatus.PAID,
                paymentId: payment.id,
              },
            });
          }

          return updatedPayment;
        }

        return payment;
      } catch (error: any) {
        console.error("Check payment status error:", error);
        // Return current payment status if check fails
        return payment;
      }
    }

    return payment;
  }

  /**
   * Cancel payment
   */
  async cancelPayment(paymentId: string, userId: string, userRole: string) {
    const payment = await this.getPaymentById(paymentId, userId, userRole);

    // Check if payment can be cancelled
    if (payment.status !== PaymentStatus.PENDING) {
      throw new AppError("Only pending payments can be cancelled", 400);
    }

    // Cancel transaction in provider
    if (payment.provider === PaymentProvider.MIDTRANS && payment.providerRef) {
      try {
        await midtransService.cancelTransaction(payment.providerRef);
      } catch (error) {
        console.error("Cancel Midtrans transaction error:", error);
        // Continue with cancellation even if provider cancel fails
      }
    }

    // Update payment status
    const updatedPayment = await this.prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: PaymentStatus.FAILED,
        failureReason: "Cancelled by user",
      },
      include: {
        booking: {
          include: {
            room: {
              include: {
                hotel: true,
              },
            },
          },
        },
      },
    });

    return updatedPayment;
  }

  /**
   * Refund payment (Admin only)
   */
  async refundPayment(
    paymentId: string,
    userId: string,
    userRole: string,
    reason?: string,
  ) {
    if (userRole !== "ADMIN") {
      throw new AppError("Only admins can process refunds", 403);
    }

    const payment = await this.getPaymentById(paymentId, userId, userRole);

    // Check if payment can be refunded
    if (payment.status !== PaymentStatus.SETTLED) {
      throw new AppError("Only settled payments can be refunded", 400);
    }

    // Refund transaction in provider
    if (payment.provider === PaymentProvider.MIDTRANS && payment.providerRef) {
      try {
        await midtransService.refundTransaction(
          payment.providerRef,
          undefined,
          reason,
        );
      } catch (error: any) {
        throw new AppError(
          error.message || "Failed to process refund with payment provider",
          500,
        );
      }
    }

    // Update payment status
    const updatedPayment = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.payment.update({
        where: { id: paymentId },
        data: {
          status: PaymentStatus.REFUNDED,
          failureReason: reason,
        },
        include: {
          booking: {
            include: {
              room: {
                include: {
                  hotel: true,
                },
              },
            },
          },
        },
      });

      // Update booking status
      await tx.booking.update({
        where: { id: payment.bookingId },
        data: {
          status: BookingStatus.REFUNDED,
        },
      });

      // Deduct from host's wallet balance
      const hostId = payment.booking.room.hotel.ownerId;
      await tx.user.update({
        where: { id: hostId },
        data: {
          walletBalance: {
            decrement: payment.booking.hostPayout,
          },
        },
      });

      // Get updated balance
      const host = await tx.user.findUnique({
        where: { id: hostId },
        select: { walletBalance: true },
      });

      // Create ledger entry
      await tx.hostLedger.create({
        data: {
          hostId,
          bookingId: payment.bookingId,
          amount: payment.booking.hostPayout.mul(-1),
          type: "REFUND_DEDUCTION",
          description: `Refund for booking ${payment.booking.bookingCode}: ${reason || "No reason provided"}`,
          balanceAfter: host!.walletBalance,
        },
      });

      return updated;
    });

    return updatedPayment;
  }

  /**
   * Get payment statistics
   */
  async getPaymentStats(filters?: { startDate?: Date; endDate?: Date }) {
    const where: Prisma.PaymentWhereInput = {
      deletedAt: null,
    };

    if (filters?.startDate || filters?.endDate) {
      where.createdAt = {};

      if (filters.startDate) {
        where.createdAt.gte = filters.startDate;
      }

      if (filters.endDate) {
        where.createdAt.lte = filters.endDate;
      }
    }

    const stats = await this.prisma.payment.groupBy({
      by: ["status"],
      where,
      _count: {
        id: true,
      },
      _sum: {
        amount: true,
      },
    });

    const totalRevenue = await this.prisma.payment.aggregate({
      where: {
        ...where,
        status: PaymentStatus.SETTLED,
      },
      _sum: {
        amount: true,
      },
    });

    return {
      stats,
      totalRevenue: totalRevenue._sum.amount || 0,
    };
  }
}

export const paymentService = new PaymentService();
