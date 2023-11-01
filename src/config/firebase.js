// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB6MYcfTErRtd58cWYaLvTpDLgJn_Ry7UM",
  authDomain: "financial-dashboard-418dc.firebaseapp.com",
  projectId: "financial-dashboard-418dc",
  storageBucket: "financial-dashboard-418dc.appspot.com",
  messagingSenderId: "78538222655",
  appId: "1:78538222655:web:67c690b0d14318f7b31c8a",
  measurementId: "G-E8N05JSG39"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
// export default app;