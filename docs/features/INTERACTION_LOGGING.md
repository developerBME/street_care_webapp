# Interaction Logging Feature Guide

## Overview

The Interaction Logging feature enables volunteers to document detailed interactions with homeless individuals. It captures both general outreach information and specific help requests, storing them as linked Firestore documents for flexible querying and reporting.

**Key Features:**
- Two-tier form: General info + optional detailed help requests
- Multi-step Firestore submission (4 atomic operations)
- Linked document references for efficient queries
- Privacy controls (public/private sharing)
- Status lifecycle tracking (Pending → Completed)
- Timestamp precision (start, end, interaction date)

**User Flow:**
```
User navigates to /profile/personaloutform
    ↓
Fills GeneralInfoForm (required)
    ↓
Selects "provide details per person?" (Yes/No)
    ↓
If Yes → DynamicSubSection for each individual
    ↓
Selects privacy consent checkbox
    ↓
Submits (4-step atomic write to Firestore)
    ↓
Success modal displayed
```

---

## 📊 Data Model

### InteractionLog Collection Schema

**Collection Path:** `REACT_APP_INTERACTION_LOG_COLLECTION_DEV` (dev) or `REACT_APP_INTERACTION_LOG_COLLECTION` (main)

```javascript
// obj1 - InteractionLog document structure
{
  // User Information
  userId: String,              // Firebase Auth UID (added by system)
  firstName: String,           // From GeneralInfoForm
  lastName: String,            // From GeneralInfoForm
  email: String,               // From GeneralInfoForm
  phoneNumber: String,         // From GeneralInfoForm
  
  // Timestamps (Firestore.Timestamp objects)
  startTimestamp: Timestamp,   // When volunteer started (converted from local Date)
  endTimestamp: Timestamp,     // When volunteer ended (converted from local Date)
  interactionDate: Timestamp,  // Date of interaction (converted from local Date)
  
  // Location Information
  addr1: String,               // Street address line 1
  addr2: String,               // Street address line 2 (optional)
  city: String,                // City
  state: String,               // State/Province
  zipcode: String,             // ZIP/Postal code
  country: String,             // Always "USA" by default
  
  // Interaction Details
  listOfSupportsProvided: [String],  // Array of support types (e.g., ["food", "clothing"])
  numPeopleHelped: Number,           // Total number of people helped (default: 1)
  numPeopleJoined: Number,           // Number of volunteers joined (default: 0)
  carePackagesDistributed: Number,   // Count of care packages (default: 0)
  carePackageContents: Object,       // { clothing: 5, food: 3, ... } (optional)
  
  // Help Request References
  helpRequestCount: Number,          // Count of linked help requests
  helpRequestDocIds: [String],       // Array of help request document IDs (added in STEP 4)
  
  // Status & Visibility
  isPublic: Boolean,                 // Privacy flag (checked by user)
  status: String,                    // "Pending" or "Completed" (admin sets to Approved/Rejected)
  
  // Metadata
  lastModifiedTimestamp: Timestamp,  // Set during submission (Timestamp.now())
  lastActionPerformed: String,       // Admin action (e.g., "approved", "flagged")
  outreachId: String,                // Link to outreach event (if applicable)
}
```

### HelpRequest Collection Schema

**Collection Path:** `REACT_APP_HELP_REQUEST_COLLECTION_DEV` (dev) or `REACT_APP_HELP_REQUEST_COLLECTION` (main)

```javascript
// obj2 - HelpRequest document structure (one per individual)
{
  // Links to Parent Documents
  interactionLogDocId: String,        // Reference to parent InteractionLog document
  interactionLogFirstName: String,    // Cached name for display
  
  // Individual Information
  firstName: String,                  // Name of person helped (from DynamicSubSection)
  locationLandmark: String,           // Where this specific person was located (e.g., "Park entrance")
  
  // Timestamps (Firestore.Timestamp objects)
  timestampOfInteraction: Timestamp,  // When helped this specific person
  followUpTimestamp: Timestamp,       // When to follow up (optional)
  
  // Help Categories (Arrays)
  helpProvidedCategory: [String],     // What was provided (e.g., ["food", "shelter info"])
  furtherHelpCategory: [String],      // What they still need (e.g., ["medical", "housing"])
  
  // Additional Context
  additionalDetails: String,          // Free-text description of interaction
  
  // Status & Visibility
  isPublic: Boolean,                  // Inherits from parent InteractionLog
  status: String,                     // "pending" or "completed"
  isCompleted: Boolean,               // Flag for follow-up tracking
  completedTimestamp: String,         // When follow-up was completed
  
  // Metadata
  lastModifiedTimestamp: Timestamp,   // Set during submission (Timestamp.now())
  lastActionPerformed: String,        // Admin action
}
```

