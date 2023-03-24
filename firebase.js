import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Firebase app configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYOnuCfDz2f-JNczyqD4-4zgWC7yyc604",
  authDomain: "socialapp-d9600.firebaseapp.com",
  projectId: "socialapp-d9600",
  storageBucket: "socialapp-d9600.appspot.com",
  messagingSenderId: "621042950926",
  appId: "1:621042950926:web:01f65bd282300ffc7ced5f",
  measurementId: "G-S89S21THHF"
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
