import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';

// Sign Up
const signUp = (email : string, password : string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign In
const signIn = (email : string, password : string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign Out
const logOut = () => {
  return signOut(auth);
};
