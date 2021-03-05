import firebase from 'firebase/app'
import 'firebase/firestore'


  const firebaseConfig = {
    apiKey: "AIzaSyCyZv3GYaybcwg1qeCijDiBdcyM_uPDVWo",
    authDomain: "restaurants-d4a80.firebaseapp.com",
    projectId: "restaurants-d4a80",
    storageBucket: "restaurants-d4a80.appspot.com",
    messagingSenderId: "1080731451284",
    appId: "1:1080731451284:web:47aa1f2010899ec0629981"
  }

  export const firebaseApp = firebase.initializeApp(firebaseConfig)