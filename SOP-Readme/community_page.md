# Community Page – Street Care

## Overview

The Community page enables users to:
- Explore **community-created outreach events**
- View **interaction logs** shared by the community
- Understand collective impact and activity
- Navigate to create or manage outreaches and logs (based on permissions)

---

## Where This Page Lives (Code)

**Entry Component:** `Community.js`

`street_care_webapp\src\component\Community\Community.js` is responsible for:
- Setting the page title
- Structuring the Community page layout
- Passing authentication state (`loggedIn`) to child components
- Rendering the main Community sections

Main components rendered:
- `Banner`
- `CommunityOutreachEvent`
- `CommunityVisitLog`

---

## Community Page Sections

### 1. Community Banner

**Purpose**
- Introduces the Community section
- Reinforces the idea of collective action and participation

**Component**
- `street_care_webapp\src\component\Community\Banner.js`

---

### 2. Community Outreaches

**Purpose**
- Displays outreach events created by community members
- Allows users to browse, view, and join outreaches

**Features**
- Lists upcoming community outreaches
- Shows outreach cards with organizer, date, and details
- Role-aware behavior based on authentication state

**Component**
- `street_care_webapp\src\component\Community\CommunityOutreachEvent.js`

**Navigation**

- Clicking **View all** redirects users to:

    ```
    /allOutreachEvents
    ```

    This route displays **Upcoming Outreach Events**.

- Clicking **Create an Outreach** button redirects users to:

    ```
    /createOutreach
    ```

    This route displays a form to create an outreach.

---

**Related Documentation**
- [Create an Outreach Event](./create_outreach_page.md)
- [Upcoming Outreach Events](./upcoming_outreach_events_page.md)

---

### 3. Community Interaction Logs

**Purpose**
- Displays interaction logs submitted by community members
- Promotes transparency, accountability, and storytelling

**Features**
- Lists recent interaction logs
- Graceful loading and error states
- Navigation to view all interaction logs

**Component**
- `street_care_webapp\src\component\Community\CommunityVisitLog.js`

**Navigation**

- Clicking **View all** redirects users to:

    ```
    /allOutreachVisitLog
    ```

    This route displays **Interaction Logs**.

- Clicking **Create an Interaction Log** button redirects users to:

    ```
    /profile/interactionLogForm
    ```

    This route displays a form to create an interaction log.

**Related Documentation**
- [Create an Interaction Log](./interaction_log_page.md)
- [Interaction Logs](./interaction_log_data_models.md)

---