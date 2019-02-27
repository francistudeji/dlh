import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDmKAV3xpRwt0BCJc9d185kkXNMxtBAey0",
  authDomain: "ibibio-language-hub.firebaseapp.com",
  databaseURL: "https://ibibio-language-hub.firebaseio.com",
  projectId: "ibibio-language-hub",
  storageBucket: "ibibio-language-hub.appspot.com",
  messagingSenderId: "22675036484"
};

!firebase.apps.length && firebase.initializeApp(config);
const db = firebase.database();

let isAuthenticated = false;
firebase
  .auth()
  .onAuthStateChanged(
    user => (user ? (isAuthenticated = true) : (isAuthenticated = false))
  );

export { db, firebase, isAuthenticated };
