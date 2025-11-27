Apakah darft mvp ini sudah sempurna, abaikan tetang tunggakan dulu?
 
Aku mempunyai ini, aku mau melakukan development. Sebelum melakukan development dan sambil berjalan nanti dokumentasi apa sabaiknya yg di gunakan dalam pembuatan aplikasi?

Target MPV
Fitur,Status,Catatan
User (Customer / Host / Admin),Done ✅,Role + soft delete
Hotel + foto + amenity,Done ✅,HotelPhoto + HotelAmenity
Room + foto + totalRooms,Done ✅,RoomPhoto
Anti race-condition / no oversold,Done ✅,"RoomDate + unique(roomId,date) + index"
Booking + check-in/out + totalPrice + status,Done ✅,Snapshot + RoomDate lock
Payment (Midtrans ready),Done ✅,Provider MIDTRANS + status lengkap
Review (1 review per booking),Done ✅,Unique bookingId
Rating hotel otomatis dari review,Done ✅,Trigger SQL refresh_hotel_rating (real-time)
Payout manual ke host,Done ✅,Payout model + HostLedger
Host wallet & ledger,Done ✅,walletBalance + HostLedger lengkap
Seed data lengkap,Done ✅,Script sudah ada
Soft delete semua tabel utama,Done ✅,deletedAt di semua model

Fitur yang Kita TANGGUHKAN Dulu (akan ditambah belakangan)
Fitur,Status,Rencana
KYC host & dokumen,Ditangguhkan,Tabel HostVerification
Coupon / promo code,Ditangguhkan,Tabel Promo
Cancellation policy & refund otomatis,Ditangguhkan,Midtrans refund API
Chat guest ↔ host,Ditangguhkan,Message + Channel
Wishlist / favorite,Ditangguhkan,Tabel Wishlist
Multi-currency & dynamic pricing,Ditangguhkan,Currency + PricingRule
Tax invoice / e-faktur,Ditangguhkan,Integrasi DJP
Activity log & admin audit,Ditangguhkan,Tabel ActivityLog
Pricing breakdown,Ditangguhkan,BookingPriceItem
Payout otomatis,Ditangguhkan,Cron + bank API
Search & filter advance,Ditangguhkan,Index komposit tambahan
Upload foto multiple + cloud,Ditangguhkan,Sekarang masih URL manual
Email & WhatsApp notification,Ditangguhkan,Event listener nanti

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

generator prismabox {
  provider                    = "prismabox"
  typeboxImportDependencyName = "elysia"
  typeboxImportVariableName   = "t"
  inputModel                  = true
  output                      = "../generated/prismabox"
}

datasource db {
  provider = "postgresql"
}

// ====================== ENUM ======================
enum UserRole {
  ADMIN
  HOST
  CUSTOMER
}

enum BookingStatus {
  PENDING
  PAID
  CONFIRMED
  CHECKED_IN
  CHECKED_OUT
  COMPLETED
  CANCELLED
  REFUNDED
}

enum PaymentProvider {
  MIDTRANS
  MANUAL
}

enum PaymentStatus {
  PENDING
  SETTLED
  FAILED
  EXPIRED
  REFUNDED
}

enum PayoutStatus {
  PENDING
  PROCESSING
  COMPLETED
  REJECTED
}

// ====================== MODELS ======================
model User {
  id         String    @id @default(cuid())
  role       UserRole  @default(CUSTOMER)
  name       String?
  email      String    @unique
  password   String
  phone      String?   @unique
  avatar     String?
  isVerified Boolean   @default(false)
  deletedAt  DateTime?
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt

  hotels   Hotel[]
  bookings Booking[]
  reviews  Review[]
  payouts  Payout[]

  walletBalance Decimal @default(0) @db.Decimal(14, 2)
  ledgerEntries HostLedger[]

  @@map("users")
}

model Hotel {
  id          String    @id @default(uuid())
  ownerId     String
  owner       User      @relation(fields: [ownerId], references: [id], onDelete: Restrict)
  name        String
  slug        String    @unique
  address     String
  city        String
  province    String?
  latitude    Float?
  longitude   Float?
  description String?
  coverPhoto  String?
  isActive    Boolean   @default(true)
  deletedAt   DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  rooms     Room[]
  photos    HotelPhoto[]
  amenities HotelAmenity[]
  reviews   Review[]

  avgRating   Float @default(0) @db.DoublePrecision
  totalReview Int   @default(0)

  @@unique([ownerId, slug])
  @@index([city, isActive, avgRating(sort: Desc), province, name, slug])
  @@map("hotels")
}

model HotelPhoto {
  id      String  @id @default(cuid())
  hotelId String
  hotel   Hotel   @relation(fields: [hotelId], references: [id], onDelete: Cascade)
  url     String
  isCover Boolean @default(false)

  @@index([hotelId])
  @@map("hotel_photos")
}

