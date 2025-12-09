# User Profiles Feature Guide

## Overview

The User Profiles feature enables volunteers to manage their personal information, verify their email, update account settings, and track their community contributions. Profiles display user credentials, verification status, contribution history, and impact metrics.

**Key Features:**
- User profile management (name, photo, bio)
- Email verification with 2FA
- Account settings and preferences
- Activity history tracking (logs, events, interactions)
- User type/role management
- Password management and account deletion
- Contribution metrics dashboard

**User Flow:**
```
View Profile
    ↓
Update Profile Info
    ↓
Change Email (with 2FA verification)
    ↓
Update Preferences
    ↓
View Activity History
    ↓
Manage Account
```

---

## 📊 Data Models

### User Document Schema

**Collection Path:** `users` (or `usersProd`/`usersDev`)

```javascript
{
  // Authentication
  uid: String,                        // Firebase UID (document ID)
  email: String,                      // Primary email
  emailVerified: Boolean,             // Email verification status
  
  // Profile Information
  username: String,                   // Display name
  photoUrl: String,                   // Profile photo URL (Cloud Storage)
  phoneNumber: String,                // Optional phone
  bio: String,                        // User bio/description
  
  // User Classification
  Type: String,                       // "volunteer" | "partner" | "admin"
  
  // Activity References (denormalized)
  personalVisitLogs: [String],        // Array of visit log IDs
  personalInteractionLogs: [String],  // Array of interaction log IDs
  createdEvents: [String],            // Array of event IDs created
  likedEvents: [String],              // Array of liked event IDs
  rsvpEvents: [String],               // Array of RSVP event IDs
  
  // Account Preferences
  preferences: {
    emailNotifications: Boolean,
    communityUpdates: Boolean,
    eventReminders: Boolean,
    theme: String,                    // "light" | "dark"
  },
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
  lastLogin: Timestamp,
  accountStatus: String,              // "active" | "suspended" | "deleted"
}
```

### User Type Mapping

```javascript
{
  "volunteer": {
    permissions: ["create_visit_logs", "create_events", "interact"],
    badge: "👤 Volunteer",
    canApprove: false,
  },
  "partner": {
    permissions: ["create_events", "moderate_content"],
    badge: "🤝 Partner",
    canApprove: false,
  },
  "admin": {
    permissions: ["all"],
    badge: "👨‍💼 Admin",
    canApprove: true,
  },
}
```

---

## 🔄 Core Functions

### fetchUserProfile - Get User Information

**File:** `src/component/helper/ProfileHelper.js`

**Function Signature:**
```javascript
export const fetchUserProfile = async (uid) => {
  // Returns: {
  //   uid: String,
  //   email: String,
  //   username: String,
  //   photoUrl: String,
  //   Type: String,
  //   personalVisitLogs: [String],
  //   personalInteractionLogs: [String],
  //   createdEvents: [String],
  //   preferences: Object,
  //   createdAt: Timestamp,
  //   ...
  // }
}
```

**Usage Example:**
```javascript
import { fetchUserProfile } from './helper/ProfileHelper';
import { useContext } from 'react';
import { UserContext } from '../context/Usercontext';

const MyProfile = () => {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  
  useEffect(() => {
    if (user?.uid) {
      fetchUserProfile(user.uid).then(setProfile);
    }
  }, [user?.uid]);
  
  return (
    <div>
      <h1>{profile?.username}</h1>
      <img src={profile?.photoUrl} alt="profile" />
      <p>Type: {profile?.Type}</p>
    </div>
  );
};
```

### updateUserProfile - Update Profile Information

**Function Signature:**
```javascript
export const updateUserProfile = async (uid, updates) => {
  // updates: {
  //   username?: String,
  //   photoUrl?: String,
  //   bio?: String,
  //   preferences?: Object,
  // }
  // Returns: Boolean (success status)
}
```

**Usage Example:**
```javascript
import { updateUserProfile } from './helper/ProfileHelper';

const handleProfileUpdate = async (formData) => {
  try {
    const success = await updateUserProfile(user.uid, {
      username: formData.name,
      bio: formData.bio,
      preferences: {
        emailNotifications: formData.emailNotifs,
      },
    });
    if (success) showSuccess("Profile updated!");
  } catch (error) {
    showError(error.message);
  }
};
```

