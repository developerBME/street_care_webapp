import { calculateNumberOfPagesForHelpReq, fetchOutreaches } from "./HelpRequestService";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "./firebase"; // Ensure this import is correct

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
      
        expect(getDocs).toHaveBeenCalledWith(query(collection(db, "outreachEvents"), where("HelpRequest.id", "==", helpRequestId)));
        expect(outreaches).toEqual([]);
    });
      
    test("returns outreach data for a help request ID", async () => {
        const mockOutreachData = { someData: "value" };
        const mockOutreachSnapshot = {
            docs: [
                { id: "doc-id", data: () => mockOutreachData },
            ],
            forEach: jest.fn(callback => callback({ id: "doc-id", data: () => mockOutreachData })),
        };
      
        getDocs.mockResolvedValue(mockOutreachSnapshot);
      
        const helpRequestId = "test-ID";
        const outreaches = await fetchOutreaches(helpRequestId);

        console.log("Outreaches (outreach data found):", outreaches);
      
        expect(getDocs).toHaveBeenCalledWith(query(collection(db, "outreachEvents"), where("HelpRequest.id", "==", helpRequestId)));
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
  
      expect(getDocs).toHaveBeenCalledWith(collection(db, "helpRequests"));
      expect(result).toBe(expectedNumberOfPages);
    });
  
    test("throws an error when help requests per page is less than 1", async () => {
      const helpReqPerPage = 0;
  
      await expect(calculateNumberOfPagesForHelpReq(helpReqPerPage)).rejects.toThrow(
        "The number of help requests per page must be between 1 and 10."
      );
    });
  
    test("throws an error when help requests per page is more than 10", async () => {
      const helpReqPerPage = 11;
  
      await expect(calculateNumberOfPagesForHelpReq(helpReqPerPage)).rejects.toThrow(
        "The number of help requests per page must be between 1 and 10."
      );
    });
  });
  