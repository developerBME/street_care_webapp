# Login & Signup Pages - Street Care 

## Overview

Street Care uses **Firebase Authentication** combined with **Firestore** to:

- Authenticate users (Email/Password, Google OAuth)
- Persist login sessions
- Create and manage user profiles
- Prevent banned users from logging in
- Log authentication events for auditing

There are **two main entry points**:
- Login (`street_care_webapp\src\component\Login.js`)
- Signup (`street_care_webapp\src\component\Signup2.js`)

---

## Authentication Methods Supported

### 1. Email & Password
- Used for traditional login and signup
- Credentials are managed by Firebase Auth

### 2. Google OAuth
- Uses `signInWithPopup` with `GoogleAuthProvider`
- Automatically creates a Firestore user profile if one does not exist

---

## Login Flow (Login.js)

### Key Responsibilities
- Validate user credentials
- Prevent banned users from logging in
- Set session persistence (Remember Me)
- Authenticate user via Firebase
- Redirect user after login
- Log login activity

---

### Step-by-Step Login Process

#### 1. Input Validation
- Email format is validated
- Password presence is checked
- Errors are shown inline

#### 2. Banned User Check
Before authentication, Firestore is queried:

```js
const userQuery = query(
  collection(db, bannedUser_collection),
  where("email", "==", email)
);
```

If a match exists:
- Login is blocked
- Error message is displayed
- No Firebase authentication is attempted

#### 3. Session Persistence
Based on **Remember Me**:
- Enabled → `browserLocalPersistence`
- Disabled → `browserSessionPersistence`

```js
setPersistence(auth, rememberMe
  ? browserLocalPersistence
  : browserSessionPersistence
);
```

#### 4. Firebase Authentication
```js
await signInWithEmailAndPassword(auth, email, password);
```

On success:
- User session is created
- User is redirected to `/profile`
- Login event is logged

---

### Google Login
- Triggered via **Continue with Google**
- Uses `signInWithPopup`
- Creates Firestore profile if missing
- Session persistence handled by Firebase

---

## Signup Flow (Signup2.js)

### Key Responsibilities
- Create new Firebase Auth users
- Create Firestore user profile
- Support Google-based signup
- Redirect user to verification flow
- Log signup activity

---

### Step-by-Step Signup Process

#### 1. Input Validation
Required fields:
- Email (valid format)
- Password
- Username

Errors are displayed inline if missing.

#### 2. Firebase Account Creation
```js
const userCredential = await createUserWithEmailAndPassword(
  auth,
  email,
  password
);
```

#### 3. Firestore User Profile Creation
```js
await setDoc(doc(db, users_collection, user.uid), {
  email,
  username,
  uid: user.uid,
  dateCreated: new Date(),
  deviceType: "Web",
  isValid: true,
  photoUrl: ""
});
```

#### 4. Post Signup Redirect
- Redirects to `/verifyemail`
- Signup event is logged

---

### Google Signup
- Uses the same Google OAuth flow as login
- Existing users are reused
- New users are provisioned in Firestore

---

## Session Management

Firebase automatically:
- Stores authentication tokens
- Restores user session on refresh
- Exposes auth state via `onAuthStateChanged`

---

## Logging & Auditing

Authentication events are logged using:

```js
logEvent("STREET_CARE_INFO_AUTH", "...");
logEvent("STREET_CARE_ERROR", "...");
```

---