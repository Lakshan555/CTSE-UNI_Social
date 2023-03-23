import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Firebase app configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe1wlKciXGWTWyBaLUYu39qEgkdPlq7eA",
  authDomain: "unisocialapp-e3389.firebaseapp.com",
  projectId: "unisocialapp-e3389",
  storageBucket: "unisocialapp-e3389.appspot.com",
  messagingSenderId: "1039820270186",
  appId: "1:1039820270186:web:37cbb34c867b698394f813",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// Create a Firestore instance
const database = firebase.firestore();
// Create an authentication instance
const auth = firebase.auth();

// const database = getFirestore(app);

export { auth, database };
