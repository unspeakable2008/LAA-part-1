import firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyArmx26a9KTWhRRfOA-d0h8AQ5eJBJk86w",
    authDomain: "life-assistance-app.firebaseapp.com",
    projectId: "life-assistance-app",
    storageBucket: "life-assistance-app.appspot.com",
    messagingSenderId: "721876010303",
    appId: "1:721876010303:web:5453094f63a46c3f5b3f8a"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
