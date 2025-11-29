# Phase 1: Authentication & User Management

## 📋 Overview

Phase 1 implements the foundational authentication and user management system for Inn Horizon API. This includes user registration, login, JWT-based authentication, profile management, and role-based access control.

## ✅ Completed Features

### 1. Authentication System
- ✅ User Registration (Customer & Host)
- ✅ User Login with JWT
- ✅ Token Refresh (Access & Refresh tokens)
- ✅ Change Password
- ✅ Email Verification (Ready, email sending TODO)
- ✅ Password Reset (Ready, email sending TODO)
- ✅ Logout

### 2. User Profile Management
- ✅ Get Current User Profile
- ✅ Update User Profile
- ✅ Upload Avatar (Structure ready, storage TODO)
- ✅ Delete Avatar
- ✅ Delete Account (Soft delete)

### 3. Admin Features
- ✅ List All Users (with filters)
- ✅ Get User by ID
- ✅ Update User Verification Status
- ✅ Update User Role
- ✅ Get User Statistics
- ✅ Delete User Account

### 4. Security Features
- ✅ Password Hashing (bcrypt)
- ✅ JWT Token Generation & Verification
- ✅ Role-Based Access Control (RBAC)
- ✅ Authentication Middleware
- ✅ Request Validation
- ✅ Soft Delete Support

## 🏗️ Architecture

### Project Structure

```
src/
├── config/
│   └── env.ts                 # Environment configuration
├── lib/
│   ├── prisma.ts              # Prisma client instance
│   └── midtrans.ts            # Midtrans integration (existing)
├── middlewares/
│   └── auth.ts                # Auth & role-based middleware
├── modules/
│   ├── auth/
│   │   ├── index.ts           # Auth routes
│   │   ├── auth.schema.ts     # Validation schemas
│   │   └── auth.service.ts    # Auth business logic
│   └── users/
│       ├── index.ts           # User routes
│       ├── user.schema.ts     # Validation schemas
│       └── user.service.ts    # User business logic
├── utils/
│   ├── jwt.ts                 # JWT utilities
│   └── hash.ts                # Password hashing utilities
└── index.ts                   # Main application entry
```

### Technology Stack

- **Runtime**: Bun
- **Framework**: ElysiaJS
- **Database**: PostgreSQL
- **ORM**: Prisma (with PostgreSQL adapter)
- **Authentication**: JWT (Custom implementation)
- **Password Hashing**: bcryptjs
- **Validation**: Elysia built-in validation

## 🔐 Authentication Flow

### Registration Flow

```
1. Client sends registration data
2. Server validates input (email format, password strength, etc.)
3. Check if email/phone already exists
4. Hash password with bcrypt
5. Create user in database
6. Generate JWT token pair (access + refresh)
7. Return user data and tokens
```

### Login Flow

```
1. Client sends email and password
2. Server finds user by email
3. Verify password with bcrypt
4. Check if user is deleted
5. Generate JWT token pair
6. Return user data and tokens
```

### Token Refresh Flow

```
1. Client sends refresh token
2. Server verifies refresh token
3. Check if user still exists and not deleted
4. Generate new token pair
5. Return new tokens
```

## 📡 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/refresh` | Refresh access token | No |
| GET | `/api/auth/me` | Get current user | Yes |
| POST | `/api/auth/change-password` | Change password | Yes |
| POST | `/api/auth/verify-email` | Verify email | No |
| POST | `/api/auth/resend-verification` | Resend verification email | No |
| POST | `/api/auth/forgot-password` | Request password reset | No |
| POST | `/api/auth/reset-password` | Reset password with token | No |
| POST | `/api/auth/logout` | Logout user | Yes |

### User Management Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/users/profile` | Get own profile | Yes | Any |
| PUT | `/api/users/profile` | Update own profile | Yes | Any |
| POST | `/api/users/avatar` | Upload avatar | Yes | Any |
| DELETE | `/api/users/avatar` | Delete avatar | Yes | Any |
| DELETE | `/api/users/account` | Delete own account | Yes | Any |
| GET | `/api/users` | List all users | Yes | ADMIN |
| GET | `/api/users/statistics` | Get user stats | Yes | ADMIN |
| GET | `/api/users/:id` | Get user by ID | Yes | ADMIN |
| PATCH | `/api/users/:id/verify` | Update verification | Yes | ADMIN |
| PATCH | `/api/users/:id/role` | Update user role | Yes | ADMIN |
| DELETE | `/api/users/:id` | Delete user | Yes | ADMIN |

