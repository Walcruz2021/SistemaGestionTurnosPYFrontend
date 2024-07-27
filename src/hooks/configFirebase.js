// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import {getAnalytics}  from "@firebase/analytics";
import {getAuth} from "@firebase/auth";


import '@firebase/auth';

//dotenv.config({ path: path.resolve(__dirname, '../.env') });
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

console.log(process.env.REACT_APP_API_KEY_FIREBASE)
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
  authDomain: "loginpymesya.firebaseapp.com",
  projectId: "loginpymesya",
  storageBucket: "loginpymesya.appspot.com",
  messagingSenderId: "1073503569961",
  appId: "1:1073503569961:web:10e9096363a62dfa447438",
  measurementId: "G-5159Y4G9ZQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)

const analytics = getAnalytics(app);