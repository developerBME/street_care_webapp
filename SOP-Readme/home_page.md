# Home Page – Street Care

## Overview

The Home Page is designed to:
- Introduce Street Care’s mission and values
- Showcase real-world impact and success metrics
- Provide quick access to outreach events and interaction logs
- Guide new users through the outreach process
- Offer transparency through past events and activity logs

It acts as a **navigation hub** connecting all major user actions.

---

## Where This Page Lives (Code)

**Entry Component:** `street_care_webapp\src\component\Home.js`

`Home.js` is responsible for:
- Listening to Firebase authentication state
- Fetching upcoming and past outreach events
- Managing modal state (signup, RSVP confirmation, withdraw)
- Composing all Home Page sections via child components

---

## Home Page Sections

### 1. Mission

**Purpose**
- Communicates Street Care’s core mission:
  - Supporting homeless individuals
  - Preparing care packages
  - Organizing and joining outreach events
- Encourages immediate action

**Key Actions**
- Browse Outreach Events
- Navigate to Login / Community / How to Help

**Component**
- `\street_care_webapp\src\component\HomePage\Landing.js`

---

### 2. Highlights of Our Success

**Purpose**
- Builds credibility and trust through measurable impact

**Metrics Displayed**
- Homeless People Aided
- Total Volunteers
- Items Shared
- People Mentored
- Total Outreach Reach
- Chapter Members

These metrics are dynamically driven from platform data.

**Component**
- `street_care_webapp\src\component\HomePage\Success2.js`

This section also includes **Quick Action Cards**:
- **Create an Outreach Event**
- **Create an Interaction Log**

**Navigation**

Clicking **Create an Outreach** button redirects users to:

```
/createOutreach
```

This route displays a form to create an outreach.

Clicking **Create an Interaction Log** button redirects users to:

```
/profile/interactionLogForm
```

This route displays a form to create an interaction log.

**Related Documentation**
- [Create an Outreach Event](./outreach_form.md)
- [Create an Interaction Log](./interaction_log_page.md)

---

### 3. Upcoming Outreach Events

**Purpose**
- Displays future outreach opportunities users can join or manage

**Features**
- Role-based visibility (Chapter Leader, Hub Leader, Member, Account Holder)
- Quick navigation to full event details
- Event signup and RSVP actions (via modal)

**Component**
- `street_care_webapp\src\component\UpcomingOutreachEvents.js`

**Navigation**

Clicking **->** or **More Upcoming Outreach Events** redirects users to:

```
/allOutreachEvents
```

This route displays **Upcoming Outreach Events**.


**Related Documentation**
- [Upcoming Outreach Events](./upcoming_outreach_events_page.md)

---

### 4. Past Outreach Events

**Purpose**
- Provides transparency and historical reference
- Allows users to review completed outreach events

**Features**
- Event cards with date, location, organizer, and categories
- Engagement actions (view, like, share)

**Component**
- `street_care_webapp\src\component\PastOutreachEvents.js`

**Navigation**

Clicking **->** or **More Past Outreach Events** redirects users to:

```
/allPastOutreachEvents
```

This route displays **Past Outreach Events**.

**Related Documentation**
- [Past Outreach Events](./past_outreach_events_page.md)

---

### 5. Latest Actions – Interaction Logs

**Purpose**
- Shows recent interaction activity across the platform
- Reinforces accountability and storytelling

**Features**
- Displays recent interaction logs (if available)
- Quick access to full interaction history

**Component**
- `street_care_webapp\src\component\HomePage\HomePageVisitlog.js`

**Navigation**

Clicking **->** or **More Interaction Logs** redirects users to:

```
/allOutreachVisitLog
```

This route displays **Interaction Logs**.

**Related Documentation**
- [Interaction Logs](./interaction_log_data_models.md)

---

### 6. How the Process Comes Together

**Purpose**
- Educates new users on the end-to-end outreach flow

**Steps**
1. Sign up / Initiate Group Outreach  
2. Pack Care Bags  
3. Go to the Outreach  
4. Document the Experience  

**Component**
- `\street_care_webapp\src\component\HomePage\Process2.js`

This section bridges intent with execution.

---

### 7. Global Presence

**Purpose**
- Highlights Street Care’s international footprint

**Regions Displayed**
- United States (New York, Maryland, Florida)
- Canada (Ottawa)
- India
- Kenya

**Component**
- `street_care_webapp\src\component\HomePage\Map.js`

This reinforces the global scale of impact.

---

### 8. Frequently Asked Questions (FAQ)

**Purpose**
- Addresses common questions about:
  - Services offered
  - Volunteer involvement
  - Geographic reach
  - Impact stories

Designed to reduce friction for new users.

**Component**
- `street_care_webapp\src\component\HomePage\FAQs2.js`

---