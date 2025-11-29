# Inn Horizon API - Usage Examples

This document provides practical examples of how to use the Inn Horizon API.

## Table of Contents

- [Setup](#setup)
- [Authentication Flow](#authentication-flow)
- [Hotel Management](#hotel-management)
- [Room Management](#room-management)
- [Booking Flow](#booking-flow)
- [Review System](#review-system)
- [Complete User Journey](#complete-user-journey)

---

## Setup

### Start the Server

```bash
bun run dev
```

The server will start at `http://localhost:3000`

---

## Authentication Flow

### 1. Register a Customer

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "password": "password123",
    "name": "John Customer",
    "role": "CUSTOMER"
  }'
```

### 2. Register a Hotel Owner (Host)

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "host@example.com",
    "password": "password123",
    "name": "Jane Host",
    "role": "HOST"
  }'
```

### 3. Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "password": "password123"
  }'
```

Response:
```json
{
  "message": "Login successful",
  "user": {
    "id": "clx1234567890",
    "email": "customer@example.com",
    "name": "John Customer",
    "role": "CUSTOMER"
  }
}
```

### 4. Get User Profile

```bash
curl http://localhost:3000/api/auth/me/clx1234567890
```

---

## Hotel Management

### 1. Create a Hotel (Host Only)

```bash
curl -X POST http://localhost:3000/api/hotels \
  -H "Content-Type: application/json" \
  -d '{
    "ownerId": "host-user-id-here",
    "name": "Sunset Paradise Hotel",
    "address": "123 Beach Boulevard",
    "city": "Miami",
    "province": "Florida",
    "description": "A beautiful beachfront hotel with stunning ocean views",
    "coverPhoto": "https://example.com/hotel-cover.jpg",
    "amenities": ["WiFi", "Pool", "Restaurant", "Spa", "Parking"]
  }'
```

### 2. List All Hotels

```bash
# All hotels
curl http://localhost:3000/api/hotels

# Filter by city
curl http://localhost:3000/api/hotels?city=Miami

# Search hotels
curl http://localhost:3000/api/hotels?search=beach

# With pagination
curl http://localhost:3000/api/hotels?page=1&limit=5
```

### 3. Get Hotel Details

```bash
curl http://localhost:3000/api/hotels/hotel-uuid-here
```

### 4. Update Hotel

```bash
curl -X PATCH http://localhost:3000/api/hotels/hotel-uuid-here \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated description with more details",
    "isActive": true
  }'
```

### 5. Add Hotel Photos

```bash
curl -X POST http://localhost:3000/api/hotels/hotel-uuid-here/photos \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/photo1.jpg",
    "isCover": true
  }'
```

### 6. Add Hotel Amenities

```bash
curl -X POST http://localhost:3000/api/hotels/hotel-uuid-here/amenities \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Gym"
  }'
```

---

## Room Management

### 1. Create a Room

```bash
curl -X POST http://localhost:3000/api/rooms \
  -H "Content-Type: application/json" \
  -d '{
    "hotelId": "hotel-uuid-here",
    "name": "Ocean View Suite",
    "type": "Suite",
    "maxGuests": 4,
    "totalRooms": 10,
    "size": 45,
    "bedType": "King",
    "price": 250.00,
    "photos": [
      "https://example.com/room1.jpg",
      "https://example.com/room2.jpg"
    ]
  }'
```

### 2. List Rooms

```bash
# All rooms
curl http://localhost:3000/api/rooms

# Filter by hotel
curl http://localhost:3000/api/rooms?hotelId=hotel-uuid-here

