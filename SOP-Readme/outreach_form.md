# Outreach Creation Form â Street Care

## Overview
The **Outreach Form** component handles all user input required to create and publish a community outreach event. It collects event information, meetup details, support requirements, consent, and submission actions.

---

## File Location
```
street_care_webapp/src/component/Outreach/Form.js
```

---

## Props

| Prop | Required | Description |
|------|----------|-------------|
| hrid | Optional | Help Request ID used to associate the outreach event with a specific help request |

---

## Form Sections

### 1. Event Information

Collects basic event details:

- Event Name
- Contact Name
- Contact Email
- Event Description
- Participant Limit

---

### 2. Meetup Details

Collects location and timing information:

- Street Address
- City
- State
- ZIP Code
- Start Time (CST)
- End Time (CST)

---

### 3. Support Requirements

Defines the type of help needed for the outreach:

- Support Type
- Selectable Skill Tags (multi-select)

---

### 4. Consent

- Checkbox allowing sharing of contact and event details with participants
- Required for publishing the outreach event

---

### 5. Action Buttons

- **Cancel**
  - Discards changes
  - Navigates away from the form

- **Publish**
  - Validates input
  - Submits outreach event data
  - Publishes the event for community participation

---

## Behavior Notes

- All times are handled in **CST**
- Validation occurs before submission
- The form supports both standalone outreach creation and outreach linked to a Help Request

---

## Related Components

- `CreateOutreach.js` â Page container and routing logic
- Profile Page â Navigation target for cancel/back actions

---

## Usage Summary

The Outreach Form is designed to be reusable and modular, allowing outreach events to be created independently or in response to an existing Help Request.