---

## 🔄 Submission Workflow (4-Step Atomic Write)

The `handleSubmmit()` function in `InteractionLogForm.js` executes a carefully sequenced workflow:

### STEP 1: Form Validation

```javascript
// Check 1: If user selects "No" for details, GeneralInfo must not be empty
if (provideInteractionDetail === "No") {
  if (generalInfoRef.current.checkIsEmpty()) {
    setEmptyError(true);
    return;
  } else {
    interactionLogData = generalInfoRef.current.getGeneralInfoData();
  }
}

// Check 2: If user selects "Yes" for details, at least one form must have data
if (
  generalInfoRef.current.checkIsEmpty() &&
  provideInteractionDetail === "Yes" &&
  dynamicRef.current.checkIsEmpty()
) {
  setEmptyError(true);
  return;
}

// Check 3: If "Yes", DynamicSubSection must have at least one entry
if (provideInteractionDetail === "Yes") {
  if (dynamicRef.current.checkIsEmpty()) {
    setEmptyError(true);
    return;
  }
  helpRequestData = dynamicRef.current.getHelpRequestData();
}
```

**Validation Rules:**
- At least GeneralInfoForm OR DynamicSubSection must have data
- If "No" selected → GeneralInfoForm required
- If "Yes" selected → Both forms required
- Empty forms trigger `emptyError` state

### STEP 2: Augment InteractionLog Data

```javascript
// Convert local Date objects to Firestore Timestamps
const nativeStartDate = interactionLogData.startTimestamp?.toDate?.() ?? new Date();
const nativeEndDate = interactionLogData.endTimestamp?.toDate?.() ?? new Date();
const nativeDate = interactionLogData.interactionDate?.toDate?.() ?? new Date();

const augmentedInteractionLog = {
  ...interactionLogData,
  outreachId: "",
  lastActionPerformed: null,
  lastModifiedTimestamp: Timestamp.now(),
  isPublic: isPublic,                    // From checkbox
  helpRequestCount: null,                // Set in STEP 4
  startTimestamp: Timestamp.fromDate(nativeStartDate),
  endTimestamp: Timestamp.fromDate(nativeEndDate),
  interactionDate: Timestamp.fromDate(nativeDate),
};

// STEP 2: Write to Firestore
const interactionLogRef = await addDoc(
  collection(db, interactionLog_collection),
  augmentedInteractionLog
);

interactionLogDocId = interactionLogRef.id;           // Capture for linking
interactionLogFirstName = augmentedInteractionLog.firstName; // Capture for caching
```

**Key Transformations:**
- Convert date picker Date objects → `Firestore.Timestamp`
- Add system-generated fields (timestamps, status)
- Add privacy flag from checkbox
- Initialize help request count to null

### STEP 3: Create Help Request Documents

```javascript
if (provideInteractionDetail === "Yes") {
  const enrichedHelpEntry = helpRequestDataWithoutKeys.map((helpEntry) => ({
    ...helpEntry,
    interactionLogDocId: interactionLogDocId,          // Link to parent
    lastModifiedTimestamp: Timestamp.now(),
    
    // Convert timestamps (handle empty strings)
    timestampOfInteraction:
      helpEntry.timestampOfInteraction === ""
        ? null
        : Timestamp.fromDate(
            helpEntry.timestampOfInteraction?.toDate?.() ?? new Date()
          ),
    followUpTimestamp:
      helpEntry.followUpTimestamp === ""
        ? null
        : Timestamp.fromDate(
            helpEntry.followUpTimestamp?.toDate?.() ?? new Date()
          ),
    
    // Cache parent name for fast queries
    interactionLogFirstName: interactionLogFirstName,
    isPublic: isPublic,
  }));

  // Write each entry individually
  helpRequestDocIds = [];
  for (const entry of enrichedHelpEntry) {
    const helpRef = await addDoc(
      collection(db, helpRequest_collection),
      entry
    );
    helpRequestDocIds.push(helpRef.id);
  }
}
```

**Key Points:**
- Each individual entry → separate document
- Parent ID embedded in each child (denormalization for queries)
- Empty timestamps → null (optional timestamps)
- All entries share same `isPublic` flag

