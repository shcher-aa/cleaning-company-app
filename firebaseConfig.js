import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "///",
  authDomain: "///",
  projectId: "///",
  storageBucket: "///",
  messagingSenderId: "///",
  appId: "///",
  measurementId: "///"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
export default firebaseConfig;
