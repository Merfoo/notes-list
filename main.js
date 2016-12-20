import Vue from "vue"
import { sync } from "vuex-router-sync"
import store from "./store/index"
import { router } from "./router/index"
import { firebase } from "./firebase/index"

sync(store, router)

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

    if(!store.getters.authHandlerAttached){
        new Vue({
            store,
            router
        }).$mount("#app")

        store.dispatch("setAuthHandlerAttached", true)
    }
});