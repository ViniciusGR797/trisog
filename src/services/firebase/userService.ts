import { auth, googleProvider, facebookProvider, githubProvider } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, getIdToken, User } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { setCookie } from 'nookies';

const setAuthToken = async (user: User) => {
  const token = await getIdToken(user, true);
  const firstName = user.displayName?.split(' ')[0] || '';
  const email = user.email || '';
  const photoUrl = user.photoURL || ''; 
  const userData = {
    token,
    firstName,
    email,
    photoUrl,
  };
  const userDataString = JSON.stringify(userData);

  setCookie(null, '@auth.user', userDataString, {
    maxAge: 55 * 60,
    path: '/',
  });

  console.log('User data:', userData);
};

const errorMessages: { [key: string]: string } = {
  'auth/wrong-password': 'The password is incorrect. Please try again',
  'auth/weak-password': 'The password must be at least 6 characters long',
  'auth/invalid-email': 'The email address is invalid',
  'auth/email-already-in-use': 'This email address is already in use by another account.',
  'auth/credential-already-in-use': 'These credentials are already associated with another account.',
  'auth/invalid-credential': 'The provided credentials are incorrect or expired.',
  'auth/invalid-user-token': 'Your session has expired. Please sign in again.',
  'auth/invalid-oauth-provider': 'This sign-in method is not supported for this operation.',
  'auth/unauthorized-domain': 'This domain is not authorized for sign-in operations. Please check the list of authorized domains in the Firebase Console.',
  'auth/user-token-expired': 'Your session has expired. Please sign in again.',
  'auth/user-not-found': 'No user found with this identifier. The account may have been deleted.'
};

export const signUpWithEmail = async (email: string, password: string): Promise<{ user: User | null, error: string | null }> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setAuthToken(userCredential.user);
    return { user: userCredential.user, error: null };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { user: null, error: errorMessages[firebaseError.code] || 'Invalid user credentials' };
  }
};

export const logInWithEmail = async (email: string, password: string): Promise<{ user: User | null, error: string | null }> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await setAuthToken(userCredential.user);
    return { user: userCredential.user, error: null };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { user: null, error: errorMessages[firebaseError.code] || 'Invalid user credentials' };
  }
};

export const logInWithGoogle = async (): Promise<{ user: User | null, error: string | null }> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await setAuthToken(result.user);
    return { user: result.user, error: null };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { user: null, error: errorMessages[firebaseError.code] || 'Invalid user credentials' };
  }
};

export const logInWithFacebook = async (): Promise<{ user: User | null, error: string | null }> => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    await setAuthToken(result.user);
    return { user: result.user, error: null };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { user: null, error: errorMessages[firebaseError.code] || 'Invalid user credentials' };
  }
};

export const logInWithGithub = async (): Promise<{ user: User | null, error: string | null }> => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    await setAuthToken(result.user);
    return { user: result.user, error: null };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { user: null, error: errorMessages[firebaseError.code] || 'Invalid user credentials' };
  }
};
