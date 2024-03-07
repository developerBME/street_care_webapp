const admin = require("firebase-admin");
const serviceAccount = require("D:\\BME\\imp credentials\\streetcare-d0f33-firebase-adminsdk-idx6g-df77bbe6ac.json");

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const fs = require("fs");

// Function to create and commit a batch
async function commitBatch(batch) {
  try {
    await batch.commit();
    console.log("Batch committed successfully.");
  } catch (error) {
    console.error("Error committing batch:", error);
  }
}

async function uploadData(jsonData) {
  // Split data into chunks and upload
  const chunkSize = 50;
  for (let i = 0; i < jsonData.length; i += chunkSize) {
    const chunk = jsonData.slice(i, i + chunkSize);
    const batch = db.batch();

    chunk.forEach((record) => {
      let firestoreRecord = {
        whatGiven: [],
        optional: {},
        location: { city: "NA", state: "NA", street: "NA", zipcode: "NA" },
      };
      Object.keys(record).forEach((key) => {
        switch (key) {
          case "uid":
            firestoreRecord["uid"] = record["uid"];
            break;
          case "numberOfHelpers":
          case "peopleHelped":
            if (firestoreRecord["numberPeopleHelped"]) {
              if (record[key] != "-5") {
                firestoreRecord["numberPeopleHelped"] =
                  parseInt(firestoreRecord["numberPeopleHelped"]) +
                  parseInt(record[key]);
              }
            }
            break;
          case "clothes":
            if (record["clothes"] == "Y" || record["clothes"] == true) {
              firestoreRecord["whatGiven"].push("Clothing");
            }
            break;
          case "foodAndDrinks":
            if (record["foodAndDrinks"]) {
              firestoreRecord["whatGiven"].push("Food and Drink");
            }
            break;
          case "food_drink":
            if (record["food_drink"] || record["food_drink"] == "Y") {
              firestoreRecord["whatGiven"].push("Food and Drink");
            }
            break;
          case "wellness":
            if (
              record["wellness"] == "Y" ||
              record["wellness"] ||
              record["wellness"] == "Wellness/Emotional Support"
            ) {
              firestoreRecord["whatGiven"].push("Wellness");
            }
            break;
          case "hygine":
            if (record["hygine"] == "Y" || record["hygine"]) {
              firestoreRecord["whatGiven"].push("Hygine");
            }
            break;
          case "rating":
            firestoreRecord["rating"] = record["rating"];
            break;
          case "visitAgain":
            firestoreRecord["optional"]["visitAgain"] = record["visitAgain"];
            break;
          case "comments":
            firestoreRecord["optional"]["comments"] = record["comments"];
            break;
          case "other":
            if (record["other"] == "Y" || record["other"]) {
              firestoreRecord["whatGiven"].push("other");
            }
            break;
          case "whereVisit":
            if (record["whereVisit"] != "") {
              firestoreRecord["location"]["city"] = record["whereVisit"];
            }
            break;
          case "share":
            firestoreRecord["share"] = record["share"];
            break;
          case "whenVisit":
            firestoreRecord["time"] = record["whenVisit"];
            break;
          case "timestamp":
            firestoreRecord["timestamp/dateCreated"] = record["timestamp"];
            break;
          // case "volunteerAgain":
          //   firestoreRecord["optional"]["comments"] = record["comments"];
          //   break;
        }
      });
      const docRef = db.collection("interimPersonalVisitLog").doc(); // Automatically generate a new document ID
      batch.set(docRef, firestoreRecord);
    });

    await commitBatch(batch);
  }
  console.log("All data uploaded.");
}

// uploadData().catch(console.error);

//   return admin.firestore.Timestamp.fromDate(newDate);

async function getAttributes(collectionName, exclusionArr = [], writeFileBool) {
  const eventsRef = db.collection(collectionName);
  const snapshot = await eventsRef.get();
  let dataArr = [];
  let attributes = {};

  snapshot.forEach(async (doc) => {
    const docData = doc.data();
    Object.keys(docData).forEach((key) => {
      if (exclusionArr.findIndex((ele) => ele == key) == -1) {
        if (key in attributes) {
          if (docData[key] in attributes[key]) {
            attributes[key][docData[key]] = attributes[key][docData[key]] + 1;
          } else {
            attributes[key][docData[key]] = 1;
          }
        } else {
          attributes[key] = {};
        }
      }
    });
    dataArr.push(docData);
  });
  // const stringedJSON = JSON.stringify(attributes);
  if (writeFileBool) {
    fs.writeFile(
      "attributes_" + collectionName + ".json",
      attributes,
      (error) => {
        if (error) {
          console.error(error);

          throw error;
        }

        console.log("attributes_" + collectionName + ".json written correctly");
      }
    );
  }
}

async function getDocuments(collectionName) {
  const eventsRef = db.collection(collectionName);
  const snapshot = await eventsRef.get();
  let dataArr = [];

  snapshot.forEach(async (doc) => {
    const docData = doc.data();
    dataArr.push(docData);
  });
  console.log(dataArr.length);
  uploadData(dataArr);

  // const stringedJSON = JSON.stringify(attributes);

  // console.log(attributes);

  ////
  //   snapshot.forEach(async (doc) => {
  //     const docData = doc.data();
  //     let updateData = {};

  //     // Conditionally update the description
  //     if (docData.title === "Maryland Street Care" && docData.description) {
  //       updateData.description =
  //         "Giving supplies and providing interpersonal support #SocialWork";
  //     }

  //     // Perform the update if there's something to update
  //     if (Object.keys(updateData).length > 0) {
  //       await eventsRef.doc(doc.id).update(updateData);
  //     }
  //   });
}

/*
///Ignore Array for VisitLogBook
[
  "whenVisit",
  "uid",
  "timestamp",
  "latitude",
  "longitude",
  "followUpWhenVisit",
]
*/
getDocuments("VisitLogBook").catch(console.error);
