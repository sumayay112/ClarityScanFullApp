import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // 

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


export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); e