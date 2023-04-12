import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getDatabase } from '@firebase/database';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCzmJPILq2HHlw8kWNgHKyzP8xMIg2da7Y",
    authDomain: "chat-b02ca.firebaseapp.com",
    projectId: "chat-b02ca",
    storageBucket: "chat-b02ca.appspot.com",
    messagingSenderId: "1051343406526",
    appId: "1:1051343406526:web:eaeddfe91ef8399c92a5ef",
    measurementId: "G-718BL84QZN",
    databaseURL: "https://chat-b02ca-default-rtdb.firebaseio.com",
    storageBucket: "chat-b02ca.appspot.com"
};
  
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const realtimeDB = getDatabase(app);
export const storage = getStorage(app);
