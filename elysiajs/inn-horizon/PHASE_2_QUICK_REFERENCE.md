# Phase 2: Quick Reference Guide

## 🚀 Quick Commands

### Start Server
```bash
bun run dev
```

### Test Endpoints
```bash
# Health check
curl http://localhost:3000/health

# List all endpoints
curl http://localhost:3000/
```

---

## 🔐 Authentication

### 1. Register as HOST
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "host@example.com",
    "password": "password123",
    "name": "Hotel Owner",
    "phone": "+628123456789",
    "role": "HOST"
  }'
```

### 2. Login & Get Token
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "host@example.com",
    "password": "password123"
  }'
```

**Save the token:**
```bash
export TOKEN="your-jwt-token-here"
```

---

## 🏨 Hotel Operations

### Create Hotel
```bash
curl -X POST http://localhost:3000/api/hotels \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sunset Beach Hotel",
    "address": "Jl. Pantai Indah No. 99",
    "city": "Bali",
    "province": "Bali",
    "description": "Beautiful beachfront hotel with stunning sunset views",
    "latitude": -8.7467,
    "longitude": 115.1764,
    "checkInTime": "14:00",
    "checkOutTime": "12:00",
    "cancellationHours": 24
  }'
```

### List Hotels
```bash
# All hotels
curl http://localhost:3000/api/hotels

# Search by city
curl "http://localhost:3000/api/hotels?city=Bali"

# Filter by rating
curl "http://localhost:3000/api/hotels?minRating=4"

# Paginated
curl "http://localhost:3000/api/hotels?page=1&limit=10"
```

### Get Hotel by ID
```bash
curl http://localhost:3000/api/hotels/HOTEL_ID
```

### Get Hotel by Slug
```bash
curl http://localhost:3000/api/hotels/slug/sunset-beach-hotel
```

### Update Hotel
```bash
curl -X PUT http://localhost:3000/api/hotels/HOTEL_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated description",
    "isActive": true
  }'
```

### Delete Hotel
```bash
curl -X DELETE http://localhost:3000/api/hotels/HOTEL_ID \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📸 Hotel Photos

### Add Photo
```bash
curl -X POST http://localhost:3000/api/hotels/HOTEL_ID/photos \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/hotel-photo-1.jpg",
    "order": 0
  }'
```

### Get Photos
```bash
curl http://localhost:3000/api/hotels/HOTEL_ID/photos
```

### Update Cover Photo
```bash
curl -X PATCH http://localhost:3000/api/hotels/HOTEL_ID/cover-photo \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "coverPhoto": "https://example.com/cover.jpg"
  }'
```

### Reorder Photos
```bash
curl -X PUT http://localhost:3000/api/hotels/HOTEL_ID/photos/order \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "photos": [
      {"id": "photo-1", "order": 0},
      {"id": "photo-2", "order": 1}
    ]
  }'
```

### Delete Photo
```bash
curl -X DELETE http://localhost:3000/api/hotels/HOTEL_ID/photos/PHOTO_ID \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🎯 Hotel Amenities

### Add Amenity
```bash
curl -X POST http://localhost:3000/api/hotels/HOTEL_ID/amenities \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Free WiFi",
    "icon": "wifi"
  }'
```

### Get Amenities
```bash
curl http://localhost:3000/api/hotels/HOTEL_ID/amenities
```

### Update Amenity
```bash
curl -X PUT http://localhost:3000/api/hotels/HOTEL_ID/amenities/AMENITY_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "High-Speed WiFi"
  }'
```

### Delete Amenity
```bash
curl -X DELETE http://localhost:3000/api/hotels/HOTEL_ID/amenities/AMENITY_ID \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🛏️ Room Operations

### Create Room
```bash
curl -X POST http://localhost:3000/api/rooms \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "hotelId": "HOTEL_ID",
    "name": "Deluxe Ocean View",
    "type": "Deluxe",
    "maxGuests": 2,
    "totalRooms": 10,
    "size": 35,
    "bedType": "King",
    "price": 1500000,
    "extraBedPrice": 300000,
    "extraBedAvailable": true,
    "order": 0
  }'
```

### List Rooms
```bash
# All rooms
curl http://localhost:3000/api/rooms

# By hotel
curl "http://localhost:3000/api/rooms?hotelId=HOTEL_ID"

# Price range
curl "http://localhost:3000/api/rooms?minPrice=500000&maxPrice=2000000"

# By capacity
curl "http://localhost:3000/api/rooms?minGuests=2"

# Sort by price
curl "http://localhost:3000/api/rooms?sortBy=price&sortOrder=asc"
```

### Get Room by ID
```bash
curl http://localhost:3000/api/rooms/ROOM_ID
```

### Update Room
```bash
curl -X PUT http://localhost:3000/api/rooms/ROOM_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1750000,
    "isActive": true
  }'
```

### Delete Room
```bash
curl -X DELETE http://localhost:3000/api/rooms/ROOM_ID \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📅 Room Availability

