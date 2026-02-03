// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB13SfCW5xHe6n9Z_Ct5TBBEVkksMpuPkQ",
  authDomain: "blog-app-4a4c9.firebaseapp.com",
  projectId: "blog-app-4a4c9",
  storageBucket: "blog-app-4a4c9.firebasestorage.app",
  messagingSenderId: "40814345310",
  appId: "1:40814345310:web:eee4e08c0a5160ea9cc8cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const db  = getFirestore(app)
const storage = getStorage(app)
export {app,db,storage};