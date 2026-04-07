// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyDLgZrjHMVt1vFVmZlc9ShTEqaZX2lPhMA",
    authDomain: "kaizerdev-portofolio.firebaseapp.com",
    databaseURL: "https://kaizerdev-portofolio-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kaizerdev-portofolio",
    storageBucket: "kaizerdev-portofolio.firebasestorage.app",
    messagingSenderId: "278240728188",
    appId: "1:278240728188:web:efbf302757fd49e4efe5f9",
    measurementId: "G-YM11NTHXM8"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);