### changeEmail - Update Email with Verification

**Function Signature:**
```javascript
export const changeEmail = async (uid, newEmail, verificationCode) => {
  // 1. Verify the 2FA code sent to new email
  // 2. Update Firebase Auth email
  // 3. Update Firestore user document
  // 4. Send confirmation link
  // Returns: Boolean (success status)
}
```

**Usage Example:**
```javascript
import { changeEmail } from './helper/ProfileHelper';

const handleEmailChange = async (newEmail, code) => {
  try {
    // Step 1: Request verification code (sends 2FA code to new email)
    await sendEmailVerification(user.uid, newEmail);
    
    // Step 2: User enters code
    // Step 3: Verify and update
    const success = await changeEmail(user.uid, newEmail, code);
    if (success) {
      showSuccess("Email updated and verified!");
    }
  } catch (error) {
    showError(error.message);
  }
};
```

### getUserStats - Get User Contribution Metrics

**Function Signature:**
```javascript
export const getUserStats = async (uid) => {
  // Returns: {
  //   totalVisitLogs: Number,
  //   totalInteractionLogs: Number,
  //   eventsCreated: Number,
  //   eventsAttended: Number,
  //   peopleHelped: Number,  // aggregated from visit logs
  //   joinDate: Timestamp,
  // }
}
```

### getUserActivityHistory - Get Recent Activities

**Function Signature:**
```javascript
export const getUserActivityHistory = async (uid, limit = 10) => {
  // Returns: [
  //   { type: "visit_log", date, title, },
  //   { type: "interaction_log", date, title },
  //   { type: "event_created", date, title },
  // ]
}
```

### deleteAccount - Permanently Delete User Account

**Function Signature:**
```javascript
export const deleteAccount = async (uid, password) => {
  // 1. Verify password
  // 2. Delete Firebase Auth user
  // 3. Delete Firestore user document
  // 4. Anonymize user references in logs
  // Returns: Boolean (success status)
}
```

---

## 💻 Component Structure

### Profile Component

**File:** `src/component/Profile.js`

**Features:**
- Display user profile header (name, photo, badge)
- Show user stats (activity counts)
- Navigation tabs (About, Activity, Settings)
- Edit profile button

**State:**
```javascript
const [profile, setProfile] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [editMode, setEditMode] = useState(false);
const [activeTab, setActiveTab] = useState('about');
```

### AccSetting Component

**File:** `src/component/UserProfile/AccSetting.js`

**Features:**
- Change password
- Update email with 2FA
- Notification preferences
- Theme selection
- Account deletion

### UpdateEmail Component

**File:** `src/component/UserProfile/UpdateEmail.js`

**Workflow:**
```
1. User enters new email
2. System sends 2FA code to NEW email
3. User enters code from email
4. System verifies code
5. Email updated in Auth + Firestore
6. Confirmation sent to old email
```

**Features:**
- Email input with validation
- 2FA verification UI
- Code input field
- Error handling
- Resend code option

### GeneralInfoForm Component

**File:** `src/component/UserProfile/GeneralInfoForm.js`

**Features:**
- Edit username
- Edit bio
- Upload profile photo
- Save changes
- Validation feedback

---

## 🧪 Testing Checklist

### Test Suite: User Profiles Feature

#### 1. **Profile View**
```javascript
it("should display user profile correctly", async () => {
  const mockProfile = {
    uid: 'user-123',
    username: 'John Doe',
    photoUrl: 'https://...',
    Type: 'volunteer',
    bio: 'Passionate volunteer',
  };
  
  mockFetchUserProfile.mockResolvedValueOnce(mockProfile);
  
  const { getByText, getByAltText } = render(<Profile />);
  
  await waitFor(() => {
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByAltText('profile')).toHaveAttribute('src', mockProfile.photoUrl);
    expect(getByText('👤 Volunteer')).toBeInTheDocument();
  });
});
```

