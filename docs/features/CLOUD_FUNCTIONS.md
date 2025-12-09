# Cloud Functions Documentation

## Overview

Street Care uses Firebase Cloud Functions to handle server-side logic that requires elevated permissions or external API integrations. All functions are written in Node.js and deployed to Google Cloud Platform via Firebase.

**Key Functions:**
- `send2FA` - Generate 6-digit code and send via Gmail API
- `send2FACodeForEmailUpdate` - 2FA variant for email change verification
- `verifyUpdateEmail2FA` - Verify 2FA code and update user email
- `sendConfirmationLink` - Email confirmation for signup
- `sendOutreachEmail` - Send outreach event notifications
- `addLogEntry` - Audit trail logging
- `decodeToken` - JWT token decoding for custom claims
- `emailScheduler` - Scheduled email notifications

---

## 🔐 Authentication & 2FA Functions

### send2FA - Generate & Send 2FA Code

**File:** `functions/send2FA/index.js`

**Function Signature:**
```javascript
exports.send2FACode = functions.https.onRequest((req, res) => { ... })
```

**HTTP Endpoint:**
```
POST /us-central1/streetcare-d0f33/send2FACode
```

**Request Body:**
```json
{
  "userEmail": "user@example.com",
  "UID": "firebase-auth-uid-12345",
  "timestamp": 1701000000000
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

#### Implementation Details

**HMAC-SHA256 Code Generation:**

```javascript
const crypto = require('crypto');
const SECRET_KEY = '48610ca52d0c1fee946020018d7c6f7dab31d391a59fb69e747189c22e6dd9bf';

// Create HMAC hash from user email + UID + timestamp
const hashedCode = crypto.createHmac('sha256', SECRET_KEY)
                     .update(`${userEmail}:${UID}:${timestamp}`)
                     .digest('hex');

// Convert hex to BigInt and extract last 6 digits (modulo 1,000,000)
const hashBigInt = BigInt('0x' + hashedCode);
const sixDigitCode = hashBigInt % 1000000n;
const sixDigitCodeStr = sixDigitCode.toString().padStart(6, '0');

// Example:
// Input: "john@example.com:abc123:1701000000000"
// Hash: "a3f5b2c1d8e9f0..."
// BigInt: 741238956234...
// Code: 234956 (mod 1000000)
```

**Why HMAC-SHA256?**
- Deterministic: Same input always produces same code
- Secure: Hard to reverse without SECRET_KEY
- Verifiable: Client can verify code on their side
- Time-sensitive: Timestamp prevents replay attacks

**Gmail API Integration:**

```javascript
const { google } = require('googleapis');

const CLIENT_ID = '223295299587-dinnroh9j2lb858kphbgb96f8t6j0eq2.apps.googleusercontent.com';
const CLIENT_SECRET = 'anpX22WnN_boI0nx64wDSGZX';
const REFRESH_TOKEN = '1//04BYTM-CI6Zg0CgYIARAAGAQSNwF-L9Irp-YSFyOeZO_92NxuPBtL57hlqtzdYbWcPFDLYw0N8vW1CY8vS1iVRz2k7I1F-PVVemc';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  'http://localhost'
);

oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN
});

