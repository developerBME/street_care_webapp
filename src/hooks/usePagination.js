import { useState, useEffect, useRef, useReducer, useMemo } from "react";
import { getDocs } from "firebase/firestore";
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
// baseQuery must already have filters, sort, and limit(...) chained.
export default function usePagination({ baseQuery }) {
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
        // Reset checkpoints — cursors from a previous query are no longer
        // valid once the result set changes.
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
      // Set loading here rather than in each trigger function so loading
      // state is always in sync with the fetch that's about to run.
      setHookState({ state: "Loading", data: null, error: null });

      try {
        // getPage (formerly createPaginationRequest) builds the cursor query
        // and back-fills any missing intermediate checkpoints. It returns the
        // constructed pageQuery and the full updated checkpoint map.
        const { pageQuery, pageCheckpoints } = await getPage({
          baseQuery,
          page: pageParams.pgNo,
          pageCheckpoints: checkpointsRef.current,
        });

        if (signal.aborted) return;

        // Merge back the full updated checkpoint map returned by the service.
        // This captures any intermediate pages back-filled during the request
        // (e.g. pages 3 and 4 when jumping straight to page 5).
        checkpointsRef.current = {
          ...checkpointsRef.current,
          ...pageCheckpoints,
        };

        // No pageQuery means an empty intermediate page was hit while
        // back-filling. Treat as empty result rather than an error.
        if (!pageQuery) {
          setHookState({ state: "Success", data: [], error: null });
          return;
        }

        const snapshot = await getDocs(pageQuery);

        if (signal.aborted) return;

        const docs = snapshot.docs;

        // Store the checkpoint for this page from the live snapshot.
        checkpointsRef.current[pageParams.pgNo] = {
          firstDoc: docs[0] ?? null,
          lastDoc: docs[docs.length - 1] ?? null,
        };

        setHookState({
          state: "Success",
          data: docs.map((d) => ({ id: d.id, ...d.data() })),
          error: null,
        });
      } catch (err) {
        if (signal.aborted) return;
        console.error(err);
        setHookState({ state: "Error", data: null, error: err });
      }
    };

    loadPage();

    return () => controller.abort();
  }, [baseQuery, pageParams]);

  return {
    hookState,
    totalRecords,
    pageParams,
    pgTriggerFns,
    currentCheckpoints: checkpointsRef.current,
  };
}