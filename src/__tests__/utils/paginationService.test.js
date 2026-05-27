import {
  buildPaginatedQuery,
  getNearestCachedPageBefore,
} from "../../utils/buildPaginatedQuery";
import { getPageCheckpoint } from "../../utils/getPageCheckpoint";
import { createPaginationRequest } from "../../services/paginationService";
import { getDocs, query, startAfter, startAt } from "firebase/firestore";

// Mock Firestore query builders. The tests verify cursor decisions and
// checkpoint behavior without hitting live Firebase.
jest.mock("firebase/firestore", () => ({
  getDocs: jest.fn(),
  query: jest.fn(),
  startAfter: jest.fn(),
  startAt: jest.fn(),
}));

const PAGE_SIZE = 6;
const baseQuery = { collection: "logs", limit: PAGE_SIZE };
const makeDocsForPage = (page) =>
  Array.from({ length: PAGE_SIZE }, (_, index) => ({
    id: `page-${page}-doc-${index + 1}`,
  }));

const makeCheckpointForPage = (page) => getPageCheckpoint(makeDocsForPage(page));

const resetFirestoreMocks = () => {
  query.mockImplementation((queryBase, ...constraints) => ({
    baseQuery: queryBase,
    constraints,
  }));
  startAfter.mockImplementation((doc) => ({ type: "startAfter", doc }));
  startAt.mockImplementation((doc) => ({ type: "startAt", doc }));
};

describe("getPageCheckpoint", () => {
  test("returns first and last docs for a page", () => {
    // Example: six fake docs produce firstDoc = doc 1 and lastDoc = doc 6.
    const checkpoint = getPageCheckpoint(makeDocsForPage(0));

    expect(checkpoint.firstDoc.id).toBe("page-0-doc-1");
    expect(checkpoint.lastDoc.id).toBe("page-0-doc-6");
  });

  test("uses the same doc as first and last for a short final page", () => {
    const checkpoint = getPageCheckpoint([{ id: "page-4-doc-1" }]);

    expect(checkpoint.firstDoc.id).toBe("page-4-doc-1");
    expect(checkpoint.lastDoc.id).toBe("page-4-doc-1");
  });

  test("returns null for an empty page", () => {
    expect(getPageCheckpoint([])).toBeNull();
  });
});

describe("getNearestCachedPageBefore", () => {
  test("returns the nearest cached page before the requested page", () => {
    const checkpoints = {
      0: makeCheckpointForPage(0),
      2: makeCheckpointForPage(2),
    };

    expect(getNearestCachedPageBefore(5, checkpoints)).toBe(2);
  });

  test("returns null when no previous page is cached", () => {
    expect(getNearestCachedPageBefore(5, {})).toBeNull();
  });
});

describe("buildPaginatedQuery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetFirestoreMocks();
  });

  test("builds first page query without a cursor", () => {
    const result = buildPaginatedQuery({
      baseQuery,
      page: 0,
      pageCheckpoints: {},
    });

    expect(query).not.toHaveBeenCalled();
    expect(startAt).not.toHaveBeenCalled();
    expect(startAfter).not.toHaveBeenCalled();
    expect(result.pageQuery).toBe(baseQuery);
    expect(result.isTargetPage).toBeUndefined();
  });

  test("builds cached page query with startAt", () => {
    // Example: if page 1 is cached, fetch it directly from its first doc.
    const pageOneCheckpoint = makeCheckpointForPage(1);

    buildPaginatedQuery({
      baseQuery,
      page: 1,
      pageCheckpoints: {
        1: pageOneCheckpoint,
      },
    });

    expect(startAt).toHaveBeenCalledWith(pageOneCheckpoint.firstDoc);
    expect(query).toHaveBeenCalledWith(
      baseQuery,
      expect.objectContaining({ type: "startAt" }),
    );
  });

  test("builds missing page query from nearest previous checkpoint", () => {
    // Example: page 3 with page 2 cached uses startAfter(page 2's last doc).
    const pageTwoCheckpoint = makeCheckpointForPage(2);

    buildPaginatedQuery({
      baseQuery,
      page: 3,
      pageCheckpoints: {
        2: pageTwoCheckpoint,
      },
    });

    expect(startAfter).toHaveBeenCalledWith(pageTwoCheckpoint.lastDoc);
    expect(query).toHaveBeenCalledWith(
      baseQuery,
      expect.objectContaining({ type: "startAfter" }),
    );
  });

  test("throws for negative pages", () => {
    expect(() =>
      buildPaginatedQuery({
        baseQuery,
        page: -1,
      }),
    ).toThrow("Page must be 0 or greater.");
  });
});

