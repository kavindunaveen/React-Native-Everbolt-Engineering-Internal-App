import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaRM6zGaM63AismHb1Mhu0fDCV6w-0XHI",
  authDomain: "newever-81648.firebaseapp.com",
  projectId: "newever-81648",
  storageBucket: "newever-81648.appspot.com",
  messagingSenderId: "706642310030",
  appId: "1:706642310030:web:d1530803b1bc32f4f9aadf"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
