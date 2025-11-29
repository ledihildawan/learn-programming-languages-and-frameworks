import { hash } from "bcryptjs";
import { prisma } from ".";
import {
  UserRole,
  BookingStatus,
  PaymentProvider,
  PaymentStatus,
  LedgerType,
  PayoutStatus,
} from "../generated/prisma/enums";

async function main() {
  console.log("🌱 Starting seed...");

  // Disable constraints and triggers temporarily to allow historical data
  await prisma.$executeRawUnsafe(
    'ALTER TABLE "bookings" DROP CONSTRAINT IF EXISTS chk_checkin_future;',
  );
  await prisma.$executeRawUnsafe(
    'ALTER TABLE "bookings" DROP CONSTRAINT IF EXISTS chk_expiredat_future;',
  );
  await prisma.$executeRawUnsafe(
    "DROP TRIGGER IF EXISTS trg_payment_amount_match ON payments;",
  );
  await prisma.$executeRawUnsafe(
    "DROP TRIGGER IF EXISTS trg_ledger_immutable ON host_ledgers;",
  );
  await prisma.$executeRawUnsafe(
    "DROP TRIGGER IF EXISTS trg_payout_limit ON payouts;",
  );
  console.log("⚠️  Temporarily disabled check constraints and triggers");

  // Clear existing data (in correct order to respect foreign keys)
  await prisma.hostLedger.deleteMany();
  await prisma.payout.deleteMany();
  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.bookingDate.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.roomPhoto.deleteMany();
  await prisma.room.deleteMany();
  await prisma.hotelAmenity.deleteMany();
  await prisma.hotelPhoto.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.user.deleteMany();

  console.log("🗑️  Cleared existing data");

  // Hash password for all users
  const hashedPassword = await hash("password123", 10);

  // Create Users
  const admin = await prisma.user.create({
    data: {
      role: UserRole.ADMIN,
      name: "Admin User",
      email: "admin@innhorizon.com",
      password: hashedPassword,
      phone: "+6281234567890",
      avatar: "https://i.pravatar.cc/150?u=admin",
      isVerified: true,
    },
  });

  const host1 = await prisma.user.create({
    data: {
      role: UserRole.HOST,
      name: "John Doe",
      email: "john.host@innhorizon.com",
      password: hashedPassword,
      phone: "+6281234567891",
      avatar: "https://i.pravatar.cc/150?u=john",
      isVerified: true,
      bankName: "Bank Central Asia",
      bankCode: "BCA",
      accountNumber: "1234567890",
      accountName: "John Doe",
      walletBalance: 5000000,
    },
  });

  const host2 = await prisma.user.create({
    data: {
      role: UserRole.HOST,
      name: "Jane Smith",
      email: "jane.host@innhorizon.com",
      password: hashedPassword,
      phone: "+6281234567892",
      avatar: "https://i.pravatar.cc/150?u=jane",
      isVerified: true,
      bankName: "Bank Mandiri",
      bankCode: "MANDIRI",
      accountNumber: "9876543210",
      accountName: "Jane Smith",
      walletBalance: 3000000,
    },
  });

  const customer1 = await prisma.user.create({
    data: {
      role: UserRole.CUSTOMER,
      name: "Alice Johnson",
      email: "alice@example.com",
      password: hashedPassword,
      phone: "+6281234567893",
      avatar: "https://i.pravatar.cc/150?u=alice",
      isVerified: true,
    },
  });

  const customer2 = await prisma.user.create({
    data: {
      role: UserRole.CUSTOMER,
      name: "Bob Williams",
      email: "bob@example.com",
      password: hashedPassword,
      phone: "+6281234567894",
      avatar: "https://i.pravatar.cc/150?u=bob",
      isVerified: true,
    },
  });

  const customer3 = await prisma.user.create({
    data: {
      role: UserRole.CUSTOMER,
      name: "Charlie Brown",
      email: "charlie@example.com",
      password: hashedPassword,
      phone: "+6281234567895",
      isVerified: false,
    },
  });

  console.log("✅ Created users");

  // Create Hotels
  const hotel1 = await prisma.hotel.create({
    data: {
      ownerId: host1.id,
      name: "Grand Sunrise Hotel",
      slug: "grand-sunrise-hotel-jakarta",
      address: "Jl. Sudirman No. 123",
      city: "Jakarta",
      province: "DKI Jakarta",
      latitude: -6.2088,
      longitude: 106.8456,
      description:
        "Luxury hotel in the heart of Jakarta with stunning city views. Features modern amenities, rooftop pool, and world-class restaurants.",
      coverPhoto:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      checkInTime: "14:00",
      checkOutTime: "12:00",
      cancellationHours: 24,
      isActive: true,
      avgRating: 4.5,
      totalReview: 128,
    },
  });

  const hotel2 = await prisma.hotel.create({
    data: {
      ownerId: host1.id,
      name: "Bali Beach Resort",
      slug: "bali-beach-resort-denpasar",
      address: "Jl. Pantai Kuta No. 45",
      city: "Denpasar",
      province: "Bali",
      latitude: -8.7467,
      longitude: 115.1681,
      description:
        "Beachfront resort with private beach access, infinity pool, and tropical gardens. Perfect for a relaxing getaway.",
      coverPhoto:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      checkInTime: "15:00",
      checkOutTime: "11:00",
      cancellationHours: 48,
      isActive: true,
      avgRating: 4.8,
      totalReview: 256,
    },
  });

  const hotel3 = await prisma.hotel.create({
    data: {
      ownerId: host2.id,
      name: "Mountain View Lodge",
      slug: "mountain-view-lodge-bandung",
      address: "Jl. Raya Lembang No. 78",
      city: "Bandung",
      province: "Jawa Barat",
      latitude: -6.8111,
      longitude: 107.617,
      description:
        "Cozy lodge nestled in the mountains with breathtaking views, perfect for nature lovers and adventurers.",
      coverPhoto:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      checkInTime: "14:00",
      checkOutTime: "12:00",
      cancellationHours: 24,
      isActive: true,
      avgRating: 4.3,
      totalReview: 87,
    },
  });

  const hotel4 = await prisma.hotel.create({
    data: {
      ownerId: host2.id,
      name: "Urban Boutique Hotel",
      slug: "urban-boutique-hotel-surabaya",
      address: "Jl. Tunjungan No. 56",
      city: "Surabaya",
      province: "Jawa Timur",
      latitude: -7.2575,
      longitude: 112.7521,
      description:
        "Modern boutique hotel with artistic design, located in the shopping district. Walking distance to major attractions.",
      coverPhoto: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      checkInTime: "14:00",
      checkOutTime: "12:00",
      cancellationHours: 24,
      isActive: true,
      avgRating: 4.6,
      totalReview: 143,
    },
  });

  console.log("✅ Created hotels");

  // Create Hotel Photos
  await prisma.hotelPhoto.createMany({
    data: [
      {
        hotelId: hotel1.id,
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        order: 1,
      },
      {
        hotelId: hotel1.id,
        url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
        order: 2,
      },
      {
        hotelId: hotel1.id,
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
        order: 3,
      },
      {
        hotelId: hotel2.id,
        url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        order: 1,
      },
      {
        hotelId: hotel2.id,
        url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
        order: 2,
      },
      {
        hotelId: hotel3.id,
        url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
        order: 1,
      },
      {
        hotelId: hotel3.id,
        url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
        order: 2,
      },
      {
        hotelId: hotel4.id,
        url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
        order: 1,
      },
    ],
  });

  console.log("✅ Created hotel photos");

  // Create Hotel Amenities
  await prisma.hotelAmenity.createMany({
    data: [
      { hotelId: hotel1.id, name: "Free WiFi", icon: "📶" },
      { hotelId: hotel1.id, name: "Swimming Pool", icon: "🏊" },
      { hotelId: hotel1.id, name: "Gym", icon: "💪" },
      { hotelId: hotel1.id, name: "Restaurant", icon: "🍽️" },
      { hotelId: hotel1.id, name: "Spa", icon: "💆" },
      { hotelId: hotel1.id, name: "Parking", icon: "🅿️" },
      { hotelId: hotel2.id, name: "Free WiFi", icon: "📶" },
      { hotelId: hotel2.id, name: "Private Beach", icon: "🏖️" },
      { hotelId: hotel2.id, name: "Swimming Pool", icon: "🏊" },
      { hotelId: hotel2.id, name: "Restaurant", icon: "🍽️" },
      { hotelId: hotel2.id, name: "Bar", icon: "🍹" },
      { hotelId: hotel3.id, name: "Free WiFi", icon: "📶" },
      { hotelId: hotel3.id, name: "Hiking Trails", icon: "🥾" },
      { hotelId: hotel3.id, name: "Restaurant", icon: "🍽️" },
      { hotelId: hotel3.id, name: "Parking", icon: "🅿️" },
      { hotelId: hotel4.id, name: "Free WiFi", icon: "📶" },
      { hotelId: hotel4.id, name: "Gym", icon: "💪" },
      { hotelId: hotel4.id, name: "Restaurant", icon: "🍽️" },
      { hotelId: hotel4.id, name: "Meeting Room", icon: "👔" },
    ],
  });

  console.log("✅ Created hotel amenities");

  // Create Rooms
  const room1 = await prisma.room.create({
    data: {
      hotelId: hotel1.id,
      name: "Deluxe King Room",
      type: "Deluxe",
      maxGuests: 2,
      totalRooms: 10,
      size: 32,
      bedType: "King Bed",
      price: 1500000,
      extraBedPrice: 200000,
      extraBedAvailable: true,
      isActive: true,
      order: 1,
    },
  });

  const room2 = await prisma.room.create({
    data: {
      hotelId: hotel1.id,
      name: "Executive Suite",
      type: "Suite",
      maxGuests: 4,
      totalRooms: 5,
      size: 55,
      bedType: "King Bed + Sofa Bed",
      price: 2800000,
      extraBedPrice: 300000,
      extraBedAvailable: true,
      isActive: true,
      order: 2,
    },
  });

  const room3 = await prisma.room.create({
    data: {
      hotelId: hotel1.id,
      name: "Standard Twin Room",
      type: "Standard",
      maxGuests: 2,
      totalRooms: 15,
      size: 28,
      bedType: "Twin Beds",
      price: 1200000,
      extraBedPrice: 150000,
      extraBedAvailable: true,
      isActive: true,
      order: 3,
    },
  });

  const room4 = await prisma.room.create({
    data: {
      hotelId: hotel2.id,
      name: "Ocean View Villa",
      type: "Villa",
      maxGuests: 6,
      totalRooms: 8,
      size: 120,
      bedType: "2 King Beds",
      price: 5500000,
      extraBedPrice: 500000,
      extraBedAvailable: true,
      isActive: true,
      order: 1,
    },
  });

  const room5 = await prisma.room.create({
    data: {
      hotelId: hotel2.id,
      name: "Beach Bungalow",
      type: "Bungalow",
      maxGuests: 3,
      totalRooms: 12,
      size: 45,
      bedType: "Queen Bed",
      price: 2200000,
      extraBedPrice: 250000,
      extraBedAvailable: true,
      isActive: true,
      order: 2,
    },
  });

  const room6 = await prisma.room.create({
    data: {
      hotelId: hotel3.id,
      name: "Mountain Cabin",
      type: "Cabin",
      maxGuests: 4,
      totalRooms: 6,
      size: 40,
      bedType: "Queen Bed",
      price: 1800000,
      extraBedPrice: 200000,
      extraBedAvailable: true,
      isActive: true,
      order: 1,
    },
  });

  const room7 = await prisma.room.create({
    data: {
      hotelId: hotel4.id,
      name: "Urban Loft",
      type: "Loft",
      maxGuests: 2,
      totalRooms: 10,
      size: 38,
      bedType: "King Bed",
      price: 1650000,
      extraBedPrice: 180000,
      extraBedAvailable: true,
      isActive: true,
      order: 1,
    },
  });

  console.log("✅ Created rooms");

  // Create Room Photos
  await prisma.roomPhoto.createMany({
    data: [
      {
        roomId: room1.id,
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
        order: 1,
      },
      {
        roomId: room1.id,
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
        order: 2,
      },
      {
        roomId: room2.id,
        url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        order: 1,
      },
      {
        roomId: room2.id,
        url: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6",
        order: 2,
      },
      {
        roomId: room3.id,
        url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
        order: 1,
      },
      {
        roomId: room4.id,
        url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        order: 1,
      },
      {
        roomId: room4.id,
        url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
        order: 2,
      },
      {
        roomId: room5.id,
        url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
        order: 1,
      },
      {
        roomId: room6.id,
        url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
        order: 1,
      },
      {
        roomId: room7.id,
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
        order: 1,
      },
    ],
  });

  console.log("✅ Created room photos");

  // Create Bookings
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const nextMonth = new Date(today);
  nextMonth.setDate(nextMonth.getDate() + 30);
  const lastMonth = new Date(today);
  lastMonth.setDate(lastMonth.getDate() - 30);
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  // Completed Booking 1
  const booking1 = await prisma.booking.create({
    data: {
      userId: customer1.id,
      roomId: room1.id,
      checkIn: lastMonth,
      checkOut: lastWeek,
      bookingCode: "BK-001-2024",
      nights: 23,
      guests: 2,
      guestName: "Alice Johnson",
      guestPhone: "+6281234567893",
      guestEmail: "alice@example.com",
      guestNotes: "Please prepare extra towels",
      totalPrice: 34500000,
      platformFee: 1725000,
      hostPayout: 32775000,
      status: BookingStatus.COMPLETED,
      confirmedAt: new Date(lastMonth.getTime() - 86400000 * 2),
      checkedInAt: lastMonth,
      roomSnapshot: {
        name: "Deluxe King Room",
        type: "Deluxe",
        price: 1500000,
        hotelName: "Grand Sunrise Hotel",
      },
    },
  });

  // Create payment for booking1
  const payment1 = await prisma.payment.create({
    data: {
      bookingId: booking1.id,
      amount: 34500000,
      provider: PaymentProvider.MIDTRANS,
      providerRef: "MIDTRANS-001",
      status: PaymentStatus.SETTLED,
      paidAt: new Date(lastMonth.getTime() - 86400000 * 2),
    },
  });

  // Update booking1 with paymentId
  await prisma.booking.update({
    where: { id: booking1.id },
    data: { paymentId: payment1.id },
  });

  // Confirmed Booking 2
  const booking2 = await prisma.booking.create({
    data: {
      userId: customer2.id,
      roomId: room4.id,
      checkIn: tomorrow,
      checkOut: nextWeek,
      bookingCode: "BK-002-2024",
      nights: 6,
      guests: 4,
      guestName: "Bob Williams",
      guestPhone: "+6281234567894",
      guestEmail: "bob@example.com",
      totalPrice: 33000000,
      platformFee: 1650000,
      hostPayout: 31350000,
      status: BookingStatus.CONFIRMED,
      confirmedAt: today,
      roomSnapshot: {
        name: "Ocean View Villa",
        type: "Villa",
        price: 5500000,
        hotelName: "Bali Beach Resort",
      },
    },
  });

  const payment2 = await prisma.payment.create({
    data: {
      bookingId: booking2.id,
      amount: 33000000,
      provider: PaymentProvider.MIDTRANS,
      providerRef: "MIDTRANS-002",
      status: PaymentStatus.SETTLED,
      paidAt: today,
    },
  });

  await prisma.booking.update({
    where: { id: booking2.id },
    data: { paymentId: payment2.id },
  });

  // Pending Booking 3
  const booking3 = await prisma.booking.create({
    data: {
      userId: customer3.id,
      roomId: room7.id,
      checkIn: nextWeek,
      checkOut: nextMonth,
      bookingCode: "BK-003-2024",
      nights: 23,
      guests: 2,
      guestName: "Charlie Brown",
      guestPhone: "+6281234567895",
      guestEmail: "charlie@example.com",
      totalPrice: 37950000,
      platformFee: 1897500,
      hostPayout: 36052500,
      status: BookingStatus.PENDING,
      expiredAt: new Date(today.getTime() + 86400000), // 24 hours from now
      roomSnapshot: {
        name: "Urban Loft",
        type: "Loft",
        price: 1650000,
        hotelName: "Urban Boutique Hotel",
      },
    },
  });

  const payment3 = await prisma.payment.create({
    data: {
      bookingId: booking3.id,
      amount: 37950000,
      provider: PaymentProvider.MIDTRANS,
      status: PaymentStatus.PENDING,
      snapToken: "SNAP-TOKEN-003",
      paymentUrl:
        "https://app.sandbox.midtrans.com/snap/v3/redirection/SNAP-TOKEN-003",
      expiredAt: new Date(today.getTime() + 86400000), // 24 hours from now
    },
  });

  await prisma.booking.update({
    where: { id: booking3.id },
    data: { paymentId: payment3.id },
  });

  // Cancelled Booking 4
  const booking4 = await prisma.booking.create({
    data: {
      userId: customer1.id,
      roomId: room5.id,
      checkIn: nextWeek,
      checkOut: new Date(nextWeek.getTime() + 86400000 * 3),
      bookingCode: "BK-004-2024",
      nights: 3,
      guests: 2,
      guestName: "Alice Johnson",
      guestPhone: "+6281234567893",
      guestEmail: "alice@example.com",
      totalPrice: 6600000,
      platformFee: 330000,
      hostPayout: 6270000,
      status: BookingStatus.CANCELLED,
      canceledAt: today,
      cancelReason: "Change of plans",
      canceledById: customer1.id,
      roomSnapshot: {
        name: "Beach Bungalow",
        type: "Bungalow",
        price: 2200000,
        hotelName: "Bali Beach Resort",
      },
    },
  });

  const payment4 = await prisma.payment.create({
    data: {
      bookingId: booking4.id,
      amount: 6600000,
      provider: PaymentProvider.MIDTRANS,
      providerRef: "MIDTRANS-004",
      status: PaymentStatus.REFUNDED,
      paidAt: new Date(today.getTime() - 86400000),
    },
  });

  await prisma.booking.update({
    where: { id: booking4.id },
    data: { paymentId: payment4.id },
  });

  console.log("✅ Created bookings and payments");

  // Create Booking Dates for confirmed bookings
  const bookingDates: any[] = [];

  // For booking1 (completed)
  for (let i = 0; i < 23; i++) {
    const date = new Date(lastMonth);
    date.setDate(date.getDate() + i);
    bookingDates.push({
      bookingId: booking1.id,
      roomId: room1.id,
      date: date,
    });
  }

  // For booking2 (confirmed)
  for (let i = 0; i < 6; i++) {
    const date = new Date(tomorrow);
    date.setDate(date.getDate() + i);
    bookingDates.push({
      bookingId: booking2.id,
      roomId: room4.id,
      date: date,
    });
  }

  await prisma.bookingDate.createMany({
    data: bookingDates,
  });

  console.log("✅ Created booking dates");

  // Create Reviews
  await prisma.review.create({
    data: {
      hotelId: hotel1.id,
      userId: customer1.id,
      bookingId: booking1.id,
      rating: 5,
      comment:
        "Amazing experience! The room was spacious and clean. Staff was very friendly and helpful. Will definitely come back!",
    },
  });

  await prisma.review.create({
    data: {
      hotelId: hotel2.id,
      userId: customer2.id,
      rating: 5,
      comment:
        "Perfect beach resort! The private beach access was fantastic. Food at the restaurant was delicious.",
    },
  });

  await prisma.review.create({
    data: {
      hotelId: hotel1.id,
      userId: customer2.id,
      rating: 4,
      comment:
        "Great hotel in downtown Jakarta. Good value for money. Only complaint is the breakfast could be better.",
    },
  });

  await prisma.review.create({
    data: {
      hotelId: hotel3.id,
      userId: customer1.id,
      rating: 4,
      comment:
        "Beautiful mountain views and very peaceful. Perfect for a weekend getaway from the city.",
    },
  });

  console.log("✅ Created reviews");

  // Create Host Ledger Entries for booking1
  await prisma.hostLedger.create({
    data: {
      hostId: host1.id,
      bookingId: booking1.id,
      amount: 34500000,
      type: LedgerType.INCOME_BOOKING,
      description: `Income from booking ${booking1.bookingCode}`,
      balanceAfter: 34500000,
    },
  });

  await prisma.hostLedger.create({
    data: {
      hostId: host1.id,
      bookingId: booking1.id,
      amount: -1725000,
      type: LedgerType.PLATFORM_FEE_DEDUCTION,
      description: `Platform fee for booking ${booking1.bookingCode}`,
      balanceAfter: 32775000,
    },
  });

  console.log("✅ Created host ledger entries");

  // Create Payout
  const payout1 = await prisma.payout.create({
    data: {
      hostId: host1.id,
      amount: 30000000,
      status: PayoutStatus.COMPLETED,
      payoutCode: "PO-001-2024",
      requestedAt: new Date(today.getTime() - 86400000 * 5),
      processedAt: new Date(today.getTime() - 86400000 * 3),
      note: "Payout processed successfully",
      proofOfTransfer: "https://example.com/proof/transfer-001.jpg",
      processorId: admin.id,
    },
  });

  await prisma.hostLedger.create({
    data: {
      hostId: host1.id,
      payoutId: payout1.id,
      amount: -30000000,
      type: LedgerType.PAYOUT_WITHDRAWAL,
      description: `Payout withdrawal ${payout1.payoutCode}`,
      balanceAfter: 2775000,
    },
  });

  const payout2 = await prisma.payout.create({
    data: {
      hostId: host2.id,
      amount: 5000000,
      status: PayoutStatus.PENDING,
      payoutCode: "PO-002-2024",
      requestedAt: today,
    },
  });

  console.log("✅ Created payouts");

  // Create Settings
  await prisma.setting.createMany({
    data: [
      {
        key: "platform_fee_percentage",
        value: 5,
      },
      {
        key: "default_cancellation_hours",
        value: 24,
      },
      {
        key: "payment_expiration_minutes",
        value: 60,
      },
      {
        key: "booking_expiration_minutes",
        value: 60,
      },
      {
        key: "minimum_payout_amount",
        value: 1000000,
      },
      {
        key: "midtrans_config",
        value: {
          serverKey: "YOUR_MIDTRANS_SERVER_KEY",
          clientKey: "YOUR_MIDTRANS_CLIENT_KEY",
          isProduction: false,
        },
      },
      {
        key: "contact_info",
        value: {
          email: "support@innhorizon.com",
          phone: "+6281234567890",
          address: "Jakarta, Indonesia",
        },
      },
    ],
  });

  console.log("✅ Created settings");

  // Clean up expired bookings that are no longer pending
  await prisma.$executeRawUnsafe(
    "UPDATE bookings SET \"expiredAt\" = NULL WHERE status IN ('COMPLETED', 'CANCELLED', 'REFUNDED', 'CHECKED_OUT', 'CONFIRMED', 'CHECKED_IN');",
  );
  console.log("✅ Cleaned up expiredAt for non-pending bookings");

  // Re-enable constraints with conditional checks (NOT VALID to skip existing rows)
  await prisma.$executeRawUnsafe(
    "ALTER TABLE \"bookings\" ADD CONSTRAINT chk_checkin_future CHECK (\"checkIn\" >= CURRENT_DATE OR status IN ('COMPLETED', 'CANCELLED', 'REFUNDED', 'CHECKED_OUT')) NOT VALID;",
  );
  await prisma.$executeRawUnsafe(
    'ALTER TABLE "bookings" ADD CONSTRAINT chk_expiredat_future CHECK ("expiredAt" > now() + interval \'30 seconds\' OR "expiredAt" IS NULL) NOT VALID;',
  );

  // Re-enable triggers
  await prisma.$executeRawUnsafe(`
    CREATE TRIGGER trg_payment_amount_match
      BEFORE INSERT OR UPDATE ON payments
      FOR EACH ROW EXECUTE FUNCTION check_payment_amount();
  `);
  await prisma.$executeRawUnsafe(`
    CREATE TRIGGER trg_ledger_immutable
      BEFORE INSERT ON host_ledgers
      FOR EACH ROW EXECUTE FUNCTION enforce_ledger_balance();
  `);
  await prisma.$executeRawUnsafe(`
    CREATE TRIGGER trg_payout_limit
      BEFORE INSERT OR UPDATE ON payouts
      FOR EACH ROW EXECUTE FUNCTION check_payout_limit();
  `);

  console.log("✅ Re-enabled check constraints and triggers");

  console.log("");
  console.log("🎉 Seed completed successfully!");
  console.log("");
  console.log("📊 Summary:");
  console.log("- Users: 6 (1 Admin, 2 Hosts, 3 Customers)");
  console.log("- Hotels: 4");
  console.log("- Rooms: 7");
  console.log(
    "- Bookings: 4 (1 Completed, 1 Confirmed, 1 Pending, 1 Cancelled)",
  );
  console.log("- Reviews: 4");
  console.log("- Payouts: 2 (1 Completed, 1 Pending)");
  console.log("");
  console.log("🔑 Login Credentials (all passwords: password123):");
  console.log("- Admin: admin@innhorizon.com");
  console.log("- Host 1: john.host@innhorizon.com");
  console.log("- Host 2: jane.host@innhorizon.com");
  console.log("- Customer 1: alice@example.com");
  console.log("- Customer 2: bob@example.com");
  console.log("- Customer 3: charlie@example.com");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