#### 2. **Update Profile Information**
```javascript
it("should update profile with new info", async () => {
  const { getByLabelText, getByRole } = render(<GeneralInfoForm />);
  
  fireEvent.change(getByLabelText(/username/i), {
    target: { value: 'Jane Smith' },
  });
  fireEvent.change(getByLabelText(/bio/i), {
    target: { value: 'Community advocate' },
  });
  
  fireEvent.click(getByRole("button", { name: /save/i }));
  
  await waitFor(() => {
    expect(mockUpdateUserProfile).toHaveBeenCalledWith(
      'user-123',
      expect.objectContaining({
        username: 'Jane Smith',
        bio: 'Community advocate',
      })
    );
  });
});
```

#### 3. **Email Verification Flow**
```javascript
it("should verify email with 2FA code", async () => {
  const { getByLabelText, getByRole } = render(<UpdateEmail />);
  
  // Step 1: Enter new email
  fireEvent.change(getByLabelText(/new email/i), {
    target: { value: 'newemail@example.com' },
  });
  
  // Step 2: Request code
  fireEvent.click(getByRole("button", { name: /send code/i }));
  
  // Step 3: Enter verification code
  await waitFor(() => {
    expect(getByLabelText(/verification code/i)).toBeInTheDocument();
  });
  
  fireEvent.change(getByLabelText(/verification code/i), {
    target: { value: '123456' },
  });
  
  // Step 4: Verify
  fireEvent.click(getByRole("button", { name: /verify/i }));
  
  await waitFor(() => {
    expect(mockChangeEmail).toHaveBeenCalledWith(
      'user-123',
      'newemail@example.com',
      '123456'
    );
  });
});
```

#### 4. **Profile Statistics Display**
```javascript
it("should display user stats correctly", async () => {
  const mockStats = {
    totalVisitLogs: 5,
    totalInteractionLogs: 8,
    eventsCreated: 2,
    eventsAttended: 12,
    peopleHelped: 47,
  };
  
  mockGetUserStats.mockResolvedValueOnce(mockStats);
  
  const { getByText } = render(<Profile />);
  
  await waitFor(() => {
    expect(getByText(/5.*visit logs/i)).toBeInTheDocument();
    expect(getByText(/47.*helped/i)).toBeInTheDocument();
  });
});
```

#### 5. **Activity History Tab**
```javascript
it("should show user activity history", async () => {
  const mockHistory = [
    { type: 'visit_log', date: new Date(), title: 'Food distribution' },
    { type: 'event_created', date: new Date(), title: 'Community cleanup' },
  ];
  
  mockGetUserActivityHistory.mockResolvedValueOnce(mockHistory);
  
  const { getByText } = render(<Profile />);
  
  fireEvent.click(getByText(/activity/i));
  
  await waitFor(() => {
    expect(getByText(/food distribution/i)).toBeInTheDocument();
    expect(getByText(/community cleanup/i)).toBeInTheDocument();
  });
});
```

#### 6. **Password Change**
```javascript
it("should change password", async () => {
  const { getByLabelText, getByRole } = render(<AccSetting />);
  
  fireEvent.change(getByLabelText(/current password/i), {
    target: { value: 'oldPassword123' },
  });
  fireEvent.change(getByLabelText(/new password/i), {
    target: { value: 'newPassword456' },
  });
  fireEvent.change(getByLabelText(/confirm password/i), {
    target: { value: 'newPassword456' },
  });
  
  fireEvent.click(getByRole("button", { name: /change password/i }));
  
  await waitFor(() => {
    expect(mockUpdatePassword).toHaveBeenCalledWith(
      expect.anything(),
      'newPassword456'
    );
  });
});
```

#### 7. **Account Deletion**
```javascript
it("should delete account with confirmation", async () => {
  const { getByRole, getByText } = render(<AccSetting />);
  
  fireEvent.click(getByRole("button", { name: /delete account/i }));
  
  // Modal appears
  await waitFor(() => {
    expect(getByText(/are you sure/i)).toBeInTheDocument();
  });
  
  // User must type confirmation
  fireEvent.change(getByLabelText(/confirm text/i), {
    target: { value: 'DELETE' },
  });
  
  fireEvent.click(getByRole("button", { name: /permanently delete/i }));
  
  await waitFor(() => {
    expect(mockDeleteAccount).toHaveBeenCalledWith('user-123');
  });
});
```

