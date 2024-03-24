// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH98Tr6l2LohVEpYUlG2LmOq_oGyg4QP4",
  authDomain: "netflix-gpt-1b3b5.firebaseapp.com",
  projectId: "netflix-gpt-1b3b5",
  storageBucket: "netflix-gpt-1b3b5.appspot.com",
  messagingSenderId: "397878504321",
  appId: "1:397878504321:web:1d4545ff5672528f5d1680"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();