import { useState, useEffect, useRef, useCallback } from "react";
import { getPage } from "../services/paginationService";

export default function usePagination({
  collection,
  logsPerPage = 6,
  filters = {},
  sort = {
    field: "createdAt",
    direction: "desc",
  },
}) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
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
   * Optional page cache
   */
  const cacheRef = useRef({});

  const loadPage = useCallback(
    async (targetPage) => {
      try {
        setIsLoading(true);
        setError(null);

        const cacheKey = JSON.stringify({
          collection,
          filters,
          sort,
        });

        /**
         * CACHE HIT
         */
        if (cacheRef.current?.[cacheKey]?.[targetPage]) {
          setData(cacheRef.current[cacheKey][targetPage]);
          setPage(targetPage);
          setIsLoading(false);
          return;
        }

        const result = await getPage({
          collection,
          targetPage,
          logsPerPage,
          filters,
          sort,
          checkpoints: checkpointsRef.current,
        });

        /**
         * Save checkpoints
         */
        checkpointsRef.current[targetPage] = {
          firstDoc: result.firstDoc,
          lastDoc: result.lastDoc,
        };

        /**
         * Save cache
         */
        if (!cacheRef.current[cacheKey]) {
          cacheRef.current[cacheKey] = {};
        }

        cacheRef.current[cacheKey][targetPage] = result.data;

        setData(result.data);
        setPage(targetPage);
        setTotalRecords(result.totalRecords || 0);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [collection, logsPerPage, filters, sort]
  );

  /**
   * Reset pagination when filters/sort changes
   */
  useEffect(() => {
    checkpointsRef.current = {};
    cacheRef.current = {};

    loadPage(1);
  }, [loadPage]);

  return {
    data,
    page,
    totalRecords,
    isLoading,
    error,

    setPage: loadPage,

    nextPage: () => loadPage(page + 1),

    prevPage: () => {
      if (page > 1) {
        loadPage(page - 1);
      }
    },
  };
}