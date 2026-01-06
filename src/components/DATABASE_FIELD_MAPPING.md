# Database Field Mapping Reference

Based on your class diagram, here are the correct field names to use:

## User Table
**Database Fields (camelCase):**
- `userId` - Primary key
- `email`
- `phoneNumber`
- `firstName`
- `lastName`
- `address`
- `profilePhoto`
- `locationEnabled`
- `vacationMode`
- `createdAt`

**Methods:**
- `register()`
- `login()`
- `updateProfile()`
- `enableVacationMode()`
- `disableVacationMode()`

---

## Item Table
**Database Fields (camelCase):**
- `itemId` - Primary key
- `title`
- `description`
- `category`
- `photos` - List<String>
- `status` - ModerationStatus enum (PENDING, APPROVED, REJECTED, UNDER_REVIEW)
- `averageRating` - Float
- `totalReviews` - Integer
- `ownerId` - Foreign key to User

**Methods:**
- `addToListing()`
- `updateDetails()`
- `removeFromListing()`
- `getAvailability()`

---

## RentalRequest Table
**Database Fields (camelCase):**
- `requestId` - Primary key
- `itemId` - Foreign key to Item
- `borrowerId` - Foreign key to User
- `ownerId` - Foreign key to User
- `requestDate`
- `startDate`
- `status` - RequestStatus enum (PENDING, ACCEPTED, REJECTED, EXPIRED, CANCELLED)
- `pickupLocation`

**Methods:**
- `sendRequest()`
- `acceptRequest()`
- `rejectRequest()`
- `cancel()`

---

## Booking Table
**Database Fields (camelCase):**
- `bookingId` - Primary key
- `requestId` - Foreign key to RentalRequest
- `confirmedAt`
- `pickupLocation`
- `startTime`
- `returnTime`
- `status` - BookingStatus enum (CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED)

**Methods:**
- `confirmBooking()`
- `cancelBooking()`
- `completeBooking()`

---

## Merchant Table
**Database Fields (camelCase):**
- `merchantId` - Primary key (NOT merchant_id)
- `businessName` (NOT business_name)
- `businessLicense` (NOT business_license)
- `verifiedStatus` (NOT verified_status)

**Methods:**
- `addProfessionalItem()`
- `manageBooking()`

---

## Other Tables

### Category
- `categoryId`
- `name`
- `icon`

### Calendar
- `calendarId`
- `itemId`
- `unavailableDates` - List<DateTime>

### Favorite
- `favoriteId`
- `userId`
- `itemId`
- `addedAt`

### Conversation
- `conversationId`
- `requestId`
- `participantIds` - List<String>
- `lastMessageAt`

### Message
- `messageId`
- `senderId`
- `receiverId`
- `content`
- `timestamp`
- `isRead`

### DirectBooking
- `autoConfirm` - Boolean
- `minimumHours` - Integer

### Rating
- `ratingId`
- `itemId`
- `bookingId`
- `reviewerId`
- `stars` - Integer
- `comment`
- `createdAt`

---

## Important Naming Conventions

### ✅ Correct (camelCase):
- `userId`, `itemId`, `bookingId`, `requestId`
- `firstName`, `lastName`, `phoneNumber`
- `businessName`, `businessLicense`, `verifiedStatus`
- `averageRating`, `totalReviews`
- `confirmedAt`, `createdAt`, `startTime`, `returnTime`

### ❌ Incorrect (snake_case):
- `user_id`, `item_id`, `booking_id`
- `first_name`, `last_name`, `phone_number`
- `business_name`, `business_license`, `verified_status`
- `average_rating`, `total_reviews`
- `confirmed_at`, `created_at`, `start_time`, `return_time`

---

## Relationships from Diagram

### User relationships:
- **owns** → Many Items (via `ownerId`)
- **creates** → Many Merchants (via `userId`)
- **has** → Many Favorites
- **has** → Many RentalRequests (as borrower via `borrowerId`)
- **has** → Many RentalRequests (as owner via `ownerId`)

### Item relationships:
- **belongs to** → One User (owner)
- **belongs to** → One Merchant
- **has** → One Calendar
- **subject of** → Many RentalRequests

### RentalRequest relationships:
- **relates to** → One Item
- **converts to** → One Booking (0..1 relationship)
- **contains** → One Conversation

### Booking relationships:
- **labeled as** → One RentalRequest
- **rated by** → One Rating (0..1 relationship)
- **requires** → DirectBooking confirmation settings

---

## Table Component Search Configuration

Based on the actual database fields, use these search keys:

```typescript
// Users Table
searchKey="name" // Searches: firstName, lastName, email

// Items Table  
searchKey="title" // Searches: title, description

// Requests Table
searchKey="borrower" // Searches: borrower.firstName, borrower.lastName

// Bookings Table
searchKey="borrower" // Searches: request.borrower.firstName, request.borrower.lastName

// Merchants Table
searchKey="business_name" // Searches: businessName, user.firstName, user.lastName, user.email
```

---

## Common Query Patterns

### Getting Items with Owner Info:
```typescript
// Join Item with User (owner)
item.ownerId === user.userId
// Access: item.owner.firstName, item.owner.lastName
```

### Getting Requests with Item and Users:
```typescript
// Join RentalRequest with Item and Users
request.itemId === item.itemId
request.borrowerId === user.userId
request.ownerId === user.userId
// Access: request.item.title, request.borrower.firstName, request.owner.firstName
```

### Getting Bookings with Full Data:
```typescript
// Join Booking → RentalRequest → Item → User
booking.requestId === request.requestId
request.itemId === item.itemId
request.borrowerId === user.userId
// Access: booking.request.item.title, booking.request.borrower.firstName
```

---

## Notes

1. **All IDs use camelCase**: `userId`, `itemId`, `bookingId`, etc.
2. **All field names use camelCase**: `firstName`, `phoneNumber`, `businessName`, etc.
3. **Enums are UPPERCASE**: `PENDING`, `APPROVED`, `CONFIRMED`, etc.
4. **DateTime fields**: `createdAt`, `confirmedAt`, `startTime`, `returnTime`, etc.
5. **Boolean fields**: `locationEnabled`, `vacationMode`, `verifiedStatus`, `autoConfirm`, `isRead`

This matches standard JavaScript/TypeScript conventions and your database schema.