# Filter by price range
curl "http://localhost:3000/api/rooms?minPrice=100&maxPrice=300"
```

### 3. Get Room Details

```bash
curl http://localhost:3000/api/rooms/room-uuid-here
```

### 4. Check Room Availability

```bash
curl "http://localhost:3000/api/rooms/room-uuid-here/availability?startDate=2024-02-01&endDate=2024-02-05"
```

Response:
```json
{
  "roomId": "room-123",
  "totalRooms": 10,
  "availability": [
    {
      "date": "2024-02-01T00:00:00.000Z",
      "available": 8,
      "booked": 2,
      "totalRooms": 10,
      "isAvailable": true
    },
    {
      "date": "2024-02-02T00:00:00.000Z",
      "available": 7,
      "booked": 3,
      "totalRooms": 10,
      "isAvailable": true
    }
  ]
}
```

### 5. Update Room

```bash
curl -X PATCH http://localhost:3000/api/rooms/room-uuid-here \
  -H "Content-Type: application/json" \
  -d '{
    "price": 275.00,
    "totalRooms": 12
  }'
```

---

## Booking Flow

### 1. Create a Booking

```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "customer-user-id",
    "roomId": "room-uuid-here",
    "checkIn": "2024-02-15",
    "checkOut": "2024-02-18",
    "guests": 2,
    "guestName": "John Doe",
    "guestPhone": "+1234567890",
    "guestEmail": "john@example.com"
  }'
```

Response:
```json
{
  "message": "Booking created successfully",
  "booking": {
    "id": "booking-123",
    "userId": "customer-user-id",
    "roomId": "room-uuid-here",
    "checkIn": "2024-02-15T00:00:00.000Z",
    "checkOut": "2024-02-18T00:00:00.000Z",
    "nights": 3,
    "guests": 2,
    "totalPrice": "750.00",
    "status": "PENDING",
    "guestName": "John Doe",
    "guestPhone": "+1234567890"
  }
}
```

### 2. List Bookings

```bash
# All bookings
curl http://localhost:3000/api/bookings

# User's bookings
curl http://localhost:3000/api/bookings?userId=customer-user-id

# Filter by status
curl http://localhost:3000/api/bookings?status=CONFIRMED
```

### 3. Get Booking Details

```bash
curl http://localhost:3000/api/bookings/booking-uuid-here
```

### 4. Update Booking Status

```bash
# Mark as paid
curl -X PATCH http://localhost:3000/api/bookings/booking-uuid-here/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "PAID"
  }'

# Confirm booking
curl -X PATCH http://localhost:3000/api/bookings/booking-uuid-here/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "CONFIRMED"
  }'

# Check in
curl -X PATCH http://localhost:3000/api/bookings/booking-uuid-here/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "CHECKED_IN"
  }'

# Check out
curl -X PATCH http://localhost:3000/api/bookings/booking-uuid-here/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "CHECKED_OUT"
  }'

# Complete
curl -X PATCH http://localhost:3000/api/bookings/booking-uuid-here/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "COMPLETED"
  }'
```

### 5. Cancel Booking

```bash
curl -X PATCH http://localhost:3000/api/bookings/booking-uuid-here/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "CANCELLED"
  }'
```

### 6. Delete Booking (Pending Only)

```bash
curl -X DELETE http://localhost:3000/api/bookings/booking-uuid-here
```

---

## Review System

### 1. Create a Review

```bash
curl -X POST http://localhost:3000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "customer-user-id",
    "hotelId": "hotel-uuid-here",
    "bookingId": "booking-uuid-here",
    "rating": 5,
    "comment": "Amazing experience! The hotel exceeded all expectations. Staff was friendly, rooms were spotless, and the location was perfect."
  }'
```

### 2. List Reviews

```bash
# All reviews
curl http://localhost:3000/api/reviews

# Hotel reviews
curl http://localhost:3000/api/reviews?hotelId=hotel-uuid-here

# User reviews
curl http://localhost:3000/api/reviews?userId=customer-user-id

# Filter by rating
curl "http://localhost:3000/api/reviews?hotelId=hotel-uuid-here&minRating=4"
```

### 3. Get Review Details

```bash
curl http://localhost:3000/api/reviews/review-id-here
```

### 4. Update Review

```bash
curl -X PATCH http://localhost:3000/api/reviews/review-id-here \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 4,
    "comment": "Updated review: Great stay overall, minor issues with WiFi."
  }'
