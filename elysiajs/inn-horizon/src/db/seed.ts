import { hash } from 'bcryptjs';
import { db } from '.';
import { BookingStatus, PaymentProvider, UserRole } from '../../generated/prisma/enums';

async function main() {
  console.log('🌱 Mulai seeding...');

  // 1. Kosongkan dulu (hati-hati di production!)
  await db.hotelAmenity.deleteMany({});
  await db.hotelPhoto.deleteMany({});
  await db.roomPhoto.deleteMany({});
  await db.review.deleteMany({});
  await db.payment.deleteMany({});
  await db.booking.deleteMany({});
  await db.room.deleteMany({});
  await db.hotel.deleteMany({});
  await db.payout.deleteMany({});
  await db.user.deleteMany({});

  // 2. Admin + Host + 2 Customer
  const password = await hash('rahasia123', 10);

  const admin = await db.user.create({
    data: {
      role: UserRole.ADMIN,
      name: 'Admin Utama',
      email: 'admin@stayhub.id',
      password,
      phone: '0811111111',
      isVerified: true,
    },
  });

  const host = await db.user.create({
    data: {
      role: UserRole.HOST,
      name: 'Budi Santoso',
      email: 'budi@host.id',
      password,
      phone: '0822222222',
      isVerified: true,
    },
  });

  const customer1 = await db.user.create({
    data: {
      name: 'Alya Putri',
      email: 'alya@gmail.com',
      password,
      phone: '0833333333',
      isVerified: true,
    },
  });

  const customer2 = await db.user.create({
    data: {
      name: 'Rian Pratama',
      email: 'rian@gmail.com',
      password,
      phone: '0844444444',
      isVerified: true,
    },
  });

  // 3. Hotel milik Budi
  const hotel = await db.hotel.create({
    data: {
      ownerId: host.id,
      name: 'Santorini Villa Bali',
      slug: 'santorini-villa-bali',
      address: 'Jl. Pantai Berawa No.88, Canggu',
      city: 'Badung',
      latitude: -8.64779,
      longitude: 115.13785,
      description: 'Villa mewah dengan private pool & view sawah',
      coverPhoto: 'https://images.unsplash.com/photo-1578683015171-9d5c2f8d0e04',
      isActive: true,
      photos: {
        create: [
          { url: 'https://images.unsplash.com/photo-1611892441792-ae6af465f0f8', isCover: true },
          { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945' },
          { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b' },
        ],
      },
    },
  });

  await db.hotelAmenity.createMany({
    data: [
      { name: 'WiFi', hotelId: hotel.id },
      { name: 'Private Pool', hotelId: hotel.id },
      { name: 'Parking', hotelId: hotel.id },
      { name: 'AC', hotelId: hotel.id },
      { name: 'Breakfast', hotelId: hotel.id },
      { name: 'Airport Transfer', hotelId: hotel.id },
    ],
    skipDuplicates: true, // Guards against name clashes
  });

  // 4. Rooms
  const deluxe = await db.room.create({
    data: {
      hotelId: hotel.id,
      name: 'Deluxe Pool View',
      type: 'Deluxe',
      maxGuests: 3,
      size: 45,
      bedType: 'King + Single',
      price: 1_750_000,
      totalRooms: 5,
      photos: {
        create: [
          { url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427' },
          { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304' },
        ],
      },
    },
  });

  const suite = await db.room.create({
    data: {
      hotelId: hotel.id,
      name: 'Presidential Suite',
      type: 'Suite',
      maxGuests: 4,
      size: 120,
      bedType: 'King + King',
      price: 4_500_000,
      totalRooms: 2,
      photos: {
        create: [
          { url: 'https://images.unsplash.com/photo-1631049035182-249067d90532' },
          { url: 'https://images.unsplash.com/photo-1618778616585-6e8d5f4f5e4e' },
        ],
      },
    },
  });

  // 5. Booking contoh (sudah dibayar)
  const booking = await db.booking.create({
    data: {
      userId: customer1.id,
      roomId: deluxe.id,
      checkIn: new Date('2025-12-20'),
      checkOut: new Date('2025-12-24'),
      nights: 4,
      guests: 2,
      totalPrice: 7_000_000, // 4 malam × 1.75jt
      status: BookingStatus.PAID,
      guestName: 'Alya Putri',
      guestPhone: '0833333333',
      guestEmail: 'alya@gmail.com',
      payment: {
        create: {
          amount: 7_000_000,
          provider: PaymentProvider.MIDTRANS,
          providerId: 'midtrans-12345',
          status: 'SETTLED',
          paidAt: new Date(),
        },
      },
    },
  });

  // 6. Review dari booking di atas
  await db.review.create({
    data: {
      hotelId: hotel.id,
      userId: customer1.id,
      bookingId: booking.id,
      rating: 5,
      comment: 'Pelayanan luar biasa! Pool-nya mantap, staff ramah, recommended banget!',
    },
  });

  // 7. Booking pending (belum bayar)
  await db.booking.create({
    data: {
      userId: customer2.id,
      roomId: suite.id,
      checkIn: new Date('2025-12-28'),
      checkOut: new Date('2026-01-02'),
      nights: 5,
      guests: 4,
      totalPrice: 22_500_000,
      status: BookingStatus.PENDING,
      guestName: 'Rian Pratama',
      guestPhone: '0844444444',
    },
  });

  // 8. Payout request dari host
  await db.payout.create({
    data: {
      hostId: host.id,
      amount: 6_500_000, // setelah potongan fee 7%
      bankName: 'BCA',
      accountNo: '1234567890',
      accountName: 'Budi Santoso',
      status: 'PENDING',
    },
  });

  console.log('✅ Seeding selesai!');
  console.log(`   Admin: ${admin.email}`);
  console.log(`   Host: ${host.email}`);
  console.log(`   Hotel: ${hotel.name} (${hotel.slug})`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding gagal:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
