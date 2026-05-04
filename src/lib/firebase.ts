import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBRzouslRMo2W1ZpRqK4Vxdg97nUqC-dm4",
  authDomain: "ikarthiknr-portfolio.firebaseapp.com",
  projectId: "ikarthiknr-portfolio",
  storageBucket: "ikarthiknr-portfolio.firebasestorage.app",
  messagingSenderId: "290388748680",
  appId: "1:290388748680:web:cef4b01f42a2cfae98f23d",
  measurementId: "G-PMWYBTEMZ8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
