import { useState, useEffect, useRef, useReducer, useMemo } from "react";
import { getPage } from "../services/paginationService";

// ─── Reducer ────────────────────────────────────────────────
export const initialPageParams = {
  filters: [],
  search: null,
  sort: null,
  pgNo: 0,
};

export function paginationReducer(state, action) {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, pgNo: action.payload };

    case "SET_FILTERS":
      return { ...state, filters: action.payload, pgNo: 0 };

    case "SET_SEARCH":
      return { ...state, search: action.payload, pgNo: 0 };

    case "SET_SORT":
      return {...state, sort: action.payload, pgNo: 0};
    default:
      return state;
  }
}

// ─── Hook ────────────────────────────────────────────────────
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
  const pgTriggerFns = useMemo(() => ({
    getPage: (pgNo) => {
      setHookState({ state: "Loading", data: null, error: null });
      dispatch({ type: "SET_PAGE", payload: pgNo });
    },
    //search: { field: "name",  op: "==",  value: "john" }
    setSearch: (search) => {
      setHookState({ state: "Loading", data: null, error: null });
      checkpointsRef.current = {};
      dispatch({ type: "SET_SEARCH", payload: search });
    },
    //filters: [{ field: "status", op: "==", value: "active" }, { field: "role", op: "==", value: "admin" }]
    setFilter: (filters) => {
      setHookState({ state: "Loading", data: null, error: null });
      checkpointsRef.current = {};
      dispatch({ type: "SET_FILTERS", payload: filters });
    },
    //sort: { field: "createdAt", direction: "desc" }
    setSort: (sort) => {
      setHookState({ state: "Loading", data: null, error: null });
      checkpointsRef.current = {};
      dispatch({ type: "SET_SORT", payload: sort });
    },
  }), []);

  // ─── Effect ─────────────────────────────────────────────────
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const loadPage = async () => {
      try {
        const result = await getPage({
          baseQuery,
          targetPage: pageParams.pgNo,
          filters: pageParams.filters,
          search: pageParams.search,
          sort: pageParams.sort,
          checkpoints: checkpointsRef.current,
        });

        if (signal.aborted) return;

        checkpointsRef.current = result.pageCheckpoints;

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
  }, [baseQuery, pageParams]);

  return {
    hookState,
    totalRecords,
    pageParams,
    pgTriggerFns,
    currentCheckpoints: checkpointsRef.current,
  };
}