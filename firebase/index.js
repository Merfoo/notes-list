import firebase from "firebase"
import firebaseui from "firebaseui"

// initialize firebase
let firebaseConfig = {
    apiKey: "AIzaSyCgK0wWrDY-SqJb-kejw1iF_gzgrhSgvcw",
    authDomain: "fir-7fe85.firebaseapp.com",
    databaseURL: "https://fir-7fe85.firebaseio.com",
}

firebase.initializeApp(firebaseConfig)

// initialize firebase ui
let ui = new firebaseui.auth.AuthUI(firebase.auth())

// firebase database
let database = firebase.database()

// firebase auth handler
let attachAuthHandler = function(store, router) {
    return new Promise(function(resolve, reject) {
        let attached = false

        firebase.auth().onAuthStateChanged((newUser) => {
            let user = store.getters.user

            // user is signed in
            if(newUser){
                console.log("Someone signed in")

                // its a new user signed in
                if(user === null || user.uid !== newUser.uid){
                    console.log("New person signed in")
                    store.dispatch("setUser", newUser)
                    store.dispatch("initNotesFromUser", newUser.uid)
                }

                // the user was already signed in, e.g. login token refreshed
                else{
                    console.log("Same person signed in, token refreshed")
                }
            }

            // user signed out
            else if(newUser === null && user){
                console.log("User signed out")
                store.dispatch("setUser", newUser)
                router.push({ path: "/login" })
            }

            else{
                console.log("First time, no one signed in")
            }

            attached = true
            resolve()
        })

        setTimeout(() => {
            if(!attached){
                reject(Error("Attachement of firebase auth failed!"))
            }
        }, 1000 * 60)
    })
}

export { firebase, ui, database, attachAuthHandler }