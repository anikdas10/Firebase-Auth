
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDUxE3PflhAcCqiJuZFGE0oM8TNvyBwIoY",
  authDomain: "email-password-auth-db647.firebaseapp.com",
  projectId: "email-password-auth-db647",
  storageBucket: "email-password-auth-db647.firebasestorage.app",
  messagingSenderId: "727203566484",
  appId: "1:727203566484:web:97e6dc1113928de0863581"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;