### Check Specific Room Availability
```bash
curl "http://localhost:3000/api/rooms/ROOM_ID/availability?checkIn=2024-12-20&checkOut=2024-12-23&guests=2"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "available": true,
    "roomId": "uuid",
    "roomName": "Deluxe Ocean View",
    "totalRooms": 10,
    "availableRooms": 8,
    "checkIn": "2024-12-20",
    "checkOut": "2024-12-23",
    "nights": 3,
    "guests": 2,
    "price": "1500000",
    "totalPrice": 4500000,
    "unavailableDates": []
  }
}
```

### Get All Available Rooms for Hotel
```bash
curl "http://localhost:3000/api/rooms/hotel/HOTEL_ID/available?checkIn=2024-12-20&checkOut=2024-12-23&guests=2"
```

### Get Room Types
```bash
curl http://localhost:3000/api/rooms/hotel/HOTEL_ID/types
```

---

## 📸 Room Photos

### Add Room Photo
```bash
curl -X POST http://localhost:3000/api/rooms/ROOM_ID/photos \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/room-photo.jpg",
    "order": 0
  }'
```

### Get Room Photos
```bash
curl http://localhost:3000/api/rooms/ROOM_ID/photos
```

### Reorder Photos
```bash
curl -X PUT http://localhost:3000/api/rooms/ROOM_ID/photos/order \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "photos": [
      {"id": "photo-1", "order": 0},
      {"id": "photo-2", "order": 1}
    ]
  }'
```

### Delete Photo
```bash
curl -X DELETE http://localhost:3000/api/rooms/ROOM_ID/photos/PHOTO_ID \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📊 Statistics

### Get Hotel Statistics (HOST only)
```bash
curl http://localhost:3000/api/hotels/my/statistics \
  -H "Authorization: Bearer $TOKEN"
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

---

## 🌍 Location Data

### Get Cities with Hotels
```bash
curl http://localhost:3000/api/hotels/cities
```

---

## 🔍 Common Query Parameters

### Pagination
```
?page=1&limit=10
```

### Sorting
```
?sortBy=name&sortOrder=asc
?sortBy=price&sortOrder=desc
?sortBy=avgRating&sortOrder=desc
```

### Filters - Hotels
```
?city=Jakarta
?province=DKI+Jakarta
?minRating=4
?isActive=true
?ownerId=USER_ID
?search=beach
```

### Filters - Rooms
```
?hotelId=HOTEL_ID
?type=Deluxe
?minPrice=500000
?maxPrice=2000000
?minGuests=2
?isActive=true
```

---

## 💡 Pro Tips

### 1. Complete Hotel Setup Workflow
```bash
# 1. Create hotel
HOTEL_ID=$(curl -X POST http://localhost:3000/api/hotels \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Hotel","address":"Test","city":"Jakarta"}' | jq -r '.data.id')

# 2. Add cover photo
curl -X PATCH http://localhost:3000/api/hotels/$HOTEL_ID/cover-photo \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"coverPhoto":"https://example.com/cover.jpg"}'

# 3. Add amenities
curl -X POST http://localhost:3000/api/hotels/$HOTEL_ID/amenities \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Free WiFi","icon":"wifi"}'

# 4. Create rooms
curl -X POST http://localhost:3000/api/rooms \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"hotelId":"'$HOTEL_ID'","name":"Standard Room","type":"Standard","maxGuests":2,"totalRooms":5,"price":500000}'

# 5. Check availability
curl "http://localhost:3000/api/rooms/hotel/$HOTEL_ID/available?checkIn=2024-12-20&checkOut=2024-12-23"
```

### 2. Search Hotels by Multiple Criteria
```bash
curl "http://localhost:3000/api/hotels?city=Bali&minRating=4&sortBy=avgRating&sortOrder=desc&page=1&limit=5"
```

### 3. Find Available Rooms in Price Range
```bash
curl "http://localhost:3000/api/rooms?hotelId=HOTEL_ID&minPrice=500000&maxPrice=1500000&minGuests=2"
```

---

## ⚠️ Important Notes

### Authorization
- **Public:** Anyone can view hotels, rooms, availability
- **HOST/ADMIN:** Can create hotels and rooms
- **Owner Only:** Can modify/delete their own hotels and rooms

### Business Rules
- Cannot delete hotels/rooms with active bookings
- Check-in must be in the future
- Check-out must be after check-in
- Guest count must not exceed room capacity
- Slugs are auto-generated from hotel names

### Error Responses
All errors follow this format:
```json
{
  "success": false,
  "error": "Error message here"
}
```

Common status codes:
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## 📚 Full Documentation

- **Complete API Guide:** `docs/PHASE_2_HOTELS_ROOMS.md`
- **Implementation Summary:** `PHASE_2_SUMMARY.md`
- **Setup Guide:** `SETUP.md`

---

## 🎯 Total Endpoints: 41

- **Public:** 19 endpoints
- **Protected:** 22 endpoints

**Phase 2 Status:** ✅ COMPLETE