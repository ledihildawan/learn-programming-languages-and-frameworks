# Phase 2: Hotel & Room Management - Implementation Guide

## 📋 Overview

Phase 2 implements comprehensive hotel and room management functionality for the Inn Horizon API. This phase includes hotel CRUD operations, room management, photo galleries, amenities, and real-time availability checking.

## 🏗️ Architecture

### Modules Structure
```
src/modules/
├── hotels/
│   ├── hotel.schema.ts      # Validation schemas
│   ├── hotel.service.ts     # Business logic
│   └── index.ts             # Routes
└── rooms/
    ├── room.schema.ts       # Validation schemas
    ├── room.service.ts      # Business logic
    └── index.ts             # Routes
```

## 🏨 Hotel Management API

### Hotel Endpoints

#### 1. Get All Hotels (Public)
```http
GET /api/hotels
```

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10, max: 100)
- `search` (string, optional): Search by name, city, address, or description
- `city` (string, optional): Filter by city
- `province` (string, optional): Filter by province
- `minRating` (number, optional): Minimum rating filter (0-5)
- `isActive` (boolean, optional): Filter active/inactive hotels
- `ownerId` (string, optional): Filter by owner ID
- `sortBy` (string, optional): Sort field (name, avgRating, createdAt, totalReview)
- `sortOrder` (string, optional): Sort order (asc, desc)

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/hotels?city=Jakarta&minRating=4&page=1&limit=10"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "hotels": [
      {
        "id": "uuid",
        "name": "Grand Hotel Jakarta",
        "slug": "grand-hotel-jakarta",
        "address": "Jl. Sudirman No. 123",
        "city": "Jakarta",
        "province": "DKI Jakarta",
        "latitude": -6.2088,
        "longitude": 106.8456,
        "description": "Luxury hotel in the heart of Jakarta",
        "coverPhoto": "https://example.com/cover.jpg",
        "checkInTime": "14:00",
        "checkOutTime": "12:00",
        "cancellationHours": 24,
        "isActive": true,
        "avgRating": 4.5,
        "totalReview": 120,
        "minPrice": "500000",
        "owner": {
          "id": "user-id",
          "name": "John Doe",
          "email": "john@example.com",
          "phone": "+628123456789"
        },
        "photos": [...],
        "amenities": [...],
        "_count": {
          "rooms": 10,
          "reviews": 120
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5
    }
  }
}
```

#### 2. Get Hotel by ID (Public)
```http
GET /api/hotels/:id
```

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/hotels/uuid-here"
```

#### 3. Get Hotel by Slug (Public)
```http
GET /api/hotels/slug/:slug
```

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/hotels/slug/grand-hotel-jakarta"
```

#### 4. Get Cities (Public)
```http
GET /api/hotels/cities
```

Returns list of all cities with active hotels.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "city": "Jakarta",
      "province": "DKI Jakarta"
    },
    {
      "city": "Bali",
      "province": "Bali"
    }
  ]
}
```

#### 5. Create Hotel (Private - HOST/ADMIN)
```http
POST /api/hotels
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Grand Hotel Jakarta",
  "address": "Jl. Sudirman No. 123, Jakarta Pusat",
  "city": "Jakarta",
  "province": "DKI Jakarta",
  "latitude": -6.2088,
  "longitude": 106.8456,
  "description": "Luxury hotel in the heart of Jakarta with modern amenities",
  "checkInTime": "14:00",
  "checkOutTime": "12:00",
  "cancellationHours": 24
}
```

**Example:**
```bash
curl -X POST "http://localhost:3000/api/hotels" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Grand Hotel Jakarta",
    "address": "Jl. Sudirman No. 123",
    "city": "Jakarta",
    "province": "DKI Jakarta",
    "description": "Luxury hotel"
  }'
```

#### 6. Update Hotel (Private - Owner)
```http
PUT /api/hotels/:id
Authorization: Bearer <token>
```

**Request Body:** (all fields optional)
```json
{
  "name": "Grand Hotel Jakarta Updated",
  "description": "Updated description",
  "isActive": true
}
```

#### 7. Delete Hotel (Private - Owner)
```http
DELETE /api/hotels/:id
Authorization: Bearer <token>
```

