# Visit Logs Feature Guide

## Overview

The Visit Logs feature tracks community interactions and outreach activities. It supports two types of logs: personal visit logs (created by volunteers) and community visit logs (visible to all). Logs include detailed information about supplies distributed, people helped, and follow-up requirements.

**Key Features:**
- Document personal outreach activities
- Track supplies distributed (food, clothing, medical, etc.)
- Record number of helpers and people helped
- Set follow-up reminders
- Approve/flag logs for moderation
- Public/private visibility controls
- Pagination and filtering
- User verification badges

**User Flow:**
```
Create Personal Visit Log
    ↓
Record supplies distributed
    ↓
Set follow-up dates
    ↓
Submit for approval
    ↓
Admin reviews and approves
    ↓
Appears in community view
```

---

## 📊 Data Models

### Visit Log Document Schema (New)

**Collection Path:** `visitLogsBookNew` (or `visitLogProd`/`visitLogNewDev`)

```javascript
{
  // User Information
  uid: String,                    // Volunteer's Firebase UID
  userName: String,              // Volunteer's username (cached)
  photoUrl: String,              // Volunteer's profile photo
  userType: String,              // User verification level
  
  // Interaction Details
  whatWasProvided: [String],      // Items/services (e.g., ["food", "clothing"])
  numOfSuppliesDisbursed: {
    clothing: Number,
    food: Number,
    hygiene: Number,
    medical: Number,
    other: Number,
  },
  numOfHelpers: Number,           // Number of volunteers involved
  helpDescription: String,        // Free-text description of activity
  
  // Location
  location: {
    city: String,
    state: String,
    zipcode: String,
    street: String,              // Optional
    landmark: String,            // Optional (e.g., "Under bridge")
  },
  
  // Timestamps
  timeStamp: Timestamp,           // When logged
  followUpDate: Timestamp,        // When to follow up (optional)
  
  // Status & Visibility
  status: String,                 // "approved" | "pending" | "rejected"
  isPublic: Boolean,              // Privacy flag
  isFlagged: Boolean,             // Flagged for moderation
  flagReason: String,             // Reason for flag
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
}
```

### Visit Log Document Schema (Legacy)

**Collection Path:** `visitLogs` (or `visitLogWebProd`/`visitLogWebDev`)

```javascript
{
  // Same structure as visitLogsBookNew
  // Currently being migrated to new schema
  // Keep for backward compatibility
}
```

---

## 🔄 Core Functions

### fetchVisitLogs - Get Paginated Community Logs

**File:** `src/component/VisitLogCardService.js`

**Function Signature:**
```javascript
export const fetchVisitLogs = async (
  pageSize = 6,           // Logs per page
  lastVisible = null,     // Cursor for pagination
  direction = "next",     // "next" | "prev"
  pageHistory = [],       // Backward pagination history
  filters = {}            // Optional filters (city, status, etc.)
) => {
  // Returns: {
  //   visitLogs: [{id, userName, location, ...}, ...],
  //   lastVisible: DocumentSnapshot,
  //   pageHistory: [DocumentSnapshot, ...],
  //   totalRecords: Number,
  // }
}
```

**Usage Example:**
```javascript
import { fetchVisitLogs } from './VisitLogCardService';

// Get approved community logs, paginated
const result = await fetchVisitLogs(
  6,      // 6 logs per page
  null,   // first page
  "next",
  []      // no history yet
);

console.log(result.visitLogs);   // Array of log objects
console.log(result.totalRecords); // Total count
```

### fetchPersonalVisitLogss - Get User's Personal Logs

**Function Signature:**
```javascript
export const fetchPersonalVisitLogss = async (
  uid,                    // User's UID
  pageSize = 3,           // Logs per page
  lastVisible = null,     // Cursor
  direction = "next",     // Direction
  pageHistory = []        // History
) => {
  // Returns: {
  //   visitLogs: [{id, ..., status: "approved"}, ...],
  //   lastVisible: DocumentSnapshot,
  //   pageHistory: [DocumentSnapshot, ...],
  // }
}
```

**Usage Example:**
```javascript
import { fetchPersonalVisitLogss } from './VisitLogCardService';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const uid = auth.currentUser.uid;

const result = await fetchPersonalVisitLogss(uid, 3);
console.log(result.visitLogs); // User's approved logs only
```

### fetchPersonalVisitLogById - Get Single Log with Details

