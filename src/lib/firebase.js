import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: "AIzaSyB2SPmThkjnWWnz16wEDQ2nSUDMO33mT7Q",
  // authDomain: "course-fb950.firebaseapp.com",
  // projectId: "course-fb950",
  // storageBucket: "course-fb950.appspot.com",
  // messagingSenderId: "121683041239",
  // appId: "1:121683041239:web:826971f2b9d6e0e16cc992",

  apiKey: "AIzaSyDLNbqeztyPckDKyhl6ae5S_hlFKJqQ5-4",
  authDomain: "we-rent-8a6bf.firebaseapp.com",
  projectId: "we-rent-8a6bf",
  storageBucket: "we-rent-8a6bf.appspot.com",
  messagingSenderId: "234881559649",
  appId: "1:234881559649:web:bc3b9cd4abc2db164f4e20"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

export { auth, db,storage };
export default app;