const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
```

**Sending Email:**

```javascript
// Construct RFC 2822 formatted email
const rawMessage = Buffer.from(
  `To: ${userEmail}\n` +
  `Subject: 2FA Code\n` +
  'MIME-Version: 1.0\n' +
  'Content-Type: text/html; charset=UTF-8\n\n' +
  `Your 2FA Code is: ${sixDigitCodeStr}`
)
.toString('base64')           // Encode in base64
.replace(/\+/g, '-')          // URL-safe replacements (RFC 4648)
.replace(/\//g, '_')
.replace(/=+$/, '');          // Remove padding

// Send via Gmail API
await gmail.users.messages.send({
  userId: 'me',
  requestBody: {
    raw: rawMessage,
  },
});
```

#### Error Handling

```javascript
try {
  // Generate code and send email
  await gmail.users.messages.send({ ... });
  res.send('Email sent successfully');
} catch (error) {
  console.error('Failed to send email:', error);
  res.status(500).send('Failed to send email');
}
```

**Common Errors:**
- 400 Bad Request → Missing required parameters
- 401 Unauthorized → Gmail OAuth2 credentials invalid
- 500 Internal Error → Network issues or Gmail API down

#### Frontend Implementation

```javascript
// From authentication flow (e.g., EmailVerificationModal.js)
async function sendTwoFactorCode(userEmail, uid) {
  try {
    const timestamp = Date.now();
    
    const response = await fetch(
      'https://us-central1-streetcare-d0f33.cloudfunctions.net/send2FACode',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail,
          UID: uid,
          timestamp,
        }),
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to send 2FA code');
    }
    
    console.log('2FA code sent successfully');
    // Show modal asking for code
    return true;
  } catch (error) {
    console.error('Error sending 2FA:', error);
    return false;
  }
}
```

---

### send2FACodeForEmailUpdate - Email Change 2FA

**File:** `functions/send2FACodeForEmailUpdate/index.js`

**Function Signature:**
```javascript
exports.send2FACodeForEmailUpdate = functions.https.onRequest((req, res) => { ... })
```

**Request Body:**
```json
{
  "userEmail": "new-email@example.com",
  "UID": "firebase-auth-uid-12345",
  "timestamp": 1701000000000
}
```

**Identical to `send2FA`** but triggers when user changes email address. Same HMAC-SHA256 algorithm.

---

### verifyUpdateEmail2FA - Verify & Update Email

**File:** `functions/verifyUpdateEmail2FA/index.js`

**Function Signature:**
```javascript
exports.verifyUpdateEmail2FA = functions.https.onRequest((req, res) => { ... })
```

**Request Body:**
```json
{
  "userEmail": "new-email@example.com",
  "UID": "firebase-auth-uid-12345",
  "timestamp": 1701000000000,
  "providedCode": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email updated successfully"
}
```

**Implementation:**

```javascript
// Generate code using same algorithm
const hashedCode = crypto.createHmac('sha256', SECRET_KEY)
                   .update(`${userEmail}:${UID}:${timestamp}`)
                   .digest('hex');

const expectedCode = (BigInt('0x' + hashedCode) % 1000000n)
                     .toString()
                     .padStart(6, '0');

// Verify provided code matches
if (providedCode !== expectedCode) {
  res.status(400).send('Invalid or expired code');
  return;
}

// Update user email in Firebase Auth
const user = await admin.auth().getUser(UID);
await admin.auth().updateUser(UID, {
  email: userEmail,
});

// Update Firestore user document
const userRef = admin.firestore().collection('users').doc(UID);
await userRef.update({
  email: userEmail,
  emailVerified: true,
});

res.send('Email updated successfully');
```

---

## ✉️ Email Notification Functions

### sendConfirmationLink - Signup Confirmation

**File:** `functions/sendConfirmationLink/index.js`

**Request Body:**
```json
{
  "userEmail": "user@example.com",
  "confirmationLink": "https://streetcarenow.org/confirm?token=abc123",
  "userName": "John Smith"
}
```

**Email Template:**
```html
<h2>Welcome to Street Care, John!</h2>
<p>Click below to confirm your email:</p>
<a href="https://streetcarenow.org/confirm?token=abc123">Confirm Email</a>
```

---

### sendOutreachEmail - Event Notifications

**File:** `functions/sendOutreachEmail/index.js`

**Request Body:**
```json
{
  "userEmail": "user@example.com",
  "eventName": "Brooklyn Community Outreach",
  "eventDate": "2024-12-15",
  "eventTime": "5:00 PM",
  "location": "Downtown Brooklyn"
}
```

**Email Template:**
```html
<h2>Event Confirmation: Brooklyn Community Outreach</h2>
<p><strong>Date:</strong> December 15, 2024</p>
<p><strong>Time:</strong> 5:00 PM</p>
<p><strong>Location:</strong> Downtown Brooklyn</p>
<p>Thank you for RSVPing to this outreach event!</p>
```

---

### emailScheduler - Scheduled Notifications

**File:** `functions/emailScheduler/emailSchedulerFunction.js`

**Trigger:** Cloud Scheduler (set to run daily at 9:00 AM)

**Purpose:** Send reminder emails for upcoming events

**Logic:**
```javascript
// Query events with eventDate = tomorrow
// For each event, get all participants
// Send reminder email to each participant
```

**Example Scheduled Task:**
```bash
# Firebase CLI to set up scheduler
firebase functions:deploy emailScheduler

