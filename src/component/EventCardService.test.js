const {
  calculateNumberOfPages,
  formatDate,
  fetchByCityOrState,
} = require("./EventCardService");
const { collection, getDocs, query, where } = require("firebase/firestore");
const { db } = require("./firebase");
const assert = require("assert");

// Mock Firebase Firestore
jest.mock("firebase/firestore");

describe("calculateNumberOfPages function", () => {
  test("calculates the number of pages correctly", async () => {
    const mockOutreachSnapshot = {
      size: 25, // Mocking the total count of outreaches
    };

    getDocs.mockResolvedValue(mockOutreachSnapshot); // Mock getDocs return value

    const outreachesPerPage = 5;
    const expectedNumberOfPages = 5; // 25 / 5 = 5

    const result = await calculateNumberOfPages(outreachesPerPage);

    assert.strictEqual(
      result,
      expectedNumberOfPages,
      "Number of pages calculation is incorrect"
    );
    expect(getDocs).toHaveBeenCalledWith(collection(db, "outreachEvents"));
  });

  test("throws an error when outreaches per page is less than 1", async () => {
    const outreachesPerPage = 0;

    await assert.rejects(
      async () => {
        await calculateNumberOfPages(outreachesPerPage);
      },
      { message: "The number of outreaches per page must be between 1 and 10." }
    );
  });

  test("throws an error when outreaches per page is more than 10", async () => {
    const outreachesPerPage = 11;

    await assert.rejects(
      async () => {
        await calculateNumberOfPages(outreachesPerPage);
      },
      { message: "The number of outreaches per page must be between 1 and 10." }
    );
  });
});

describe("fetchByCityOrState", () => {
  const validSearchValue = "New York City";
  const validStartDate = new Date("2023-01-01");
  const validEndDate = new Date("2023-12-31");

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("should log an error and return if no search value is passed", async () => {
    const result = await fetchByCityOrState(
      undefined,
      validStartDate,
      validEndDate
    );
    expect(console.error).toHaveBeenCalledWith("Invalid search value");
    expect(result).toBeUndefined();
  });

  it("should log an error and return if search value is an object instead of a string", async () => {
    const result = await fetchByCityOrState({}, validStartDate, validEndDate);
    expect(console.error).toHaveBeenCalledWith("Invalid search value");
    expect(result).toBeUndefined();
  });

  it("should log an error and return if search value is blank", async () => {
    const result = await fetchByCityOrState("", validStartDate, validEndDate);
    expect(console.error).toHaveBeenCalledWith("Invalid search value");
    expect(result).toBeUndefined();
  });

  it("should log an error and return if start date is invalid", async () => {
    const result = await fetchByCityOrState(
      validSearchValue,
      "invalid date",
      validEndDate
    );
    expect(console.error).toHaveBeenCalledWith("Invalid start date");
    expect(result).toBeUndefined();
  });

  it("should log an error and return if end date is invalid", async () => {
    const result = await fetchByCityOrState(
      validSearchValue,
      validStartDate,
      "invalid date"
    );
    expect(console.error).toHaveBeenCalledWith("Invalid end date");
    expect(result).toBeUndefined();
  });

  it("should log an error and return if start date is not a Date object", async () => {
    const result = await fetchByCityOrState(
      validSearchValue,
      1234567890,
      validEndDate
    );
    expect(console.error).toHaveBeenCalledWith("Invalid start date");
    expect(result).toBeUndefined();
  });

  it("should log an error and return if end date is not a Date object", async () => {
    const result = await fetchByCityOrState(
      validSearchValue,
      validStartDate,
      ""
    );
    expect(console.error).toHaveBeenCalledWith("Invalid end date");
    expect(result).toBeUndefined();
  });

  test("returns outreach data for a given city and date range", async () => {
    const mockOutreachData = { someData: "value" };
    const mockOutreachSnapshot = {
      docs: [{ id: "doc-id", data: () => mockOutreachData }],
    };

    // Mocking the return value of getDocs
    getDocs.mockResolvedValue(mockOutreachSnapshot);

    const searchValue = "Seatlle";
    const startDate = new Date("2021-09-07"); //new Date("2021-09-07T00:00:00");
    const endDate = new Date("2021-11-20"); //new Date("2021-11-20T00:00:00");

    // Create a mock collection reference
    const mockCollectionRef = {};
    collection.mockReturnValue(mockCollectionRef);

    // Create a mock query
    const mockQuery = {};
    query.mockReturnValue(mockQuery);

    const results = await fetchByCityOrState(searchValue, startDate, endDate);

    console.log("Results (matches found):", results);

    expect(collection).toHaveBeenCalledWith(db, "pastOutreachEvents");
    expect(query).toHaveBeenCalledWith(
      mockCollectionRef,
      where("location.city", "==", searchValue),
      where("eventDate", ">=", startDate),
      where("eventDate", "<=", endDate)
    );
    expect(getDocs).toHaveBeenCalledWith(mockQuery);
    expect(results).toEqual([{ id: "doc-id", ...mockOutreachData }]);
  });

  test("returns empty array if no matches are found", async () => {
    const mockOutreachSnapshot = {
      docs: [],
    };

    // Mocking the return value of getDocs
    getDocs.mockResolvedValue(mockOutreachSnapshot);

    const searchValue = "nonexistent";
    const startDate = new Date("2021-09-07T00:00:00");
    const endDate = new Date("2021-11-20T00:00:00");

    // Create a mock collection reference
    const mockCollectionRef = {};
    collection.mockReturnValue(mockCollectionRef);

    // Create a mock query
    const mockQuery = {};
    query.mockReturnValue(mockQuery);

    const results = await fetchByCityOrState(searchValue, startDate, endDate);

    console.log("Results (no matches found):", results);

    expect(collection).toHaveBeenCalledWith(db, "pastOutreachEvents");
    expect(query).toHaveBeenCalledWith(
      mockCollectionRef,
      where("location.city", "==", searchValue),
      where("eventDate", ">=", startDate),
      where("eventDate", "<=", endDate)
    );
    expect(getDocs).toHaveBeenCalledWith(mockQuery);
    expect(results).toEqual([]);
  });
});

describe("formatDate function", () => {
  test("correctly formats a known date", () => {
    const testDate = new Date(2024, 5, 25, 15, 30); // June 25, 2024 3:30 PM
    const expected = "Jun 25, 2024 TUE 3:30 PM";
    const result = formatDate(testDate);
    assert.strictEqual(
      result,
      expected,
      `Expected ${expected}, but got ${result}`
    );
  });

  test("handles AM/PM correctly", () => {
    const testDate = new Date(2024, 11, 1, 0, 5); // Dec 1, 2024 12:05 AM
    const expected = "Dec 1, 2024 SUN 12:05 AM";
    const result = formatDate(testDate);
    assert.strictEqual(
      result,
      expected,
      `Expected ${expected}, but got ${result}`
    );
  });

  test("correctly formats single-digit minutes", () => {
    const testDate = new Date(2024, 0, 1, 9, 5); // Jan 1, 2024 9:05 AM
    const expected = "Jan 1, 2024 MON 9:05 AM";
    const result = formatDate(testDate);
    assert.strictEqual(
      result,
      expected,
      `Expected ${expected}, but got ${result}`
    );
  });
});
