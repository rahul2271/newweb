import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxE13Vwai9hks3qQfb_vZUhf4zy5ASREw",
  authDomain: "rc-tech-solutions.firebaseapp.com",
  projectId: "rc-tech-solutions",
  storageBucket: "rc-tech-solutions.appspot.com",
  messagingSenderId: "603377967793",
  appId: "1:603377967793:web:b8e12ca76ebb09865f7890",
  measurementId: "G-2BSDMH76D1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
