import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCMv_ii5NEoAOl6wc67ACXRdtj8g3iLNrA",
  authDomain: "cleaningproject-18b2a.firebaseapp.com",
  projectId: "cleaningproject-18b2a",
  storageBucket: "cleaningproject-18b2a.appspot.com",
  messagingSenderId: "234197222012",
  appId: "1:234197222012:web:d5242d104652f64b5c7ff9",
  measurementId: "G-DCD20GDC3G"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
export default firebaseConfig;