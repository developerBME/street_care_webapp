import React from "react";
import usePagination from "../hooks/usePagination";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "./firebase";
import collectionMapping from "../utils/firestoreCollections";

export default function TestPagination() {
  const {
    hookState,
    pageParams,
    pgTriggerFns,
    totalRecords,
  } = usePagination({
    baseQuery: query(
      collection(db, collectionMapping.events),
      where("title", "==", "Street Care SOS"),
      orderBy("title", "asc")
    ),
    sort: null,
  });

  const PAGE_SIZE = 5;

  const totalPages = Math.ceil(
    (totalRecords || 0) / PAGE_SIZE
  );

  const rows = hookState.data || [];

  // ─────────────────────────────────────────────
  // STABLE COLUMN STORAGE (prevents flicker)
  // ─────────────────────────────────────────────
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

  // ─────────────────────────────────────────────
  // Pagination window
  // ─────────────────────────────────────────────
  const getVisiblePages = () => {
    const current = pageParams.pgNo;
    const delta = 2;

    const start = Math.max(0, current - delta);
    const end = Math.min(
      totalPages - 1,
      current + delta
    );

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

      {/* TABLE */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: 700,
            tableLayout: "fixed", // prevents width jumping
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
          const showDots =
            prev !== undefined &&
            pageNo - prev > 1;

          return (
            <React.Fragment key={pageNo}>
              {showDots && (
                <span style={{ padding: "0 6px" }}>
                  ...
                </span>
              )}

              <button
                onClick={() =>
                  pgTriggerFns.getPage(pageNo)
                }
                style={{
                  padding: "6px 10px",
                  border: "1px solid #ccc",
                  background:
                    pageNo === pageParams.pgNo
                      ? "#1976d2"
                      : "#fff",
                  color:
                    pageNo === pageParams.pgNo
                      ? "#fff"
                      : "#000",
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
          disabled={
            pageParams.pgNo >= totalPages - 1
          }
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

// ─────────────────────────────────────────────
// Cell renderer
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────
const th = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};