### STEP 4: Link Documents (Backref Update)

```javascript
// Only if both GeneralInfo AND HelpRequests exist
if (
  !generalInfoRef.current.checkIsEmpty() &&
  provideInteractionDetail === "Yes"
) {
  await updateDoc(
    doc(db, interactionLog_collection, interactionLogDocId),
    {
      helpRequestDocIds: helpRequestDocIds,      // Array of IDs
      helpRequestCount: helpRequestDocIds.length, // Count for quick access
    }
  );
}
```

**Why This Step?**
- Parent document needs to reference children for pagination queries
- Count enables quick filtering without scanning all children
- Allows efficient queries like "show interactions with >2 help requests"

### Error Handling

```javascript
try {
  // All 4 steps execute here
  handleSubmmit();
} catch (error) {
  console.error("❌ Submission failed:", error);
  // TODO: Set error state and display user-friendly message
  // Consider partial rollback if STEP 3-4 fails
}

setSuccess(true); // Trigger confirmation modal
```

---

## 💻 Code Examples

### Example 1: Basic Interaction (No Details)

**Form Filled:**
- Name: John Smith
- Email: john@example.com
- Phone: (555) 123-4567
- Location: Downtown Brooklyn
- Support Provided: Food, Shelter Info
- People Helped: 1
- No individual details selected

**Firestore Result:**
```
interactionLog/doc-123 {
  firstName: "John",
  lastName: "Smith",
  email: "john@example.com",
  phoneNumber: "(555) 123-4567",
  addr1: "Main St",
  city: "Brooklyn",
  state: "NY",
  zipcode: "11201",
  listOfSupportsProvided: ["food", "shelter_info"],
  numPeopleHelped: 1,
  helpRequestCount: 0,
  helpRequestDocIds: [],
  status: "Pending",
  isPublic: true,
  lastModifiedTimestamp: Timestamp(2024-12-08 14:30:00),
}
```

### Example 2: Detailed Interaction (With Help Requests)

**Form Filled:**
- General Info: Same as above
- Details selected: "Yes"
  - Person 1: Maria (food, need housing info)
  - Person 2: James (medical info, need job training)

**Firestore Result:**

```
interactionLog/doc-456 {
  firstName: "John",
  // ... general info fields ...
  listOfSupportsProvided: ["food"],
  numPeopleHelped: 2,
  helpRequestCount: 2,
  helpRequestDocIds: ["help-001", "help-002"],
  status: "Pending",
}

helpRequests/help-001 {
  interactionLogDocId: "doc-456",
  interactionLogFirstName: "John",
  firstName: "Maria",
  locationLandmark: "Central Park bench",
  timestampOfInteraction: Timestamp(...),
  helpProvidedCategory: ["food"],
  furtherHelpCategory: ["housing"],
  additionalDetails: "Maria is new to NYC, needs shelter",
  status: "pending",
  isCompleted: false,
}

helpRequests/help-002 {
  interactionLogDocId: "doc-456",
  interactionLogFirstName: "John",
  firstName: "James",
  locationLandmark: "Under bridge on 5th Ave",
  timestampOfInteraction: Timestamp(...),
  helpProvidedCategory: ["medical_info"],
  furtherHelpCategory: ["job_training"],
  additionalDetails: "Interested in job programs",
  status: "pending",
  isCompleted: false,
}
```

### Example 3: Retrieving Linked Data

```javascript
// Query: Get interaction with all details
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import collectionMapping from "../../utils/firestoreCollections";

const interactionLog_collection = collectionMapping.interactionLog;
const helpRequest_collection = collectionMapping.helpRequestsInteractionLog;

async function getInteractionWithDetails(interactionLogId) {
  try {
    // Fetch parent document
    const logRef = doc(db, interactionLog_collection, interactionLogId);
    const logSnap = await getDoc(logRef);
    
    if (!logSnap.exists()) {
      throw new Error("Interaction log not found");
    }
    
    const logData = logSnap.data();
    
    // If no help requests, return just the log
    if (!logData.helpRequestDocIds || logData.helpRequestDocIds.length === 0) {
      return {
        ...logData,
        helpRequests: [],
      };
    }
    
    // Batch fetch all help requests
    const helpRequestsPromises = logData.helpRequestDocIds.map((id) =>
      getDoc(doc(db, helpRequest_collection, id))
    );
    
    const helpRequestSnaps = await Promise.all(helpRequestsPromises);
    const helpRequests = helpRequestSnaps.map((snap) => ({
      id: snap.id,
      ...snap.data(),
    }));
    
    return {
      ...logData,
      helpRequests,
    };
  } catch (error) {
    console.error("Error fetching interaction details:", error);
    throw error;
  }
}

// Usage
const interaction = await getInteractionWithDetails("doc-456");
console.log(`Found ${interaction.helpRequests.length} people helped`);
```

