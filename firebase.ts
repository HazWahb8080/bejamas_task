// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq7vF8krEb_onBY5ZROCL9E7r-XAmnrzQ",
  authDomain: "bejamas-task-a7efc.firebaseapp.com",
  projectId: "bejamas-task-a7efc",
  storageBucket: "bejamas-task-a7efc.appspot.com",
  messagingSenderId: "850166383976",
  appId: "1:850166383976:web:961c3f354ba92105e742dd",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
