import { useState, useEffect, useRef, useReducer, useMemo } from "react";
import { getPage } from "../services/paginationService";

// ─── Reducer ────────────────────────────────────────────────
export const initialPageParams = {
  filters: {},
  searchText: "",
  pgNo: 0,
};

export function paginationReducer(state, action) {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, pgNo: action.payload };

    case "SET_FILTERS":
      return { ...state, filters: action.payload, pgNo: 0 };

    case "SET_SEARCH":
      return { ...state, searchText: action.payload, pgNo: 0 };

    default:
      return state;
  }
}

// ─── Hook ────────────────────────────────────────────────────
export default function usePagination({ baseQuery, sort }) {
  const [pageParams, dispatch] = useReducer(paginationReducer, initialPageParams);

  const [hookState, setHookState] = useState({
    data: null,
    state: "Loading",
    error: null,
  });

  const [totalRecords, setTotalRecords] = useState(0);

  const checkpointsRef = useRef({});

  // ─── Trigger Functions ──────────────────────────────────────
  // Memoised so consumers can safely use these in dependency arrays
  // without triggering re-renders on every parent render cycle.
  const pgTriggerFns = useMemo(
    () => ({
      getPage: (pgNo) => {
        dispatch({ type: "SET_PAGE", payload: pgNo });
      },

      setSearchText: (searchText) => {
        // Reset checkpoints on a new search — cursors from a previous query
        // are no longer valid once the result set changes.
        checkpointsRef.current = {};
        dispatch({ type: "SET_SEARCH", payload: searchText });
      },

      setFilterField: (filters) => {
        // Same reasoning as setSearchText — filters change the result set.
        checkpointsRef.current = {};
        dispatch({ type: "SET_FILTERS", payload: filters });
      },
    }),
    // dispatch is stable across renders (guaranteed by useReducer).
    [dispatch]
  );

  // ─── Effect ─────────────────────────────────────────────────
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const loadPage = async () => {
      // Set loading here rather than in each trigger function.
      // This keeps the triggers minimal and ensures loading state is
      // always in sync with the actual fetch that's about to run.
      setHookState({ state: "Loading", data: null, error: null });

      try {
        const result = await getPage({
          baseQuery,
          targetPage: pageParams.pgNo,
          filters: {
            ...pageParams.filters,
            searchText: pageParams.searchText,
          },
          sort,
          checkpoints: checkpointsRef.current,
        });

        if (signal.aborted) return;

        // Merge back the full updated checkpoint map returned by the service.
        // This captures any intermediate pages that were back-filled during
        // the request (e.g. pages 3 and 4 when jumping to page 5).
        checkpointsRef.current = {
          ...checkpointsRef.current,
          ...result.checkpoints,
        };

        // Also store the checkpoint for the page we just fetched, using the
        // live docs returned — not the cursor docs from the service internals.
        if (result.firstDoc || result.lastDoc) {
          checkpointsRef.current[pageParams.pgNo] = {
            firstDoc: result.firstDoc,
            lastDoc: result.lastDoc,
          };
        }

        if (result.totalRecords != null) setTotalRecords(result.totalRecords);

        setHookState({ state: "Success", data: result.data, error: null });
      } catch (err) {
        if (signal.aborted) return;
        console.error(err);
        setHookState({ state: "Error", data: null, error: err });
      }
    };

    loadPage();

    return () => controller.abort();
  }, [baseQuery, pageParams, sort]);

  return {
    hookState,
    totalRecords,
    pageParams,
    pgTriggerFns,
    currentCheckpoints: checkpointsRef.current,
  };
}