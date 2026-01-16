# Profile Page – Street Care

## Overview

The Profile Page serves as the personalized dashboard for authenticated users. It allows users to:
- View their profile information and achievements
- Track their personal impact on the platform
- Manage outreach participation
- Review created, signed-up, and liked outreach events
- View and document interaction logs

This page centralizes **user-specific actions and history**.

---

## Where This Page Lives (Code)

**Entry Component:**  
`street_care_webapp\src\component\UserProfile\Profile.js`

`Profile.js` is responsible for:
- Fetching user-specific data from Firestore
- Managing created, signed-up, and liked outreach events
- Rendering profile-level sections via child components
- Handling outreach signup and withdrawal modals
- Refreshing data after user interactions

---

## Main Profile Component (Key Code)

```jsx
function Profile() {
  const [createdEvents, setCreatedEvents] = useState([]);
  const [likedEvents, setLikedEvents] = useState([]);
  const [signedUpEvents, setSignedUpEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
}
```

This component initializes state for all user-related outreach data and triggers data loading on mount.

---

## Data Fetching Logic

```jsx
const fetchData = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      setCreatedEvents(await fetchUserOutreaches(uid));
      setSignedUpEvents(await fetchUserSignedUpOutreaches(uid));
      setLikedEvents(await fetchLikedOutreaches(uid));
    }
  } catch (error) {
    setIsError(true);
  } finally {
    setIsLoading(false);
  }
};
```

### What This Does
- Uses Firebase Authentication to identify the logged-in user
- Fetches all outreach-related data for that user
- Handles loading and error states cleanly

---

## Profile Page Sections

### 1. User Information & Achievements

**Purpose**
- Displays the user’s name, join date, profile image
- Shows badges and achievements
- Displays personal impact summary

**Component**
- `street_care_webapp\src\component\UserProfile\UserInfo.js`

---

### 2. Signed Up Outreaches

**Purpose**
- Shows outreach events the user has signed up for
- Allows withdrawal and navigation to full list

**Navigation**
- Clicking **More Signed Up Outreaches** redirects users to:

    ```
    /profile/allSignedUpOutreaches
    ```

    This route displays **Signed up Outreach Events**.

---

### 3. Liked Outreaches

**Purpose**
- Displays outreach events the user has liked
- Supports unlike and refresh

**Navigation**
- Clicking **More Signed Up Outreaches** redirects users to:

    ```
    /profile/allLikedOutreaches
    ```

    This route displays **Liked Outreach Events**.

---

### 4. Created Outreaches

**Purpose**
- Shows outreach events created by the user
- Provides quick access to create new outreach

**Component**
- `street_care_webapp\src\component\UserProfile\CreatedOutreaches.js`

**Navigation**
- Clicking **Create New Outreach** redirects users to:

    ```
    /createOutreach
    ```

    This route displays a form to create an Outreach event.

- Clicking **More Created Outreaches** button redirects users to:

    ```
    /profile/allCreatedOutreachesh
    ```

    This route displays **All created Outreache Events**.

📄 **Related Documentation**
- [Create Outreach Event](./outreach_form.md)

---

### 5. Interaction Logs (My Interaction Logs)

**Purpose**
- Displays interaction logs created by the user
- Enables documenting new interactions

**Component**
- `street_care_webapp\src\component\Community\OutreachVisitLogProfile.js`

**Navigation**
- - Clicking **Document New Interaction Log** redirects users to:

    ```
    /profile/personaloutform
    ```

    This route displays a form to create an interaction log.

**Related Documentation**
- [Create an Interaction Log](./interaction_log_page.md)

---