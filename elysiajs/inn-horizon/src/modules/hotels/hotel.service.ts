import { prisma } from '../../lib/prisma';
import type { CreateHotelInput, UpdateHotelInput, GetHotelsQuery } from './hotel.schema';

/**
 * Generate unique slug from hotel name
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Ensure slug is unique by appending number if needed
 */
async function ensureUniqueSlug(baseSlug: string, excludeHotelId?: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.hotel.findFirst({
      where: {
        slug,
        deletedAt: null,
        ...(excludeHotelId ? { id: { not: excludeHotelId } } : {}),
      },
    });

    if (!existing) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

/**
 * Create a new hotel
 */
export async function createHotel(ownerId: string, data: CreateHotelInput) {
  const baseSlug = generateSlug(data.name);
  const uniqueSlug = await ensureUniqueSlug(baseSlug);

  const hotel = await prisma.hotel.create({
    data: {
      ownerId,
      slug: uniqueSlug,
      name: data.name,
      address: data.address,
      city: data.city,
      province: data.province,
      latitude: data.latitude,
      longitude: data.longitude,
      description: data.description,
      checkInTime: data.checkInTime || '14:00',
      checkOutTime: data.checkOutTime || '12:00',
      cancellationHours: data.cancellationHours,
      isActive: true,
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      photos: {
        orderBy: { order: 'asc' },
      },
      amenities: true,
      _count: {
        select: {
          rooms: true,
          reviews: true,
        },
      },
    },
  });

  return hotel;
}

/**
 * Get hotels with filters and pagination
 */
export async function getHotels(query: GetHotelsQuery) {
  const {
    page = 1,
    limit = 10,
    search,
    city,
    province,
    minRating,
    isActive,
    ownerId,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = query;

  const skip = (page - 1) * limit;

  // Build where clause
  const where: any = {
    deletedAt: null,
  };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { city: { contains: search, mode: 'insensitive' } },
      { address: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (city) {
    where.city = { equals: city, mode: 'insensitive' };
  }

  if (province) {
    where.province = { equals: province, mode: 'insensitive' };
  }

  if (minRating !== undefined) {
    where.avgRating = { gte: minRating };
  }

  if (isActive !== undefined) {
    where.isActive = isActive;
  }

  if (ownerId) {
    where.ownerId = ownerId;
  }

  // Build order by
  const orderBy: any = {};
  orderBy[sortBy] = sortOrder;

  // Execute queries
  const [hotels, total] = await Promise.all([
    prisma.hotel.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        photos: {
          orderBy: { order: 'asc' },
          take: 5,
        },
        amenities: true,
        _count: {
          select: {
            rooms: true,
            reviews: true,
          },
        },
      },
    }),
    prisma.hotel.count({ where }),
  ]);

  // Calculate minimum room price for each hotel
  const hotelsWithMinPrice = await Promise.all(
    hotels.map(async (hotel) => {
      const minPriceRoom = await prisma.room.findFirst({
        where: {
          hotelId: hotel.id,
          isActive: true,
          deletedAt: null,
        },
        orderBy: {
          price: 'asc',
        },
        select: {
          price: true,
        },
      });

      return {
        ...hotel,
        minPrice: minPriceRoom?.price || null,
      };
    })
  );

  return {
    hotels: hotelsWithMinPrice,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Get hotel by ID
 */
export async function getHotelById(hotelId: string) {
  const hotel = await prisma.hotel.findFirst({
    where: {
      id: hotelId,
      deletedAt: null,
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      photos: {
        orderBy: { order: 'asc' },
      },
      amenities: true,
      rooms: {
        where: {
          isActive: true,
          deletedAt: null,
        },
        orderBy: { order: 'asc' },
        include: {
          photos: {
            orderBy: { order: 'asc' },
          },
        },
      },
      reviews: {
        where: {
          deletedAt: null,
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          rooms: true,
          reviews: true,
        },
      },
    },
  });

  if (!hotel) {
    throw new Error('Hotel not found');
  }

  // Get minimum room price
  const minPriceRoom = await prisma.room.findFirst({
    where: {
      hotelId: hotel.id,
      isActive: true,
      deletedAt: null,
    },
    orderBy: {
      price: 'asc',
    },
    select: {
      price: true,
    },
  });

  return {
    ...hotel,
    minPrice: minPriceRoom?.price || null,
  };
}

/**
 * Get hotel by slug
 */
export async function getHotelBySlug(slug: string) {
  const hotel = await prisma.hotel.findFirst({
    where: {
      slug,
      deletedAt: null,
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      photos: {
        orderBy: { order: 'asc' },
      },
      amenities: true,
      rooms: {
        where: {
          isActive: true,
          deletedAt: null,
        },
        orderBy: { order: 'asc' },
        include: {
          photos: {
            orderBy: { order: 'asc' },
          },
        },
      },
      reviews: {
        where: {
          deletedAt: null,
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          rooms: true,
          reviews: true,
        },
      },
    },
  });

  if (!hotel) {
    throw new Error('Hotel not found');
  }

  // Get minimum room price
  const minPriceRoom = await prisma.room.findFirst({
    where: {
      hotelId: hotel.id,
      isActive: true,
      deletedAt: null,
    },
    orderBy: {
      price: 'asc',
    },
    select: {
      price: true,
    },
  });

  return {
    ...hotel,
    minPrice: minPriceRoom?.price || null,
  };
}

/**
 * Update hotel
 */
export async function updateHotel(hotelId: string, ownerId: string, data: UpdateHotelInput) {
  // Verify ownership
  const hotel = await prisma.hotel.findFirst({
    where: {
      id: hotelId,
      ownerId,
      deletedAt: null,
    },
  });

  if (!hotel) {
    throw new Error('Hotel not found or you do not have permission to update it');
  }

  // If name is changing, generate new slug
  let slug = hotel.slug;
  if (data.name && data.name !== hotel.name) {
    const baseSlug = generateSlug(data.name);
    slug = await ensureUniqueSlug(baseSlug, hotelId);
  }

  const updatedHotel = await prisma.hotel.update({
    where: { id: hotelId },
    data: {
      ...data,
      slug,
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      photos: {
        orderBy: { order: 'asc' },
      },
      amenities: true,
      _count: {
        select: {
          rooms: true,
          reviews: true,
        },
      },
    },
  });

  return updatedHotel;
}

/**
 * Delete hotel (soft delete)
 */
export async function deleteHotel(hotelId: string, ownerId: string) {
  // Verify ownership
  const hotel = await prisma.hotel.findFirst({
    where: {
      id: hotelId,
      ownerId,
      deletedAt: null,
    },
  });

  if (!hotel) {
    throw new Error('Hotel not found or you do not have permission to delete it');
  }

  // Check if hotel has active bookings
  const activeBookings = await prisma.booking.count({
    where: {
      room: {
        hotelId,
      },
      status: {
        in: ['PENDING', 'PAID', 'CONFIRMED', 'CHECKED_IN'],
      },
    },
  });

  if (activeBookings > 0) {
    throw new Error('Cannot delete hotel with active bookings');
  }

  await prisma.hotel.update({
    where: { id: hotelId },
    data: {
      deletedAt: new Date(),
    },
  });
}

/**
 * Update hotel cover photo
 */
export async function updateHotelCoverPhoto(hotelId: string, ownerId: string, coverPhoto: string) {
  // Verify ownership
  const hotel = await prisma.hotel.findFirst({
    where: {
      id: hotelId,
      ownerId,
      deletedAt: null,
    },
  });

  if (!hotel) {
    throw new Error('Hotel not found or you do not have permission to update it');
  }

  return await prisma.hotel.update({
    where: { id: hotelId },
    data: { coverPhoto },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      photos: {
        orderBy: { order: 'asc' },
      },
      amenities: true,
    },
  });
}

// ====================== HOTEL PHOTOS ======================

/**
 * Add hotel photo
 */
export async function addHotelPhoto(hotelId: string, ownerId: string, url: string, order: number = 0) {
  // Verify ownership
  const hotel = await prisma.hotel.findFirst({
    where: {
      id: hotelId,
      ownerId,
      deletedAt: null,
    },
  });

  if (!hotel) {
    throw new Error('Hotel not found or you do not have permission to add photos');
  }

  return await prisma.hotelPhoto.create({
    data: {
      hotelId,
      url,
      order,
    },
  });
}

/**
 * Get hotel photos
 */
export async function getHotelPhotos(hotelId: string) {
  return await prisma.hotelPhoto.findMany({
    where: { hotelId },
    orderBy: { order: 'asc' },
  });
}

/**
 * Update hotel photos order
 */
export async function updateHotelPhotosOrder(
  hotelId: string,
  ownerId: string,
  photos: Array<{ id: string; order: number }>
) {
  // Verify ownership
  const hotel = await prisma.hotel.findFirst({
    where: {
      id: hotelId,
      ownerId,
      deletedAt: null,
    },
  });

  if (!hotel) {
    throw new Error('Hotel not found or you do not have permission to update photos');
  }

  // Update photos order in transaction
  await prisma.$transaction(
    photos.map((photo) =>
      prisma.hotelPhoto.update({
        where: { id: photo.id, hotelId },
        data: { order: photo.order },
      })
    )
  );

  return await getHotelPhotos(hotelId);
}

/**
 * Delete hotel photo
 */
export async function deleteHotelPhoto(hotelId: string, ownerId: string, photoId: string) {
  // Verify ownership
  const hotel = await prisma.hotel.findFirst({
    where: {
      id: hotelId,
      ownerId,
      deletedAt: null,
    },
  });

  if (!hotel) {
    throw new Error('Hotel not found or you do not have permission to delete photos');
  }

  await prisma.hotelPhoto.delete({
    where: {
      id: photoId,
      hotelId,
    },
  });
}

// ====================== HOTEL AMENITIES ======================

/**
 * Add hotel amenity
 */
export async function addHotelAmenity(
  hotelId: string,
  ownerId: string,
  name: string,
  icon?: string
) {
  // Verify ownership
  const hotel = await prisma.hotel.findFirst({
    where: {
      id: hotelId,
      ownerId,
      deletedAt: null,
    },
  });

  if (!hotel) {
    throw new Error('Hotel not found or you do not have permission to add amenities');
  }

  return await prisma.hotelAmenity.create({
    data: {
      hotelId,
      name,
      icon,
    },
  });
}

/**
 * Get hotel amenities
 */
export async function getHotelAmenities(hotelId: string) {
  return await prisma.hotelAmenity.findMany({
    where: { hotelId },
    orderBy: { name: 'asc' },
  });
}

/**
 * Update hotel amenity
 */
export async function updateHotelAmenity(
  hotelId: string,
  ownerId: string,
  amenityId: string,
  data: { name?: string; icon?: string }
) {
  // Verify ownership
  const hotel = await prisma.hotel.findFirst({
    where: {
      id: hotelId,
      ownerId,
      deletedAt: null,
    },
  });

  if (!hotel) {
    throw new Error('Hotel not found or you do not have permission to update amenities');
  }

  return await prisma.hotelAmenity.update({
    where: {
      id: amenityId,
      hotelId,
    },
    data,
  });
}

/**
 * Delete hotel amenity
 */
export async function deleteHotelAmenity(hotelId: string, ownerId: string, amenityId: string) {
  // Verify ownership
  const hotel = await prisma.hotel.findFirst({
    where: {
      id: hotelId,
      ownerId,
      deletedAt: null,
    },
  });

  if (!hotel) {
    throw new Error('Hotel not found or you do not have permission to delete amenities');
  }

  await prisma.hotelAmenity.delete({
    where: {
      id: amenityId,
      hotelId,
    },
  });
}

// ====================== HOTEL STATISTICS ======================

/**
 * Get hotel statistics for owner
 */
export async function getHotelStatistics(ownerId: string) {
  const [totalHotels, activeHotels, totalRooms, totalReviews, avgRating] = await Promise.all([
    prisma.hotel.count({
      where: {
        ownerId,
        deletedAt: null,
      },
    }),
    prisma.hotel.count({
      where: {
        ownerId,
        isActive: true,
        deletedAt: null,
      },
    }),
    prisma.room.count({
      where: {
        hotel: {
          ownerId,
          deletedAt: null,
        },
        deletedAt: null,
      },
    }),
    prisma.review.count({
      where: {
        hotel: {
          ownerId,
          deletedAt: null,
        },
        deletedAt: null,
      },
    }),
    prisma.hotel.aggregate({
      where: {
        ownerId,
        deletedAt: null,
      },
      _avg: {
        avgRating: true,
      },
    }),
  ]);

  return {
    totalHotels,
    activeHotels,
    inactiveHotels: totalHotels - activeHotels,
    totalRooms,
    totalReviews,
    avgRating: avgRating._avg.avgRating || 0,
  };
}

/**
 * Get all cities with hotels
 */
export async function getCities() {
  const hotels = await prisma.hotel.findMany({
    where: {
      deletedAt: null,
      isActive: true,
    },
    select: {
      city: true,
      province: true,
    },
    distinct: ['city'],
  });

  return hotels.map((h) => ({
    city: h.city,
    province: h.province,
  }));
}
