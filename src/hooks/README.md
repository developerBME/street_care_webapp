# Firestore Pagination Module

## Overview

This module provides reusable Firestore cursor-based pagination with support for:

- Cursor-based pagination
- Search
- Multiple filters
- Sorting
- Total record count
- Cached page checkpoints for efficient page navigation

The goal of this module is to separate pagination logic from UI components so it can be reused across multiple Firestore collections.

---

# Folder Structure

```text
src/
│
├── hooks/
│   └── usePagination.js
│
├── services/
│   └── paginationService.js
│
├── utils/
│   ├── buildPaginatedQuery.js
│   └── getPageCheckpoint.js
│
└── component/
    └── TestPagination.js
```

---

# Architecture

```
React Component
       │
       ▼
usePagination()
       │
       ▼
paginationService.getPage()
       │
       ├── applyFiltersAndSort()
       ├── createPaginationRequest()
       └── buildPaginatedQuery()
                    │
                    ▼
               Firestore
                    │
                    ▼
            Paginated Results
                    │
                    ▼
             React Component
```

---

# File Responsibilities

## `src/hooks/usePagination.js`

This is the primary hook that components consume.

It accepts `baseQuery`, `pageSize` (default `5`), and `pageLoader` (default
`paginationService.getPage`). Post Approvals supplies its own loader to support
multi-field text search and sorting by enriched user details.

### Responsibilities

- Maintains pagination state
- Stores current page number
- Stores search state
- Stores filter state
- Stores sorting state
- Stores loading, success, and error state
- Calls the pagination service whenever pagination parameters change
- Stores page checkpoints for cursor navigation

### Returns

```javascript
{
    hookState,
    totalRecords,
    pageParams,
    pgTriggerFns,
    currentCheckpoints
}
```

### Trigger Functions

#### Change Page

```javascript
pgTriggerFns.getPage(pageNumber)
```

Loads the requested page.

---

#### Search

```javascript
pgTriggerFns.setSearch({
    field: "location",
    op: "==",
    value: "New York"
})
```

Passing `null` clears the search.

Changing the search automatically resets pagination back to page 0.

---

#### Filters

```javascript
pgTriggerFns.setFilter([
    {
        field: "status",
        op: "==",
        value: "active"
    }
])
```

Changing filters automatically resets pagination back to page 0.

---

#### Sort

```javascript
pgTriggerFns.setSort({
    field: "date",
    direction: "asc"
})
```

Changing sorting automatically resets pagination back to page 0.

---

#### Apply Search, Filters, and Sort Together

```javascript
pgTriggerFns.setQuery({
    filters: [],
    search: null,
    sort: { field: "eventDate", direction: "desc" }
})
```

Resets pagination to page 0 and clears checkpoints. Post Approvals uses this
after its active tab's search or sort changes.

#### Refresh

```javascript
pgTriggerFns.refresh()
```

Clears checkpoints and reloads page 0, including when already on page 0.

## Reducer

The reducer manages pagination state.

Supported actions:

- `SET_PAGE`
- `SET_FILTERS`
- `SET_SEARCH`
- `SET_SORT`
- `SET_QUERY`

If new pagination parameters are added in the future, they should generally be managed here.

---

# `src/services/paginationService.js`

Contains Firestore communication for the default pagination loader. Post
Approvals also uses `pendingPostsService.js` for counts and multi-field search.

## Responsibilities

- Applies search
- Applies filters
- Applies sorting
- Retrieves total record count
- Builds paginated Firestore queries
- Executes Firestore requests
- Returns formatted results

Primary exported function:

```javascript
getPage(...)
```

---

## Query Processing Order

The query is built in the following order:

```
baseQuery
    ↓
search
    ↓
filters
    ↓
sort
    ↓
pagination
```

---

## `applyFiltersAndSort()`

Responsible for applying:

- Search (`where`)
- Filters (`where`)
- Sorting (`orderBy`)

before pagination cursors are applied.

---

## `createPaginationRequest()`

Responsible for cursor generation.

This function:

- Finds the nearest cached page
- Generates missing checkpoints
- Builds the final Firestore query

Using checkpoints minimizes Firestore reads when navigating pages.

---

# `src/utils/buildPaginatedQuery.js`

Contains all Firestore cursor logic.

Responsibilities:

- Builds paginated Firestore queries
- Applies `startAfter`
- Applies `startAt`
- Applies page limits
- Finds nearest cached pages

---

# Page Size

Pass the page size to the hook:

```javascript
usePagination({ baseQuery, pageSize: 6 });
```

The default is 5. Post Approvals uses `postsPerPage = 6` in
`src/component/admin_test/PostApprovals/PostApprovals.js`. Keep the UI's page
count calculation aligned with the size supplied to the hook.

---

## Cursor Logic

### Page 0

