import { buildPaginatedQuery } from "../../utils/buildPaginatedQuery";
import { getPageCheckpoint } from "../../utils/getPageCheckpoint";
import { createPaginationRequest } from "../../services/paginationService";
import { limit, query, startAfter, startAt } from "firebase/firestore";

// Mock only Firestore query builders. These tests verify cursor decisions,
// not live Firebase reads or Firestore index behavior.
// Example: startAfter(doc) returns a plain object so we can assert the cursor.
jest.mock("firebase/firestore", () => ({
  limit: jest.fn((n) => ({ type: "limit", n })),
  query: jest.fn((baseQuery, ...constraints) => ({
    baseQuery,
    constraints,
  })),
  startAfter: jest.fn((doc) => ({ type: "startAfter", doc })),
  startAt: jest.fn((doc) => ({ type: "startAt", doc })),
}));

const PAGE_SIZE = 6;
const baseQuery = { collection: "logs" };
const makeDocsForPage = (page) =>
  Array.from({ length: PAGE_SIZE }, (_, index) => ({
    id: `page-${page}-doc-${index + 1}`,
  }));

const makeCheckpointForPage = (page) => getPageCheckpoint(makeDocsForPage(page));

describe("getPageCheckpoint", () => {
  test("returns first and last docs for a page", () => {
    // Plain objects are enough here because the helper only stores snapshots.
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

describe("buildPaginatedQuery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("builds first page query without a cursor", () => {
    const result = buildPaginatedQuery({
      baseQuery,
      page: 0,
      pageSize: PAGE_SIZE,
      pageCheckpoints: {},
    });

    expect(limit).toHaveBeenCalledWith(PAGE_SIZE);
    expect(startAt).not.toHaveBeenCalled();
    expect(startAfter).not.toHaveBeenCalled();
    expect(result.pageToCache).toBe(0);
    expect(result.isTargetPage).toBe(true);
  });

  test("builds cached page query with startAt", () => {
    // Example: if page 1 is cached, we can fetch it directly from its first doc.
    const pageOneCheckpoint = makeCheckpointForPage(1);

    const result = buildPaginatedQuery({
      baseQuery,
      page: 1,
      pageSize: PAGE_SIZE,
      pageCheckpoints: {
        1: pageOneCheckpoint,
      },
    });

    expect(startAt).toHaveBeenCalledWith(pageOneCheckpoint.firstDoc);
    expect(limit).toHaveBeenCalledWith(PAGE_SIZE);
    expect(result.pageToCache).toBe(1);
    expect(result.isTargetPage).toBe(true);
  });

  test("builds next missing page query with nearest previous checkpoint", () => {
    // Example: page 1 is fetched with startAfter(page 0's last doc).
    const pageZeroCheckpoint = makeCheckpointForPage(0);

    const result = buildPaginatedQuery({
      baseQuery,
      page: 1,
      pageSize: PAGE_SIZE,
      pageCheckpoints: {
        0: pageZeroCheckpoint,
      },
    });

    expect(startAfter).toHaveBeenCalledWith(pageZeroCheckpoint.lastDoc);
    expect(limit).toHaveBeenCalledWith(PAGE_SIZE);
    expect(result.pageToCache).toBe(1);
    expect(result.isTargetPage).toBe(true);
  });

  test("returns the first missing page when target page is not reachable yet", () => {
    // With no checkpoints, page 2 cannot be fetched directly. The service asks
    // the hook to fetch and cache page 0 first.
    const result = buildPaginatedQuery({
      baseQuery,
      page: 2,
      pageSize: PAGE_SIZE,
      pageCheckpoints: {},
    });

    expect(startAfter).not.toHaveBeenCalled();
    expect(result.pageToCache).toBe(0);
    expect(result.isTargetPage).toBe(false);
  });

  test("continues from the nearest cached page while jumping forward", () => {
    // The target is page 3, but page 2 is the next missing page after cache.
    const pageZeroCheckpoint = makeCheckpointForPage(0);
    const pageOneCheckpoint = makeCheckpointForPage(1);

    const result = buildPaginatedQuery({
      baseQuery,
      page: 3,
      pageSize: PAGE_SIZE,
      pageCheckpoints: {
        0: pageZeroCheckpoint,
        1: pageOneCheckpoint,
      },
    });

    expect(startAfter).toHaveBeenCalledWith(pageOneCheckpoint.lastDoc);
    expect(result.pageToCache).toBe(2);
    expect(result.isTargetPage).toBe(false);
  });

  test("skips older checkpoints and starts after the nearest cached page", () => {
    const pageZeroCheckpoint = makeCheckpointForPage(0);
    const pageTwoCheckpoint = makeCheckpointForPage(2);

    const result = buildPaginatedQuery({
      baseQuery,
      page: 4,
      pageSize: PAGE_SIZE,
      pageCheckpoints: {
        0: pageZeroCheckpoint,
        2: pageTwoCheckpoint,
      },
    });

    expect(startAfter).toHaveBeenCalledWith(pageTwoCheckpoint.lastDoc);
    expect(result.pageToCache).toBe(3);
    expect(result.isTargetPage).toBe(false);
  });

  test("throws for negative pages", () => {
    expect(() =>
      buildPaginatedQuery({
        baseQuery,
        page: -1,
        pageSize: PAGE_SIZE,
      }),
    ).toThrow("Page must be 0 or greater.");
  });
});

describe("createPaginationRequest", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns a page query and resolves docs into updated checkpoints", () => {
    // The hook will fetch request.pageQuery, then pass snapshot.docs to resolve.
    // Example: resolving six docs caches page 0 as { firstDoc, lastDoc }.
    const request = createPaginationRequest({
      baseQuery,
      page: 0,
      pageSize: PAGE_SIZE,
      pageCheckpoints: {},
    });

    const result = request.resolve(makeDocsForPage(0));

    expect(request.pageToCache).toBe(0);
    expect(request.isTargetPage).toBe(true);
    expect(result.pageCheckpoints[0].firstDoc.id).toBe("page-0-doc-1");
    expect(result.pageCheckpoints[0].lastDoc.id).toBe("page-0-doc-6");
    expect(result.docs).toHaveLength(PAGE_SIZE);
  });

  test("resolves an intermediate page during a forward jump without marking it as target", () => {
    const request = createPaginationRequest({
      baseQuery,
      page: 3,
      pageSize: PAGE_SIZE,
      pageCheckpoints: {
        0: makeCheckpointForPage(0),
      },
    });

    const result = request.resolve(makeDocsForPage(1));

    expect(request.pageToCache).toBe(1);
    expect(request.isTargetPage).toBe(false);
    expect(result.pageCheckpoints[1].firstDoc.id).toBe("page-1-doc-1");
    expect(result.pageCheckpoints[1].lastDoc.id).toBe("page-1-doc-6");
    expect(result.isTargetPage).toBe(false);
  });

  test("does not add a checkpoint when resolved docs are empty", () => {
    // Example: an empty Firestore page leaves the checkpoint cache unchanged.
    const existingCheckpoint = makeCheckpointForPage(0);
    const request = createPaginationRequest({
      baseQuery,
      page: 1,
      pageSize: PAGE_SIZE,
      pageCheckpoints: {
        0: existingCheckpoint,
      },
    });

    const result = request.resolve([]);

    expect(result.isEmpty).toBe(true);
    expect(result.pageCheckpoints).toEqual({
      0: existingCheckpoint,
    });
  });
});
