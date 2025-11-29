# Inn Horizon API - Setup Guide

A complete hotel booking REST API built with Elysia.js, Prisma, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh) >= 1.0.0
- PostgreSQL >= 14
- Git

### 1. Install Dependencies

```bash
bun install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/inn_horizon?schema=public"
```

Replace `username`, `password`, and database name with your PostgreSQL credentials.

### 3. Database Setup

```bash
# Generate Prisma Client
bunx prisma generate

# Run migrations
bunx prisma migrate dev --name init

# (Optional) Seed the database with sample data
bun run src/db/seed.ts
```

### 4. Start the Development Server

```bash
bun run dev
```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference.

See [EXAMPLES.md](./EXAMPLES.md) for usage examples.

## 🏗️ Project Structure

```
inn-horizon/
├── src/
│   ├── db/                 # Database configuration
│   │   ├── index.ts        # Prisma client instance
│   │   └── seed.ts         # Database seeding
│   ├── modules/            # API modules
│   │   ├── auth/           # Authentication endpoints
│   │   ├── hotels/         # Hotel management
│   │   ├── rooms/          # Room management
│   │   ├── bookings/       # Booking system
│   │   └── reviews/        # Review system
│   └── index.ts            # Main application entry
├── prisma/
│   └── schema.prisma       # Database schema
├── bruno/                  # API test collection
├── generated/              # Generated Prisma files
├── API_DOCUMENTATION.md    # Complete API docs
├── EXAMPLES.md             # Usage examples
└── package.json
```

## 🔑 Key Features

- **User Management**
  - Multiple user roles (Admin, Host, Customer)
  - Secure password hashing with bcrypt
  - User profile management

- **Hotel Management**
  - CRUD operations for hotels
  - Photo and amenity management
  - Search and filter capabilities
  - Rating and review aggregation

- **Room Management**
  - Multiple room types per hotel
  - Dynamic pricing
  - Real-time availability tracking
  - Photo management

- **Booking System**
  - Date validation and conflict checking
  - Multi-room availability
  - Booking status workflow
  - Guest information management
  - Room snapshots for historical accuracy

- **Review System**
  - Rating and comments
  - Automatic hotel rating calculation
  - Review statistics
  - One review per booking constraint

## 🛠️ Available Scripts

```bash
# Development server with hot reload
bun run dev

# Generate Prisma client
bunx prisma generate

# Run database migrations
bunx prisma migrate dev

# Reset database
bunx prisma migrate reset

# Open Prisma Studio (Database GUI)
bunx prisma studio

# View database schema
bunx prisma db pull
```

## 📊 Database Schema

The application uses the following main models:

- **User** - System users (Admin, Host, Customer)
- **Hotel** - Hotel properties
- **HotelPhoto** - Hotel images
- **HotelAmenity** - Hotel facilities
- **Room** - Hotel rooms
- **RoomPhoto** - Room images
- **RoomDate** - Room availability tracking
- **Booking** - Room reservations
- **Payment** - Payment records
- **Review** - Hotel reviews
- **Payout** - Host payment withdrawals
- **HostLedger** - Financial transaction ledger

## 🔐 Security Notes

**IMPORTANT:** This is a development setup. For production:

1. **Authentication**: Implement JWT tokens or session management
2. **Authorization**: Add middleware to protect routes
3. **Rate Limiting**: Already included with `elysia-rate-limit`
4. **Input Validation**: Type validation is included with Elysia
5. **Environment Variables**: Use secure environment variable management
6. **HTTPS**: Always use HTTPS in production
7. **CORS**: Configure CORS for your frontend domain
8. **API Keys**: Never commit sensitive keys to version control

## 🧪 Testing the API

### Using cURL

```bash
# Health check
curl http://localhost:3000/health

# Register a user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# List hotels
curl http://localhost:3000/api/hotels
```

### Using Bruno

Import the Bruno collection from the `bruno/` directory for a complete set of API tests.

### Using Postman

Import the endpoints from API_DOCUMENTATION.md into Postman or create a new collection.

## 🐛 Troubleshooting

### "Can't reach database server"

