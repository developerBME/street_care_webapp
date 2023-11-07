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
const firebaseConfig = {
  apiKey: "AIzaSyCTQrVQKGfscSHnz-NAxsJh3pkeDKW-HCo",
  authDomain: "streetcare-d0f33.firebaseapp.com",
  databaseURL: "https://streetcare-d0f33.firebaseio.com",
  projectId: "streetcare-d0f33",
  storageBucket: "streetcare-d0f33.appspot.com",
  messagingSenderId: "223295299587",
  appId: "1:223295299587:web:10443d950f835b3da5ee36",
  measurementId: "G-D4CXKEDEQ6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
