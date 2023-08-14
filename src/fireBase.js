// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage"
// import {getStorage}
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9KEyr4OO8h2oHoSYzYRcRZp66ptMVEgY",
  authDomain: "podcast-app-react-9d8e1.firebaseapp.com",
  projectId: "podcast-app-react-9d8e1",
  storageBucket: "podcast-app-react-9d8e1.appspot.com",
  messagingSenderId: "8481153184",
  appId: "1:8481153184:web:e8bcfc69e20c095cdb29c5",
  measurementId: "G-S6XV3XMGPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db= getFirestore(app);
const storage=getStorage(app);
const auth=getAuth(app);

export {db, auth, storage}