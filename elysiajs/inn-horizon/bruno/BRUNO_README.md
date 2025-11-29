# Bruno API Collection - Inn Horizon

## 📋 Overview

This Bruno collection contains all API endpoints for testing the Inn Horizon hotel booking platform.

## 🗂️ Collection Structure

```
bruno/
├── auth/                    # Authentication endpoints (Phase 1)
│   ├── 01-register-customer.bru
│   ├── 02-register-host.bru
│   ├── 03-login.bru
│   ├── 04-get-me.bru
│   ├── 05-change-password.bru
│   └── 06-refresh-token.bru
├── users/                   # User management endpoints (Phase 1)
├── hotels/                  # Hotel management endpoints (Phase 2) ✨ NEW
│   ├── 01-get-all-hotels.bru
│   ├── 02-create-hotel.bru
│   ├── 03-get-hotel-by-id.bru
│   ├── 04-get-hotel-by-slug.bru
│   ├── 05-update-hotel.bru
│   ├── 06-add-hotel-photo.bru
│   ├── 07-add-hotel-amenity.bru
│   └── 08-get-my-statistics.bru
├── rooms/                   # Room management endpoints (Phase 2) ✨ NEW
│   ├── 01-create-room.bru
│   ├── 02-check-room-availability.bru
│   ├── 03-get-available-rooms.bru
│   └── 04-get-all-rooms.bru
└── environments/            # Environment configurations
```

## 🚀 Getting Started

### 1. Install Bruno

Download and install Bruno from: https://www.usebruno.com/

### 2. Open Collection

1. Open Bruno
2. Click "Open Collection"
3. Navigate to the `bruno` folder in the project
4. Select the folder

### 3. Configure Environment

1. Go to **Environments** in Bruno
2. Select or create an environment
3. Set the following variables:

```json
{
  "base_url": "http://localhost:3000",
  "access_token": "",
  "refresh_token": "",
  "user_id": "",
  "hotel_id": "",
  "hotel_slug": "",
  "new_hotel_id": "",
  "new_hotel_slug": "",
  "room_id": "",
  "available_room_id": "",
  "hotel_photo_id": "",
  "hotel_amenity_id": ""
}
```

### 4. Start the Server

```bash
cd inn-horizon
bun run dev
```

Server will start at `http://localhost:3000`

## 📖 Usage Guide

### Step-by-Step Testing Flow

#### 1. Authentication (Required First)

**Register as HOST:**
```
Run: auth/02-register-host.bru
```
This will create a HOST account which can create hotels and rooms.

**Login:**
```
Run: auth/03-login.bru
```
This automatically saves the `access_token` to environment variables.

#### 2. Create Hotel (Phase 2)

**Create Your First Hotel:**
```
Run: hotels/02-create-hotel.bru
```
- Requires authentication (HOST/ADMIN role)
- Auto-saves `new_hotel_id` and `new_hotel_slug`
- Hotel is active by default

**View Hotel:**
```
Run: hotels/03-get-hotel-by-id.bru
```
or
```
Run: hotels/04-get-hotel-by-slug.bru
```

#### 3. Add Hotel Photos & Amenities

**Add Photos:**
```
Run: hotels/06-add-hotel-photo.bru
```
- Can add multiple photos
- Set display order (0, 1, 2, ...)
- First photo often used as thumbnail

**Add Amenities:**
```
Run: hotels/07-add-hotel-amenity.bru
```
- Add: WiFi, Pool, Gym, Restaurant, etc.
- Include icon identifiers

#### 4. Create Rooms

**Create Room:**
```
Run: rooms/01-create-room.bru
```
- Uses `new_hotel_id` from environment
- Auto-saves `room_id`
- Set inventory (totalRooms)

#### 5. Check Availability

**Check Specific Room:**
```
Run: rooms/02-check-room-availability.bru
```
- Update dates in query params
- Shows available units
- Calculates total price

**Get All Available Rooms:**
```
Run: rooms/03-get-available-rooms.bru
```
- Shows all available room types
- Filters by guest capacity
- Returns pricing for each

#### 6. Search & Browse

**Search Hotels:**
```
Run: hotels/01-get-all-hotels.bru
```
- Filter by city, rating, etc.
- Try different sort options

**Browse Rooms:**
```
Run: rooms/04-get-all-rooms.bru
```
- Filter by hotel, price, capacity
- Sort by price, name, order

#### 7. View Statistics (HOST only)

```
Run: hotels/08-get-my-statistics.bru
```
Shows your portfolio overview.

## 🔑 Environment Variables

### Automatically Set Variables

These are set automatically by test scripts:

- `access_token` - Set by login
- `refresh_token` - Set by login
- `user_id` - Set by login/register
- `hotel_id` - Set by get-all-hotels
- `hotel_slug` - Set by get-all-hotels
- `new_hotel_id` - Set by create-hotel
- `new_hotel_slug` - Set by create-hotel
- `room_id` - Set by create-room
- `available_room_id` - Set by get-available-rooms
- `hotel_photo_id` - Set by add-hotel-photo
- `hotel_amenity_id` - Set by add-hotel-amenity

### Manual Configuration

Only `base_url` needs to be set manually:

```json
{
  "base_url": "http://localhost:3000"
}
```

## 📝 Request Types

### Public Endpoints (No Auth Required)
- Get all hotels
- Get hotel by ID/slug
- Get hotel photos/amenities
- Get all rooms
- Check room availability
- Get available rooms
- Get room types

### Protected Endpoints (Requires Auth)
- Create hotel (HOST/ADMIN)
- Update hotel (Owner only)
- Delete hotel (Owner only)
- Add/manage photos (Owner only)
- Add/manage amenities (Owner only)
- Create room (HOST/ADMIN)
- Update room (Owner only)
- Delete room (Owner only)
- Get statistics (HOST)

