import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDmsTIWjwymKHVeRTLtDT6IHOzqEKCTmgs",
  authDomain: "disney-clone-2b51a.firebaseapp.com",
  projectId: "disney-clone-2b51a",
  storageBucket: "disney-clone-2b51a.appspot.com",
  messagingSenderId: "551989934806",
  appId: "1:551989934806:web:f8c06820ef8bb3a19a6777",
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();

export {db}