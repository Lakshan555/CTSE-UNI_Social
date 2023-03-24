// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvuSTfNqregJWyt22xjSt35kyFI0Wi10I",
  authDomain: "ctse-uni-social.firebaseapp.com",
  projectId: "ctse-uni-social",
  storageBucket: "gs://ctse-uni-social.appspot.com",
  messagingSenderId: "399817958681",
  appId: "1:399817958681:web:7a915ceb64eb7a6045d188",
  measurementId: "G-LTZ1G75TEH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);