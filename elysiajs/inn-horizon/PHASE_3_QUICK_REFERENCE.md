# Phase 3: Booking & Payment System - Quick Reference

## 🚀 Quick Start

### 1. Environment Setup
```env
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxxx
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxx
MIDTRANS_IS_PRODUCTION=false
```

### 2. Start Server
```bash
bun run dev
```

### 3. Test Booking Flow
```bash
# Check availability
curl -X GET "http://localhost:3000/api/bookings/availability?roomId=UUID&checkIn=2024-12-25&checkOut=2024-12-27"

# Create booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "roomId": "uuid",
    "checkIn": "2024-12-25",
    "checkOut": "2024-12-27",
    "guests": 2,
    "guestName": "John Doe",
    "guestPhone": "081234567890"
  }'

# Create payment
curl -X POST http://localhost:3000/api/payments \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "bookingId": "booking-uuid",
    "provider": "MIDTRANS"
  }'
```

## 📋 Common Endpoints

### Bookings

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/bookings/availability` | Check room availability | No |
| POST | `/api/bookings` | Create booking | Yes |
| GET | `/api/bookings/my` | Get my bookings | Yes |
| GET | `/api/bookings/:id` | Get booking details | Yes |
| POST | `/api/bookings/:id/cancel` | Cancel booking | Yes |

### Payments

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/payments` | Create payment | Yes |
| GET | `/api/payments/my` | Get my payments | Yes |
| GET | `/api/payments/:id` | Get payment details | Yes |
| GET | `/api/payments/:id/status` | Check payment status | Yes |

### Webhooks

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/webhooks/midtrans` | Midtrans notification | No |
| GET | `/api/webhooks/health` | Health check | No |

## 📊 Booking Statuses

```
PENDING      → Booking created, awaiting payment
PAID         → Payment received, awaiting confirmation
CONFIRMED    → Host confirmed booking
CHECKED_IN   → Guest checked in
CHECKED_OUT  → Guest checked out
COMPLETED    → Booking completed successfully
CANCELLED    → Booking cancelled
REFUNDED     → Payment refunded
EXPIRED      → Booking expired (unpaid)
```

## 💳 Payment Statuses

```
PENDING   → Payment initiated
SETTLED   → Payment successful
FAILED    → Payment failed
EXPIRED   → Payment expired
REFUNDED  → Payment refunded
```

## 🔢 Constants

```typescript
PLATFORM_FEE_PERCENTAGE: 10%
PAYMENT_EXPIRY_HOURS: 24 hours
BOOKING_EXPIRY_MINUTES: 15 minutes
MIN_CANCELLATION_HOURS: 24 hours
MAX_BOOKING_DAYS: 90 nights
MIN_BOOKING_DAYS: 1 night
```

## 💰 Price Calculation

```typescript
Subtotal = Room Price × Nights
Platform Fee = Subtotal × 10%
Total Price = Subtotal
Host Payout = Total Price - Platform Fee
```

**Example:**
- Room: Rp 500,000/night × 3 nights = Rp 1,500,000
- Platform Fee: Rp 150,000 (10%)
- Total: Rp 1,500,000
- Host Gets: Rp 1,350,000

## 🧪 Test Cards (Midtrans Sandbox)

### Credit Card
```
Number: 4811 1111 1111 1114
CVV: 123
Exp: 01/25
OTP: 112233
```

### Bank Transfer
```
BCA VA: Use any number
Mandiri Bill: Use any number
```

## 🔐 Authentication

All booking and payment endpoints require JWT token:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📝 Request Examples

### Check Availability
```json
GET /api/bookings/availability?roomId=uuid&checkIn=2024-12-25&checkOut=2024-12-27

