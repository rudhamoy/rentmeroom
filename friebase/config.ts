// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACW-zH0STmcbYogp7lTnI82ce1Y1xR4CY",
  authDomain: "rentmeroom-c4a04.firebaseapp.com",
  projectId: "rentmeroom-c4a04",
  storageBucket: "rentmeroom-c4a04.appspot.com",
  messagingSenderId: "756342270436",
  appId: "1:756342270436:web:e5f0f9d75c403a973c7ff1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()
export default app