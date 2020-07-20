import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyDdVAzS-aUNg4ycAVHg3vH2TW4dFr3f-GE",
  authDomain: "image-lib-f858e.firebaseapp.com",
  databaseURL: "https://image-lib-f858e.firebaseio.com",
  projectId: "image-lib-f858e",
  storageBucket: "image-lib-f858e.appspot.com",
  messagingSenderId: "649009783666",
  appId: "1:649009783666:web:af23e12ff4911990ea33eb",
  measurementId: "G-7G6SSGMG14"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth().languageCode = 'ja';

export default firebase;
