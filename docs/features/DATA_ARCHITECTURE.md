# Data Architecture & Firestore Schema Reference

## Overview

This document is a comprehensive reference for all Firestore collections in Street Care, including their schema, relationships, indexing requirements, and environment-specific configurations.

---

## 📊 Collection Summary

| Collection | Purpose | Records | Environment | Main Collection |
|-----------|---------|---------|-------------|-----------------|
| **users** | User profiles, auth, settings | ~500 | Both | users |
| **outreachEvents** | Community outreach events | ~1000 | Main: `outreachEventsProd`, Dev: `outreachEventsDev` | ✅ Production |
| **interactionLog** | Volunteer interaction logs | ~2000 | Main: `interactionLog`, Dev: `interactionLogDev` | ✅ Production |
| **helpRequests** | Individual help requests (linked to interactions) | ~5000 | Main: `helpRequests`, Dev: `helpRequestsInteractionLogDev` | ✅ Production |
| **visitLogs** | Community visit logs (legacy) | ~800 | Main: `visitLogWebProd`, Dev: `visitLogWebDev` | ⚠️ Migrating |
| **visitLogsBookNew** | Visit logs (new schema) | ~1500 | Main: `visitLogProd`, Dev: `visitLogNewDev` | ✅ Production |
| **adminUsers** | Admin role assignments | ~10 | Both | adminUsers |
| **bannedUser** | Banned user tracking | ~5 | Both | bannedUser |
| **bmeEvents** | BME official events | ~100 | Both | bmeEventsCollection |
| **officialEvents** | Official calendar events | ~200 | Both | officialEventsCollection |
| **contacts** | Contact form submissions | ~500 | Both | contacts |
| **auditLog** | Admin action audit trail | ~10000 | Both | auditLog |
| **testUser** | Test accounts | ~20 | Dev only | testUser |

---

## 🏗️ Schema Reference

### 1. users Collection

**Path:** `/users/{uid}`

**Document Structure:**
```javascript
{
  // Authentication
  uid: String,                    // Firebase Auth UID (document ID)
  email: String,                  // User email
  emailVerified: Boolean,         // Email verification status
  
  // Profile Information
  username: String,               // Display name
  photoUrl: String,              // Profile photo URL
  phoneNumber: String,           // Contact phone
  
  // User Type & Role
  Type: String,                   // "Admin" | "Chapter Leader" | "Chapter Member" | "Street Care Hub Leader" | "Community Member"
  isAdmin: Boolean,               // Quick admin check
  
  // Activity Tracking
  personalVisitLogs: [String],    // Array of visit log document IDs
  personalInteractionLogs: [String], // Array of interaction log IDs
  createdEvents: [String],        // Array of created outreach event IDs
  likedEvents: [String],          // Array of liked event IDs
  signedUpEvents: [String],       // Array of RSVP'd event IDs
  
  // Preferences & Settings
  notificationPreferences: {
    emailNotifications: Boolean,
    eventReminders: Boolean,
    weeklyReport: Boolean,
  },
  
  // Metadata
  createdAt: Timestamp,           // Account creation date
  lastActiveAt: Timestamp,        // Last login/activity
  accountStatus: String,          // "active" | "suspended" | "deleted"
}
```

**Indexes Required:**
- Compound: `(email, uid)` for user lookups
- Simple: `Type` for filtering by user type

**Example Document:**
```json
{
  "uid": "user-12345",
  "email": "john.smith@example.com",
  "emailVerified": true,
  "username": "John Smith",
  "photoUrl": "https://storage.googleapis.com/.../john.jpg",
  "phoneNumber": "+15551234567",
  "Type": "Chapter Leader",
  "isAdmin": false,
  "personalVisitLogs": ["visit-001", "visit-002"],
  "personalInteractionLogs": ["interaction-001"],
  "createdEvents": ["event-001", "event-002"],
  "likedEvents": ["event-005", "event-010"],
  "signedUpEvents": ["event-003", "event-004"],
  "notificationPreferences": {
    "emailNotifications": true,
    "eventReminders": true,
    "weeklyReport": true
  },
  "createdAt": Timestamp("2023-06-15T10:30:00Z"),
  "lastActiveAt": Timestamp("2024-12-08T14:22:00Z"),
  "accountStatus": "active"
}
```

---

### 2. outreachEvents Collection

**Path:** `/outreachEvents/{eventId}` (or `/outreachEventsProd/{eventId}`)