model HotelAmenity {
  id      String @id @default(cuid())
  hotelId String
  hotel   Hotel  @relation(fields: [hotelId], references: [id], onDelete: Cascade)
  name    String

  @@unique([hotelId, name])
  @@map("hotel_amenities")
}

model Room {
  id        String    @id @default(uuid())
  hotelId   String
  hotel     Hotel     @relation(fields: [hotelId], references: [id], onDelete: Cascade)
  name      String
  type      String
  maxGuests Int
  totalRooms Int      @default(1)
  size      Int?
  bedType   String?
  price     Decimal   @db.Decimal(12, 2)
  deletedAt DateTime?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  photos       RoomPhoto[]
  bookings     Booking[]
  availability RoomDate[]

  @@index([hotelId, price])
  @@map("rooms")
}

model RoomPhoto {
  id     String @id @default(cuid())
  roomId String
  room   Room   @relation(fields: [roomId], references: [id], onDelete: Cascade)
  url    String

  @@map("room_photos")
}

model RoomDate {
  id     String   @id @default(uuid())
  roomId String
  room   Room     @relation(fields: [roomId], references: [id], onDelete: Cascade)
  date   DateTime @db.Date
  booked Int      @default(0)

  @@unique([roomId, date])
  @@index([date, roomId, booked])
  @@map("room_dates")
}

model Booking {
  id         String        @id @default(uuid())
  userId     String
  user       User          @relation(fields: [userId], references: [id])
  roomId     String
  room       Room          @relation(fields: [roomId], references: [id])
  checkIn    DateTime      @db.Date
  checkOut   DateTime      @db.Date
  nights     Int
  guests     Int
  totalPrice Decimal       @db.Decimal(14, 2)
  status     BookingStatus @default(PENDING)
  guestName  String
  guestPhone String
  guestEmail String?

  roomSnapshot Json

  payment Payment?
  review  Review?

  deletedAt DateTime?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  ledgerEntries HostLedger[]

  @@index([roomId, checkIn, checkOut, userId, status, createdAt])
  @@map("bookings")
}

model Payment {
  id          String          @id @default(uuid())
  bookingId   String          @unique
  booking     Booking         @relation(fields: [bookingId], references: [id], onDelete: Restrict)
  amount      Decimal         @db.Decimal(14, 2)
  provider    PaymentProvider
  providerRef String?         @db.Text
  status      PaymentStatus   @default(PENDING)
  paidAt      DateTime?
  expiredAt   DateTime?
  deletedAt   DateTime?
  createdAt   DateTime        @default(now())

  @@index([status, createdAt])
  @@map("payments")
}

model Review {
  id        String   @id @default(cuid())
  hotelId   String
  hotel     Hotel    @relation(fields: [hotelId], references: [id], onDelete: Cascade)
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  bookingId String   @unique
  booking   Booking? @relation(fields: [bookingId], references: [id], onDelete: Cascade)

  rating    Int       @db.SmallInt
  comment   String?
  deletedAt DateTime?
  createdAt DateTime  @default(now())

  @@index([hotelId, rating])
  @@map("reviews")
}

model Payout {
  id            String       @id @default(uuid())
  hostId        String
  host          User         @relation(fields: [hostId], references: [id])
  amount        Decimal      @db.Decimal(14, 2)
  bankName      String
  accountNumber String
  accountName   String
  status        PayoutStatus @default(PENDING)
  requestedAt   DateTime     @default(now())
  processedAt   DateTime?
  note          String?
  deletedAt     DateTime?
  ledgerEntries HostLedger[]

  @@map("payouts")
}

model HostLedger {
  id          String   @id @default(uuid())
  hostId      String
  host        User     @relation(fields: [hostId], references: [id])
  bookingId   String?  
  booking     Booking? @relation(fields: [bookingId], references: [id])
  payoutId    String?
  payout      Payout?  @relation(fields: [payoutId], references: [id])
  amount      Decimal  @db.Decimal(14, 2)
  type        LedgerType 
  description String
  createdAt   DateTime @default(now())

  @@index([hostId, createdAt])
  @@map("host_ledgers")
}

enum LedgerType {
  INCOME_BOOKING
  PAYOUT_WITHDRAWAL
  REFUND_DEDUCTION
}

```

```sql
CREATE OR REPLACE FUNCTION refresh_hotel_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE hotels
  SET
    "avgRating" = COALESCE((
      SELECT AVG(rating)::double precision
      FROM reviews
      WHERE "hotelId" = COALESCE(NEW."hotelId", OLD."hotelId")
        AND "deletedAt" IS NULL
    ), 0),
    "totalReview" = (
      SELECT COUNT(*)
      FROM reviews
      WHERE "hotelId" = COALESCE(NEW."hotelId", OLD."hotelId")
        AND "deletedAt" IS NULL
    )
  WHERE id = COALESCE(NEW."hotelId", OLD."hotelId");

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trig_refresh_hotel_rating ON reviews;
CREATE TRIGGER trig_refresh_hotel_rating
  AFTER INSERT OR UPDATE OF rating OR DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION refresh_hotel_rating();
```