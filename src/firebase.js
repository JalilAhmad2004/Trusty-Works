// Import necessary Firebase services
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // For authentication
import { getFirestore } from 'firebase/firestore'; // If you want Firestore later

// Your Firebase configuration
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

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app); // If you plan to use Firestore for data storage

// Export auth object to use in other files
export { auth, db };
