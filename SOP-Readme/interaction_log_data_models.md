# Interaction Log â Data Models

## Overview
This document describes the data models used by the **Interaction Log** feature in Street Care. These models are stored in Firestore and support both general outreach interactions and optional per-person support records.

---

## Interaction Log Object

The **Interaction Log** object stores high-level information about an outreach interaction.

### Stored Fields

- User details and contact information
- Interaction date
- Start and end timestamps
- Location details
- Summary metrics
  - Number of people helped
  - Care packages distributed
  - Additional outreach metrics
- Public visibility status (`isPublic`)
- Status (active, submitted, archived)
- Audit timestamps
  - Created at
  - Updated at

---

## Help Request Object (Optional)

The **Help Request** object stores per-person interaction details when individual logging is enabled.

### Stored Fields

- Help categories provided
- Follow-up needs
- Interaction start and end timestamps
- Additional notes
- Public visibility status
- Status
- Audit timestamps

Each Help Request:
- Is stored as a separate Firestore document
- Is linked back to the parent Interaction Log

---

## Relationships

- One **Interaction Log** can be linked to zero or more **Help Request** objects
- Help Request documents store a reference to the parent Interaction Log ID
- Interaction Log documents maintain an array of linked Help Request IDs

---

## Visibility Rules

- Public visibility is controlled by a single user consent checkbox
- Visibility settings apply to:
  - The Interaction Log
  - All associated Help Request documents

---

## Data Integrity Notes

- Firestore writes are performed sequentially to maintain data consistency
- Linked document IDs are written back to the parent Interaction Log
- Duplicate submissions are prevented after successful writes

---

## Usage Summary

These data models enable flexible outreach reporting, supporting both summary-level interactions and detailed individual support records while maintaining transparency and privacy controls.


