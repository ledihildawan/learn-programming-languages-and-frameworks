# 🚀 Quick Start Guide - Inn Horizon API

## 📋 Table of Contents
- [What's Been Built](#whats-been-built)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [Testing the API](#testing-the-api)
- [Available Endpoints](#available-endpoints)
- [Next Steps](#next-steps)

---

## ✅ What's Been Built

**Phase 1: Authentication & User Management** is now **COMPLETE**! 🎉

### Features Implemented:
- ✅ User Registration (Customer & Host roles)
- ✅ User Login with JWT authentication
- ✅ Token refresh mechanism
- ✅ Password management (change password)
- ✅ User profile management
- ✅ Role-based access control (RBAC)
- ✅ Admin user management
- ✅ Secure password hashing with bcrypt
- ✅ JWT token generation & verification
- ✅ Soft delete support
- ✅ Input validation & error handling

### Technology Stack:
- **Runtime**: Bun
- **Framework**: ElysiaJS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Custom JWT implementation
- **Password Security**: bcryptjs

---

## 📦 Prerequisites

Before you start, make sure you have:

1. **Bun** installed (v1.0 or higher)
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **PostgreSQL** database running
   - You need a PostgreSQL database instance
   - Note down your connection string

3. **Git** (to clone the repository)

---

## 🛠️ Installation

### Step 1: Install Dependencies

```bash
bun install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/inn_horizon"

# JWT Secrets (CHANGE THESE IN PRODUCTION!)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-this-in-production"
JWT_REFRESH_EXPIRES_IN="30d"

# Bcrypt
BCRYPT_ROUNDS="10"

# Server
PORT="3000"
NODE_ENV="development"

# Frontend URL (for email links - optional for now)
FRONTEND_URL="http://localhost:5173"
```

### Step 3: Generate Prisma Client

```bash
bunx prisma generate
```

### Step 4: Run Database Migrations

```bash
bunx prisma migrate dev
```

### Step 5: (Optional) Seed Database

```bash
bunx prisma db seed
```

---

## 🚀 Running the Server

### Development Mode (with auto-reload)

```bash
bun run dev
```

You should see:
```
🦊 Elysia is running at localhost:3000
📚 API Documentation available at http://localhost:3000
🔐 Auth endpoints: http://localhost:3000/api/auth
👤 User endpoints: http://localhost:3000/api/users
```

### Verify Server is Running

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## 🧪 Testing the API

### Option 1: Using the Test Script

We've created a simple test script that runs all authentication tests:

```bash
# Make sure server is running first
bun run dev

# In another terminal, run the test
bun run test-auth.ts
```

This will test:
- ✅ Health check
- ✅ Customer registration
- ✅ Get current user
- ✅ Update profile
- ✅ Change password
- ✅ Login with new password
- ✅ Token refresh
- ✅ Host registration with bank info
- ✅ Invalid token handling
- ✅ Duplicate email prevention

### Option 2: Using Bruno (Recommended)

1. **Open Bruno** application
2. **Open the collection** from `bruno/` folder
3. **Navigate to** `auth/` folder
4. **Run tests** in sequence:
   - `01-register-customer.bru`
   - `02-register-host.bru`
   - `03-login.bru`
   - `04-get-me.bru`
   - `05-change-password.bru`
   - `06-refresh-token.bru`

### Option 3: Using cURL

#### Register a Customer:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@test.com",
    "password": "Test1234",
    "name": "John Customer",
    "phone": "081234567890",
    "role": "CUSTOMER"
  }'
```

#### Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@test.com",
    "password": "Test1234"
  }'
```

Save the `accessToken` from the response.

#### Get Current User:
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

---

## 📡 Available Endpoints

### 🔐 Authentication Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| POST | `/api/auth/refresh` | Refresh access token | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |
| POST | `/api/auth/change-password` | Change password | ✅ |
| POST | `/api/auth/verify-email` | Verify email | ❌ |
| POST | `/api/auth/resend-verification` | Resend verification | ❌ |
| POST | `/api/auth/forgot-password` | Request password reset | ❌ |
| POST | `/api/auth/reset-password` | Reset password | ❌ |
| POST | `/api/auth/logout` | Logout user | ✅ |

### 👤 User Management Endpoints

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/api/users/profile` | Get own profile | ✅ | Any |
| PUT | `/api/users/profile` | Update own profile | ✅ | Any |
| POST | `/api/users/avatar` | Upload avatar | ✅ | Any |
| DELETE | `/api/users/avatar` | Delete avatar | ✅ | Any |
| DELETE | `/api/users/account` | Delete own account | ✅ | Any |
| GET | `/api/users` | List all users | ✅ | Admin |
| GET | `/api/users/statistics` | Get user stats | ✅ | Admin |
| GET | `/api/users/:id` | Get user by ID | ✅ | Admin |
| PATCH | `/api/users/:id/verify` | Update verification | ✅ | Admin |
| PATCH | `/api/users/:id/role` | Update user role | ✅ | Admin |
| DELETE | `/api/users/:id` | Delete user | ✅ | Admin |

---

## 🎯 Quick Examples

### Example 1: Complete Registration → Login → Get Profile Flow

```bash
# 1. Register
RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@test.com",
    "password": "Demo1234",
    "name": "Demo User",
    "phone": "081234567890",
    "role": "CUSTOMER"
  }')

# Extract token (using jq)
TOKEN=$(echo $RESPONSE | jq -r '.data.tokens.accessToken')

# 2. Get Profile
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

### Example 2: Register Host with Bank Info

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "host@test.com",
    "password": "Host1234",
    "name": "Jane Host",
    "phone": "081234567891",
    "role": "HOST",
    "bankName": "Bank Mandiri",
    "bankCode": "008",
    "accountNumber": "1234567890",
    "accountName": "Jane Host"
  }'