```
limit(pageSize)
```

---

### Previously Visited Page

```
startAt(firstDoc)
```

---

### New Page

```
startAfter(lastCachedDoc)
```

---

# `src/utils/getPageCheckpoint.js`

Helper utility used to store Firestore cursor anchors.

Example:

Input:

```javascript
[
    docA,
    docB,
    docC
]
```

Returns:

```javascript
{
    firstDoc: docA,
    lastDoc: docC
}
```

Only Firestore document snapshots are stored.

No application data is cached here.

---

# `src/component/TestPagination.js`

Example implementation of the pagination hook.

Demonstrates:

- Search
- Sorting
- Pagination controls
- Dynamic table columns
- Loading state
- Total record count

This component serves as a reference implementation and testing page.

---

# Firestore Checkpoint Cache

The hook caches cursor checkpoints in memory.

Example:

```javascript
{
    0: {
        firstDoc,
        lastDoc
    },

    1: {
        firstDoc,
        lastDoc
    },

    2: {
        firstDoc,
        lastDoc
    }
}
```

When search, filters, or sorting change, the checkpoint cache is cleared to ensure pagination starts from the correct dataset.

---

# Post Approvals Search and Error Handling — Updated October 29, 2026

These changes apply to `/admin/postApprovals`, across Outreaches, Interaction
Logs, and Help Requests. The separate `/test-pagination` demo still uses the
generic single-field search API.

## Search from the Existing Text Box

Search now matches names, dates, locations, and descriptions. No separate
filter selector was added. Search is debounced by 350 ms and ignores case,
leading/trailing whitespace, and commas. Every search word must occur somewhere
in the post's searchable values; partial words are supported. This allows full
names and city/state combinations to match across separate stored fields.

| Tab | Names and descriptive text | Location | Searchable dates |
| --- | --- | --- | --- |
| Outreaches | Title, submitter name, description | Nested city, state/abbreviation, address; top-level city and state abbreviation | `eventDate` |
| Interaction Logs | First/last name, submitter name, description, items given | Nested city, state/abbreviation, address; top-level city, state/abbreviation, `addr1` | `timeStamp`, `lastModifiedTimestamp` |
| Help Requests | First/last name, interaction-log first name, submitter name, additional details, description, help category | `locationLandmark` | `timestampOfInteraction`, `followUpTimestamp`, `lastModifiedTimestamp` |

Examples: `Jamie Smith`, `Boston, MA`, `warm blankets`, `Oct 29, 2026`,
`October 29`, `10/29/2026`, or `2026-10-29`.

Dates are converted to searchable text using the browser's local calendar date.
Supported stored values include Firestore timestamps, objects with `seconds`,
JavaScript dates, millisecond timestamps, and parseable date strings. Missing or
invalid dates are skipped without preventing text search. Numeric date searches
use US month/day/year formatting; this is text matching, not a date-range filter.

The search placeholder and tooltip now describe the supported fields and date
examples. Edit `postQueryConfig.searchFields` and `searchDateFields` in
`src/component/admin_test/PostApprovals/helper/index.js` to change the fields.

## Clearing Search and Keeping Sort Order

The existing local search-clear fix was verified and retained:

- Blank or whitespace-only search resets pagination to the first page.
- With the default date sort, clearing search returns to Firestore cursor pagination.
- With an alternative sort, clearing search retains the enriched-data loading
  path. Fields such as `userName` are fetched from user records and are not
  available as sortable fields on the post documents.
- The chosen sort field and direction remain active after clearing search.

For an active search or alternative sort, `fetchPendingSearchPage()` fetches the
pending posts ordered by the tab's default date field, adds user details, matches
the search in JavaScript, sorts the matches, and then slices the requested page.
The displayed total counts all matches, not just the current page.

This path reads the full pending result set for each request; it is not a
server-side full-text search or a cursor-limited read. Creating an index does not
change that behavior. The default date-sort path with no search uses the reusable
cursor pagination service.

## Error Messages

`ErrorMessage.js` now displays plain resource names such as `posts`, removing the
literal backticks and angle brackets previously shown as `<posts>`.

Post Approvals shows **“Posts cannot load until the required Firestore index is
ready.”** when an error has code `failed-precondition` and mentions an index.
Other failures retain the generic retry message. The original error is still
logged to the console. This identifies an index problem; it does not create the
index or suppress the failed request.

## What Creating a Firestore Index Changes

An index is a lookup structure Firestore uses to run a query. The pending-post
queries combine `status == "pending"` with ordering by `eventDate` (Outreaches)
or `lastModifiedTimestamp` (Interaction Logs and Help Requests).

If Firestore reports that this query requires an index, creating the requested
index and waiting for its build to finish lets that query run. This can unblock
initial loading, search, sorting, or clearing search when the missing index was
the cause. Other errors, such as permission failures, still need their own fix.

