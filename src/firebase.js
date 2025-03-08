// Import necessary Firebase services
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // For authentication
import { getFirestore } from 'firebase/firestore'; // If you want Firestore later

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "your doamin",
  projectId: "your project id",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app); // If you plan to use Firestore for data storage

// Export auth object to use in other files
export { auth, db };
