import { getDocs, getCountFromServer } from "firebase/firestore";
import {
  buildPaginatedQuery,
  getNearestCachedPageBefore,
} from "../utils/buildPaginatedQuery";

const applyFiltersAndSort = ({
  baseQuery,
  filters,
  sort,
}) => {
  return baseQuery;
};

// -----------------------------
// Build request + checkpoint chain
// -----------------------------
export const createPaginationRequest = async ({
  baseQuery,
  page,
  pageCheckpoints = {},
}) => {
  const updatedCheckpoints = { ...pageCheckpoints };

  const cached =
    updatedCheckpoints[page]?.firstDoc;

  if (cached) {
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

  const nearest = getNearestCachedPageBefore(
    page,
    updatedCheckpoints
  );

  const start =
    nearest === null ? 0 : nearest + 1;

  for (
    let i = start;
    i < page;
    i++
  ) {
    const { pageQuery } = buildPaginatedQuery({
      baseQuery,
      page: i,
      pageCheckpoints: updatedCheckpoints,
    });

    const snap = await getDocs(pageQuery);
    const docs = snap.docs;

    if (!docs.length) break;

    updatedCheckpoints[i] = {
      firstDoc: docs[0],
      lastDoc: docs[docs.length - 1],
    };
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

// -----------------------------
// MAIN API
// -----------------------------
export const getPage = async ({
  baseQuery,
  targetPage,
  filters,
  sort,
  checkpoints,
}) => {
  const filteredQuery = applyFiltersAndSort({
    baseQuery,
    filters,
    sort,
  });

  const countSnap =
    await getCountFromServer(filteredQuery);

  const totalRecords =
    countSnap.data().count;

  const {
    pageQuery,
    pageCheckpoints,
  } = await createPaginationRequest({
    baseQuery: filteredQuery,
    page: targetPage,
    pageCheckpoints: checkpoints,
  });

  if (!pageQuery) {
    return {
      data: [],
      firstDoc: null,
      lastDoc: null,
      totalRecords,
      pageCheckpoints,
    };
  }

  const snapshot = await getDocs(pageQuery);
  const docs = snapshot.docs;

  return {
    data: docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })),
    firstDoc: docs[0] ?? null,
    lastDoc: docs[docs.length - 1] ?? null,
    totalRecords,
    pageCheckpoints,
  };
};