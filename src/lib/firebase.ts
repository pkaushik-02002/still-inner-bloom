
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC4gF22miAURY9fJZBVEC52W5ZFO0PDNe4",
  authDomain: "still-547e2.firebaseapp.com",
  projectId: "still-547e2",
  storageBucket: "still-547e2.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "31399277859",
  appId: "1:31399277859:web:4527cc94a473d0d6490896",
  measurementId: "G-4RX29ZD6Y3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Only initialize analytics in production
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Check if we're in development mode for emulator connection
if (import.meta.env.DEV) {
  // Uncomment these if you're using Firebase emulators
  // connectAuthEmulator(auth, 'http://localhost:9099');
  // connectFirestoreEmulator(db, 'localhost', 8080);
  // connectStorageEmulator(storage, 'localhost', 9199);
}

export { app, analytics, auth, db, storage };
