# Inn Horizon API Documentation

A comprehensive REST API for hotel booking system built with Elysia.js and Prisma.

## Table of Contents

- [Getting Started](#getting-started)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Auth](#auth)
  - [Hotels](#hotels)
  - [Rooms](#rooms)
  - [Bookings](#bookings)
  - [Reviews](#reviews)
- [Error Handling](#error-handling)
- [Data Models](#data-models)

## Getting Started

### Prerequisites

- Bun runtime installed
- PostgreSQL database
- Node.js (for compatibility)

### Installation

```bash
# Install dependencies
bun install

# Setup environment variables
cp .env.example .env

# Run database migrations
bunx prisma migrate dev

# Seed database (optional)
bun run src/db/seed.ts

# Start development server
bun run dev
```

### Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/inn_horizon"
```

## Base URL

```
http://localhost:3000/api
```

## API Endpoints

### Health Check

#### GET `/health`

Check if the API is running.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## Auth

### Register User

#### POST `/api/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "CUSTOMER"
}
```

**Parameters:**
- `email` (string, required): Valid email address
- `password` (string, required): Minimum 6 characters
- `name` (string, required): Minimum 2 characters
- `role` (string, optional): One of `ADMIN`, `HOST`, `CUSTOMER` (default: `CUSTOMER`)

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "clx1234567890",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "CUSTOMER",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Login

#### POST `/api/auth/login`

Login to an existing account.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "clx1234567890",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "CUSTOMER",
    "phone": "+1234567890",
    "avatar": "https://example.com/avatar.jpg",
    "isVerified": false
  }
}
```

### Get User Profile

#### GET `/api/auth/me/:userId`

Get user profile information.

**Response (200):**
```json
{
  "user": {
    "id": "clx1234567890",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "CUSTOMER",
    "phone": "+1234567890",
    "avatar": "https://example.com/avatar.jpg",
    "isVerified": false,
    "walletBalance": "1500.00",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## Hotels

### List Hotels

#### GET `/api/hotels`

Get a paginated list of hotels.

**Query Parameters:**
- `city` (string, optional): Filter by city name
- `province` (string, optional): Filter by province
- `search` (string, optional): Search in name, description, and address
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10)

**Response (200):**
```json
{
  "hotels": [
    {
      "id": "uuid-1234",
      "name": "Grand Hotel",
      "slug": "grand-hotel",
      "city": "New York",
      "province": "NY",
      "address": "123 Main Street",
      "description": "Luxury hotel in the heart of the city",
      "coverPhoto": "https://example.com/photo.jpg",
      "avgRating": 4.5,
      "totalReview": 120,
      "isActive": true,
      "photos": [
        {
          "id": "photo-1",
          "url": "https://example.com/cover.jpg",
          "isCover": true
        }
      ],
      "amenities": [
        {
          "id": "amenity-1",
          "name": "WiFi"
        },
        {
          "id": "amenity-2",
          "name": "Pool"
        }
      ],
      "_count": {
        "rooms": 25,
        "reviews": 120
      }
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

### Get Hotel by ID

#### GET `/api/hotels/:id`

Get detailed information about a specific hotel.

**Response (200):**
```json
{
  "hotel": {
    "id": "uuid-1234",
    "name": "Grand Hotel",
    "slug": "grand-hotel",
    "city": "New York",
    "province": "NY",
    "address": "123 Main Street",
    "description": "Luxury hotel in the heart of the city",
    "coverPhoto": "https://example.com/photo.jpg",
    "avgRating": 4.5,
    "totalReview": 120,
    "owner": {
      "id": "user-123",
      "name": "Hotel Owner",
      "email": "owner@example.com",
      "phone": "+1234567890",
      "avatar": "https://example.com/avatar.jpg"
    },
    "photos": [...],
    "amenities": [...],
    "rooms": [...],
    "reviews": [...]
  }
}
```

### Create Hotel

#### POST `/api/hotels`

Create a new hotel. User must have HOST or ADMIN role.

**Request Body:**
```json
{
  "ownerId": "user-123",
  "name": "Grand Hotel",
  "address": "123 Main Street",
  "city": "New York",
  "province": "NY",
  "description": "Luxury hotel in the heart of the city",
  "coverPhoto": "https://example.com/photo.jpg",
  "amenities": ["WiFi", "Pool", "Parking"]
}
```

**Response (201):**
```json
{
  "message": "Hotel created successfully",
  "hotel": {
    "id": "uuid-1234",
    "name": "Grand Hotel",
    "slug": "grand-hotel",
    ...
  }
}
```

### Update Hotel

#### PATCH `/api/hotels/:id`

Update hotel information.

**Request Body:**
```json
{
  "name": "Grand Hotel Updated",
  "description": "New description",
  "isActive": true
}
```

**Response (200):**
```json
{
  "message": "Hotel updated successfully",
  "hotel": {...}
}
```

### Delete Hotel

#### DELETE `/api/hotels/:id`

Soft delete a hotel.

**Response (200):**
```json
{
  "message": "Hotel deleted successfully"
}
```

### Add Hotel Photo

#### POST `/api/hotels/:id/photos`

Add a photo to a hotel.

**Request Body:**
```json
{
  "url": "https://example.com/photo.jpg",
  "isCover": false
}
```

**Response (200):**
```json
{
  "message": "Photo added successfully",
  "photo": {
    "id": "photo-123",
    "url": "https://example.com/photo.jpg",
    "isCover": false
  }
}
```

### Add Hotel Amenity

#### POST `/api/hotels/:id/amenities`

Add an amenity to a hotel.

**Request Body:**
```json
{
  "name": "Gym"
}
```

**Response (200):**
```json
{
  "message": "Amenity added successfully",
  "amenity": {
    "id": "amenity-123",
    "name": "Gym"
  }
}
```

---

## Rooms

### List Rooms

#### GET `/api/rooms`

Get a paginated list of rooms.

**Query Parameters:**
- `hotelId` (string, optional): Filter by hotel ID
- `minPrice` (number, optional): Minimum price filter
- `maxPrice` (number, optional): Maximum price filter
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10)

**Response (200):**
```json
{
  "rooms": [
    {
      "id": "room-123",
      "name": "Deluxe Room",
      "type": "Deluxe",
      "maxGuests": 2,
      "totalRooms": 5,
      "size": 35,
      "bedType": "King",
      "price": "150.00",
      "photos": [...],
      "hotel": {
        "id": "hotel-123",
        "name": "Grand Hotel",
        "city": "New York",
        "province": "NY",
        "avgRating": 4.5
      }
    }
  ],
  "pagination": {...}
}
```

### Get Room by ID

#### GET `/api/rooms/:id`

Get detailed information about a specific room.

**Response (200):**
```json
{
  "room": {
    "id": "room-123",
    "name": "Deluxe Room",
    "type": "Deluxe",
    "maxGuests": 2,
    "totalRooms": 5,
    "size": 35,
    "bedType": "King",
    "price": "150.00",
    "photos": [...],
    "hotel": {...}
  }
}
```

### Check Room Availability

#### GET `/api/rooms/:id/availability`

Check room availability for a date range.

**Query Parameters:**
- `startDate` (string, required): Start date (YYYY-MM-DD)
- `endDate` (string, required): End date (YYYY-MM-DD)

**Response (200):**
```json
{
  "roomId": "room-123",
  "totalRooms": 5,
  "availability": [
    {
      "date": "2024-01-15T00:00:00.000Z",
      "available": 3,
      "booked": 2,
      "totalRooms": 5,
      "isAvailable": true
    },
    {
      "date": "2024-01-16T00:00:00.000Z",
      "available": 0,
      "booked": 5,
      "totalRooms": 5,
      "isAvailable": false
    }
  ]
}
```

### Create Room

#### POST `/api/rooms`

Create a new room for a hotel.

**Request Body:**
```json
{
  "hotelId": "hotel-123",
  "name": "Deluxe Room",
  "type": "Deluxe",
  "maxGuests": 2,
  "totalRooms": 5,
  "size": 35,
  "bedType": "King",
  "price": 150.00,
  "photos": ["https://example.com/room1.jpg", "https://example.com/room2.jpg"]
}
```

**Response (201):**
```json
{
  "message": "Room created successfully",
  "room": {...}
}
```

### Update Room

#### PATCH `/api/rooms/:id`

Update room information.

**Request Body:**
```json
{
  "price": 175.00,
  "totalRooms": 6
}
```

**Response (200):**
```json
{
  "message": "Room updated successfully",
  "room": {...}
}
```

### Delete Room

#### DELETE `/api/rooms/:id`

Soft delete a room.

**Response (200):**
```json
{
  "message": "Room deleted successfully"
}
```

### Add Room Photo

#### POST `/api/rooms/:id/photos`

Add a photo to a room.

**Request Body:**
```json
{
  "url": "https://example.com/room-photo.jpg"
}
```

**Response (200):**
```json
{
  "message": "Photo added successfully",
  "photo": {...}
}
```

---

## Bookings

### List Bookings

#### GET `/api/bookings`

Get a paginated list of bookings.

**Query Parameters:**
- `userId` (string, optional): Filter by user ID
- `status` (string, optional): Filter by booking status
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10)

**Response (200):**
```json
{
  "bookings": [
    {
      "id": "booking-123",
      "userId": "user-123",
      "roomId": "room-123",
      "checkIn": "2024-01-20T00:00:00.000Z",
      "checkOut": "2024-01-23T00:00:00.000Z",
      "nights": 3,
      "guests": 2,
      "totalPrice": "450.00",
      "status": "CONFIRMED",
      "guestName": "John Doe",
      "guestPhone": "+1234567890",
      "guestEmail": "john@example.com",
      "room": {
        "hotel": {
          "name": "Grand Hotel",
          "city": "New York"
        }
      },
      "user": {...},
      "payment": {...}
    }
  ],
  "pagination": {...}
}
```

### Get Booking by ID

#### GET `/api/bookings/:id`

Get detailed information about a specific booking.

**Response (200):**
```json
{
  "booking": {
    "id": "booking-123",
    "userId": "user-123",
    "roomId": "room-123",
    "checkIn": "2024-01-20T00:00:00.000Z",
    "checkOut": "2024-01-23T00:00:00.000Z",
    "nights": 3,
    "guests": 2,
    "totalPrice": "450.00",
    "status": "CONFIRMED",
    "guestName": "John Doe",
    "guestPhone": "+1234567890",
    "guestEmail": "john@example.com",
    "roomSnapshot": {...},
    "room": {...},
    "user": {...},
    "payment": {...},
    "review": {...}
  }
}
```

### Create Booking

#### POST `/api/bookings`

Create a new booking.

**Request Body:**
```json
{
  "userId": "user-123",
  "roomId": "room-123",
  "checkIn": "2024-01-20",
  "checkOut": "2024-01-23",
  "guests": 2,
  "guestName": "John Doe",
  "guestPhone": "+1234567890",
  "guestEmail": "john@example.com"
}
```

**Validation:**
- Check-in date must not be in the past
- Check-out date must be after check-in date
- Room must be available for all dates in the range
- Number of guests must not exceed room capacity

**Response (201):**
```json
{
  "message": "Booking created successfully",
  "booking": {
    "id": "booking-123",
    "nights": 3,
    "totalPrice": "450.00",
    "status": "PENDING",
    ...
  }
}
```

### Update Booking Status

#### PATCH `/api/bookings/:id/status`

Update the status of a booking.

**Request Body:**
```json
{
  "status": "CONFIRMED"
}
```

**Available Statuses:**
- `PENDING`
- `PAID`
- `CONFIRMED`
- `CHECKED_IN`
- `CHECKED_OUT`
- `COMPLETED`
- `CANCELLED`
- `REFUNDED`

**Response (200):**
```json
{
  "message": "Booking status updated successfully",
  "booking": {...}
}
```

**Note:** When a booking is cancelled, room availability is automatically restored.

### Delete Booking

#### DELETE `/api/bookings/:id`

Delete a booking (only allowed for PENDING bookings).

**Response (200):**
```json
{
  "message": "Booking deleted successfully"
}
```

---

## Reviews

### List Reviews

#### GET `/api/reviews`

Get a paginated list of reviews.

**Query Parameters:**
- `hotelId` (string, optional): Filter by hotel ID
- `userId` (string, optional): Filter by user ID
- `minRating` (number, optional): Minimum rating filter (1-5)
- `maxRating` (number, optional): Maximum rating filter (1-5)
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10)

**Response (200):**
```json
{
  "reviews": [
    {
      "id": "review-123",
      "hotelId": "hotel-123",
      "userId": "user-123",
      "bookingId": "booking-123",
      "rating": 5,
      "comment": "Excellent stay! Highly recommended.",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "user": {
        "id": "user-123",
        "name": "John Doe",
        "avatar": "https://example.com/avatar.jpg"
      },
      "hotel": {
        "id": "hotel-123",
        "name": "Grand Hotel",
        "city": "New York",
        "coverPhoto": "https://example.com/hotel.jpg"
      },
      "booking": {...}
    }
  ],
  "pagination": {...}
}
```

### Get Review by ID

#### GET `/api/reviews/:id`

Get detailed information about a specific review.

**Response (200):**
```json
{
  "review": {
    "id": "review-123",
    "rating": 5,
    "comment": "Excellent stay! Highly recommended.",
    "user": {...},
    "hotel": {...},
    "booking": {...}
  }
}
```

### Create Review

#### POST `/api/reviews`

Create a new review for a hotel after completing a booking.

**Request Body:**
```json
{
  "userId": "user-123",
  "hotelId": "hotel-123",
  "bookingId": "booking-123",
  "rating": 5,
  "comment": "Excellent stay! Highly recommended."
}
```

**Validation:**
- User must have completed or checked out from the booking
- Booking must belong to the user
- Booking must be for the specified hotel
- One review per booking only

**Response (201):**
```json
{
  "message": "Review created successfully",
  "review": {...}
}
```

**Note:** Hotel's average rating and total review count are automatically updated.

### Update Review

#### PATCH `/api/reviews/:id`

Update an existing review.

**Request Body:**
```json
{
  "rating": 4,
  "comment": "Updated review comment"
}
```

**Response (200):**
```json
{
  "message": "Review updated successfully",
  "review": {...}
}
```

### Delete Review

#### DELETE `/api/reviews/:id`

Delete a review.

**Response (200):**
```json
{
  "message": "Review deleted successfully"
}
```

**Note:** Hotel's average rating and total review count are automatically recalculated.

### Get Hotel Review Statistics

#### GET `/api/reviews/hotel/:hotelId/stats`

Get statistical information about a hotel's reviews.

**Response (200):**
```json
{
  "hotelId": "hotel-123",
  "totalReviews": 120,
  "avgRating": 4.5,
  "ratingDistribution": {
    "5": 80,
    "4": 25,
    "3": 10,
    "2": 3,
    "1": 2
  }
}
```

---

## Error Handling

All errors follow a consistent format:

### Error Response Format

```json
{
  "error": "Error message",
  "details": "Additional error details (optional)"
}
```

### HTTP Status Codes

- `200 OK` - Request succeeded
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request parameters or validation error
- `401 Unauthorized` - Authentication required or failed
- `403 Forbidden` - User doesn't have permission
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

### Common Error Examples

**Validation Error (400):**
```json
{
  "error": "Validation error",
  "details": "Email must be a valid email address"
}
```

**Not Found (404):**
```json
{
  "error": "Hotel not found"
}
```

**Forbidden (403):**
```json
{
  "error": "User must be a HOST to create a hotel"
}
```

---

## Data Models

### User Roles

- `ADMIN` - Full system access
- `HOST` - Can create and manage hotels
- `CUSTOMER` - Can book rooms and leave reviews

### Booking Statuses

- `PENDING` - Booking created, awaiting payment
- `PAID` - Payment received
- `CONFIRMED` - Booking confirmed by hotel
- `CHECKED_IN` - Guest has checked in
- `CHECKED_OUT` - Guest has checked out
- `COMPLETED` - Booking completed
- `CANCELLED` - Booking cancelled
- `REFUNDED` - Payment refunded

### Payment Providers

- `MIDTRANS` - Midtrans payment gateway
- `MANUAL` - Manual payment (bank transfer, etc.)

### Payment Statuses

- `PENDING` - Payment pending
- `SETTLED` - Payment successful
- `FAILED` - Payment failed
- `EXPIRED` - Payment expired
- `REFUNDED` - Payment refunded

---

## Best Practices

1. **Always validate dates** before creating bookings
2. **Check room availability** before confirming bookings
3. **Use soft deletes** to maintain data integrity
4. **Update hotel ratings** after review operations
5. **Handle concurrent bookings** to prevent double-booking
6. **Store room snapshots** in bookings for historical accuracy

---

## Testing

Use the Bruno collection in the `bruno` folder for API testing, or use curl:

```bash
# Register a user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# List hotels
curl http://localhost:3000/api/hotels?city=New%20York

# Create a booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "userId":"user-123",
    "roomId":"room-123",
    "checkIn":"2024-01-20",
    "checkOut":"2024-01-23",
    "guests":2,
    "guestName":"John Doe",
    "guestPhone":"+1234567890"
  }'
```

---

## Rate Limiting

The API implements rate limiting to prevent abuse. Default limits:

- 100 requests per minute per IP
- Adjustable per endpoint

---

## Support

For issues or questions, please contact the development team or open an issue in the repository.

---

**Version:** 1.0.0  
**Last Updated:** 2024-01-15