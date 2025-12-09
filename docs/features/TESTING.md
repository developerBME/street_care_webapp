# Testing Guide

## Overview

This guide covers testing strategies, tools, and examples for Street Care components and Cloud Functions. It includes unit testing, integration testing, end-to-end testing, and Firebase emulator setup.

---

## 🛠️ Testing Setup

### Prerequisites

```bash
# Install dependencies
npm install --save-dev \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  jest \
  jest-environment-jsdom \
  firebase-functions-test
```

### Jest Configuration

**File:** `jest.config.js`

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx}',
  ],
};
```

**File:** `src/setupTests.js`

```javascript
import '@testing-library/jest-dom';

// Mock Firebase
jest.mock('./component/firebase', () => ({
  db: {},
}));

// Mock window.scrollTo
global.scrollTo = jest.fn();

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;
```

### Firebase Emulator Setup

**1. Install Firebase Emulator Suite:**

```bash
npm install -g firebase-tools
firebase --version  # Should be 11.0.0+
```

**2. Initialize Emulators:**

```bash
firebase init emulators

# Select emulators:
# - Authentication
# - Firestore
# - Functions
# - Pub/Sub (optional)

# Configuration added to firebase.json
```

**3. Start Emulators:**

```bash
firebase emulators:start

# Output should show:
# ✔ functions emulator started at http://localhost:5001
# ✔ firestore emulator started at http://localhost:8080
# ✔ auth emulator started at http://localhost:9099
```

**4. Connect from Tests:**

```javascript
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const app = initializeApp({
  projectId: 'streetcare-d0f33',
  // ... other config
});

if (process.env.NODE_ENV === 'test') {
  const auth = getAuth(app);
  const db = getFirestore(app);

  connectAuthEmulator(auth, 'http://localhost:9099', {
    disableWarnings: true,
  });
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export { auth, db };
```

---

## 📝 Unit Testing

### Test File Structure

```
src/
├── component/
│   ├── __tests__/
│   │   ├── InteractionLogForm.test.js
│   │   ├── OutreachEventCard.test.js
│   │   └── ...
│   └── component.js
└── utils/
    ├── __tests__/
    │   └── helperFns.test.js
    └── helperFns.js
```

### React Component Testing Pattern

**File:** `src/component/__tests__/OutreachEventCard.test.js`

```javascript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import OutreachEventCard from '../Community/OutreachEventCard';

// Mock Firebase
jest.mock('../../component/firebase', () => ({
  db: {},
}));

// Mock Firestore functions
jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
}));

