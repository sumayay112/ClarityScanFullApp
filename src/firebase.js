import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Added this
import { getFirestore } from "firebase/firestore"; // Added this

const firebaseConfig = {
  apiKey: "AIzaSyCdsCDkYwrhqJT7dd1vUgufwjMBgJ9fAgo",
  authDomain: "clarityscan-a6ccf.firebaseapp.com",
  projectId: "clarityscan-a6ccf",
  storageBucket: "clarityscan-a6ccf.firebasestorage.app",
  messagingSenderId: "916331343818",
  appId: "1:916331343818:web:cc10452b9e3face6b8a933",
  measurementId: "G-R4EZ3QE75R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// EXPORT these so they can be used in your other files
export const auth = getAuth(app);
export const db = getFirestore(app);