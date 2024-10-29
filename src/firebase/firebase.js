import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fitness-by-faith.firebaseapp.com",
  projectId: "fitness-by-faith",
  storageBucket: "fitness-by-faith.appspot.com",
  messagingSenderId: "722320063281",
  appId: "1:722320063281:web:7e892733683d350e244e10",
  measurementId: "G-4X524F6HQW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

  
