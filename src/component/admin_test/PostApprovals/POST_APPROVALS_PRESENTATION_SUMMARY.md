# Post Approvals — Presentation Summary

## 1. Feature overview

The Post Approvals page allows an admin to review, approve or reject three types of pending posts:

- Outreach events
- Interaction logs
- Help requests

The main objective was to display the records efficiently and provide tab-wise search, sorting and pagination.

## 2. Data source

The data comes from Firebase Firestore.

The active tab decides which Firestore collection is queried. Every query includes:

```js
where("status", "==", "pending")
```

Therefore, only posts waiting for approval are displayed.

User details such as username, user type and profile photo are added separately using the post's `uid` or `userId`.

## 3. Pagination approach

The implementation uses Firestore cursor-based pagination instead of loading all posts together.

```text
Page 1 -> Fetch the first 6 documents
Page 2 -> Start after the last document of page 1
Page 3 -> Start after the last document of page 2
```

Firestore document snapshots are stored as page checkpoints. Previously visited checkpoints can be reused during navigation.

The reusable `usePagination` hook manages:

- Current page
- Page data
- Total record count
- Search, filter and sort parameters
- Loading and error states
- Firestore checkpoints
- Refreshing after an action

### Why this approach was used

- Only six posts are normally downloaded per page.
- It reduces unnecessary Firestore reads.
- Firestore supports cursor pagination better than offset-based pagination.
- The shared hook can be reused by other screens.

## 4. Search approach

Search is maintained separately for every tab through `useTabSearchSort`.

The input uses a 350 ms debounce. This prevents a new request from running after every character typed by the user.

The fields searched depend on the active tab. Examples include:

- Title
- Description
- Username
- City and state
- Person's name
- Help category

The search is case-insensitive and supports partial text using `.includes()`.

### Why search is handled locally

Firestore does not directly support case-insensitive substring search across multiple fields. Therefore, during an active search:

1. All pending posts from the active tab are fetched.
2. User details are added.
3. The posts are filtered across the configured fields.
4. Matching posts are sorted.
5. Only the requested six results are displayed.

It searches only the active tab, not all three tabs together.

## 5. Sorting approach

Each tab has its own default sort field and available sort options.

Examples include:

- Event date
- Last modified date
- Title
- Username
- City

Both ascending and descending directions are supported.

During normal browsing, Firestore applies the sorting before returning the page. During an active text search, matching posts are sorted in JavaScript before the requested result page is selected.

## 6. Combined workflow

```text
Admin opens Post Approvals
    -> Outreach tab is selected by default
    -> Pending counts are loaded for all tabs
    -> First 6 pending posts are fetched
    -> User details are added
    -> Cards are displayed
    -> Admin searches, sorts or changes the page
    -> Query state is updated
    -> Required results are loaded
    -> Admin approves or rejects posts
    -> Firestore status is updated
    -> Counts and first page are refreshed
```

## 7. Approval and rejection

Approving or rejecting does not delete a post. Its Firestore status is updated to `approved` or `rejected`.

After the update:

- The pending count is refreshed.
- Old pagination checkpoints are cleared.
- Pagination returns to the first page.
- Fresh pending data is fetched.

Because the page displays only pending documents, the processed post disappears from the list.

## 8. Main files

- `PostApprovals.js` — Coordinates the complete page.
- `hooks/useTabSearchSort.js` — Maintains tab-wise search and sort state.
- `src/hooks/usePagination.js` — Manages pagination state and data loading.
- `src/services/paginationService.js` — Builds normal paginated Firestore queries.
- `src/utils/buildPaginatedQuery.js` — Adds cursor and page-size constraints.
- `helper/pendingPostsService.js` — Loads pending counts and performs multi-field search.
- `helper/index.js` — Defines collection mappings and search/sort configuration.
- `helper/postApprovalActions.js` — Updates approval and rejection status.

## 9. Current limitation

Normal browsing is efficient because only one page is downloaded. However, active search downloads all pending posts from the selected tab and filters them locally.

This is suitable for a small number of pending posts. If the dataset becomes large, a dedicated search service such as Algolia or Typesense would be a better scalable solution.

## 10. Final takeaway

```text
Normal browsing -> Firestore cursor pagination, 6 posts at a time
Searching       -> All pending posts from the active tab, filtered locally
Sorting         -> Firestore normally, JavaScript during search
Approving       -> Update status and refresh the first page
```

The implementation separates UI state, pagination logic and Firestore operations, making the feature easier to understand, maintain and reuse.
