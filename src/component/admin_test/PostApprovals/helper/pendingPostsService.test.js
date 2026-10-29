import { getDocs } from "firebase/firestore";
import { fetchUserTypeDetails } from "../../../EventCardService";
import { postQueryConfig } from "./index";
import { fetchPendingSearchPage } from "./pendingPostsService";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(), query: jest.fn(), where: jest.fn(), orderBy: jest.fn(),
  getDocs: jest.fn(),
}));
jest.mock("../../../firebase", () => ({ db: {} }));
jest.mock("../../../EventCardService", () => ({ fetchUserTypeDetails: jest.fn() }));

const date = new Date(2026, 9, 29, 12);
const timestamp = { seconds: date.getTime() / 1000 };
const fixtures = {
  outreaches: {
    title: "Winter Outreach", description: "Distributing warm blankets",
    location: { city: "Boston", stateAbbv: "MA", address: "12 Main Street" },
    eventDate: timestamp,
  },
  visitLogs: {
    firstName: "Jamie", lastName: "Smith", description: "Distributing warm blankets",
    city: "Boston", stateAbbv: "MA", addr1: "12 Main Street",
    timeStamp: timestamp, lastModifiedTimestamp: timestamp,
  },
  helpRequests: {
    firstName: "Jamie", lastName: "Smith", additionalDetails: "Needs warm blankets",
    locationLandmark: "Boston, MA, 12 Main Street",
    timestampOfInteraction: timestamp, followUpTimestamp: timestamp,
    lastModifiedTimestamp: timestamp,
  },
};

const setPosts = (posts) => getDocs.mockResolvedValue({
  docs: posts.map((post, index) => ({ id: String(index), data: () => post })),
});

const search = (tab, searchTerm, options = {}) => fetchPendingSearchPage({
  collectionName: tab,
  orderField: postQueryConfig[tab].defaultSort.field,
  searchFields: postQueryConfig[tab].searchFields,
  searchDateFields: postQueryConfig[tab].searchDateFields,
  searchTerm, page: 1, pageSize: 6, ...options,
});

beforeEach(() => {
  jest.clearAllMocks();
  fetchUserTypeDetails.mockResolvedValue({ username: "Alex Rivera" });
});

describe.each(Object.keys(fixtures))("%s search", (tab) => {
  beforeEach(() => setPosts([{ ...fixtures[tab], uid: "submitter" }, {}]));

  test.each([
    "  aLeX riVera  ", "Boston, MA", "main street", "WARM blankets",
    "2026-10-29", "10/29/2026", "Oct 29, 2026", "October 29", "2026",
  ])("matches name, location, description or date: %s", async (term) => {
    const result = await search(tab, term);
    expect(result.total).toBe(1);
    expect(result.posts.map((post) => post.id)).toEqual(["0"]);
  });

  test("does not match unrelated text", async () => {
    expect((await search(tab, "unmatched")).posts).toEqual([]);
  });

  test("matches the post's name", async () => {
    const result = await search(tab, tab === "outreaches" ? "winter outreach" : "Jamie Smith");
    expect(result.total).toBe(1);
  });
});

test.each([
  date,
  { toDate: () => date },
  timestamp,
  date.toISOString(),
  "2026-10-29",
])("supports stored date representations: %p", async (eventDate) => {
  setPosts([{ eventDate }]);
  expect((await search("outreaches", "2026-10-29")).total).toBe(1);
});

test("handles missing and invalid dates without interrupting text searches", async () => {
  setPosts([{}, { eventDate: "bad date", title: "Winter outreach" }, { eventDate: new Date(NaN) }]);
  expect((await search("outreaches", "2026-10-29")).total).toBe(0);
  expect((await search("outreaches", "winter")).total).toBe(1);
});

test("filters before counting and paging, and clears whitespace-only searches", async () => {
  setPosts(Array.from({ length: 10 }, (_, index) => ({
    title: index < 8 ? "Winter outreach" : "Summer outreach",
    eventDate: { seconds: timestamp.seconds + index * 60 },
  })));
  const result = await search("outreaches", "winter", { page: 2 });
  expect(result.total).toBe(8);
  expect(result.posts.map((post) => post.id)).toEqual(["1", "0"]);
  const cleared = await search("outreaches", "   ");
  expect(cleared.total).toBe(10);
  expect(cleared.posts).toHaveLength(6);
});
