# Street Care Features Documentation

Welcome to the comprehensive feature documentation for Street Care. This directory contains detailed guides for each major feature, including architecture, code examples, workflows, testing procedures, and contribution guidelines.

## 📚 Feature Guides

### Core Features

| Feature | Purpose | Key Components | Documentation |
|---------|---------|-----------------|----------------|
| **Community Events** | Create and manage community outreach events | `OutreachEventCard.js`, `OutreachSignup.js`, `AllOutreachEvents.js` | [Read →](./features/COMMUNITY_EVENTS.md) |
| **Interaction Logging** | Document detailed interactions with homeless individuals | `InteractionLogForm.js`, `GeneralInfoForm.js`, `DynamicSubSection.js` | [Read →](./features/INTERACTION_LOGGING.md) |
| **Visit Logs** | Track and display personal/community visit logs | `OutreachVisitLogCard.js`, `PersonalVisitLogDetails.js` | [Read →](./features/VISIT_LOGS.md) |
| **User Profiles** | Manage user profiles and account settings | `Profile.js`, `AccSetting.js`, `UserProfile/*` | [Read →](./features/USER_PROFILES.md) |
| **Admin Dashboard** | Administrative controls and moderation | `AdminDashboard.js`, `AdminService.js`, `UserListNew.js` | [Read →](./features/ADMIN_DASHBOARD.md) |
| **Authentication & 2FA** | User registration, login, and two-factor authentication | `Signup.js`, `Login.js`, Cloud Functions | [Read →](./features/AUTHENTICATION.md) |

### Supporting Documentation

| Document | Purpose |
|----------|---------|
| [Cloud Functions](./CLOUD_FUNCTIONS.md) | All Firebase Cloud Functions implementations, deployment, and testing |
| [Data Architecture](./DATA_ARCHITECTURE.md) | Complete Firestore schema reference with all collections and relationships |
| [Testing Guide](./TESTING.md) | Master testing guide with emulator setup, patterns, and test scenarios |

---

## 🚀 Quick Start Guide

### For New Developers

1. **Understand the data flow**: Start with [Data Architecture](./DATA_ARCHITECTURE.md) to understand Firestore collections
2. **Pick a feature**: Choose a feature from the table above and read its documentation
3. **Review code examples**: Each feature guide includes actual code snippets from the codebase
4. **Follow the workflow**: Understand the step-by-step flow and data transformations
5. **Set up testing**: Use [Testing Guide](./TESTING.md) to configure emulators and write tests

### For Feature Development

1. Read the feature documentation thoroughly
2. Review the data model and Firestore schema
3. Check the "Contributing & Testing" section
4. Follow the code examples and patterns
5. Run the test scenarios in the Testing Checklist
6. Submit PR with tests following the guide in [Testing Guide](./TESTING.md)

---

## 🏗️ Architecture Overview

```
Street Care Platform
├── Frontend (React)
│   ├── Community Events System
│   ├── Interaction Logging System
│   ├── Visit Logs System
│   ├── User Profiles
│   ├── Admin Dashboard
│   └── Authentication/2FA
├── Firebase Backend
│   ├── Authentication
│   ├── Firestore Database (13 collections)
│   ├── Cloud Functions (7 functions)
│   └── Hosting
└── Data Flow
    ├── User Events → Firestore
    ├── Interactions → Two Collections (linked)
    └── Admin Actions → Audit Logs
```

---

## 📊 Data Flow Examples

### Example 1: Event Creation → RSVP → Logging
```
User creates outreach event
    ↓
Event stored in outreachEvents collection
    ↓
Event card displayed in Community views
    ↓
Other users RSVP (participants array updated)
    ↓
Email confirmation sent (Cloud Function: emailScheduler)
    ↓
User documents interaction in InteractionLogForm
    ↓
Two Firestore entries created (linked by IDs)
```

### Example 2: Help Request → Interaction Logging
```
Help request submitted (external form)
    ↓
Stored in helpRequests collection
    ↓
User navigates to InteractionLogForm
    ↓
Links multiple interactions to one help request
    ↓
Documents support provided with timestamps
    ↓
Updates status from Pending → Completed
    ↓
Admin review triggers audit log entry
```

### Example 3: 2FA Email Verification
```
User initiates sensitive action (email change, etc.)
    ↓
Frontend sends request to Cloud Function: send2FA
    ↓
Function generates 6-digit HMAC code
    ↓
Gmail API sends code to user email
    ↓
User enters code in modal
    ↓
Cloud Function: verifyUpdateEmail2FA validates
    ↓
Action confirmed and executed
```

