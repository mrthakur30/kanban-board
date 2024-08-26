import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC6hcTEArh4SJCINO_S7gFxuJb0VBbPoUs",
    authDomain: "kanban-baord.firebaseapp.com",
    projectId: "kanban-baord",
    storageBucket: "kanban-baord.appspot.com",
    messagingSenderId: "609110285573",
    appId: "1:609110285573:web:505e6b29eac04fc2466b6c",
    measurementId: "G-2P6GGY4LDS"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