# Create Cloud Scheduler job (via Google Cloud Console)
gcloud scheduler jobs create app-engine email-scheduler \
  --schedule="0 9 * * *" \
  --http-method=POST \
  --uri="https://us-central1-streetcare-d0f33.cloudfunctions.net/emailScheduler"
```

---

## 🔍 Utility Functions

### decodeToken - JWT Decoding

**File:** `functions/decodeToken/index.js`

**Purpose:** Decode Firebase ID token and extract custom claims

**Function Signature:**
```javascript
exports.decodeToken = functions.https.onRequest((req, res) => { ... })
```

**Request Body:**
```json
{
  "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjExODI4OTc1NTI2YTQ5NjQwMjY5MzY3MjQ5YmI2OTA1M2RkNzcwMGUifQ..."
}
```

**Response:**
```json
{
  "decoded": {
    "iss": "https://securetoken.google.com/streetcare-d0f33",
    "aud": "streetcare-d0f33",
    "auth_time": 1701000000,
    "user_id": "abc123",
    "sub": "abc123",
    "iat": 1701000000,
    "exp": 1701003600,
    "email": "user@example.com",
    "custom_claims": {
      "admin": false
    }
  }
}
```

**Implementation:**
```javascript
const admin = require('firebase-admin');

exports.decodeToken = functions.https.onRequest(async (req, res) => {
  try {
    const token = req.body.token;
    
    if (!token) {
      res.status(400).send('Token is required');
      return;
    }
    
    // Verify and decode token
    const decoded = await admin.auth().verifyIdToken(token);
    
    res.json({
      decoded,
      claims: decoded.custom_claims || {},
    });
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).send('Invalid token');
  }
});
```

---

### addLogEntry - Audit Trail

**File:** `functions/addLogEntry.js`

**Trigger:** Can be called from frontend or other functions

**Function Signature:**
```javascript
exports.addLogEntry = functions.https.onRequest((req, res) => { ... })
```

**Request Body:**
```json
{
  "userId": "abc123",
  "action": "approved_interaction_log",
  "details": {
    "interactionLogId": "doc-456",
    "reason": "Community verified"
  },
  "timestamp": 1701000000000
}
```

**Firestore Record:**
```
auditLog/entry-001 {
  userId: "admin-uid",
  action: "approved_interaction_log",
  details: { ... },
  timestamp: Timestamp.now(),
  createdAt: Timestamp.now(),
}
```

**Logged Actions:**
- `created_event`
- `approved_interaction_log`
- `flagged_visit_log`
- `deleted_user_account`
- `updated_user_email`
- `2fa_verification_failed`

---

## 🚀 Deployment

### Local Development

**1. Install Firebase CLI:**
```bash
npm install -g firebase-tools
firebase login
```

**2. Set up local emulator:**
```bash
firebase init emulators
firebase emulators:start
```

**3. Deploy to Firebase:**
```bash
# Deploy all functions
firebase deploy --only functions

# Deploy specific function
firebase deploy --only functions:send2FA

# Deploy with environment variables
firebase functions:config:set gmail.client_id="123..." gmail.client_secret="..."
firebase deploy --only functions
```

### Environment Configuration

**File:** `functions/.env` (not versioned)
```bash
GMAIL_CLIENT_ID=223295299587-...
GMAIL_CLIENT_SECRET=anpX22WnN_boI0nx64wDSGZX
GMAIL_REFRESH_TOKEN=1//04BYTM-CI6Zg0CgYIARAAGAQSNwF-...
SECRET_KEY_2FA=48610ca52d0c1fee946020018d7c6f7dab31d391a59fb69e747189c22e6dd9bf
```

**Set via Firebase CLI:**
```bash
firebase functions:config:set \
  gmail.client_id="123..." \
  gmail.client_secret="..." \
  gmail.refresh_token="..." \
  secrets.key2fa="..."
