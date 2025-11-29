# Phase 3: Booking & Payment System - Setup Guide

## 🚀 Quick Setup (5 Minutes)

### Prerequisites
- ✅ Bun installed (v1.0+)
- ✅ PostgreSQL database running
- ✅ Phase 1 & 2 completed
- ✅ Midtrans account (for payments)

---

## Step 1: Environment Configuration

### 1.1 Add Midtrans Credentials

Add these to your `.env` file:

```env
# Existing variables
DATABASE_URL=postgresql://user:password@localhost:5432/inn_horizon
JWT_SECRET=your-secret-key-here

# NEW: Midtrans Configuration
MIDTRANS_SERVER_KEY=SB-Mid-server-YOUR-KEY-HERE
MIDTRANS_CLIENT_KEY=SB-Mid-client-YOUR-KEY-HERE
MIDTRANS_IS_PRODUCTION=false

# Optional: Your domain for webhooks
APP_URL=http://localhost:3000
```

### 1.2 Get Midtrans Credentials

**Sandbox (Testing)**
1. Go to https://dashboard.sandbox.midtrans.com
2. Sign up for free
3. Go to Settings → Access Keys
4. Copy your Server Key and Client Key

**Production (Later)**
1. Go to https://dashboard.midtrans.com
2. Complete verification
3. Get production keys
4. Set `MIDTRANS_IS_PRODUCTION=true`

---

## Step 2: Database Migration

The schema is already set up from previous phases. Verify tables exist:

```bash
# Check if booking tables exist
bunx prisma studio

# Look for these tables:
# - bookings
# - booking_dates
# - payments
# - host_ledgers
```

If tables are missing, run:

```bash
bunx prisma migrate dev --name add_booking_payment_system
```

---

## Step 3: Generate Prisma Client

```bash
bunx prisma generate
```

This generates the TypeScript types for Prisma models.

---

## Step 4: Configure Midtrans Webhook

### 4.1 Local Development (using ngrok)

For local testing, you need to expose your localhost:

```bash
# Install ngrok
npm install -g ngrok

# Start your server
bun run dev

# In another terminal, expose port 3000
ngrok http 3000

# You'll get a URL like: https://abc123.ngrok.io
```

### 4.2 Set Notification URL

1. Go to Midtrans Dashboard
2. Navigate to Settings → Configuration
3. Set **Notification URL**: `https://your-domain.com/api/webhooks/midtrans`
   - For ngrok: `https://abc123.ngrok.io/api/webhooks/midtrans`
4. Enable **HTTP Notification**
5. Click **Save**

### 4.3 Verify Webhook

Test the webhook endpoint:

```bash
curl -X POST http://localhost:3000/api/webhooks/test \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'

# Expected response:
{
  "success": true,
  "message": "Test webhook received successfully",
  "received": {"test": "data"},
  "timestamp": "2024-12-20T10:00:00Z"
}
```

---

## Step 5: Start the Server

```bash
bun run dev
```

You should see:

```
🦊 Elysia is running at localhost:3000
📚 API Documentation available at http://localhost:3000
🔐 Auth endpoints: http://localhost:3000/api/auth
👤 User endpoints: http://localhost:3000/api/users
🏨 Hotel endpoints: http://localhost:3000/api/hotels
🛏️  Room endpoints: http://localhost:3000/api/rooms
📅 Booking endpoints: http://localhost:3000/api/bookings
💳 Payment endpoints: http://localhost:3000/api/payments
🔔 Webhook endpoints: http://localhost:3000/api/webhooks
```

---

## Step 6: Verify Installation

### 6.1 Check API Health

```bash
curl http://localhost:3000/health

# Expected:
{
  "status": "ok",
  "timestamp": "2024-12-20T10:00:00Z"
}
```

### 6.2 Check Webhook Health

