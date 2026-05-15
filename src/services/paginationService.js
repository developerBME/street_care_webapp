import { buildPaginatedQuery } from "../utils/buildPaginatedQuery";
import { getPageCheckpoint } from "../utils/getPageCheckpoint";

// Public pagination boundary for hooks/components. It decides which Firestore
// query should be fetched next and packages checkpoint updates into resolve().
//
// Example:
// const request = createPaginationRequest({ baseQuery, page: 2, pageSize: 6, pageCheckpoints });
// const snapshot = await getDocs(request.pageQuery);
// const result = request.resolve(snapshot.docs);
export const createPaginationRequest = ({
  baseQuery,
  page,
  pageSize,
  pageCheckpoints = {},
}) => {
  const { pageQuery, pageToCache, isTargetPage } = buildPaginatedQuery({
    baseQuery,
    page,
    pageSize,
    pageCheckpoints,
  });

  return {
    pageQuery,
    pageToCache,
    isTargetPage,
    // The hook fetches pageQuery with getDocs(), then passes snapshot.docs here.
    // This keeps Firestore reads in the hook while hiding checkpoint bookkeeping.
    // Example: resolve([docA, docB]) returns updated pageCheckpoints for pageToCache.
    resolve: (docs) => {
      const checkpoint = getPageCheckpoint(docs);

      return {
        docs,
        checkpoint,
        pageToCache,
        isTargetPage,
        isEmpty: checkpoint === null,
        pageCheckpoints: checkpoint
          ? {
              ...pageCheckpoints,
              [pageToCache]: checkpoint,
            }
          : { ...pageCheckpoints },
      };
    },
  };
};
