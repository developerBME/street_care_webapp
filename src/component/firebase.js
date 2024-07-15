// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "BIzaSyCTQrVQKGfscSHnz-NAxsJh3pkeDKW-HCo",
//   authDomain: "streetcare-d0f33.firebaseapp.com",
//   databaseURL: "https://streetcare-d0f33.firebaseio.com",
//   projectId: "streetcare-d0f33",
//   storageBucket: "streetcare-d0f33.appspot.com",
//   messagingSenderId: "223295299587",
//   appId: "1:223295299587:web:10443d950f835b3da5ee36",
//   measurementId: "G-D4CXKEDEQ6",
// };
console.log('Firebase API Key:', process.env.REACT_APP_FIREBASE_API_KEY);
console.log("Auth Domain: ",process.env.REACT_APP_FIREBASE_AUTH_DOMAIN)
console.log("DB URL: ",process.env.REACT_APP_FIREBASE_DATABASE_URL)
console.log("Project ID: ",process.env.REACT_APP_FIREBASE_PROJECT_ID)
console.log("Storage Bucket: ",process.env.REACT_APP_FIREBASE_STORAGE_BUCKET)
console.log("Message Id: ",process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID)
console.log("App Id: ",process.env.REACT_APP_FIREBASE_APP_ID)
console.log("Mesurement Id: ",process.env.REACT_APP_FIREBASE_MEASUREMENT_ID)

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