Use the creation link in the actual console error to obtain the required
collection, fields, scope, and sort direction. Ascending and descending query
variants may require separate indexes. Collection names depend on the configured
environment through `src/utils/firestoreCollections.js`.

Creating an index adds database indexing configuration; it does not edit post
content, change React code, or move the JavaScript text matching into Firestore.
After the index is ready, retry or refresh the page. No Firebase indexes were
created as part of this local work.

Reference: [Firebase: Manage indexes](https://firebase.google.com/docs/firestore/query-data/indexing).

## Validation

The latest search implementation passed **50 tests across two suites**:

- `src/component/admin_test/PostApprovals/PostApprovals.test.js`: formatted-date
  search through the UI, clearing search, retained sorting, pagination, error
  classification, and recovery after failed requests.
- `src/component/admin_test/PostApprovals/helper/pendingPostsService.test.js`:
  names, locations, descriptions, and dates across all three tabs; supported date
  representations; missing/invalid dates; unmatched searches; and filtering
  before counting and pagination.

Run from the repository root:

```bash
CI=true npm test -- --watchAll=false --runInBand --runTestsByPath \
  src/component/admin_test/PostApprovals/PostApprovals.test.js \
  src/component/admin_test/PostApprovals/helper/pendingPostsService.test.js
```

These tests mock Firestore and user lookups. They do not validate live indexes,
security rules, or a signed-in browser session. The development app compiled
successfully during the earlier error-handling check. Existing dependency
deprecation warnings remain. This README-only update did not rerun the tests.

---

# Current Known Issues

## 1. Demo default date sort is not applied initially

Current implementation:

```javascript
query(collection(...))
```

Recommended implementation:

```javascript
query(
    collection(...),
    orderBy("date", "asc")
)
```

The demo's dropdown initially shows ascending date order, but its base query has
the date ordering commented out and the hook starts with `sort: null`. Align the
initial query with the displayed sort without adding duplicate order clauses
when the user changes sorting. This demo issue was not fixed by the Post
Approvals search changes.

**Status:** Open bug.

---

## 2. Demo initial render does not display results

Current behavior:

- Component mounts
- Hook enters the Loading state
- No records are rendered
- Results only appear after changing a search, sort, or filter parameter

Expected behavior:

- Page 0 should automatically load and display on the initial render without any user interaction.

**Status:** Previously reported; not fixed or verified in the signed-in browser
during this work. The demo computes columns in an effect using a ref, which does
not itself trigger rendering. The hook already starts a page request on mount.

## 3. Older generic pagination tests need maintenance

The earlier run of `src/__tests__/utils/paginationService.test.js` failed seven
tests because its Firestore mock omits `limit`. It also contains expectations
from an older query-builder implementation. These failures were outside the
Post Approvals search changes and remain unresolved; the 50 passing tests above
are not a full-project test result.

---

# Future Improvements

Potential enhancements include:

- Prefetch next and previous pages
- Infinite scrolling support
- Multi-column sorting
- Extend the Post Approvals index-specific error message to other consumers
- Cache invalidation improvements
- Repair and extend the generic pagination unit tests
- Firestore Emulator integration tests

---

# Maintenance Guidelines

When modifying this module:

- Keep React state management inside `usePagination.js`
- Keep Firestore communication inside `paginationService.js`
- Keep cursor-building logic inside `buildPaginatedQuery.js`
- Avoid placing Firestore queries directly inside UI components
- Ensure new search/filter combinations have the required Firestore composite indexes

---

# Quick Reference

| Task | File |
|------------------|------|
| Change page size | `pageSize` argument to `usePagination`; `postsPerPage` in Post Approvals |
| Modify hook state | `src/hooks/usePagination.js` |
| Add reducer actions | `src/hooks/usePagination.js` |
| Modify Firestore query logic | `src/services/paginationService.js` |
| Modify pagination cursor logic | `src/utils/buildPaginatedQuery.js` |
| Modify checkpoint logic | `src/utils/getPageCheckpoint.js` |
| Example implementation | `src/component/TestPagination.js` |
| Configure Post Approvals search fields | `src/component/admin_test/PostApprovals/helper/index.js` |
| Modify multi-field/date matching | `src/component/admin_test/PostApprovals/helper/pendingPostsService.js` |
| Modify Post Approvals search controls | `src/component/admin_test/PostApprovals/components/SearchSort.js` |
| Modify Post Approvals loader/error handling | `src/component/admin_test/PostApprovals/PostApprovals.js` |

---

# Notes

This pagination module is designed to be reusable across Firestore collections. UI components should interact only with the `usePagination` hook and avoid implementing Firestore pagination logic directly. Keeping responsibilities separated makes the module easier to maintain, test, and extend.
