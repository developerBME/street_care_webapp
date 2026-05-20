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
export default function usePagination({
  baseQuery,
  sort,
}) {

  const [pageParams, dispatch] = useReducer(paginationReducer, initialPageParams);

  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const checkpointsRef = useRef({});


  useEffect(() => {
  const controller = new AbortController();
  const { signal } = controller;


  const loadPage = async () => {
    try {
      setStatus("loading");
      setError(null);

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

      setData(result.data);
      if (result.totalRecords != null) setTotalRecords(result.totalRecords);
      setStatus("success");
    } catch (err) {
      if (signal.aborted) return;
      console.error(err);
      setError(err);
      setStatus("error");
    }
  };
  
  loadPage();

  return () => controller.abort();
}, [baseQuery, pageParams, sort]);

  return {
    data,
    totalRecords,
    isLoading: status === "loading",
    error,
    pageParams,
    dispatch,
  };
}