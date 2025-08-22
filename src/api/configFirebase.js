// src/api/configFirebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
  authDomain: "loginpymesya.firebaseapp.com",
  projectId: "loginpymesya",
  storageBucket: "loginpymesya.appspot.com",
  messagingSenderId: "1073503569961",
  appId: "1:1073503569961:web:10e9096363a62dfa447438",
  measurementId: "G-5159Y4G9ZQ",
};

// ⚠️ Esto evita que Firebase se inicialice en tests
const isTestEnv = process.env.JEST_WORKER_ID !== undefined;

let app, auth, db, storage;

if (!isTestEnv) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

export { auth, db, storage };
