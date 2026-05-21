import { useState, useEffect, useRef, useReducer } from "react";
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
  const pgTriggerFns = {
    getPage: (pgNo) => {
      setHookState({ state: "Loading", data: null, error: null });
      dispatch({ type: "SET_PAGE", payload: pgNo });
    },

    setSearchText: (searchText) => {
      setHookState({ state: "Loading", data: null, error: null });
      checkpointsRef.current = {};
      dispatch({ type: "SET_SEARCH", payload: searchText });
    },

    setFilterField: (filters) => {
      setHookState({ state: "Loading", data: null, error: null });
      checkpointsRef.current = {};
      dispatch({ type: "SET_FILTERS", payload: filters });
    },
  };

  // ─── Effect ─────────────────────────────────────────────────
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const loadPage = async () => {
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

        checkpointsRef.current[pageParams.pgNo] = {
          firstDoc: result.firstDoc,
          lastDoc: result.lastDoc,
        };

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