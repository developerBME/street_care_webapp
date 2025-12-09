# Admin Dashboard Feature Guide

## Overview

The Admin Dashboard provides administrative controls for managing community events, moderating user-generated content, approving volunteer contributions, and monitoring platform activity. Only users with admin privileges can access these features.

**Key Features:**
- Event approval workflow
- User moderation and banning
- Content flagging and review
- Admin role management
- Audit trail logging
- Dashboard statistics
- Batch operations
- User activity monitoring

**Admin Flow:**
```
Access Admin Dashboard
    ↓
View pending approvals
    ↓
Review flagged content
    ↓
Manage users (ban/suspend)
    ↓
View audit logs
    ↓
Generate reports
```

---

## 📊 Data Models

### Admin User Document Schema

**Collection Path:** `adminUsers` (or `adminUsersProd`/`adminUsersDev`)

```javascript
{
  // Identity
  uid: String,                        // Firebase UID (document ID)
  email: String,                      // Admin email
  
  // Permissions
  role: String,                       // "moderator" | "admin" | "super_admin"
  permissions: [String],              // ["approve_events", "ban_users", ...]
  
  // Activity
  assignedModeration: [String],       // Event/log IDs assigned for review
  actionsHistory: [                   // Array of moderation actions
    {
      actionType: String,             // "approved", "rejected", "banned"
      targetId: String,               // Event/user ID
      targetType: String,             // "event", "user", "log"
      timestamp: Timestamp,
      reason: String,
    }
  ],
  
  // Status
  isActive: Boolean,
  lastLogin: Timestamp,
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
}
```

### Audit Log Document Schema

**Collection Path:** `auditLog` (or `auditLogProd`/`auditLogDev`)

```javascript
{
  // Action Details
  actionId: String,                   // Unique action identifier
  actionType: String,                 // "event_approved", "user_banned", etc.
  actionCategory: String,             // "moderation", "system", "admin"
  description: String,                // Human-readable description
  
  // Actor
  adminUid: String,                   // Admin who performed action
  adminEmail: String,                 // Admin email (cached)
  
  // Target
  targetId: String,                   // Resource affected (event, user, etc.)
  targetType: String,                 // "event", "user", "log"
  targetDetails: {                    // Snapshot of resource before change
    name: String,
    owner: String,
    status: String,
  },
  
  // Change Details
  oldValue: Object,                   // Previous state
  newValue: Object,                   // New state
  changeReason: String,               // Why change was made
  
  // Metadata
  timestamp: Timestamp,
  ipAddress: String,                  // Admin's IP for security
  userAgent: String,                  // Browser/client info
}
```

### Banned User Document Schema

**Collection Path:** `bannedUser` (or `bannedUserProd`/`bannedUserDev`)

```javascript
{
  // Identity
  uid: String,                        // Banned user's UID (document ID)
  email: String,                      // User's email
  username: String,                   // User's display name
  
  // Ban Details
  banReason: String,                  // Reason for ban
  banDetails: {
    banType: String,                  // "temporary" | "permanent"
    startDate: Timestamp,
    endDate: Timestamp,               // null for permanent
    duration: Number,                 // Days (for reference)
  },
  
  // Ban Authority
  bannedBy: String,                   // Admin UID who issued ban
  bannedByEmail: String,              // Admin email
  
  // Data
  bannedContent: [String],            // IDs of banned posts/events
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
}
```

---

## 🔄 Core Functions

### fetchAdminDashboard - Get Admin Overview

**File:** `src/component/Admin/AdminHelper.js`

**Function Signature:**
```javascript
export const fetchAdminDashboard = async (adminUid) => {
  // Returns: {
  //   pendingEventsCount: Number,
  //   flaggedContentCount: Number,
  //   recentModeration: [Object],
  //   adminStats: {
  //     totalActionsThisMonth: Number,
  //     eventsApproved: Number,
  //     usersBanned: Number,
  //   },
  //   recentAuditLogs: [Object],
  // }
}
```

