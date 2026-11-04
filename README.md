# Street Care Web App
> www.streetcarenow.org

A volunteer management and outreach platform built for [Bright Mind Enrichment](https://www.brightmindenrichment.org). It enables volunteers to log street care visits, manage outreach events, submit help requests, and coordinate community efforts.

## Prerequisites

- Node.js 18+
- Firebase CLI (`npm install -g firebase-tools`)
- Access to the Firebase project (`streetcaredev` for dev, `streetcare-d0f33` for production)

## Local Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**

   Create a `.env` file in the project root with the following keys:

   ```env
   # Firebase project config
   REACT_APP_FIREBASE_API_KEY=
   REACT_APP_AUTH_DOMAIN=
   REACT_APP_DATABASE_URL=
   REACT_APP_PROJECT_ID=
   REACT_APP_STORAGE_BUCKET=
   REACT_APP_MESSAGING_SENDER_ID=
   REACT_APP_APP_ID=
   REACT_APP_MEASUREMENT_ID=

   # Environment switch: "main" or "development"
   REACT_APP_ENV=development

   # Firestore collection names (shared across environments)
   REACT_APP_USERS_COLLECTION=
   REACT_APP_BANNED_USER_COLLECTION=
   REACT_APP_ADMIN_USER_COLLECTION=
   REACT_APP_BMEEVENTS_COLLECTION=
   REACT_APP_HELP_REQUESTS_COLLECTION=
   REACT_APP_CONTACTS_COLLECTION=
   REACT_APP_TEST_USER_COLLECTION=
   REACT_APP_AUDIT_LOG_COLLECTION=
   REACT_APP_OFFICIAL_EVENTS=
   REACT_APP_EVENTS_COLLECTION=
   REACT_APP_HELP_REQUEST_COLLECTION=
   REACT_APP_INTERACTION_LOG_COLLECTION=
   REACT_APP_METRICS_COLLECTION=

   # Firestore collections for "main" environment
   REACT_APP_MAIN_OUTREACH_EVENTS_COLLECTION=
   REACT_APP_MAIN_VISIT_LOG_COLLECTION=
   REACT_APP_MAIN_VISIT_LOG_NEW_COLLECTION=

   # Firestore collections for "development" environment
   REACT_APP_DEV_OUTREACH_EVENTS_COLLECTION=
   REACT_APP_DEV_VISIT_LOG_COLLECTION=
   REACT_APP_DEV_VISIT_LOG_NEW_COLLECTION=
   REACT_APP_HELP_REQUEST_COLLECTION_DEV=
   REACT_APP_INTERACTION_LOG_COLLECTION_DEV=

   # External APIs
   REACT_APP_GOOGLE_PLACES_API_KEY=
   REACT_APP_X_PARSE_APPLICATION_ID=
   REACT_APP_X_PARSE_REST_API_KEY=

   # Used by Cloud Functions (email/2FA)
   REACT_APP_CLIENT_ID=
   REACT_APP_CLIENT_SECRET=
   REACT_APP_REFRESH_TOKEN=
   REACT_APP_EMAIL=
   REACT_APP_SECRET_KEY=
   REACT_APP_confirmationLink=
   ```

   Contact the project maintainers for the actual values.

3. **Start the dev server**
   ```bash
   npm start
   ```
   App runs at `http://localhost:3000`.

## Firebase Cloud Functions

The `functions/` directory is a separate Node 18 package for backend logic (email sending, 2FA, audit logging, email scheduling).

```bash
cd functions
npm install

# Run locally with the Firebase emulator
npm run serve

# Deploy to Firebase
npm run deploy
```

## Environment Switching

`REACT_APP_ENV` controls which set of Firestore collections the app reads from:

| Value | Usage |
|---|---|
| `development` | Dev/staging Firestore collections |
| `main` | Production Firestore collections |

Collection names for each environment are mapped in `src/utils/firestoreCollections.js`.

## Deployment

The frontend deploys to GitHub Pages:

```bash
npm run build
npm run deploy
```

Cloud Functions deploy separately from the `functions/` directory (see above).

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6 |
| Styling | Tailwind CSS, Material-UI (MUI) |
| Backend/DB | Firebase (Auth, Firestore, Storage) |
| Functions | Firebase Cloud Functions (Node 18) |
| Hosting | GitHub Pages (frontend), Firebase (functions) |