1. Ensure PostgreSQL is running:
   ```bash
   # Windows (if using PostgreSQL service)
   net start postgresql-x64-14
   
   # Linux/Mac
   sudo systemctl start postgresql
   ```

2. Verify DATABASE_URL in `.env` is correct

3. Check if database exists:
   ```bash
   bunx prisma db push
   ```

### "Module not found" errors

```bash
# Regenerate Prisma client
bunx prisma generate

# Reinstall dependencies
rm -rf node_modules bun.lockb
bun install
```

### Port 3000 already in use

Change the port in `src/index.ts`:
```typescript
.listen(3001) // or any other available port
```

### Type errors in modules

If you encounter TypeScript errors after schema changes:

```bash
# Regenerate Prisma client
bunx prisma generate

# Restart the development server
bun run dev
```

## 📈 Next Steps

After setup, consider implementing:

1. **JWT Authentication**
   - Install `@elysiajs/jwt`
   - Add authentication middleware
   - Protect sensitive routes

2. **File Upload**
   - Implement image upload for hotel/room photos
   - Use cloud storage (AWS S3, Cloudinary, etc.)

3. **Email Notifications**
   - Send booking confirmations
   - Password reset emails
   - Booking reminders

4. **Payment Integration**
   - Integrate Midtrans or Stripe
   - Handle webhooks
   - Process refunds

5. **Search Enhancement**
   - Add full-text search
   - Implement filters (price range, amenities, etc.)
   - Add sorting options

6. **Admin Dashboard**
   - Create admin-only routes
   - Add analytics endpoints
   - System monitoring

7. **Real-time Features**
   - WebSocket for booking notifications
   - Live availability updates
   - Chat support

## 🤝 Development Workflow

### Adding a New Feature

1. Update Prisma schema if database changes needed
2. Run migration: `bunx prisma migrate dev --name feature_name`
3. Create new module in `src/modules/`
4. Add routes to `src/index.ts`
5. Update API documentation
6. Test endpoints

### Database Changes

```bash
# After modifying schema.prisma
bunx prisma migrate dev --name descriptive_name

# Generate new Prisma client
bunx prisma generate
```

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `PORT` | Server port (optional) | `3000` |
| `NODE_ENV` | Environment | `development` or `production` |

## 🎯 API Endpoints Overview

- **`/health`** - Health check
- **`/api/auth/*`** - Authentication (register, login, profile)
- **`/api/hotels/*`** - Hotel management (CRUD, photos, amenities)
- **`/api/rooms/*`** - Room management (CRUD, availability)
- **`/api/bookings/*`** - Booking system (create, update status, delete)
- **`/api/reviews/*`** - Review system (CRUD, statistics)

## 💡 Tips

- Use Prisma Studio (`bunx prisma studio`) to view and edit data visually
- Check `generated/prismabox/` for TypeBox schemas generated by Prismabox
- Review `bruno/` folder for example API calls
- Enable logging by uncommenting the logger in `src/index.ts`
- Use `deletedAt` timestamps instead of hard deletes for data integrity

## 📖 Resources

- [Elysia.js Documentation](https://elysiajs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Bun Documentation](https://bun.sh/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🐞 Common Issues

### Prisma Client Not Generated

Run `bunx prisma generate` after any schema changes.

### Database Migration Conflicts

Reset migrations if needed:
```bash
bunx prisma migrate reset
```

**Warning:** This will delete all data!

### Type Errors After Schema Update

1. Delete `node_modules` and `generated` folders
2. Run `bun install`
3. Run `bunx prisma generate`
4. Restart dev server

## 🚀 Deployment

### Preparing for Production

1. Set `NODE_ENV=production`
2. Use production database URL
3. Run migrations on production DB
4. Build for production (if needed)
5. Set up process manager (PM2, systemd)
6. Configure reverse proxy (nginx, Caddy)
7. Enable HTTPS
8. Set up monitoring and logging

### Quick Deploy Commands

```bash
# Install dependencies
bun install --production

# Run migrations
bunx prisma migrate deploy

# Start server
bun src/index.ts
```

## 📞 Support

For questions or issues:
- Check API_DOCUMENTATION.md
- Review EXAMPLES.md
- Open an issue in the repository

---

**Happy Coding! 🎉**