```bash
curl http://localhost:3000/api/webhooks/health

# Expected:
{
  "success": true,
  "status": "ok",
  "timestamp": "2024-12-20T10:00:00Z",
  "endpoints": {
    "midtrans": "/webhooks/midtrans",
    "test": "/webhooks/test"
  }
}
```

---

## Step 7: Test Booking Flow

### 7.1 Run Automated Test

```bash
bun run test-booking.ts
```

This will:
1. ✅ Create a test customer
2. ✅ Find a test hotel/room
3. ✅ Check availability
4. ✅ Calculate pricing
5. ✅ Create booking
6. ✅ Create payment
7. ✅ Simulate payment success
8. ✅ Update host wallet
9. ✅ Create ledger entry
10. ✅ Display final results

### 7.2 Manual API Test

#### Create a Booking

First, login to get a token:

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@test.com",
    "password": "password123"
  }'

# Save the token from response
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

Check availability:

```bash
curl -X GET "http://localhost:3000/api/bookings/availability?roomId=YOUR-ROOM-ID&checkIn=2024-12-25&checkOut=2024-12-27"
```

Create booking:

```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "roomId": "YOUR-ROOM-ID",
    "checkIn": "2024-12-25",
    "checkOut": "2024-12-27",
    "guests": 2,
    "guestName": "John Doe",
    "guestPhone": "081234567890",
    "guestEmail": "john@example.com"
  }'
```

Create payment:

```bash
curl -X POST http://localhost:3000/api/payments \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "bookingId": "BOOKING-ID-FROM-ABOVE",
    "provider": "MIDTRANS"
  }'
```

The response will include:
- `snapToken` - Use this in Midtrans Snap
- `paymentUrl` - Direct link to payment page

---

## Step 8: Test Payment (Midtrans Sandbox)

### 8.1 Open Payment Page

Copy the `paymentUrl` from the payment creation response and open it in your browser.

### 8.2 Use Test Credentials

**Credit Card**
```
Card Number: 4811 1111 1111 1114
CVV: 123
Expiry: 01/25
OTP: 112233
```

**BCA Virtual Account**
```
Use any VA number
Auto-approve in sandbox
```

**GoPay**
```
Scan QR code
Auto-approve in sandbox
```

### 8.3 Verify Webhook

After completing payment, check your server logs:

```
Received Midtrans webhook: {
  "transaction_status": "settlement",
  "order_id": "BKABCD1234-1234567890",
  ...
}
```

### 8.4 Check Booking Status

```bash
curl -X GET http://localhost:3000/api/bookings/my \
  -H "Authorization: Bearer $TOKEN"
```

Status should be updated to `PAID`.

---

## Step 9: Verify Wallet Update

### 9.1 Check Host Wallet

Login as the hotel owner and check wallet:

```bash
# Login as host
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "host@example.com",
    "password": "password123"
  }'

HOST_TOKEN="..."

# Get profile (includes walletBalance)
curl -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer $HOST_TOKEN"
```

### 9.2 Check Ledger

Using Prisma Studio or SQL:

```sql
SELECT * FROM host_ledgers 
WHERE host_id = 'HOST-ID' 
ORDER BY created_at DESC;
```

You should see:
- `type`: INCOME_BOOKING
- `amount`: Host payout (90% of total)
- `description`: "Income from booking BKABCD1234"
- `balance_after`: Updated balance

---

## 🎯 Common Setup Issues

### Issue 1: "Cannot connect to Midtrans"

**Solution:**
```bash
# Check if server key is correct
echo $MIDTRANS_SERVER_KEY

# Test connection
curl -X GET https://api.sandbox.midtrans.com/v2/ping \
  -H "Authorization: Basic $(echo -n 'YOUR_SERVER_KEY:' | base64)"
```

### Issue 2: "Webhook not received"

**Solution:**
- Check notification URL in Midtrans dashboard
- Verify ngrok is running (for local dev)
- Check server logs for errors
- Test webhook manually:

