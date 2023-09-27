// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
