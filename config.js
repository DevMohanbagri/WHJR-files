import firebase from 'firebase';
require ('@firebase/firestore')
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDgspOdOn8CCRIrrG2IXrIWGlbuQBMmjZk",
    authDomain: "online-library-app-348ef.firebaseapp.com",
    projectId: "online-library-app-348ef",
    storageBucket: "online-library-app-348ef.appspot.com",
    messagingSenderId: "952358547275",
    appId: "1:952358547275:web:50f103554648c8f6c042ce"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore()

  export default db;