describe('OutreachEventCard', () => {
  const mockCardData = {
    id: 'event-123',
    title: 'Brooklyn Community Outreach',
    userName: 'John Smith',
    photoUrl: 'https://example.com/photo.jpg',
    eventDate: new Date('2024-12-15'),
    location: {
      street: 'Main St',
      city: 'Brooklyn',
      state: 'NY',
      zipcode: '11201',
    },
    description: 'Help homeless in Brooklyn',
    userType: 'Chapter Leader',
    likes: [],
    nop: 5,
    label: 'RSVP',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders event title', () => {
    render(<OutreachEventCard cardData={mockCardData} />);
    expect(screen.getByText('Brooklyn Community Outreach')).toBeInTheDocument();
  });

  test('displays location information', () => {
    render(<OutreachEventCard cardData={mockCardData} />);
    expect(screen.getByText('Brooklyn')).toBeInTheDocument();
    expect(screen.getByText('Main St')).toBeInTheDocument();
  });

  test('shows participant count', () => {
    render(<OutreachEventCard cardData={mockCardData} />);
    expect(screen.getByText(/5 people/i)).toBeInTheDocument();
  });

  test('handles RSVP click', async () => {
    render(<OutreachEventCard cardData={mockCardData} />);
    
    const rsvpButton = screen.getByRole('button', { name: /RSVP/i });
    await userEvent.click(rsvpButton);
    
    // Verify navigation or modal appears
    await waitFor(() => {
      // Check for modal or navigation
    });
  });

  test('toggles like status', async () => {
    const { rerender } = render(
      <OutreachEventCard cardData={mockCardData} />
    );
    
    const likeButton = screen.getByRole('button', { name: /like/i });
    await userEvent.click(likeButton);
    
    // Verify UI update
    expect(likeButton).toHaveClass('liked');
  });

  test('disables RSVP for past events', () => {
    const pastEventData = {
      ...mockCardData,
      eventDate: new Date('2020-01-01'), // Past date
    };
    
    render(<OutreachEventCard cardData={pastEventData} />);
    
    const rsvpButton = screen.queryByRole('button', { name: /RSVP/i });
    // Should not exist or be disabled
    expect(rsvpButton).not.toBeInTheDocument();
  });
});
```

### Testing Forms with Refs

**File:** `src/component/__tests__/GeneralInfoForm.test.js`

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GeneralInfoForm from '../UserProfile/GeneralInfoForm';

describe('GeneralInfoForm', () => {
  test('exposes checkIsEmpty method via ref', () => {
    const formRef = React.createRef();
    
    render(<GeneralInfoForm ref={formRef} />);
    
    // Should be empty initially
    expect(formRef.current.checkIsEmpty()).toBe(true);
  });

  test('returns form data via getGeneralInfoData', async () => {
    const formRef = React.createRef();
    
    const { getByLabelText } = render(
      <GeneralInfoForm ref={formRef} />
    );
    
    // Fill form
    fireEvent.change(getByLabelText(/first name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(getByLabelText(/last name/i), {
      target: { value: 'Smith' },
    });
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    });
    
    // Should not be empty
    expect(formRef.current.checkIsEmpty()).toBe(false);
    
    // Get data
    const data = formRef.current.getGeneralInfoData();
    expect(data.firstName).toBe('John');
    expect(data.lastName).toBe('Smith');
    expect(data.email).toBe('john@example.com');
  });

  test('clears form data', async () => {
    const formRef = React.createRef();
    
    const { getByLabelText, getByRole } = render(
      <GeneralInfoForm ref={formRef} />
    );
    
    // Fill form
    fireEvent.change(getByLabelText(/first name/i), {
      target: { value: 'John' },
    });
    
    // Clear
    fireEvent.click(getByRole('button', { name: /clear/i }));
    
    // Should be empty again
    expect(formRef.current.checkIsEmpty()).toBe(true);
  });
});
```

### Testing Custom Hooks

**File:** `src/hooks/useInteractionLog.js`

```javascript
import { useState } from 'react';
import { useCallback } from 'react';

export function useInteractionLog() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitInteractionLog = useCallback(async (data) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Validation
      if (!data.firstName || !data.lastName) {
        throw new Error('Name is required');
      }
      
      // Submit logic
      return await submitToFirestore(data);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, submitInteractionLog };
}
```

**File:** `src/hooks/__tests__/useInteractionLog.test.js`

```javascript
import { renderHook, act, waitFor } from '@testing-library/react';
import { useInteractionLog } from '../useInteractionLog';

jest.mock('firebase/firestore');

describe('useInteractionLog', () => {
  test('initializes with loading false', () => {
    const { result } = renderHook(() => useInteractionLog());
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('sets loading state during submission', async () => {
    const { result } = renderHook(() => useInteractionLog());
    
    act(() => {
      result.current.submitInteractionLog({
        firstName: 'John',
        lastName: 'Smith',
      });
    });
    
    expect(result.current.isLoading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  test('handles validation errors', async () => {
    const { result } = renderHook(() => useInteractionLog());
    
    await act(async () => {
      try {
        await result.current.submitInteractionLog({
          firstName: 'John',
          // Missing lastName
        });
      } catch (err) {
        // Expected error
      }
    });
    
    expect(result.current.error).toBe('Name is required');
  });
});
```

---

## 🔌 Integration Testing

### Firebase Emulator Integration Tests

**File:** `src/component/__tests__/InteractionLogForm.integration.test.js`

