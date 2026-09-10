import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// User Provided Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6bEtbRlYcKqUNL1YYcwkrUz2EtvxuMEQ",
  authDomain: "javed-organic-store.firebaseapp.com",
  projectId: "javed-organic-store",
  storageBucket: "javed-organic-store.firebasestorage.app",
  messagingSenderId: "196567191603",
  appId: "1:196567191603:web:25b6e163db20dde9dc1346",
  measurementId: "G-9GB3QE45RP"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
export const db = getFirestore(app);

// Safe Analytics Initialization
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((err) => {
    console.warn("Firebase Analytics not supported in this environment:", err);
  });
}

export { analytics };
export default app;