**Document Structure:**
```javascript
{
  // Event Information
  title: String,                  // Event title
  description: String,            // Detailed description
  eventDate: Timestamp,           // Event date/time
  
  // Location
  location: {
    street: String,
    street2: String,             // Optional
    city: String,
    state: String,
    zipcode: String,
    country: String,
    coordinates: {               // Optional geolocation
      latitude: Number,
      longitude: Number,
    },
  },
  
  // Organizer
  uid: String,                    // Creator's Firebase UID
  userName: String,               // Creator's username (cache)
  photoUrl: String,               // Creator's photo (cache)
  userType: String,               // Creator's user type
  
  // Event Details
  skills: [String],               // Skills needed (e.g., ["medical", "childcare"])
  helpType: String,               // Type of help provided
  difficulty: String,             // "Easy" | "Moderate" | "Challenging"
  
  // Participation
  participants: [String],         // Array of user UIDs (RSVP'd)
  currentParticipants: Number,    // Count (denormalization for sorting)
  maxParticipants: Number,        // Optional capacity limit
  
  // Status & Visibility
  status: String,                 // "approved" | "pending" | "rejected" | "archived"
  isPublic: Boolean,              // Privacy flag
  isFlagged: Boolean,             // Moderation flag
  flagReason: String,             // Reason for flag (optional)
  
  // Engagement
  likes: [String],                // Array of user UIDs who liked event
  likesCount: Number,             // Count (denormalization)
  comments: [Object],             // Optional comments
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
  lastModifiedTimestamp: Timestamp,
  lastActionPerformed: String,    // Admin action (e.g., "approved", "flagged")
  outreachId: String,             // Link to outreach (optional)
}
```

**Indexes Required:**
- Simple: `status` (for approved/pending/archived queries)
- Simple: `eventDate` (for sorting upcoming events)
- Compound: `(status, eventDate)` for filtered event lists
- Simple: `isFlagged` (for moderation queue)

**Example Document:**
```json
{
  "title": "Brooklyn Community Food Distribution",
  "description": "Community effort to distribute food and necessities...",
  "eventDate": Timestamp("2024-12-15T17:00:00Z"),
  "location": {
    "street": "123 Main Street",
    "city": "Brooklyn",
    "state": "NY",
    "zipcode": "11201",
    "country": "USA",
    "coordinates": {
      "latitude": 40.7128,
      "longitude": -74.0060
    }
  },
  "uid": "user-12345",
  "userName": "John Smith",
  "photoUrl": "https://...",
  "userType": "Chapter Leader",
  "skills": ["logistics", "community_outreach"],
  "helpType": "Food Distribution",
  "difficulty": "Moderate",
  "participants": ["user-001", "user-002", "user-003"],
  "currentParticipants": 3,
  "maxParticipants": 20,
  "status": "approved",
  "isPublic": true,
  "isFlagged": false,
  "likes": ["user-010", "user-015"],
  "likesCount": 2,
  "createdAt": Timestamp("2024-12-01T09:00:00Z"),
  "updatedAt": Timestamp("2024-12-08T14:00:00Z"),
  "lastModifiedTimestamp": Timestamp("2024-12-08T14:00:00Z"),
  "lastActionPerformed": "approved"
}
```

---

### 3. interactionLog Collection

**Path:** `/interactionLog/{logId}` (or `/interactionLogDev/{logId}`)

**Document Structure:**
```javascript
{
  // User Information
  userId: String,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  
  // Timestamps
  startTimestamp: Timestamp,      // When volunteer started
  endTimestamp: Timestamp,        // When volunteer ended
  interactionDate: Timestamp,     // Date of interaction
  
  // Location
  addr1: String,
  addr2: String,
  city: String,
  state: String,
  zipcode: String,
  country: String,
  
  // Interaction Details
  listOfSupportsProvided: [String],  // Types of help (e.g., ["food", "medical"])
  numPeopleHelped: Number,
  numPeopleJoined: Number,
  carePackagesDistributed: Number,
  carePackageContents: Object,    // { clothing: 5, food: 3, ... }
  
  // Help Requests (linked)
  helpRequestCount: Number,
  helpRequestDocIds: [String],    // References to helpRequests documents
  
  // Status & Visibility
  isPublic: Boolean,
  status: String,                 // "Pending" | "Approved" | "Completed"
  
  // Metadata
  lastModifiedTimestamp: Timestamp,
  lastActionPerformed: String,    // Admin action
  outreachId: String,             // Link to event (optional)
}
```

