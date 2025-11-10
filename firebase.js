import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'

const firebaseConfig = {
  apiKey: "AIzaSyAJcBM7qnnwryReHUQpmWk5ZKr2m4UcvyM",
  authDomain: "portfolio-3fa1e.firebaseapp.com",
  projectId: "portfolio-3fa1e",
  storageBucket: "portfolio-3fa1e.firebasestorage.app",
  messagingSenderId: "1032249516697",
  appId: "1:1032249516697:web:2fce15b6001dcb3e914e08"
}

const app = initializeApp(firebaseConfig)

export const firestore = getFirestore(app)

export default app