**Note:** Cannot delete hotels with active bookings.

#### 8. Get Hotel Statistics (Private - HOST)
```http
GET /api/hotels/my/statistics
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalHotels": 5,
    "activeHotels": 4,
    "inactiveHotels": 1,
    "totalRooms": 50,
    "totalReviews": 250,
    "avgRating": 4.3
  }
}
```

### Hotel Photos API

#### 1. Add Hotel Photo (Private - Owner)
```http
POST /api/hotels/:id/photos
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "url": "https://example.com/photo.jpg",
  "order": 0
}
```

#### 2. Get Hotel Photos (Public)
```http
GET /api/hotels/:id/photos
```

#### 3. Update Photos Order (Private - Owner)
```http
PUT /api/hotels/:id/photos/order
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "photos": [
    { "id": "photo-id-1", "order": 0 },
    { "id": "photo-id-2", "order": 1 },
    { "id": "photo-id-3", "order": 2 }
  ]
}
```

#### 4. Delete Hotel Photo (Private - Owner)
```http
DELETE /api/hotels/:id/photos/:photoId
Authorization: Bearer <token>
```

#### 5. Update Cover Photo (Private - Owner)
```http
PATCH /api/hotels/:id/cover-photo
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "coverPhoto": "https://example.com/new-cover.jpg"
}
```

### Hotel Amenities API

#### 1. Add Hotel Amenity (Private - Owner)
```http
POST /api/hotels/:id/amenities
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Free WiFi",
  "icon": "wifi"
}
```

#### 2. Get Hotel Amenities (Public)
```http
GET /api/hotels/:id/amenities
```

#### 3. Update Hotel Amenity (Private - Owner)
```http
PUT /api/hotels/:id/amenities/:amenityId
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "High-Speed WiFi",
  "icon": "wifi-fast"
}
```

#### 4. Delete Hotel Amenity (Private - Owner)
```http
DELETE /api/hotels/:id/amenities/:amenityId
Authorization: Bearer <token>
```

## 🛏️ Room Management API

### Room Endpoints

#### 1. Get All Rooms (Public)
```http
GET /api/rooms
```

**Query Parameters:**
- `page` (number, optional)
- `limit` (number, optional)
- `hotelId` (string, optional): Filter by hotel
- `type` (string, optional): Filter by room type
- `minPrice` (number, optional)
- `maxPrice` (number, optional)
- `minGuests` (number, optional): Minimum guest capacity
- `isActive` (boolean, optional)
- `sortBy` (string, optional): name, price, maxGuests, order, createdAt
- `sortOrder` (string, optional): asc, desc

**Example:**
```bash
curl -X GET "http://localhost:3000/api/rooms?hotelId=uuid&minGuests=2&sortBy=price&sortOrder=asc"
```

#### 2. Get Room by ID (Public)
```http
GET /api/rooms/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Deluxe Room",
    "type": "Deluxe",
    "maxGuests": 2,
    "totalRooms": 10,
    "size": 35,
    "bedType": "King",
    "price": "750000",
    "extraBedPrice": "150000",
    "extraBedAvailable": true,
    "isActive": true,
    "order": 0,
    "hotel": {
      "id": "hotel-id",
      "name": "Grand Hotel Jakarta",
      "slug": "grand-hotel-jakarta",
      "city": "Jakarta",
      "checkInTime": "14:00",
      "checkOutTime": "12:00"
    },
    "photos": [...]
  }
}
```

#### 3. Create Room (Private - HOST/ADMIN)
```http
POST /api/rooms
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "hotelId": "hotel-uuid",
  "name": "Deluxe Room",
  "type": "Deluxe",
  "maxGuests": 2,
  "totalRooms": 10,
  "size": 35,
  "bedType": "King",
  "price": 750000,
  "extraBedPrice": 150000,
  "extraBedAvailable": true,
  "order": 0
}
```

**Example:**
```bash
curl -X POST "http://localhost:3000/api/rooms" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "hotelId": "hotel-uuid",
    "name": "Deluxe Room",
    "type": "Deluxe",
    "maxGuests": 2,
    "totalRooms": 10,
    "price": 750000
  }'
```

