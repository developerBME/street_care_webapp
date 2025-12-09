# Community Events Feature Guide

## Overview

The Community Events feature enables volunteers to create, discover, and participate in organized outreach events. Events are fully searchable, filterable, and support RSVP management with real-time participant tracking.

**Key Features:**
- Create events with rich details (location, skills needed, difficulty)
- Browse events with filters (date, location, difficulty)
- RSVP and manage participants
- Like/flag events for engagement and moderation
- Verify event organizers by user type badges
- Pagination for large result sets
- Event status workflow (pending → approved → archived)

**User Flow:**
```
Browse Events (/allOutreachEvents)
    ↓
Filter by date, location, or search term
    ↓
View event details (/VisitLogDetails/{eventId})
    ↓
RSVP to event (participants array updated)
    ↓
Receive confirmation email
    ↓
Event completion and logging
```

---

## 📊 Data Model

### Event Document Schema

**Collection Path:** `outreachEvents` (or `outreachEventsProd`/`outreachEventsDev`)

```javascript
{
  // Event Information
  title: String,                  // Event title
  description: String,            // Detailed description
  eventDate: Timestamp,           // Event date/time (Firestore.Timestamp)
  
  // Location
  location: {
    street: String,              // Street address
    street2: String,             // Optional address line 2
    city: String,
    state: String,
    zipcode: String,
    country: String,
    coordinates: {               // Optional (for map display)
      latitude: Number,
      longitude: Number,
    },
  },
  
  // Organizer Information
  uid: String,                    // Creator's Firebase UID
  userName: String,               // Creator's username (cached for display)
  photoUrl: String,              // Creator's profile photo
  userType: String,              // "Chapter Leader" | "Chapter Member" | etc.
  
  // Event Details
  skills: [String],              // Skills needed (e.g., ["medical", "childcare"])
  helpType: String,              // Type of help (e.g., "Food Distribution")
  difficulty: String,            // "Easy" | "Moderate" | "Challenging"
  
  // Participation
  participants: [String],        // Array of user UIDs who RSVP'd
  currentParticipants: Number,   // Count (denormalized for sorting)
  maxParticipants: Number,       // Optional capacity limit
  
  // Engagement
  likes: [String],               // Array of user UIDs who liked event
  likesCount: Number,            // Count (denormalized)
  
  // Status & Moderation
  status: String,                // "approved" | "pending" | "rejected" | "archived"
  isPublic: Boolean,             // Privacy flag
  isFlagged: Boolean,            // Flagged for moderation
  flagReason: String,            // Reason for flag (if flagged)
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
  lastModifiedTimestamp: Timestamp,
  lastActionPerformed: String,   // Admin action (e.g., "approved", "rejected")
  outreachId: String,            // Link to outreach (optional)
}
```

---

## 🔄 Core Functions

### fetchEvents - Get Paginated Events

**File:** `src/component/EventCardService.js`

**Function Signature:**
```javascript
export const fetchEvents = async (
  searchValue,           // Search term (title or description)
  city,                  // Filter by city
  startDate,             // Date range start
  endDate,               // Date range end
  isDateFilter = false,  // Whether to apply date filter
  isTimeFilter = false,  // Whether to filter past/future
  timeframe,             // "past" | "future"
  lastVisible = null,    // Cursor for pagination
  pageSize = 6,          // Events per page
  direction = "next",    // "next" | "prev"
  pageHistory = []       // For backward pagination
) => {
  // Returns: {
  //   outreachEvents: [{id, title, location, ...}, ...],
  //   lastVisible: DocumentSnapshot,
  //   pageHistory: [DocumentSnapshot, ...],
  //   totalRecords: Number,
  // }
}
```

**Usage Example:**
```javascript
import { fetchEvents } from './EventCardService';

// Get upcoming events in Brooklyn
const result = await fetchEvents(
  null,                              // no search
  'Brooklyn',                        // city filter
  null, null,                        // no date range
  false,                             // no date filter
  true,                              // filter by timeframe
  'future',                          // upcoming events
  null,                              // first page
  6                                  // 6 per page
);

console.log(result.outreachEvents);  // Array of event objects
console.log(result.totalRecords);    // Total count
```

### handleLikes - Toggle Like Status

