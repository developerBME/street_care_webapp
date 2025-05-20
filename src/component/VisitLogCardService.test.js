import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { calculateNumberOfPagesForVisitlog } from "./VisitLogCardService";

import collectionMapping from "../utils/firestoreCollections";

jest.mock("firebase/firestore");

const visitLogs_collection = collectionMapping.visitLogs;

describe("calculateNumberOfPagesForVisitlog function", () => {
  test("calculates the number of pages correctly", async () => {
    const mockVisitlogSnapshot = {
      size: 25, // Mocking the total count of outreaches
    };

    getDocs.mockResolvedValue(mockVisitlogSnapshot); // Mock getDocs return value

    const visitlogsPerPage = 5;
    const expectedNumberOfPages = 5; // 25 / 5 = 5

    const result = await calculateNumberOfPagesForVisitlog(visitlogsPerPage);

    expect(getDocs).toHaveBeenCalledWith(collection(db, visitLogs_collection));
    expect(result).toBe(expectedNumberOfPages);
  });

  test("throws an error when visitlogs per page is less than 1", async () => {
    const visitlogPerPage = 0;

    await expect(
      calculateNumberOfPagesForVisitlog(visitlogPerPage)
    ).rejects.toThrow(
      "The number of visitlogs per page must be between 1 and 10."
    );
  });

  test("throws an error when visitlogs per page is more than 10", async () => {
    const visitlogsPerPage = 11;

    await expect(
      calculateNumberOfPagesForVisitlog(visitlogsPerPage)
    ).rejects.toThrow(
      "The number of visitlogs per page must be between 1 and 10."
    );
  });
});
