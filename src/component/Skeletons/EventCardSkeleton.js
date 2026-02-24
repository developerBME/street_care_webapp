function EventCardSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="w-full my-9 rounded-xl border border-gray-200 p-4 shadow animate-pulse md:p-6 dark:border-gray-700"
    >
      <span className="sr-only">Loading event</span>

      <div aria-hidden="true">
        <div className="mb-4 flex items-center">
          <svg
            className="me-3 h-10 w-10 shrink-0 text-gray-200 dark:text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>

          <div className="h-2.5 w-full max-w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>

        <div className="mb-4 h-2.5 w-full max-w-md rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="mb-2.5 h-2 w-full max-w-xs rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="mb-2.5 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-full max-w-lg rounded-full bg-gray-200 dark:bg-gray-700" />

        <div className="mt-6 flex justify-between gap-4">
          <div className="h-4 w-full max-w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-full max-w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}

export default EventCardSkeleton;
