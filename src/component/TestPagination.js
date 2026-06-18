import React from "react";
import usePagination from "../hooks/usePagination";
import { collection } from "firebase/firestore";
import { db } from "./firebase";
import collectionMapping from "../utils/firestoreCollections";

export default function TestPagination() {
  const {
    hookState,
    pageParams,
    pgTriggerFns,
    totalRecords,
  } = usePagination({
    baseQuery: collection(db, collectionMapping.users),
    sort: null,
  });

  const PAGE_SIZE = 5;

  const totalPages = Math.ceil(
    (totalRecords || 0) / PAGE_SIZE
  );

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

      {/* TABLE FIRST */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: 700,
          }}
        >
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={th}>UID</th>
              <th style={th}>Email</th>
              <th style={th}>Type</th>
            </tr>
          </thead>

          <tbody>
            {hookState.data?.map((u) => (
              <tr key={u.id}>
                <td style={td}>{u.uid}</td>
                <td style={td}>{u.email}</td>
                <td style={td}>{u.Type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION AT BOTTOM */}
      <div
        style={{
          marginTop: 20,
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",

          // optional: keep visible above sticky footers
          position: "relative",
          zIndex: 9999,
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

const th = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};