import { PrismaClient, Prisma } from "../../../generated/prisma/client";
import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma as db } from "../../lib/prisma";
import {
  CreateBookingData,
  BookingFilters,
  generateBookingCode,
  calculateNights,
  validateBookingDates,
  getBookingExpiryDate,
  canCancelBooking,
  BOOKING_CONSTANTS,
} from "./types";
import { AppError } from "../../utils/errors";
import { addDays, eachDayOfInterval, format } from "date-fns";

export class BookingService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient = db) {
    this.prisma = prisma;
  }

  /**
   * Check room availability for given dates
   */
  async checkAvailability(roomId: string, checkIn: Date, checkOut: Date) {
    // Validate dates
    const validation = validateBookingDates(checkIn, checkOut);
    if (!validation.valid) {
      throw new AppError(validation.error!, 400);
    }

    // Get room details
    const room = await this.prisma.room.findUnique({
      where: { id: roomId, isActive: true, deletedAt: null },
      include: {
        hotel: {
          select: {
            id: true,
            name: true,
            isActive: true,
          },
        },
      },
    });

    if (!room) {
      throw new AppError("Room not found or not available", 404);
    }

    if (!room.hotel.isActive) {
      throw new AppError("Hotel is not available for booking", 400);
    }

    // Calculate nights
    const nights = calculateNights(checkIn, checkOut);

    // Get all dates between check-in and check-out (exclusive of check-out)
    const bookingDates = eachDayOfInterval({
      start: checkIn,
      end: addDays(checkOut, -1),
    });

    // Count booked rooms for each date
    const bookedCounts = await this.prisma.bookingDate.groupBy({
      by: ["date"],
      where: {
        roomId,
        date: {
          in: bookingDates,
        },
        booking: {
          status: {
            in: [
              BookingStatus.PENDING,
              BookingStatus.PAID,
              BookingStatus.CONFIRMED,
              BookingStatus.CHECKED_IN,
            ],
          },
        },
      },
      _count: {
        id: true,
      },
    });

    // Find the maximum booked count across all dates
    const maxBookedCount =
      bookedCounts.length > 0
        ? Math.max(...bookedCounts.map((bc) => bc._count.id))
        : 0;

    const availableRooms = room.totalRooms - maxBookedCount;
    const isAvailable = availableRooms > 0;

    const totalPrice = room.price.toNumber() * nights;

    return {
      available: isAvailable,
      roomId: room.id,
      checkIn: format(checkIn, "yyyy-MM-dd"),
      checkOut: format(checkOut, "yyyy-MM-dd"),
      nights,
      totalRooms: room.totalRooms,
      availableRooms: Math.max(0, availableRooms),
      price: room.price.toString(),
      totalPrice: totalPrice.toString(),
      message: isAvailable
        ? `${availableRooms} room(s) available`
        : "No rooms available for selected dates",
    };
  }

  /**
   * Create a new booking
   */
  async createBooking(data: CreateBookingData) {
    // Validate dates
    const validation = validateBookingDates(data.checkIn, data.checkOut);
    if (!validation.valid) {
      throw new AppError(validation.error!, 400);
    }

    // Check availability
    const availability = await this.checkAvailability(
      data.roomId,
      data.checkIn,
      data.checkOut,
    );

    if (!availability.available) {
      throw new AppError("Room is not available for selected dates", 400);
    }

    // Get room with hotel details
    const room = await this.prisma.room.findUnique({
      where: { id: data.roomId },
      include: {
        hotel: {
          select: {
            id: true,
            name: true,
            ownerId: true,
          },
        },
      },
    });

    if (!room) {
      throw new AppError("Room not found", 404);
    }

    // Validate guests
    if (data.guests > room.maxGuests) {
      throw new AppError(
        `Maximum guests allowed for this room is ${room.maxGuests}`,
        400,
      );
    }

    if (data.guests > BOOKING_CONSTANTS.MAX_GUESTS_PER_ROOM) {
      throw new AppError(
        `Maximum guests allowed per room is ${BOOKING_CONSTANTS.MAX_GUESTS_PER_ROOM}`,
        400,
      );
    }

    // Generate booking code
    const bookingCode = generateBookingCode();

    // Calculate expiry date
    const expiredAt = getBookingExpiryDate();

    // Get all dates for the booking
    const bookingDates = eachDayOfInterval({
      start: data.checkIn,
      end: addDays(data.checkOut, -1),
    });

    // Create booking with transaction
    const booking = await this.prisma.$transaction(async (tx) => {
      // Create booking
      const newBooking = await tx.booking.create({
        data: {
          userId: data.userId,
          roomId: data.roomId,
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          bookingCode,
          nights: data.pricing.nights,
          guests: data.guests,
          guestName: data.guestName,
          guestPhone: data.guestPhone,
          guestEmail: data.guestEmail,
          guestNotes: data.guestNotes,
          totalPrice: data.pricing.totalPrice,
          platformFee: data.pricing.platformFee,
          hostPayout: data.pricing.hostPayout,
          status: BookingStatus.PENDING,
          expiredAt,
          roomSnapshot: data.roomSnapshot,
        },
        include: {
          room: {
            include: {
              hotel: true,
              photos: {
                orderBy: { order: "asc" },
                take: 1,
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
      });

      // Create booking dates
      await tx.bookingDate.createMany({
        data: bookingDates.map((date) => ({
          bookingId: newBooking.id,
          roomId: data.roomId,
          date,
        })),
      });

      return newBooking;
    });

    return booking;
  }

  /**
   * Get booking by ID
   */
  async getBookingById(bookingId: string, userId?: string, userRole?: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId, deletedAt: null },
      include: {
        room: {
          include: {
            hotel: {
              select: {
                id: true,
                name: true,
                slug: true,
                city: true,
                province: true,
                address: true,
                checkInTime: true,
                checkOutTime: true,
                coverPhoto: true,
                cancellationHours: true,
                ownerId: true,
              },
            },
            photos: {
              orderBy: { order: "asc" },
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
        payment: true,
        canceledBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!booking) {
      throw new AppError("Booking not found", 404);
    }

    // Authorization check
    if (userId && userRole !== "ADMIN") {
      const isOwner = booking.userId === userId;
      const isHost = booking.room.hotel.ownerId === userId;

      if (!isOwner && !isHost) {
        throw new AppError(
          "You don't have permission to access this booking",
          403,
        );
      }
    }

    return booking;
  }

  /**
   * Get booking by code
   */
  async getBookingByCode(
    bookingCode: string,
    userId?: string,
    userRole?: string,
  ) {
    const booking = await this.prisma.booking.findUnique({
      where: { bookingCode, deletedAt: null },
      include: {
        room: {
          include: {
            hotel: {
              select: {
                id: true,
                name: true,
                slug: true,
                city: true,
                province: true,
                address: true,
                checkInTime: true,
                checkOutTime: true,
                coverPhoto: true,
                cancellationHours: true,
                ownerId: true,
              },
            },
            photos: {
              orderBy: { order: "asc" },
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
        payment: true,
        canceledBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!booking) {
      throw new AppError("Booking not found", 404);
    }

    // Authorization check
    if (userId && userRole !== "ADMIN") {
      const isOwner = booking.userId === userId;
      const isHost = booking.room.hotel.ownerId === userId;

      if (!isOwner && !isHost) {
        throw new AppError(
          "You don't have permission to access this booking",
          403,
        );
      }
    }

    return booking;
  }

  /**
   * List bookings with filters and pagination
   */
  async listBookings(
    filters: BookingFilters,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;

    const where: Prisma.BookingWhereInput = {
      deletedAt: null,
    };

    if (filters.userId) {
      where.userId = filters.userId;
    }

    if (filters.hotelId) {
      where.room = {
        hotelId: filters.hotelId,
      };
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.startDate || filters.endDate) {
      where.AND = [];

      if (filters.startDate) {
        where.AND.push({
          checkIn: {
            gte: filters.startDate,
          },
        });
      }

      if (filters.endDate) {
        where.AND.push({
          checkOut: {
            lte: filters.endDate,
          },
        });
      }
    }

    if (filters.search) {
      where.OR = [
        { bookingCode: { contains: filters.search, mode: "insensitive" } },
        { guestName: { contains: filters.search, mode: "insensitive" } },
        { guestPhone: { contains: filters.search, mode: "insensitive" } },
        { guestEmail: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    const [bookings, total] = await Promise.all([
      this.prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          room: {
            include: {
              hotel: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  city: true,
                  address: true,
                  coverPhoto: true,
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
          payment: true,
        },
      }),
      this.prisma.booking.count({ where }),
    ]);

    return {
      bookings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Cancel booking
   */
  async cancelBooking(
    bookingId: string,
    userId: string,
    userRole: string,
    reason?: string,
  ) {
    const booking = await this.getBookingById(bookingId, userId, userRole);

    // Check if booking can be cancelled
    if (
      ![
        BookingStatus.PENDING,
        BookingStatus.PAID,
        BookingStatus.CONFIRMED,
      ].includes(booking.status)
    ) {
      throw new AppError(
        "Only pending, paid, or confirmed bookings can be cancelled",
        400,
      );
    }

    // Check cancellation policy
    const cancellationHours = booking.room.hotel.cancellationHours;
    if (!canCancelBooking(booking.checkIn, cancellationHours ?? undefined)) {
      const requiredHours =
        cancellationHours || BOOKING_CONSTANTS.MIN_CANCELLATION_HOURS;
      throw new AppError(
        `Booking can only be cancelled at least ${requiredHours} hours before check-in`,
        400,
      );
    }

    // Cancel booking
    const updatedBooking = await this.prisma.$transaction(async (tx) => {
      // Delete booking dates to free up the room
      await tx.bookingDate.deleteMany({
        where: { bookingId },
      });

      // Update booking status
      const updated = await tx.booking.update({
        where: { id: bookingId },
        data: {
          status: BookingStatus.CANCELLED,
          canceledAt: new Date(),
          cancelReason: reason,
          canceledById: userId,
        },
        include: {
          room: {
            include: {
              hotel: true,
              photos: {
                orderBy: { order: "asc" },
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
          payment: true,
          canceledBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      // If booking was paid, create refund ledger entry
      if (booking.status === BookingStatus.PAID) {
        const hostId = booking.room.hotel.ownerId;

        // Deduct from host's wallet balance
        await tx.user.update({
          where: { id: hostId },
          data: {
            walletBalance: {
              decrement: booking.hostPayout,
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
            bookingId: booking.id,
            amount: booking.hostPayout.mul(-1),
            type: "REFUND_DEDUCTION",
            description: `Refund for cancelled booking ${booking.bookingCode}`,
            balanceAfter: host!.walletBalance,
          },
        });
      }

      return updated;
    });

    return updatedBooking;
  }

  /**
   * Update booking status (for admin/host)
   */
  async updateBookingStatus(
    bookingId: string,
    status: BookingStatus,
    userId: string,
    userRole: string,
    notes?: string,
  ) {
    const booking = await this.getBookingById(bookingId, userId, userRole);

    // Validate status transition
    const allowedTransitions: Record<BookingStatus, BookingStatus[]> = {
      [BookingStatus.PENDING]: [BookingStatus.CANCELLED, BookingStatus.EXPIRED],
      [BookingStatus.PAID]: [
        BookingStatus.CONFIRMED,
        BookingStatus.CANCELLED,
        BookingStatus.REFUNDED,
      ],
      [BookingStatus.CONFIRMED]: [
        BookingStatus.CHECKED_IN,
        BookingStatus.CANCELLED,
      ],
      [BookingStatus.CHECKED_IN]: [BookingStatus.CHECKED_OUT],
      [BookingStatus.CHECKED_OUT]: [BookingStatus.COMPLETED],
      [BookingStatus.COMPLETED]: [],
      [BookingStatus.CANCELLED]: [],
      [BookingStatus.REFUNDED]: [],
      [BookingStatus.EXPIRED]: [],
    };

    if (!allowedTransitions[booking.status].includes(status)) {
      throw new AppError(
        `Cannot change booking status from ${booking.status} to ${status}`,
        400,
      );
    }

    // Update booking
    const updateData: any = {
      status,
    };

    if (status === BookingStatus.CONFIRMED) {
      updateData.confirmedAt = new Date();
    } else if (status === BookingStatus.CHECKED_IN) {
      updateData.checkedInAt = new Date();
    }

    const updatedBooking = await this.prisma.booking.update({
      where: { id: bookingId },
      data: updateData,
      include: {
        room: {
          include: {
            hotel: true,
            photos: {
              orderBy: { order: "asc" },
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
        payment: true,
        canceledBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return updatedBooking;
  }

  /**
   * Expire pending bookings (cron job)
   */
  async expirePendingBookings() {
    const now = new Date();

    const expiredBookings = await this.prisma.$transaction(async (tx) => {
      // Find all expired pending bookings
      const bookings = await tx.booking.findMany({
        where: {
          status: BookingStatus.PENDING,
          expiredAt: {
            lte: now,
          },
        },
        select: {
          id: true,
        },
      });

      if (bookings.length === 0) {
        return [];
      }

      const bookingIds = bookings.map((b) => b.id);

      // Delete booking dates
      await tx.bookingDate.deleteMany({
        where: {
          bookingId: {
            in: bookingIds,
          },
        },
      });

      // Update bookings to expired
      await tx.booking.updateMany({
        where: {
          id: {
            in: bookingIds,
          },
        },
        data: {
          status: BookingStatus.EXPIRED,
        },
      });

      return bookings;
    });

    return expiredBookings;
  }

  /**
   * Get booking statistics for host
   */
  async getHostBookingStats(hostId: string) {
    const hotels = await this.prisma.hotel.findMany({
      where: { ownerId: hostId },
      select: { id: true },
    });

    const hotelIds = hotels.map((h) => h.id);

    const stats = await this.prisma.booking.groupBy({
      by: ["status"],
      where: {
        room: {
          hotelId: {
            in: hotelIds,
          },
        },
        deletedAt: null,
      },
      _count: {
        id: true,
      },
      _sum: {
        hostPayout: true,
      },
    });

    const totalRevenue = await this.prisma.booking.aggregate({
      where: {
        room: {
          hotelId: {
            in: hotelIds,
          },
        },
        status: {
          in: [
            BookingStatus.PAID,
            BookingStatus.CONFIRMED,
            BookingStatus.CHECKED_IN,
            BookingStatus.CHECKED_OUT,
            BookingStatus.COMPLETED,
          ],
        },
        deletedAt: null,
      },
      _sum: {
        hostPayout: true,
      },
    });

    return {
      stats,
      totalRevenue: totalRevenue._sum.hostPayout || 0,
    };
  }
}

export const bookingService = new BookingService();
