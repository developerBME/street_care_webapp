# Create Outreach â Street Care

## Overview
The **Create Outreach** page allows users to create and publish a community outreach event for Street Care. The page collects event details, meetup location, timing, participant limits, and required support, then publishes the outreach for community participation.

This page can optionally associate an outreach event with an existing **Help Request**.

---

## File Location
```
street_care_webapp/src/component/Outreach/CreateOutreach.js
```

---

## Route Configuration

### Route
```
/createOutreach/:helpreqid
```

### Route Parameters

| Parameter  | Required | Description |
|-----------|----------|-------------|
| helpreqid | Optional | Help Request ID used to associate the outreach with a specific help request |

The `helpreqid` parameter is read from the route and forwarded to the outreach form as `hrid`.

---

## Component Responsibilities

The `CreateOutreach` component is responsible for:

- Rendering the page-level layout
- Applying the gradient background styling
- Displaying navigation back to the **Profile** page
- Reading route parameters using `useParams`
- Passing the Help Request ID (`hrid`) to the outreach form
- Rendering the outreach creation form container

---

## Page Layout

### Return to Profile Navigation

- Displays a back arrow with **"Return to Profile"** text
- Navigates to:
  ```
  /profile
  ```
- Implemented using `Link` from `react-router-dom`

---

### Outreach Creation Form

The outreach creation form is rendered using a separate form component.

**Rendered Component**
```
street_care_webapp/src/component/Outreach/Form.js
```

**Props Passed**

| Prop | Description |
|------|-------------|
| hrid | Help Request ID retrieved from the route (optional) |

---

## Data Flow

1. User navigates to `/createOutreach/:helpreqid`
2. `CreateOutreach` reads `helpreqid` using `useParams`
3. The value is passed to the form component as `hrid`
4. User completes the outreach form
5. Outreach event is published and optionally linked to the Help Request

---

## Related Files

- `Form.js` â Outreach creation form
- `Profile` â Destination for back/cancel navigation

---

## Notes

- Help Request association is optional
- Layout and navigation follow Street Care UI standards