**Function Signature:**
```javascript
export const fetchPersonalVisitLogById = async (logId) => {
  // Returns: {
  //   id: String,
  //   userName: String,
  //   whatWasProvided: [String],
  //   numOfSuppliesDisbursed: Object,
  //   helpDescription: String,
  //   location: Object,
  //   timeStamp: Timestamp,
  //   status: String,
  //   ...
  // }
}
```

### PersonalVisitLogsCount - Get User's Log Count

**Function Signature:**
```javascript
export const PersonalVisitLogsCount = async (uid) => {
  // Returns: Number (count of approved logs)
}
```

---

## 💻 Component Structure

### OutreachVisitLogCard Component

**File:** `src/component/Community/OutreachVisitLogCard.js`

**Props:**
```javascript
{
  visitLogCardData: {
    id: String,
    userName: String,
    photoUrl: String,
    userType: String,
    helpDescription: String,
    whatWasProvided: [String],
    location: Object,
    timeStamp: Timestamp,
    numOfHelpers: Number,
    isFlagged: Boolean,
  },
}
```

**Features:**
- Display volunteer info with verification badge
- Show supplies distributed
- Display location and timestamp
- Flag/unflag button
- View details button
- Responsive design

### PersonalVisitLogDetails Component

**File:** `src/component/Community/PersonalVisitLogDetails.js`

**Features:**
- Full log details view
- Edit/delete for owner
- Follow-up date tracking
- Delete confirmation modal
- Back navigation

**State Variables:**
```javascript
const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [showDeleteModal, setShowDeleteModal] = useState(false);
```

### OutreachVisitLogProfile Component

**File:** `src/component/Community/OutreachVisitLogProfile.js`

**Features:**
- Show user's personal logs on profile
- Pagination with forward/backward
- Delete capability
- Empty state handling

---

## 🧪 Testing Checklist

### Test Suite: Visit Logs Feature

#### 1. **Visit Log Creation**
- [ ] Form accepts all required fields
- [ ] Supplies count validates (numbers only)
- [ ] Location city/state required
- [ ] Timestamp defaults to current date
- [ ] Follow-up date is optional

```javascript
it("should create visit log with supplies", async () => {
  const { getByLabelText, getByRole } = render(<CreateVisitLogForm />);
  
  fireEvent.change(getByLabelText(/supplies/i), {
    target: { value: "food,clothing" },
  });
  fireEvent.change(getByLabelText(/city/i), {
    target: { value: "Brooklyn" },
  });
  fireEvent.change(getByLabelText(/helpers/i), {
    target: { value: "2" },
  });
  
  fireEvent.click(getByRole("button", { name: /submit/i }));
  
  await waitFor(() => {
    expect(mockAddDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        whatWasProvided: expect.arrayContaining(["food", "clothing"]),
        numOfHelpers: 2,
      })
    );
  });
});
```

#### 2. **Visit Log Pagination**
```javascript
it("should paginate through visit logs", async () => {
  const { getByRole } = render(<AllOutreachVisitLog />);
  
  // Wait for first page load
  await waitFor(() => {
    expect(getByRole("button", { name: /next/i })).toBeEnabled();
  });
  
  // Click next
  fireEvent.click(getByRole("button", { name: /next/i }));
  
  // Verify next page loaded
  await waitFor(() => {
    expect(mockFetchVisitLogs).toHaveBeenCalledTimes(2);
  });
});
```

#### 3. **Flag/Unflag Functionality**
```javascript
it("should toggle flag status", async () => {
  const { getByRole } = render(
    <OutreachVisitLogCard visitLogCardData={mockLog} />
  );
  
  const flagButton = getByRole("button", { name: /flag/i });
  fireEvent.click(flagButton);
  
  await waitFor(() => {
    expect(mockUpdateDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ isFlagged: true })
    );
  });
});
```

#### 4. **Personal Logs Visibility**
```javascript
it("should show only approved personal logs", async () => {
  const pendingLog = { ...mockLog, status: "pending" };
  const approvedLog = { ...mockLog, status: "approved" };
  
  mockFetchPersonalVisitLogss.mockResolvedValueOnce({
    visitLogs: [approvedLog],  // Only approved shown to user
  });
  
  const { getByText, queryByText } = render(
    <OutreachVisitLogProfile />
  );
  
  await waitFor(() => {
    expect(getByText(approvedLog.helpDescription)).toBeInTheDocument();
    expect(queryByText(pendingLog.helpDescription)).not.toBeInTheDocument();
  });
});
```