**Function Signature:**
```javascript
export const handleLikes = async (
  eventId,              // Event document ID
  isLiked,              // Current like status
  currentUserId,        // Current user's UID
  collectionName        // Collection to update
) => {
  // Returns: {
  //   success: Boolean,
  //   newLikeStatus: Boolean,
  //   likesCount: Number,
  // }
}
```

**Usage Example:**
```javascript
import { handleLikes } from './EventCardService';

const result = await handleLikes(
  'event-123',
  false,  // Not currently liked
  'user-456',
  'outreachEvents'
);

if (result.success) {
  setIsLiked(result.newLikeStatus);
  setLikesCount(result.likesCount);
}
```

### setInitialLike - Check Initial Like Status

**Function Signature:**
```javascript
export const setInitialLike = (likesArray) => {
  // likesArray: [uid1, uid2, ...]
  // Returns: Boolean - true if current user in array
}
```

---

## 💻 Component Structure

### OutreachEventCard Component

**File:** `src/component/Community/OutreachEventCard.js`

**Props:**
```javascript
{
  cardData: {          // Event data from Firestore
    id: String,
    title: String,
    eventDate: Timestamp,
    location: Object,
    userName: String,
    photoUrl: String,
    userType: String,
    likes: [String],
    nop: Number,       // Number of participants
    label: String,     // "RSVP" | "EDIT"
  },
  isProfilePage: Boolean,  // Show different UI on profile
  isHelpRequestCard: Boolean,
  onUpdate: Function,  // Refresh callback
}
```

**Features:**
- Display event details with verified badge (by user type)
- Like/unlike toggle
- Flag event for moderation
- Share button
- RSVP / Edit button based on ownership

**Example Usage:**
```jsx
import OutreachEventCard from './Community/OutreachEventCard';

<OutreachEventCard 
  cardData={eventData}
  onUpdate={() => refreshEvents()}
/>
```

### AllOutreachEvents Component

**File:** `src/component/AllOutreachEvents.js`

**Features:**
- Search by title/description
- Filter by city
- Filter by date range
- Filter by timeframe (past/future)
- Sort options
- Cursor-based pagination
- Loading skeletons
- Error handling

**State Variables:**
```javascript
const [filteredEvents, setFilteredEvents] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [sortOption, setSortOption] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(0);
const [cursorFields, setCursorFields] = useState({
  lastVisible: null,
  pageSize: 6,
  direction: "next",
  pageHistory: [],
});
```

---

## 🧪 Testing Checklist

### Test Suite: Community Events Feature

#### 1. **Event Rendering**
- [ ] Event cards display all required fields (title, date, location)
- [ ] User badge displays (verified/unverified)
- [ ] Participant count shows correctly
- [ ] Past events show appropriate UI (disabled RSVP)

#### 2. **Event Creation**
```javascript
it("should create event with all required fields", async () => {
  const { getByRole, getByLabelText } = render(<CreateEventForm />);
  
  fireEvent.change(getByLabelText(/title/i), {
    target: { value: "Brooklyn Food Distribution" },
  });
  fireEvent.change(getByLabelText(/description/i), {
    target: { value: "Community effort..." },
  });
  fireEvent.change(getByLabelText(/location/i), {
    target: { value: "Brooklyn, NY" },
  });
  
  fireEvent.click(getByRole("button", { name: /create/i }));
  
  await waitFor(() => {
    expect(mockAddDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        title: "Brooklyn Food Distribution",
        status: "pending",
        participants: [],
      })
    );
  });
});
```

#### 3. **Event Search & Filtering**
```javascript
it("should filter events by city", async () => {
  const { getByLabelText, getByRole } = render(<AllOutreachEvents />);
  
  fireEvent.change(getByLabelText(/city/i), {
    target: { value: "Brooklyn" },
  });
  fireEvent.click(getByRole("button", { name: /search/i }));
  
  await waitFor(() => {
    expect(mockFetchEvents).toHaveBeenCalledWith(
      expect.anything(),
      "Brooklyn",  // city filter
      expect.anything()
    );
  });
});
```

