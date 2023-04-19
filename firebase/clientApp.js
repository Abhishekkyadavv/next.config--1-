import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDlSOXq2EK4C4q1bDbK_Ehbe6z1G_-Kyfo",
  authDomain: "blogapplication-21a85.firebaseapp.com",
  projectId: "blogapplication-21a85",
  storageBucket: "blogapplication-21a85.appspot.com",
  messagingSenderId: "941851293070",
  appId: "1:941851293070:web:39fe62109d5891cb52a0df",
  measurementId: "G-6SEJQ86JLC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };