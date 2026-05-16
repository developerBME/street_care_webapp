// Helper to simulate a network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const createDummySnapshots = (pgNo, searchText, filterField) => [
  {
    id: `doc-${pgNo}-1`,
    data: () => ({
      name: `Item ${pgNo}A`,
      matchedSearch: searchText || "none",
      sortedBy: filterField || "none",
    }),
  },
  {
    id: `doc-${pgNo}-2`,
    data: () => ({
      name: `Item ${pgNo}B`,
      matchedSearch: searchText || "none",
      sortedBy: filterField || "none",
    }),
  },
];

export const mockPaginationService = ({ baseQuery, pgParams, pgChckpnts }) => {
  const { pgNo, searchText, filterField } = pgParams;

  const updatedCheckpoints =
    pgChckpnts && typeof pgChckpnts === "object" && !Array.isArray(pgChckpnts)
      ? { ...pgChckpnts }
      : {};

  for (let i = 1; i <= pgNo; i++) {
    if (!updatedCheckpoints[i]) {
      updatedCheckpoints[i] = createDummySnapshots(i, searchText, filterField);
    }
  }

  return {
    // 1-second delayed promise returning a simulated QuerySnapshot layout
    pgQuery: async () => {
      await delay(1000);
      return {
        docs: updatedCheckpoints[pgNo],
      };
    },
    pgCheckpoints: updatedCheckpoints,
  };
};

export const paginationService = ({ baseQuery, pgParams, pgChckpnts }) => {
  {
    /*
        1st condition: pgChckpnts is empty and needs to be built
        2nd condition: pgChckpnts not empty and only needs updation util pgNo.
         */
  }
  const { pgNo, searchText, filterField } = pgParams;

  if (pgChckpnts && typeof pgChckpnts === Object) {
    Object.pgChckpnts.length();
  }

  return {};
};
