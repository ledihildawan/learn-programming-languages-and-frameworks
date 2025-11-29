# Inn Horizon API - Complete Endpoint Reference

## 📚 Table of Contents

- [Authentication](#authentication)
- [Users](#users)
- [Hotels](#hotels)
- [Rooms](#rooms)
- [Bookings](#bookings)
- [Payments](#payments)
- [Webhooks](#webhooks)

---

## Base URL

```
http://localhost:3000/api
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Endpoints

### Register
```http
POST /auth/register
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "081234567890",
  "role": "CUSTOMER"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Login
```http
POST /auth/login
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Logout
```http
POST /auth/logout
```
🔒 Requires authentication

**Response:** `200 OK`

### Refresh Token
```http
POST /auth/refresh
```
🔒 Requires authentication

**Response:** `200 OK`

---

## 👤 User Endpoints

### Get Current User
```http
GET /users/me
```
🔒 Requires authentication

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "081234567890",
    "role": "CUSTOMER",
    "walletBalance": "1000000",
    "isVerified": false,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### Update Profile
```http
PATCH /users/me
```
🔒 Requires authentication

**Body:**
```json
{
  "name": "John Smith",
  "phone": "081234567891",
  "avatar": "https://example.com/avatar.jpg"
}
```

### Change Password
```http
PATCH /users/me/password
```
🔒 Requires authentication

**Body:**
```json
{
  "currentPassword": "oldpass123",
  "newPassword": "newpass123"
}
```

### Update Bank Account (Host)
```http
PATCH /users/me/bank
```
🔒 Requires authentication (HOST role)

**Body:**
```json
{
  "bankName": "BCA",
  "bankCode": "014",
  "accountNumber": "1234567890",
  "accountName": "John Doe"
}
```

### List Users (Admin)
```http
GET /users
```
🔒 Requires authentication (ADMIN role)

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `role` (optional): Filter by role (ADMIN, HOST, CUSTOMER)
- `search` (optional): Search by name, email, phone

### Get User by ID (Admin)
```http
GET /users/:id
```
🔒 Requires authentication (ADMIN role)

### Update User (Admin)
```http
PATCH /users/:id
```
🔒 Requires authentication (ADMIN role)

### Delete User (Admin)
```http
DELETE /users/:id
```
🔒 Requires authentication (ADMIN role)

---

## 🏨 Hotel Endpoints

### List Hotels
```http
GET /hotels
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `city` (optional): Filter by city
- `province` (optional): Filter by province
- `minRating` (optional): Minimum rating (0-5)
- `maxRating` (optional): Maximum rating (0-5)
- `search` (optional): Search by name, city, description

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "hotel-id",
      "name": "Grand Hotel",
      "slug": "grand-hotel",
      "city": "Jakarta",
      "province": "DKI Jakarta",
      "address": "Jl. Sudirman No. 1",
      "avgRating": 4.5,
      "totalReview": 100,
      "coverPhoto": "https://...",
      "isActive": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

### Get Hotel by ID
```http
GET /hotels/:id
```

### Get Hotel by Slug
```http
GET /hotels/slug/:slug
```

### Create Hotel
```http
POST /hotels
```
🔒 Requires authentication (HOST or ADMIN role)

**Body:**
```json
{
  "name": "Grand Hotel",
  "city": "Jakarta",
  "province": "DKI Jakarta",
  "address": "Jl. Sudirman No. 1",
  "latitude": -6.2088,
  "longitude": 106.8456,
  "description": "Luxury hotel in the heart of Jakarta",
  "coverPhoto": "https://...",
  "checkInTime": "14:00",
  "checkOutTime": "12:00",
  "cancellationHours": 24
}
```

### Update Hotel
```http
PATCH /hotels/:id
```
🔒 Requires authentication (Owner or ADMIN)

### Delete Hotel
```http
DELETE /hotels/:id
```
🔒 Requires authentication (Owner or ADMIN)

### List My Hotels
```http
GET /hotels/my
```
🔒 Requires authentication (HOST role)

### Add Hotel Photo
```http
POST /hotels/:id/photos
```
🔒 Requires authentication (Owner or ADMIN)

**Body:**
```json
{
  "url": "https://example.com/photo.jpg",
  "order": 0
}
```

### Delete Hotel Photo
```http
DELETE /hotels/:id/photos/:photoId
```
🔒 Requires authentication (Owner or ADMIN)

### Add Hotel Amenity
```http
POST /hotels/:id/amenities
```
🔒 Requires authentication (Owner or ADMIN)

**Body:**
```json
{
  "name": "Free WiFi",
  "icon": "wifi"
}
```

### Delete Hotel Amenity
```http
DELETE /hotels/:id/amenities/:amenityId
```
🔒 Requires authentication (Owner or ADMIN)

---

## 🛏️ Room Endpoints

### List Rooms
```http
GET /rooms
```

**Query Parameters:**
- `hotelId` (optional): Filter by hotel
- `type` (optional): Filter by room type
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price
- `minGuests` (optional): Minimum guest capacity
- `available` (optional): Only available rooms

### Get Room by ID
```http
GET /rooms/:id
```

### Create Room
```http
POST /rooms
```
🔒 Requires authentication (Owner or ADMIN)

**Body:**
```json
{
  "hotelId": "hotel-id",
  "name": "Deluxe Room",
  "type": "Deluxe",
  "maxGuests": 2,
  "totalRooms": 5,
  "size": 30,
  "bedType": "King Size",
  "price": 500000,
  "extraBedPrice": 100000,
  "extraBedAvailable": true,
  "order": 0
}
```

### Update Room
```http
PATCH /rooms/:id
```
🔒 Requires authentication (Owner or ADMIN)

### Delete Room
```http
DELETE /rooms/:id
```
🔒 Requires authentication (Owner or ADMIN)

### List Hotel Rooms
```http
GET /rooms/hotel/:hotelId
```

### Add Room Photo
```http
POST /rooms/:id/photos
```
🔒 Requires authentication (Owner or ADMIN)

**Body:**
```json
{
  "url": "https://example.com/room-photo.jpg",
  "order": 0
}
```

### Delete Room Photo
```http
DELETE /rooms/:id/photos/:photoId
```
🔒 Requires authentication (Owner or ADMIN)

---

## 📅 Booking Endpoints

### Check Availability
```http
GET /bookings/availability
```

**Query Parameters:**
- `roomId` (required): Room UUID
- `checkIn` (required): Check-in date (YYYY-MM-DD)
- `checkOut` (required): Check-out date (YYYY-MM-DD)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "available": true,
    "roomId": "room-id",
    "checkIn": "2024-12-25",
    "checkOut": "2024-12-27",
    "nights": 2,
    "totalRooms": 5,
    "availableRooms": 3,
    "price": "500000",
    "totalPrice": "1000000",
    "message": "3 room(s) available"
  }
}
```

### Create Booking
```http
POST /bookings
```
🔒 Requires authentication

**Body:**
```json
{
  "roomId": "room-id",
  "checkIn": "2024-12-25",
  "checkOut": "2024-12-27",
  "guests": 2,
  "guestName": "John Doe",
  "guestPhone": "081234567890",
  "guestEmail": "john@example.com",
  "guestNotes": "Late check-in"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "booking-id",
    "bookingCode": "BKABCD1234",
    "status": "PENDING",
    "checkIn": "2024-12-25",
    "checkOut": "2024-12-27",
    "nights": 2,
    "guests": 2,
    "totalPrice": "1000000",
    "platformFee": "100000",
    "hostPayout": "900000",
    "expiredAt": "2024-12-20T10:30:00Z",
    "room": { ... },
    "user": { ... }
  }
}
```

### List My Bookings
```http
GET /bookings/my
```
🔒 Requires authentication

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `status` (optional): Filter by status
- `startDate` (optional): Filter by check-in date
- `endDate` (optional): Filter by check-out date
- `search` (optional): Search by booking code, guest name

### List Host Bookings
```http
GET /bookings/host
```
🔒 Requires authentication (HOST role)

**Query Parameters:** Same as My Bookings

### Get Booking by ID
```http
GET /bookings/:id
```
🔒 Requires authentication

### Get Booking by Code
```http
GET /bookings/code/:code
```
🔒 Requires authentication

### Cancel Booking
```http
POST /bookings/:id/cancel
```
🔒 Requires authentication

**Body:**
```json
{
  "reason": "Change of plans"
}
```

### Update Booking Status
```http
PATCH /bookings/:id/status
```
🔒 Requires authentication (HOST or ADMIN)

**Body:**
```json
{
  "status": "CONFIRMED",
  "notes": "Booking confirmed"
}
```

**Status Flow:**
- PENDING → PAID → CONFIRMED → CHECKED_IN → CHECKED_OUT → COMPLETED
- PENDING/PAID/CONFIRMED → CANCELLED
- PENDING → EXPIRED

### Get Booking Statistics
```http
GET /bookings/stats/overview
```
🔒 Requires authentication (HOST or ADMIN)

### List All Bookings (Admin)
```http
GET /bookings/admin/all
```
🔒 Requires authentication (ADMIN role)

---

## 💳 Payment Endpoints

### Create Payment
```http
POST /payments
```
🔒 Requires authentication

**Body:**
```json
{
  "bookingId": "booking-id",
  "provider": "MIDTRANS"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "payment-id",
    "bookingId": "booking-id",
    "amount": "1000000",
    "provider": "MIDTRANS",
    "status": "PENDING",
    "snapToken": "abc123xyz",
    "paymentUrl": "https://app.sandbox.midtrans.com/snap/v2/...",
    "expiredAt": "2024-12-21T10:00:00Z",
    "createdAt": "2024-12-20T10:00:00Z"
  },
  "message": "Payment created successfully"
}
```

### List My Payments
```http
GET /payments/my
```
🔒 Requires authentication

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `status` (optional): Filter by status (PENDING, SETTLED, FAILED, EXPIRED, REFUNDED)
- `provider` (optional): Filter by provider (MIDTRANS, MANUAL)
- `startDate` (optional): Filter by creation date
- `endDate` (optional): Filter by creation date

### Get Payment by ID
```http
GET /payments/:id
```
🔒 Requires authentication

### Get Payment by Booking ID
```http
GET /payments/booking/:bookingId
```
🔒 Requires authentication

### Check Payment Status
```http
GET /payments/:id/status
```
🔒 Requires authentication

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "payment-id",
    "status": "SETTLED",
    "paidAt": "2024-12-20T10:15:00Z",
    ...
  }
}
```

### Cancel Payment
```http
POST /payments/:id/cancel
```
🔒 Requires authentication

### Refund Payment (Admin)
```http
POST /payments/:id/refund
```
🔒 Requires authentication (ADMIN role)

**Body:**
```json
{
  "reason": "Customer requested refund"
}
```

### Get Payment Statistics (Admin)
```http
GET /payments/admin/stats
```
🔒 Requires authentication (ADMIN role)

**Query Parameters:**
- `startDate` (optional): Start date
- `endDate` (optional): End date

### List All Payments (Admin)
```http
GET /payments/admin/all
```
🔒 Requires authentication (ADMIN role)

---

## 🔔 Webhook Endpoints

### Midtrans Payment Notification
```http
POST /webhooks/midtrans
```

**Body:** (Sent by Midtrans)
```json
{
  "transaction_status": "settlement",
  "order_id": "BKABCD1234-1234567890",
  "gross_amount": "1000000",
  "payment_type": "credit_card",
  "transaction_id": "abc123",
  "signature_key": "...",
  ...
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Notification processed successfully",
  "data": {
    "paymentId": "payment-id",
    "status": "SETTLED"
  }
}
```

### Test Webhook
```http
POST /webhooks/test
```

**Body:** (Any JSON)
```json
{
  "test": "data"
}
```

### Webhook Health Check
```http
GET /webhooks/health
```

**Response:** `200 OK`
```json
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

## 🌐 Root Endpoints

### API Info
```http
GET /
```

**Response:** `200 OK`
```json
{
  "message": "Welcome to Inn Horizon API",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "users": "/api/users",
    "hotels": "/api/hotels",
    "rooms": "/api/rooms",
    "bookings": "/api/bookings",
    "reviews": "/api/reviews",
    "payments": "/api/payments",
    "webhooks": "/api/webhooks"
  }
}
```

### Health Check
```http
GET /health
```

**Response:** `200 OK`
```json
{
  "status": "ok",
  "timestamp": "2024-12-20T10:00:00Z"
}
```

---

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "pagination": { ... } // Optional, for list endpoints
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## 🔢 HTTP Status Codes

- `200 OK` - Request succeeded
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict (e.g., duplicate)
- `500 Internal Server Error` - Server error

---

## 📝 Notes

### Booking Status Flow
```
PENDING → Payment not yet made (15 min expiry)
PAID → Payment received, awaiting confirmation
CONFIRMED → Host confirmed the booking
CHECKED_IN → Guest checked in
CHECKED_OUT → Guest checked out
COMPLETED → Booking completed successfully
CANCELLED → Booking cancelled
REFUNDED → Payment refunded
EXPIRED → Booking expired (not paid in time)
```

### Payment Status Flow
```
PENDING → Payment initiated
SETTLED → Payment successful
FAILED → Payment failed
EXPIRED → Payment expired
REFUNDED → Payment refunded
```

### Date Formats
- Dates: `YYYY-MM-DD` (e.g., "2024-12-25")
- Timestamps: ISO 8601 (e.g., "2024-12-20T10:00:00Z")

### Pagination
Default pagination values:
- `page`: 1
- `limit`: 10
- `maxLimit`: 100

---

## 🎯 Quick Examples

### Complete Booking Flow

1. **Check availability**
```bash
GET /bookings/availability?roomId=xxx&checkIn=2024-12-25&checkOut=2024-12-27
```

2. **Create booking**
```bash
POST /bookings
{
  "roomId": "xxx",
  "checkIn": "2024-12-25",
  "checkOut": "2024-12-27",
  "guests": 2,
  "guestName": "John Doe",
  "guestPhone": "081234567890"
}
```

3. **Create payment**
```bash
POST /payments
{
  "bookingId": "booking-id",
  "provider": "MIDTRANS"
}
```

4. **Complete payment on Midtrans** (customer action)

5. **Webhook updates booking to PAID** (automatic)

6. **Host confirms**
```bash
PATCH /bookings/:id/status
{
  "status": "CONFIRMED"
}
```

---

## 📚 Additional Resources

- [Phase 3 Completion Report](./PHASE_3_COMPLETION_REPORT.md)
- [Quick Reference Guide](./PHASE_3_QUICK_REFERENCE.md)
- [Setup Guide](./PHASE_3_SETUP.md)
- [Midtrans Integration](./MIDTRANS_INTEGRATION.md)

---

**Total Endpoints**: 70+
**Version**: 1.0.0
**Last Updated**: December 2024