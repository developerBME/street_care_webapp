# Past Outreach Events â Street Care

## Overview
The **Past Outreach Events** section displays previously completed community outreach events. It highlights historical outreach activity, allowing users to review past efforts and understand community impact over time.

Users can:
- View a preview of recently completed outreaches
- Navigate to view all past outreach events
- Create a new outreach event

---

## File Location

**Component**
```
street_care_webapp/src/component/Community/CommunityOutreachEventsPast.js
```

---

## Component Responsibilities

The `CommunityOutreachEventsPast` component is responsible for:

- Fetching outreach events from the backend
- Identifying and displaying only past events
- Sorting events in descending order by date
- Rendering loading skeletons during data fetch
- Providing navigation to create and view past outreaches

---

## Data & State Management

### State Variables

| State Variable   | Purpose |
|-----------------|---------|
| events          | Stores all fetched outreach events |
| isLoading       | Controls loading state |
| eventsDisplay   | Holds processed events ready for rendering |
| visibleItems    | Controls pagination size (default: 3) |

### Data Fetching

- Events are retrieved using:
  ```js
  fetchEvents()
  ```
- Events are sorted by `eventDate` in descending order (most recent first)

### Past Event Filtering

- Events are classified as past when:
  ```js
  eventDate < current date
  ```
- Only the latest three past events are shown in the preview
- Firestore timestamps are converted using `formatDate`

---

## Page Layout & Behavior

### Header Section

- Displays the title: `Past Outreaches (X)`
- Shows the total count of past events
- Includes a short description explaining outreach value
- Provides a **Create an Outreach** button

### Create an Outreach

- Navigates users to:
  ```
  /createOutreach
  ```

### View All Past Outreaches

- Navigates users to:
  ```
  /allPastOutreachEvents
  ```

### Past Outreach Event Cards

- Rendered using the `OutreachEventCard` component
- `isPastEvent={true}` flag enables past-event-specific UI behavior
- Event dates are formatted for readability
- Cards are displayed in a responsive grid

---

## Related Components

- `OutreachEventCard` â Displays individual past event information
- `formatDate` â Utility for formatting timestamps

---

## Notes

- Only past events are shown (events that have already occurred)
- Preview list shows a limited number of events by default
- Component is optimized for both preview and full-page navigation