```bash
curl -X POST http://localhost:3000/api/webhooks/midtrans \
  -H "Content-Type: application/json" \
  -d '{
    "transaction_status": "settlement",
    "order_id": "test-order",
    "gross_amount": "100000",
    "signature_key": "test"
  }'
```

### Issue 3: "Booking expired immediately"

**Solution:**
- Check system time is correct
- Verify `BOOKING_EXPIRY_MINUTES` constant
- Create booking and payment quickly (within 15 minutes)

### Issue 4: "Room not available"

**Solution:**
- Check if room exists and is active
- Verify dates are in the future
- Check for existing bookings on those dates
- Run availability check first

### Issue 5: "Payment failed"

**Solution:**
- Use correct test credentials (see above)
- Check Midtrans sandbox status
- Verify server key is for sandbox
- Check payment expiry (24 hours)

---

## 🔧 Configuration Options

### Booking Constants

Edit `src/modules/bookings/types.ts`:

```typescript
export const BOOKING_CONSTANTS = {
  PLATFORM_FEE_PERCENTAGE: 10,      // Change platform fee
  PAYMENT_EXPIRY_HOURS: 24,         // Payment deadline
  BOOKING_EXPIRY_MINUTES: 15,       // Booking reservation time
  MIN_CANCELLATION_HOURS: 24,       // Cancel deadline
  MAX_BOOKING_DAYS: 90,             // Max stay duration
  MIN_BOOKING_DAYS: 1,              // Min stay duration
  MAX_GUESTS_PER_ROOM: 10,          // Guest limit
};
```

### Payment Constants

Edit `src/modules/payments/types.ts`:

```typescript
export const PAYMENT_CONSTANTS = {
  MIDTRANS_EXPIRY_DURATION: 24,     // Payment timeout
  MIDTRANS_EXPIRY_UNIT: "hour",
  MIDTRANS_ENABLED_PAYMENTS: [      // Enable/disable methods
    "credit_card",
    "gopay",
    "shopeepay",
    // ... add or remove
  ],
};
```

---

## 📊 Database Optimization

### Create Additional Indexes

For better performance on large datasets:

```sql
-- Booking queries
CREATE INDEX idx_bookings_user_status_created ON bookings(user_id, status, created_at DESC);
CREATE INDEX idx_bookings_room_dates ON bookings(room_id, check_in, check_out);

-- Payment queries
CREATE INDEX idx_payments_status_created ON payments(status, created_at DESC);
CREATE INDEX idx_payments_provider_ref ON payments(provider, provider_ref);

-- Ledger queries
CREATE INDEX idx_ledgers_host_created ON host_ledgers(host_id, created_at DESC);
```

---

## 🔒 Security Checklist

- [ ] JWT_SECRET is strong and unique
- [ ] MIDTRANS_SERVER_KEY is kept secret
- [ ] Webhook signature verification enabled
- [ ] HTTPS enabled in production
- [ ] Rate limiting configured
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (using Prisma)
- [ ] XSS prevention (input sanitization)
- [ ] CORS configured properly
- [ ] Error messages don't leak sensitive data

---

## 📈 Monitoring Setup

### Log Important Events

Add logging middleware:

```typescript
// In src/index.ts
app.use((context) => {
  console.log(`${new Date().toISOString()} ${context.request.method} ${context.path}`);
});
```

### Monitor Webhooks

Create webhook log table:

```sql
CREATE TABLE webhook_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider VARCHAR(50),
  payload JSONB,
  status VARCHAR(20),
  error TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🚀 Production Deployment

### Environment Variables

```env
# Production settings
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@prod-db:5432/inn_horizon
JWT_SECRET=CHANGE-THIS-TO-STRONG-SECRET

# Midtrans Production
MIDTRANS_SERVER_KEY=YOUR-PRODUCTION-SERVER-KEY
MIDTRANS_CLIENT_KEY=YOUR-PRODUCTION-CLIENT-KEY
MIDTRANS_IS_PRODUCTION=true