```

### 5. Delete Review

```bash
curl -X DELETE http://localhost:3000/api/reviews/review-id-here
```

### 6. Get Hotel Review Statistics

```bash
curl http://localhost:3000/api/reviews/hotel/hotel-uuid-here/stats
```

Response:
```json
{
  "hotelId": "hotel-123",
  "totalReviews": 45,
  "avgRating": 4.5,
  "ratingDistribution": {
    "5": 30,
    "4": 10,
    "3": 3,
    "2": 1,
    "1": 1
  }
}
```

---

## Complete User Journey

Here's a complete flow from registration to leaving a review:

### Step 1: Register Users

```bash
# Register a host
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "host@hotel.com",
    "password": "host123",
    "name": "Hotel Owner",
    "role": "HOST"
  }'

# Register a customer
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "guest@example.com",
    "password": "guest123",
    "name": "Travel Guest",
    "role": "CUSTOMER"
  }'
```

### Step 2: Host Creates Hotel

```bash
curl -X POST http://localhost:3000/api/hotels \
  -H "Content-Type: application/json" \
  -d '{
    "ownerId": "HOST_USER_ID",
    "name": "Paradise Resort",
    "address": "456 Ocean Drive",
    "city": "Los Angeles",
    "province": "California",
    "description": "Luxury beachfront resort",
    "amenities": ["WiFi", "Pool", "Spa", "Restaurant"]
  }'
```

### Step 3: Host Adds Rooms

```bash
curl -X POST http://localhost:3000/api/rooms \
  -H "Content-Type: application/json" \
  -d '{
    "hotelId": "HOTEL_ID",
    "name": "Deluxe Ocean Suite",
    "type": "Suite",
    "maxGuests": 3,
    "totalRooms": 8,
    "size": 40,
    "bedType": "King",
    "price": 199.99
  }'
```

### Step 4: Customer Searches Hotels

```bash
curl "http://localhost:3000/api/hotels?city=Los%20Angeles&page=1&limit=10"
```

### Step 5: Customer Checks Room Availability

```bash
curl "http://localhost:3000/api/rooms/ROOM_ID/availability?startDate=2024-03-01&endDate=2024-03-05"
```

### Step 6: Customer Creates Booking

```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "CUSTOMER_USER_ID",
    "roomId": "ROOM_ID",
    "checkIn": "2024-03-01",
    "checkOut": "2024-03-05",
    "guests": 2,
    "guestName": "Travel Guest",
    "guestPhone": "+1234567890"
  }'
```

### Step 7: Payment and Confirmation

```bash
# Mark as paid
curl -X PATCH http://localhost:3000/api/bookings/BOOKING_ID/status \
  -H "Content-Type: application/json" \
  -d '{"status": "PAID"}'

# Host confirms
curl -X PATCH http://localhost:3000/api/bookings/BOOKING_ID/status \
  -H "Content-Type: application/json" \
  -d '{"status": "CONFIRMED"}'
```

### Step 8: Check-in and Check-out

```bash
# Check in
curl -X PATCH http://localhost:3000/api/bookings/BOOKING_ID/status \
  -H "Content-Type: application/json" \
  -d '{"status": "CHECKED_IN"}'

# Check out
curl -X PATCH http://localhost:3000/api/bookings/BOOKING_ID/status \
  -H "Content-Type: application/json" \
  -d '{"status": "CHECKED_OUT"}'

# Complete
curl -X PATCH http://localhost:3000/api/bookings/BOOKING_ID/status \
  -H "Content-Type: application/json" \
  -d '{"status": "COMPLETED"}'
```

### Step 9: Customer Leaves Review

```bash
curl -X POST http://localhost:3000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "CUSTOMER_USER_ID",
    "hotelId": "HOTEL_ID",
    "bookingId": "BOOKING_ID",
    "rating": 5,
    "comment": "Fantastic stay! The ocean view was breathtaking and the service was impeccable."
  }'
