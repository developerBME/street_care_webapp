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
└── components/
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

## Reducer

The reducer manages pagination state.

Supported actions:

- `SET_PAGE`
- `SET_FILTERS`
- `SET_SEARCH`
- `SET_SORT`

If new pagination parameters are added in the future, they should generally be managed here.

---

# `src/services/paginationService.js`

Contains all Firestore communication.

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

The page size is configured in this file.

```javascript
const PAGE_SIZE = 5;
```

If the number of records per page needs to change, update this constant.

Location:

```
src/utils/buildPaginatedQuery.js
```

---

## Cursor Logic

### Page 0

```
limit(PAGE_SIZE)
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

# `src/components/TestPagination.js`

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

# Current Known Issues

## 1. Base query should include a default `orderBy`

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

Firestore cursor pagination relies on deterministic ordering. Without a default `orderBy`, pagination behavior may become inconsistent depending on the active search, filter, or sort combination.

**Status:** Open bug.

---

## 2. Initial render does not display results

Current behavior:

- Component mounts
- Hook enters the Loading state
- No records are rendered
- Results only appear after changing a search, sort, or filter parameter

Expected behavior:

- Page 0 should automatically load and display on the initial render without any user interaction.

**Status:** Open bug requiring investigation.

---

# Future Improvements

Potential enhancements include:

- Allow page size to be passed into the hook instead of using a constant
- Prefetch next and previous pages
- Infinite scrolling support
- Multi-column sorting
- Better handling of Firestore composite index errors
- Cache invalidation improvements
- Unit tests
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
|------|------|
| Change page size | `src/utils/buildPaginatedQuery.js` (`PAGE_SIZE`) |
| Modify hook state | `src/hooks/usePagination.js` |
| Add reducer actions | `src/hooks/usePagination.js` |
| Modify Firestore query logic | `src/services/paginationService.js` |
| Modify pagination cursor logic | `src/utils/buildPaginatedQuery.js` |
| Modify checkpoint logic | `src/utils/getPageCheckpoint.js` |
| Example implementation | `src/components/TestPagination.js` |

---

# Notes

This pagination module is designed to be reusable across Firestore collections. UI components should interact only with the `usePagination` hook and avoid implementing Firestore pagination logic directly. Keeping responsibilities separated makes the module easier to maintain, test, and extend.