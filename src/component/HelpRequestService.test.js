import { fetchOutreaches } from "./HelpRequestService";
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
