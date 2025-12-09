# Street Care - Empowering Volunteers to Help the Homeless

Street Care is a web platform built by homelessness and wellness experts that empowers volunteers to make a meaningful difference in the lives of homeless individuals. The platform provides clear, simple tutorials, guidance, and tools to facilitate community outreach efforts.

## 🎯 About Street Care

Street Care is an initiative of **Bright Mind Enrichment (BME)**, a 501(c)(3) nonprofit organization focused on fostering well-being, tenacity, curiosity, and creativity through community education. We utilize technology for good, creating programs to help as many people as possible support those experiencing homelessness.

### Key Features

* **Outreach Events**: Join or create community outreach events to help homeless individuals
* **Interaction Logging**: Document your outreach efforts and track your impact
* **Care Package Guidance**: Learn how to prepare thoughtful care packages
* **Community Connection**: Connect with other volunteers and build a compassionate community
* **Personal & Group Outreaches**: Support both individual and collaborative efforts
* **Badge System**: Earn badges and recognition for your volunteer work
* **Mobile App Integration**: Seamless experience across web and mobile platforms

## 📚 Documentation

For detailed documentation about features, data architecture, testing, and Cloud Functions, see:

* **[Feature Documentation](./docs/FEATURES.md)** - Complete feature guides with code examples and testing checklists
  * [Community Events](./docs/features/COMMUNITY_EVENTS.md)
  * [Interaction Logging](./docs/features/INTERACTION_LOGGING.md)
  * [Visit Logs](./docs/features/VISIT_LOGS.md)
  * [User Profiles](./docs/features/USER_PROFILES.md)
  * [Admin Dashboard](./docs/features/ADMIN_DASHBOARD.md)
  * [Authentication & 2FA](./docs/features/AUTHENTICATION.md)
* **[Cloud Functions Documentation](./docs/CLOUD_FUNCTIONS.md)** - Server-side functions, deployment, and testing
* **[Data Architecture](./docs/DATA_ARCHITECTURE.md)** - Firestore collections, schema, relationships
* **[Testing Guide](./docs/TESTING.md)** - Jest setup, emulator configuration, test patterns

## 🚀 Getting Started

### Prerequisites

* Node.js (v14 or higher)
* npm or yarn
* Firebase account (for authentication and database)

### Installation


1. Clone the repository:

```bash
git clone <repository-url>
cd street_care_webapp
```


2. Install dependencies:

```bash
npm install
```


3. Set up environment variables:
   Create a `.env` file in the root directory with your Firebase configuration:

```
REACT_APP_FIREBASE_API_KEY=<your-api-key>
REACT_APP_AUTH_DOMAIN=<your-auth-domain>
REACT_APP_PROJECT_ID=<your-project-id>
REACT_APP_STORAGE_BUCKET=<your-storage-bucket>
REACT_APP_MESSAGING_SENDER_ID=<your-sender-id>
REACT_APP_APP_ID=<your-app-id>
REACT_APP_ENV=main
```


4. Start the development server:

```bash
npm start
```

The app will open at `http://localhost:3000`

## 📦 Available Scripts

In the project directory, you can run:

### `npm start`


Runs the app in the development mode.Open <http://localhost:3000> to view it in your browser.


