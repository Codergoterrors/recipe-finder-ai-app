import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import type { User, UserCredential } from 'firebase/auth';
import { auth } from './firebase';

/**
 * Register a new user with email and password using Firebase Auth.
 */
export const register = async (email: string, password: string): Promise<UserCredential> => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Log in an existing user with email and password using Firebase Auth.
 */
export const login = async (email: string, password: string): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

/**
 * Log out the currently authenticated user.
 */
export const logout = async (): Promise<void> => {
  await signOut(auth);
};

/**
 * Subscribe to authentication state changes.
 */
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