describe("createPaginationRequest", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetFirestoreMocks();
  });

  test("fills missing checkpoints up to the page before the requested page", async () => {
    // Pages 0-2 are cached. Requesting page 5 should fetch pages 3 and 4 only.
    const pageZeroCheckpoint = makeCheckpointForPage(0);
    const pageOneCheckpoint = makeCheckpointForPage(1);
    const pageTwoCheckpoint = makeCheckpointForPage(2);
    getDocs
      .mockResolvedValueOnce({ docs: makeDocsForPage(3) })
      .mockResolvedValueOnce({ docs: makeDocsForPage(4) });

    const result = await createPaginationRequest({
      baseQuery,
      page: 5,
      pageCheckpoints: {
        0: pageZeroCheckpoint,
        1: pageOneCheckpoint,
        2: pageTwoCheckpoint,
      },
    });

    expect(getDocs).toHaveBeenCalledTimes(2);
    expect(result.pageCheckpoints[3].firstDoc.id).toBe("page-3-doc-1");
    expect(result.pageCheckpoints[3].lastDoc.id).toBe("page-3-doc-6");
    expect(result.pageCheckpoints[4].firstDoc.id).toBe("page-4-doc-1");
    expect(result.pageCheckpoints[4].lastDoc.id).toBe("page-4-doc-6");
    expect(startAfter).toHaveBeenLastCalledWith(
      result.pageCheckpoints[4].lastDoc,
    );
    expect(result.pageQuery).toBeDefined();
    expect(result.isTargetPage).toBeUndefined();
  });

  test("does not fetch intermediate pages when the requested page is already cached", async () => {
    const pageTwoCheckpoint = makeCheckpointForPage(2);

    const result = await createPaginationRequest({
      baseQuery,
      page: 2,
      pageCheckpoints: {
        2: pageTwoCheckpoint,
      },
    });

    expect(getDocs).not.toHaveBeenCalled();
    expect(startAt).toHaveBeenCalledWith(pageTwoCheckpoint.firstDoc);
    expect(result.pageCheckpoints[2]).toEqual(pageTwoCheckpoint);
    expect(result.pageQuery).toBeDefined();
  });

  test("starts from page 0 when no checkpoints exist", async () => {
    getDocs
      .mockResolvedValueOnce({ docs: makeDocsForPage(0) })
      .mockResolvedValueOnce({ docs: makeDocsForPage(1) });

    const result = await createPaginationRequest({
      baseQuery,
      page: 2,
      pageCheckpoints: {},
    });

    expect(getDocs).toHaveBeenCalledTimes(2);
    expect(result.pageCheckpoints[0].lastDoc.id).toBe("page-0-doc-6");
    expect(result.pageCheckpoints[1].lastDoc.id).toBe("page-1-doc-6");
    expect(startAfter).toHaveBeenLastCalledWith(
      result.pageCheckpoints[1].lastDoc,
    );
  });

  test("returns null pageQuery when an intermediate page is empty", async () => {
    getDocs.mockResolvedValueOnce({ docs: [] });

    const result = await createPaginationRequest({
      baseQuery,
      page: 2,
      pageCheckpoints: {},
    });

    expect(result.pageQuery).toBeNull();
    expect(result.pageCheckpoints).toEqual({});
  });

});
