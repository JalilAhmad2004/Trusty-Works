// Import Firebase modules from the installed Firebase NPM package
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import Cookies from 'js-cookie'; // To manage cookies

// Firebase configuration
const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "your domain",
  projectId: "your project id",
  storageBucket: "",
  messagingSenderId: "",
  appId: "1:",
  measurementId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Cookie management functions
export function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; samesite=strict; secure`;
}

export const getCookie = (name) => Cookies.get(name);

// User authentication functions
export const signUp = async (email, password) => {
  try {
    const userCredential = await firebaseCreateUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      email,
      purchasedServices: [],
    });

    alert("Signup successful! You can now log in.");
  } catch (error) {
    console.error("Error during signup:", error);
    alert(`Signup failed: ${error.message}`);
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await firebaseSignInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Retrieve user data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      // Set user ID in a cookie
      setCookie("userId", user.uid, 7);
      return { user: userDoc.data(), error: null };
    } else {
      alert("User data not found! Contact support.");
      return { user: null, error: "User data not found!" };
    }
  } catch (error) {
    console.error("Error during login:", error);
    return { user: null, error: error.message };
  }
};

export const getCurrentUserFromCookie = async () => {
  const userId = getCookie("userId");
  if (userId) {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        return { user: userDoc.data(), error: null };
      } else {
        return { user: null, error: "User data not found in Firestore!" };
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
      return { user: null, error: error.message };
    }
  } else {
    return { user: null, error: "No userId cookie found" };
  }
};

// Service management functions
export const addServiceToBackend = async (service) => {
  try {
    const servicesRef = doc(db, "services", "servicesList");
    const servicesDoc = await getDoc(servicesRef);

    if (servicesDoc.exists()) {
      await updateDoc(servicesRef, {
        services: arrayUnion(service),
      });
    } else {
      await setDoc(servicesRef, { services: [service] });
    }

    return { success: true, error: null };
  } catch (error) {
    console.error("Error adding service to backend:", error);
    return { success: false, error: error.message };
  }
};

export const getServicesFromBackend = async () => {
  try {
    const servicesRef = doc(db, "services", "servicesList");
    const servicesDoc = await getDoc(servicesRef);

    if (servicesDoc.exists()) {
      return { services: servicesDoc.data().services || [], error: null };
    } else {
      return { services: [], error: "No services found" };
    }
  } catch (error) {
    console.error("Error fetching services from backend:", error);
    return { services: [], error: error.message };
  }
};

// Purchased services management
export const updatePurchasedServices = async (userId, service) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      await updateDoc(userRef, {
        purchasedServices: arrayUnion(service),
      });
      return { success: true, error: null };
    } else {
      return { success: false, error: "User not found" };
    }
  } catch (error) {
    console.error("Error updating purchased services:", error);
    return { success: false, error: error.message };
  }
};

// Initialize purchased services for a user
export const initializePurchasedServices = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, { purchasedServices: [] }, { merge: true });
    }
  } catch (error) {
    console.error("Error initializing purchased services:", error);
  }
};

// Export Firebase services and methods
export {
  auth,
  db,
  firebaseCreateUserWithEmailAndPassword,
  firebaseSignInWithEmailAndPassword,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
};
