
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC4gF22miAURY9fJZBVEC52W5ZFO0PDNe4",
  authDomain: "still-547e2.firebaseapp.com",
  projectId: "still-547e2",
  storageBucket: "still-547e2.firebasestorage.app",
  messagingSenderId: "31399277859",
  appId: "1:31399277859:web:4527cc94a473d0d6490896",
  measurementId: "G-4RX29ZD6Y3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
