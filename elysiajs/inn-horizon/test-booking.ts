import { PrismaClient } from "./generated/prisma/client";
import { BookingStatus, PaymentStatus } from "./generated/prisma/enums";

const prisma = new PrismaClient();

async function testBookingSystem() {
  console.log("🧪 Testing Booking & Payment System\n");

  try {
    // 1. Find a test user (customer)
    console.log("1️⃣ Finding test customer...");
    let customer = await prisma.user.findFirst({
      where: { role: "CUSTOMER" },
    });

    if (!customer) {
      console.log("   Creating test customer...");
      customer = await prisma.user.create({
        data: {
          email: "customer@test.com",
          password: "hashedpassword",
          phone: "081234567890",
          name: "Test Customer",
          role: "CUSTOMER",
        },
      });
    }
    console.log(`   ✓ Customer: ${customer.name} (${customer.email})\n`);

    // 2. Find a test hotel with rooms
    console.log("2️⃣ Finding test hotel with rooms...");
    const hotel = await prisma.hotel.findFirst({
      where: {
        isActive: true,
        deletedAt: null,
        rooms: {
          some: {
            isActive: true,
            deletedAt: null,
          },
        },
      },
      include: {
        rooms: {
          where: { isActive: true, deletedAt: null },
          take: 1,
        },
        owner: true,
      },
    });

    if (!hotel || hotel.rooms.length === 0) {
      console.log("   ❌ No active hotel with rooms found!");
      console.log("   Please create a hotel with rooms first.");
      return;
    }

    const room = hotel.rooms[0];
    console.log(`   ✓ Hotel: ${hotel.name}`);
    console.log(`   ✓ Room: ${room.name} (${room.type})`);
    console.log(`   ✓ Price: Rp ${room.price.toLocaleString()}/night\n`);

    // 3. Check availability
    console.log("3️⃣ Checking room availability...");
    const checkIn = new Date();
    checkIn.setDate(checkIn.getDate() + 7); // 7 days from now
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 2); // 2 nights

    console.log(`   Check-in: ${checkIn.toISOString().split("T")[0]}`);
    console.log(`   Check-out: ${checkOut.toISOString().split("T")[0]}`);

    // Count existing bookings for these dates
    const dates = [];
    for (let d = new Date(checkIn); d < checkOut; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }

    const bookedCount = await prisma.bookingDate.count({
      where: {
        roomId: room.id,
        date: { in: dates },
        booking: {
          status: {
            in: ["PENDING", "PAID", "CONFIRMED", "CHECKED_IN"],
          },
        },
      },
    });

    const availableRooms = room.totalRooms - bookedCount;
    console.log(`   ✓ Total rooms: ${room.totalRooms}`);
    console.log(`   ✓ Available: ${availableRooms}\n`);

    if (availableRooms <= 0) {
      console.log("   ❌ No rooms available for selected dates!");
      return;
    }

    // 4. Calculate pricing
    console.log("4️⃣ Calculating pricing...");
    const nights = 2;
    const subtotal = room.price.toNumber() * nights;
    const platformFee = subtotal * 0.1; // 10%
    const totalPrice = subtotal;
    const hostPayout = totalPrice - platformFee;

    console.log(`   Nights: ${nights}`);
    console.log(`   Price per night: Rp ${room.price.toLocaleString()}`);
    console.log(`   Subtotal: Rp ${subtotal.toLocaleString()}`);
    console.log(`   Platform fee (10%): Rp ${platformFee.toLocaleString()}`);
    console.log(`   Total price: Rp ${totalPrice.toLocaleString()}`);
    console.log(`   Host payout: Rp ${hostPayout.toLocaleString()}\n`);

    // 5. Create booking
    console.log("5️⃣ Creating booking...");
    const bookingCode = `BK${Date.now().toString(36).toUpperCase()}`;
    const expiredAt = new Date();
    expiredAt.setMinutes(expiredAt.getMinutes() + 15); // 15 minutes

    const roomSnapshot = {
      name: room.name,
      type: room.type,
      price: room.price.toString(),
      maxGuests: room.maxGuests,
      hotel: {
        name: hotel.name,
      },
    };

    const booking = await prisma.$transaction(async (tx) => {
      // Create booking
      const newBooking = await tx.booking.create({
        data: {
          userId: customer.id,
          roomId: room.id,
          checkIn,
          checkOut,
          bookingCode,
          nights,
          guests: 2,
          guestName: customer.name || "Test Guest",
          guestPhone: customer.phone,
          guestEmail: customer.email,
          guestNotes: "Test booking from automated script",
          totalPrice,
          platformFee,
          hostPayout,
          status: BookingStatus.PENDING,
          expiredAt,
          roomSnapshot,
          isTest: true, // Mark as test booking
        },
      });

      // Create booking dates
      await tx.bookingDate.createMany({
        data: dates.map((date) => ({
          bookingId: newBooking.id,
          roomId: room.id,
          date,
        })),
      });

      return newBooking;
    });

    console.log(`   ✓ Booking created: ${booking.bookingCode}`);
    console.log(`   ✓ Status: ${booking.status}`);
    console.log(`   ✓ Expires at: ${booking.expiredAt?.toLocaleString()}\n`);

    // 6. Create payment
    console.log("6️⃣ Creating payment...");
    const paymentExpiredAt = new Date();
    paymentExpiredAt.setHours(paymentExpiredAt.getHours() + 24); // 24 hours

    const payment = await prisma.payment.create({
      data: {
        bookingId: booking.id,
        amount: booking.totalPrice,
        provider: "MANUAL",
        status: PaymentStatus.PENDING,
        expiredAt: paymentExpiredAt,
        isTest: true,
      },
    });

    console.log(`   ✓ Payment created: ${payment.id}`);
    console.log(`   ✓ Amount: Rp ${payment.amount.toLocaleString()}`);
    console.log(`   ✓ Status: ${payment.status}`);
    console.log(`   ✓ Provider: ${payment.provider}\n`);

    // 7. Simulate payment success
    console.log("7️⃣ Simulating payment success...");
    const updatedPayment = await prisma.$transaction(async (tx) => {
      // Update payment status
      const updated = await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.SETTLED,
          paidAt: new Date(),
        },
      });

      // Update booking status
      await tx.booking.update({
        where: { id: booking.id },
        data: {
          status: BookingStatus.PAID,
          paymentId: payment.id,
        },
      });

      // Update host wallet
      const host = await tx.user.update({
        where: { id: hotel.ownerId },
        data: {
          walletBalance: {
            increment: hostPayout,
          },
        },
      });

      // Create ledger entry
      await tx.hostLedger.create({
        data: {
          hostId: hotel.ownerId,
          bookingId: booking.id,
          amount: hostPayout,
          type: "INCOME_BOOKING",
          description: `Income from booking ${bookingCode}`,
          balanceAfter: host.walletBalance,
        },
      });

      return updated;
    });

    console.log(`   ✓ Payment status: ${updatedPayment.status}`);
    console.log(`   ✓ Paid at: ${updatedPayment.paidAt?.toLocaleString()}`);
    console.log(`   ✓ Host wallet updated: +Rp ${hostPayout.toLocaleString()}\n`);

    // 8. Get host wallet balance
    console.log("8️⃣ Checking host wallet...");
    const host = await prisma.user.findUnique({
      where: { id: hotel.ownerId },
      select: {
        name: true,
        email: true,
        walletBalance: true,
      },
    });

    console.log(`   ✓ Host: ${host?.name}`);
    console.log(`   ✓ Balance: Rp ${host?.walletBalance.toLocaleString()}\n`);

    // 9. Get final booking details
    console.log("9️⃣ Final booking details...");
    const finalBooking = await prisma.booking.findUnique({
      where: { id: booking.id },
      include: {
        payment: true,
        room: {
          include: {
            hotel: true,
          },
        },
      },
    });

    console.log(`   Booking Code: ${finalBooking?.bookingCode}`);
    console.log(`   Status: ${finalBooking?.status}`);
    console.log(`   Guest: ${finalBooking?.guestName}`);
    console.log(`   Hotel: ${finalBooking?.room.hotel.name}`);
    console.log(`   Room: ${finalBooking?.room.name}`);
    console.log(`   Check-in: ${finalBooking?.checkIn.toISOString().split("T")[0]}`);
    console.log(`   Check-out: ${finalBooking?.checkOut.toISOString().split("T")[0]}`);
    console.log(`   Total: Rp ${finalBooking?.totalPrice.toLocaleString()}`);
    console.log(`   Payment Status: ${finalBooking?.payment?.status}\n`);

    console.log("✅ Booking system test completed successfully!\n");
    console.log("📝 Summary:");
    console.log(`   - Booking created: ${bookingCode}`);
    console.log(`   - Payment processed: Rp ${totalPrice.toLocaleString()}`);
    console.log(`   - Host earned: Rp ${hostPayout.toLocaleString()}`);
    console.log(`   - Platform fee: Rp ${platformFee.toLocaleString()}`);

    // 10. Cleanup (optional)
    console.log("\n🧹 Cleanup test data? (Set CLEANUP=true to enable)");
    if (process.env.CLEANUP === "true") {
      console.log("   Deleting test booking...");
      await prisma.bookingDate.deleteMany({
        where: { bookingId: booking.id },
      });
      await prisma.payment.delete({
        where: { id: payment.id },
      });
      await prisma.booking.delete({
        where: { id: booking.id },
      });
      console.log("   ✓ Cleanup completed\n");
    } else {
      console.log("   Skipping cleanup (test data preserved)\n");
    }
  } catch (error) {
    console.error("\n❌ Error during test:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testBookingSystem()
  .then(() => {
    console.log("\n✨ Test completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Test failed:", error);
    process.exit(1);
  });
