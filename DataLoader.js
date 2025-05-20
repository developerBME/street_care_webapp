

const admin = require('firebase-admin');
const serviceAccount = require('/Users/shail/Downloads/streetcare.json');

const XLSX = require('xlsx');
// Firebase configuration
const firebaseConfig = {
  // Your Firebase configuration
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  databaseURL: REACT_APP_DATABASE_URL,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
  measurementId: REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
const db = admin.firestore();

// // Read Excel file
// const workbook = XLSX.readFile('/Users/shail/Downloads/PastEvents.xlsx');
// const sheetName = workbook.SheetNames[0];
// const worksheet = workbook.Sheets[sheetName];
// const jsonData = XLSX.utils.sheet_to_json(worksheet, { range: 2 });

// // Function to create and commit a batch
// async function commitBatch(batch) {
//   try {
//     await batch.commit();
//     console.log('Batch committed successfully.');
//   } catch (error) {
//     console.error('Error committing batch:', error);
//   }
// }

// const excelSerialDateToJSDate = (serial) => {
//     const excelBaseDate = new Date(1900, 0, 1);
//     const days = serial - 2; // Excel incorrectly treats 1900 as a leap year
//     return new Date(excelBaseDate.getTime() + days * 86400000);
// };


// async function uploadData() {

//     // Split data into chunks and upload
//     const chunkSize = 500;
//     for (let i = 0; i < jsonData.length; i += chunkSize) {
//         const chunk = jsonData.slice(i, i + chunkSize);
//         const batch = db.batch();

//         chunk.forEach((record) => {
//             const participantCount = parseInt(record['No. of Beneficieries'], 10);
//             //console.log(record);
//             const participants = Array(participantCount).fill('tDUMYnQuFKfebYv4BPW5fbIn9RC3');
//             const eventDate = admin.firestore.Timestamp.fromDate(excelSerialDateToJSDate(record['Event Date']));
//             const firestoreRecord = {
//                 date: eventDate,
//                 description: 'Giving supplies and providing interpersonal support',
//                 interest: participantCount,
//                 location: record['Event City'] || '',
//                 status: 'Approved',
//                 title: record['Attended Event Name'] || ''
//             };
//             const docRef = db.collection('events').doc(); // Automatically generate a new document ID
//             batch.set(docRef, firestoreRecord);
//         });

//         await commitBatch(batch);
//     }
//     console.log('All data uploaded.');
// }

// uploadData().catch(console.error);


// Function to generate a random time between 12:15 PM to 5:00 PM
function getRandomTime(existingDate) {
  const startHour = 12; // 12 PM
  const endHour = 17;   // 5 PM
  const startMinutes = 15; // 15 minutes past the hour

  // Calculate random hour and minutes
  const randomHour = Math.floor(Math.random() * (endHour - startHour)) + startHour;
  const randomMinutesIndex = Math.floor(Math.random() * 4); // 0 to 3
  const randomMinutes = startMinutes + (randomMinutesIndex * 15); // 15, 30, 45, or 00

  // Update the existing date with the new time
  const newDate = new Date(existingDate);
  newDate.setHours(randomHour, randomMinutes, 0); // Set hours, minutes, seconds

  return admin.firestore.Timestamp.fromDate(newDate);
}

async function updateEventDates() {
  const eventsRef = db.collection(process.env.REACT_APP_EVENTS_COLLECTION);
  const snapshot = await eventsRef.get();

  snapshot.forEach(async (doc) => {
      const docData = doc.data();
      let updateData = {};

      // Conditionally update the description
      if (docData.title === 'Maryland Street Care' && docData.description) {
          updateData.description = 'Giving supplies and providing interpersonal support #SocialWork';
      }

      // Perform the update if there's something to update
      if (Object.keys(updateData).length > 0) {
          await eventsRef.doc(doc.id).update(updateData);
      }
  });

  console.log('All relevant event dates and descriptions updated.');
}


updateEventDates().catch(console.error);
