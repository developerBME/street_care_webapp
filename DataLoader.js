

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
