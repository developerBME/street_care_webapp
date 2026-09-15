import searchIcon from "../../../../images/search-icon-PostApproval.png";

export default function SearchSort({
  search,
  onSearchChange,
  sortField,
  sortDirection,
  sortOptions,
  onSortFieldChange,
  onSortDirectionChange,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end sm:gap-6">
      {/* Search */}
      <div className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded border border-gray-300 px-2 sm:flex-initial sm:w-64">
        <input
          type="text"
          placeholder="Search here..."
          name="searchText"
          id="searchText"
          className="h-full min-w-0 flex-1 text-sm outline-none"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          aria-label="Search pending posts"
        />
        <button type="button" className="h-6 w-6 shrink-0 text-gray-500">
          <img src={searchIcon} alt="Search" className="h-full w-full" />
        </button>
      </div>

      {/* Sort */}
      <div className="flex h-10 w-full items-center gap-2 sm:w-auto">
        <label
          htmlFor="sort"
          className="whitespace-nowrap text-sm font-medium text-[#181818]"
        >
          Sort by:
        </label>
        <select
          id="sort"
          className="h-10 w-full rounded border border-gray-300 bg-white px-3 text-sm sm:w-44"
          value={sortField}
          onChange={(event) => onSortFieldChange(event.target.value)}
          aria-label="Sort pending posts by"
        >
          {sortOptions.map((option) => (
            <option key={option.field} value={option.field}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() =>
            onSortDirectionChange(sortDirection === "asc" ? "desc" : "asc")
          }
          className="h-10 min-w-10 rounded border border-[#6840E0] bg-white px-2 text-[#6840E0]"
          aria-label={`Sorted ${sortDirection === "asc" ? "ascending" : "descending"}. Change sort direction`}
          title={sortDirection === "asc" ? "Ascending" : "Descending"}
        >
          {sortDirection === "asc" ? "↑" : "↓"}
        </button>
      </div>
    </div>
  );
}
