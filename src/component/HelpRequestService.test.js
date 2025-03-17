import {
  calculateNumberOfPagesForHelpReq,
  fetchByCityAndDate,
  fetchOutreaches,
} from "./HelpRequestService";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "./firebase"; // Ensure this import is correct
import collectionMapping from "../utils/firestoreCollections";

const outreachEvents_collection = collectionMapping.outreachEvents;
const helpRequests_collection = collectionMapping.helpRequests;

jest.mock("firebase/firestore");

describe("fetchOutreaches function", () => {
  test("returns empty array if no outreaches found", async () => {
    const mockOutreachSnapshot = {
      empty: true,
      forEach: jest.fn(), // Mock forEach method
    };

    getDocs.mockResolvedValue(mockOutreachSnapshot); // Mock getDocs return value

    const helpRequestId = "test-ID";
    const outreaches = await fetchOutreaches(helpRequestId);

    console.log("Outreaches (no outreaches found):", outreaches);

    expect(getDocs).toHaveBeenCalledWith(
      query(
        collection(db, outreachEvents_collection),
        where("HelpRequest.id", "==", helpRequestId)
      )
    );
    expect(outreaches).toEqual([]);
  });

  test("returns outreach data for a help request ID", async () => {
    const mockOutreachData = { someData: "value" };
    const mockOutreachSnapshot = {
      docs: [{ id: "doc-id", data: () => mockOutreachData }],
      forEach: jest.fn((callback) =>
        callback({ id: "doc-id", data: () => mockOutreachData })
      ),
    };

    getDocs.mockResolvedValue(mockOutreachSnapshot);

    const helpRequestId = "test-ID";
    const outreaches = await fetchOutreaches(helpRequestId);

    console.log("Outreaches (outreach data found):", outreaches);

    expect(getDocs).toHaveBeenCalledWith(
      query(
        collection(db, outreachEvents_collection),
        where("HelpRequest.id", "==", helpRequestId)
      )
    );
    expect(outreaches).toEqual([{ id: "doc-id", ...mockOutreachData }]);
  });
});

describe("calculateNumberOfPagesForHelpReq function", () => {
  test("calculates the number of pages correctly for help request", async () => {
    const mockHelpReqSnapshot = {
      size: 25, // Mocking the total count of outreaches
    };

    getDocs.mockResolvedValue(mockHelpReqSnapshot); // Mock getDocs return value

    const helpReqPerPage = 5;
    const expectedNumberOfPages = 5; // 25 / 5 = 5

    const result = await calculateNumberOfPagesForHelpReq(helpReqPerPage);

    expect(getDocs).toHaveBeenCalledWith(collection(db, helpRequests_collection));
    expect(result).toBe(expectedNumberOfPages);
  });

  test("throws an error when help requests per page is less than 1", async () => {
    const helpReqPerPage = 0;

    await expect(
      calculateNumberOfPagesForHelpReq(helpReqPerPage)
    ).rejects.toThrow(
      "The number of help requests per page must be between 1 and 10."
    );
  });

  test("throws an error when help requests per page is more than 10", async () => {
    const helpReqPerPage = 11;

    await expect(
      calculateNumberOfPagesForHelpReq(helpReqPerPage)
    ).rejects.toThrow(
      "The number of help requests per page must be between 1 and 10."
    );
  });
});

describe("fetchByCityAndDate function", () => {
  const validSearchCityValue = "San Jose";
  const validStartDate = new Date("2024-05-07T00:00:00Z");
  const validEndDate = new Date("2024-05-09T23:59:59Z");
  let consoleErrorSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  // Test for invalid search value
  test("logs error and returns if searchCityValue is not a string", async () => {
    const result = await fetchByCityAndDate(1235, validStartDate, validEndDate);
    expect(console.error).toHaveBeenCalledWith("Invalid search value");
    expect(result).toBeUndefined();
  });

  test("logs error and returns if searchCityValue is an object instead of a string", async () => {
    const result = await fetchByCityAndDate({}, validStartDate, validEndDate);
    expect(console.error).toHaveBeenCalledWith("Invalid search value");
    expect(result).toBeUndefined();
  });

  test("logs error and returns if searchCityValue is an empty string", async () => {
    const result = await fetchByCityAndDate("", validStartDate, validEndDate);
    expect(console.error).toHaveBeenCalledWith("Invalid search value");
    expect(result).toBeUndefined();
  });

  // Test for invalid start Date
  test("logs error and returns if startDate is not a valid date", async () => {
    const result = await fetchByCityAndDate(
      validSearchCityValue,
      "invalid-date",
      validEndDate
    );
    expect(console.error).toHaveBeenCalledWith("Invalid start date");
    expect(result).toBeUndefined();
  });

  test("logs error and returns if startDate is not a Date object", async () => {
    const result = await fetchByCityAndDate(
      validSearchCityValue,
      {},
      validEndDate
    );
    expect(console.error).toHaveBeenCalledWith("Invalid start date");
    expect(result).toBeUndefined();
  });

  // Test for invalid end Date
  test("logs error and returns if endDate is not a valid date", async () => {
    const result = await fetchByCityAndDate(
      validSearchCityValue,
      validStartDate,
      "invalid-date"
    );
    expect(console.error).toHaveBeenCalledWith("Invalid end date");
    expect(result).toBeUndefined();
  });

  test("logs error and returns if endDate is not a Date object", async () => {
    const result = await fetchByCityAndDate(
      validSearchCityValue,
      validStartDate,
      {}
    );
    expect(console.error).toHaveBeenCalledWith("Invalid end date");
    expect(result).toBeUndefined();
  });

  test("returns empty array if no documents found", async () => {
    const mockSnapshot = {
      empty: true,
      docs: [],
    };
    getDocs.mockResolvedValue(mockSnapshot);
    const helpRequests = await fetchByCityAndDate(
      validSearchCityValue,
      validStartDate,
      validEndDate
    ); //promise...write
    console.log("Results - no documents found:", helpRequests);
    expect(getDocs).toHaveBeenCalledWith(
      query(
        collection(db, helpRequests_collection),
        where("location.city", "==", validSearchCityValue),
        where("createdAt", ">=", validStartDate),
        where("createdAt", "<=", validEndDate)
      )
    );
    expect(helpRequests).toEqual([]);
  });
});
