import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDmipZuZaM5eIdSqaWUmqkTqtdP2-ziI6U",
    authDomain: "pennadigital-b84af.firebaseapp.com",
    databaseURL: "https://pennadigital-b84af.firebaseio.com",
    projectId: "pennadigital-b84af",
    storageBucket: "pennadigital-b84af.appspot.com",
    messagingSenderId: "966652656564",
    appId: "1:966652656564:web:d1587937492b867d"
  };
firebase.initializeApp(firebaseConfig);

export const RealtimeDatabase = firebase.database();
export const Storage = firebase.storage();
export const FireStore = firebase.firestore();
export const Auth = firebase.auth();