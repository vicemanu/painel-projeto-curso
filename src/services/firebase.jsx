import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyC8dCg4iK_mD0_Ap3jgPuqXNcRwXm9C8B4",
    authDomain: "tickets-projeto-curso.firebaseapp.com",
    projectId: "tickets-projeto-curso",
    storageBucket: "tickets-projeto-curso.appspot.com",
    messagingSenderId: "103194769227",
    appId: "1:103194769227:web:7cee6ff8bae8bc97201ace",
    measurementId: "G-Q60B8FY7BL"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const auth = getAuth(firebaseApp)
  const db = getFirestore(firebaseApp)
  const storage = getStorage(firebaseApp)

  export { auth, db, storage };