### Example 4: Form Ref Usage (GeneralInfoForm)

The form uses React ref to expose validation and data retrieval methods:

```javascript
// Inside GeneralInfoForm component
const generalInfoRef = useRef();

// GeneralInfoForm exposes these methods via useImperativeHandle
// (See GeneralInfoForm.js for implementation)

// In InteractionLogForm:
const handleSubmit = async () => {
  // Check if empty
  if (generalInfoRef.current.checkIsEmpty()) {
    setEmptyError(true);
    return;
  }
  
  // Get form data
  const data = generalInfoRef.current.getGeneralInfoData();
  // Returns: { firstName, lastName, email, phoneNumber, ... }
};
```

---

## 🧪 Testing Checklist

### Test Suite: InteractionLogForm.test.js

#### 1. **Form Rendering**
- [ ] Page renders with "Thanks for helping out!" heading
- [ ] GeneralInfoForm component visible
- [ ] Radio buttons for "provide details?" are visible and default to "No"
- [ ] Privacy consent checkbox is present
- [ ] Submit button is present
- [ ] DynamicSubSection hidden initially

#### 2. **Form Validation**

**Test 2.1: Empty Form Submission**
```javascript
it("should show error when entire form is empty", async () => {
  const { getByRole, getByText } = render(<InteractionLogForm />);
  
  // Try to submit without filling anything
  fireEvent.click(getByRole("button", { name: /submit/i }));
  
  // Should show error message
  await waitFor(() => {
    expect(getByText(/entire form cannot be empty/i)).toBeInTheDocument();
  });
});
```

**Test 2.2: GeneralInfo Only (No Details)**
```javascript
it("should accept submission with only GeneralInfo (No details)", async () => {
  const { getByRole } = render(<InteractionLogForm />);
  
  // Select "No" for details
  fireEvent.click(getByRole("radio", { value: "No" }));
  
  // Fill GeneralInfoForm (mocked)
  // This should not be empty
  
  // Submit
  fireEvent.click(getByRole("button", { name: /submit/i }));
  
  // Should succeed
  await waitFor(() => {
    expect(mockAddDoc).toHaveBeenCalledTimes(1); // Only InteractionLog
  });
});
```

**Test 2.3: Details Selected but Empty**
```javascript
it("should show error when 'Yes' selected but DynamicSubSection empty", async () => {
  const { getByRole, getByText } = render(<InteractionLogForm />);
  
  // Select "Yes" for details
  fireEvent.click(getByRole("radio", { value: "Yes" }));
  
  // GeneralInfo has data
  // But DynamicSubSection is empty
  
  // Try to submit
  fireEvent.click(getByRole("button", { name: /submit/i }));
  
  // Should show error
  await waitFor(() => {
    expect(getByText(/entire form cannot be empty/i)).toBeInTheDocument();
  });
});
```

#### 3. **Timestamp Handling**

**Test 3.1: Date Conversion**
```javascript
it("should convert date picker dates to Firestore Timestamps", async () => {
  const { getByRole } = render(<InteractionLogForm />);
  
  // Mock date picker to return specific date
  const testDate = new Date("2024-12-08T14:30:00");
  
  // Fill form with date
  // Submit
  fireEvent.click(getByRole("button", { name: /submit/i }));
  
  // Verify addDoc called with Timestamp
  await waitFor(() => {
    const callArgs = mockAddDoc.mock.calls[0][1]; // Get second arg (data)
    expect(callArgs.interactionDate).toBeInstanceOf(Timestamp);
    expect(callArgs.startTimestamp).toBeInstanceOf(Timestamp);
    expect(callArgs.endTimestamp).toBeInstanceOf(Timestamp);
  });
});
```

**Test 3.2: Empty Timestamp Handling**
```javascript
it("should set empty timestamps to null (not 1970)", async () => {
  const { getByRole } = render(<InteractionLogForm />);
  
  // Select "Yes" for details with empty followUp timestamp
  fireEvent.click(getByRole("radio", { value: "Yes" }));
  
  // Fill form with empty followUpTimestamp
  // Submit
  fireEvent.click(getByRole("button", { name: /submit/i }));
  
  // Verify followUpTimestamp is null, not a default date
  await waitFor(() => {
    const helpRequestCall = mockAddDoc.mock.calls[1][1];
    expect(helpRequestCall.followUpTimestamp).toBeNull();
  });
});
```

