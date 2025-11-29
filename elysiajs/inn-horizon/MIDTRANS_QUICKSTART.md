# Midtrans Quick Start Guide

Quick setup guide untuk mengimplementasikan Midtrans payment di Inn Horizon API.

## 🚀 Quick Setup (5 Minutes)

### 1. Get Midtrans Credentials

1. Register di [Midtrans Dashboard](https://dashboard.midtrans.com/)
2. Login dan pilih environment:
   - **Sandbox** untuk testing
   - **Production** untuk live
3. Go to **Settings** → **Access Keys**
4. Copy **Server Key** dan **Client Key**

### 2. Configure Environment

Update file `.env`:

```env
# Midtrans Configuration
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxxxxxxxxxxx
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxxxxxxxxxx
NODE_ENV=development
APP_URL=http://localhost:3000
```

### 3. Setup Webhook URL

#### For Production:
1. Go to **Settings** → **Configuration** di Midtrans Dashboard
2. Set **Payment Notification URL**: `https://your-domain.com/api/webhooks/midtrans`

#### For Local Development:
```bash
# Install ngrok
npm install -g ngrok

# Start your server
bun run dev

# In another terminal, start ngrok
ngrok http 3000

# Copy ngrok URL (e.g., https://abcd1234.ngrok.io)
# Set webhook URL: https://abcd1234.ngrok.io/api/webhooks/midtrans
```

### 4. Test Payment Flow

```bash
# 1. Create a booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "your_user_id",
    "roomId": "your_room_id",
    "checkIn": "2024-02-01",
    "checkOut": "2024-02-03",
    "guests": 2,
    "guestName": "John Doe",
    "guestPhone": "+62812345678"
  }'

# 2. Create payment token (use booking_id from step 1)
curl -X POST http://localhost:3000/api/payments/create/BOOKING_ID

# 3. Open redirect_url in browser and complete payment
```

## 📝 Test Credit Cards (Sandbox)

### Success Payment
```
Card Number: 4811 1111 1111 1114
CVV: 123
Exp: 01/25
OTP/3DS: 112233
```

### Failed Payment
```
Card Number: 4911 1111 1111 1113
CVV: 123
Exp: 01/25
OTP/3DS: 112233
```

## 🔌 API Endpoints

### Create Payment
```bash
POST /api/payments/create/:bookingId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "66e4fa55-fdac-4ef9-91b5-733b5d859e30",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/...",
    "amount": 500000
  }
}
```

### Check Payment Status
```bash
GET /api/payments/:bookingId/status
```

### Cancel Booking with Refund
```bash
POST /api/bookings/:id/cancel
```

### Get Refund Estimate
```bash
GET /api/bookings/:id/refund-estimate
```

## 💳 Frontend Integration

### Option 1: Redirect (Simplest)
```javascript
// Redirect user to Midtrans payment page
window.location.href = response.data.redirect_url;
```

### Option 2: Snap.js Popup (Recommended)
```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://app.sandbox.midtrans.com/snap/snap.js" 
          data-client-key="YOUR_CLIENT_KEY"></script>
</head>
<body>
  <button onclick="pay()">Pay Now</button>

  <script>
    async function pay() {
      // 1. Get payment token from your backend
      const response = await fetch('/api/payments/create/BOOKING_ID', {
        method: 'POST'
      });
      const data = await response.json();

      // 2. Open Snap payment popup
      snap.pay(data.data.token, {
        onSuccess: function(result) {
          alert('Payment success!');
          window.location.href = '/booking-success';
        },
        onPending: function(result) {
          alert('Waiting for payment...');
          window.location.href = '/booking-pending';
        },
        onError: function(result) {
          alert('Payment failed!');
        },
        onClose: function() {
          alert('Payment cancelled');
        }
      });
    }
  </script>
</body>
</html>
```

### Option 3: React/Next.js Example
```jsx
import { useEffect } from 'react';

function PaymentPage({ bookingId }) {
  useEffect(() => {
    // Load Snap script
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY);
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    try {
      // Get payment token
      const response = await fetch(`/api/payments/create/${bookingId}`, {
        method: 'POST'
      });
      const data = await response.json();

      // Open Snap popup
      window.snap.pay(data.data.token, {
        onSuccess: (result) => {
          console.log('Payment success:', result);
          router.push('/booking-success');
        },
        onPending: (result) => {
          console.log('Payment pending:', result);
          router.push('/booking-pending');
        },
        onError: (result) => {
          console.error('Payment error:', result);
          alert('Payment failed. Please try again.');
        },
        onClose: () => {
          console.log('Payment popup closed');
        }
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create payment');
    }
  };

  return (
    <div>
      <h1>Complete Your Payment</h1>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}
```

## 🔄 Payment Flow Diagram

```
User                    Your App                Midtrans
  |                        |                        |
  |--Create Booking------->|                        |
  |<---Booking Created-----|                        |
  |                        |                        |
  |--Request Payment------>|                        |
  |                        |---Create Token-------->|
  |                        |<---Token & URL---------|
  |<---Token & URL---------|                        |
  |                        |                        |
  |--------------------Open Payment Page---------->|
  |<-------------------Payment Form----------------|
  |                        |                        |
  |--------------------Complete Payment---------->|
  |                        |<---Webhook-------------|
  |                        |---Update Status------->DB
  |                        |                        |
  |<---Redirect Success----|                        |
```

## 🔐 Cancellation & Refund Policy

| Days Before Check-in | Refund % | Fee |
|---------------------|----------|-----|
| 7+ days | 90% | 10% admin fee |
| 3-6 days | 75% | 25% |
| 1-2 days | 50% | 50% |
| Same day or past | 0% | 100% (no refund) |

### Example:
```
Booking Price: Rp 500,000
Cancelled: 10 days before check-in
Refund: 90% = Rp 450,000
Fee: 10% = Rp 50,000
```

## 🧪 Testing Checklist

- [ ] Create booking successfully
- [ ] Generate payment token
- [ ] Complete payment with test credit card
- [ ] Verify webhook received
- [ ] Check booking status updated to PAID
- [ ] Check payment status in database
- [ ] Test cancellation with refund
- [ ] Verify refund amount calculation
- [ ] Check host wallet deduction

## ⚠️ Common Issues

### 1. Webhook not received
**Solution:** 
- Use ngrok for local testing
- Check webhook URL in Midtrans Dashboard
- Verify server is running

### 2. Invalid credentials
**Solution:**
- Check Server Key and Client Key
- Verify NODE_ENV matches your credentials (sandbox vs production)

### 3. Payment not updating
**Solution:**
- Check webhook logs in Midtrans Dashboard
- Manually trigger webhook from Dashboard
- Check server logs for errors

### 4. Refund failed
**Solution:**
- Only settled transactions can be refunded
- Check transaction ID (providerRef)
- Verify transaction exists in Midtrans

## 📚 Next Steps

1. ✅ Test payment flow in Sandbox
2. ✅ Integrate frontend with Snap.js
3. ✅ Test refund process
4. ✅ Setup webhook monitoring
5. ⬜ Get Production credentials
6. ⬜ Update environment variables
7. ⬜ Test with real payment
8. ⬜ Go live! 🚀

## 🆘 Need Help?

- **Full Documentation**: See [MIDTRANS_INTEGRATION.md](./MIDTRANS_INTEGRATION.md)
- **Midtrans Docs**: https://docs.midtrans.com/
- **Support**: support@midtrans.com

---

**Quick Start Complete!** 🎉

Sekarang kamu sudah siap untuk menerima pembayaran dengan Midtrans.