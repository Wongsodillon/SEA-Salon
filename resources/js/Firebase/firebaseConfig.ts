// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDFu6fZFCBeT6SHgA3kS09trKHYchY-8zE",
  authDomain: "sea-salon-b685e.firebaseapp.com",
  projectId: "sea-salon-b685e",
  storageBucket: "sea-salon-b685e.appspot.com",
  messagingSenderId: "299888084176",
  appId: "1:299888084176:web:56171a4e95dcfd5c8a8ad5",
  measurementId: "G-QT3H55QPSZ"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