#### 4. **Multi-Step Submission**

**Test 4.1: 4-Step Write Sequence**
```javascript
it("should execute 4-step submission for full form", async () => {
  const { getByRole } = render(<InteractionLogForm />);
  
  // Select "Yes" for details
  fireEvent.click(getByRole("radio", { value: "Yes" }));
  
  // Fill both GeneralInfoForm and DynamicSubSection with 2 entries
  // Submit
  fireEvent.click(getByRole("button", { name: /submit/i }));
  
  await waitFor(() => {
    // STEP 2: InteractionLog created
    expect(mockAddDoc).toHaveBeenNthCalledWith(1, expect.anything(), 
      expect.objectContaining({ firstName: "John" })
    );
    
    // STEP 3: Two HelpRequests created
    expect(mockAddDoc).toHaveBeenNthCalledWith(2, expect.anything(), 
      expect.objectContaining({ firstName: "Maria" })
    );
    expect(mockAddDoc).toHaveBeenNthCalledWith(3, expect.anything(), 
      expect.objectContaining({ firstName: "James" })
    );
    
    // STEP 4: InteractionLog updated with IDs
    expect(mockUpdateDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        helpRequestDocIds: ["help-001", "help-002"],
        helpRequestCount: 2,
      })
    );
  });
});
```

**Test 4.2: Partial Submission (GeneralInfo Only)**
```javascript
it("should skip STEP 3-4 if only GeneralInfo submitted", async () => {
  const { getByRole } = render(<InteractionLogForm />);
  
  // Select "No" for details
  fireEvent.click(getByRole("radio", { value: "No" }));
  
  // Fill only GeneralInfoForm
  // Submit
  fireEvent.click(getByRole("button", { name: /submit/i }));
  
  await waitFor(() => {
    // Only 1 addDoc call (STEP 2)
    expect(mockAddDoc).toHaveBeenCalledTimes(1);
    
    // No updateDoc call (STEP 4 skipped)
    expect(mockUpdateDoc).not.toHaveBeenCalled();
  });
});
```

#### 5. **Privacy Control**

**Test 5.1: Checkbox State**
```javascript
it("should toggle privacy checkbox", async () => {
  const { getByRole } = render(<InteractionLogForm />);
  
  const checkbox = getByRole("checkbox");
  
  // Initially unchecked
  expect(checkbox).not.toBeChecked();
  
  // Toggle
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  
  // Toggle back
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});
```

**Test 5.2: Privacy Flag in Submission**
```javascript
it("should pass isPublic flag to Firestore based on checkbox", async () => {
  const { getByRole } = render(<InteractionLogForm />);
  
  // Check privacy box
  fireEvent.click(getByRole("checkbox"));
  
  // Fill and submit
  // ...
  
  // Verify isPublic: true in both documents
  await waitFor(() => {
    const logCall = mockAddDoc.mock.calls[0][1];
    expect(logCall.isPublic).toBe(true);
    
    const helpCall = mockAddDoc.mock.calls[1][1];
    expect(helpCall.isPublic).toBe(true);
  });
});
```

#### 6. **Success Flow**

**Test 6.1: Success Modal Display**
```javascript
it("should display success modal after submission", async () => {
  const { getByRole, getByText } = render(<InteractionLogForm />);
  
  // Fill and submit form
  // ...
  fireEvent.click(getByRole("button", { name: /submit/i }));
  
  // Modal should appear
  await waitFor(() => {
    expect(getByText(/confirmation|success/i)).toBeInTheDocument();
  });
});
```

**Test 6.2: Error Handling**
```javascript
it("should handle Firestore errors gracefully", async () => {
  mockAddDoc.mockRejectedValueOnce(new Error("Network error"));
  
  const { getByRole } = render(<InteractionLogForm />);
  
  // Fill and submit
  // ...
  fireEvent.click(getByRole("button", { name: /submit/i }));
  
  // Should not show success modal
  await waitFor(() => {
    expect(mockAddDoc).toHaveBeenCalled();
    // Error should be logged or displayed
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("Submission failed")
    );
  });
});
```

#### 7. **Integration Tests (With Firebase Emulator)**

