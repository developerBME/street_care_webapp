# Street Care Web App

This repository contains the **Street Care Web Application**, a React-based web app that uses Firebase/Firestore with environment-based collection mapping.

---

## Prerequisites

Ensure the following are installed on your system:S

- **Node.js** (LTS recommended)
- **npm** (included with Node.js)
- **Git**
- A code editor (Visual Studio Code or Windsurf)

---

## Project Setup

### 1. Install a Code Editor

#### Option A: Visual Studio Code

Download and install from:  
https://code.visualstudio.com/

#### Option B: Windsurf IDE (Alternative)

Windsurf is an AI-powered IDE with built-in assistance and workflow automation.

---

### 2. Clone the Repository

```bash
git clone https://github.com/developerBME/street_care_webapp
```

---

### 3. Install Dependencies

```bash
cd street_care_webapp
npm install
```

---

### 4. Create and Configure the `.env` File

1. Open the project in your editor.
2. Inside the `STREET_CARE_WEBAPP` folder at the `src` folder level, create a file named `.env`.
3. Paste the provided environment configuration into this file.

**Do not commit the `.env` file.**

---

### 5. Configure Firestore Collections

Replace the contents of `firestoreCollections.js` with the following:

```js
const COLLECTIONS = {
  main: {
    users: process.env.REACT_APP_USERS_COLLECTION,
    bannedUser: process.env.REACT_APP_BANNED_USER_COLLECTION,
    adminUsers: process.env.REACT_APP_ADMIN_USER_COLLECTION,
    outreachEvents: process.env.REACT_APP_MAIN_OUTREACH_EVENTS_COLLECTION,
    visitLogs: process.env.REACT_APP_MAIN_VISIT_LOG_COLLECTION,
    bmeEvents: process.env.REACT_APP_BMEEVENTS_COLLECTION,
    helpRequests: process.env.REACT_APP_HELP_REQUESTS_COLLECTION,
    contacts: process.env.REACT_APP_CONTACTS_COLLECTION,
    testUser: process.env.REACT_APP_TEST_USER_COLLECTION,
    auditLog: process.env.REACT_APP_AUDIT_LOG_COLLECTION,
    officialEvents: process.env.REACT_APP_OFFICIAL_EVENTS,
    events: process.env.REACT_APP_EVENTS_COLLECTION,
  },
  development: {
    users: process.env.REACT_APP_USERS_COLLECTION,
    bannedUser: process.env.REACT_APP_BANNED_USER_COLLECTION,
    adminUsers: process.env.REACT_APP_ADMIN_USER_COLLECTION,
    outreachEvents: process.env.REACT_APP_DEV_OUTREACH_EVENTS_COLLECTION,
    visitLogs: process.env.REACT_APP_DEV_VISIT_LOG_COLLECTION,
    bmeEvents: process.env.REACT_APP_BMEEVENTS_COLLECTION,
    helpRequests: process.env.REACT_APP_HELP_REQUESTS_COLLECTION,
    contacts: process.env.REACT_APP_CONTACTS_COLLECTION,
    testUser: process.env.REACT_APP_TEST_USER_COLLECTION,
    auditLog: process.env.REACT_APP_AUDIT_LOG_COLLECTION,
    officialEvents: process.env.REACT_APP_OFFICIAL_EVENTS,
    events: process.env.REACT_APP_EVENTS_COLLECTION,
  },
};

const env = process.env.REACT_APP_ENV || "development";
const collectionMapping =
  env === "main" ? COLLECTIONS.main : COLLECTIONS.development;

export default collectionMapping;
```

---

### 6. Start the Application

```bash
npm start
```

---

## Environment Guidelines

- Always verify the active environment.
- **Do NOT use `main` for testing or development.**
- Use **`development`** for all local testing.

```env
REACT_APP_ENV=development
```

---

## Windsurf IDE (Optional)

Windsurf is a next-generation AI IDE with features like AI-assisted coding, workflow automation, and real-time collaboration.

---

## Notes

- Incorrect environment configuration can write data to the wrong Firestore collections.
- Double-check `.env` values before running or deploying.

---
