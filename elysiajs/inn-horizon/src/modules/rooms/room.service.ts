import { prisma } from '../../lib/prisma';
import type { CreateRoomInput, UpdateRoomInput, GetRoomsQuery, CheckAvailabilityInput } from './room.schema';

/**
 * Create a new room
 */
export async function createRoom(ownerId: string, data: CreateRoomInput) {
  // Verify hotel ownership
  const hotel = await prisma.hotel.findFirst({
    where: {
      id: data.hotelId,
      ownerId,
      deletedAt: null,
    },
  });

  if (!hotel) {
    throw new Error('Hotel not found or you do not have permission to add rooms');
  }

  const room = await prisma.room.create({
    data: {
      hotelId: data.hotelId,
      name: data.name,
      type: data.type,
      maxGuests: data.maxGuests,
      totalRooms: data.totalRooms,
      size: data.size,
      bedType: data.bedType,
      price: data.price,
      extraBedPrice: data.extraBedPrice,
      extraBedAvailable: data.extraBedAvailable || false,
      order: data.order || 0,
      isActive: true,
    },
    include: {
      hotel: {
        select: {
          id: true,
          name: true,
          slug: true,
          city: true,
        },
      },
      photos: {
        orderBy: { order: 'asc' },
      },
    },
  });

  return room;
}

/**
 * Get rooms with filters and pagination
 */
export async function getRooms(query: GetRoomsQuery) {
  const {
    page = 1,
    limit = 10,
    hotelId,
    type,
    minPrice,
    maxPrice,
    minGuests,
    isActive,
    sortBy = 'order',
    sortOrder = 'asc',
  } = query;

  const skip = (page - 1) * limit;

  // Build where clause
  const where: any = {
    deletedAt: null,
  };

  if (hotelId) {
    where.hotelId = hotelId;
  }

  if (type) {
    where.type = { equals: type, mode: 'insensitive' };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) {
      where.price.gte = minPrice;
    }
    if (maxPrice !== undefined) {
      where.price.lte = maxPrice;
    }
  }

  if (minGuests !== undefined) {
    where.maxGuests = { gte: minGuests };
  }

  if (isActive !== undefined) {
    where.isActive = isActive;
  }

  // Build order by
  const orderBy: any = {};
  orderBy[sortBy] = sortOrder;

  // Execute queries
  const [rooms, total] = await Promise.all([
    prisma.room.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        hotel: {
          select: {
            id: true,
            name: true,
            slug: true,
            city: true,
            checkInTime: true,
            checkOutTime: true,
          },
        },
        photos: {
          orderBy: { order: 'asc' },
        },
      },
    }),
    prisma.room.count({ where }),
  ]);

  return {
    rooms,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Get room by ID
 */
export async function getRoomById(roomId: string) {
  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
      deletedAt: null,
    },
    include: {
      hotel: {
        select: {
          id: true,
          name: true,
          slug: true,
          city: true,
          address: true,
          checkInTime: true,
          checkOutTime: true,
          cancellationHours: true,
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
        },
      },
      photos: {
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!room) {
    throw new Error('Room not found');
  }

  return room;
}

/**
 * Update room
 */
export async function updateRoom(roomId: string, ownerId: string, data: UpdateRoomInput) {
  // Verify ownership through hotel
  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
      deletedAt: null,
    },
    include: {
      hotel: true,
    },
  });

  if (!room) {
    throw new Error('Room not found');
  }

  if (room.hotel.ownerId !== ownerId) {
    throw new Error('You do not have permission to update this room');
  }

  const updatedRoom = await prisma.room.update({
    where: { id: roomId },
    data,
    include: {
      hotel: {
        select: {
          id: true,
          name: true,
          slug: true,
          city: true,
        },
      },
      photos: {
        orderBy: { order: 'asc' },
      },
    },
  });

  return updatedRoom;
}

/**
 * Delete room (soft delete)
 */
export async function deleteRoom(roomId: string, ownerId: string) {
  // Verify ownership through hotel
  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
      deletedAt: null,
    },
    include: {
      hotel: true,
    },
  });

  if (!room) {
    throw new Error('Room not found');
  }

  if (room.hotel.ownerId !== ownerId) {
    throw new Error('You do not have permission to delete this room');
  }

  // Check if room has active bookings
  const activeBookings = await prisma.booking.count({
    where: {
      roomId,
      status: {
        in: ['PENDING', 'PAID', 'CONFIRMED', 'CHECKED_IN'],
      },
    },
  });

  if (activeBookings > 0) {
    throw new Error('Cannot delete room with active bookings');
  }

  await prisma.room.update({
    where: { id: roomId },
    data: {
      deletedAt: new Date(),
    },
  });
}

// ====================== ROOM PHOTOS ======================

/**
 * Add room photo
 */
export async function addRoomPhoto(roomId: string, ownerId: string, url: string, order: number = 0) {
  // Verify ownership through hotel
  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
      deletedAt: null,
    },
    include: {
      hotel: true,
    },
  });

  if (!room) {
    throw new Error('Room not found');
  }

  if (room.hotel.ownerId !== ownerId) {
    throw new Error('You do not have permission to add photos to this room');
  }

  return await prisma.roomPhoto.create({
    data: {
      roomId,
      url,
      order,
    },
  });
}

/**
 * Get room photos
 */
export async function getRoomPhotos(roomId: string) {
  return await prisma.roomPhoto.findMany({
    where: { roomId },
    orderBy: { order: 'asc' },
  });
}

/**
 * Update room photos order
 */
