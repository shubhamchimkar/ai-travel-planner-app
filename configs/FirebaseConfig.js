// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPOpH9b2CSpt76c1-C1kel0jVABDBQMDc",
  authDomain: "ai-travel-ea515.firebaseapp.com",
  projectId: "ai-travel-ea515",
  storageBucket: "ai-travel-ea515.firebasestorage.app",
  messagingSenderId: "586033123467",
  appId: "1:586033123467:web:dcc78dfbe39acaaca1048e",
  measurementId: "G-8N3BF5XPE3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);