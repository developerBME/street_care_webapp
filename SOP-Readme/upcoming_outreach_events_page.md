# Upcoming Outreach Events â Street Care

## Overview
The **Upcoming Outreach Events** section displays a preview of community-created outreach events for users to browse, view, and create. It serves as the main discovery entry point for outreach opportunities within the Street Care platform.

Users can:
- View upcoming events
- Navigate to the full list of outreach events
- Create a new outreach (if authenticated)

---

## File Location

**Component**
```
street_care_webapp/src/component/Community/CommunityOutreachEvent.js
```

---

## Component Responsibilities

The `CommunityOutreachEvent` component handles:

- Fetching upcoming outreach events from the backend
- Displaying a limited preview of events
- Showing loading skeletons during data fetch
- Managing authenticated and unauthenticated user actions
- Navigating to outreach creation and full event listings

---

## Data & State Management

### State Variables

| State Variable   | Purpose |
|-----------------|---------|
| events          | Stores fetched outreach events |
| isLoading       | Controls loading state |
| visibleItems    | Limits number of displayed events (default: 3) |
| filteredEvents  | Reserved for future filtering logic |
| selectedState   | Reserved for future filtering logic |

### Data Fetching

- Outreach events are retrieved on component mount using:
  ```js
  fetchPaginatedEvents()
  ```
- Fetched results are stored in `events` and rendered dynamically

---

## Page Layout & Behavior

### Header Section

- Displays the total number of upcoming outreaches
- Provides a brief description of the section
- Includes **Create an Outreach** button
- Includes **View All** navigation link

### Create an Outreach

- Authenticated users are routed to:
  ```
  /createOutreach
  ```
- Unauthenticated users are redirected to:
  ```
  /login
  ```
- Authentication is checked using Firebase Auth

### View All Outreaches

- Navigates users to:
  ```
  /allOutreachEvents
  ```

### Outreach Event Cards

- Events are displayed using the `OutreachEventCard` component
- While loading, `EventCardSkeleton` components are shown
- Event dates are formatted using `formatDate`
- Each card includes a **View Details** action

---

## Related Components

- `OutreachEventCard` â Displays individual event information
- `EventCardSkeleton` â Placeholder for loading state
- `formatDate` â Utility for date formatting

---

## Notes

- Preview list shows a limited number of events by default
- Designed to handle both authenticated and unauthenticated users
- Supports navigation to creation page and full event listings
- Component structure is optimized for reusability and scalability


