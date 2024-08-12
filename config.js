import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDhIodW7iiBpOVbxcc8Mx_jFKaaA85IU58",
  authDomain: "rolewiselogin.firebaseapp.com",
  projectId: "rolewiselogin",
  storageBucket: "rolewiselogin.appspot.com",
  messagingSenderId: "205652015457",
  appId: "1:205652015457:web:732f45f760f6c74cf12d20",
  measurementId: "G-N2R99C15XM"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth();

export { auth, app, db };