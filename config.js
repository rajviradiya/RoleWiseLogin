import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD2XMoDOBioPVnty1QZogabqiNQMpLVFSI",
  authDomain: "fir-auth-48dfc.firebaseapp.com",
  projectId: "fir-auth-48dfc",
  storageBucket: "fir-auth-48dfc.appspot.com",
  messagingSenderId: "534380130586",
  appId: "1:534380130586:web:5082e64bbcacd83a88fca3",
  measurementId: "G-1SWH7MY55D"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth();

export { auth, app, db };