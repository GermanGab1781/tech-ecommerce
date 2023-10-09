import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {

  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,

  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,

  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,

  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,

  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,

  appId: process.env.REACT_APP_FIREBASE_APPID,

  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);