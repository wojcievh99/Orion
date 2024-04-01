// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAT0ln4PsdqQQ_kdZZWiTRuF7VsVaeNfLA",
  authDomain: "orion-6352e.firebaseapp.com",
  projectId: "orion-6352e",
  storageBucket: "orion-6352e.appspot.com",
  messagingSenderId: "739582674828",
  appId: "1:739582674828:web:322dbc63c00af37c9078a9",
  measurementId: "G-4GFVKLCM62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const database = getFirestore();