```

### Example 3: Update Profile

```bash
curl -X PUT http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "bankName": "Bank BCA",
    "accountNumber": "9876543210"
  }'
```

---

## 🔒 Security Notes

### Password Requirements:
- Minimum 8 characters
- Maximum 72 characters
- Must contain at least one letter
- Must contain at least one number

### JWT Tokens:
- **Access Token**: Valid for 7 days (default)
- **Refresh Token**: Valid for 30 days (default)
- Always use HTTPS in production
- Keep JWT secrets secure and unique

### User Roles:
- **CUSTOMER**: Regular users who book hotels
- **HOST**: Property owners who list hotels
- **ADMIN**: Platform administrators

---

## 📚 Documentation

For detailed documentation, see:
- [Phase 1 Complete Documentation](./PHASE_1_AUTH.md)
- [API Examples](../API_DOCUMENTATION.md)
- [Database Schema](../prisma/schema.prisma)

---

## 🐛 Troubleshooting

### Server won't start
```bash
# Check if Prisma is generated
bunx prisma generate

# Check database connection
bunx prisma db pull
```

### "Cannot find module" errors
```bash
# Reinstall dependencies
rm -rf node_modules
bun install
```

### Database connection errors
- Verify `DATABASE_URL` in `.env`
- Check if PostgreSQL is running
- Ensure database exists

### Token errors
- Check if `JWT_SECRET` is set in `.env`
- Verify token format: `Bearer <token>`
- Token might be expired - use refresh token

---

## 🎯 Next Steps

Now that Phase 1 is complete, you can proceed to:

### Phase 2: Hotel & Room Management
- Create hotel listings
- Add rooms to hotels
- Upload photos
- Manage amenities
- Search & filter hotels

### Phase 3: Booking System & Payment
- Check room availability
- Create bookings
- Integrate Midtrans payment
- Handle booking status
- Cancellation policies

### Phase 4: Review System
- Leave reviews after checkout
- Rate hotels
- View hotel ratings

### Phase 5: Payout & Financial Management
- Host ledger system
- Payout requests
- Admin payout processing
- Financial reports

### Phase 6: Admin Dashboard & Settings
- Platform statistics
- User management
- Settings configuration
- Reports & analytics

---

## 💡 Tips

1. **Use Bruno for Testing**: It's much easier than cURL for complex requests
2. **Save Tokens**: Bruno automatically saves tokens to environment variables
3. **Check Logs**: Development mode shows all SQL queries
4. **Read Error Messages**: API returns detailed error messages
5. **Use Test Script**: Quick way to verify all endpoints work

---

## 🤝 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the detailed documentation in `docs/PHASE_1_AUTH.md`
3. Check if server is running: `curl http://localhost:3000/health`
4. Verify environment variables are set correctly

---

## 📊 Project Status

| Phase | Status | Completion |
|-------|--------|------------|
| Phase 1: Auth & Users | ✅ Complete | 100% |
| Phase 2: Hotels & Rooms | ⏳ Pending | 0% |
| Phase 3: Bookings & Payment | ⏳ Pending | 0% |
| Phase 4: Reviews | ⏳ Pending | 0% |
| Phase 5: Payouts | ⏳ Pending | 0% |
| Phase 6: Admin & Settings | ⏳ Pending | 0% |

---

**Happy Coding! 🚀**

Last Updated: November 28, 2024