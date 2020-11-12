import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCt82gpFmgi6GZu3s9qip6MO6uSxuFwZoU",
  authDomain: "webshop-1bc0c.firebaseapp.com",
  databaseURL: "https://webshop-1bc0c.firebaseio.com",
  projectId: "webshop-1bc0c",
  storageBucket: "webshop-1bc0c.appspot.com",
  messagingSenderId: "386671812804",
  appId: "1:386671812804:web:d854d48186f0c35cb92991",
  measurementId: "G-7VY6L08MY3"
};

export const fb = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()
export const dbMenuAdd = db.collection ('menuItems');