## 📝 API Examples

### 1. Register Customer

**Request:**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "customer@test.com",
  "password": "Test1234",
  "name": "John Customer",
  "phone": "081234567890",
  "role": "CUSTOMER"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "clxxx123",
      "email": "customer@test.com",
      "name": "John Customer",
      "phone": "081234567890",
      "role": "CUSTOMER",
      "avatar": null,
      "isVerified": false,
      "walletBalance": "0.00",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "tokens": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc..."
    }
  }
}
```

### 2. Register Host (with Bank Info)

**Request:**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "host@test.com",
  "password": "Host1234",
  "name": "Jane Host",
  "phone": "081234567891",
  "role": "HOST",
  "bankName": "Bank Mandiri",
  "bankCode": "008",
  "accountNumber": "1234567890",
  "accountName": "Jane Host"
}
```

### 3. Login

**Request:**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "customer@test.com",
  "password": "Test1234"
}
```

### 4. Get Current User

**Request:**
```bash
GET /api/auth/me
Authorization: Bearer eyJhbGc...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clxxx123",
    "email": "customer@test.com",
    "name": "John Customer",
    "phone": "081234567890",
    "role": "CUSTOMER",
    "avatar": null,
    "isVerified": false,
    "walletBalance": "0.00",
    "bankName": null,
    "bankCode": null,
    "accountNumber": null,
    "accountName": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 5. Update Profile

**Request:**
```bash
PUT /api/users/profile
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "name": "John Customer Updated",
  "bankName": "Bank BCA",
  "accountNumber": "9876543210"
}
```

### 6. Change Password

**Request:**
```bash
POST /api/auth/change-password
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "currentPassword": "Test1234",
  "newPassword": "NewTest1234"
}
```

### 7. Refresh Token

**Request:**
```bash
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}
```

## 🔒 Security Features

### Password Requirements
- Minimum 8 characters
- Maximum 72 characters
- Must contain at least one letter
- Must contain at least one number

### JWT Configuration
- **Access Token**: Expires in 7 days (default)
- **Refresh Token**: Expires in 30 days (default)
- **Algorithm**: HS256 (HMAC-SHA256)
- **Secret**: Configurable via environment variable

### Role-Based Access Control (RBAC)

#### Roles:
1. **CUSTOMER**: Regular users who book hotels
2. **HOST**: Property owners who list hotels
3. **ADMIN**: Platform administrators

#### Permission Matrix:

| Feature | CUSTOMER | HOST | ADMIN |
|---------|----------|------|-------|
| Register/Login | ✅ | ✅ | ✅ |
| View own profile | ✅ | ✅ | ✅ |
| Update own profile | ✅ | ✅ | ✅ |
| Delete own account | ✅ | ✅ | ✅ |
| View all users | ❌ | ❌ | ✅ |
| Manage user roles | ❌ | ❌ | ✅ |
| View statistics | ❌ | ❌ | ✅ |

## 🧪 Testing

### Using Bruno

1. **Open Bruno** and navigate to `bruno/auth/` folder
2. **Configure environment** variables in Bruno:
   ```
   base_url: http://localhost:3000
   ```
3. **Run tests** in sequence:
   - 01-register-customer.bru
   - 02-register-host.bru
   - 03-login.bru
   - 04-get-me.bru
   - 05-change-password.bru
   - 06-refresh-token.bru

### Environment Variables for Testing

The Bruno tests automatically save tokens to environment:
- `access_token`: Current access token
- `refresh_token`: Current refresh token
- `user_id`: Current user ID
- `customer_access_token`: Customer specific token
- `host_access_token`: Host specific token

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/inn_horizon"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-this-in-production"
JWT_REFRESH_EXPIRES_IN="30d"

# Bcrypt
BCRYPT_ROUNDS="10"

# Server
PORT="3000"
NODE_ENV="development"

# Frontend (for email links)
FRONTEND_URL="http://localhost:5173"

