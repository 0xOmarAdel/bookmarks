import { apiKey } from "./apiKey";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "bookmarks-react-firebase.firebaseapp.com",
  projectId: "bookmarks-react-firebase",
  storageBucket: "bookmarks-react-firebase.appspot.com",
  messagingSenderId: "631184849852",
  appId: "1:631184849852:web:0974b4b0f8f7d1743c09b9",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