#### 4. Update Room (Private - Owner)
```http
PUT /api/rooms/:id
Authorization: Bearer <token>
```

#### 5. Delete Room (Private - Owner)
```http
DELETE /api/rooms/:id
Authorization: Bearer <token>
```

**Note:** Cannot delete rooms with active bookings.

### Room Availability API

#### 1. Check Room Availability (Public)
```http
GET /api/rooms/:id/availability
```

**Query Parameters:**
- `checkIn` (string, required): Check-in date (YYYY-MM-DD)
- `checkOut` (string, required): Check-out date (YYYY-MM-DD)
- `guests` (number, optional): Number of guests (default: 1)

**Example:**
```bash
curl -X GET "http://localhost:3000/api/rooms/uuid/availability?checkIn=2024-12-20&checkOut=2024-12-23&guests=2"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "available": true,
    "roomId": "uuid",
    "roomName": "Deluxe Room",
    "totalRooms": 10,
    "availableRooms": 5,
    "checkIn": "2024-12-20",
    "checkOut": "2024-12-23",
    "nights": 3,
    "guests": 2,
    "price": "750000",
    "totalPrice": 2250000,
    "unavailableDates": []
  }
}
```

#### 2. Get Available Rooms for Hotel (Public)
```http
GET /api/rooms/hotel/:hotelId/available
```

**Query Parameters:**
- `checkIn` (string, required): YYYY-MM-DD
- `checkOut` (string, required): YYYY-MM-DD
- `guests` (number, optional): Default 1

**Example:**
```bash
curl -X GET "http://localhost:3000/api/rooms/hotel/uuid/available?checkIn=2024-12-20&checkOut=2024-12-23&guests=2"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "hotelId": "uuid",
    "checkIn": "2024-12-20",
    "checkOut": "2024-12-23",
    "nights": 3,
    "guests": 2,
    "totalRooms": 3,
    "rooms": [
      {
        "id": "room-id-1",
        "name": "Deluxe Room",
        "type": "Deluxe",
        "maxGuests": 2,
        "price": "750000",
        "totalRooms": 10,
        "isAvailable": true,
        "availableRooms": 5,
        "nights": 3,
        "totalPrice": 2250000,
        "photos": [...]
      }
    ]
  }
}
```

#### 3. Get Room Types for Hotel (Public)
```http
GET /api/rooms/hotel/:hotelId/types
```

Returns array of unique room types available in the hotel.

**Response:**
```json
{
  "success": true,
  "data": ["Standard", "Deluxe", "Suite", "Presidential Suite"]
}
```

### Room Photos API

#### 1. Add Room Photo (Private - Owner)
```http
POST /api/rooms/:id/photos
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "url": "https://example.com/room-photo.jpg",
  "order": 0
}
```

#### 2. Get Room Photos (Public)
```http
GET /api/rooms/:id/photos
```

#### 3. Update Photos Order (Private - Owner)
```http
PUT /api/rooms/:id/photos/order
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "photos": [
    { "id": "photo-id-1", "order": 0 },
    { "id": "photo-id-2", "order": 1 }
  ]
}
```

#### 4. Delete Room Photo (Private - Owner)
```http
DELETE /api/rooms/:id/photos/:photoId
Authorization: Bearer <token>
```

## 🔐 Authentication & Authorization

### Access Levels

1. **Public Routes:**
   - Get hotels list
   - Get hotel by ID/slug
   - Get cities
   - Get rooms list
   - Get room by ID
   - Check availability
   - Get photos/amenities

2. **HOST/ADMIN Routes:**
   - Create hotel
   - Create room
   - Get statistics

3. **Owner Only Routes:**
   - Update hotel
   - Delete hotel
   - Update room
   - Delete room
   - Manage photos
   - Manage amenities

### Authorization Headers

```bash
Authorization: Bearer <your-jwt-token>
```

## 🎯 Key Features

### 1. Smart Slug Generation
- Automatic URL-friendly slug generation from hotel name
- Ensures uniqueness with automatic numbering
- Example: "Grand Hotel" → "grand-hotel"
- Duplicate: "Grand Hotel" → "grand-hotel-1"

