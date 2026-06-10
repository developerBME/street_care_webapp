import { getDocs } from "firebase/firestore";
import { createPaginationRequest } from "./createPaginationRequest";

// Applies filters and sort to a base Firestore query.
// Extend this to match your actual query builder logic.
const applyFiltersAndSort = (baseQuery, filters = {}, sort) => {
  // TODO: integrate your real filter/sort query builder here.
  // e.g. return query(baseQuery, where("status", "==", filters.status), orderBy(sort.field, sort.dir));
  return baseQuery;
};

// Fetches a single page of results. Handles building the cursor query,
// back-filling any missing intermediate checkpoints, and returning
// the updated checkpoint map so the caller can persist it.
export const getPage = async ({ baseQuery, targetPage, filters, sort, checkpoints = {} }) => {
  const builtQuery = applyFiltersAndSort(baseQuery, filters, sort);

  const { pageQuery, pageCheckpoints: updatedCheckpoints } = await createPaginationRequest({
    baseQuery: builtQuery,
    page: targetPage,
    pageCheckpoints: checkpoints,
  });

  // No pageQuery means we hit an empty intermediate page while back-filling.
  // Treat this as an empty result rather than an error.
  if (!pageQuery) {
    return {
      data: [],
      firstDoc: null,
      lastDoc: null,
      totalRecords: null,
      checkpoints: updatedCheckpoints,
    };
  }

  const snapshot = await getDocs(pageQuery);
  const docs = snapshot.docs;

  return {
    data: docs.map((d) => ({ id: d.id, ...d.data() })),
    firstDoc: docs[0] ?? null,
    lastDoc: docs[docs.length - 1] ?? null,
    // Firestore has no cheap way to return a total count inside a paginated
    // query. Use a separate counter document and pass it in via baseQuery
    // context, or remove totalRecords from the interface entirely.
    totalRecords: null,
    // Return the full updated checkpoint map so the hook can merge it back.
    // This preserves any intermediate pages that were back-filled here.
    checkpoints: updatedCheckpoints,
  };
};