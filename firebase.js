
// Import the necessary functions from the Firebase SDK
// Using the modular SDK allows for a smaller bundle size.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// --- IMPORTANT ---
// Replace this with your web app's Firebase configuration
// You can find this in your Firebase project settings.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize the Firebase app with your project's configuration
const app = initializeApp(firebaseConfig);

// Get a Firestore instance and export it for use in other parts of the app
// This allows us to interact with the Firestore database.
export const db = getFirestore(app);
