// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAOVPHoMEcW1BZ9wdPqAQOpFVLLS26zkGo",
  authDomain: "virola-blog.firebaseapp.com",
  projectId: "virola-blog",
  storageBucket: "virola-blog.firebasestorage.app",
  messagingSenderId: "1006228750431",
  appId: "1:1006228750431:web:592ba8bef595861cc41bea",
  measurementId: "G-7PRBQTC728",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { db, storage, firestore, analytics };