**Usage Example:**
```javascript
import { fetchAdminDashboard } from './Admin/AdminHelper';
import { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  
  useEffect(() => {
    fetchAdminDashboard(adminUid).then(setDashboard);
  }, [adminUid]);
  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>Pending Events: {dashboard?.pendingEventsCount}</div>
      <div>Flagged Content: {dashboard?.flaggedContentCount}</div>
    </div>
  );
};
```

### approveEvent - Approve Pending Event

**Function Signature:**
```javascript
export const approveEvent = async (eventId, adminUid, approvalReason = "") => {
  // 1. Verify admin permissions
  // 2. Update event status to "approved"
  // 3. Create audit log entry
  // 4. Notify event creator
  // Returns: Boolean (success status)
}
```

**Usage Example:**
```javascript
import { approveEvent } from './Admin/AdminHelper';

const handleApproveEvent = async (eventId) => {
  try {
    const success = await approveEvent(
      eventId,
      currentAdmin.uid,
      "Event details verified"
    );
    if (success) showSuccess("Event approved!");
  } catch (error) {
    showError(error.message);
  }
};
```

### rejectEvent - Reject Pending Event

**Function Signature:**
```javascript
export const rejectEvent = async (eventId, adminUid, rejectionReason) => {
  // 1. Update event status to "rejected"
  // 2. Create audit log
  // 3. Notify creator with reason
  // 4. Move to archived
  // Returns: Boolean
}
```

### flagUser - Flag User for Moderation

**Function Signature:**
```javascript
export const flagUser = async (userId, adminUid, flagReason) => {
  // 1. Add user to review queue
  // 2. Log moderation action
  // 3. Track in adminUsers.assignedModeration
  // Returns: Boolean
}
```

### banUser - Temporarily or Permanently Ban User

**Function Signature:**
```javascript
export const banUser = async (userId, adminUid, banReason, duration = null) => {
  // 1. Create bannedUser document
  // 2. Mark user.accountStatus as "suspended"
  // 3. Create audit log
  // 4. Revoke active sessions (optional)
  // 5. Notify user and admin
  // duration: null = permanent, Number = days for temporary ban
  // Returns: Boolean
}
```

**Usage Example:**
```javascript
import { banUser } from './Admin/AdminHelper';

const handleBanUser = async (userId, reason) => {
  try {
    // Permanent ban
    const success = await banUser(userId, adminUid, reason, null);
    
    // Or temporary ban for 30 days
    // const success = await banUser(userId, adminUid, reason, 30);
    
    if (success) showSuccess("User banned");
  } catch (error) {
    showError(error.message);
  }
};
```

### unbanUser - Lift Ban

**Function Signature:**
```javascript
export const unbanUser = async (userId, adminUid) => {
  // 1. Delete from bannedUser collection
  // 2. Update user.accountStatus to "active"
  // 3. Create audit log entry
  // Returns: Boolean
}
```

### fetchFlaggedContent - Get Content Pending Review

**Function Signature:**
```javascript
export const fetchFlaggedContent = async (limit = 20) => {
  // Returns: [
  //   {
  //     id: String,
  //     type: "event" | "log" | "user",
  //     flagCount: Number,
  //     flagReasons: [String],
  //     createdBy: String,
  //     flaggedAt: Timestamp,
  //     content: Object,
  //   },
  // ]
}
```

### createAuditLog - Log Administrative Action

**Function Signature:**
```javascript
export const createAuditLog = async (
  actionType,     // "event_approved", "user_banned", etc.
  targetId,
  targetType,
  adminUid,
  reason,
  oldValue,       // Previous state
  newValue        // New state
) => {
  // Returns: Boolean
}
```

### fetchAuditLogs - Get Administrative History

**Function Signature:**
```javascript
export const fetchAuditLogs = async (filters = {}, pageSize = 50) => {
  // filters: { adminUid?, actionType?, targetType?, dateRange? }
  // Returns: [auditLogDocument, ...]
}
```

---

