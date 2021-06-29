import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyC_tzyWPkSbGgONVOWiw6I2Xs1DI-_XzZY",
  authDomain: "slack-two-c4c18.firebaseapp.com",
  projectId: "slack-two-c4c18",
  storageBucket: "slack-two-c4c18.appspot.com",
  messagingSenderId: "527667565107",
  appId: "1:527667565107:web:b218aef06a2dc7b5a88946",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