```

**Access in function:**
```javascript
const functions = require('firebase-functions');

const CLIENT_ID = functions.config().gmail.client_id;
const CLIENT_SECRET = functions.config().gmail.client_secret;
```

---

## 🧪 Testing Cloud Functions

### Unit Testing with Firebase Functions Test

**File:** `functions/send2FA/send2FA.test.js`

```javascript
const test = require('firebase-functions-test')();
const send2FA = require('./index').send2FACode;
const crypto = require('crypto');

describe('send2FA', () => {
  afterEach(() => {
    test.cleanup();
  });

  it('should generate correct 6-digit code', async () => {
    const req = {
      method: 'POST',
      body: {
        userEmail: 'test@example.com',
        UID: 'abc123',
        timestamp: 1701000000000,
      },
    };

    const res = {
      send: (msg) => {
        expect(msg).toBe('Email sent successfully');
      },
      status: (code) => {
        return {
          send: (msg) => {
            throw new Error(`Status ${code}: ${msg}`);
          },
        };
      },
    };

    // Mock Gmail API
    jest.mock('googleapis', () => ({
      google: {
        auth: {
          OAuth2: jest.fn(() => ({
            setCredentials: jest.fn(),
            getAccessToken: jest.fn(),
          })),
        },
        gmail: jest.fn(() => ({
          users: {
            messages: {
              send: jest.fn(() => Promise.resolve()),
            },
          },
        })),
      },
    }));

    await send2FA(req, res);
  });

  it('should return 400 for missing parameters', async () => {
    const req = {
      method: 'POST',
      body: {
        userEmail: 'test@example.com',
        // Missing UID and timestamp
      },
    };

    const res = {
      status: (code) => {
        expect(code).toBe(400);
        return {
          send: (msg) => {
            expect(msg).toContain('required');
          },
        };
      },
    };

    await send2FA(req, res);
  });
});
```

**Run Tests:**
```bash
cd functions
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

### Integration Testing with Emulator

**Setup:**
```bash
# Terminal 1: Start emulator
firebase emulators:start --only functions,firestore

# Terminal 2: Run tests
firebase emulators:exec 'npm test'
```

**Test with Emulator:**
```javascript
const admin = require('firebase-admin');
const { initializeApp } = require('firebase/app');
const { connectFunctionsEmulator, httpsCallable } = require('firebase/functions');

beforeEach(() => {
  // Connect to emulator
  connectFunctionsEmulator(functions, 'localhost', 5001);
});

it('should send 2FA code via emulator', async () => {
  const send2FACode = httpsCallable(functions, 'send2FA');
  
  const result = await send2FACode({
    userEmail: 'test@example.com',
    UID: 'test-uid',
    timestamp: Date.now(),
  });
  
  expect(result.data.success).toBe(true);
});
```

---

## 📋 Function Checklist

### Before Deploying to Production

- [ ] All functions have error handling (try-catch)
- [ ] Requests validate input parameters
- [ ] Sensitive data (emails, phone numbers) not logged
- [ ] CORS headers set correctly
- [ ] Environment variables configured in Firebase
- [ ] Function timeouts are appropriate (default 60s)
- [ ] Rate limiting considered (abuse prevention)
- [ ] Monitoring/logging set up (Cloud Logging)
- [ ] Unit tests pass locally
- [ ] Integration tests pass with emulator
- [ ] Manual testing complete on staging environment

### Monitoring & Debugging

**View logs:**
```bash
firebase functions:log

# Filter by function name
firebase functions:log --filter="send2FA"

# Real-time logs
firebase functions:log --tail
```

**View errors:**
```bash
# In Google Cloud Console
# Navigate to Cloud Functions → Logs
# Check error rate and stack traces
```

---

## 🔗 Related Documentation

- **Authentication Feature**: [AUTHENTICATION.md](./features/AUTHENTICATION.md)
- **Testing Guide**: [TESTING.md](./TESTING.md)
- **Data Architecture**: [DATA_ARCHITECTURE.md](./DATA_ARCHITECTURE.md)

---

**Last Updated:** December 8, 2025  
**Node Version:** 18  
**Firebase SDK:** 4.9.0+