```javascript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { 
  initializeApp, 
  deleteApp 
} from 'firebase/app';
import {
  initializeAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  initializeFirestore,
  connectFirestoreEmulator,
  collection,
  getDocs,
} from 'firebase/firestore';
import InteractionLogForm from '../UserProfile/InteractionLogForm';

describe('InteractionLogForm - Integration Tests', () => {
  let app, auth, db;

  beforeAll(async () => {
    // Initialize Firebase for testing
    app = initializeApp({
      projectId: 'streetcare-test',
      apiKey: 'test-key',
    });

    auth = initializeAuth(app);
    db = initializeFirestore(app);

    // Connect to emulators
    connectAuthEmulator(auth, 'http://localhost:9099', {
      disableWarnings: true,
    });
    connectFirestoreEmulator(db, 'localhost', 8080);
  });

  afterAll(async () => {
    await deleteApp(app);
  });

  test('should create interaction log and help requests in Firestore', async () => {
    // Create test user
    await createUserWithEmailAndPassword(
      auth,
      'test@example.com',
      'password123'
    );

    const { getByRole, getByLabelText, getByText } = render(
      <InteractionLogForm />
    );

    // Select "Yes" for details
    fireEvent.click(getByRole('radio', { value: 'Yes' }));

    // Fill general info
    fireEvent.change(getByLabelText(/first name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(getByLabelText(/last name/i), {
      target: { value: 'Smith' },
    });
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(getByLabelText(/city/i), {
      target: { value: 'Brooklyn' },
    });

    // Check privacy consent
    fireEvent.click(getByRole('checkbox'));

    // Submit
    fireEvent.click(getByRole('button', { name: /submit/i }));

    // Wait for submission to complete
    await waitFor(
      async () => {
        // Query Firestore to verify data was saved
        const logsSnapshot = await getDocs(
          collection(db, 'interactionLog_dev')
        );
        expect(logsSnapshot.size).toBe(1);

        const logData = logsSnapshot.docs[0].data();
        expect(logData.firstName).toBe('John');
        expect(logData.lastName).toBe('Smith');
        expect(logData.isPublic).toBe(true);
      },
      { timeout: 5000 }
    );
  });

  test('should link help requests to interaction log', async () => {
    // ... setup ...

    await waitFor(async () => {
      // Get interaction log
      const logsSnapshot = await getDocs(
        collection(db, 'interactionLog_dev')
      );
      const logId = logsSnapshot.docs[0].id;
      const logData = logsSnapshot.docs[0].data();

      // Get help requests
      const helpsSnapshot = await getDocs(
        collection(db, 'helpRequests_dev')
      );

      // Verify linking
      expect(logData.helpRequestDocIds).toEqual([helpsSnapshot.docs[0].id]);
      expect(logData.helpRequestCount).toBe(1);

      // Verify back-reference
      expect(helpsSnapshot.docs[0].data().interactionLogDocId).toBe(logId);
    });
  });
});
```

---

## ☁️ Cloud Functions Testing

### Unit Testing Cloud Functions

**File:** `functions/send2FA/__tests__/send2FA.test.js`

```javascript
const test = require('firebase-functions-test')();

describe('send2FA', () => {
  let send2FA;

  beforeAll(() => {
    send2FA = require('../index').send2FACode;
  });

  afterEach(() => {
    test.cleanup();
  });

  test('should validate required parameters', (done) => {
    const req = {
      method: 'POST',
      body: {
        userEmail: 'test@example.com',
        // Missing UID and timestamp
      },
    };

    const res = {
      status: (code) => ({
        send: (msg) => {
          expect(code).toBe(400);
          expect(msg).toContain('required');
          done();
        },
      }),
    };

    send2FA(req, res);
  });

  test('should reject non-POST requests', (done) => {
    const req = {
      method: 'GET',
      body: {},
    };

    const res = {
      status: (code) => ({
        send: (msg) => {
          expect(code).toBe(405);
          done();
        },
      }),
    };

    send2FA(req, res);
  });
});
```

### Testing with Emulator

**Run Functions Emulator Tests:**

```bash
# Terminal 1
firebase emulators:start --only functions

# Terminal 2
firebase emulators:exec 'npm test' --only functions
```

**Test with Live Emulator:**

```javascript
const fetch = require('node-fetch');

describe('send2FA Function - Emulator', () => {
  const FUNCTION_URL = 'http://localhost:5001/streetcare-d0f33/us-central1/send2FA';

  test('should send 2FA code', async () => {
    const response = await fetch(FUNCTION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userEmail: 'test@example.com',
        UID: 'test-uid-123',
        timestamp: Date.now(),
      }),
    });

    expect(response.status).toBe(200);
    const data = await response.text();
    expect(data).toContain('Email sent successfully');
  });
});
```

