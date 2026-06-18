import {
  query,
  startAfter,
  startAt,
  limit,
} from "firebase/firestore";

// -----------------------------
// Find nearest cached page
// -----------------------------
export const getNearestCachedPageBefore = (
  page,
  pageCheckpoints
) => {
  for (let i = page - 1; i >= 0; i--) {
    if (pageCheckpoints[i]?.lastDoc) {
      return i;
    }
  }
  return null;
};

// -----------------------------
// Build paginated Firestore query
// -----------------------------
const PAGE_SIZE = 5;

export const buildPaginatedQuery = ({
  baseQuery,
  page,
  pageCheckpoints = {},
}) => {
  if (page < 0) {
    throw new Error("Page must be 0 or greater.");
  }

  // PAGE 0
  if (page === 0) {
    return {
      pageQuery: query(baseQuery, limit(PAGE_SIZE)),
    };
  }

  // Already cached page
  if (pageCheckpoints[page]?.firstDoc) {
    return {
      pageQuery: query(
        baseQuery,
        startAt(pageCheckpoints[page].firstDoc),
        limit(PAGE_SIZE)
      ),
    };
  }

  // Find nearest cached page
  const cachedPage = getNearestCachedPageBefore(
    page,
    pageCheckpoints
  );

  const cursor =
    cachedPage === null
      ? null
      : pageCheckpoints[cachedPage].lastDoc;

  return {
    pageQuery: cursor
      ? query(
          baseQuery,
          startAfter(cursor),
          limit(PAGE_SIZE)
        )
      : query(baseQuery, limit(PAGE_SIZE)),
  };
};