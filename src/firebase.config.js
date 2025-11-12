// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdmCYyv8bgClZHKMpopxFkdF2V0N7Kh30",
  authDomain: "assignment-10-4dc63.firebaseapp.com",
  projectId: "assignment-10-4dc63",
  storageBucket: "assignment-10-4dc63.firebasestorage.app",
  messagingSenderId: "832516676219",
  appId: "1:832516676219:web:15ad934f55838c709b20de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
