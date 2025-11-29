-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'HOST', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'PAID', 'CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT', 'COMPLETED', 'CANCELLED', 'REFUNDED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('MIDTRANS', 'MANUAL');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SETTLED', 'FAILED', 'EXPIRED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PayoutStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'REJECTED');

-- CreateEnum
CREATE TYPE "LedgerType" AS ENUM ('INCOME_BOOKING', 'PAYOUT_WITHDRAWAL', 'REFUND_DEDUCTION', 'PLATFORM_FEE_DEDUCTION');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER',
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "avatar" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bankName" TEXT,
    "bankCode" TEXT,
    "accountNumber" TEXT,
    "accountName" TEXT,
    "walletBalance" DECIMAL(16,2) NOT NULL DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotels" (
    "id" UUID NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "description" TEXT,
    "coverPhoto" TEXT,
    "checkInTime" TEXT NOT NULL DEFAULT '14:00',
    "checkOutTime" TEXT NOT NULL DEFAULT '12:00',
    "cancellationHours" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "avgRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalReview" INTEGER NOT NULL DEFAULT 0,
    "searchVector" tsvector,

    CONSTRAINT "hotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel_photos" (
    "id" UUID NOT NULL,
    "hotelId" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hotel_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel_amenities" (
    "id" UUID NOT NULL,
    "hotelId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,

    CONSTRAINT "hotel_amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" UUID NOT NULL,
    "hotelId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "maxGuests" INTEGER NOT NULL,
    "totalRooms" INTEGER NOT NULL DEFAULT 1,
    "size" INTEGER,
    "bedType" TEXT,
    "price" DECIMAL(12,2) NOT NULL,
    "extraBedPrice" DECIMAL(12,2),
    "extraBedAvailable" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_photos" (
    "id" UUID NOT NULL,
    "roomId" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "room_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking_dates" (
    "id" UUID NOT NULL,
    "bookingId" UUID NOT NULL,
    "roomId" UUID NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "booking_dates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" UUID NOT NULL,
    "userId" TEXT NOT NULL,
    "roomId" UUID NOT NULL,
    "checkIn" DATE NOT NULL,
    "checkOut" DATE NOT NULL,
    "bookingCode" TEXT NOT NULL,
    "nights" INTEGER NOT NULL,
    "guests" INTEGER NOT NULL,
    "guestName" TEXT NOT NULL,
    "guestPhone" TEXT NOT NULL,
    "guestEmail" TEXT,
    "guestNotes" TEXT,
    "totalPrice" DECIMAL(14,2) NOT NULL,
    "platformFee" DECIMAL(14,2) NOT NULL,
    "hostPayout" DECIMAL(14,2) NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "expiredAt" TIMESTAMP(3),
    "confirmedAt" TIMESTAMP(3),
    "checkedInAt" TIMESTAMP(3),
    "canceledAt" TIMESTAMP(3),
    "cancelReason" TEXT,
    "canceledById" TEXT,
    "roomSnapshot" JSONB NOT NULL,
    "isTest" BOOLEAN NOT NULL DEFAULT false,
    "paymentId" UUID,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" UUID NOT NULL,
    "bookingId" UUID NOT NULL,
    "amount" DECIMAL(14,2) NOT NULL,
    "provider" "PaymentProvider" NOT NULL,
    "providerRef" TEXT,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "snapToken" TEXT,
    "paymentUrl" TEXT,
    "paidAt" TIMESTAMP(3),
    "expiredAt" TIMESTAMP(3),
    "failureReason" TEXT,
    "isTest" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "hotelId" UUID NOT NULL,
    "userId" TEXT NOT NULL,
    "bookingId" UUID,
    "rating" SMALLINT NOT NULL,
    "comment" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payouts" (
    "id" UUID NOT NULL,
    "hostId" TEXT NOT NULL,
    "amount" DECIMAL(14,2) NOT NULL,
    "status" "PayoutStatus" NOT NULL DEFAULT 'PENDING',
    "payoutCode" TEXT NOT NULL,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),
    "note" TEXT,
    "proofOfTransfer" TEXT,
    "processorId" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "host_ledgers" (
    "id" UUID NOT NULL,
    "hostId" TEXT NOT NULL,
    "bookingId" UUID,
    "payoutId" UUID,
    "amount" DECIMAL(14,2) NOT NULL,
    "type" "LedgerType" NOT NULL,
    "description" TEXT NOT NULL,
    "balanceAfter" DECIMAL(16,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "host_ledgers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "hotels_slug_key" ON "hotels"("slug");

-- CreateIndex
CREATE INDEX "hotels_city_isActive_avgRating_idx" ON "hotels"("city", "isActive", "avgRating" DESC);

-- CreateIndex
CREATE INDEX "hotels_slug_idx" ON "hotels"("slug");

-- CreateIndex
CREATE INDEX "hotels_ownerId_idx" ON "hotels"("ownerId");

-- CreateIndex
CREATE INDEX "hotels_searchVector_idx" ON "hotels" USING GIN ("searchVector");

-- CreateIndex
CREATE INDEX "hotel_photos_hotelId_idx" ON "hotel_photos"("hotelId");

-- CreateIndex
CREATE UNIQUE INDEX "hotel_amenities_hotelId_name_key" ON "hotel_amenities"("hotelId", "name");

-- CreateIndex
CREATE INDEX "rooms_hotelId_idx" ON "rooms"("hotelId");

-- CreateIndex
CREATE INDEX "rooms_hotelId_price_idx" ON "rooms"("hotelId", "price");

-- CreateIndex
CREATE INDEX "rooms_hotelId_isActive_idx" ON "rooms"("hotelId", "isActive");

-- CreateIndex
CREATE INDEX "room_photos_roomId_idx" ON "room_photos"("roomId");

-- CreateIndex
CREATE INDEX "booking_dates_roomId_idx" ON "booking_dates"("roomId");

-- CreateIndex
CREATE INDEX "booking_dates_date_idx" ON "booking_dates"("date");

-- CreateIndex
CREATE INDEX "booking_dates_bookingId_idx" ON "booking_dates"("bookingId");

-- CreateIndex
CREATE INDEX "booking_dates_roomId_date_idx" ON "booking_dates"("roomId", "date");

-- CreateIndex
CREATE INDEX "booking_dates_date_roomId_idx" ON "booking_dates"("date", "roomId");

-- CreateIndex
CREATE UNIQUE INDEX "booking_dates_roomId_date_key" ON "booking_dates"("roomId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_bookingCode_key" ON "bookings"("bookingCode");

-- CreateIndex
CREATE INDEX "bookings_userId_status_createdAt_idx" ON "bookings"("userId", "status", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "bookings_roomId_checkIn_idx" ON "bookings"("roomId", "checkIn");

-- CreateIndex
CREATE INDEX "bookings_status_expiredAt_idx" ON "bookings"("status", "expiredAt");

-- CreateIndex
CREATE INDEX "bookings_status_createdAt_idx" ON "bookings"("status", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "bookings_checkIn_idx" ON "bookings"("checkIn");

-- CreateIndex
CREATE INDEX "bookings_bookingCode_idx" ON "bookings"("bookingCode");

-- CreateIndex
CREATE UNIQUE INDEX "payments_bookingId_key" ON "payments"("bookingId");

-- CreateIndex
CREATE INDEX "payments_bookingId_idx" ON "payments"("bookingId");

-- CreateIndex
CREATE INDEX "payments_provider_providerRef_idx" ON "payments"("provider", "providerRef");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- CreateIndex
CREATE UNIQUE INDEX "payments_provider_providerRef_isTest_key" ON "payments"("provider", "providerRef", "isTest");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_bookingId_key" ON "reviews"("bookingId");

-- CreateIndex
CREATE INDEX "reviews_hotelId_idx" ON "reviews"("hotelId");

-- CreateIndex
CREATE INDEX "reviews_hotelId_rating_idx" ON "reviews"("hotelId", "rating");

-- CreateIndex
CREATE UNIQUE INDEX "payouts_payoutCode_key" ON "payouts"("payoutCode");

-- CreateIndex
CREATE INDEX "payouts_hostId_createdAt_idx" ON "payouts"("hostId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "payouts_hostId_status_idx" ON "payouts"("hostId", "status");

-- CreateIndex
CREATE INDEX "host_ledgers_hostId_createdAt_idx" ON "host_ledgers"("hostId", "createdAt" DESC);

-- AddForeignKey
ALTER TABLE "hotels" ADD CONSTRAINT "hotels_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_photos" ADD CONSTRAINT "hotel_photos_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_amenities" ADD CONSTRAINT "hotel_amenities_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_photos" ADD CONSTRAINT "room_photos_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_dates" ADD CONSTRAINT "booking_dates_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_dates" ADD CONSTRAINT "booking_dates_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_canceledById_fkey" FOREIGN KEY ("canceledById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payouts" ADD CONSTRAINT "payouts_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payouts" ADD CONSTRAINT "payouts_processorId_fkey" FOREIGN KEY ("processorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "host_ledgers" ADD CONSTRAINT "host_ledgers_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "host_ledgers" ADD CONSTRAINT "host_ledgers_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "host_ledgers" ADD CONSTRAINT "host_ledgers_payoutId_fkey" FOREIGN KEY ("payoutId") REFERENCES "payouts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
