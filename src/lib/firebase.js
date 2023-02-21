
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7N8EHmWLXp7QPfsQImF9s0vEHgWaIinc",
  authDomain: "virtualvortex-eff1f.firebaseapp.com",
  projectId: "virtualvortex-eff1f",
  storageBucket: "virtualvortex-eff1f.appspot.com",
  messagingSenderId: "285569437083",
  appId: "1:285569437083:web:8857853e52cdd6499e253e"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);