**Indexes Required:**
- Simple: `status` (for filtering by status)
- Simple: `userId` (for user's interaction history)
- Compound: `(userId, interactionDate)` for sorted history

**Example Document:**
```json
{
  "userId": "user-12345",
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@example.com",
  "phoneNumber": "+15551234567",
  "startTimestamp": Timestamp("2024-12-08T14:00:00Z"),
  "endTimestamp": Timestamp("2024-12-08T16:00:00Z"),
  "interactionDate": Timestamp("2024-12-08T14:00:00Z"),
  "addr1": "Central Park",
  "addr2": "Bench area",
  "city": "New York",
  "state": "NY",
  "zipcode": "10024",
  "country": "USA",
  "listOfSupportsProvided": ["food", "clothing", "medical_info"],
  "numPeopleHelped": 3,
  "numPeopleJoined": 2,
  "carePackagesDistributed": 3,
  "carePackageContents": {
    "clothing": 5,
    "food": 10,
    "hygiene": 3
  },
  "helpRequestCount": 2,
  "helpRequestDocIds": ["help-001", "help-002"],
  "isPublic": true,
  "status": "Pending",
  "lastModifiedTimestamp": Timestamp("2024-12-08T16:30:00Z"),
  "lastActionPerformed": null
}
```

---

### 4. helpRequests Collection

**Path:** `/helpRequests/{helpId}` (or `/helpRequestsInteractionLogDev/{helpId}`)

**Document Structure:**
```javascript
{
  // Links to Parent
  interactionLogDocId: String,    // Parent interaction log ID
  interactionLogFirstName: String, // Cached for display
  
  // Individual Information
  firstName: String,              // Person's name
  locationLandmark: String,       // Where person was located
  
  // Timestamps
  timestampOfInteraction: Timestamp,
  followUpTimestamp: Timestamp,   // When to follow up
  
  // Help Categories
  helpProvidedCategory: [String], // What was provided
  furtherHelpCategory: [String],  // What they still need
  
  // Details
  additionalDetails: String,      // Free-text description
  
  // Status
  isPublic: Boolean,
  status: String,                 // "pending" | "completed"
  isCompleted: Boolean,
  completedTimestamp: String,
  
  // Metadata
  lastModifiedTimestamp: Timestamp,
  lastActionPerformed: String,
}
```

**Indexes Required:**
- Simple: `interactionLogDocId` (for querying all help requests for an interaction)
- Simple: `status` (for filtering by completion)
- Compound: `(interactionLogDocId, status)` for complex queries

**Example Document:**
```json
{
  "interactionLogDocId": "log-001",
  "interactionLogFirstName": "John",
  "firstName": "Maria",
  "locationLandmark": "Under the bridge on 5th Ave",
  "timestampOfInteraction": Timestamp("2024-12-08T14:30:00Z"),
  "followUpTimestamp": Timestamp("2024-12-15T14:00:00Z"),
  "helpProvidedCategory": ["food", "medical_info"],
  "furtherHelpCategory": ["housing", "job_training"],
  "additionalDetails": "Maria is new to NYC. Needs help finding shelter programs and job opportunities.",
  "isPublic": true,
  "status": "pending",
  "isCompleted": false,
  "lastModifiedTimestamp": Timestamp("2024-12-08T16:30:00Z"),
  "lastActionPerformed": null
}
```

---

### 5. visitLogsBookNew Collection

**Path:** `/visitLogsBookNew/{logId}` (or `/visitLogProd/{logId}`)

**Document Structure:**
```javascript
{
  // User Information
  uid: String,                    // Volunteer's UID
  userName: String,              // Volunteer's name (cache)
  photoUrl: String,              // Volunteer's photo
  userType: String,              // User type for verification badge
  
  // Interaction Details
  whatWasProvided: [String],      // Items/services provided
  numOfSuppliesDisbursed: Object, // { clothing: 5, food: 3, ... }
  numOfHelpers: Number,           // Number of volunteers
  helpDescription: String,        // Description of help
  
  // Location
  location: {
    city: String,
    state: String,
    zipcode: String,
    street: String,
  },
  
  // Timestamps
  timeStamp: Timestamp,           // When logged
  
  // Status & Visibility
  status: String,                 // "approved" | "pending" | "rejected"
  isPublic: Boolean,
  isFlagged: Boolean,             // For moderation
  flagReason: String,
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
}
```

**Indexes Required:**
- Simple: `status` (for filtering approved logs)
- Simple: `uid` (for user's visit history)
- Simple: `timeStamp` (for chronological sorting)

---

### 6. adminUsers Collection

**Path:** `/adminUsers/{uid}`

**Document Structure:**
```javascript
{
  uid: String,                    // Firebase UID (document ID)
  email: String,                  // Admin email
  role: String,                   // "super_admin" | "moderator" | "support"
  permissions: {
    canApproveEvents: Boolean,
    canModerateUsers: Boolean,
    canViewAuditLog: Boolean,
    canManageAdmins: Boolean,
  },
  addedAt: Timestamp,
  addedBy: String,                // UID of who added this admin
}
```

---

### 7. auditLog Collection

**Path:** `/auditLog/{entryId}`

**Document Structure:**
```javascript
{
  // Admin Information
  adminUid: String,               // Who performed the action
  adminEmail: String,
  
  // Action
  action: String,                 // "approved_event" | "flagged_user" | etc.
  targetType: String,             // "event" | "user" | "interaction_log"
  targetId: String,               // ID of affected document
  targetDetails: Object,          // Snapshot of what changed
  
  // Change Details
  previousValue: Object,
  newValue: Object,
  reason: String,                 // Why action was taken
  
  // Metadata
  timestamp: Timestamp,
  ipAddress: String,              // IP of admin (optional)
  userAgent: String,              // Browser info (optional)
}
```

**Indexes Required:**
- Simple: `action` (for filtering by action type)
- Simple: `timestamp` (for time-based queries)
- Compound: `(targetType, targetId)` for object history

---

## 🔗 Data Relationships

### Relationship Diagram

```
┌─────────────────┐
│     users       │
├─────────────────┤
│ uid (PK)        │
│ email           │────┐
│ Type            │    │
│ photoUrl        │    │
│ ... many arrays │    │
└─────────────────┘    │
        │              │
        │ creates      │
        └──────────────┐
                       │
    ┌──────────────────▼──────────────────┐
    │      outreachEvents                 │
    ├────────────────────────────────────┤
    │ eventId (PK)                       │
    │ uid (FK) → users.uid               │
    │ participants: [uid]                │
    │ status                             │
    │ eventDate                          │
    └────────────────────────────────────┘
                       │
                       │ RSVP
                       │
    ┌──────────────────────────────────────┐
    │    interactionLog                    │
    ├──────────────────────────────────────┤
    │ logId (PK)                          │
    │ userId (FK) → users.uid             │
    │ helpRequestDocIds: [helpId]         │
    │ status                              │
    └──────────────────────────────────────┘
                       │
                       │ links to
                       │
    ┌──────────────────▼──────────────────┐
    │      helpRequests                   │
    ├────────────────────────────────────┤
    │ helpId (PK)                        │
    │ interactionLogDocId (FK) → logId   │
    │ status                             │
    │ followUpTimestamp                  │
    └────────────────────────────────────┘
```

---

## 🌍 Environment Configuration

### Collection Name Mapping

**File:** `src/utils/firestoreCollections.js`

```javascript
const COLLECTIONS = {
  main: {
    users: "users",
    outreachEvents: "outreachEventsProd",
    visitLogs: "visitLogWebProd",
    visitLogsBookNew: "visitLogProd",
    interactionLog: "interactionLog",
    helpRequestsInteractionLog: "helpRequests",
    adminUsers: "adminUsers",
    bannedUser: "bannedUser",
    auditLog: "auditLog",
    // ... more
  },
  development: {
    users: "users",
    outreachEvents: "outreachEventsDev",
    visitLogs: "visitLogWebDev",
    visitLogsBookNew: "visitLogNewDev",
    interactionLog: "interactionLogDev",
    helpRequestsInteractionLog: "helpRequestsInteractionLogDev",
    // ... more
  },
};

const env = process.env.REACT_APP_ENV || "main";
const collectionMapping = env === "main" ? COLLECTIONS.main : COLLECTIONS.development;
```

### Usage in Components

```javascript
import collectionMapping from "../../utils/firestoreCollections";

const interactionLog_collection = collectionMapping.interactionLog;
// Uses either "interactionLog" (prod) or "interactionLogDev" (dev)
```

---

## 📝 Data Flow Examples

### Example 1: Create Event → RSVP → Log Interaction

```
1. User creates event
   └─→ outreachEvents/{eventId} created
       ├─ uid: user-123
       ├─ status: "pending"
       └─ participants: []

2. Event approved by admin
   └─→ outreachEvents/{eventId}.status = "approved"
   └─→ auditLog entry created

3. Users RSVP
   └─→ outreachEvents/{eventId}.participants += [user-456, user-789]
   └─→ users/user-456.signedUpEvents += [eventId]

4. User logs interaction after event
   └─→ interactionLog/{logId} created
       ├─ userId: user-456
       └─ status: "Pending"
   └─→ users/user-456.personalInteractionLogs += [logId]

5. Admin approves interaction
   └─→ interactionLog/{logId}.status = "Approved"
   └─→ auditLog entry created
```

### Example 2: Interaction with Multiple Help Requests

```
1. Volunteer fills interaction form with 2 people
   └─→ STEP 1: interactionLog/{logId} created
       ├─ helpRequestCount: null
       └─ helpRequestDocIds: []
   
2. STEP 2: Create help requests
   └─→ helpRequests/help-001 created
       ├─ interactionLogDocId: logId
       └─ firstName: "Maria"
   └─→ helpRequests/help-002 created
       ├─ interactionLogDocId: logId
       └─ firstName: "James"

3. STEP 3: Link documents (backref)
   └─→ interactionLog/{logId} updated
       ├─ helpRequestDocIds: ["help-001", "help-002"]
       └─ helpRequestCount: 2

4. Query all interactions with details
   └─→ Get interactionLog/{logId}
   └─→ Get helpRequests where interactionLogDocId == logId
   └─→ Return enriched object with all help requests
```

---

## 🎯 Query Patterns

### Common Queries

**Get user's outreach events:**
```javascript
const userEventsQuery = query(
  collection(db, outreachEvents_collection),
  where("uid", "==", userId),
  orderBy("eventDate", "desc")
);
```

**Get approved events for this month:**
```javascript
const monthStart = new Date("2024-12-01");
const monthEnd = new Date("2024-12-31");

const eventsQuery = query(
  collection(db, outreachEvents_collection),
  where("status", "==", "approved"),
  where("eventDate", ">=", Timestamp.fromDate(monthStart)),
  where("eventDate", "<=", Timestamp.fromDate(monthEnd)),
  orderBy("eventDate", "asc")
);
```

**Get interaction logs with help requests:**
```javascript
// Get interaction log
const logSnap = await getDoc(doc(db, interactionLog_collection, logId));
const logData = logSnap.data();

// Get all linked help requests
const helpRequestsQuery = query(
  collection(db, helpRequest_collection),
  where("interactionLogDocId", "==", logId)
);
const helpsSnap = await getDocs(helpRequestsQuery);

// Combine
const enrichedLog = {
  ...logData,
  helpRequests: helpsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
};
```

---

## 🔐 Security Considerations

### Firestore Security Rules

```javascript
match /databases/{database}/documents {
  match /users/{uid} {
    // Users can read/write their own document
    allow read, write: if request.auth.uid == uid;
    
    // Admins can read all
    allow read: if isAdmin(request.auth.uid);
  }
  
  match /outreachEvents/{eventId} {
    // Anyone can read approved events
    allow read: if resource.data.status == "approved";
    
    // Creator can edit
    allow write: if request.auth.uid == resource.data.uid;
    
    // Admins can moderate
    allow write: if isAdmin(request.auth.uid);
  }
  
  match /auditLog/{entryId} {
    // Only admins can read/write
    allow read, write: if isAdmin(request.auth.uid);
  }
}

function isAdmin(uid) {
  return exists(/databases/$(database)/documents/adminUsers/$(uid));
}
```

---

## 📈 Scalability Considerations

### Current Limits & Recommendations

| Item | Current | Recommendation |
|------|---------|-----------------|
| Document Size | < 1MB | Keep < 500KB |
| Collection Size | < 100k docs | Archive old records |
| Array Size | < 20k | Use sub-collections if >1000 |
| Write Rate | ~100/sec | Distribute writes across days |
| Read Rate | ~1000/sec | Implement caching |

### Optimization Strategies

1. **Denormalization:** Cache frequently accessed data (username, photoUrl)
2. **Sub-collections:** Use for unbounded arrays (comments, detailed logs)
3. **Pagination:** Cursor-based pagination for large result sets
4. **Indexing:** Create compound indexes for common filter+sort patterns
5. **Archival:** Move old records to archive collections

---

## 🔗 Related Documentation

- **Interaction Logging**: [INTERACTION_LOGGING.md](./features/INTERACTION_LOGGING.md)
- **Cloud Functions**: [CLOUD_FUNCTIONS.md](./CLOUD_FUNCTIONS.md)
- **Testing**: [TESTING.md](./TESTING.md)

---

**Last Updated:** December 8, 2025  
**Firestore SDK:** 9.0+  
**Total Collections:** 13
