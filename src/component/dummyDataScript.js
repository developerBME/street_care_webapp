import React from "react";
import { getFirestore, collection, doc, writeBatch } from "firebase/firestore";
import { db } from "./firebase";
import collectionMapping from "../utils/firestoreCollections";

const visitLogsNew_collection = collectionMapping.visitLogsBookNew;

// --- Dummy Data Function ---
async function createDummyVisitLogs(numOfDummyDatas) {
  const cities = ["New York", "Austin", "Newark"];
  const batch = writeBatch(db);

  for (let i = 0; i < numOfDummyDatas; i++) {
    const city = cities[i % cities.length]; // cycle equally

    const dummyData = {
      name: "Nishank",
      description: "RemoveFlag",
      timeStamp: new Date(),
      city: city,

      // schema defaults
      flaggedByUser: null,
      followUpWhenVisit: "",
      futureNotes: "",
      isFlagged: false,
      isPublic: true,
      itemQty: "2",
      numberOfHelpers: "5",
      peopleHelpedDescription: "DummyData Flagged for Deletion.",
      peopleNeedFurtherHelpComment: "",
      peopleNeedFurtherHelpLocation: "",
      rating: 0,
      state: "DummyState",
      stateAbbv: "DS",
      status: "approved",
      street: "Dummy Street",
      uid: "dummyUID",
      whatGiven: [
        "Food and Drink",
        "Hygiene Products",
        "Wellness/ Emotional Support",
      ],
      whatGivenFurther: "",
      whenVisit: "",
      wherevisit: `${city}, DummyState`,
      zipcode: "00000",
      isDummy: true, // marker for cleanup
    };

    const ref = doc(collection(db, visitLogsNew_collection));
    batch.set(ref, dummyData);
  }

  await batch.commit();
  alert(`${numOfDummyDatas} dummy visit logs created successfully!`);
}

// --- React Component ---
const DummyDataButton = () => {
  const handleClick = async () => {
    try {
      await createDummyVisitLogs(100); // pass desired number
    } catch (err) {
      console.error("Error creating dummy data:", err);
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Create Dummy Data
    </button>
  );
};

export default DummyDataButton;
