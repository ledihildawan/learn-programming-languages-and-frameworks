import { Elysia } from "elysia";
import { bookingService } from "./service";
import { authMiddleware } from "../../middlewares/auth";
import { AppError } from "../../utils/errors";
import {
  CheckAvailabilityDTO,
  CreateBookingDTO,
  UpdateBookingStatusDTO,
  CancelBookingDTO,
  BookingQueryDTO,
  formatBookingForResponse,
  calculateBookingPrice,
  calculateNights,
} from "./types";

export const bookingController = new Elysia({ prefix: "/bookings" })
  .use(authMiddleware)

  /**
   * Check room availability
   * GET /bookings/availability
   */
  .get(
    "/availability",
    async ({ query, set }) => {
      try {
        const { roomId, checkIn, checkOut } = query as any;

        if (!roomId || !checkIn || !checkOut) {
          throw new AppError("roomId, checkIn, and checkOut are required", 400);
        }

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
          throw new AppError("Invalid date format", 400);
        }

        const availability = await bookingService.checkAvailability(
          roomId,
          checkInDate,
          checkOutDate
        );

        return {
          success: true,
          data: availability,
        };
      } catch (error: any) {
        set.status = error.status || 500;
        return {
          success: false,
          error: error.message || "Failed to check availability",
        };
      }
    },
    {
      detail: {
        tags: ["Bookings"],
        summary: "Check room availability",
        description: "Check if a room is available for booking on specific dates",
      },
    }
  )

  /**
   * Create new booking
   * POST /bookings
   */
  .post(
    "/",
    async ({ body, user, set }) => {
      try {
        if (!user) {
          throw new AppError("Authentication required", 401);
        }

        const bookingData = body as any;

        // Parse dates
        const checkInDate = new Date(bookingData.checkIn);
        const checkOutDate = new Date(bookingData.checkOut);

        if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
          throw new AppError("Invalid date format", 400);
        }

        // Get room details for pricing
        const room = await bookingService["prisma"].room.findUnique({
          where: { id: bookingData.roomId, isActive: true, deletedAt: null },
          include: {
            hotel: {
              select: {
                id: true,
                name: true,
                ownerId: true,
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

        // Prevent self-booking for hosts
        if (user.role === "HOST" && room.hotel.ownerId === user.sub) {
          throw new AppError("You cannot book your own property", 400);
        }

        // Calculate pricing
        const nights = calculateNights(checkInDate, checkOutDate);
        const pricing = calculateBookingPrice(room.price.toNumber(), nights);

        // Create room snapshot
        const roomSnapshot = {
          name: room.name,
          type: room.type,
          price: room.price.toString(),
          maxGuests: room.maxGuests,
          hotel: {
            name: room.hotel.name,
          },
        };

        // Create booking
        const booking = await bookingService.createBooking({
          roomId: bookingData.roomId,
          userId: user.sub,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          guests: bookingData.guests,
          guestName: bookingData.guestName,
          guestPhone: bookingData.guestPhone,
          guestEmail: bookingData.guestEmail,
          guestNotes: bookingData.guestNotes,
          pricing,
          roomSnapshot,
        });

        set.status = 201;
        return {
          success: true,
          data: formatBookingForResponse(booking),
        };
      } catch (error: any) {
        set.status = error.status || 500;
        return {
          success: false,
          error: error.message || "Failed to create booking",
        };
      }
    },
    {
      body: CreateBookingDTO,
      detail: {
        tags: ["Bookings"],
        summary: "Create a new booking",
        description: "Create a new booking for a room (requires authentication)",
      },
    }
  )

  /**
   * Get user's bookings
   * GET /bookings/my
   */
  .get(
    "/my",
    async ({ query, user, set }) => {
      try {
        if (!user) {
          throw new AppError("Authentication required", 401);
        }

        const { page = 1, limit = 10, status, startDate, endDate, search } = query as any;

        const filters: any = {
          userId: user.sub,
        };

        if (status) {
          filters.status = status;
        }

        if (startDate) {
          filters.startDate = new Date(startDate);
        }

        if (endDate) {
          filters.endDate = new Date(endDate);
        }

        if (search) {
          filters.search = search;
        }

        const result = await bookingService.listBookings(
          filters,
          parseInt(page),
          parseInt(limit)
        );

        return {
          success: true,
          data: result.bookings.map(formatBookingForResponse),
          pagination: result.pagination,
        };
      } catch (error: any) {
        set.status = error.status || 500;
        return {
          success: false,
          error: error.message || "Failed to fetch bookings",
        };
      }
    },
    {
      detail: {
        tags: ["Bookings"],
        summary: "Get my bookings",
        description: "Get all bookings for the authenticated user",
      },
    }
  )

  /**
   * Get host's bookings (bookings for host's properties)
   * GET /bookings/host
   */
  .get(
    "/host",
    async ({ query, user, set }) => {
      try {
        if (!user) {
          throw new AppError("Authentication required", 401);
        }

        if (user.role !== "HOST" && user.role !== "ADMIN") {
          throw new AppError("Only hosts can access this endpoint", 403);
        }

        const { page = 1, limit = 10, status, startDate, endDate, search } = query as any;

        // Get host's hotels
        const hotels = await bookingService["prisma"].hotel.findMany({
          where: { ownerId: user.sub },
          select: { id: true },
        });

        const hotelIds = hotels.map((h) => h.id);

        if (hotelIds.length === 0) {
          return {
            success: true,
            data: [],
            pagination: {
              page: parseInt(page),
              limit: parseInt(limit),
              total: 0,
              totalPages: 0,
            },
          };
        }

        // Get bookings for these hotels
        const filters: any = {};

        if (status) {
          filters.status = status;
        }

        if (startDate) {
          filters.startDate = new Date(startDate);
        }

        if (endDate) {
          filters.endDate = new Date(endDate);
        }

        if (search) {
          filters.search = search;
        }

        // We need to filter by hotel IDs
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const bookings = await bookingService["prisma"].booking.findMany({
          where: {
            room: {
              hotelId: {
                in: hotelIds,
              },
            },
            status: filters.status,
            deletedAt: null,
          },
          skip,
          take: parseInt(limit),
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
        });

        const total = await bookingService["prisma"].booking.count({
          where: {
            room: {
              hotelId: {
                in: hotelIds,
              },
            },
            status: filters.status,
            deletedAt: null,
          },
        });

        return {
          success: true,
          data: bookings.map(formatBookingForResponse),
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            totalPages: Math.ceil(total / parseInt(limit)),
          },
        };
      } catch (error: any) {
        set.status = error.status || 500;
        return {
          success: false,
          error: error.message || "Failed to fetch host bookings",
        };
      }
    },
    {
      detail: {
        tags: ["Bookings"],
        summary: "Get host's bookings",
        description: "Get all bookings for the host's properties",
      },
    }
  )

  /**
   * Get booking by ID
   * GET /bookings/:id
   */
  .get(
    "/:id",
    async ({ params, user, set }) => {
      try {
        if (!user) {
          throw new AppError("Authentication required", 401);
        }

        const booking = await bookingService.getBookingById(
          params.id,
          user.sub,
          user.role
        );

        return {
          success: true,
          data: formatBookingForResponse(booking),
        };
      } catch (error: any) {
        set.status = error.status || 500;
        return {
          success: false,
          error: error.message || "Failed to fetch booking",
        };
      }
    },
    {
      detail: {
        tags: ["Bookings"],
        summary: "Get booking by ID",
        description: "Get detailed information about a specific booking",
      },
    }
  )

  /**
   * Get booking by code
   * GET /bookings/code/:code
   */
  .get(
    "/code/:code",
    async ({ params, user, set }) => {
      try {
        if (!user) {
          throw new AppError("Authentication required", 401);
        }

        const booking = await bookingService.getBookingByCode(
          params.code,
          user.sub,
          user.role
        );

        return {
          success: true,
          data: formatBookingForResponse(booking),
        };
      } catch (error: any) {
        set.status = error.status || 500;
        return {
          success: false,
          error: error.message || "Failed to fetch booking",
        };
      }
    },
    {
      detail: {
        tags: ["Bookings"],
        summary: "Get booking by code",
        description: "Get booking details using booking code",
      },
    }
  )

  /**
   * Cancel booking
   * POST /bookings/:id/cancel
   */
  .post(
    "/:id/cancel",
    async ({ params, body, user, set }) => {
      try {
        if (!user) {
          throw new AppError("Authentication required", 401);
        }

        const { reason } = (body as any) || {};

        const booking = await bookingService.cancelBooking(
          params.id,
          user.sub,
          user.role,
          reason
        );

        return {
          success: true,
          data: formatBookingForResponse(booking),
          message: "Booking cancelled successfully",
        };
      } catch (error: any) {
        set.status = error.status || 500;
        return {
          success: false,
          error: error.message || "Failed to cancel booking",
        };
      }
    },
    {
      body: CancelBookingDTO,
      detail: {
        tags: ["Bookings"],
        summary: "Cancel booking",
        description: "Cancel a booking (subject to cancellation policy)",
      },
    }
  )

  /**
   * Update booking status (Admin/Host only)
   * PATCH /bookings/:id/status
   */
  .patch(
    "/:id/status",
    async ({ params, body, user, set }) => {
      try {
        if (!user) {
          throw new AppError("Authentication required", 401);
        }

        if (user.role !== "ADMIN" && user.role !== "HOST") {
          throw new AppError("Only admins and hosts can update booking status", 403);
        }

        const { status, notes } = body as any;

        const booking = await bookingService.updateBookingStatus(
          params.id,
          status,
          user.sub,
          user.role,
          notes
        );

        return {
          success: true,
          data: formatBookingForResponse(booking),
          message: "Booking status updated successfully",
        };
      } catch (error: any) {
        set.status = error.status || 500;
        return {
          success: false,
          error: error.message || "Failed to update booking status",
        };
      }
    },
    {
      body: UpdateBookingStatusDTO,
      detail: {
        tags: ["Bookings"],
        summary: "Update booking status",
        description: "Update booking status (Admin/Host only)",
      },
    }
  )

  /**
   * Get booking statistics (Host only)
   * GET /bookings/stats/overview
   */
  .get(
    "/stats/overview",
    async ({ user, set }) => {
      try {
        if (!user) {
          throw new AppError("Authentication required", 401);
        }

        if (user.role !== "HOST" && user.role !== "ADMIN") {
          throw new AppError("Only hosts can access booking statistics", 403);
        }

        const stats = await bookingService.getHostBookingStats(user.sub);

        return {
          success: true,
          data: stats,
        };
      } catch (error: any) {
        set.status = error.status || 500;
        return {
          success: false,
          error: error.message || "Failed to fetch booking statistics",
        };
      }
    },
    {
      detail: {
        tags: ["Bookings"],
        summary: "Get booking statistics",
        description: "Get booking statistics for the host",
      },
    }
  )

  /**
   * Admin: List all bookings
   * GET /bookings/admin/all
   */
  .get(
    "/admin/all",
    async ({ query, user, set }) => {
      try {
        if (!user) {
          throw new AppError("Authentication required", 401);
        }

        if (user.role !== "ADMIN") {
          throw new AppError("Only admins can access all bookings", 403);
        }

        const { page = 1, limit = 10, status, startDate, endDate, search } = query as any;

        const filters: any = {};

        if (status) {
          filters.status = status;
        }

        if (startDate) {
          filters.startDate = new Date(startDate);
        }

        if (endDate) {
          filters.endDate = new Date(endDate);
        }

        if (search) {
          filters.search = search;
        }

        const result = await bookingService.listBookings(
          filters,
          parseInt(page),
          parseInt(limit)
        );

        return {
          success: true,
          data: result.bookings.map(formatBookingForResponse),
          pagination: result.pagination,
        };
      } catch (error: any) {
        set.status = error.status || 500;
        return {
          success: false,
          error: error.message || "Failed to fetch bookings",
        };
      }
    },
    {
      detail: {
        tags: ["Bookings - Admin"],
        summary: "Get all bookings (Admin)",
        description: "Get all bookings in the system (Admin only)",
      },
    }
  );