**Test 7.1: End-to-End Submission**
```javascript
it("should submit form and verify documents in Firestore", async () => {
  // Initialize Firebase emulator
  connectFirestoreEmulator(db, 'localhost', 8080);
  
  const { getByRole } = render(<InteractionLogForm />);
  
  // Select "Yes" and fill both forms
  // ...
  fireEvent.click(getByRole("button", { name: /submit/i }));
  
  // Verify documents exist in Firestore
  await waitFor(async () => {
    const logsSnapshot = await getDocs(
      collection(db, "interactionLog_dev")
    );
    expect(logsSnapshot.size).toBe(1);
    
    const helpsSnapshot = await getDocs(
      collection(db, "helpRequests_dev")
    );
    expect(helpsSnapshot.size).toBe(2);
  });
});
```

**Test 7.2: Document Linking Verification**
```javascript
it("should correctly link InteractionLog and HelpRequests", async () => {
  connectFirestoreEmulator(db, 'localhost', 8080);
  
  // ... submit form with 2 help requests ...
  
  await waitFor(async () => {
    // Get InteractionLog
    const logSnap = await getDocs(
      collection(db, "interactionLog_dev")
    );
    const logData = logSnap.docs[0].data();
    
    // Verify it references both help requests
    expect(logData.helpRequestDocIds).toHaveLength(2);
    expect(logData.helpRequestCount).toBe(2);
    
    // Get HelpRequests and verify back-links
    const helpsSnap = await getDocs(
      collection(db, "helpRequests_dev")
    );
    helpsSnap.docs.forEach(helpDoc => {
      expect(helpDoc.data().interactionLogDocId).toBe(logSnap.docs[0].id);
    });
  });
});
```

---

## 🤝 Contributing & Development

### Setting Up for Feature Development

1. **Component Structure**
   - `InteractionLogForm.js` - Main form orchestrator (ref management)
   - `GeneralInfoForm.js` - Volunteer info section (must export `checkIsEmpty()`, `getGeneralInfoData()`)
   - `DynamicSubSection.js` - Help request sections (must export `checkIsEmpty()`, `getHelpRequestData()`)
   - `ConfirmationModalInteractionLog.js` - Success feedback

2. **Reference Pattern (Important)**
   ```javascript
   // Refs allow form components to expose validation/data methods
   const generalInfoRef = useRef();
   const dynamicRef = useRef();
   
   // Parent component can call child methods:
   generalInfoRef.current.checkIsEmpty()      // Boolean
   generalInfoRef.current.getGeneralInfoData() // Object
   ```

3. **Adding New Fields to InteractionLog**
   - Update `obj1` schema at top of `InteractionLogForm.js`
   - Add field to `GeneralInfoForm` component
   - Verify timestamp fields are handled correctly
   - Update test schemas

4. **Adding New Help Request Fields**
   - Update `obj2` schema
   - Add field to `DynamicSubSection` component
   - Ensure timestamp conversion in STEP 3
   - Update tests

### Common Pitfalls

1. **Timestamp Conversion**
   - ❌ Don't pass raw Date objects to Firestore
   - ✅ Do: `Timestamp.fromDate(nativeDate)`
   - Handle empty timestamps as `null`, not default date

2. **Form Validation Logic**
   - ❌ Don't validate only one form when both are required
   - ✅ Do: Check both forms before "Yes" submission
   - Consider UX: show validation errors near problem field

3. **Document Linking**
   - ❌ Don't forget STEP 4 (the backref update)
   - ✅ Do: Batch fetch help requests using `helpRequestDocIds` array
   - Use ID cache for efficient queries

4. **Error Handling**
   - ❌ Don't silently fail submissions
   - ✅ Do: Catch errors and display user-friendly messages
   - Consider partial rollback if multi-step fails

---

## 🔗 Related Documentation

- **Data Architecture**: [DATA_ARCHITECTURE.md](../DATA_ARCHITECTURE.md) - Complete Firestore schema
- **Testing Guide**: [TESTING.md](../TESTING.md) - Jest setup, Firebase emulator
- **Email Notifications**: [CLOUD_FUNCTIONS.md](../CLOUD_FUNCTIONS.md) - Confirmation emails
- **User Profiles**: [USER_PROFILES.md](./USER_PROFILES.md) - Viewing interaction history

---

**Last Updated:** December 8, 2025  
**Component Status:** ✅ Stable  
**Test Coverage:** 🟡 Partial (expand integration tests)
