import firebase from 'firebase/app'
// import firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBDazt5ogcTenYTv5HAgGAfuwwAQ9hw3zI',
  authDomain: 'menu-x-353fd.firebaseapp.com',
  databaseURL: 'https://menu-x-353fd-default-rtdb.firebaseio.com',
  projectId: 'menu-x-353fd',
  storageBucket: 'menu-x-353fd.appspot.com',
  messagingSenderId: '206698905311',
  appId: '1:206698905311:web:188ff70e4c4831d3d7b36a',
  measurementId: 'G-Y809MP934M'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
export const storage = firebase.storage()
export const auth = firebase.auth()
export const provider = new firebase.auth.GoogleAuthProvider()

export default firebase
