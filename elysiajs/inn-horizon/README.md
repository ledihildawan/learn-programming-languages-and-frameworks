# 🏨 Inn Horizon API

## Proyek
Inn Horizon adalah platform pemesanan hotel komprehensif yang dirancang untuk mendukung manajemen inventaris, transaksi *real-time*, dan fitur globalisasi dengan fokus pada **integritas finansial** dan **akuntabilitas (audit)**.

## 📊 Development Status

### ✅ Phase 1: Authentication & User Management (COMPLETE)
- User registration and login
- JWT-based authentication
- Role-based access control (ADMIN, HOST, CUSTOMER)
- User profile management
- Admin user management

### ✅ Phase 2: Hotel & Room Management (COMPLETE)
- Hotel CRUD operations with smart slug generation
- Room CRUD operations with inventory management
- Photo galleries (hotel & room)
- Amenity management
- Real-time availability checking
- Advanced search and filtering
- Owner-based authorization
- 41 API endpoints delivered

### ✅ Phase 3: Booking & Payment System (COMPLETE)
- Complete booking lifecycle management (PENDING → PAID → CONFIRMED → CHECKED_IN → CHECKED_OUT → COMPLETED)
- Room availability checking with date-range validation
- Booking cancellation with refund support
- Midtrans payment gateway integration
- Multiple payment methods (Credit Card, Bank Transfer, E-wallet, QRIS)
- Webhook notifications for real-time payment updates
- Host wallet and ledger system
- Platform fee calculation (10%)
- Payment status tracking and management
- 30+ new API endpoints

### 🚧 Phase 4: Review & Advanced Features (PENDING)
- Review and rating system
- Email/SMS notifications
- Advanced analytics and reporting

## ✨ Fitur Utama yang Didukung

### 1. Sistem Pengguna & Otoritas (1:M Model)
* **Peran Kunci:** Semua pengguna memiliki satu peran tunggal (`users.role`) yang ditentukan ('ADMIN', 'HOST', atau 'CUSTOMER').
* **Akses Terstruktur:** Otoritas dikontrol ketat melalui JWT dan role-based middleware, memastikan setiap pengguna hanya mengakses data sesuai perannya.

### 2. Hotel & Room Management
* **Smart Slug System:** Automatic URL-friendly slug generation with uniqueness guarantee.
* **Inventory Management:** Multiple rooms per hotel with real-time availability tracking.
* **Photo Galleries:** Multiple photos with customizable ordering for hotels and rooms.
* **Amenity Management:** Flexible amenity system with icons.
* **Availability Engine:** Prevents double booking with date-range validation.

### 3. Booking & Payment System
* **Complete Booking Lifecycle:** From creation to completion with status tracking.
* **Midtrans Integration:** Secure payment processing with multiple payment methods.
* **Automatic Updates:** Real-time payment status via webhooks.
* **Financial Tracking:** Host wallet, ledger system, and platform fee management.
* **Cancellation Policy:** Configurable cancellation rules with automatic refunds.
* **Booking Expiration:** Automatic expiration for unpaid bookings.

### 4. Audit & Keamanan (Enterprise Grade)
* **JWT Authentication:** Secure token-based authentication with role verification.
* **Owner-based Authorization:** Hotel/room owners have exclusive modification rights.
* **Soft Delete:** Penggunaan `deleted_at` di entitas utama untuk menjaga integritas transaksi lama.
* **Input Validation:** Type-safe validation with Elysia schemas.

### 4. Search & Filtering
* **Full-text Search:** Search hotels by name, city, address, or description.
* **Advanced Filters:** Filter by city, province, rating, price, capacity.
* **Pagination:** Efficient pagination for large datasets.
* **Sorting:** Sort by multiple criteria (name, rating, price, date).

## 🏗️ Struktur Database Kunci (Final)

Database menggunakan relasi **One-to-Many (1:M)** untuk peran pengguna dan pola **Many-to-Many (M:M)** untuk aset (Amenity, Tax, Policy).

| Kelompok Tabel      | Contoh Relasi Kunci                                                | Peran                                                     |
| :------------------ | :----------------------------------------------------------------- | :-------------------------------------------------------- |
| **Audit & Log**     | `system_logs.user_id`, `notifications.user_id`                     | Melacak siapa melakukan apa.                              |
| **Inventaris**      | `rooms.hotel_id`, `room_availability.room_id`                      | Menentukan ketersediaan dan harga per hari.               |
| **Finansial/Legal** | `bookings.status_id`, `hotel_taxes`, `hotel_cancellation_policies` | Mengelola harga, status, dan ketentuan pengembalian dana. |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun 1.0+
- PostgreSQL 14+
- Prisma CLI

### Installation

```bash
# Install dependencies
bun install

# Setup environment variables
cp .env.example .env

# Run database migrations
bun run prisma:migrate

# Start development server
bun run dev
```

### Server Endpoints

```
http://localhost:3000              - API root (endpoint list)
http://localhost:3000/health       - Health check
http://localhost:3000/api/auth     - Authentication endpoints
http://localhost:3000/api/users    - User management endpoints
http://localhost:3000/api/hotels   - Hotel management endpoints (41 endpoints)
http://localhost:3000/api/rooms    - Room management endpoints
```

## 📚 Documentation

- **[Phase 2: Hotels & Rooms API](docs/PHASE_2_HOTELS_ROOMS.md)** - Complete API documentation
- **[Phase 2 Summary](PHASE_2_SUMMARY.md)** - Implementation summary
- **[API Examples](EXAMPLES.md)** - Usage examples
- **[Setup Guide](SETUP.md)** - Setup instructions

## 📦 Project Structure

```
inn-horizon/
├── src/
│   ├── modules/
│   │   ├── auth/          # Authentication module
│   │   ├── users/         # User management module
│   │   ├── hotels/        # Hotel management module (Phase 2)
│   │   └── rooms/         # Room management module (Phase 2)
│   ├── middlewares/       # Auth & role-based middlewares
│   ├── config/           # Configuration files
│   ├── lib/              # Prisma client & utilities
│   └── index.ts          # Main application
├── prisma/
│   └── schema.prisma     # Database schema
├── docs/                 # Documentation files
└── bruno/               # API testing collections
```

## 🔑 API Authentication

Most endpoints require JWT authentication:

```bash
# Include in request headers:
Authorization: Bearer <your-jwt-token>
```

### Get Token
```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","name":"John Doe","phone":"+628123456789","role":"HOST"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

## 🏨 Hotel Management Examples

### Create Hotel
```bash
curl -X POST http://localhost:3000/api/hotels \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Grand Hotel Jakarta",
    "address": "Jl. Sudirman No. 123",
    "city": "Jakarta",
    "province": "DKI Jakarta",
    "description": "Luxury hotel in the heart of Jakarta"
  }'
```

### Search Hotels
```bash
curl "http://localhost:3000/api/hotels?city=Jakarta&minRating=4&page=1&limit=10"
```

### Check Room Availability
```bash
curl "http://localhost:3000/api/rooms/ROOM_ID/availability?checkIn=2024-12-20&checkOut=2024-12-23&guests=2"
```

## 🛠️ Tech Stack

- **Runtime:** Bun
- **Framework:** ElysiaJS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT
- **Validation:** Elysia Type System
- **Language:** TypeScript

## ⚠️ Panduan Pengembangan Lanjut

1.  **Otorisasi:** Ownership verification implemented for all hotel/room modifications.
2.  **Validation:** Type-safe validation using Elysia schemas on all inputs.
3.  **Soft Delete:** All deletions preserve data with `deletedAt` timestamp.
4.  **Availability:** Real-time checking prevents double booking.