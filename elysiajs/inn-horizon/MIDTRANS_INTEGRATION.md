# Midtrans Payment Gateway Integration

Dokumentasi lengkap untuk integrasi Midtrans payment gateway di Inn Horizon API.

## Table of Contents

- [Overview](#overview)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Payment Flow](#payment-flow)
- [Webhook Handling](#webhook-handling)
- [Refund Process](#refund-process)
- [Cancellation Policy](#cancellation-policy)
- [Testing](#testing)
- [Error Handling](#error-handling)

## Overview

Inn Horizon menggunakan Midtrans Snap API untuk memproses pembayaran booking hotel. Sistem ini mendukung:

- **Multiple Payment Methods**: Credit Card, Bank Transfer, E-Wallet, dll
- **Secure Payment**: PCI DSS compliant melalui Midtrans
- **Automatic Refund**: Refund otomatis untuk pembatalan booking
- **Webhook Notification**: Real-time payment status update
- **Cancellation Policy**: Flexible refund policy berdasarkan waktu pembatalan

## Setup

### 1. Install Dependencies

Package Midtrans sudah terinstall di project:

```bash
bun install
```

Dependencies yang digunakan:
- `midtrans-client`: ^1.4.3
- `@types/midtrans-client`: ^1.4.0

### 2. Get Midtrans Credentials

1. Register di [Midtrans Dashboard](https://dashboard.midtrans.com/)
2. Pilih environment (Sandbox untuk testing, Production untuk live)
3. Copy **Server Key** dan **Client Key**

### 3. Configure Environment

Buat file `.env` dan tambahkan:

```env
# Midtrans Configuration
MIDTRANS_SERVER_KEY=your_server_key_here
MIDTRANS_CLIENT_KEY=your_client_key_here
NODE_ENV=development  # atau 'production'

# Application URL (untuk callback)
APP_URL=http://localhost:3000
```

**Sandbox Credentials** (untuk testing):
- Server Key: Dimulai dengan `SB-Mid-server-`
- Client Key: Dimulai dengan `SB-Mid-client-`

**Production Credentials**:
- Server Key: Dimulai dengan `Mid-server-`
- Client Key: Dimulai dengan `Mid-client-`

## Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `MIDTRANS_SERVER_KEY` | Server key dari Midtrans | Yes | `SB-Mid-server-xxxxx` |
| `MIDTRANS_CLIENT_KEY` | Client key dari Midtrans | Yes | `SB-Mid-client-xxxxx` |
| `NODE_ENV` | Environment mode | Yes | `development` / `production` |
| `APP_URL` | Base URL aplikasi | Yes | `http://localhost:3000` |

## API Endpoints

### 1. Create Payment Token

Membuat payment token untuk booking yang sudah dibuat.

**Endpoint**: `POST /api/payments/create/:bookingId`

**Parameters**:
- `bookingId` (string): ID booking yang akan dibayar

**Response Success** (200):
```json
{
  "success": true,
  "message": "Token pembayaran berhasil dibuat",
  "data": {
    "booking_id": "clx1234567890",
    "token": "66e4fa55-fdac-4ef9-91b5-733b5d859e30",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/...",
    "amount": 500000,
    "expires_at": "2024-01-15T12:00:00.000Z"
  }
}
```

**Response Error** (400):
```json
{
  "success": false,
  "error": "Booking tidak valid untuk pembayaran",
  "details": "Status booking: PAID"
}
```

**Usage Example**:
```bash
curl -X POST http://localhost:3000/api/payments/create/clx1234567890 \
  -H "Content-Type: application/json"
```

### 2. Get Payment Status

Mendapatkan status pembayaran untuk sebuah booking.

**Endpoint**: `GET /api/payments/:bookingId/status`

**Parameters**:
- `bookingId` (string): ID booking

**Response Success** (200):
```json
{
  "success": true,
  "data": {
    "payment_id": "clx9876543210",
    "booking_id": "clx1234567890",
    "amount": 500000,
    "provider": "MIDTRANS",
    "status": "SETTLED",
    "paid_at": "2024-01-15T10:30:00.000Z",
    "expired_at": "2024-01-15T12:00:00.000Z",
    "created_at": "2024-01-14T12:00:00.000Z",
    "booking": {
      "id": "clx1234567890",
      "status": "PAID",
      "totalPrice": 500000,
      "checkIn": "2024-02-01",
      "checkOut": "2024-02-03"
    }
  }
}
```

### 3. Cancel Booking with Refund

Membatalkan booking dan memproses refund otomatis.

**Endpoint**: `POST /api/bookings/:id/cancel`

**Parameters**:
- `id` (string): ID booking yang akan dibatalkan

**Response Success** (200):
```json
{
  "success": true,
  "message": "Booking berhasil dibatalkan dan refund diproses",
  "booking_id": "clx1234567890",
  "refund": {
    "original_amount": 500000,
    "refund_amount": 450000,
    "cancellation_fee": 50000,
    "refund_percentage": 90,
    "days_until_checkin": 10,
    "refund_response": {
      "status_code": "200",
      "status_message": "Success, refund is approved"
    }
  }
}
```

### 4. Get Refund Estimate

Menghitung estimasi refund sebelum pembatalan.

**Endpoint**: `GET /api/bookings/:id/refund-estimate`

**Parameters**:
- `id` (string): ID booking

**Response Success** (200):
```json
{
  "success": true,
  "data": {
    "booking_id": "clx1234567890",
    "booking_status": "PAID",
    "check_in_date": "2024-02-01",
    "days_until_checkin": 10,
    "original_amount": 500000,
    "refund_amount": 450000,
    "cancellation_fee": 50000,
    "refund_percentage": 90,
    "policy_description": "7+ days before check-in: 90% refund (10% admin fee)",
    "can_refund": true
  }
}
```

### 5. Webhook Endpoint

Endpoint untuk menerima notifikasi dari Midtrans.

**Endpoint**: `POST /api/webhooks/midtrans`

**⚠️ Important**: Endpoint ini harus dapat diakses dari internet. Gunakan ngrok untuk testing lokal.

## Payment Flow

### Complete Payment Flow Diagram

```
1. User creates booking
   ↓
2. Booking status: PENDING
   ↓
3. User requests payment token
   POST /api/payments/create/:bookingId
   ↓
4. System creates Midtrans Snap token
   ↓
5. User redirected to Midtrans payment page
   (redirect_url)
   ↓
6. User completes payment
   ↓
7. Midtrans sends webhook notification
   POST /api/webhooks/midtrans
   ↓
8. System verifies notification signature
   ↓
9. System updates booking & payment status
   - Booking: PENDING → PAID
   - Payment: PENDING → SETTLED
   ↓
10. System creates host ledger entry
    - Add income to host wallet
   ↓
11. User redirected to success page
    (callback URL)
```

### Step-by-Step Implementation

#### Step 1: Create Booking

```bash
POST /api/bookings
{
  "userId": "clx_user_123",
  "roomId": "clx_room_456",
  "checkIn": "2024-02-01",
  "checkOut": "2024-02-03",
  "guests": 2,
  "guestName": "John Doe",
  "guestPhone": "+62812345678",
  "guestEmail": "john@example.com"
}
```

**Response**:
```json
{
  "message": "Booking created successfully",
  "booking": {
    "id": "clx1234567890",
    "status": "PENDING",
    "totalPrice": 500000,
    ...
  }
}
```

#### Step 2: Create Payment Token

```bash
POST /api/payments/create/clx1234567890
```

**Response**:
```json
{
  "success": true,
  "data": {
    "token": "66e4fa55-fdac-4ef9-91b5-733b5d859e30",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/..."
  }
}
```

#### Step 3: Frontend Integration

**Option A: Redirect to Midtrans**
```javascript
// Redirect user to payment page
window.location.href = response.data.redirect_url;
```

**Option B: Snap.js Integration** (Popup)
```html
<!-- Add Midtrans Snap script -->
<script src="https://app.sandbox.midtrans.com/snap/snap.js" 
        data-client-key="YOUR_CLIENT_KEY"></script>

<script>
  // Open Snap popup
  snap.pay(response.data.token, {
    onSuccess: function(result) {
      console.log('Payment success:', result);
      window.location.href = `/booking/${bookingId}/success`;
    },
    onPending: function(result) {
      console.log('Payment pending:', result);
      window.location.href = `/booking/${bookingId}/pending`;
    },
    onError: function(result) {
      console.log('Payment error:', result);
      window.location.href = `/booking/${bookingId}/error`;
    },
    onClose: function() {
      console.log('Payment popup closed');
    }
  });
</script>
```

#### Step 4: Handle Webhook

Webhook akan otomatis dipanggil oleh Midtrans. Pastikan endpoint dapat diakses dari internet.

## Webhook Handling

### Setup Webhook URL di Midtrans

1. Login ke [Midtrans Dashboard](https://dashboard.midtrans.com/)
2. Go to **Settings** → **Configuration**
3. Set **Payment Notification URL**: `https://your-domain.com/api/webhooks/midtrans`

**For Local Testing**:
```bash
# Install ngrok
npm install -g ngrok

# Start ngrok tunnel
ngrok http 3000

# Use ngrok URL as webhook URL
# Example: https://abcd1234.ngrok.io/api/webhooks/midtrans
```

### Webhook Payload Example

```json
{
  "transaction_time": "2024-01-15 10:30:00",
  "transaction_status": "settlement",
  "transaction_id": "abc123xyz",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "abc123...",
  "payment_type": "credit_card",
  "order_id": "clx1234567890",
  "merchant_id": "G123456789",
  "gross_amount": "500000.00",
  "fraud_status": "accept",
  "currency": "IDR"
}
```

### Transaction Status

| Status | Description | Action |
|--------|-------------|--------|
| `capture` | Credit card payment captured | Update to PAID if fraud_status = accept |
| `settlement` | Payment settled | Update to PAID |
| `pending` | Waiting for payment (e.g., bank transfer) | Keep as PENDING |
| `deny` | Payment denied | Update to CANCELLED |
| `expire` | Payment expired | Update to CANCELLED |
| `cancel` | Payment cancelled | Update to CANCELLED |
| `refund` | Payment refunded | Update to REFUNDED |

### Fraud Status

| Status | Description | Action |
|--------|-------------|--------|
| `accept` | Payment accepted | Process as successful |
| `challenge` | Manual review required | Keep as PENDING |
| `deny` | Fraudulent transaction | Cancel booking |

## Refund Process

### Automatic Refund Flow

```
1. User requests cancellation
   POST /api/bookings/:id/cancel
   ↓
2. System checks booking status
   - Must be PAID or CONFIRMED
   ↓
3. System calculates refund based on policy
   ↓
4. System calls Midtrans refund API
   ↓
5. Midtrans processes refund
   ↓
6. System updates booking & payment status
   - Booking: PAID → CANCELLED
   - Payment: SETTLED → REFUNDED
   ↓
7. System deducts from host wallet
   - Create REFUND_DEDUCTION ledger entry
   ↓
8. Refund confirmed via webhook
```

### Refund Implementation

```javascript
// Import refund function
import { refundMidtrans } from '@/lib/midtrans';

// Process refund
const result = await refundMidtrans(
  transactionId,      // From payment.providerRef
  refundAmount,       // Amount to refund
  'Cancellation by customer'  // Reason
);

if (result.success) {
  console.log('Refund successful:', result.data);
} else {
  console.error('Refund failed:', result.error);
}
```

## Cancellation Policy

### Refund Percentage Based on Days Before Check-in

| Days Before Check-in | Refund % | Cancellation Fee |
|---------------------|----------|------------------|
| 7+ days | 90% | 10% (admin fee) |
| 3-6 days | 75% | 25% |
| 1-2 days | 50% | 50% |
| Same day or past | 0% | 100% (no refund) |

### Example Calculation

**Booking Details**:
- Total Price: Rp 500,000
- Check-in: February 15, 2024
- Cancellation Date: February 5, 2024
- Days until check-in: 10 days

**Refund Calculation**:
```
Days until check-in: 10 days (7+ days policy)
Refund percentage: 90%
Cancellation fee: 10% = Rp 50,000
Refund amount: 90% = Rp 450,000
```

**Host Impact**:
```
Platform fee: 10% = Rp 50,000
Host income (when paid): Rp 450,000
Refund deduction: Rp 450,000
Host final balance: Rp 0 (amount deducted from wallet)
```

## Testing

### 1. Testing with Sandbox

Midtrans Sandbox menyediakan test credentials:

**Test Credit Cards**:
```
Card Number: 4811 1111 1111 1114
CVV: 123
Exp: 01/25
OTP/3DS: 112233

Card Number: 5211 1111 1111 1117
CVV: 123
Exp: 01/25
OTP/3DS: 112233
```

**Test Bank Transfer**:
- Select BCA/Mandiri/BNI/Permata
- Payment will be auto-approved in Sandbox

**Test E-Wallet**:
- Select GoPay/ShopeePay/QRIS
- Auto-approved in Sandbox

### 2. Test Payment Flow

```bash
# 1. Create booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "clx_user_123",
    "roomId": "clx_room_456",
    "checkIn": "2024-02-01",
    "checkOut": "2024-02-03",
    "guests": 2,
    "guestName": "John Doe",
    "guestPhone": "+62812345678"
  }'

# 2. Create payment token
curl -X POST http://localhost:3000/api/payments/create/BOOKING_ID

# 3. Open redirect_url in browser and complete payment

# 4. Check payment status
curl http://localhost:3000/api/payments/BOOKING_ID/status
```

### 3. Test Webhook Locally

```bash
# Start ngrok
ngrok http 3000

# Update webhook URL in Midtrans Dashboard
# Use: https://your-ngrok-url.ngrok.io/api/webhooks/midtrans

# Make a test payment
# Webhook will be called automatically
```

### 4. Test Refund Flow

```bash
# 1. Get refund estimate
curl http://localhost:3000/api/bookings/BOOKING_ID/refund-estimate

# 2. Cancel booking with refund
curl -X POST http://localhost:3000/api/bookings/BOOKING_ID/cancel

# 3. Check booking status
curl http://localhost:3000/api/bookings/BOOKING_ID
```

## Error Handling

### Common Errors

#### 1. Invalid Credentials

```json
{
  "success": false,
  "error": "Gagal membuat token pembayaran",
  "details": "401 Unauthorized"
}
```

**Solution**: Check your Server Key and Client Key

#### 2. Booking Not Found

```json
{
  "success": false,
  "error": "Booking tidak ditemukan"
}
```

**Solution**: Verify booking ID exists

#### 3. Invalid Booking Status

```json
{
  "success": false,
  "error": "Booking tidak valid untuk pembayaran",
  "details": "Status booking: PAID"
}
```

**Solution**: Only PENDING bookings can create payment

#### 4. Webhook Signature Invalid

```json
{
  "success": false,
  "error": "Invalid signature or notification"
}
```

**Solution**: 
- Verify Server Key is correct
- Check webhook URL is correct
- Ensure request is from Midtrans

#### 5. Refund Failed

```json
{
  "success": false,
  "error": "Gagal memproses refund",
  "details": "Transaction not found"
}
```

**Solution**:
- Check transaction ID (providerRef)
- Verify transaction is in refundable state
- Only settled/capture transactions can be refunded

### Error Codes

| Code | Message | Solution |
|------|---------|----------|
| 400 | Bad Request | Check request parameters |
| 401 | Unauthorized | Verify Midtrans credentials |
| 404 | Not Found | Check booking/payment ID |
| 500 | Internal Server Error | Check server logs |

## Host Ledger System

### Ledger Entry Types

1. **INCOME_BOOKING**: When payment is successful
   ```
   Amount: Payment amount - 10% platform fee
   Description: Income from booking {id}
   ```

2. **REFUND_DEDUCTION**: When booking is refunded
   ```
   Amount: -(Payment amount - 10% platform fee)
   Description: Refund deduction for cancelled booking {id}
   ```

3. **PAYOUT_WITHDRAWAL**: When host withdraws money
   ```
   Amount: -Withdrawal amount
   Description: Payout to bank account
   ```

### Wallet Balance

Host wallet balance dihitung otomatis dari ledger entries:

```javascript
// Get host wallet balance
const host = await db.user.findUnique({
  where: { id: hostId },
  select: { walletBalance: true }
});

// Get ledger history
const ledgerEntries = await db.hostLedger.findMany({
  where: { hostId },
  orderBy: { createdAt: 'desc' }
});
```

## Security Best Practices

1. **Never expose Server Key** - Only use on backend
2. **Verify webhook signature** - Always validate using Midtrans SDK
3. **Use HTTPS** - Webhook URL must use HTTPS in production
4. **Validate order ID** - Check booking exists before processing
5. **Log all transactions** - Keep audit trail
6. **Handle idempotency** - Webhook may be called multiple times
7. **Set expiry time** - Payment tokens should expire (24 hours default)

## Production Checklist

- [ ] Get Production credentials from Midtrans
- [ ] Update `MIDTRANS_SERVER_KEY` and `MIDTRANS_CLIENT_KEY`
- [ ] Set `NODE_ENV=production`
- [ ] Configure webhook URL with HTTPS
- [ ] Test payment flow with real payment methods
- [ ] Test refund process
- [ ] Setup monitoring and alerts
- [ ] Configure retry logic for failed webhooks
- [ ] Setup database backups
- [ ] Document payment reconciliation process

## Support & Resources

- **Midtrans Documentation**: https://docs.midtrans.com/
- **Midtrans Dashboard**: https://dashboard.midtrans.com/
- **Midtrans Support**: support@midtrans.com
- **API Reference**: https://api-docs.midtrans.com/

## Troubleshooting

### Payment not updating after successful payment

1. Check webhook logs in Midtrans Dashboard
2. Verify webhook URL is correct and accessible
3. Check server logs for webhook errors
4. Manually trigger webhook from Midtrans Dashboard

### Refund not working

1. Verify transaction is in SETTLED status
2. Check transaction age (some methods have time limits)
3. Verify transaction ID is correct
4. Check Midtrans transaction logs

### Webhook not received

1. Check webhook URL configuration
2. Use ngrok for local testing
3. Verify server is running
4. Check firewall settings
5. Test webhook manually from Midtrans Dashboard

---

**Last Updated**: January 2024
**Version**: 1.0.0
**Maintained by**: Inn Horizon Development Team