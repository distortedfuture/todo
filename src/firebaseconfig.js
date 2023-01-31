import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyALXrOq0eTBU0aTp-3pPiSJZ-IP3AVpyTY",
  authDomain: "todo-c1b9b.firebaseapp.com",
  projectId: "todo-c1b9b",
  storageBucket: "todo-c1b9b.appspot.com",
  messagingSenderId: "1045643693433",
  appId: "1:1045643693433:web:2d025d1ef02134026033a8",
  measurementId: "G-0ZBYK8Z98V"
};

// Initialize Firebase
export var app = initializeApp(firebaseConfig);