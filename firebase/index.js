import firebase from "firebase"
import firebaseui from "firebaseui"

// Initialize firebase
let firebaseConfig = {
    apiKey: "AIzaSyCgK0wWrDY-SqJb-kejw1iF_gzgrhSgvcw",
    authDomain: "fir-7fe85.firebaseapp.com",
    databaseURL: "https://fir-7fe85.firebaseio.com",
};
firebase.initializeApp(firebaseConfig);

// Initialize firebase ui
let ui = new firebaseui.auth.AuthUI(firebase.auth());

let database = firebase.database()

export { firebase, ui, database }