# Your domain
APP_URL=https://api.yourhotel.com
```

### Midtrans Production Setup

1. Complete Midtrans verification
2. Get production API keys
3. Update notification URL to production domain
4. Test with small real transactions
5. Monitor for first 24 hours

### Server Configuration

```bash
# Install production dependencies
bun install --production

# Build (if needed)
bun build src/index.ts --outdir dist

# Start with PM2 (process manager)
pm2 start "bun run src/index.ts" --name inn-horizon-api

# Enable auto-restart
pm2 startup
pm2 save
```

---

## ✅ Post-Setup Verification

Run through this checklist:

### Booking System
- [ ] Can check room availability
- [ ] Can create booking
- [ ] Booking expires after 15 minutes
- [ ] Can view my bookings
- [ ] Can get booking by code
- [ ] Can cancel booking (before 24h)
- [ ] Host can view property bookings
- [ ] Host can update booking status

### Payment System
- [ ] Can create payment
- [ ] Midtrans Snap token generated
- [ ] Payment page opens correctly
- [ ] Test payment succeeds
- [ ] Webhook received and processed
- [ ] Booking status updated to PAID
- [ ] Can view payment history

### Financial System
- [ ] Host wallet balance updated
- [ ] Ledger entry created
- [ ] Platform fee calculated correctly
- [ ] Refund deducts from wallet
- [ ] Balance calculations accurate

### Admin Features
- [ ] Can view all bookings
- [ ] Can view all payments
- [ ] Can process refunds
- [ ] Can view statistics

---

## 📚 Next Steps

1. **Read Documentation**
   - `PHASE_3_COMPLETION_REPORT.md` - Complete feature list
   - `PHASE_3_QUICK_REFERENCE.md` - Quick API reference
   - `PHASE_3_SUMMARY.md` - Overview and highlights

2. **Test Thoroughly**
   - Run automated tests
   - Manual testing of all flows
   - Test edge cases
   - Test error handling

3. **Integrate with Frontend**
   - Use provided API endpoints
   - Implement Midtrans Snap UI
   - Handle booking flow
   - Display payment status

4. **Monitor in Production**
   - Set up logging
   - Monitor webhook deliveries
   - Track payment success rates
   - Monitor wallet balances

5. **Plan Phase 4**
   - Review system
   - Email notifications
   - SMS alerts
   - Advanced analytics

---

## 🆘 Getting Help

### Documentation
- Check `/PHASE_3_*.md` files
- Review code comments
- Check API responses

### Common Questions

**Q: How do I change platform fee?**
A: Edit `BOOKING_CONSTANTS.PLATFORM_FEE_PERCENTAGE` in `src/modules/bookings/types.ts`

**Q: How do I add more payment methods?**
A: Edit `PAYMENT_CONSTANTS.MIDTRANS_ENABLED_PAYMENTS` in `src/modules/payments/types.ts`

**Q: How do I test without Midtrans?**
A: Use `"provider": "MANUAL"` when creating payment

**Q: How do I reset test data?**
A: Run `bun run test-booking.ts` with `CLEANUP=true`

**Q: Where are webhook logs?**
A: Check server console output or create webhook log table

---

## 🎉 Setup Complete!

You now have a fully functional booking and payment system!

### What You Can Do Now
✅ Accept bookings from customers
✅ Process payments via Midtrans
✅ Track host earnings
✅ Manage booking lifecycle
✅ Handle cancellations and refunds

### Recommended Next Steps
1. Test the complete booking flow
2. Integrate with your frontend
3. Configure production Midtrans
4. Set up monitoring and alerts
5. Plan for Phase 4 features

---

**Setup Guide Version**: 1.0.0
**Last Updated**: December 2024
**Status**: ✅ Ready for Production

For issues or questions, refer to the documentation or check the code comments.

Good luck with your hotel booking platform! 🏨✨