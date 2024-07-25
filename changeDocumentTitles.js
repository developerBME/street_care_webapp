/** PLEASE READ BELOW BEFORE YOU RUN THIS SCRIPT
 * This script provides an interactive way for the user to change document titles
 * in the pastOutreachEventsTest collection in Firebase Firestore. The user
 * is prompted to enter the current title of documents they want to update and
 * a new title to replace it.
 *
 * How to Use the Script:
 *
 * 1. Install Required Packages:
 *    - Install Firebase Admin SDK and prompt-sync:
 *      npm install firebase-admin prompt-sync
 *
 * 2. Run the Script:
 *    - Execute the script using Node.js:
 *      node changeDocumentTitles.js
 *
 * 3. Interactive Prompts:
 *    - The script will prompt the user to enter the current title and the new title.
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

async function changeDocumentTitles() {
  const collection = 'pastOutreachEventsTest';

  try {
    const currentTitle = prompt('Enter the current title of the documents to update: ');
    const snapshot = await db.collection(collection)
      .where('title', '==', currentTitle)
      .get();
    if (snapshot.empty) {
      console.log(`No documents found with the title "${currentTitle}".`);
      return;
    }
    const newTitle = prompt('Enter the new title for the documents: ');
    const batch = db.batch();
    snapshot.forEach(doc => {
      const docData = doc.data();
      const docRef = db.collection(collection).doc(doc.id);
      docData.title = newTitle; // Update the title field
      batch.set(docRef, docData);
    });
    await batch.commit();
    console.log('Document titles updated successfully.');
  } catch (error) {
    console.error('Error updating document titles:', error);
  }
}

changeDocumentTitles().catch(console.error);
