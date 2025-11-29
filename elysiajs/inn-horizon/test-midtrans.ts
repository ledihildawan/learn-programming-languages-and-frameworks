// test-midtrans.ts
// Testing script for Midtrans integration

import { db } from './prisma';
import { cancelTransaction, createSnapToken, getTransactionStatus, refundMidtrans } from './src/lib/midtrans';

// ANSI color codes for pretty console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message: string, color: string = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function section(title: string) {
  console.log('\n' + '='.repeat(60));
  log(title, colors.bright + colors.cyan);
  console.log('='.repeat(60));
}

function success(message: string) {
  log(`✅ ${message}`, colors.green);
}

function error(message: string) {
  log(`❌ ${message}`, colors.red);
}

function info(message: string) {
  log(`ℹ️  ${message}`, colors.blue);
}

function warning(message: string) {
  log(`⚠️  ${message}`, colors.yellow);
}

// Test 1: Create a test booking
async function testCreateBooking() {
  section('TEST 1: Create Test Booking');

  try {
    // Find a user and room for testing
    const user = await db.user.findFirst({
      where: { role: 'CUSTOMER' },
    });

    if (!user) {
      error('No customer user found. Please create a user first.');
      return null;
    }

    const room = await db.room.findFirst({
      include: { hotel: true },
    });

    if (!room) {
      error('No room found. Please create a hotel and room first.');
      return null;
    }

    info(`Using user: ${user.email}`);
    info(`Using room: ${room.name} at ${room.hotel.name}`);

    // Create booking
    const checkIn = new Date();
    checkIn.setDate(checkIn.getDate() + 10); // 10 days from now

    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 2); // 2 nights

    const nights = 2;
    const totalPrice = Number(room.price) * nights;

    const booking = await db.booking.create({
      data: {
        userId: user.id,
        roomId: room.id,
        checkIn,
        checkOut,
        nights,
        guests: 2,
        totalPrice,
        guestName: 'Test User',
        guestPhone: '+62812345678',
        guestEmail: user.email,
        status: 'PENDING',
        roomSnapshot: {
          roomId: room.id,
          roomName: room.name,
          roomType: room.type,
          hotelId: room.hotel.id,
          hotelName: room.hotel.name,
          hotelAddress: room.hotel.address,
          pricePerNight: room.price,
        },
      },
    });

    success('Booking created successfully!');
    info(`Booking ID: ${booking.id}`);
    info(`Total Price: Rp ${totalPrice.toLocaleString()}`);
    info(`Check-in: ${checkIn.toISOString().split('T')[0]}`);
    info(`Check-out: ${checkOut.toISOString().split('T')[0]}`);

    return booking;
  } catch (err: any) {
    error(`Failed to create booking: ${err.message}`);
    return null;
  }
}

// Test 2: Create payment token
async function testCreatePaymentToken(bookingId: string) {
  section('TEST 2: Create Payment Token');

  try {
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: true,
        room: {
          include: { hotel: true },
        },
      },
    });

    if (!booking) {
      error('Booking not found');
      return null;
    }

    const parameter = {
      transaction_details: {
        order_id: booking.id,
        gross_amount: Number(booking.totalPrice),
      },
      customer_details: {
        first_name: booking.guestName.split(' ')[0],
        last_name: booking.guestName.split(' ').slice(1).join(' ') || '',
        email: booking.guestEmail || booking.user.email,
        phone: booking.guestPhone,
      },
      item_details: [
        {
          id: booking.room.id,
          price: Number(booking.room.price),
          quantity: booking.nights,
          name: `${booking.room.name} - ${booking.room.hotel.name}`,
        },
      ],
    };

    const result = await createSnapToken(parameter);

    if (result.success && result.data) {
      success('Payment token created successfully!');
      info(`Token: ${result.data.token}`);
      info(`Redirect URL: ${result.data.redirect_url}`);

      // Save payment to database
      const expiredAt = new Date();
      expiredAt.setHours(expiredAt.getHours() + 24);

      await db.payment.create({
        data: {
          bookingId: booking.id,
          amount: booking.totalPrice,
          provider: 'MIDTRANS',
          status: 'PENDING',
          expiredAt,
        },
      });

      success('Payment record created in database');

      warning('\n📱 To complete payment, open this URL in your browser:');
      log(result.data.redirect_url, colors.bright + colors.magenta);

      return result.data;
    } else {
      error(`Failed to create token: ${result.error}`);
      return null;
    }
  } catch (err: any) {
    error(`Error: ${err.message}`);
    return null;
  }
}

