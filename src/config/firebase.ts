import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDNwxGqzaGGXGDxLPPmg5RjKULrFMBD7eo",
  authDomain: "issue-tracking-system-demo.firebaseapp.com",
  projectId: "issue-tracking-system-demo",
  storageBucket: "issue-tracking-system-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:1234567890abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);