---

## 🎯 End-to-End Testing

### Playwright E2E Tests

**File:** `e2e/interaction-logging.e2e.js`

```javascript
import { test, expect } from '@playwright/test';

test.describe('Interaction Logging Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to app
    await page.goto('http://localhost:3000');
    
    // Login
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button:has-text("Sign In")');
    
    // Wait for redirect to profile
    await page.waitForURL('**/profile');
  });

  test('should complete full interaction logging flow', async ({ page }) => {
    // Navigate to interaction form
    await page.click('text=Document Interaction Log');
    await page.waitForURL('**/profile/personaloutform');

    // Fill general info
    await page.fill('input[placeholder="First Name"]', 'John');
    await page.fill('input[placeholder="Last Name"]', 'Smith');
    await page.fill('input[type="email"]', 'john@example.com');
    await page.fill('input[type="tel"]', '(555) 123-4567');

    // Select city
    await page.selectOption('select[name="city"]', 'Brooklyn');

    // Select support provided
    await page.check('input[value="food"]');
    await page.check('input[value="shelter_info"]');

    // Select "Yes" for details
    await page.click('input[type="radio"][value="Yes"]');

    // Add help request details
    await page.fill('input[placeholder="Person Name"]', 'Maria');
    await page.fill('textarea[placeholder="Additional Details"]', 'Needs housing');

    // Accept privacy terms
    await page.check('input[type="checkbox"]');

    // Submit
    await page.click('button:has-text("Submit")');

    // Verify success message
    await expect(page.locator('text=Successfully submitted')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Navigate to form
    await page.click('text=Document Interaction Log');

    // Try to submit without filling anything
    await page.click('button:has-text("Submit")');

    // Should show error
    await expect(
      page.locator('text=Please fill out the Form')
    ).toBeVisible();
  });
});
```

**Run E2E Tests:**

```bash
# Install Playwright
npm install -D @playwright/test

# Run tests
npx playwright test

# Run specific test
npx playwright test interaction-logging.e2e.js

# Debug mode
npx playwright test --debug
```

---

## 📊 Test Coverage

### Generate Coverage Report

```bash
npm test -- --coverage

# Output
SUMMARY:
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 File             | % Stmts | % Branch | % Funcs | % Lines
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 All files        |   85.2  |   78.3   |   82.1  |   86.4
 InteractionLog...│   92.1  |   88.5   |   90.0  |   91.2
 EventCardService│   79.3  |   72.1   |   75.0  |   80.1
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Coverage Goals:**
- Statements: 80%+
- Branches: 75%+
- Functions: 80%+
- Lines: 80%+

---

## 🔍 Debugging

### Debug Tests with Node Inspector

```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

Then open `chrome://inspect` in Chrome DevTools.

### Firestore Emulator Debugging

```bash
# Enable verbose logging
firebase emulators:start --inspect-functions

# Check Firestore UI
# Open http://localhost:4000 in browser
```

### Firebase Emulator Data Inspection

```bash
# Export emulator data
firebase emulators:export ./emulator-data

# Import for next run
firebase emulators:start --import=./emulator-data
```

---

## ✅ Testing Checklist

Before submitting a PR:

- [ ] All unit tests pass: `npm test`
- [ ] No console errors or warnings
- [ ] Firebase emulator tests pass
- [ ] Coverage above 80% for modified files
- [ ] E2E tests pass locally
- [ ] Manual browser testing completed
- [ ] Edge cases tested (empty inputs, errors, etc.)
- [ ] Async operations properly awaited
- [ ] Mocks cleaned up (jest.clearAllMocks())
- [ ] No hardcoded test data in production code

---

## 🔗 Quick Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- InteractionLogForm.test.js

# Run with coverage
npm test -- --coverage

# Update snapshots
npm test -- -u

# Run integration tests with emulator
firebase emulators:exec 'npm test -- --testPathPattern=integration'

# Debug test
node --inspect-brk node_modules/.bin/jest --runInBand

# E2E tests
npx playwright test

# E2E tests headed mode (see browser)
npx playwright test --headed
```

---

**Last Updated:** December 8, 2025  
**Node Version:** 18+  
**Jest Version:** 29+
