// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfPUH7b4T8jC2UT_nUY7oX5rPvkXLIsmg",
  authDomain: "mern-estate-98468.firebaseapp.com",
  projectId: "mern-estate-98468",
  storageBucket: "mern-estate-98468.appspot.com",
  messagingSenderId: "622583138238",
  appId: "1:622583138238:web:af4ca871af566281955bef",
  measurementId: "G-96Q6NCBKV9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);