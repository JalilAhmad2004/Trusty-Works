// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVnI2OZmAzi_XZt3M_Hjm9UnJJRx_oZFc",
  authDomain: "trusty-works.firebaseapp.com",
  projectId: "trusty-works",
  storageBucket: "trusty-works.firebasestorage.app",
  messagingSenderId: "993436578793",
  appId: "1:993436578793:web:5f0337816636aed0f6d178",
  measurementId: "G-T9XEE5DJGS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);