// Test 3: Get transaction status
async function testGetTransactionStatus(orderId: string) {
  section('TEST 3: Get Transaction Status');

  try {
    const result = await getTransactionStatus(orderId);

    if (result.success && result.data) {
      success('Transaction status retrieved!');
      info(`Order ID: ${result.data.order_id}`);
      info(`Transaction Status: ${result.data.transaction_status}`);
      info(`Payment Type: ${result.data.payment_type}`);
      info(`Gross Amount: ${result.data.gross_amount}`);

      if (result.data.fraud_status) {
        info(`Fraud Status: ${result.data.fraud_status}`);
      }

      return result.data;
    } else {
      warning(`Transaction not found or pending: ${result.error}`);
      return null;
    }
  } catch (err: any) {
    error(`Error: ${err.message}`);
    return null;
  }
}

// Test 4: Test refund
async function testRefund(transactionId: string, amount: number) {
  section('TEST 4: Test Refund');

  try {
    warning('⚠️  This will process a real refund!');
    info(`Transaction ID: ${transactionId}`);
    info(`Amount: Rp ${amount.toLocaleString()}`);

    const result = await refundMidtrans(transactionId, amount, 'Test refund - automated testing');

    if (result.success) {
      success('Refund processed successfully!');
      info(`Response: ${JSON.stringify(result.data, null, 2)}`);
      return result.data;
    } else {
      error(`Refund failed: ${result.error}`);
      return null;
    }
  } catch (err: any) {
    error(`Error: ${err.message}`);
    return null;
  }
}

// Test 5: Cancel transaction
async function testCancelTransaction(orderId: string) {
  section('TEST 5: Test Cancel Transaction');

  try {
    const result = await cancelTransaction(orderId);

    if (result.success) {
      success('Transaction cancelled successfully!');
      info(`Response: ${JSON.stringify(result.data, null, 2)}`);
      return result.data;
    } else {
      warning(`Cancel failed: ${result.error}`);
      return null;
    }
  } catch (err: any) {
    error(`Error: ${err.message}`);
    return null;
  }
}

// Test 6: Check payment in database
async function testCheckPaymentStatus(bookingId: string) {
  section('TEST 6: Check Payment Status in Database');

  try {
    const payment = await db.payment.findUnique({
      where: { bookingId },
      include: {
        booking: {
          select: {
            id: true,
            status: true,
            totalPrice: true,
          },
        },
      },
    });

    if (!payment) {
      warning('No payment found for this booking');
      return null;
    }

    success('Payment found in database!');
    info(`Payment ID: ${payment.id}`);
    info(`Status: ${payment.status}`);
    info(`Amount: Rp ${Number(payment.amount).toLocaleString()}`);
    info(`Provider: ${payment.provider}`);
    info(`Booking Status: ${payment.booking.status}`);

    if (payment.paidAt) {
      info(`Paid At: ${payment.paidAt.toISOString()}`);
    }

    if (payment.expiredAt) {
      info(`Expires At: ${payment.expiredAt.toISOString()}`);
    }

    return payment;
  } catch (err: any) {
    error(`Error: ${err.message}`);
    return null;
  }
}

