# Inn Horizon API 🏨

A comprehensive hotel booking REST API built with **Elysia.js**, **Prisma**, and **PostgreSQL**.

## 🌟 Overview

Inn Horizon is a complete backend solution for hotel booking systems with user management, hotel listings, room reservations, and review functionality.

## ✨ Features

- 🔐 **User Authentication** - Register, login, and profile management
- 🏨 **Hotel Management** - CRUD operations with photos and amenities
- 🛏️ **Room Management** - Multiple room types with dynamic availability
- 📅 **Booking System** - Real-time availability checking and reservation management
- ⭐ **Review System** - Rating and comments with automatic aggregation
- 💰 **Financial Tracking** - Host ledger and payout management
- 🔒 **Type-Safe** - Full TypeScript support with Prisma
- 🚀 **Fast** - Built on Bun runtime for maximum performance

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Setup database
bunx prisma generate
bunx prisma migrate dev

# Start server
bun run dev
```

Server runs at: `http://localhost:3000`

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me/:userId` - Get user profile

### Hotels
- `GET /api/hotels` - List hotels (with filters)
- `GET /api/hotels/:id` - Get hotel details
- `POST /api/hotels` - Create hotel (HOST only)
- `PATCH /api/hotels/:id` - Update hotel
- `DELETE /api/hotels/:id` - Delete hotel
- `POST /api/hotels/:id/photos` - Add photo
- `POST /api/hotels/:id/amenities` - Add amenity

### Rooms
- `GET /api/rooms` - List rooms
- `GET /api/rooms/:id` - Get room details
- `GET /api/rooms/:id/availability` - Check availability
- `POST /api/rooms` - Create room
- `PATCH /api/rooms/:id` - Update room
- `DELETE /api/rooms/:id` - Delete room
- `POST /api/rooms/:id/photos` - Add photo

### Bookings
- `GET /api/bookings` - List bookings
- `GET /api/bookings/:id` - Get booking details
- `POST /api/bookings` - Create booking
- `PATCH /api/bookings/:id/status` - Update status
- `DELETE /api/bookings/:id` - Delete booking

### Reviews
- `GET /api/reviews` - List reviews
- `GET /api/reviews/:id` - Get review details
- `GET /api/reviews/hotel/:hotelId/stats` - Get hotel statistics
- `POST /api/reviews` - Create review
- `PATCH /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

## 📝 Example Usage

### Register a User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe",
    "role": "CUSTOMER"
  }'
```

### Create a Hotel (HOST)

```bash
curl -X POST http://localhost:3000/api/hotels \
  -H "Content-Type: application/json" \
  -d '{
    "ownerId": "user-id-here",
    "name": "Grand Hotel",
    "address": "123 Main St",
    "city": "New York",
    "description": "Luxury hotel",
    "amenities": ["WiFi", "Pool", "Gym"]
  }'
```

### Search Hotels

```bash
# All hotels
curl http://localhost:3000/api/hotels

# Filter by city
curl http://localhost:3000/api/hotels?city=Miami

# Search
curl http://localhost:3000/api/hotels?search=luxury
```

### Create a Booking

```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "customer-id",
    "roomId": "room-id",
    "checkIn": "2024-03-01",
    "checkOut": "2024-03-05",
    "guests": 2,
    "guestName": "John Doe",
    "guestPhone": "+1234567890"
  }'
```

### Leave a Review

```bash
curl -X POST http://localhost:3000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "customer-id",
    "hotelId": "hotel-id",
    "bookingId": "booking-id",
    "rating": 5,
    "comment": "Excellent stay!"
  }'
```

## 🏗️ Tech Stack

- **Runtime**: [Bun](https://bun.sh) - Fast JavaScript runtime
- **Framework**: [Elysia.js](https://elysiajs.com) - Fast & type-safe web framework
- **Database**: [PostgreSQL](https://www.postgresql.org) - Robust relational database
- **ORM**: [Prisma](https://www.prisma.io) - Next-generation TypeScript ORM
- **Validation**: TypeBox - JSON Schema Type Builder
- **Authentication**: bcryptjs - Password hashing

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Detailed setup instructions
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference
- **[EXAMPLES.md](./EXAMPLES.md)** - Usage examples and workflows

## 🔑 User Roles

- **ADMIN** - Full system access
- **HOST** - Create and manage hotels and rooms
- **CUSTOMER** - Book rooms and leave reviews

## 📊 Booking Statuses

`PENDING` → `PAID` → `CONFIRMED` → `CHECKED_IN` → `CHECKED_OUT` → `COMPLETED`

Also supports: `CANCELLED`, `REFUNDED`

## 🛠️ Development Commands

```bash
# Start development server with watch mode
bun run dev

# Generate Prisma client
bunx prisma generate

# Run database migrations
bunx prisma migrate dev

# Open Prisma Studio (DB GUI)
bunx prisma studio

# Reset database
bunx prisma migrate reset
```

## 🗃️ Database Models

- **User** - System users with roles
- **Hotel** - Hotel properties
- **HotelPhoto** - Hotel images
- **HotelAmenity** - Facilities (WiFi, Pool, etc.)
- **Room** - Hotel rooms with pricing
- **RoomPhoto** - Room images
- **RoomDate** - Daily availability tracking
- **Booking** - Reservations with guest info
- **Payment** - Payment records
- **Review** - Hotel reviews and ratings
- **Payout** - Host withdrawals
- **HostLedger** - Financial transactions

## 🔐 Environment Variables

Create `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/inn_horizon"
```

## ⚠️ Important Notes

- Room availability is tracked per date
- Reviews require completed bookings
- Hotels can only be created by HOSTs
- One review per booking maximum
- Booking dates are validated automatically
- Room snapshots preserve historical data

## 🧪 Testing

```bash
# Health check
curl http://localhost:3000/health

# API root
curl http://localhost:3000
```

Expected response:
```json
{
  "message": "Welcome to Inn Horizon API",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "hotels": "/api/hotels",
    "rooms": "/api/rooms",
    "bookings": "/api/bookings",
    "reviews": "/api/reviews"
  }
}
```

## 🚀 Production Checklist

- [ ] Use environment variables for sensitive data
- [ ] Implement JWT authentication
- [ ] Add rate limiting (already included)
- [ ] Enable CORS for frontend
- [ ] Set up HTTPS
- [ ] Configure logging
- [ ] Add monitoring
- [ ] Set up backups
- [ ] Run security audit
- [ ] Load testing

## 📖 Key Features Detail

### Smart Availability System
- Tracks room availability per date
- Prevents double-booking
- Supports multiple rooms of same type
- Automatic availability updates on booking/cancellation

### Review Aggregation
- Automatic hotel rating calculation
- Rating distribution statistics
- One review per booking constraint
- Reviews only after checkout/completion

### Financial Tracking
- Host ledger for all transactions
- Payout management system
- Booking income tracking
- Refund deductions

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Update documentation
5. Test thoroughly
6. Submit pull request

## 📞 Support

- Check documentation files for detailed info
- Review examples for common use cases
- Open issues for bugs or feature requests

## 📄 License

This project is for educational purposes.

---

**Built with ❤️ using Elysia.js and Prisma**

🔗 **Links:**
- [Elysia.js Docs](https://elysiajs.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [Bun Docs](https://bun.sh/docs)

**Version:** 1.0.0