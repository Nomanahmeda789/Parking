import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyDDtbgqmvHKAJvrovaiaKMu9XR2b4J5VOY",
    authDomain: "parkingjs789.firebaseapp.com",
    databaseURL: "https://parkingjs789.firebaseio.com",
    projectId: "parkingjs789",
    storageBucket: "parkingjs789.appspot.com",
    messagingSenderId: "746954254066"
  };
var Fire=firebase.initializeApp(config);
export default Fire;