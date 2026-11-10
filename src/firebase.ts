import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  getDocs, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// BeInSkills Firebase Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBhckwqh6s5TVgzTiEHIlsEhltmfX5nlnw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "beinskills-22e08.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "beinskills-22e08",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "beinskills-22e08.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "142063059924",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:142063059924:web:2328dc2a09140dbf43cc41",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-1W7PQWLNNS"
};

// Initialize Firebase (Prevent duplicate app initialization)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Auth Helpers
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error: any) {
    console.error('Google Sign-in Error:', error);
    return { user: null, error: error.message || 'حدث خطأ أثناء تسجيل الدخول بحساب Google' };
  }
};

export const registerUser = async (email: string, pass: string, name: string, role: string = 'student') => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    const user = res.user;
    
    // Save user profile in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name,
      email,
      role,
      createdAt: serverTimestamp(),
    });

    return { user, error: null };
  } catch (error: any) {
    console.error('Registration Error:', error);
    return { user: null, error: error.message };
  }
};

export const loginUser = async (email: string, pass: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, pass);
    return { user: res.user, error: null };
  } catch (error: any) {
    console.error('Login Error:', error);
    return { user: null, error: error.message };
  }
};

export const logOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Storage helper for uploading images/badges/logos
export const uploadFileToStorage = async (path: string, file: Blob | File): Promise<string> => {
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};

export default app;