---

## 🔑 Key Technologies & Patterns

### Technology Stack
- **React** - UI framework with hooks
- **Firebase** - Authentication, Firestore, Cloud Functions, Hosting
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **React Context** - State management (`UserContext`)

### Design Patterns
- **Service Layer Pattern** - `EventCardService.js`, `VisitLogCardService.js` handle all Firestore queries
- **Ref-based Form Control** - Forms use React refs to expose methods (`checkIsEmpty()`, `getData()`)
- **Pagination Pattern** - Cursor-based pagination for large datasets
- **Collection Mapping** - Environment-aware collection names (`main` vs `development`)
- **Component Composition** - Feature components built from smaller reusable components

### Data Patterns
- **Timestamp Handling** - Use `Firestore.Timestamp` for consistent date handling
- **Linked Documents** - Related data stored in separate collections with ID references
- **Status Enums** - `Pending`, `Approved`, `Completed`, `Rejected` for workflows
- **Audit Trails** - Track modifications with `lastModifiedTimestamp` and `lastActionPerformed`

---

## 🧪 Testing Overview

### Test Levels
1. **Unit Tests** - Individual functions and components
2. **Integration Tests** - Component + Firestore interactions
3. **E2E Tests** - Full user workflows

### Testing Tools
- **Jest** - Unit testing framework
- **Firebase Emulator Suite** - Local Firestore and Authentication
- **React Testing Library** - Component testing

### Quick Test Command
```bash
# Run all tests
npm test

# Run specific test file
npm test -- InteractionLogForm.test.js

# Run with coverage
npm test -- --coverage

# Use Firebase emulators for integration tests
npm run test:emulator
```

See [Testing Guide](./TESTING.md) for detailed setup and examples.

---

## 🔗 Navigation Quick Links

### By Feature Area
- **Events** → [COMMUNITY_EVENTS.md](./features/COMMUNITY_EVENTS.md)
- **Interactions** → [INTERACTION_LOGGING.md](./features/INTERACTION_LOGGING.md)
- **Logs** → [VISIT_LOGS.md](./features/VISIT_LOGS.md)
- **User Management** → [USER_PROFILES.md](./features/USER_PROFILES.md) & [ADMIN_DASHBOARD.md](./features/ADMIN_DASHBOARD.md)
- **Security** → [AUTHENTICATION.md](./features/AUTHENTICATION.md) & [CLOUD_FUNCTIONS.md](./CLOUD_FUNCTIONS.md)

### By Technical Topic
- **Database Schema** → [DATA_ARCHITECTURE.md](./DATA_ARCHITECTURE.md)
- **Cloud Functions** → [CLOUD_FUNCTIONS.md](./CLOUD_FUNCTIONS.md)
- **Testing Strategies** → [TESTING.md](./TESTING.md)

---

## 🤝 Contributing

Each feature guide includes a "Contributing & Testing" section with:
- Development setup for that feature
- Testing checklist with specific test cases
- Code examples and patterns to follow
- Common pitfalls to avoid

**Before submitting a PR:**
1. Read the relevant feature documentation
2. Follow the code examples and patterns
3. Complete all test scenarios in the Testing Checklist
4. Run tests locally using [Testing Guide](./TESTING.md)
5. Reference the feature guide in your PR description

---

## 📋 Feature Status Matrix

| Feature | Status | Last Updated | Maintainer Notes |
|---------|--------|---------------|-----------------|
| Community Events | ✅ Stable | Dec 2024 | Pagination optimized |
| Interaction Logging | ✅ Stable | Dec 2024 | New 4-step workflow |
| Visit Logs | ✅ Stable | Dec 2024 | Migration from old schema |
| User Profiles | ✅ Stable | Dec 2024 | Added email verification |
| Admin Dashboard | ✅ Stable | Dec 2024 | Audit logging enabled |
| Auth & 2FA | ✅ Stable | Dec 2024 | HMAC-based code generation |

---

## 📞 Questions & Support

- **General Questions** → Check the feature's documentation first
- **Code Issues** → Reference the code examples and common pitfalls section
- **Testing Help** → See [Testing Guide](./TESTING.md)
- **Data Questions** → Consult [DATA_ARCHITECTURE.md](./DATA_ARCHITECTURE.md)
- **Cloud Functions Issues** → See [CLOUD_FUNCTIONS.md](./CLOUD_FUNCTIONS.md)

---

**Last Updated:** December 8, 2025  
**Documentation Version:** 1.0  
**Street Care Team**