#### 8. **Profile Photo Upload**
```javascript
it("should upload new profile photo", async () => {
  const { getByRole } = render(<GeneralInfoForm />);
  
  const file = new File(['photo'], 'profile.jpg', { type: 'image/jpeg' });
  const input = getByRole('input', { name: /photo/i });
  
  fireEvent.change(input, { target: { files: [file] } });
  fireEvent.click(getByRole("button", { name: /save/i }));
  
  await waitFor(() => {
    expect(mockUploadProfilePhoto).toHaveBeenCalledWith(
      'user-123',
      expect.any(File)
    );
  });
});
```

#### 9. **Integration Test: Full Profile Update Workflow**
```javascript
it("should complete full profile update workflow", async () => {
  connectFirestoreEmulator(db, 'localhost', 8080);
  
  // Create user
  const userRef = await addDoc(collection(db, 'users'), {
    uid: 'user-123',
    email: 'old@example.com',
    username: 'Original Name',
  });
  
  // Update profile
  await updateDoc(userRef, {
    username: 'Updated Name',
    bio: 'New bio',
  });
  
  // Retrieve
  const updated = await getDoc(userRef);
  
  expect(updated.data().username).toBe('Updated Name');
  expect(updated.data().bio).toBe('New bio');
});
```

#### 10. **Preference Updates**
```javascript
it("should save user preferences", async () => {
  const { getByLabelText, getByRole } = render(<AccSetting />);
  
  fireEvent.click(getByLabelText(/email notifications/i));
  fireEvent.click(getByLabelText(/theme/i));
  
  fireEvent.click(getByRole("button", { name: /save preferences/i }));
  
  await waitFor(() => {
    expect(mockUpdateUserProfile).toHaveBeenCalledWith(
      'user-123',
      expect.objectContaining({
        preferences: expect.objectContaining({
          emailNotifications: false,
        }),
      })
    );
  });
});
```

---

## 🤝 Contributing & Development

### Feature Components

1. **Profile Display**
   - Header with photo/name/badge
   - Stats dashboard
   - Tab navigation
   - Edit button (owner only)

2. **Profile Editing**
   - Form with validation
   - Photo upload with preview
   - Bio text area
   - Debounced auto-save

3. **Settings Management**
   - Password change form
   - Email change with 2FA
   - Preference toggles
   - Theme selector

4. **Account Management**
   - Delete confirmation modal
   - Email verification
   - Privacy controls

### Adding New Profile Fields

**Example: Add "skills" field to profile**

1. Update Firestore schema:
```javascript
{
  ...existing fields...
  skills: [String],  // NEW: e.g., ["medical", "cooking"]
}
```

2. Update UI component form
3. Add validation rules
4. Create tests
5. Update documentation

### Common Pitfalls

1. **Email Change Security**
   - ❌ Don't skip 2FA verification
   - ✅ Do: Always send verification code to NEW email

2. **Profile Photo Size**
   - ❌ Don't accept 50MB files
   - ✅ Do: Compress and validate file size (<5MB)

3. **User Data Caching**
   - ❌ Don't cache stale profile data indefinitely
   - ✅ Do: Refresh on logout or set 5-min cache TTL

4. **Account Deletion**
   - ❌ Don't hard-delete user references
   - ✅ Do: Anonymize historical logs (replace uid with "anonymous")

5. **Password Validation**
   - ❌ Don't allow weak passwords
   - ✅ Do: Require min 8 chars, 1 number, 1 special char

---

## 🔗 Related Documentation

- **Authentication**: [AUTHENTICATION.md](./AUTHENTICATION.md) - Email verification and 2FA
- **Cloud Functions**: [CLOUD_FUNCTIONS.md](../CLOUD_FUNCTIONS.md) - send2FA, sendConfirmationLink
- **Data Architecture**: [DATA_ARCHITECTURE.md](../DATA_ARCHITECTURE.md) - users collection schema

---

**Last Updated:** December 8, 2025  
**Component Status:** ✅ Stable  
**Test Coverage:** 🟢 Comprehensive (90%+)