```

### Step 10: View Hotel Statistics

```bash
curl http://localhost:3000/api/reviews/hotel/HOTEL_ID/stats
```

---

## JavaScript/TypeScript Examples

### Using Fetch API

```typescript
// Register a user
async function registerUser() {
  const response = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'user@example.com',
      password: 'password123',
      name: 'John Doe',
      role: 'CUSTOMER',
    }),
  });

  const data = await response.json();
  console.log(data);
}

// Search hotels
async function searchHotels(city: string) {
  const response = await fetch(
    `http://localhost:3000/api/hotels?city=${encodeURIComponent(city)}`
  );
  const data = await response.json();
  return data.hotels;
}

// Create a booking
async function createBooking(bookingData: any) {
  const response = await fetch('http://localhost:3000/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return await response.json();
}

// Check room availability
async function checkAvailability(roomId: string, startDate: string, endDate: string) {
  const response = await fetch(
    `http://localhost:3000/api/rooms/${roomId}/availability?startDate=${startDate}&endDate=${endDate}`
  );
  const data = await response.json();
  return data.availability;
}
```

---

## Python Examples

```python
import requests
import json

BASE_URL = "http://localhost:3000/api"

# Register a user
def register_user(email, password, name, role="CUSTOMER"):
    response = requests.post(
        f"{BASE_URL}/auth/register",
        json={
            "email": email,
            "password": password,
            "name": name,
            "role": role
        }
    )
    return response.json()

# Search hotels
def search_hotels(city=None, page=1, limit=10):
    params = {"page": page, "limit": limit}
    if city:
        params["city"] = city
    
    response = requests.get(f"{BASE_URL}/hotels", params=params)
    return response.json()

# Create a booking
def create_booking(user_id, room_id, check_in, check_out, guests, guest_name, guest_phone):
    response = requests.post(
        f"{BASE_URL}/bookings",
        json={
            "userId": user_id,
            "roomId": room_id,
            "checkIn": check_in,
            "checkOut": check_out,
            "guests": guests,
            "guestName": guest_name,
            "guestPhone": guest_phone
        }
    )
    return response.json()

# Usage
if __name__ == "__main__":
    # Register
    user = register_user("test@example.com", "password123", "Test User")
    print(f"Registered user: {user}")
    
    # Search hotels
    hotels = search_hotels(city="Miami")
    print(f"Found {len(hotels['hotels'])} hotels")
```

---

## Testing Tips

1. **Use Environment Variables**: Store IDs in environment variables for easier testing
2. **Save Response IDs**: Extract and save IDs from responses for subsequent requests
3. **Test Edge Cases**: Try invalid dates, non-existent IDs, etc.
4. **Check Constraints**: Test max guests, price ranges, date validations
5. **Test Concurrent Bookings**: Ensure rooms don't get double-booked

---

## Common Scenarios

### Scenario 1: Fully Booked Room

1. Create a room with `totalRooms: 1`
2. Create a booking for specific dates
3. Try to create another booking for the same dates
4. Should receive an error: "Room is not available"

### Scenario 2: Past Date Booking

```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-id",
    "roomId": "room-id",
    "checkIn": "2020-01-01",
    "checkOut": "2020-01-05",
    "guests": 2,
    "guestName": "John Doe",
    "guestPhone": "+1234567890"
  }'
```

Expected error: "Check-in date cannot be in the past"

### Scenario 3: Review Without Completed Booking

Try to create a review for a PENDING booking - should fail with appropriate error message.

---

## Troubleshooting

### Issue: Hotel creation fails with "User must be a HOST"

**Solution**: Ensure the user has the HOST role when registering.

### Issue: Booking fails with availability error

**Solution**: Check room availability first using the availability endpoint.

### Issue: Review creation fails

**Solution**: Ensure the booking is in COMPLETED or CHECKED_OUT status.

---

## Next Steps

- Implement JWT authentication for secure API access
- Add file upload for hotel and room photos
- Implement payment gateway integration
- Add email notifications for bookings
- Create admin dashboard endpoints
- Add search filters and sorting options
- Implement real-time notifications

---

**Happy Testing! 🚀**