// Test 7: Test refund estimate
async function testRefundEstimate(bookingId: string) {
  section('TEST 7: Test Refund Estimate');

  try {
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      include: { payment: true },
    });

    if (!booking) {
      error('Booking not found');
      return null;
    }

    if (!['PAID', 'CONFIRMED'].includes(booking.status)) {
      warning('Booking must be PAID or CONFIRMED for refund estimate');
      return null;
    }

    const checkInDate = new Date(booking.checkIn);
    const today = new Date();
    const daysUntilCheckIn = Math.ceil((checkInDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    let refundPercentage = 100;
    let cancellationFee = 0;
    let policyDescription = '';

    if (daysUntilCheckIn < 1) {
      refundPercentage = 0;
      cancellationFee = Number(booking.totalPrice);
      policyDescription = 'Same day or past check-in: No refund';
    } else if (daysUntilCheckIn < 3) {
      refundPercentage = 50;
      cancellationFee = Number(booking.totalPrice) * 0.5;
      policyDescription = 'Less than 3 days: 50% refund';
    } else if (daysUntilCheckIn < 7) {
      refundPercentage = 75;
      cancellationFee = Number(booking.totalPrice) * 0.25;
      policyDescription = 'Less than 7 days: 75% refund';
    } else {
      refundPercentage = 90;
      cancellationFee = Number(booking.totalPrice) * 0.1;
      policyDescription = '7+ days: 90% refund (10% admin fee)';
    }

    const refundAmount = Number(booking.totalPrice) - cancellationFee;

    success('Refund estimate calculated!');
    info(`Days until check-in: ${daysUntilCheckIn}`);
    info(`Policy: ${policyDescription}`);
    info(`Original amount: Rp ${Number(booking.totalPrice).toLocaleString()}`);
    info(`Refund amount: Rp ${refundAmount.toLocaleString()}`);
    info(`Cancellation fee: Rp ${cancellationFee.toLocaleString()}`);
    info(`Refund percentage: ${refundPercentage}%`);

    return {
      daysUntilCheckIn,
      originalAmount: Number(booking.totalPrice),
      refundAmount,
      cancellationFee,
      refundPercentage,
      policyDescription,
    };
  } catch (err: any) {
    error(`Error: ${err.message}`);
    return null;
  }
}

// Main test runner
async function runTests() {
  log('\n🧪 Midtrans Integration Test Suite\n', colors.bright + colors.green);

  try {
    // Test 1: Create booking
    const booking = await testCreateBooking();
    if (!booking) {
      error('Cannot proceed without a booking');
      return;
    }

    // Wait a bit
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Test 2: Create payment token
    const paymentToken = await testCreatePaymentToken(booking.id);
    if (!paymentToken) {
      error('Cannot proceed without payment token');
      return;
    }

    // Wait a bit
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Test 3: Check transaction status
    info('\nChecking transaction status (might be pending)...');
    await testGetTransactionStatus(booking.id);

    // Wait a bit
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Test 6: Check payment in database
    await testCheckPaymentStatus(booking.id);

    // Test 7: Test refund estimate
    await testRefundEstimate(booking.id);

    // Instructions for manual testing
    section('NEXT STEPS - MANUAL TESTING');
    warning('To complete the test, you need to manually process the payment:');
    log('\n1. Open the redirect URL shown above in your browser', colors.cyan);
    log('2. Complete the payment using test credit card:', colors.cyan);
    log('   Card: 4811 1111 1111 1114', colors.yellow);
    log('   CVV: 123', colors.yellow);
    log('   Exp: 01/25', colors.yellow);
    log('   OTP: 112233', colors.yellow);
    log('\n3. After payment, check webhook is received at:', colors.cyan);
    log('   POST http://localhost:3000/api/webhooks/midtrans', colors.yellow);
    log('\n4. Verify booking status changed to PAID in database', colors.cyan);
    log('\n5. Test refund (optional):', colors.cyan);
    log(`   Run: bun run test-midtrans.ts refund ${booking.id}`, colors.yellow);

    success('\n✨ Basic tests completed!');
    info(`Booking ID for reference: ${booking.id}`);
  } catch (err: any) {
    error(`Test suite failed: ${err.message}`);
    console.error(err);
  } finally {
    await db.$disconnect();
  }
}

// Parse command line arguments
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === 'refund' && args[1]) {
    // Test refund for specific booking
    const bookingId = args[1];
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      include: { payment: true },
    });

    if (!booking || !booking.payment?.providerRef) {
      error('Booking not found or no payment reference');
      await db.$disconnect();
      return;
    }

    const estimate = await testRefundEstimate(bookingId);
    if (estimate && estimate.refundAmount > 0) {
      await testRefund(booking.payment.providerRef, estimate.refundAmount);
    }

    await db.$disconnect();
  } else if (command === 'status' && args[1]) {
    // Check status of specific booking
    const bookingId = args[1];
    await testGetTransactionStatus(bookingId);
    await testCheckPaymentStatus(bookingId);
    await db.$disconnect();
  } else if (command === 'cancel' && args[1]) {
    // Cancel specific transaction
    const orderId = args[1];
    await testCancelTransaction(orderId);
    await db.$disconnect();
  } else {
    // Run full test suite
    await runTests();
  }
}

// Run the tests
main().catch((error) => {
  error(`Fatal error: ${error.message}`);
  console.error(error);
  process.exit(1);
});