## 🧪 Testing Features

### Built-in Tests

Each request includes automated tests:

```javascript
test("should return 200 status", function() {
  expect(res.status).to.equal(200);
});

test("should return success true", function() {
  const data = res.body;
  expect(data.success).to.equal(true);
});
```

### Running Tests

Tests run automatically after each request:
- ✅ Green checkmark = Passed
- ❌ Red X = Failed

### Environment Variable Saving

Many requests save IDs to environment:

```javascript
test("should save hotel ID to environment", function() {
  const data = res.body;
  if (data.success && data.data) {
    bru.setEnvVar('new_hotel_id', data.data.id);
  }
});
```

## 📚 Documentation

### Inline Documentation

Each request includes comprehensive docs:
- Request/response format
- Authentication requirements
- Use cases
- Examples
- Business rules
- Best practices

### Viewing Docs

Click the **"Docs"** tab in any request to view documentation.

## 🎯 Common Workflows

### Workflow 1: Setup New Hotel

1. `auth/02-register-host.bru` - Register
2. `auth/03-login.bru` - Login
3. `hotels/02-create-hotel.bru` - Create hotel
4. `hotels/06-add-hotel-photo.bru` - Add photos (repeat)
5. `hotels/07-add-hotel-amenity.bru` - Add amenities (repeat)
6. `rooms/01-create-room.bru` - Create rooms (repeat)

### Workflow 2: Check Availability

1. `hotels/01-get-all-hotels.bru` - Browse hotels
2. `hotels/03-get-hotel-by-id.bru` - View details
3. `rooms/03-get-available-rooms.bru` - Check availability
4. `rooms/02-check-room-availability.bru` - Check specific room

### Workflow 3: Search & Filter

1. `hotels/01-get-all-hotels.bru` - Search hotels
   - Try: `?city=Bali&minRating=4`
2. `rooms/04-get-all-rooms.bru` - Filter rooms
   - Try: `?minPrice=500000&maxPrice=2000000`

### Workflow 4: Host Dashboard

1. `auth/03-login.bru` - Login as HOST
2. `hotels/08-get-my-statistics.bru` - View statistics
3. `hotels/01-get-all-hotels.bru?ownerId={{user_id}}` - View my hotels

## 🔧 Tips & Tricks

### 1. Query Parameters

Disable optional params with `~`:
```
~search:        # Disabled
city: Bali      # Enabled
```

### 2. Multiple Environments

Create separate environments:
- **Local** - http://localhost:3000
- **Development** - https://dev.innhorizon.com
- **Production** - https://api.innhorizon.com

### 3. Collections Runner

Run multiple requests in sequence:
1. Select folder
2. Click "Run Collection"
3. View results

### 4. Keyboard Shortcuts

- `Ctrl/Cmd + Enter` - Send request
- `Ctrl/Cmd + S` - Save request
- `Ctrl/Cmd + K` - Search requests

### 5. Response Inspection

- **Preview** - Formatted JSON
- **Raw** - Raw response
- **Headers** - Response headers
- **Tests** - Test results
- **Timeline** - Request timeline

## ⚠️ Important Notes

### Authentication

Most Phase 2 endpoints require authentication:
```
Authorization: Bearer {{access_token}}
```

Token is automatically set by login request.

### Authorization

- **Public:** Anyone can view
- **HOST/ADMIN:** Can create hotels/rooms
- **Owner:** Can modify own hotels/rooms only

### Date Formats

Use YYYY-MM-DD format:
```
checkIn: 2024-12-20
checkOut: 2024-12-23
```

### Validation

Requests validate automatically:
- Hotel names: 3-200 characters
- Prices: Positive numbers
- Guest capacity: 1-20
- Room inventory: 1-100

## 🐛 Troubleshooting

### 401 Unauthorized

**Problem:** Token expired or invalid

**Solution:**
1. Run `auth/03-login.bru` again
2. Check `access_token` in environment

### 403 Forbidden

**Problem:** Insufficient permissions

**Solution:**
- Ensure you're logged in as HOST/ADMIN
- Verify you own the resource

### 404 Not Found

**Problem:** Resource doesn't exist

**Solution:**
- Check IDs in environment variables
- Verify resource wasn't deleted

### Validation Errors

**Problem:** Invalid input data

**Solution:**
- Check request body format
- Review field requirements in docs
- Verify data types

## 📊 Phase 2 Statistics

- **Total Endpoints:** 12+ new endpoints
- **Hotels Module:** 8 endpoints
- **Rooms Module:** 4 endpoints
- **Public Endpoints:** 7 endpoints
- **Protected Endpoints:** 5+ endpoints

## 🎓 Learning Resources

- **API Documentation:** `docs/PHASE_2_HOTELS_ROOMS.md`
- **Quick Reference:** `PHASE_2_QUICK_REFERENCE.md`
- **Complete Guide:** `PHASE_2_COMPLETION_REPORT.md`

## 🔄 Version History

### Phase 2 (Current)
- ✅ Hotel Management API
- ✅ Room Management API
- ✅ Availability Engine
- ✅ Photo & Amenity Management

### Phase 1
- ✅ Authentication API
- ✅ User Management API

### Coming Soon (Phase 3)
- 🚧 Booking API
- 🚧 Review API
- 🚧 Payment Integration

## 💡 Pro Tips

1. **Save Responses:** Right-click → Save to file
2. **Clone Requests:** Duplicate to test variations
3. **Use Variables:** Reuse IDs across requests
4. **Document Custom:** Add notes to requests
5. **Share Collection:** Export and share with team

---

**Status:** ✅ Phase 2 Complete
**Last Updated:** November 2024
**Collection Version:** 2.0