export async function updateRoomPhotosOrder(
  roomId: string,
  ownerId: string,
  photos: Array<{ id: string; order: number }>
) {
  // Verify ownership through hotel
  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
      deletedAt: null,
    },
    include: {
      hotel: true,
    },
  });

  if (!room) {
    throw new Error('Room not found');
  }

  if (room.hotel.ownerId !== ownerId) {
    throw new Error('You do not have permission to update photos for this room');
  }

  // Update photos order in transaction
  await prisma.$transaction(
    photos.map((photo) =>
      prisma.roomPhoto.update({
        where: { id: photo.id, roomId },
        data: { order: photo.order },
      })
    )
  );

  return await getRoomPhotos(roomId);
}

/**
 * Delete room photo
 */
export async function deleteRoomPhoto(roomId: string, ownerId: string, photoId: string) {
  // Verify ownership through hotel
  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
      deletedAt: null,
    },
    include: {
      hotel: true,
    },
  });

  if (!room) {
    throw new Error('Room not found');
  }

  if (room.hotel.ownerId !== ownerId) {
    throw new Error('You do not have permission to delete photos from this room');
  }

  await prisma.roomPhoto.delete({
    where: {
      id: photoId,
      roomId,
    },
  });
}

// ====================== ROOM AVAILABILITY ======================

/**
 * Check room availability for given dates
 */
export async function checkRoomAvailability(roomId: string, data: CheckAvailabilityInput) {
  const { checkIn, checkOut, guests = 1 } = data;

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  // Validate dates
  if (checkInDate >= checkOutDate) {
    throw new Error('Check-out date must be after check-in date');
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (checkInDate < today) {
    throw new Error('Check-in date cannot be in the past');
  }

  // Get room details
  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
      isActive: true,
      deletedAt: null,
    },
    include: {
      hotel: {
        select: {
          id: true,
          name: true,
          checkInTime: true,
          checkOutTime: true,
        },
      },
    },
  });

  if (!room) {
    throw new Error('Room not found or not available');
  }

  if (guests > room.maxGuests) {
    throw new Error(`Room can accommodate maximum ${room.maxGuests} guests`);
  }

  // Generate all dates between check-in and check-out (excluding check-out date)
  const dates: Date[] = [];
  const currentDate = new Date(checkInDate);
  while (currentDate < checkOutDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Count booked rooms for each date
  const bookedCounts = await Promise.all(
    dates.map(async (date) => {
      const count = await prisma.bookingDate.count({
        where: {
          roomId,
          date,
          booking: {
            status: {
              in: ['PENDING', 'PAID', 'CONFIRMED', 'CHECKED_IN'],
            },
          },
        },
      });
      return { date, count };
    })
  );

  // Check if any date is fully booked
  const unavailableDates = bookedCounts.filter((bc) => bc.count >= room.totalRooms);

  const isAvailable = unavailableDates.length === 0;
  const availableRooms = isAvailable
    ? room.totalRooms - Math.max(...bookedCounts.map((bc) => bc.count))
    : 0;

  return {
    available: isAvailable,
    roomId: room.id,
    roomName: room.name,
    totalRooms: room.totalRooms,
    availableRooms,
    checkIn,
    checkOut,
    nights: dates.length,
    guests,
    price: room.price,
    totalPrice: Number(room.price) * dates.length,
    unavailableDates: unavailableDates.map((ud) => ud.date),
  };
}

/**
 * Get available rooms for a hotel and date range
 */
export async function getAvailableRooms(hotelId: string, data: CheckAvailabilityInput) {
  const { checkIn, checkOut, guests = 1 } = data;

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  // Validate dates
  if (checkInDate >= checkOutDate) {
    throw new Error('Check-out date must be after check-in date');
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (checkInDate < today) {
    throw new Error('Check-in date cannot be in the past');
  }

  // Get all active rooms for the hotel
  const rooms = await prisma.room.findMany({
    where: {
      hotelId,
      isActive: true,
      deletedAt: null,
      maxGuests: { gte: guests },
    },
    include: {
      photos: {
        orderBy: { order: 'asc' },
        take: 1,
      },
    },
    orderBy: { order: 'asc' },
  });

  // Generate all dates between check-in and check-out (excluding check-out date)
  const dates: Date[] = [];
  const currentDate = new Date(checkInDate);
  while (currentDate < checkOutDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const nights = dates.length;

  // Check availability for each room
  const roomsWithAvailability = await Promise.all(
    rooms.map(async (room) => {
      // Count booked rooms for each date
      const bookedCounts = await Promise.all(
        dates.map(async (date) => {
          const count = await prisma.bookingDate.count({
            where: {
              roomId: room.id,
              date,
              booking: {
                status: {
                  in: ['PENDING', 'PAID', 'CONFIRMED', 'CHECKED_IN'],
                },
              },
            },
          });
          return count;
        })
      );

      const maxBooked = Math.max(...bookedCounts);
      const availableRooms = room.totalRooms - maxBooked;
      const isAvailable = availableRooms > 0;

      return {
        ...room,
        isAvailable,
        availableRooms,
        nights,
        totalPrice: Number(room.price) * nights,
      };
    })
  );

  // Filter only available rooms
  const availableRooms = roomsWithAvailability.filter((room) => room.isAvailable);

  return {
    hotelId,
    checkIn,
    checkOut,
    nights,
    guests,
    totalRooms: availableRooms.length,
    rooms: availableRooms,
  };
}

/**
 * Get room types for a hotel
 */
export async function getRoomTypes(hotelId: string) {
  const rooms = await prisma.room.findMany({
    where: {
      hotelId,
      isActive: true,
      deletedAt: null,
    },
    select: {
      type: true,
    },
    distinct: ['type'],
  });

  return rooms.map((r) => r.type);
}
