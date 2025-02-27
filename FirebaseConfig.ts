import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaRM6zGaM63AismHb1Mhu0fDCV6w-0XHI",
  authDomain: "newever-81648.firebaseapp.com",
  databaseURL: "https://newever-81648-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "newever-81648",
  storageBucket: "newever-81648.appspot.com",
  messagingSenderId: "706642310030",
  appId: "1:706642310030:web:d1530803b1bc32f4f9aadf"
};

// Initialize Firebase App
const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firebase Realtime Database
const FIREBASE_DB = getDatabase(FIREBASE_APP);

export { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB };
