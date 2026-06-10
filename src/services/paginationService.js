import { getDocs } from "firebase/firestore";
import {
  buildPaginatedQuery,
  getNearestCachedPageBefore,
} from "../utils/buildPaginatedQuery";
import { getPageCheckpoint } from "../utils/getPageCheckpoint";

// Prepares the target page query and fills any missing prerequisite checkpoints.
// Example: if pages 0-2 are cached and page 5 is requested, this fetches pages
// 3 and 4, stores their checkpoints, then returns the page 5 query. The
// incoming baseQuery must already include filters, sort, and limit(...).
export const getPage = async ({
  baseQuery,
  page,
  pageCheckpoints = {},
}) => {
  const updatedCheckpoints = { ...pageCheckpoints };
  const targetPageIsCached = Boolean(updatedCheckpoints[page]?.firstDoc);

  if (targetPageIsCached) {
    const { pageQuery } = buildPaginatedQuery({
      baseQuery,
      page,
      pageCheckpoints: updatedCheckpoints,
    });

    return {
      pageQuery,
      pageCheckpoints: updatedCheckpoints,
    };
  }

  const nearestCachedPage = getNearestCachedPageBefore(page, updatedCheckpoints);
  const firstMissingPage = nearestCachedPage === null ? 0 : nearestCachedPage + 1;

  // Fetch only the pages needed to create a cursor for the requested page.
  // Example: target page 5 requires checkpoints through page 4.
  for (let pageToCache = firstMissingPage; pageToCache < page; pageToCache += 1) {
    const { pageQuery } = buildPaginatedQuery({
      baseQuery,
      page: pageToCache,
      pageCheckpoints: updatedCheckpoints,
    });

    const snapshot = await getDocs(pageQuery);
    const docs = snapshot.docs;
    const checkpoint = getPageCheckpoint(docs);

    if (!checkpoint) {
      return {
        pageQuery: null,
        pageCheckpoints: updatedCheckpoints,
      };
    }

    updatedCheckpoints[pageToCache] = checkpoint;
  }

  const { pageQuery } = buildPaginatedQuery({
    baseQuery,
    page,
    pageCheckpoints: updatedCheckpoints,
  });

  return {
    pageQuery,
    pageCheckpoints: updatedCheckpoints,
  };
};