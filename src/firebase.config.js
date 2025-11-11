// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4DnEi00A7SheB8geXXRda-bho0bFOTDw",
  authDomain: "chaplin-a18f8.firebaseapp.com",
  projectId: "chaplin-a18f8",
  storageBucket: "chaplin-a18f8.firebasestorage.app",
  messagingSenderId: "294559222799",
  appId: "1:294559222799:web:8e39f8f8bbc5149589677a",
  measurementId: "G-P2ETFB4JKE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)