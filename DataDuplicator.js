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

async function main() {
  const choice = prompt('Do you want to (1) duplicate documents or (2) change document titles? Enter 1 or 2: ');

  if (choice === '1') {
    await duplicateDocuments();
  } else if (choice === '2') {
    await changeDocumentTitles();
  } else {
    console.log('Invalid choice. Please enter 1 or 2.');
  }
}

main().catch(console.error);
