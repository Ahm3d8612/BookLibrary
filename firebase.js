// Import Firebase core and database
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Paste your Firebase config here 👇
const firebaseConfig = {
    apiKey: "AIzaSyAxN23nYxLPZIpfRGPSeCyn98sxhYLbD38",
    authDomain: "booklibrary-3a55a.firebaseapp.com",
    databaseURL: "https://booklibrary-3a55a-default-rtdb.firebaseio.com",
    projectId: "booklibrary-3a55a",
    storageBucket: "booklibrary-3a55a.firebasestorage.app",
    messagingSenderId: "83532095174",
    appId: "1:83532095174:web:ffba715c4f0dc7103141c7"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Realtime Database instance
const db = getDatabase(app);

export { db };
