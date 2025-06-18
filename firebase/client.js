"use client";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBtW8K8ufQjSFu0XI96PxRDUAOVt9dn0Cc",
  authDomain: "rctb-dcc3b.firebaseapp.com",
  projectId: "rctb-dcc3b",
  storageBucket: "gs://rctb-dcc3b.firebasestorage.app",
  messagingSenderId: "691767629098",
  appId: "1:691767629098:web:a0a3499e727c2de902ba53",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
