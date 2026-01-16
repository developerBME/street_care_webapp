# How To Help Page – Street Care

## Overview

The **How To Help** page is designed to:
- Educate users on how they can contribute to Street Care’s mission
- Drive signups for outreach events
- Encourage verified participation
- Act as a conversion-focused page for new and returning users

This page bridges **intent → action** by clearly showing *what to do next*.

---

## Where This Page Lives (Code)

**Entry Component**
```
street_care_webapp/src/component/HowtoHelp/HowToHelp.js
```

## How to help Page Sections

### 1. Impact Awareness

 **Purpose**

- Creates emotional context and urgency.

**Content**
- Headline: *Make a Difference, Your Support Transforms Lives*
- Awareness statistics:
  - **771k+** homeless population in the U.S.
  - **24%** homeless due to health conditions

---

### 2. How To Help – Step-by-Step Guide

 **Step 1 – Join an Outreach**
- Create a new outreach or sign up for existing ones
- Introduces Help Requests

**Step 2 – Prepare an Outreach**
- Care package guidance
- Items to skip

**Step 3 – Attend Outreach**
- Empathy, safety, preparation

**Step 4 – Document Interaction**
- Log experiences
- Earn badges

---

### 3. EventOutreachesSection Component

 **Component**

- `<EventOutreachesSection />`

**Purpose**
- Displays live outreach opportunities and encourages immediate participation.

**Navigation**

- Clicking **View all** redirects users to:

  ```
  /allOutreachEvents
  ```

  This route displays **Upcoming Outreach Events**.

**Related Documentation**
- [View Upcoming Outreach Events](./upcoming_outreach_events_page.md)

---

### 4. Get Verified Popup

**Purpose**
- Verification enables:
  - Posting events
  - Logging interactions

**CTA**
- **Become a Member**

**Redirect**

- https://streetcare.us/chapter-membership-form/

---

### 5. Event Rendering

```jsx
{events.map((eventData) => (
  <OutreachEventCard
    key={eventData.id}
    cardData={{
      ...eventData,
      eventDate: eventData.eventDate?.seconds
        ? formatDate(new Date(eventData.eventDate.seconds * 1000))
        : eventData.eventDate,
    }}
  />
))}
```

- Each card shows:
  - Organizer
  - Date & time
  - Location
  - Outreach category
  - Engagement actions

---