## 💻 Component Structure

### AdminDashboard Component

**File:** `src/component/Admin/AdminDashboard.js`

**Features:**
- Dashboard stats (pending approvals, flags, bans)
- Quick action buttons
- Recent activity feed
- Navigation to sub-pages

**State:**
```javascript
const [stats, setStats] = useState(null);
const [recentActions, setRecentActions] = useState([]);
const [isLoading, setIsLoading] = useState(true);
```

### AdminOutreachEvents Component

**File:** `src/component/Admin/AdminOutreachEvents.js`

**Features:**
- List pending events
- Approve/reject buttons
- Search and filter
- View event details
- Bulk actions (approve multiple)

**Workflow:**
```
1. Fetch pending events (status = "pending")
2. Display with summary (title, creator, date)
3. Admin can:
   - Click to view full details
   - Approve (confirm + reason)
   - Reject (with feedback)
   - Assign for review
```

### UserListNew Component

**File:** `src/component/Admin/UserListNew.js`

**Features:**
- List all users
- Search by name/email
- Filter by type/status
- Ban/suspend buttons
- View activity
- Make admin

**Columns:**
- Name / Email
- Type (volunteer/partner/admin)
- Status (active/suspended)
- Created Date
- Action Buttons

### CardInfo Component

**File:** `src/component/Admin/CardInfo.js`

**Features:**
- Display statistics cards
- Count pending items
- Trend indicators
- Color coding by urgency

**Example Cards:**
```javascript
<CardInfo
  title="Pending Events"
  count={dashboardData.pendingCount}
  icon="📋"
  trend="+3 this week"
  color="blue"
/>
```

### FlaggedContent Component

**File:** `src/component/Admin/FlaggedContent.js`

**Features:**
- Display flagged items
- Show flag reasons/count
- Review content
- Resolve button
- Dismiss option

---

## 🧪 Testing Checklist

### Test Suite: Admin Dashboard Feature

#### 1. **Admin Access Control**
```javascript
it("should only allow admins to view dashboard", async () => {
  // Non-admin user
  const { getByText, queryByText } = render(<AdminDashboard />);
  
  await waitFor(() => {
    expect(getByText(/admin access required/i)).toBeInTheDocument();
  });
});

it("should allow admin user to access", async () => {
  const mockAdmin = { uid: 'admin-123', role: 'admin' };
  
  const { getByText } = render(<AdminDashboard />, {
    initialState: { user: mockAdmin },
  });
  
  await waitFor(() => {
    expect(getByText(/admin dashboard/i)).toBeInTheDocument();
  });
});
```

#### 2. **Approve Event**
```javascript
it("should approve pending event", async () => {
  const mockEvent = {
    id: 'event-123',
    title: 'Community Cleanup',
    status: 'pending',
  };
  
  const { getByRole, getByText } = render(
    <AdminOutreachEvents events={[mockEvent]} />
  );
  
  fireEvent.click(getByRole("button", { name: /approve/i }));
  
  // Confirmation modal appears
  await waitFor(() => {
    expect(getByText(/confirm approval/i)).toBeInTheDocument();
  });
  
  fireEvent.click(getByRole("button", { name: /confirm/i }));
  
  await waitFor(() => {
    expect(mockApproveEvent).toHaveBeenCalledWith(
      'event-123',
      'admin-123',
      expect.any(String)
    );
  });
});
```

#### 3. **Reject Event**
```javascript
it("should reject event with feedback", async () => {
  const { getByRole, getByLabelText } = render(
    <AdminOutreachEvents events={[mockEvent]} />
  );
  
  fireEvent.click(getByRole("button", { name: /reject/i }));
  
  fireEvent.change(getByLabelText(/reason/i), {
    target: { value: 'Missing location details' },
  });
  
  fireEvent.click(getByRole("button", { name: /confirm/i }));
  
  await waitFor(() => {
    expect(mockRejectEvent).toHaveBeenCalledWith(
      'event-123',
      'admin-123',
      'Missing location details'
    );
  });
});
```

