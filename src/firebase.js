const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
require("firebase/storage")

const config = {     
  apiKey : "AIzaSyC6q2R84TN-XC1gYUzxn46HqTB0bc7l-U4" ,
  authDomain :"syntaxi.firebaseapp.com" , 
  databaseURL : "https://syntaxi.firebaseio.com" , 
  projectId : "syntaxi" ,
  storageBucket : "syntaxi.appspot.com" ,
  messagingSenderId : "409742695270" ,
  appId : "1:409742695270:web:cdda581577f39ebbbf86a7" ,
  measurementId : "G-KFSWFKRPG4" 
};

  // Initialize Firebase   
  firebase.initializeApp(config);

  const storage = firebase.storage();

export {
  storage, firebase as default
}