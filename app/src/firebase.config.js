
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA9OQvHSn2imxd0XimKyHWyUAdxwaaEXvA",
    authDomain: "esugu-652bb.firebaseapp.com",
    projectId: "esugu-652bb",
    storageBucket: "esugu-652bb.appspot.com",
    messagingSenderId: "524725933592",
    appId: "1:524725933592:web:4ec571fc06f88dc334156d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;