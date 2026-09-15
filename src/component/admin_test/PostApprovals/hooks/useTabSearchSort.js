import { useEffect, useMemo, useState } from "react";

const createInitialState = (config) =>
  Object.fromEntries(
    Object.entries(config).map(([key, value]) => [
      key,
      {
        search: "",
        sortField: value.defaultSort.field,
        sortDirection: value.defaultSort.direction,
      },
    ]),
  );

export default function useTabSearchSort(config, debounceMs = 350) {
  const [queries, setQueries] = useState(() => createInitialState(config));
  const [debouncedSearches, setDebouncedSearches] = useState(() =>
    Object.fromEntries(Object.keys(config).map((key) => [key, ""])),
  );

  useEffect(() => {
    const timers = Object.keys(config).map((key) =>
      setTimeout(() => {
        setDebouncedSearches((previous) => ({
          ...previous,
          [key]: queries[key].search.trim(),
        }));
      }, debounceMs),
    );

    return () => timers.forEach(clearTimeout);
  }, [config, debounceMs, queries]);

  const setQuery = (tab, changes) => {
    setQueries((previous) => ({
      ...previous,
      [tab]: { ...previous[tab], ...changes },
    }));
  };

  const effectiveQueries = useMemo(
    () =>
      Object.fromEntries(
        Object.keys(config).map((key) => [
          key,
          { ...queries[key], search: debouncedSearches[key] },
        ]),
      ),
    [config, debouncedSearches, queries],
  );

  return { queries, effectiveQueries, setQuery };
}
