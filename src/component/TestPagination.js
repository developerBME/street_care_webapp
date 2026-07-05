import React, { useMemo } from "react";
import usePagination from "../hooks/usePagination";
import { collection, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import collectionMapping from "../utils/firestoreCollections";

export default function TestPagination() {
  const q = useMemo(() => {
    return query(
      collection(db, collectionMapping.events),
      //orderBy("date", "asc") // required for pagination
    );
  }, []);

  const {
    hookState,
    pageParams,
    pgTriggerFns,
    totalRecords,
  } = usePagination({ baseQuery: q });

  const PAGE_SIZE = 5;

  const totalPages = Math.ceil(
    (totalRecords || 0) / PAGE_SIZE
  );

  const rows = hookState.data || [];

  // ─────────────────────────────
  // UI STATE
  // ─────────────────────────────
  const [searchText, setSearchText] = React.useState("");
  const [sortOption, setSortOption] = React.useState("date_asc");

  // ─────────────────────────────
  // COLUMN STABILITY
  // ─────────────────────────────
  const columnsRef = React.useRef([]);

  React.useEffect(() => {
    if (!rows.length) return;

    const existing = new Set(columnsRef.current);

    rows.forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (key !== "id") existing.add(key);
      });
    });

    columnsRef.current = ["id", ...Array.from(existing)];
  }, [rows]);

  const columns = columnsRef.current;

  // ─────────────────────────────
  // PAGINATION WINDOW
  // ─────────────────────────────
  const getVisiblePages = () => {
    const current = pageParams.pgNo;
    const delta = 2;

    const start = Math.max(0, current - delta);
    const end = Math.min(totalPages - 1, current + delta);

    const pages = [];

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (!pages.includes(0)) pages.unshift(0);
    if (!pages.includes(totalPages - 1)) {
      pages.push(totalPages - 1);
    }

    return pages.sort((a, b) => a - b);
  };

  return (
    <div style={{ padding: 100 }}>
      <h2>Pagination Demo</h2>

      {/* STATUS */}
      <div style={{ marginBottom: 10 }}>
        Status: {hookState.state}
      </div>

      <div style={{ marginBottom: 10, color: "gray" }}>
        Total Records: {totalRecords || 0}
      </div>

      {/* ─────────────────────────────
          SEARCH + SORT CONTROLS
      ───────────────────────────── */}
      <div style={{ marginBottom: 15, display: "flex", gap: 10 }}>
        {/* SEARCH */}
        <input
          value={searchText}
          placeholder="Search location..."
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            padding: "8px",
            width: 250,
          }}
        />

        <button
          onClick={() =>
            pgTriggerFns.setSearch(
              searchText.trim()
                ? {
                    field: "location",
                    op: "==",
                    value: searchText.trim(),
                  }
                : null
            )
          }
        >
          Search
        </button>

        <button
          onClick={() => {
            setSearchText("");
            pgTriggerFns.setSearch(null);
          }}
        >
          Clear
        </button>

        {/* SORT */}
        <select
          value={sortOption}
          onChange={(e) => {
            const value = e.target.value;
            setSortOption(value);

            if (value === "date_asc") {
              pgTriggerFns.setSort({
                field: "date",
                direction: "asc",
              });
            }

            if (value === "date_desc") {
              pgTriggerFns.setSort({
                field: "date",
                direction: "desc",
              });
            }
          }}
          style={{ padding: "8px", marginLeft: "auto" }}
        >
          <option value="date_asc">
            Date (Asc)
          </option>
          <option value="date_desc">
            Date (Desc)
          </option>
        </select>
      </div>

      {/* TABLE */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: 700,
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              {columns.map((col) => (
                <th key={col} style={th}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td key={col} style={td}>
                    {renderCell(row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div
        style={{
          marginTop: 20,
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          disabled={pageParams.pgNo === 0}
          onClick={() =>
            pgTriggerFns.getPage(pageParams.pgNo - 1)
          }
        >
          Prev
        </button>

        {getVisiblePages().map((pageNo, idx, arr) => {
          const prev = arr[idx - 1];
          const showDots = prev !== undefined && pageNo - prev > 1;

          return (
            <React.Fragment key={pageNo}>
              {showDots && (
                <span style={{ padding: "0 6px" }}>...</span>
              )}

              <button
                onClick={() => pgTriggerFns.getPage(pageNo)}
                style={{
                  padding: "6px 10px",
                  border: "1px solid #ccc",
                  background:
                    pageNo === pageParams.pgNo
                      ? "#1976d2"
                      : "#fff",
                  color:
                    pageNo === pageParams.pgNo ? "#fff" : "#000",
                  fontWeight:
                    pageNo === pageParams.pgNo
                      ? "bold"
                      : "normal",
                }}
              >
                {pageNo + 1}
              </button>
            </React.Fragment>
          );
        })}

        <button
          disabled={pageParams.pgNo >= totalPages - 1}
          onClick={() =>
            pgTriggerFns.getPage(pageParams.pgNo + 1)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────
// CELL RENDERER
// ─────────────────────────────
function renderCell(value) {
  if (value == null) return "-";

  if (typeof value === "object") {
    if (value.toDate) {
      return value.toDate().toLocaleString();
    }
    return JSON.stringify(value);
  }

  return String(value);
}

// ─────────────────────────────
// STYLES
// ─────────────────────────────
const th = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};