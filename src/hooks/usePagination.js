import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useReducer,
} from "react";

import { getPage } from "../services/paginationService";

/**
 * =========================================================
 * REDUCER
 * =========================================================
 */

export const initialPageParams = {
  filters: {},
  searchText: "",
  pgNo: 1,
};

export function paginationReducer(state, action) {
  switch (action.type) {
    case "SET_PAGE":
      return {
        ...state,
        pgNo: action.payload,
      };

    case "SET_FILTERS":
      return {
        ...state,
        filters: action.payload,
        pgNo: 1,
      };

    case "SET_SEARCH":
      return {
        ...state,
        searchText: action.payload,
        pgNo: 1,
      };

    default:
      return state;
  }
}

/**
 * =========================================================
 * CUSTOM HOOK
 * =========================================================
 */

export default function usePagination({
  collection,
  logsPerPage = 6,
  prevFilters = {},
  sort = {
    field: "createdAt",
    direction: "desc",
  },

  pageParams,
}) {
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Stores:
   * {
   *   1: { firstDoc, lastDoc },
   *   2: { firstDoc, lastDoc }
   * }
   */
  const checkpointsRef = useRef({});

  /**
   * Save previous filters
   */
  const prevFiltersRef = useRef(prevFilters);

  /**
   * OPTIONAL CACHE
   * COMMENTED OUT FOR LATER TASK
   */

  // const cacheRef = useRef({});

  const loadPage = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      /**
       * CACHE LOGIC
       * COMMENTED OUT FOR LATER TASK
       */

      // const cacheKey = JSON.stringify({
      //   collection,
      //   filters: pageParams.filters,
      //   searchText: pageParams.searchText,
      //   sort,
      // });

      // if (cacheRef.current?.[cacheKey]?.[pageParams.pgNo]) {
      //   setData(cacheRef.current[cacheKey][pageParams.pgNo]);
      //   setIsLoading(false);
      //   return;
      // }

      const result = await getPage({
        collection,
        targetPage: pageParams.pgNo,
        logsPerPage,

        filters: {
          ...pageParams.filters,
          searchText: pageParams.searchText,
        },

        sort,
        checkpoints: checkpointsRef.current,
      });

      /**
       * Save checkpoints
       */
      checkpointsRef.current[pageParams.pgNo] = {
        firstDoc: result.firstDoc,
        lastDoc: result.lastDoc,
      };

      /**
       * CACHE SAVE
       * COMMENTED OUT FOR LATER TASK
       */

      // if (!cacheRef.current[cacheKey]) {
      //   cacheRef.current[cacheKey] = {};
      // }

      // cacheRef.current[cacheKey][pageParams.pgNo] = result.data;

      setData(result.data);
      setTotalRecords(result.totalRecords || 0);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [collection, logsPerPage, pageParams, sort]);

  /**
   * Reset checkpoints when filters change
   */
  useEffect(() => {
    const filtersChanged =
      JSON.stringify(prevFiltersRef.current) !==
      JSON.stringify(pageParams.filters);

    if (filtersChanged) {
      checkpointsRef.current = {};

      prevFiltersRef.current = pageParams.filters;
    }

    loadPage();
  }, [loadPage, pageParams.filters]);

  return {
    data,
    totalRecords,
    isLoading,
    error,
  };
}