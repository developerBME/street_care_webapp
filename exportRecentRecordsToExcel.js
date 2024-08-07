/**
 * This script pulls recent records based on the DateOfSignature field from
 * the BMEMembershipForm collection in Firebase Firestore and exports them to an Excel file.
 *
 * How to Use the Script:
 *
 * 1. Install Required Packages:
 *    - Install Firebase Admin SDK and xlsx:
 *      npm install firebase-admin xlsx
 *
 * 2. Run the Script:
 *    - Execute the script using Node.js:
 *      node exportRecentRecordsToExcel.js
 */

const admin = require('firebase-admin');
const path = require('path');
const xlsx = require('xlsx');
const serviceAccountPath = path.join(__dirname, 'streetcare-d0f33-firebase-adminsdk-idx6g-a496bb699e.json');
admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
  databaseURL: "https://streetcare-d0f33.firebaseio.com"
});

const db = admin.firestore();

async function exportRecentRecordsToExcel() {
  const collectionName = 'BMEMembershipForm';
  const numberOfRecords = 5; // Number of recent records to pull

  try {
    // Query the collection, ordering by DateOfSignature in descending order and limiting the results
    const snapshot = await db.collection(collectionName)
      .orderBy('DateOfSignature', 'desc')
      .limit(numberOfRecords)
      .get();

    if (snapshot.empty) {
      console.log('No matching documents found.');
      return;
    }
    const records = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      records.push({
        id: doc.id,
        ...data
      });
    });

    // Create a new workbook and add the data
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(records);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Recent Records');
    const filePath = path.join(__dirname, 'recent_records.xlsx');
    xlsx.writeFile(workbook, filePath);

    console.log('Excel file created successfully:', filePath);
  } catch (error) {
    console.error('Error exporting records to Excel:', error);
  }
}

exportRecentRecordsToExcel().catch(console.error);