### 2. Availability Engine
- Real-time room availability checking
- Prevents double booking
- Supports multiple room inventory
- Date range validation
- Guest capacity validation

### 3. Photo Management
- Multiple photos per hotel/room
- Customizable display order
- Separate cover photo for hotels
- Efficient photo ordering system

### 4. Search & Filtering
- Full-text search on hotel name, city, address, description
- City and province filters
- Rating filter
- Price range filter for rooms
- Guest capacity filter
- Sort by multiple criteria

### 5. Ownership Verification
- All modification routes verify ownership
- Prevents unauthorized access
- Separate checks for hotel and room operations

## 🧪 Testing Examples

### Create a Complete Hotel with Rooms

```bash
# 1. Create Hotel
HOTEL_RESPONSE=$(curl -X POST "http://localhost:3000/api/hotels" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Hotel Jakarta",
    "address": "Jl. Test No. 1",
    "city": "Jakarta",
    "description": "Test hotel for API"
  }')

HOTEL_ID=$(echo $HOTEL_RESPONSE | jq -r '.data.id')

# 2. Add Hotel Cover Photo
curl -X PATCH "http://localhost:3000/api/hotels/$HOTEL_ID/cover-photo" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "coverPhoto": "https://example.com/cover.jpg"
  }'

# 3. Add Hotel Photos
curl -X POST "http://localhost:3000/api/hotels/$HOTEL_ID/photos" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/photo1.jpg",
    "order": 0
  }'

# 4. Add Amenities
curl -X POST "http://localhost:3000/api/hotels/$HOTEL_ID/amenities" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Free WiFi",
    "icon": "wifi"
  }'

# 5. Create Room
curl -X POST "http://localhost:3000/api/rooms" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "hotelId": "'$HOTEL_ID'",
    "name": "Deluxe Room",
    "type": "Deluxe",
    "maxGuests": 2,
    "totalRooms": 5,
    "price": 500000
  }'

# 6. Check Availability
curl -X GET "http://localhost:3000/api/rooms/hotel/$HOTEL_ID/available?checkIn=2024-12-20&checkOut=2024-12-23&guests=2"
```

## ⚠️ Important Notes

### Business Rules

1. **Hotel Deletion:**
   - Cannot delete hotels with active bookings
   - Soft delete only (preserves data)

2. **Room Deletion:**
   - Cannot delete rooms with active bookings
   - Soft delete only

3. **Availability:**
   - Check-in date must be in the future
   - Check-out must be after check-in
   - Guest count must not exceed room capacity

4. **Slug Generation:**
   - Automatically generated from hotel name
   - Cannot be manually set
   - Updates when hotel name changes

5. **Ownership:**
   - Only hotel owner can modify hotel/rooms
   - Admin can create but not modify others' hotels

## 🚀 Next Steps (Phase 3)

Phase 2 provides the foundation for:
- Booking system (Phase 3)
- Review system (Phase 3)
- Payment integration (Phase 4)

## 📝 Database Schema Notes

### Hotel Table
- Uses UUID for primary keys
- Includes geolocation (latitude, longitude)
- Supports full-text search
- Tracks average rating and review count
- Soft delete support

### Room Table
- Links to hotel via foreign key
- Inventory management (totalRooms)
- Flexible pricing
- Extra bed support
- Display ordering

### BookingDate Table
- Prevents double booking
- Date-based availability tracking
- Supports multiple rooms of same type

## 🔍 Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

Common errors:
- 400: Bad Request (validation errors)
- 401: Unauthorized (missing/invalid token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 500: Internal Server Error

## 💡 Best Practices

1. **Search Performance:**
   - Use indexed fields for filters
   - Implement pagination for large datasets
   - Cache frequently accessed data

2. **Availability Checking:**
   - Check availability before booking
   - Handle race conditions
   - Validate date ranges

3. **Photo Management:**
   - Optimize image sizes
   - Use CDN for delivery
   - Implement lazy loading

4. **Data Consistency:**
   - Use transactions for multi-step operations
   - Validate foreign key relationships
   - Handle soft deletes properly

---

**Phase 2 Status:** ✅ Complete
**Last Updated:** 2024
**Version:** 1.0.0