#### 4. **Ban User**
```javascript
it("should ban user permanently", async () => {
  const mockUser = { uid: 'user-123', username: 'violator' };
  
  const { getByRole, getByLabelText } = render(
    <UserListNew users={[mockUser]} />
  );
  
  fireEvent.click(getByRole("button", { name: /ban/i }));
  
  fireEvent.change(getByLabelText(/ban reason/i), {
    target: { value: 'Harassment' },
  });
  
  fireEvent.click(getByRole("button", { name: /permanent ban/i }));
  
  await waitFor(() => {
    expect(mockBanUser).toHaveBeenCalledWith(
      'user-123',
      'admin-123',
      'Harassment',
      null  // null = permanent
    );
  });
});
```

#### 5. **Temporary Ban**
```javascript
it("should temporarily ban user for duration", async () => {
  const { getByRole, getByLabelText } = render(
    <UserListNew users={[mockUser]} />
  );
  
  fireEvent.click(getByRole("button", { name: /ban/i }));
  
  fireEvent.click(getByRole("button", { name: /temporary ban/i }));
  
  fireEvent.change(getByLabelText(/duration/i), {
    target: { value: '30' },
  });
  
  fireEvent.click(getByRole("button", { name: /confirm/i }));
  
  await waitFor(() => {
    expect(mockBanUser).toHaveBeenCalledWith(
      'user-123',
      'admin-123',
      expect.any(String),
      30  // 30 days
    );
  });
});
```

#### 6. **Unban User**
```javascript
it("should unban suspended user", async () => {
  const bannedUser = { uid: 'user-123', accountStatus: 'suspended' };
  
  const { getByRole } = render(<UserListNew users={[bannedUser]} />);
  
  fireEvent.click(getByRole("button", { name: /unban/i }));
  
  await waitFor(() => {
    expect(mockUnbanUser).toHaveBeenCalledWith('user-123', 'admin-123');
  });
});
```

#### 7. **Flag Content**
```javascript
it("should flag user-generated content", async () => {
  const { getByRole } = render(<OutreachVisitLogCard />);
  
  fireEvent.click(getByRole("button", { name: /flag/i }));
  
  // Flag modal appears
  const reasonInput = getByLabelText(/reason/i);
  fireEvent.change(reasonInput, {
    target: { value: 'Inappropriate content' },
  });
  
  fireEvent.click(getByRole("button", { name: /submit flag/i }));
  
  await waitFor(() => {
    expect(mockFlagContent).toHaveBeenCalledWith(
      'log-123',
      'Inappropriate content'
    );
  });
});
```

#### 8. **View Flagged Content**
```javascript
it("should display all flagged content", async () => {
  const flaggedItems = [
    { id: 'item-1', type: 'log', flagCount: 3 },
    { id: 'item-2', type: 'event', flagCount: 1 },
  ];
  
  mockFetchFlaggedContent.mockResolvedValueOnce(flaggedItems);
  
  const { getByText } = render(<FlaggedContent />);
  
  await waitFor(() => {
    expect(getByText(/3.*flags/)).toBeInTheDocument();
    expect(getByText(/1.*flag/)).toBeInTheDocument();
  });
});
```

#### 9. **Audit Log**
```javascript
it("should record all admin actions", async () => {
  const { getByRole } = render(<AdminDashboard />);
  
  // Admin approves event
  fireEvent.click(getByRole("button", { name: /approve/i }));
  fireEvent.click(getByRole("button", { name: /confirm/i }));
  
  // Verify audit log created
  await waitFor(() => {
    expect(mockCreateAuditLog).toHaveBeenCalledWith(
      'event_approved',
      'event-123',
      'event',
      'admin-123',
      expect.any(String),
      expect.any(Object),
      expect.any(Object)
    );
  });
});
```