# Email (TODO: Implement email service)
SMTP_HOST=""
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASS=""
EMAIL_FROM="noreply@innhorizon.com"
```

### Default Values

If environment variables are not set, the system uses these defaults:
- JWT_SECRET: Development-only default (⚠️ Change in production!)
- JWT_EXPIRES_IN: 7 days
- JWT_REFRESH_EXPIRES_IN: 30 days
- BCRYPT_ROUNDS: 10
- PORT: 3000

## 🚀 Running the Application

### Prerequisites
- Bun installed
- PostgreSQL database running
- `.env` file configured

### Installation

```bash
# Install dependencies
bun install

# Generate Prisma client
bunx prisma generate

# Run database migrations
bunx prisma migrate dev

# (Optional) Seed database
bunx prisma db seed
```

### Start Development Server

```bash
bun run dev
```

The server will start at `http://localhost:3000`

### Verify Installation

```bash
# Check health endpoint
curl http://localhost:3000/health

# Check API info
curl http://localhost:3000/
```

## 📊 Database Schema

### User Model

```prisma
model User {
  id         String    @id @default(cuid())
  role       UserRole  @default(CUSTOMER)
  name       String?
  email      String    @unique
  password   String
  phone      String    @unique
  avatar     String?
  isVerified Boolean   @default(false)
  deletedAt  DateTime?
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt

  // Bank info (for host payout)
  bankName      String?
  bankCode      String?
  accountNumber String?
  accountName   String?

  // Wallet
  walletBalance Decimal @default(0) @db.Decimal(16, 2)

  // Relations
  hotels           Hotel[]
  reviews          Review[]
  bookings         Booking[]
  canceledBookings Booking[] @relation("BookingCanceledBy")
  payouts          Payout[]  @relation("HostPayouts")
  processedPayouts Payout[]  @relation("AdminProcessedPayouts")
  ledgerEntries    HostLedger[]
}
```

### User Roles Enum

```prisma
enum UserRole {
  ADMIN
  HOST
  CUSTOMER
}
```

## 🐛 Common Issues & Solutions

### Issue 1: Cannot find Prisma module

**Solution:**
```bash
bunx prisma generate --schema=./prisma/schema.prisma
```

### Issue 2: Database connection error

**Solution:**
- Check if PostgreSQL is running
- Verify `DATABASE_URL` in `.env`
- Ensure database exists

### Issue 3: Token verification fails

**Solution:**
- Check if `JWT_SECRET` is set correctly
- Verify token hasn't expired
- Ensure token format is: `Bearer <token>`

### Issue 4: Email already registered

**Solution:**
- Use a different email address
- Or delete the existing user from database
- Or use the login endpoint instead

## 📈 Future Enhancements (TODO)

### Email System
- [ ] Integrate email service (Resend, SendGrid, etc.)
- [ ] Send verification emails
- [ ] Send password reset emails
- [ ] Email templates

### File Upload
- [ ] Integrate cloud storage (AWS S3, Cloudinary)
- [ ] Avatar image processing (resize, crop)
- [ ] File type validation
- [ ] File size limits

### Security Enhancements
- [ ] Rate limiting per endpoint
- [ ] Token blacklist (for logout)
- [ ] 2FA authentication
- [ ] IP-based blocking
- [ ] Brute force protection

### Monitoring
- [ ] Request logging
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Analytics

## 🎯 Success Criteria

- [x] User can register as CUSTOMER
- [x] User can register as HOST with bank info
- [x] User can login and receive JWT tokens
- [x] User can access protected routes with valid token
- [x] User can update their profile
- [x] User can change password
- [x] Admin can manage users
- [x] Passwords are securely hashed
- [x] Tokens expire correctly
- [x] Role-based access control works
- [x] Soft delete prevents data loss
- [x] All endpoints have proper error handling
- [x] API documentation is complete

## 📚 Related Documentation

- [API Documentation](../API_DOCUMENTATION.md)
- [Database Schema](../prisma/schema.prisma)
- [Environment Setup](../SETUP.md)

## 🔗 Next Steps

After completing Phase 1, proceed to:
- **Phase 2**: Hotel & Room Management
- **Phase 3**: Booking System & Payment Integration

---

**Phase 1 Status**: ✅ **COMPLETED**

**Last Updated**: November 28, 2024