#### 4. **RSVP Functionality**
```javascript
it("should add user to participants on RSVP", async () => {
  const { getByRole } = render(
    <OutreachEventCard cardData={mockEvent} />
  );
  
  const rsvpButton = getByRole("button", { name: /RSVP/i });
  fireEvent.click(rsvpButton);
  
  await waitFor(() => {
    expect(mockUpdateDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        participants: expect.arrayContaining([currentUserId]),
      })
    );
  });
});
```

#### 5. **Like/Unlike**
```javascript
it("should toggle like status", async () => {
  const { getByRole } = render(
    <OutreachEventCard cardData={mockEvent} />
  );
  
  const likeButton = getByRole("button", { name: /like/i });
  fireEvent.click(likeButton);
  
  expect(likeButton).toHaveClass("liked");
  
  fireEvent.click(likeButton);
  expect(likeButton).not.toHaveClass("liked");
});
```

#### 6. **Pagination**
```javascript
it("should load next page of events", async () => {
  const { getByRole } = render(<AllOutreachEvents />);
  
  const nextButton = getByRole("button", { name: /next/i });
  fireEvent.click(nextButton);
  
  await waitFor(() => {
    expect(mockFetchEvents).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
      mockLastVisible,  // cursor
      6,
      "next"  // direction
    );
  });
});
```

#### 7. **Event Status Workflow**
```javascript
it("should not show unapproved events to non-admins", async () => {
  const pendingEvent = { ...mockEvent, status: "pending" };
  
  const { queryByText } = render(
    <OutreachEventCard cardData={pendingEvent} />
  );
  
  expect(queryByText(pendingEvent.title)).not.toBeInTheDocument();
});
```

#### 8. **Integration Tests (Emulator)**
```javascript
it("should create and retrieve event from Firestore", async () => {
  connectFirestoreEmulator(db, 'localhost', 8080);
  
  // Create event
  const eventRef = await addDoc(
    collection(db, 'outreachEvents_dev'),
    mockEventData
  );
  
  // Retrieve
  const snapshot = await getDoc(eventRef);
  
  expect(snapshot.data()).toMatchObject(mockEventData);
});
```

---

## 🤝 Contributing & Development

### Setting Up Event Feature Development

1. **Component Files**
   - `src/component/Community/OutreachEventCard.js` - Event display card
   - `src/component/AllOutreachEvents.js` - Browse/search page
   - `src/component/Community/OutreachSignup.js` - Event details & RSVP

2. **Service Functions**
   - `src/component/EventCardService.js` - All Firestore queries
   - `src/utils/firestoreCollections.js` - Collection name mapping

3. **Data Flow**
   - User creates event → `addDoc()` to `outreachEvents`
   - Approval status set by admin
   - Others can RSVP → updates `participants` array
   - Like toggle → updates `likes` array

### Adding New Event Fields

**Example: Add volunteer skill requirement**

1. Update Firestore schema in `obj1`:
```javascript
export const eventSchema = {
  // ... existing fields ...
  requiredSkills: [String],  // NEW: e.g., ["medical", "logistics"]
}
```

2. Update form component to collect field
3. Update `EventCardService.js` if needed for queries
4. Update display component to show field
5. Add tests for new field validation
6. Update DATA_ARCHITECTURE.md

### Common Pitfalls

1. **Timestamp Handling**
   - ❌ Don't use `new Date()` directly
   - ✅ Do: Use `Timestamp.fromDate(new Date())`

2. **Pagination State**
   - ❌ Don't lose `pageHistory` on backward pagination
   - ✅ Do: Maintain cursor history in state

3. **Real-time Updates**
   - ❌ Don't assume participant count is accurate
   - ✅ Do: Fetch latest snapshot before updating

4. **RSVP Logic**
   - ❌ Don't add user twice to participants array
   - ✅ Do: Check if user already in array before adding

---

## 🔗 Related Documentation

- **Data Architecture**: [DATA_ARCHITECTURE.md](../DATA_ARCHITECTURE.md) - outreachEvents collection schema
- **Testing Guide**: [TESTING.md](../TESTING.md) - Jest and Firebase Emulator setup
- **Features Overview**: [FEATURES.md](../FEATURES.md) - All features and navigation

---

**Last Updated:** December 8, 2025  
**Component Status:** ✅ Stable  
**Test Coverage:** 🟡 Partial (needs expansion)
