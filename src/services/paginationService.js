import {
  buildPaginatedQuery,
  getNearestCachedPageBefore,
} from "../utils/buildPaginatedQuery";
import { getPageCheckpoint } from "../utils/getPageCheckpoint";

// Prepares the target page query and fills any missing prerequisite checkpoints.
// Example: if pages 0-2 are cached and page 5 is requested, this fetches pages
// 3 and 4, stores their checkpoints, then returns the page 5 query.
export const createPaginationRequest = async ({
  baseQuery,
  page,
  pageSize,
  pageCheckpoints = {},
  fetchDocs,
}) => {
  const updatedCheckpoints = { ...pageCheckpoints };
  const targetPageIsCached = Boolean(updatedCheckpoints[page]?.firstDoc);

  if (targetPageIsCached) {
    const { pageQuery } = buildPaginatedQuery({
      baseQuery,
      page,
      pageSize,
      pageCheckpoints: updatedCheckpoints,
    });

    return {
      pageQuery,
      pageCheckpoints: updatedCheckpoints,
      reachedEnd: false,
    };
  }

  const nearestCachedPage = getNearestCachedPageBefore(page, updatedCheckpoints);
  const firstMissingPage = nearestCachedPage === null ? 0 : nearestCachedPage + 1;

  // Fetch only the pages needed to create a cursor for the requested page.
  // Example: target page 5 requires checkpoints through page 4.
  for (let pageToCache = firstMissingPage; pageToCache < page; pageToCache += 1) {
    if (typeof fetchDocs !== "function") {
      throw new Error("fetchDocs must be provided.");
    }

    if (updatedCheckpoints[pageToCache]?.lastDoc) continue;

    const { pageQuery } = buildPaginatedQuery({
      baseQuery,
      page: pageToCache,
      pageSize,
      pageCheckpoints: updatedCheckpoints,
    });

    const docs = await fetchDocs(pageQuery);
    const checkpoint = getPageCheckpoint(docs);

    if (!checkpoint) {
      return {
        pageQuery: null,
        pageCheckpoints: updatedCheckpoints,
        reachedEnd: true,
        missingPage: pageToCache,
      };
    }

    updatedCheckpoints[pageToCache] = checkpoint;
  }

  const { pageQuery } = buildPaginatedQuery({
    baseQuery,
    page,
    pageSize,
    pageCheckpoints: updatedCheckpoints,
  });

  return {
    pageQuery,
    pageCheckpoints: updatedCheckpoints,
    reachedEnd: false,
  };
};
