import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkoWVW31uYZIwzPIUXTe-0g8q2IOHzoQA",
  authDomain: "newsapp-f26f2.firebaseapp.com",
  projectId: "newsapp-f26f2",
  storageBucket: "newsapp-f26f2.appspot.com",
  messagingSenderId: "446830562471",
  appId: "1:446830562471:android:98ef80abe1eb922e6f5f82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
