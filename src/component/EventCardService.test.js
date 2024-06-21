import { calculateNumberOfPages } from "./EventCardService";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

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

    expect(getDocs).toHaveBeenCalledWith(collection(db, "outreachEvents"));
    expect(result).toBe(expectedNumberOfPages);
  });

  test("throws an error when outreaches per page is less than 1", async () => {
    const outreachesPerPage = 0;

    await expect(calculateNumberOfPages(outreachesPerPage)).rejects.toThrow(
      "The number of outreaches per page must be between 1 and 10."
    );
  });

  test("throws an error when outreaches per page is more than 10", async () => {
    const outreachesPerPage = 11;

    await expect(calculateNumberOfPages(outreachesPerPage)).rejects.toThrow(
      "The number of outreaches per page must be between 1 and 10."
    );
  });
});
