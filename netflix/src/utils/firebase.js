// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxF37UVM2pw3m4pFZD8lrNR197IejB0QQ",
  authDomain: "netflixgpt-d9838.firebaseapp.com",
  projectId: "netflixgpt-d9838",
  storageBucket: "netflixgpt-d9838.firebasestorage.app",
  messagingSenderId: "567728832151",
  appId: "1:567728832151:web:3b296390ec81ce08eb33d2",
  measurementId: "G-52N3GN4J8N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();