#### 5. **Delete Log**
```javascript
it("should delete log with confirmation", async () => {
  const { getByRole, getByText } = render(
    <PersonalVisitLogDetails />
  );
  
  fireEvent.click(getByRole("button", { name: /delete/i }));
  
  // Modal appears
  await waitFor(() => {
    expect(getByText(/are you sure/i)).toBeInTheDocument();
  });
  
  // Confirm delete
  fireEvent.click(getByRole("button", { name: /confirm/i }));
  
  // Verify deletion
  await waitFor(() => {
    expect(mockDeleteDoc).toHaveBeenCalled();
  });
});
```

#### 6. **User Association**
```javascript
it("should link log to user document", async () => {
  // Create log
  mockAddDoc.mockResolvedValueOnce({ id: 'log-123' });
  
  // ...submit form...
  
  await waitFor(() => {
    // Verify user.personalVisitLogs updated
    expect(mockUpdateDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        personalVisitLogs: expect.arrayContaining(['log-123']),
      })
    );
  });
});
```

#### 7. **Supplies Tracking**
```javascript
it("should aggregate supplies in numOfSuppliesDisbursed", async () => {
  const { getByLabelText, getByRole } = render(<CreateVisitLogForm />);
  
  fireEvent.change(getByLabelText(/food/i), {
    target: { value: "10" },
  });
  fireEvent.change(getByLabelText(/clothing/i), {
    target: { value: "5" },
  });
  fireEvent.change(getByLabelText(/medical/i), {
    target: { value: "3" },
  });
  
  fireEvent.click(getByRole("button", { name: /submit/i }));
  
  await waitFor(() => {
    expect(mockAddDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        numOfSuppliesDisbursed: {
          food: 10,
          clothing: 5,
          medical: 3,
        },
      })
    );
  });
});
```

#### 8. **Integration Tests**
```javascript
it("should create and retrieve visit log end-to-end", async () => {
  connectFirestoreEmulator(db, 'localhost', 8080);
  
  // Create log
  const logRef = await addDoc(
    collection(db, 'visitLogNewDev'),
    mockLogData
  );
  
  // Retrieve
  const snapshot = await getDoc(logRef);
  
  expect(snapshot.data()).toMatchObject(mockLogData);
  
  // Update user document
  const userRef = doc(db, 'users', 'user-123');
  await updateDoc(userRef, {
    personalVisitLogs: arrayUnion(logRef.id),
  });
  
  // Verify user association
  const userSnap = await getDoc(userRef);
  expect(userSnap.data().personalVisitLogs).toContain(logRef.id);
});
```

---

## 🤝 Contributing & Development

### Feature Components

1. **Create/Edit**
   - Form validation for supplies
   - Location picker or text input
   - Follow-up date selector
   - Submit button with loading state

2. **Display**
   - Card component for list view
   - Detail view for full information
   - Verified badge by user type
   - Flag button for moderation

3. **Management**
   - Edit capability for owner
   - Delete with confirmation
   - Pagination controls
   - Filter options

### Adding New Supply Types

**Example: Add "Pet Supplies" to tracking**

1. Update schema in `visitLogsBookNew`:
```javascript
numOfSuppliesDisbursed: {
  // ... existing types ...
  petSupplies: Number,  // NEW
}
```

2. Add to form component
3. Update display component
4. Add validation test
5. Update docs

### Common Pitfalls

1. **User Association**
   - ❌ Don't forget to link log ID to user.personalVisitLogs
   - ✅ Do: Update user document after creating log

2. **Status Filtering**
   - ❌ Don't show pending logs to non-owners
   - ✅ Do: Filter by status="approved" in queries

3. **Pagination Cursor**
   - ❌ Don't lose cursor on page reload
   - ✅ Do: Store cursor in component state/URL

4. **Supplies Validation**
   - ❌ Don't allow negative numbers
   - ✅ Do: Validate input with regex or type="number"

---

## 🔗 Related Documentation

- **Data Architecture**: [DATA_ARCHITECTURE.md](../DATA_ARCHITECTURE.md) - visitLogsBookNew schema
- **Interaction Logging**: [INTERACTION_LOGGING.md](./INTERACTION_LOGGING.md) - Similar logging feature
- **Testing Guide**: [TESTING.md](../TESTING.md) - Jest and Firestore emulator setup

---

**Last Updated:** December 8, 2025  
**Component Status:** ✅ Stable  
**Test Coverage:** 🟡 Partial (expand integration tests)
