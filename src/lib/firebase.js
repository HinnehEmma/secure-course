import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2SPmThkjnWWnz16wEDQ2nSUDMO33mT7Q",
  authDomain: "course-fb950.firebaseapp.com",
  projectId: "course-fb950",
  storageBucket: "course-fb950.appspot.com",
  messagingSenderId: "121683041239",
  appId: "1:121683041239:web:826971f2b9d6e0e16cc992",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;
