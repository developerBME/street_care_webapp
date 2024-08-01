/** PLEASE READ BELOW BEFORE YOU RUN THIS SCRIPT
 * This script provides an interactive way for the user to duplicate documents
 * in the pastOutreachEvents collection in Firebase Firestore. The user
 * is prompted to choose between two actions:
 *
 * The source and destination collection can be changed in lines 50, and 51 respectively.
 *
 *
 * 1. Duplicate Documents:
 *    - The script fetches the latest 20 documents from the pastOutreachEvents collection.
 *    - These documents are then duplicated into the pastOutreachEventsTest collection,
 *      maintaining the same document IDs.
 *
 * 2. Duplicate Documents with Default Values:
 *    - The script fetches the latest 20 documents from the pastOutreachEvents collection.
 *    - These documents are then duplicated into the pastOutreachEventsTest collection,
 *      maintaining the same document IDs and adding any missing fields and subfields
 *      with default values.
 *
 * How to Use the Script:
 *
 * 1. Install Required Packages:
 *    - Install Firebase Admin SDK and prompt-sync:
 *      npm install firebase-admin prompt-sync
 *
 * 2. Run the Script:
 *    - Execute the script using Node.js:
 *      node duplicateDocuments.js
 *
 * 3. Interactive Prompts:
 *    - The script will prompt the user to choose an action:
 *      - Enter 1 to duplicate documents.
 *      - Enter 2 to duplicate documents with default values.
 *    - Follow the prompts to either duplicate the latest 20 documents, or duplicate documents
 *      with default values.
 */

const admin = require('firebase-admin');
const path = require('path');
const prompt = require('prompt-sync')({ sigint: true });
const serviceAccountPath = path.join(__dirname, 'streetcare-d0f33-firebase-adminsdk-idx6g-a496bb699e.json');
admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
  databaseURL: "https://streetcare-d0f33.firebaseio.com"
});

const db = admin.firestore();

async function duplicateDocuments() {
  const sourceCollection = 'pastOutreachEvents';
  const destinationCollection = 'pastOutreachEventsTest';

  try {
    const snapshot = await db.collection(sourceCollection)
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }
    const batch = db.batch();
    snapshot.forEach(doc => {
      const docData = doc.data();
      const docId = doc.id;
      const newDocRef = db.collection(destinationCollection).doc(docId);
      batch.set(newDocRef, docData);
    });

    await batch.commit();
    console.log('Documents duplicated successfully.');
  } catch (error) {
    console.error('Error duplicating documents:', error);
  }
}

async function duplicateDocumentsWithDefaults() {
  const sourceCollection = 'pastOutreachEvents';
  const destinationCollection = 'pastOutreachEventsTest';

  // Default values for all the existing fields
  const defaultValues = {
    approved: "Approved",
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    description: "Default Description",
    eventDate: admin.firestore.Timestamp.fromDate(new Date()),
    eventEndTime: admin.firestore.Timestamp.fromDate(new Date()),
    eventStartTime: admin.firestore.Timestamp.fromDate(new Date()),
    helpType: "Default Help Type",
    interests: 0,
    location: {
      city: "Default City",
      state: "Default State",
      street: "Default Street",
      zipcode: "00000"
    },
    participants: ["defaultParticipant"],
    skills: ["Default Skill"],
    title: "Default Title",
    totalSlots: 0,
    uid: "defaultUID"
  };

  function addDefaults(docData, defaults) {
    for (const [key, value] of Object.entries(defaults)) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        if (!docData[key]) {
          docData[key] = value;
        } else {
          addDefaults(docData[key], value);
        }
      } else if (!docData.hasOwnProperty(key)) {
        docData[key] = value;
      }
    }
  }

  try {
    const snapshot = await db.collection(sourceCollection)
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }
    const batch = db.batch();
    snapshot.forEach(doc => {
      let docData = doc.data();
      const docId = doc.id;
      if (Object.keys(docData).length === 0) {
        docData = { ...defaultValues };
      } else {
        addDefaults(docData, defaultValues);
      }
      const newDocRef = db.collection(destinationCollection).doc(docId);
      batch.set(newDocRef, docData);
    });
    await batch.commit();
    console.log('Documents duplicated with default values successfully.');
  } catch (error) {
    console.error('Error duplicating documents with default values:', error);
  }
}

async function main() {
  const choice = prompt('Do you want to (1) duplicate documents, or (2) duplicate documents with default values? Enter 1 or 2: ');

  if (choice === '1') {
    await duplicateDocuments();
  } else if (choice === '2') {
    await duplicateDocumentsWithDefaults();
  } else {
    console.log('Invalid choice. Please enter 1 or 2.');
  }
}

main().catch(console.error);