#### 10. **Dashboard Statistics**
```javascript
it("should display dashboard statistics", async () => {
  const mockStats = {
    pendingEventsCount: 5,
    flaggedContentCount: 3,
    adminStats: {
      totalActionsThisMonth: 42,
      eventsApproved: 38,
      usersBanned: 2,
    },
  };
  
  mockFetchAdminDashboard.mockResolvedValueOnce(mockStats);
  
  const { getByText } = render(<AdminDashboard />);
  
  await waitFor(() => {
    expect(getByText(/5.*pending/i)).toBeInTheDocument();
    expect(getByText(/3.*flagged/i)).toBeInTheDocument();
    expect(getByText(/42.*actions/i)).toBeInTheDocument();
  });
});
```

#### 11. **Bulk Approve Events**
```javascript
it("should bulk approve multiple events", async () => {
  const events = [
    { id: 'event-1', status: 'pending' },
    { id: 'event-2', status: 'pending' },
  ];
  
  const { getByRole, getByLabelText } = render(
    <AdminOutreachEvents events={events} />
  );
  
  // Select both
  fireEvent.click(getByLabelText(/select event-1/i));
  fireEvent.click(getByLabelText(/select event-2/i));
  
  // Bulk approve
  fireEvent.click(getByRole("button", { name: /bulk approve/i }));
  
  await waitFor(() => {
    expect(mockApproveEvent).toHaveBeenCalledTimes(2);
  });
});
```

#### 12. **Integration Test: Admin Workflow**
```javascript
it("should complete full admin moderation workflow", async () => {
  connectFirestoreEmulator(db, 'localhost', 8080);
  
  // Create pending event
  const eventRef = await addDoc(collection(db, 'outreachEventsProd'), {
    title: 'Event to Review',
    status: 'pending',
  });
  
  // Admin approves
  await updateDoc(eventRef, { status: 'approved' });
  
  // Verify audit log created
  const auditRef = collection(db, 'auditLogProd');
  const q = query(auditRef, where('targetId', '==', eventRef.id));
  const snapshot = await getDocs(q);
  
  expect(snapshot.docs.length).toBe(1);
  expect(snapshot.docs[0].data().actionType).toBe('event_approved');
});
```

---

## 🤝 Contributing & Development

### Adding New Admin Permissions

**Example: Add "manage_admins" permission**

1. Update adminUsers schema:
```javascript
permissions: [
  "approve_events",
  "ban_users",
  "manage_admins",  // NEW
]
```

2. Add permission check in helpers:
```javascript
const hasPermission = (admin, permission) => {
  return admin.permissions.includes(permission);
};
```

3. Add UI for permission assignment
4. Create tests
5. Document in this guide

### Audit Log Best Practices

1. **Always log sensitive actions:**
   - Approvals, rejections, bans
   - User role changes
   - Bulk operations

2. **Include context:**
   - Admin ID and email
   - Reason/justification
   - Before/after state

3. **Retention:**
   - Keep logs 1+ year
   - Archive old logs to storage
   - Encrypt sensitive fields

### Common Pitfalls

1. **Permission Checks**
   - ❌ Don't forget to verify admin role
   - ✅ Do: Check permissions before every action

2. **Audit Trail**
   - ❌ Don't skip logging admin actions
   - ✅ Do: Create audit entry for every moderation action

3. **User Notification**
   - ❌ Don't silently ban users
   - ✅ Do: Send email with reason

4. **Batch Operations**
   - ❌ Don't process 1000s without pagination
   - ✅ Do: Limit batch size, add progress tracking

---

## 🔗 Related Documentation

- **Cloud Functions**: [CLOUD_FUNCTIONS.md](../CLOUD_FUNCTIONS.md) - Notification functions
- **Data Architecture**: [DATA_ARCHITECTURE.md](../DATA_ARCHITECTURE.md) - adminUsers, auditLog, bannedUser collections
- **Testing**: [TESTING.md](../TESTING.md) - Permission mocking patterns

---

**Last Updated:** December 8, 2025  
**Component Status:** ✅ Stable  
**Test Coverage:** 🟢 Comprehensive (85%+)
