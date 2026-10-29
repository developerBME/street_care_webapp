import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getCountFromServer, getDocs, orderBy } from "firebase/firestore";
import { getPage } from "../../../services/paginationService";
import { fetchUserTypeDetails } from "../../EventCardService";
import PostApprovals from "./PostApprovals";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(() => ({})),
  query: jest.fn(() => ({})),
  where: jest.fn(),
  orderBy: jest.fn(),
  getDocs: jest.fn(),
  getCountFromServer: jest.fn(),
}));
jest.mock("../../firebase", () => ({ db: {} }));
jest.mock("../../EventCardService", () => ({ fetchUserTypeDetails: jest.fn() }));
jest.mock("../../../services/paginationService", () => ({ getPage: jest.fn() }));
jest.mock("./helper/postApprovalActions", () => ({}));
jest.mock("./components/PostApprovalModal", () => () => null);
jest.mock("./components/VisitLogExpandedView", () => () => null);
jest.mock("./components/HelpRequestExpandedView", () => () => null);
jest.mock("../ApprovalCardOutreachEvents", () => ({ postData }) => (
  <div data-testid="post">{postData.title} / {postData.userName}</div>
));

const titles = ["Hotel", "Golf", "Foxtrot", "Echo", "Delta", "Charlie", "Bravo", "Alpha"];
const usernames = ["Ada", "Bea", "Cora", "Dina", "Eva", "Faye", "Gia", "Hope"];
const displayedPosts = () => screen.getAllByTestId("post").map((node) => node.textContent);

beforeEach(() => {
  jest.clearAllMocks();
  getCountFromServer.mockResolvedValue({ data: () => ({ count: 8 }) });
  getDocs.mockResolvedValue({
    docs: titles.map((title, index) => ({
      id: String(index),
      data: () => ({ title, uid: String(index), eventDate: index }),
    })),
  });
  fetchUserTypeDetails.mockImplementation(async (uid) => ({ username: usernames[Number(uid)] }));
  getPage.mockImplementation(async (request) => {
    if (request.sort && request.sort.field !== "eventDate") {
      throw new Error("Alternative sort is not available in the Firestore page query");
    }
    return { data: [], totalRecords: 0, pageCheckpoints: {} };
  });
});

test("the search box matches a formatted event date and clears back to all posts", async () => {
  getDocs.mockResolvedValue({ docs: [{
    id: "dated-post",
    data: () => ({ title: "Winter outreach", eventDate: { seconds: new Date(2026, 9, 29, 12).getTime() / 1000 } }),
  }] });
  render(<PostApprovals />);
  await screen.findByText("Showing 0 of 0 posts.");
  const input = screen.getByRole("textbox", { name: "Search pending posts" });
  fireEvent.change(input, { target: { value: "Oct 29, 2026" } });
  await screen.findByText("Showing 1 of 1 posts.");
  expect(displayedPosts()).toEqual(["Winter outreach / Unknown User"]);
  fireEvent.change(input, { target: { value: "" } });
  await screen.findByText("Showing 0 of 0 posts.");
});

test.each([
  ["title", "desc", ""],
  ["title", "asc", ""],
  ["userName", "desc", ""],
  ["userName", "asc", ""],
  ["userName", "asc", "   "],
])("clearing search retains %s %s sorting and pagination (blank=%j)", async (sortField, direction, blank) => {
  render(<PostApprovals />);
  await screen.findByText("Showing 0 of 0 posts.");

  const input = screen.getByRole("textbox", { name: "Search pending posts" });
  fireEvent.change(input, { target: { value: "Alpha" } });
  await screen.findByText("Showing 1 of 1 posts.");

  fireEvent.change(screen.getByRole("combobox", { name: "Sort pending posts by" }), {
    target: { value: sortField },
  });
  await screen.findByText("Showing 1 of 1 posts.");
  if (direction === "asc") {
    fireEvent.click(screen.getByRole("button", { name: /Sorted descending/ }));
    await screen.findByText("Showing 1 of 1 posts.");
  }

  getPage.mockClear();
  orderBy.mockClear();
  fireEvent.change(input, { target: { value: blank } });
  await screen.findByText("Showing 6 of 8 posts.");

  const expected = titles.map((title, index) => ({ title, userName: usernames[index] }));
  expected.sort((a, b) => direction === "asc"
    ? a[sortField].localeCompare(b[sortField])
    : b[sortField].localeCompare(a[sortField]));
  const labels = expected.map((post) => `${post.title} / ${post.userName}`);
  expect(displayedPosts()).toEqual(labels.slice(0, 6));
  expect(getPage).not.toHaveBeenCalled();
  expect(orderBy).toHaveBeenCalledWith("eventDate", direction);
  expect(screen.queryByText(/Please refresh the page/)).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "2" }));
  await screen.findByText("Showing 2 of 8 posts.");
  expect(displayedPosts()).toEqual(labels.slice(6));

  // Searching and clearing again must reset pagination to the first page.
  fireEvent.change(input, { target: { value: "Alpha" } });
  await screen.findByText("Showing 1 of 1 posts.");
  fireEvent.change(input, { target: { value: "" } });
  await screen.findByText("Showing 6 of 8 posts.");
  expect(displayedPosts()).toEqual(labels.slice(0, 6));
});

test("clearing a search with the default date sort returns to cursor pagination", async () => {
  render(<PostApprovals />);
  await screen.findByText("Showing 0 of 0 posts.");
  const input = screen.getByRole("textbox", { name: "Search pending posts" });
  fireEvent.change(input, { target: { value: "Alpha" } });
  await screen.findByText("Showing 1 of 1 posts.");
  getPage.mockClear();
  fireEvent.change(input, { target: { value: "" } });
  await screen.findByText("Showing 0 of 0 posts.");
  await waitFor(() => expect(getPage).toHaveBeenCalledWith(expect.objectContaining({
    search: null,
    sort: { field: "eventDate", direction: "desc" },
    targetPage: 0,
    checkpoints: {},
  })));
});

test.each([
  ["failed-precondition", "The query requires an index.", true],
  ["permission-denied", "Missing or insufficient permissions.", false],
  ["failed-precondition", "A different precondition failed.", false],
])("clearing search reports %s accurately and can recover", async (code, message, missingIndex) => {
  render(<PostApprovals />);
  await screen.findByText("Showing 0 of 0 posts.");
  const input = screen.getByRole("textbox", { name: "Search pending posts" });
  fireEvent.change(input, { target: { value: "Alpha" } });
  await screen.findByText("Showing 1 of 1 posts.");

  const error = Object.assign(new Error(message), { code });
  const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
  try {
    getPage.mockRejectedValueOnce(error);
    fireEvent.change(input, { target: { value: "" } });
    await screen.findByText(missingIndex
      ? "Posts cannot load until the required Firestore index is ready."
      : "Please refresh the page or try again later");
    expect(consoleError).toHaveBeenCalledWith(error);
    expect(screen.queryByText(/<posts>/)).not.toBeInTheDocument();

    // The error state must not prevent searching or clearing again.
    fireEvent.change(input, { target: { value: "Alpha" } });
    await screen.findByText("Showing 1 of 1 posts.");
    fireEvent.change(input, { target: { value: "" } });
    await screen.findByText("Showing 0 of 0 posts.");
  } finally {
    consoleError.mockRestore();
  }
});
