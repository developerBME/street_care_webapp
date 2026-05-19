import { useState, useEffect, useRef, useReducer } from "react";
import { getPage } from "../services/paginationService";

// ─── Reducer ────────────────────────────────────────────────
export const initialPageParams = {
  filters: {},
  searchText: "",
  pgNo: 1,
};

export function paginationReducer(state, action) {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, pgNo: action.payload };

    case "SET_FILTERS":
      return { ...state, filters: action.payload, pgNo: 1 };

    case "SET_SEARCH":
      return { ...state, searchText: action.payload, pgNo: 1 };

    default:
      return state;
  }
}

// ─── Hook ────────────────────────────────────────────────────
export default function usePagination({
  collection,
  logsPerPage = 6,
  sort = { field: "createdAt", direction: "desc" },
}) {

  const [pageParams, dispatch] = useReducer(paginationReducer, initialPageParams);

  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkpointsRef = useRef({});


  const prevCriteriaRef = useRef({
    filters: { ...initialPageParams.filters },
    searchText: initialPageParams.searchText,
  });

  useEffect(() => {
  const controller = new AbortController();
  const { signal } = controller;

  const loadPage = async () => {
    try {
      setIsLoading(true);
      setError(null);

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

      if (signal.aborted) return;

      checkpointsRef.current[pageParams.pgNo] = {
        firstDoc: result.firstDoc,
        lastDoc: result.lastDoc,
      };

      setData(result.data);
      setTotalRecords(result.totalRecords || 0);
    } catch (err) {
      if (signal.aborted) return;
      console.error(err);
      setError(err);
    } finally {
      if (!signal.aborted) setIsLoading(false);
    }
  };


  const filtersChanged =
    JSON.stringify(prevCriteriaRef.current.filters) !==
    JSON.stringify(pageParams.filters);

  const searchChanged =
    prevCriteriaRef.current.searchText !== pageParams.searchText;

  if (filtersChanged || searchChanged) {
    checkpointsRef.current = {};
    prevCriteriaRef.current = {
      filters: pageParams.filters,
      searchText: pageParams.searchText,
    };
  }

  loadPage();

  return () => controller.abort();
}, [collection, logsPerPage, pageParams, sort]);

  return {
    data,
    totalRecords,
    isLoading,
    error,
    pageParams,
    dispatch,
  };
}