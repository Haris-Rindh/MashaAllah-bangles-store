import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBKKhFBXUrZtO1tGdpKjfHVANDtNgofroM",
  authDomain: "mashaallah-store.firebaseapp.com",
  projectId: "mashaallah-store",
  storageBucket: "mashaallah-store.firebasestorage.app",
  messagingSenderId: "358128714373",
  appId: "1:358128714373:web:b9d36c213b49073c37dfec",
  measurementId: "G-PHKZ90TWME"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export default app
