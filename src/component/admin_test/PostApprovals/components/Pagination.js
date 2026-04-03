function buildPages(totalPages, currentPage) {
  if (totalPages <= 5)
    return Array.from({ length: totalPages }, (_, i) => i + 1);

  if (currentPage <= 3) return [1, 2, 3, "...", totalPages];

  if (currentPage >= totalPages - 2)
    return [1, "...", totalPages - 2, totalPages - 1, totalPages];

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  canJumpToPage,
}) {
  const safeItemsPerPage = Math.max(itemsPerPage || 0, 1);
  const totalPages = Math.ceil((totalItems || 0) / safeItemsPerPage);

  if (totalPages <= 1) return null;

  const clampedCurrentPage = Math.min(
    Math.max(currentPage || 1, 1),
    totalPages,
  );

  const pages = buildPages(totalPages, clampedCurrentPage);

  const isPageClickable = (page) => {
    if (typeof page !== "number") return false;
    if (!canJumpToPage) return true;
    return canJumpToPage(page);
  };

  const goPrev = () => {
    const p = Math.max(clampedCurrentPage - 1, 1);
    if (isPageClickable(p)) onPageChange(p);
  };

  const goNext = () => {
    const p = Math.min(clampedCurrentPage + 1, totalPages);
    if (isPageClickable(p)) onPageChange(p);
  };

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        type="button"
        onClick={goPrev}
        disabled={
          clampedCurrentPage === 1 || !isPageClickable(clampedCurrentPage - 1)
        }
        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#9B82CF] bg-white disabled:opacity-50"
      >
        &lt;
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="flex h-8 w-8 items-center justify-center"
          >
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            type="button"
            onClick={() => onPageChange(page)}
            disabled={!isPageClickable(page)}
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              clampedCurrentPage === page
                ? "bg-[#1F0A58] text-dark"
                : "border border-[#9B82CF] bg-white text-black"
            } disabled:opacity-50`}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={goNext}
        disabled={
          clampedCurrentPage === totalPages ||
          !isPageClickable(clampedCurrentPage + 1)
        }
        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#9B82CF] bg-white disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
}
