# Interaction Log â Street Care

## Overview
The **Interaction Log** page allows users to document real-world outreach interactions with individuals they have supported. These logs help capture community impact, understand ongoing needs, and maintain transparency across Street Care outreach efforts.

Users can:
- Record general interaction details
- Optionally log per-person support details
- Control public visibility of interactions
- Securely submit interaction data to the platform

---

## File Location

**Primary Component**
```
street_care_webapp/src/component/InteractionLog/InteractionLogForm.js
```

---

## Component Responsibilities

The `InteractionLogForm` component is responsible for:

- Rendering the interaction log creation form
- Validating required and optional user input
- Supporting optional per-person interaction details
- Writing interaction logs and related help requests to Firestore
- Managing public visibility consent
- Displaying submission success confirmation

---

## Page Structure & Flow

### Return to Profile Navigation

- Displays back navigation at the top of the page
- Navigates to:
  ```
  /profile
  ```

---

### General Information Section

**Component**
```
GeneralInfoForm.js
```

**Purpose**
- Captures overall interaction details
- Required if no per-person interaction details are provided

---

### Interaction Detail Toggle

Users select whether they want to log individual-level interactions:

- **No** â Submit only general interaction details
- **Yes** â Provide detailed logs for each person supported

This selection controls whether the dynamic interaction subsection is rendered.

---

### Dynamic Interaction Details (Optional)

**Component**
```
DynamicSubSection.js
```

**Purpose**
- Allows logging individual help requests
- Supports multiple entries
- Each entry is saved as a separate Firestore document
- Entries are linked to the main interaction log

---

### Public Visibility Consent

- Checkbox allowing users to mark the interaction as public
- Consent text explains visibility and privacy implications
- Applies to both the interaction log and associated help requests

---

## Submission & Validation

### Validation Rules

- Entire form cannot be empty
- At least one valid section must be completed
- Dynamic subsection requires at least one entry if enabled

---

### Submission Steps

1. Validate user input
2. Create the interaction log document
3. Create associated help request documents (if applicable)
4. Update interaction log with linked help request IDs
5. Display confirmation modal

---

## Confirmation & Success State

- A confirmation modal is displayed upon successful submission
- Confirms that the interaction log has been saved
- Prevents duplicate submissions

---

## Related Components

- `InteractionLogForm.js` â Main form container
- `GeneralInfoForm.js` â General interaction details
- `DynamicSubSection.js` â Per-person interaction details
- Profile Page â Navigation destination

---

## Notes

- Public visibility settings apply consistently across all saved records
- Firestore writes are transactional and linked via document IDs
- Designed to support both high-level outreach reporting and detailed individual impact tracking


