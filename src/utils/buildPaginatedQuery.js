import { limit, query, startAfter, startAt } from "firebase/firestore";

// Firestore cursor pagination needs a known document snapshot before it can
// fetch a later page. This finds the closest cached page behind the target.
// Example: target page 4 with cached pages 0 and 2 returns 2.
export const getNearestCachedPageBefore = (page, pageCheckpoints) => {
  for (let cursorPage = page - 1; cursorPage >= 0; cursorPage -= 1) {
    if (pageCheckpoints[cursorPage]?.lastDoc) {
      return cursorPage;
    }
  }

  return null;
};

export const buildPaginatedQuery = ({
  baseQuery,
  page,
  pageSize,
  pageCheckpoints = {},
}) => {
  if (page < 0) {
    throw new Error("Page must be 0 or greater.");
  }

  // If the target page is already checkpointed, fetch from its first doc.
  // This refreshes the page data without walking from earlier pages.
  // Example: pageCheckpoints[2] exists, so fetch page 2 with startAt(firstDoc).
  if (pageCheckpoints[page]?.firstDoc) {
    return {
      pageQuery: query(
        baseQuery,
        startAt(pageCheckpoints[page].firstDoc),
        limit(pageSize),
      ),
    };
  }

  // Page zero never needs a cursor.
  // Example: page 0 always becomes query(baseQuery, limit(pageSize)).
  if (page === 0) {
    return {
      pageQuery: query(baseQuery, limit(pageSize)),
    };
  }

  const cachedPage = getNearestCachedPageBefore(page, pageCheckpoints);
  const cursor =
    cachedPage === null ? null : pageCheckpoints[cachedPage].lastDoc;

  // If the requested page is not directly cached, start after the nearest
  // previous checkpoint. The service makes sure prerequisite checkpoints exist.
  // Example: target page 3 with page 2 cached uses startAfter(page2.lastDoc).
  return {
    pageQuery: cursor
      ? query(baseQuery, startAfter(cursor), limit(pageSize))
      : query(baseQuery, limit(pageSize)),
  };
};
