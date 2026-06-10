import { getDocs } from "firebase/firestore";
import {
  buildPaginatedQuery,
  getNearestCachedPageBefore,
} from "../utils/buildPaginatedQuery";
import { getPageCheckpoint } from "../utils/getPageCheckpoint";

const applyFiltersAndSort = ({ baseQuery, filters, sort }) => {
  // TODO: apply filters and sort to baseQuery
  return baseQuery;
};

export const getPage = async ({ baseQuery, targetPage, filters, sort, checkpoints }) => {
  const filteredQuery = applyFiltersAndSort({ baseQuery, filters, sort });

  const { pageQuery, pageCheckpoints } = await createPaginationRequest({
    baseQuery: filteredQuery,
    page: targetPage,
    pageCheckpoints: checkpoints,
  });

  if (!pageQuery) {
    return { data: [], firstDoc: null, lastDoc: null, totalRecords: null, pageCheckpoints: checkpoints };
  }

  const snapshot = await getDocs(pageQuery);
  const docs = snapshot.docs;

  return {
    data: docs.map(d => ({ id: d.id, ...d.data() })),
    firstDoc: docs[0] ?? null,
    lastDoc: docs[docs.length - 1] ?? null,
    totalRecords: null,
    pageCheckpoints,
  };
};

export const createPaginationRequest = async ({
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