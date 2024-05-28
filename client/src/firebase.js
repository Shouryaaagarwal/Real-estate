// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
  authDomain: "real-estate-8c6c0.firebaseapp.com",
  projectId: "real-estate-8c6c0",
  storageBucket: "real-estate-8c6c0.appspot.com",
  messagingSenderId: "1065567191701",
  appId: "1:1065567191701:web:a5ca236a3cfa4e7ab9d19c"
};

// Initialize Firebase
export const  app = initializeApp(firebaseConfig);