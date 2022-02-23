import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAVzsNbBTaGKsY1PoJ4u5qhRPNM2PoIe_0",
  authDomain: "gov-poly-pen-portal.firebaseapp.com",
  projectId: "gov-poly-pen-portal",
  storageBucket: "gov-poly-pen-portal.appspot.com",
  messagingSenderId: "444295772066",
  databaseURL: "https://gov-poly-pen-portal-default-rtdb.firebaseio.com",
  appId: "1:444295772066:web:a342911e7197217f5fa4fb",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

export { database, storage };
export const auth = getAuth(app);