The page will reload when you make changes.You may also see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode. See [Testing Guide](./docs/TESTING.md) for more information and setup instructions.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run deploy`

Deploys the application to Firebase Hosting.

## 🏗️ Project Structure

```
street_care_webapp/
├── public/                 # Static files
├── src/
│   ├── component/         # React components (organized by feature)
│   │   ├── Community/     # Community outreach components
│   │   ├── UserProfile/   # User profile and forms
│   │   ├── HomePage/      # Home page sections
│   │   ├── HowtoHelp/     # Tutorial components
│   │   ├── Admin/         # Admin dashboard
│   │   ├── Buttons/       # Reusable button components
│   │   └── ...
│   ├── images/           # Image assets
│   ├── utils/            # Utility functions & constants
│   │   ├── firestoreCollections.js  # Collection name mapping
│   │   └── helperFns.js
│   ├── context/          # React context (user state)
│   ├── App.js            # Main app component
│   └── index.js          # Entry point
├── functions/            # Firebase Cloud Functions
│   ├── send2FA/         # Two-factor authentication
│   ├── send2FACodeForEmailUpdate/
│   ├── verifyUpdateEmail2FA/
│   ├── sendConfirmationLink/
│   └── ...
├── docs/                 # Documentation (see above)
├── package.json
├── tailwind.config.js    # Tailwind CSS configuration
├── firebase.json         # Firebase configuration
└── .env                  # Environment variables (not versioned)
```

## 🔐 Authentication

Street Care uses Firebase Authentication with:

* Google Sign-In
* Email/Password authentication
* Two-Factor Authentication (2FA) via Cloud Functions
* Custom user roles (Admin, Chapter Leader, etc.)

See [AUTHENTICATION.md](./docs/features/AUTHENTICATION.md) for detailed auth workflow.

## 🗄️ Database

The application uses Firebase Firestore for data storage with 13+ collections:

* `users` - User profiles and credentials
* `outreachEvents` - Community outreach events
* `interactionLog` - Volunteer interaction logs
* `helpRequests` - Individual help requests (linked to interactions)
* `visitLogs` / `visitLogsBookNew` - Visit tracking
* And more...

See [DATA_ARCHITECTURE.md](./docs/DATA_ARCHITECTURE.md) for complete schema reference.

## 🎨 Styling

The project uses:

* **Tailwind CSS** for utility-based styling
* **Custom fonts**: Bricolage, DM Sans, Inter, Open Sans
* **Responsive design** with mobile-first approach

## ☁️ Cloud Functions

Server-side logic handled by Firebase Cloud Functions:

* `send2FA` - Generate and send 2FA codes via Gmail API
* `sendConfirmationLink` - Email verification
* `emailScheduler` - Scheduled event reminders
* And more...

See [CLOUD_FUNCTIONS.md](./docs/CLOUD_FUNCTIONS.md) for detailed implementation and deployment guide.

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Start Firebase emulators for integration tests
firebase emulators:start
```

See [TESTING.md](./docs/TESTING.md) for comprehensive testing guide including unit, integration, and E2E tests.

## 📱 Mobile App

For a better experience on mobile, download our native app:

* **Android**: [Google Play Store](https://play.google.com/store/apps/details?id=com.app.bmeapplication1)
* **iOS**: [Apple App Store](https://apps.apple.com/us/app/street-care-help-the-homeless/id1553805037)

## 📊 Features in Detail

### For Volunteers

* Browse and join community outreach events
* Create personal or group outreaches
* Document interactions and track impact
* View volunteer history and badges
* Download the mobile app for on-the-go access

### For Organizations

* Create and manage BME Official Events
* Track volunteer participation
* Monitor community impact
* Review and approve user contributions

### Admin Features

* User management and moderation
* Event oversight and approval
* Analytics and reporting
* Post and content management
* Audit log viewing

## 🤝 Contributing

We welcome contributions! Before submitting a PR:


1. Read the relevant [feature documentation](./docs/FEATURES.md)
2. Follow the code examples and patterns
3. Complete all [test scenarios](./docs/TESTING.md)
4. Run tests locally: `npm test`
5. Reference the feature guide in your PR description

Each feature guide includes a "Contributing & Testing" section with specific guidelines.

## 📈 Our Impact

* **650k+** homeless population in the United States
* **1000+** homeless individuals helped
* **2300+** people mentored
* **264** dedicated volunteer hearts
* **2023 Platinum Seal** from Candid for transparency and accountability

## 📄 License

This project is proprietary software developed by Bright Mind Enrichment.

## 🙏 Acknowledgments

* All our dedicated volunteers and community members
* Bright Mind Enrichment team and leadership
* Our partners and supporters making this work possible

## 📞 Support & Contact

* **Website**: [streetcarenow.org](https://streetcarenow.org)
* **Contact Form**: Available on the platform
* **Email**: [support@brightmindenrichment.org](mailto:support@brightmindenrichment.org)


---

**Street Care**: Empowering volunteers to support homeless individuals with dignity, respect, and compassion.


---


**Last Updated:** December 8, 2025 **Documentation Version:** 1.0