Response:
{
  "success": true,
  "data": {
    "available": true,
    "roomId": "uuid",
    "checkIn": "2024-12-25",
    "checkOut": "2024-12-27",
    "nights": 2,
    "totalRooms": 5,
    "availableRooms": 3,
    "price": "500000",
    "totalPrice": "1000000"
  }
}
```

### Create Booking
```json
POST /api/bookings
{
  "roomId": "uuid",
  "checkIn": "2024-12-25",
  "checkOut": "2024-12-27",
  "guests": 2,
  "guestName": "John Doe",
  "guestPhone": "081234567890",
  "guestEmail": "john@example.com",
  "guestNotes": "Late check-in please"
}

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "bookingCode": "BKABCD1234",
    "status": "PENDING",
    "totalPrice": "1000000",
    "expiredAt": "2024-12-20T10:30:00Z",
    ...
  }
}
```

### Create Payment
```json
POST /api/payments
{
  "bookingId": "booking-uuid",
  "provider": "MIDTRANS"
}

Response:
{
  "success": true,
  "data": {
    "id": "payment-uuid",
    "snapToken": "xxxxx",
    "paymentUrl": "https://app.sandbox.midtrans.com/snap/v2/...",
    "status": "PENDING",
    "expiredAt": "2024-12-21T10:15:00Z",
    ...
  }
}
```

### Cancel Booking
```json
POST /api/bookings/:id/cancel
{
  "reason": "Change of plans"
}

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "CANCELLED",
    "cancelReason": "Change of plans",
    "canceledAt": "2024-12-20T11:00:00Z",
    ...
  }
}
```

## 🔄 Typical Workflow

### Customer Booking Flow
1. Search hotels/rooms
2. Check availability
3. Create booking (status: PENDING)
4. Create payment (get Snap token)
5. Complete payment on Midtrans
6. Booking updated to PAID (via webhook)
7. Host confirms → CONFIRMED
8. Check-in → CHECKED_IN
9. Check-out → CHECKED_OUT
10. Mark complete → COMPLETED

### Host Management Flow
1. View bookings: `GET /api/bookings/host`
2. Confirm booking: `PATCH /api/bookings/:id/status` → CONFIRMED
3. Check-in guest: `PATCH /api/bookings/:id/status` → CHECKED_IN
4. Check-out guest: `PATCH /api/bookings/:id/status` → CHECKED_OUT
5. View statistics: `GET /api/bookings/stats/overview`

### Admin Management Flow
1. View all bookings: `GET /api/bookings/admin/all`
2. View all payments: `GET /api/payments/admin/all`
3. Process refund: `POST /api/payments/:id/refund`
4. View statistics: `GET /api/payments/admin/stats`

## 🐛 Troubleshooting

### Booking Expired
- **Cause**: Not paid within 15 minutes
- **Solution**: Create new booking

### Payment Failed
- **Cause**: Various (insufficient funds, wrong details, etc.)
- **Solution**: Try again or use different payment method

### Cannot Cancel
- **Cause**: Too close to check-in date (< 24 hours)
- **Solution**: Contact support or admin

### Webhook Not Working
- **Check**: Midtrans dashboard → Settings → Notification URL
- **Verify**: Signature validation is correct
- **Test**: Use `/api/webhooks/test` endpoint

## 📞 Support

### Error Codes
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

### Common Errors
```json
{
  "success": false,
  "error": "Room is not available for selected dates"
}

{
  "success": false,
  "error": "Booking has expired"
}

{
  "success": false,
  "error": "Cannot cancel booking within 24 hours of check-in"
}
```

## 🎯 Best Practices

1. **Always check availability** before creating booking
2. **Create payment immediately** after booking (15-minute expiry)
3. **Complete payment within 24 hours** (payment expiry)
4. **Check cancellation policy** before booking
5. **Use booking code** for easy reference
6. **Monitor webhook logs** for payment issues
7. **Test in sandbox** before production

## 📚 Additional Resources

- Full documentation: `/PHASE_3_COMPLETION_REPORT.md`
- Midtrans setup: `/MIDTRANS_INTEGRATION.md`
- API reference: `/API_DOCUMENTATION.md`
- Database schema: `/prisma/schema.prisma`

## 🔗 Quick Links

- **Midtrans Dashboard**: https://dashboard.midtrans.com
- **Midtrans Docs**: https://docs.midtrans.com
- **Snap UI Demo**: https://demo.midtrans.com
- **API Root**: http://localhost:3000
- **Health Check**: http://localhost:3000/health

---

**Last Updated**: December 2024
**Phase**: 3 - Booking & Payment System
**Status**: ✅ Complete